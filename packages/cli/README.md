# @glasskit-ui/cli

The GlassKit UI CLI (bin: `glasskit`) — scaffold Meta Ray-Ban Display web
apps and vendor lens components from the [GlassKit registry](https://glasskit.app/ui?ref=npm-cli).

```sh
# scaffold a complete Vite + React glasses app (600×600, D-pad wired)
npx @glasskit-ui/cli init my-app

# vendor components into any project — you own the source
npx @glasskit-ui/cli add list button readout compass

# browse what's available
npx @glasskit-ui/cli list
```

`add` resolves component dependencies, writes the source to
`components/glasskit/`, and installs any npm dependencies they declare
(`--no-install` to skip). `init` inside an existing project prints the setup
steps instead of scaffolding.

**Flags:** `--registry <url>` · `--cwd <dir>` · `--overwrite` · `--no-install`

Zero runtime dependencies — Node 18+. Docs: [glasskit.app/ui/docs](https://glasskit.app/ui/docs?ref=npm-cli)

## License

[MIT](./LICENSE)
