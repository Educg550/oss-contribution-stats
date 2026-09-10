const BASE = "/api?username=Educg550";

const EXAMPLES: Array<{ label: string; query: string }> = [
  { label: "Default (dark, stars, 5 repos)", query: BASE },
  { label: "Light theme", query: `${BASE}&theme=light` },
  { label: "Monokai theme, sorted by forks", query: `${BASE}&theme=monokai&sort=forks` },
  { label: "MIT only, top 3", query: `${BASE}&license=mit&limit=3` },
];

export default function Home() {
  return (
    <main
      style={{
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        padding: "2rem",
        maxWidth: 760,
        margin: "0 auto",
        lineHeight: 1.5,
      }}
    >
      <h1>oss-card</h1>
      <p>Embeddable SVG card showing a GitHub user's upstream open-source contributions.</p>

      <h2>Usage</h2>
      <pre style={{ background: "#f4f4f5", padding: "0.75rem", borderRadius: 6, overflow: "auto" }}>
        {`![OSS](https://oss-card-blush.vercel.app/api?username=YOUR_USERNAME)`}
      </pre>

      <h2>Live examples</h2>
      {EXAMPLES.map((ex) => (
        <section key={ex.query} style={{ margin: "1.5rem 0" }}>
          <h3 style={{ fontSize: "1rem", margin: "0 0 0.5rem" }}>{ex.label}</h3>
          {/* biome-ignore lint/performance/noImgElement: SVG endpoint, not a static asset */}
          <img src={ex.query} alt={ex.label} width={495} />
        </section>
      ))}
    </main>
  );
}
