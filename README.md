<div align="center">

# OSS Contribution Stats

An embeddable SVG card for the open-source projects you contribute to.

[Live demo](https://oss-contribution-stats.vercel.app) · [Usage](#usage) · [Options](#options) · [Local development](#local-development)

[![OSS contribution stats for Educg550](https://oss-contribution-stats.vercel.app/api?username=Educg550)](https://oss-contribution-stats.vercel.app/api?username=Educg550)

</div>

## What it shows

OSS Contribution Stats finds merged pull requests authored by a GitHub user in repositories
they do not own, then summarizes the upstream projects with repository stars, language,
license, contributor count, and merged PR count.

## Usage

Add the following Markdown to a GitHub profile or project README and replace `YOUR_USERNAME`:

```markdown
![OSS contributions](https://oss-contribution-stats.vercel.app/api?username=YOUR_USERNAME)
```

> [!TIP]
> Open the [live site](https://oss-contribution-stats.vercel.app) to preview the available
> themes and sorting options.

## Options

| Parameter | Values                           | Default |
| --------- | -------------------------------- | ------- |
| `theme`   | `dark`, `light`, `monokai`       | `dark`  |
| `limit`   | `1`–`10`                         | `5`     |
| `sort`    | `stars`, `forks`, `contributors` | `stars` |
| `license` | SPDX ID such as `mit`, or `all`  | `all`   |

Combine options in the query string:

```markdown
![OSS contributions](https://oss-contribution-stats.vercel.app/api?username=Educg550&theme=monokai&sort=forks&limit=3)
```

## How it works

`GET /api` validates the query, fetches merged upstream pull requests and repository metadata
from GitHub, and renders the result as SVG with Satori. Successful responses are cached at the
edge; errors are also returned as SVG so embedded images remain readable.

## Local development

Requires Node.js 24 and a GitHub token that can read public repository metadata.

```bash
cp .env.example .env
# Set GITHUB_TOKEN in .env
npm install
npm run dev
```

Open `http://localhost:3000` or request a card directly:

```text
http://localhost:3000/api?username=Educg550
```

## Self-hosting

Fork the repository, deploy it as a Next.js application, and configure `GITHUB_TOKEN` as a
secret environment variable. The endpoint requires the Node.js runtime because Satori loads
the bundled Inter font files from disk.
