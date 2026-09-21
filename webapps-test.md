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
Documentation MCP
Web Apps Game Plugin
Test
Updated
:
Sep 19, 2026
Test a Web App in layers: use a desktop browser for fast feedback, use the Meta
Ray-Ban Display Simulator to preview display-specific behavior, and finish on the
glasses. Desktop checks shorten the iteration loop, but they do not replace device
validation.
Use this page with AI
Copy this prompt into your coding tool to create and run a focused test plan:
_
Create and execute a Web App test plan
Use https://wearables.developer.meta.com/docs/develop/webapps/test/, then use the Wearables Documentation MCP Server endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current Meta Ray-Ban Display Web Apps testing guidance. If search_webapps_docs is unavailable, use the linked test guide and state that documentation search was unavailable before proceeding. Inspect my app first. Create the smallest test plan that covers HTTPS hosting, responsive behavior at a 600 × 600 validation viewport, semantic controls, browser-managed directional navigation, visible focus, intentional overflow, Meta AI app connection, physical-device validation, and optional display recording. Fix only issues found by the test plan and run the relevant local checks.
Publish an HTTPS build
Your Web App must be available at a publicly accessible HTTPS URL before the
glasses can load it. See
Hosting your Web App
for
requirements and hosting options.
Test the same production build and URL that you intend to use. Confirm that the
page loads without certificate, asset, or console errors before moving to the
glasses.
Preview in a desktop browser
Open the Web App in a desktop or mobile browser to check ordinary web behavior.
In Chrome DevTools, use a 600 × 600 viewport as a validation target, not as a fixed
layout size. Resize around that target to verify that the layout responds to the
available viewport and handles overflow intentionally.
Use arrow keys and Enter for a quick keyboard check of focus order and activation.
This is only an approximation: wearable input is handled by the browser and
is not a page-level keyboard-event contract. On the device, verify the actual
spatial order, focus feedback, activation, scrolling, Back behavior, and text
input.
Preview with the Meta Ray-Ban Display Simulator
The
Meta Ray-Ban Display Simulator
⁠
is a Chrome extension that previews the 600 × 600 additive display surface. Use it
to iterate on layout, readability, focus, display tuning, and input before loading
every change onto the Meta Ray-Ban Display glasses.
The simulator is not a substitute for device validation. A desktop display cannot
reproduce the wearer’s surroundings, wearable input hardware, system composer,
sensor data, or device performance exactly.
Install the extension
Open the
Meta Ray-Ban Display Simulator
⁠
page in the Chrome Web Store.
Click
Add to Chrome
.
Open your Web App in Chrome.
Click the extension icon in the toolbar to turn on the simulator.
Use the simulator tools
The extension provides:
a 600 × 600 display frame with an optional frame overlay and additive blending;
built-in scenes, custom images, animated backgrounds, and a live webcam for
previewing the app over different surroundings;
on-screen directional controls and Select, which dispatch keyboard events to
the page like physical arrow keys and Enter;
app brightness, background brightness, background blur, and auto-dimming
controls;
a viewport recorder that exports a WebM video for demos or bug reports;
View on Glasses QR
, which generates a deep-link QR code for adding the
Web App to your own glasses during development; and
a quality checklist for viewport metadata, favicon configuration,
directional-focus targets, horizontal overflow, and visible focus styles.
Load the Web App on your glasses
First,
enable Developer Mode in the Meta AI app
.
Then add the Web App:
In the Meta AI app, tap
App Settings
in the left panel, then tap
Apps
.
Tap
Web Apps
Connect Web App
.
Enter the HTTPS URL.
Tap
Save
.
The Web App appears immediately at the bottom of the app grid on your Meta Ray-Ban
Display glasses. Pin it for faster access if needed, then select it to launch.
Validate on the Meta Ray-Ban Display glasses
Navigate up, down, left, and right through the Web App, and activate each selected
control. Verify that:
every critical control is reachable in a sensible spatial order;
selected controls have visible focus feedback, including near display edges;
activation triggers each action once;
content remains readable over bright and dark surroundings;
overflow scrolls intentionally and does not hide required actions;
Back reverses meaningful navigation and can return to the native app boundary;
text fields open the system composer and process committed text; and
optional sensors, location, speech, storage, and offline behavior fail
gracefully when unavailable.
Use a middle tap to open the universal Web App menu. It provides:
Restart
to reload the Web App;
Resume
to return to the Web App; and
Permissions
to manage permissions when the app requests them.
Record the Web App
Record the display when you need to demonstrate the experience or capture a bug.
From the Meta AI app:
Tap
Devices
and select your Meta Ray-Ban Display glasses.
Scroll through the controls below the glasses and tap
Record Display
.
From the glasses:
Open the glasses settings pane and select
Display Recording
.
When recording is complete, import the video to your phone’s camera roll.
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