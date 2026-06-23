export type ThemeName = "dark" | "light" | "monokai";

export type SortKey = "stars" | "forks" | "contributors";

export type RepoData = {
  slug: string; // "owner/name"
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  license: string | null; // SPDX ID (lowercase) or null
  contributors: number;
  prCount: number;
};

export type Query = {
  username: string;
  theme: ThemeName;
  limit: number; // 1..10
  sort: SortKey;
  license: string; // "all" or SPDX id (lowercase)
};

export type CardProps = {
  username: string;
  repos: RepoData[];
  totalRepos: number;
  totalPrs: number;
  theme: ThemeName;
};

export type ThemeTokens = {
  background: string;
  title: string;
  text: string;
  accent: string;
  bar: string;
  star?: string;
  starCount?: string;
  license?: string;
  barFill?: string;
  lang?: string;
};

export type FetchInit = Omit<RequestInit, "headers"> & { headers?: Record<string, string> };

export type SearchItem = {
  number: number;
  pull_request: { merged_at: string | null } | null;
  repository_url: string;
};

export type SearchResp = { items: SearchItem[]; total_count: number };

export type RepoResp = {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  license: { spdx_id: string | null } | null;
};
