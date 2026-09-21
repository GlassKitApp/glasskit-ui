Setup
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
Documentation MCP
Web Apps Game Plugin
Setup
Updated
:
Sep 19, 2026
Before loading a Web App on Meta Ray-Ban Display, prepare your device, the Meta
AI app, and a secure URL for your project.
Confirm that your glasses and Meta AI app meet the minimum versions.
Enable Developer Mode in the Meta AI app.
Publish your Web App at a publicly accessible HTTPS URL.
Optionally configure AI coding tools for implementation and documentation
guidance.
Check your hardware and software
Web Apps require Meta Ray-Ban Display glasses. Meta Neural Band is optional.
Install the Meta AI app from the
App Store
⁠
or
Google Play
⁠
,
and keep your Meta Ray-Ban Display glasses, Meta AI app, and Meta Neural Band up to date.
Check the Meta Ray-Ban Display glasses software version
Your Meta Ray-Ban Display glasses must run software version
v125
or later.
In the Meta AI app, tap
Devices
and select your glasses.
Open
Device settings
by tapping the gear icon.
Tap
General
About
Release Version
.
If the version is earlier than
v125
, install the available glasses update.
Check the Meta AI app version
The Meta AI app must be version
v272
or later.
Open the Meta AI app.
Tap
Settings
App Info
.
Check
App version
.
If the version is earlier than
v272
, update the app from the App Store or
Google Play.
Enabling Developer Mode in the Meta AI app
Developer Mode adds the controls used to load and reload Web Apps on your
Meta Ray-Ban Display glasses.
In the Meta AI app, tap
Settings
App Info
.
Tap
App version
five times.
In the confirmation dialog, tap
Enable
.
Developer Mode remains enabled when you close and reopen the Meta AI app.
Hosting your Web App
Publish your Web App at a publicly accessible HTTPS URL. The URL must use a
valid TLS certificate; HTTP-only URLs are not supported.
You can use a static hosting service such as GitHub Pages, Netlify, Cloudflare
Pages, or Vercel, an app-building platform such as Replit or Lovable, or your
own HTTPS server.
A website that loads successfully might still need layout, input, and display
work before it provides a good experience on Meta Ray-Ban Display glasses. Use the
Test guide
to load the URL on your Meta Ray-Ban Display glasses and
validate the experience.
Optional: Set up AI coding tools
The
Wearables Web App AI Toolkit
⁠
provides implementation and testing workflows. The public Wearables Documentation
MCP Server lets a coding assistant search current Web Apps documentation through
search_webapps_docs
.
Follow the
combined AI Toolkit and Wearables Documentation MCP Server setup instructions
to configure Claude Code, Codex, or Cursor.
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