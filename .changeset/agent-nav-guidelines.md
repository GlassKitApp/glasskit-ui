---
"@glasskit-ui/cli": patch
"@glasskit-ui/mcp": minor
---

Agent guidance now covers navigation and is glasses-first by default. The
scaffold's AGENTS.md / SKILL.md gain a "glasses-first golden rules" block, a
prominent "navigation is a history router" section (Navigator, the back
gesture, history.state restoration, useBackHandler), wayfinding
(DirectionArrow vs MapView), and component discovery via the MCP (no more
hardcoded component count). The MCP server gains a `glasskit_guidelines` tool
so an agent with only the MCP still learns the rules before generating screens.
