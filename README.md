# oss-card

Embeddable SVG card showing a GitHub user's upstream open-source contributions, ranked by relevance.

## Usage

```markdown
![OSS Contributions](https://oss-card-blush.vercel.app/api?username=YOUR_USERNAME)
```

### Options

| Param   | Values                          | Default |
|---------|---------------------------------|---------|
| theme   | `dark`, `light`, `monokai`      | `dark`  |
| limit   | 1–10                            | 5       |
| sort    | `stars`, `forks`, `contributors`| `stars` |
| license | SPDX id (e.g. `mit`) or `all`   | `all`   |

Example:

```markdown
![OSS](https://oss-card-blush.vercel.app/api?username=Educg550&theme=monokai&sort=forks&limit=3)
```

## Self-hosting

1. Fork this repo.
2. Create a GitHub personal access token with `public_repo` scope (read-only).
3. Deploy on Vercel; set `GITHUB_TOKEN` as an env var.

## Local development

```bash
cp .env.example .env
# edit .env and set GITHUB_TOKEN
npm install
npm run dev
# open http://localhost:3000
```

## Conventions

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — see [`CHANGELOG.md`](./CHANGELOG.md)

## License

MIT — see [`LICENSE`](./LICENSE).
