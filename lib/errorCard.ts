import { themes } from "./themes";
import type { ThemeName } from "./types";

export function renderErrorCard(message: string, theme: ThemeName = "dark"): string {
  const t = themes[theme];
  const safe = message.replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="80" viewBox="0 0 495 80">
  <rect width="495" height="80" fill="${t.background}"/>
  <text x="20" y="32" fill="${t.title}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700">oss-contribution-stats · error</text>
  <text x="20" y="56" fill="${t.text}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12">${safe}</text>
</svg>`;
}
