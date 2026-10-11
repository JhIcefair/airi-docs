# AIRI Docs

Source of the [Project AIRI documentation](https://airi.moeru.ai/docs/).

The content lived in `docs/` of [moeru-ai/airi](https://github.com/moeru-ai/airi)
before. It moved here with its Git history, so the page changelogs go back to the
first commits.

## Structure

| Path | Description |
| --- | --- |
| `content/` | Pages, one directory per locale (`en`, `zh-Hans`, `ja`, ...). |
| `.vitepress/` | Site config, data loaders and site-only components (home page, releases). |
| `packages/vitepress-theme/` | [`@proj-airi/vitepress-theme`](./packages/vitepress-theme), published to npm. |

## Development

```sh
pnpm install
pnpm dev
```

Other scripts:

- `pnpm build`: build the site to `.vitepress/dist`.
- `pnpm build:base`: build with the `/docs/` base, as deployed on `airi.moeru.ai`.
- `pnpm lint` / `pnpm typecheck`

The build reads the full Git history for the page changelogs. In a shallow clone
the changelogs are empty, so use `fetch-depth: 0` in CI.

### Environment variables

| Name | Description |
| --- | --- |
| `BASE_URL` | Base path of the site. `build:base` sets it to `/docs/`. |
| `AIRI_VERSION` | AIRI version shown in the navbar. Without it, the newest GitHub release is used. |
| `GITHUB_TOKEN` | Optional, raises the GitHub API rate limit for the release data. |

## Deployment

The AIRI repository builds this site with `pnpm build:base` and serves it under
`https://airi.moeru.ai/docs/`.

## License

MIT
