# @glasskit-ui/mcp

A Model Context Protocol server exposing the
[GlassKit UI registry](https://glasskit.app/ui) to AI coding agents — so they
can discover and vendor Meta Ray-Ban Display components into a project.

**Tools:** `list_components` · `get_component` · `search_components`

```jsonc
// e.g. Claude Code / any MCP client (stdio)
{
  "mcpServers": {
    "glasskit": {
      "command": "npx",
      "args": ["@glasskit-ui/mcp"],
    },
  },
}
```

Point it at a custom registry with `GLASSKIT_REGISTRY` (default
`https://glasskit.app/ui/r`).

## License

[MIT](./LICENSE)
