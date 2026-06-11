# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).
It drives the automated npm release of `@glasskit-ui/react`.

## Adding a changeset

When a PR changes a publishable package, add a changeset:

```sh
pnpm changeset
```

Pick the package(s), the bump type (patch / minor / major), and write a
one-line summary. Commit the generated `.changeset/*.md` file with your PR.

## How releases happen

- **PR with a changeset → beta:** a snapshot (`0.x.y-beta-<sha>`) is
  published to the `beta` dist-tag (never `latest`) so reviewers can try it.
- **Merge to `main` → official:** the Release workflow opens a "Version
  Packages" PR; merging it publishes the new version to `latest`, writes the
  CHANGELOG, and tags the release.

A PR that changes a package **without** a changeset triggers no release.

> The release + beta workflows are gated off (`vars.RELEASE_ENABLED`) and have
> no `NPM_TOKEN` until the owner enables publishing. See `.github/workflows/`.
