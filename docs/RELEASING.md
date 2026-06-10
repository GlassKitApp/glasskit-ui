# Releasing `@glasskit/glasses-ui`

Publishing is fully automated through GitHub Actions + [Changesets](https://github.com/changesets/changesets).
Nothing publishes until the owner flips the activation switches (bottom of this
doc); until then every workflow is inert and skipped.

## The pipeline

```
PR opened ──► CI: lint · typecheck · test · build
          ──► CI: package-checks  (npm pack audit · publint --strict · attw)
          ──► CI: changeset-guard (package changes must carry a changeset)
          ──► Beta Release: if the PR has a changeset, publishes a snapshot
              (0.0.0-beta-*) to the `beta` dist-tag and comments the version
              on the PR — never touches `latest`

merge to main ──► Release: changesets/action opens/updates the
                  "Version Packages" PR (runs `pnpm version-packages`,
                  which also regenerates registry.json so the registry's
                  @glasskit/glasses-ui dep range tracks the new version)

merge "Version Packages" PR ──► Release: publishes to npm `latest`
                                with OIDC provenance + git tags
```

## Day-to-day: shipping a change to the package

1. Make your change under `packages/glasses-ui/`.
2. Run `pnpm changeset` — pick the bump (patch/minor/major per semver; the
   public API is locked, so breaking changes need explicit owner sign-off)
   and write a changelog entry. Commit the generated `.changeset/*.md`.
3. Open the PR. CI validates the package surface; the beta snapshot gives
   reviewers an installable build.
4. Merge. The Version Packages PR accumulates pending changesets; merging
   _that_ PR performs the actual npm publish.

Changes that should **not** trigger a release (test-only, comment fixes):
add the `no-changeset-needed` label to the PR to satisfy the guard.

## Local verification (what package-checks runs in CI)

```sh
pnpm --filter @glasskit/glasses-ui build
cd packages/glasses-ui
npm pack --dry-run                  # expect dist/*, styles.css, README, LICENSE
pnpm dlx publint --strict
pnpm dlx @arethetypeswrong/cli --pack . --profile esm-only --exclude-entrypoints styles.css
```

Note: `publishConfig.provenance: true` means npm verifies the build came from
the GitHub Actions OIDC flow — a local `npm publish` fails **by design**. All
publishes go through `release.yml`.

## First publish

`changeset publish` publishes any package whose local version is missing from
the registry, so the first enabled run on `main` ships the current `0.1.0`
without needing a changeset.

## Activation (owner-only, one time)

In GitHub → Settings → Secrets and variables → Actions:

1. Variable `RELEASE_ENABLED` = `true`
2. Secret `NPM_TOKEN` — a granular automation token with publish rights for
   the `@glasskit` org (Settings → Access Tokens on npmjs.com; scope it to
   `@glasskit/glasses-ui`, no 2FA prompt for automation).

Both `beta.yml` and `release.yml` stay skipped until both exist. To pause all
publishing, set `RELEASE_ENABLED` to anything other than `true`.
