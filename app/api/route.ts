import { NextResponse } from "next/server";
import { renderErrorCard } from "@/lib/errorCard";
import { GitHubError, getUpstreamContributions, userExists } from "@/lib/github";
import { parseQuery, QueryError } from "@/lib/query";
import { renderCard } from "@/lib/render";
import type { RepoData, ThemeName } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";

function svgResponse(body: string, status = 200, extraHeaders: Record<string, string> = {}) {
  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": status === 200 ? CACHE : "no-store",
      ...extraHeaders,
    },
  });
}

function sortRepos(repos: RepoData[], sort: "stars" | "forks" | "contributors"): RepoData[] {
  const key = sort === "stars" ? "stars" : sort === "forks" ? "forks" : "contributors";
  return [...repos].sort((a, b) => b[key] - a[key]);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let theme: ThemeName = "dark";

  try {
    const query = parseQuery(searchParams);
    theme = query.theme;

    if (!(await userExists(query.username))) {
      return svgResponse(renderErrorCard(`User not found: ${query.username}`, theme), 404);
    }

    let repos = await getUpstreamContributions(query.username);
    const totalRepos = repos.length;
    const totalPrs = repos.reduce((s, r) => s + r.prCount, 0);

    if (query.license !== "all") {
      repos = repos.filter((r) => r.license === query.license);
    }
    repos = sortRepos(repos, query.sort).slice(0, query.limit);

    if (repos.length === 0) {
      return svgResponse(
        renderErrorCard(`No upstream contributions for @${query.username}`, theme),
        200,
      );
    }

    const svg = await renderCard({
      username: query.username,
      repos,
      totalRepos,
      totalPrs,
      theme,
    });
    return svgResponse(svg, 200);
  } catch (err) {
    if (err instanceof QueryError) {
      return svgResponse(renderErrorCard(err.message, theme), err.status);
    }
    if (err instanceof GitHubError) {
      const extra: Record<string, string> = err.status === 429 ? { "Retry-After": "3600" } : {};
      return svgResponse(renderErrorCard(err.message, theme), err.status, extra);
    }
    console.error("oss-contribution-stats unhandled error", err);
    return svgResponse(renderErrorCard("Internal error", theme), 500);
  }
}
