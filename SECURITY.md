# Security Policy

## Supported versions

The latest published versions of `@glasskit-ui/react`, `@glasskit-ui/cli`,
`@glasskit-ui/mcp`, and `create-glasskit` receive security fixes.

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Use GitHub's
private reporting instead: **Security → Report a vulnerability** on this
repository ([direct link](https://github.com/GlassKitApp/glasskit-ui/security/advisories/new)).

You can expect an acknowledgment within a few days. Coordinated disclosure
appreciated — we'll credit reporters in the release notes unless you prefer
otherwise.

## Scope notes

- All packages publish from GitHub Actions with **npm provenance** — verify
  any tarball's build origin on its npm page.
- The CLI writes files only inside the target project directory and installs
  only the npm dependencies declared by registry items; report anything that
  escapes that contract.
