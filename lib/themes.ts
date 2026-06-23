import type { ThemeName, ThemeTokens } from "./types";

export const themes: Record<ThemeName, ThemeTokens> = {
  dark: {
    background: "#1e2327",
    title: "#e6edf3",
    text: "#8b949e",
    accent: "#58a6ff",
    bar: "#30363d",
  },
  light: {
    background: "#ffffff",
    title: "#24292f",
    text: "#57606a",
    accent: "#0969da",
    bar: "#d0d7de",
  },
  monokai: {
    background: "#272822",
    title: "#f8f8f2",
    text: "#75715e",
    accent: "#66d9e8",
    bar: "#49483e",
    star: "#f92672",
    starCount: "#a6e22e",
    license: "#ae81ff",
    barFill: "#a6e22e",
    lang: "#fd971f",
  },
};
