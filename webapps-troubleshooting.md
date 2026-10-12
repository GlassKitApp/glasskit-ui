Troubleshoot | Meta Wearables Developers
Build for Wearables
API reference
Support
Login
Register
Web Apps
Setup
Develop
Overview
Wearables Web App AI Toolkit
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
Troubleshoot
Updated
:
Sep 30, 2026
Overview
Start by narrowing the problem to the Web App, its hosted build, or the device. Reproduce the issue with the same HTTPS URL and the smallest reliable sequence of actions before changing code.
Check the environment first
Update your glasses and the Meta AI app to the latest available versions.
Confirm that Developer Mode remains enabled in the Meta AI app.
Open the production HTTPS URL in a desktop browser and check the browser console and network panel for errors.
Preview the app at a 600 × 600 validation viewport and with the Meta Ray-Ban Display Simulator.
Reproduce the issue on the Meta Ray-Ban Display glasses. Desktop and simulator behavior can narrow the cause, but neither replaces device validation.
See
Setup
for device and hosting requirements and
Test
for the complete validation workflow.
Use this page with AI
Copy this prompt into your coding tool to investigate an issue without broad, unrelated changes:
_
Diagnose and minimally fix a Web App issue
Use https://wearables.developer.meta.com/docs/develop/webapps/troubleshoot/, then use the Wearables Documentation MCP Server endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current Meta Ray-Ban Display Web Apps troubleshooting guidance. If search_webapps_docs is unavailable, use the linked troubleshooting guide and state that documentation search was unavailable before proceeding. Inspect the app, its production URL, and the exact failing behavior first. Determine whether the issue is hosting, responsive layout, browser-managed navigation, focus, icon configuration, permissions, sensors, storage, or device setup. Reproduce the issue before editing code, make the smallest standards-based fix, preserve existing capabilities, and run the relevant local and device checks.
The Web App does not load
Confirm that the launch URL is publicly accessible and uses HTTPS with a valid TLS certificate.
Open the exact URL in a desktop browser. Check for redirects, missing assets,blocked requests, certificate errors, and JavaScript exceptions.
Verify that Developer Mode is enabled and that the Web App connection in the Meta AI app uses the intended URL.
If a newly deployed build behaves like an older version, reload the Web App from its universal menu and confirm that the host is serving the new assets.
If the app depends on offline support, test one successful online load before testing offline behavior. Handle unavailable or evicted cached data rather than assuming it will always be present.
Layout or content is difficult to use
Treat 600 × 600 as a validation viewport, not a fixed CSS layout size.
Resize around that viewport and look for clipped content, horizontal overflow, overlapping controls, and text that cannot wrap.
Keep important controls away from obstructed edges and verify focus feedback in every position.
Test readability over both bright and dark surroundings. The additive display does not reproduce an ordinary desktop background.
Give overflowing content an intentional scroll owner instead of hiding it or shrinking it until it becomes unreadable.
Directional navigation or activation fails
Use native buttons, links, inputs, selects, and text areas where possible.
Confirm that every required control is visible, enabled, and reachable in a sensible spatial order.
Remove global arrow-key focus managers, positive
tabindex
values, and synthesized clicks that compete with browser-managed navigation.
Keep selected controls visibly distinguishable and test controls near viewport edges and inside scroll regions.
Use arrow keys and Enter for a quick desktop approximation, then verify actual directional navigation, activation, scrolling, Back, and text input on the glasses.
I can’t see Developer Mode on my glasses
If you’ve turned on Developer Mode but still can’t see Web Apps on your Meta Ray-Ban Display (MRBD) glasses, this issue may be due to one of the following two reasons:
Web Apps isn’t available in your country
Your account doesn’t meet our age and eligibility criteria.
Developer Mode doesn’t change either of these.
Turning it on gives you access to developer tools, but it
doesn’t
change whether your account is eligible to see Web Apps. You can troubleshoot these issues by following these steps.
Check that Developer Mode is turned on
From the Meta AI mobile app, tap
Menu
in the top left, then tap
Settings
.
Scroll to
App info
, then tap
Developer Mode
.
If you don’t see
Developer Mode
, tap the build number five times, then check again.
Once your glasses are connected, close and then reopen the Meta AI app.
Check your account’s age and eligibility
As mentioned above, if your account doesn’t meet our age and eligibility criteria, you won’t see Web Apps on your glasses, even with Developer Mode turned on.
This can also happen when you don’t have a date of birth on file for your account, which is common for accounts created for testing. Adding one lets us confirm your eligibility.
If you think your birthday was entered incorrectly, you can update it in your account settings.
Before you update your birthday
You can only update your birthday twice. After that, you’ll need to choose from a birthday you’ve already provided.
After you change your birthday, you’ll need to wait one week before you can change it again.
If your Meta account is connected to Facebook or Instagram, changing your birthday in one place updates it across all of them.
Update your birthday in the Meta AI app
From the Meta AI mobile app, tap
Menu
in the top left.
Tap
Settings
.
Scroll down to
Your account.
Tap either
Accounts center
or
Meta account
, depending on which one you see in your version of the Meta AI app. Then, choose one of the following, based on your user experience:
In
Accounts center
, tap
Profiles and personal details
.
In
Meta account
, tap
Your information and permissions
.
Tap
Birthday
, then tap
Edit
.
Enter your correct date of birth, and tap
Save
.
If we ask you to confirm your birthday, follow the steps on the screen. You’ll need a government-issued photo ID.
Update your birthday in a web browser
Go to
accountscenter.meta.com
⁠
. If you aren’t logged in, or you’re already logged but with a Meta different account, log in with the correct account you use with your glasses.
You’ll see one of these two options:
If the page is titled
Accounts center
, select
Profiles and personal details.
If the page is titled
Meta account
, select
Your information and permissions
.
Select
Birthday
, then select
Edit
.
Enter your correct date of birth, and select
Save
.
If we ask you to confirm your birthday, follow the steps on the screen. You’ll need a government-issued photo ID.
If you still can’t see Web Apps
Check that your glasses and the Meta AI app are both up to date. Then, restart your glasses and reconnect them.
If none of the steps above work, contact us so we can look into it following the
Report Feedback
directions below.
A device capability is unavailable
Treat permission denial, unavailable hardware, stale sensor values, location timeouts, speech errors, and storage failures as normal runtime outcomes.
Check the browser console for the exact error and show a useful fallback in the interface.
Verify the behavior on the glasses. Desktop browsers do not reproduce wearable sensors, paired-phone location, the system text composer, or speech output exactly.
Keep essential actions available when optional hardware or runtime capabilities are unavailable.
Known issues
Issue
Workaround
SVG favicons are not supported
Use a PNG favicon larger than 52 × 52 pixels.
Report feedback
To report a bug, request a feature, or share other feedback about Meta Ray-Ban Display Web Apps, visit the
Wearables Web App AI Toolkit
⁠
repository.
Include the smallest reproduction steps, the affected URL when it is safe to share, the Meta Ray-Ban Display glasses and Meta AI app versions, and screenshots or a display recording when they help explain the issue.
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