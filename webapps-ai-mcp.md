Web Apps MCP
Build for Wearables
API reference
Support
Login
Register
Web Apps
Setup
Build
Test
Troubleshoot
Web Apps MCP
Web Apps MCP
Updated
:
Jun 22, 2026
Overview
Display Web Apps use the shared public Wearables MCP server for live documentation search. Use it when you want your editor or agent to query current Web Apps guides and references while building with the
AI Coding plugin
⁠
.
For coding tasks, pair this MCP server with the Web Apps GitHub plugin. The plugin provides Display Web Apps implementation patterns and constraints; MCP provides current documentation lookup while the assistant works.
The Web Apps docs tool is:
search_webapps_docs
— semantic search over Display Web Apps guides and references
When your client exposes an output or response format option, choose Markdown. Markdown results preserve headings, links, tables, and code blocks, which makes it easier for the assistant to quote the docs accurately before editing code.
The shared Wearables MCP server also includes DAT docs search, but use
search_webapps_docs
for Display Web Apps questions.
The public endpoint is:
https://mcp.developer.meta.com/wearables
Use the direct MCP host above. Do not use the Wearables developer site URL as the MCP endpoint.
The AI Coding plugin provides the coding skills for creating, testing, and publishing Web Apps. The MCP server complements those skills with live Web Apps documentation lookup. Use both when your tool supports them.
Use this page with AI
Copy this prompt into your AI tool to connect live Web Apps docs search:
Use https://wearables.developer.meta.com/docs/develop/webapps/ai-assisted-mcp/ to configure the public Wearables MCP server. Inspect this project and AI tool setup first, then help me add https://mcp.developer.meta.com/wearables, verify that search_webapps_docs is available, and run a test query for Meta Ray-Ban Display Web Apps viewport and input guidance with Markdown-formatted results if the client supports output formats. Also check whether the Web Apps GitHub plugin is installed for this project, because MCP should complement that coding context. Do not edit app code until the MCP connection works and the test query returns relevant Web Apps guidance.
Claude Code
Add the Wearables MCP server with the Claude CLI:
claude mcp add --transport http wearables https://mcp.developer.meta.com/wearables
To check the configuration into your project, use project scope:
claude mcp add --transport http wearables --scope project https://mcp.developer.meta.com/wearables
Verify that Claude Code can see the server:
claude mcp list
Example prompt:
Search the Wearables Web Apps docs for the required viewport size.
Cursor
Add the endpoint as an HTTP MCP server:
Open
Settings
and go to
MCP
.
Add a new server.
Set the name to
wearables
.
Set the transport or server type to
HTTP
.
Use
https://mcp.developer.meta.com/wearables
as the URL.
If your Cursor build uses JSON-backed MCP settings, the entry should look like this:
{
mcpServers : {
wearables : {
type :  http ,
url :  https://mcp.developer.meta.com/wearables
}
}
}
After saving the config, reconnect the server or restart Cursor. You can then ask Cursor Chat to search the Web Apps docs through the MCP tool.
MCP Inspector
Use MCP Inspector for a direct endpoint check:
npx @modelcontextprotocol/inspector
In the browser UI:
Set
Transport Type
to
Streamable HTTP
.
Set
URL
to
https://mcp.developer.meta.com/wearables
.
Set
Connection Type
to
Direct
.
Click
Connect
.
Run:
Initialize the session.
Open
Tools
and click
List Tools
.
Confirm that
search_webapps_docs
is present.
Run
search_webapps_docs
with a query such as
viewport size
, and request Markdown output if your client exposes a format option.
If your Inspector build labels the transport as
HTTP
instead of
Streamable HTTP
, use the HTTP option with the same URL.
Example queries
These are representative queries for the Web Apps MCP tool:
What viewport size should a Display Web App use?
Returns the fixed viewport guidance and related display constraints.
How do I handle arrow key and Enter input?
Returns input guidance for directional navigation and selection events.
How do I test a Web App on Meta Ray-Ban Display glasses?
Returns setup, hosting, and testing steps for loading a Web App onto glasses.
What Web APIs are supported for sensors and location?
Returns guidance for motion, orientation, and geolocation APIs.
Troubleshooting
Symptom
Likely cause
Fix
The server does not connect
The client is still using an old or cached URL
Re-enter
https://mcp.developer.meta.com/wearables
and reconnect
No tools appear
The client did not finish initialization
Reconnect, then run initialize before
tools/list
The client asks for auth
The server was configured with stale custom headers
Remove custom auth headers and reconnect
Search results are too broad
The query is too vague
Include
Web Apps
, a guide name, or an exact capability in the query
Build with Meta
Social Technologies
Meta Horizon
AI
Worlds
Wearables
About us
Careers
Research
Products
Support and legal
Wearables Developer Terms
Acceptable Use Policy
Legal
Privacy
Build with Meta
Social Technologies
Meta Horizon
AI
Worlds
Wearables
About us
Careers
Research
Products
Support and legal
Wearables Developer Terms
Acceptable Use Policy
Legal
Privacy
Build with Meta
Social Technologies
Meta Horizon
AI
Worlds
Wearables
About us
Careers
Research
Products
Support and legal
Wearables Developer Terms
Acceptable Use Policy
Legal
Privacy
English (US)
© 2026 Meta