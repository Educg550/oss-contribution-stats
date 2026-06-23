import { env } from "./env";
import type { FetchInit, RepoData, RepoResp, SearchResp } from "./types";

const REST = "https://api.github.com";
const UA = "oss-card";

export class GitHubError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function gh<T>(path: string, init: FetchInit = {}): Promise<T | null> {
  const res = await fetch(`${REST}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env.githubToken}`,
      "User-Agent": UA,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
  });
  if (res.status === 404) return null;
  if (res.status === 403 || res.status === 429) {
    throw new GitHubError(429, "GitHub rate limit");
  }
  if (!res.ok) throw new GitHubError(res.status, `GitHub ${path} → ${res.status}`);
  return (await res.json()) as T;
}

async function ghHead(path: string): Promise<Response> {
  return fetch(`${REST}${path}`, {
    method: "HEAD",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env.githubToken}`,
      "User-Agent": UA,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

async function fetchMergedPrSlugs(username: string): Promise<Map<string, number>> {
  const q = encodeURIComponent(`author:${username} is:pr is:merged -user:${username}`);
  const data = await gh<SearchResp>(`/search/issues?q=${q}&per_page=100&sort=created&order=desc`);
  if (!data) return new Map();
  const counts = new Map<string, number>();
  for (const item of data.items) {
    if (!item.pull_request?.merged_at) continue;
    const slug = item.repository_url.replace("https://api.github.com/repos/", "");
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }
  return counts;
}

async function fetchRepo(slug: string): Promise<RepoResp | null> {
  return gh<RepoResp>(`/repos/${slug}`);
}

async function fetchContributorCount(slug: string): Promise<number> {
  const res = await ghHead(`/repos/${slug}/contributors?per_page=1&anon=true`);
  if (!res.ok) return 0;
  const link = res.headers.get("link");
  if (!link) return 1; // single page → at most 1 contributor returned
  const match = link.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
  return match ? Number.parseInt(match[1] ?? "0", 10) : 0;
}

export async function userExists(username: string): Promise<boolean> {
  const r = await gh<{ login: string }>(`/users/${username}`);
  return r !== null;
}

export async function getUpstreamContributions(username: string): Promise<RepoData[]> {
  const prCounts = await fetchMergedPrSlugs(username);
  if (prCounts.size === 0) return [];

  const slugs = Array.from(prCounts.keys());
  const repos = await Promise.all(
    slugs.map(async (slug) => {
      const [repo, contributors] = await Promise.all([
        fetchRepo(slug),
        fetchContributorCount(slug),
      ]);
      if (!repo) return null;
      const data: RepoData = {
        slug: repo.full_name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        license: repo.license?.spdx_id ? repo.license.spdx_id.toLowerCase() : null,
        contributors,
        prCount: prCounts.get(slug) ?? 0,
      };
      return data;
    }),
  );

  return repos.filter((r): r is RepoData => r !== null);
}
