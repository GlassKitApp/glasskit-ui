Setup | Meta Wearables Developers
Build for Wearables
API reference
Support
Login
Register
Web Apps
Setup
Develop
Overview
AI Toolkit
Web Apps Game Plugin
App icons
Display and layout
Input and navigation
Sensors and location
Text to speech
Storage and offline support
UI Toolkit for Meta Ray-Ban Display
Overview
Getting started
What is the toolkit?
Installation
Coding-agent skills
Semantic tokens
Theming
Guides
Application structure
Screen layout
Navigation and focus
Route navigation
Screen patterns
Application patterns
Component authoring
Customization and composition
Theming and customization
Materials, motion, focus, and portals
Accessibility, performance, and validation
Correct patterns
Foundations
Overview
Theme
Theme API
Colors
Typography
Spacing
Corner radius
Materials
Overview
Default container material
Material library
Custom materials
Shape providers
Motion
Overview
Interpolated motion
Spring motion
Second-order motion
Utilities
Icons
Accessibility
Performance and validation
Floating portals
Smooth corners
Components
Overview
Foundation components
App
Card
CardStack
Carousel
Container
FocusNavigationProvider
IconImage
IconWithContainerMaterial
InteractableBase
Interactions
MediaWrapper
Pager
PageTransition
Panel
ScrollView
Shimmer
StaticContainer
Surface
TextSwitcher
TextView
VerticalList
Vignette
Meta Ray-Ban Display components
Overview
ActionHint
AppBadge
AppControlTile
Avatar
Button
ButtonDivider
ButtonGroup
ButtonRail
Chip
CircularProgressBar
ContainerHeader
ContextMenu
ContextMenuItemView
ControlTile
Divider
Header
IndeterminateLoader
InputTextView
IsolatedControl
ListItem
Modal
NotificationBadge
Page
PaginationIndicator
ProgressIndicator
ProgressRing
QuickReplyButton
RadioButton
ReadMoreTextView
Scrim
Scrubber
SliderBar
SubNavigation
SubNavigationPager
SwipeIndicator
SwipeToReveal
Switch
Tag
Toast
Tooltip
TooltipContainer
VerticalMenu
VerticalMenuButton
VolumeIndicator
WebAppIcon
ZoomIndicator
Test
Troubleshoot
WebMCP agent tools
Wearables Documentation MCP
Acceptable use
Setup
Updated
:
Oct 8, 2026
The recommended AI-assisted setup for Meta Ray-Ban Display Web Apps takes four steps:
Set up AI coding tools.
Install the AI Coding plugin and connect the Wearables MCP server before scaffolding your first project.
Check your hardware.
Confirm your glasses, paired phone, and (optionally) Meta Neural Band meet the minimum requirements.
Check your Meta AI app and enable Developer Mode.
Verify the app version on your phone, then put the app into Developer Mode so it can load Web Apps onto the glasses.
Prepare to host your Web App.
Pick a hosting platform that serves your app over HTTPS so the glasses can load it.
Set up AI coding tools
The recommended workflow combines the
AI Coding plugin
⁠
with the
Wearables MCP server
. The plugin provides Web Apps implementation and testing workflows. The MCP server provides current published documentation through
search_webapps_docs
.
Use the
Web Apps AI and MCP setup instructions
to install both tools for Muse Code, Claude Code, Codex, or Cursor before asking the assistant to scaffold a project.
Use this page with AI
Copy this prompt into your AI coding tool to prepare a Web App development setup:
Use https://wearables.developer.meta.com/docs/develop/webapps/setup/ and https://wearables.developer.meta.com/docs/develop/webapps/wearables-documentation-mcp/ to prepare my Meta Ray-Ban Display Web Apps setup. Inspect my project and AI tool configuration first. If the Web Apps AI Coding plugin or Wearables MCP endpoint https://mcp.developer.meta.com/wearables is missing, help me configure it before proceeding. Verify that the plugin skills and search_webapps_docs are available, then ask search_webapps_docs for current first Web App setup guidance. Produce the smallest checklist for tooling, hardware, Meta AI app version, Developer Mode, HTTPS hosting, and local browser verification. Do not edit app code until the setup gaps are clear.
Requirements
Hardware
Web Apps are supported only on Meta Ray-Ban Display (MRBD) glasses. Meta Neural Band is optional, though recommended for an optimal experience.
Software
Download the Meta AI app from the
App Store (iOS)
⁠
or
Play Store (Android)
⁠
if you haven’t done so already.
For the best experience, always update your glasses and Meta Neural Band with the latest software updates.
Glasses
The minimum glasses software version is
v125
+. To verify the glasses software version:
In the Meta AI app, tap
Devices
(the glasses icon), and select your device.
Tap the gear icon to open
Device settings
.
Tap
General
About
Release Version
.
Check for glasses software updates if your version is below
v125
.
Meta AI App
The minimum Meta AI app version is
v272
+. To verify Meta AI app version:
Open the
Meta AI app
.
Tap
Settings
App Info
.
Note the
App version
number. If it’s older than
v272
, update the Meta AI app from the App Store (iOS) or Play Store (Android).
Enabling Developer Mode in the Meta AI app
Developer Mode in the Meta AI app unlocks the menu options used to load and reload Web Apps on MRBD.
Open the Meta AI app on your paired iOS or Android device.
Select
Settings
App Info
, and then tap the
App version
number five times to display a pop-up that enables Developer Mode.
Click
Enable
to confirm.
Note:
Developer Mode persists across sessions, so you don’t need to re-enable it each time you open the Meta AI app.
Hosting your Web App
Your Web App must be hosted on a publicly accessible HTTPS URL so MRBD can load it.
Common options include: Replit, Lovable, Vercel, GitHub Pages, Netlify, Cloudflare Pages, or any static site host that serves over HTTPS. You can also host from your own server, as long as it serves the app over HTTPS with a valid TLS certificate.
While it’s possible to point MRBD at any website, most sites are not configured to work well within the platform’s display and input constraints. See the
Build guide
for the design and runtime constraints to keep in mind.
Note:
HTTP-only URLs are not supported. The glasses runtime requires HTTPS for every Web App URL it loads.
Installing a Web App
Wearers add a Web App to their glasses in one of two ways: by scanning a QR code, or by activating an install control on a page they already have open. Both routes end at the same on-glasses confirmation, and neither can add an app without the wearer agreeing to it.
QR code
A Web App is added by scanning a QR code that encodes an install link, since a plain QR of your site’s URL is not recognized. Rather than hand-crafting one, generate the install link and its QR code with a supported tool: either the
View on Glasses QR
feature of the Meta Ray-Ban Display Simulator, or the MRBD Web App AI Coding plugin, both of which are covered in the
Test page
. Put the generated QR code somewhere a wearer can look at it, like a page on your site, a slide, or a printed card. The deeplinking URL scheme for QR codes should follow this template:
fb-viewapp://web_app_deep_link?appName= name  appUrl= https-url
.
When the wearer looks at the code with their glasses, the glasses recognize it, and an add-to-glasses screen appears for them to confirm. Screen content depends on which surface handles it. The App Manager resolves an icon from your site’s appearance, or shows a placeholder when it can’t. Meanwhile, the legacy dialog shows your app’s name, an optional description, and its URL. In this case, an app icon is not guaranteed.
Because your app has not been reviewed, the confirmation screen marks it as unverified. Expect wearers to see that label and write your app name and description so they can tell it is yours.
Serve the app over HTTPS. The QR parser rejects an HTTP inner URL, and HTTPS is required for Web Apps generally.
navigator.install()
From a page already open on the glasses, you can offer installation directly:
if (navigator.install) {
installButton.hidden = false;
}
installButton.addEventListener( click , async () =  {
try {
await navigator.install();
} catch (err) {
// Installation is unavailable, or the URL was rejected.
showManualInstructions();
}
});
navigator.install
is
undefined
outside the glasses runtime — for example in a regular browser — so the check above keeps the control hidden where installation could never work. It does not, however, guarantee that a call will succeed: on a Web App page the property is defined even when installation is gated off, and
navigator.install()
then rejects. Treat rejection as an expected outcome and always keep the
catch
.
Arguments
Both arguments are optional:
navigator.install(installUrl, options);
Argument
Notes
installUrl
Optional. The URL to install. Defaults to the current page. Relative URLs resolve against the document’s base URL. Must be
https:
or
http:
.
options.name
Optional. The name shown on the confirmation screen. Defaults to
meta name= application-name
, then the document title, then the hostname, and finally the literal
App
.
Set
options.name
, or a
meta name= application-name
tag, so the confirmation screen shows your app’s name rather than whatever your
title
happens to be on the current page.
A resolved promise does not mean the app was installed.
It means only that the install request was dispatched — accepted for launch, not confirmed as shown. The confirmation screen is not guaranteed to appear: the launched flow can still fail its own gate and finish immediately. And even when it does appear, the wearer may decline, with no callback telling you what they chose. Do not change your UI to an installed state on resolution, and do not count resolutions as installs.
Rejections
Error
Cause
DataError
The
installUrl
could not be resolved, or is not
https:
or
http:
.
NotSupportedError
Installation is not available on this device, or the URL was rejected.
AbortError
The install request could not be dispatched.
Always catch. Rejection is a normal outcome, not a bug, because availability depends on the device.
The
install
element
An
install
element with an
installurl
or
href
attribute also triggers installation when activated:
install installurl= https://example.com/myapp  Add to glasses /install
Prefer
navigator.install()
. The element’s failures are swallowed, so you cannot detect that installation was unavailable and cannot offer a fallback.
install
is also not a real element on other browsers, where it renders as an inert inline box and does nothing when clicked, so anything you put inside it needs to make sense as plain text.
Build with Meta
Social Technologies
VR
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
VR
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
VR
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