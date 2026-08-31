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
Aug 11, 2026
Overview
The recommended AI-assisted setup for Display Web Apps combines the
AI Coding plugin
⁠
with the shared public Wearables MCP server. The plugin provides implementation and testing workflows; MCP lets your editor or agent query current Web Apps guides and references. Use both when your tool supports them.
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
Use this page with AI
Copy this prompt into your AI tool to configure both parts of the recommended setup:
Use https://wearables.developer.meta.com/docs/develop/webapps/ai-assisted-mcp/ to configure AI-assisted Meta Ray-Ban Display Web Apps development. Inspect this project and AI tool setup first. If the Web Apps AI Coding plugin is missing, install it using the instructions for my tool. Add the Wearables MCP endpoint https://mcp.developer.meta.com/wearables, verify that the plugin skills and search_webapps_docs are available, and ask search_webapps_docs what I should install and check before building my first Web App. Do not edit app code until both tools are ready and the test query returns relevant guidance.
Claude Code
In Claude Code, add the plugin marketplace and install the AI Coding plugin:
/plugin marketplace add https://github.com/facebook/meta-wearables-webapp
/plugin install meta-wearables-webapp@meta-wearables
Then add the Wearables MCP server with the Claude CLI:
claude mcp add --transport http wearables https://mcp.developer.meta.com/wearables
To check the configuration into your project, use project scope:
claude mcp add --transport http wearables --scope project https://mcp.developer.meta.com/wearables
Verify that Claude Code can see the server:
claude mcp list
Start a fresh Claude Code session if the running session does not discover the plugin or MCP server. Confirm that the Web Apps skills and
search_webapps_docs
are available.
Example prompt:
Use the installed Web Apps plugin for implementation guidance. Then ask search_webapps_docs what I should install and check before building my first Meta Ray-Ban Display Web App.
Codex
Add the AI Coding plugin marketplace with the Codex CLI:
codex plugin marketplace add https://github.com/facebook/meta-wearables-webapp
Start Codex, open
/plugins
, select
Meta Wearables
, and install the Web Apps plugin. Then add the Wearables MCP server:
codex mcp add wearables --url https://mcp.developer.meta.com/wearables
Verify that the server is enabled:
codex mcp list
Start a fresh Codex session if the running session does not discover the plugin or MCP server. Confirm that the Web Apps skills and
search_webapps_docs
are available.
Example prompt:
Use the installed Web Apps plugin for implementation guidance. Then ask search_webapps_docs what I should install and check before building my first Meta Ray-Ban Display Web App.
Cursor
Install the AI Coding plugin from the public repository:
git clone https://github.com/facebook/meta-wearables-webapp.git
cd meta-wearables-webapp
./install-skills.sh cursor
Restart Cursor or run
Developer: Reload Window
so it discovers the plugin. Then add the endpoint as an HTTP MCP server:
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
After saving the config, reconnect the server or restart Cursor. Confirm that the Web Apps plugin and
search_webapps_docs
are available, then ask Cursor Chat to search the Web Apps docs through the MCP tool.
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
I want to build my first Meta Ray-Ban Display Web App with an AI coding assistant. What should I install and check before I start?
Returns the recommended AI Coding plugin and MCP setup before project scaffolding.
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
GitHub Discussions (iOS)
GitHub Discussions (Android)
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
GitHub Discussions (iOS)
GitHub Discussions (Android)
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
GitHub Discussions (iOS)
GitHub Discussions (Android)
© 2026 Meta