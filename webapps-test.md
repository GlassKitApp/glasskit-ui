Test
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
Test
Updated
:
Jun 30, 2026
Overview
Once you’ve built a Web App, you will need to test it.
Use this page with AI
Copy this prompt into your AI coding tool to test a Web App before sharing it:
Use https://wearables.developer.meta.com/docs/develop/webapps/test/, then use the Wearables MCP endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current Meta Ray-Ban Display Web Apps testing guidance. If search_webapps_docs is unavailable, use the linked test guide and state that MCP docs lookup was unavailable before proceeding. Inspect my app first, then create the smallest test plan for HTTPS hosting, 600 x 600 desktop browser checks, arrow-key and Enter navigation, Meta AI app connection, sharing, and optional display recording. Fix only issues found by the test plan and run the relevant local checks.
Hosting your Web App
Web Apps for Meta Ray-Ban Display glasses must be served over HTTPS from a publicly accessible URL. See
Hosting your Web App
for details.
Accessing your Web App on Meta Ray-Ban Display glasses
In the Meta AI app, after you’ve enabled Developer Mode (see
Enabling Developer Mode in the Meta AI app
):
Tap
App Settings
(left panel)
App Connections
Select
Web Apps
Add a Web App
Add an app name and your URL
Tap
Connect
Your Web App will appear immediately at the bottom of your Meta Ray-Ban Display glasses app grid. You can then pin it for easier access.
Select your Web App in MRBD to launch it. Once in the Web App, you can use up/down/left/right swipes and index pinch or tap. A middle pinch will surface a universal Web App menu with:
A
Restart
button to reload the Web app
A
Resume
button to return to the Web app
A
Permissions
button to manage permissions (if necessary)
Testing on other devices
Your Web App will run on any other browsers, like on your computer or mobile phone. If it works on your computer with up/down/left/right arrow keys and Enter, it should also work on your glasses. If you use Chrome debugging tools, set the viewport to 600 x 600 px.
Testing with Display Simulator Chrome Extension
The
Meta Ray-Ban Display Web App Simulator
is a Chrome extension that recreates the 600×600 pixel display surface of Meta Ray-Ban Display glasses directly in your browser. The glasses display is unlike any phone or desktop screen — additive (black = transparent), D-pad-only input, and viewed against the real world. The simulator closes this gap by letting you preview and QA your Web Apps with additive blending, environment backgrounds, D-pad input, display tuning, and recording, all without needing physical hardware.
Installing the extension
Visit the
Meta Ray-Ban Display Web App Simulator
⁠
extension page in the Chrome Web Store.
Click
Add to Chrome
.
Navigate to your Web App in Chrome and click the extension icon in the toolbar to toggle the simulator on.
Features
600×600 px display frame
: Exact MRBD resolution with optional frame overlay and additive blending.
Environment backgrounds
: Built-in scenes, custom image upload, animated backgrounds, and live webcam for real-world blending preview.
D-pad input
: On-screen directional buttons and Select that dispatch keyboard events into your Web App. These correspond with physical arrow keys and Enter.
Display settings
: App brightness, background brightness, background blur, and auto-dimming controls.
Viewport recorder
: Record the simulator viewport as a downloadable WebM video for demos or bug reports.
View on Glasses QR
: Generate a deeplink QR code to add your Web App to your MRBD via the Meta AI App, or share the QR code with others so they can add it too.
QA checklist
: Automated checks for viewport meta, favicon, D-pad-focusable elements, horizontal overflow, and visible focus styles.
Sharing your Web App
After testing your Web App, you can easily share it with other users:
In the Meta AI app, go back to
App Settings
App Connections
.
Tap on your Web App.
Tap the
Share link
button.
Others who receive the link can also access your Web App. If they have Developer Mode enabled, they’ll be one tap away from adding your Web App. Otherwise, they’ll be asked to enable Developer Mode first.
If you use the MRBD Web App
AI Coding plugin
⁠
, it can generate the deeplink and QR code to scan with your phone to add the Web App in the Meta AI App.
Recording your Web App
You can now record video of your MRBD while running and using your Web App, in order to show others what the experience is like.
From Meta AI app:
In the Meta AI app, tap
Devices
(the glasses icon), and scroll to your MRBD glasses.
Scroll the buttons underneath the glasses and tap the
Record Display
button.
From MRBD:
From the glasses settings pane, tap the
Display Recording
button.
When you’re done recording, import the media to your camera roll.
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