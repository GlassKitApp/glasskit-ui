Overview | Meta Wearables Developers
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
Overview
Updated
:
Sep 19, 2026
Overview
Web Apps for Meta Ray-Ban Display glasses run in a Chromium-based browser. Build with
semantic HTML, responsive CSS, and the documented web APIs. Feature-detect
optional capabilities and provide a usable fallback when a permission, device,
or network service is unavailable.
Use these guides to build and test an app:
Display and layout
Input and navigation
Sensors and location
Text to speech
Storage and offline support
App icons
These pages describe platform behavior without requiring a particular framework
or component library.
Build with a coding assistant
Coding assistants and app-building tools can help with Web Apps when they use the
current platform documentation. Install the
Wearables Web App AI Toolkit
for
implementation and testing workflows, and connect to the
Wearables Documentation MCP Server
at
https://mcp.developer.meta.com/wearables
for current platform guidance. The
server’s
search_webapps_docs
tool can look up current documentation during a
task.
Use these prompts as starting points:
_
Build a new Web App
Read https://wearables.developer.meta.com/docs/develop/webapps/build/overview/, then use the Wearables Documentation MCP Server endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current Meta Ray-Ban Display Web Apps guidance. If the tool is unavailable, say so and use the linked documentation. Inspect my project before changing it, then build the smallest working version of this idea: [describe the app]. Use semantic controls, size the app from the available viewport, keep overflow intentional, preserve browser-managed directional navigation, and test the result at 600 × 600 and on the device.
_
Improve layout and navigation
Read https://wearables.developer.meta.com/docs/develop/webapps/build/overview/, then use the Wearables Documentation MCP Server endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current guidance. Inspect my project first. Replace fixed-size layout assumptions with responsive sizing, make every interactive control semantic and reachable through browser-managed directional navigation, keep focus visible, and use one intentional scroll owner per axis when content exceeds the viewport. Avoid custom global focus handlers. Test the result at 600 × 600 and on the device.
_
Debug an existing Web App
Read https://wearables.developer.meta.com/docs/develop/webapps/build/overview/, then use the Wearables Documentation MCP Server endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current constraints and troubleshooting guidance. If the tool is unavailable, say so and use the linked documentation. Inspect the app and identify whether the issue is layout, browser navigation, text input, storage, sensors, speech, or deployment. Make the smallest standards-based fix, preserve existing capabilities, and run the relevant checks.
Preview in desktop Chrome
Install the
Meta Ray-Ban Display Simulator
⁠
Chrome extension to preview the additive-display treatment and test a Web App in
desktop Chrome. Use it while iterating on layout, readability, focus, and
application flows without deploying every change to the device.
The simulator is a development preview, not a substitute for device testing. It
cannot reproduce the wearer’s surroundings, wearable input hardware, system
composer, sensor stream, paired-phone location, or speech output exactly.
HTML metadata
Add a description and identify the app as compatible with Meta Ray-Ban Display glasses:
head
meta name= description  content= Description of your web app
meta name= mrbd-web-app-capable  content= yes
/head
The compatibility tag is platform metadata. It does not replace runtime feature
detection or permission handling.
Capabilities
Capability
Description and guidance
Display and layout
The device has a 600 × 600 additive-light display. Treat that as a validation target, derive layout from the actual viewport, and make overflow intentional.
Directional navigation
The browser spatially navigates semantic, visible controls and activates the selected control. Ordinary pages do not need a custom focus manager.
Continuous drag
Apps can opt into pointer-event drag input for sliders, drawing, panning, games, and similar interactions. Keep a non-drag path for essential actions.
Text input
Supported HTML text fields open the system composer for handwriting, dictation, and on-screen keyboard input. Read committed text through standard
input
and
change
events.
Back navigation
The native shell integrates with standard browser history. Add history entries for destinations that Back should reverse and restore application state during traversal.
Motion and orientation
Permission-gated
DeviceMotionEvent
and
DeviceOrientationEvent
data. Treat fields as nullable and readings as time-sensitive.
Location
Permission-gated
navigator.geolocation
, normally sourced through the paired phone. Handle denied, unavailable, and timed-out requests.
Storage
localStorage
and
sessionStorage
for small string values. Writes can fail or data can be cleared, so handle both conditions.
Offline support
Service Workers and Cache Storage can provide an offline app shell after an online installation and successful activation.
Text to speech
A supported subset of
speechSynthesis
speaks concise content through the glasses speaker. Retain equivalent visible content so important information does not depend on speech.
App icons
A Meta Wearables manifest supplies the app name, monochrome artwork, and background treatment.
Capabilities can vary by runtime version, device state, permission, origin policy,
or hardware. Check for the API before use and handle an unavailable or denied
result without blocking the app’s core flow.
Validate on the device
After desktop and simulator testing, validate device-specific behavior on Meta
Ray-Ban Display before publishing. Test the additive display in varied
surroundings, navigation with the available wearable inputs, and every hardware-
or permission-dependent capability the app uses.
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