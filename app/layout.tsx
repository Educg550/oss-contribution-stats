import type { ReactNode } from "react";

export const metadata = {
  title: "OSS Contribution Stats",
  description: "Embeddable SVG card of GitHub upstream OSS contributions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
