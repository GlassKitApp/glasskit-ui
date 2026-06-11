# create-glasskit

Scaffold a [Meta Ray-Ban Display](https://wearables.developer.meta.com/docs/develop/webapps)
web app in one command:

```sh
npm create glasskit my-app
# or: pnpm create glasskit my-app · yarn create glasskit my-app · bun create glasskit my-app
```

You get a complete Vite + React + TypeScript glasses app — the required
600×600 viewport + `mrbd-web-app-capable` meta tags, `GlassViewport` +
D-pad navigation pre-wired, and a README covering the deploy → QR →
glasses loop.

This is a thin wrapper around
[`@glasskit-ui/cli`](https://www.npmjs.com/package/@glasskit-ui/cli)`init` —
use the CLI directly to vendor components afterwards:

```sh
npx @glasskit-ui/cli add list button compass navigator
```

Docs: [glasskit.app/ui](https://glasskit.app/ui)

## License

[MIT](https://github.com/GlassKitApp/glasskit-ui/blob/main/LICENSE)
