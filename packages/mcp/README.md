# @glasskit-ui/mcp

A Model Context Protocol server exposing the
[GlassKit UI registry](https://glasskit.app/ui) to AI coding agents — so they
can discover and vendor Meta Ray-Ban Display components into a project.

**Tools:** `glasskit_guidelines` · `list_components` · `get_component` ·
`get_component_example` · `get_add_command` · `search_components`

- **`get_component_example`** — a concise usage example for one component (the
  shape to copy), instead of its full source.
- **`get_add_command`** — a single batched install command that adds several
  components at once, plus each one's registry dependencies.

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
