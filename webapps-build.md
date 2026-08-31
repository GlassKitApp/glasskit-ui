Build
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
Build
Updated
:
Aug 26, 2026
Overview
Web Apps for Meta Ray-Ban Display glasses (MRBD) use standard web APIs. The easiest way to build Web Apps is with AI coding tools.
Learn how to build optimized Meta Ray-Ban Display Web Apps by understanding:
How to Build with AI
Capabilities and Best Practices
Display
Neural band and captouch
EMG pinch and drag
Back navigation
Text composer
Sensors
Location
Local storage
Offline mode
App icons
Build with AI
AI coding tools and app platforms such as Replit, Manus, Lovable, Claude Code, Vercel, and Cursor can help build Web Apps for Meta Ray-Ban Display glasses when prompts include the platform constraints. The most reliable setup combines the
Web Apps GitHub plugin
⁠
, this guide, and the Wearables MCP endpoint https://mcp.developer.meta.com/wearables and its
search_webapps_docs
tool.
Use these prompts to get started quickly. They tell the assistant to inspect your project first, use the Wearables MCP endpoint https://mcp.developer.meta.com/wearables to call
search_webapps_docs
for current docs, handle unavailable MCP tools explicitly, and keep the first code change small.
New Web App
Use https://wearables.developer.meta.com/docs/develop/webapps/build/, then use the Wearables MCP endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current Meta Ray-Ban Display Web Apps constraints, setup, testing, and publishing guidance. If search_webapps_docs is unavailable, use the linked build guide and state that MCP docs lookup was unavailable before proceeding. Inspect my project first, then build the smallest working Web App for this idea: [describe the app]. It must render in a fixed 600 x 600 pixel viewport, avoid scrolling, use a dark additive-display UI, support arrow-key navigation and Enter activation, and keep all interactive elements reachable without mouse or touch input. Run the relevant local checks.
Navigation and focus behavior
Use https://wearables.developer.meta.com/docs/develop/webapps/build/, then use the Wearables MCP endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current Meta Ray-Ban Display Web Apps input, D-pad navigation, focus-management, viewport, and no-scroll guidance. If search_webapps_docs is unavailable, use the linked build guide and state that MCP docs lookup was unavailable before proceeding. Inspect this Web App first, then add the smallest reliable navigation fix. Preserve arrow-key movement, Enter activation, visible focus states, a fixed 600 x 600 pixel viewport, and no scrolling. Run the relevant local checks.
Debug an existing Web App
Use https://wearables.developer.meta.com/docs/develop/webapps/build/, then use the Wearables MCP endpoint https://mcp.developer.meta.com/wearables to call search_webapps_docs for current Meta Ray-Ban Display Web Apps constraints and troubleshooting guidance. If search_webapps_docs is unavailable, use the linked build guide and state that MCP docs lookup was unavailable before proceeding. Inspect this Web App first and identify whether the issue is layout, input navigation, storage, sensors, or deployment. Preserve the fixed 600 x 600 pixel viewport, no-scrolling behavior, arrow-key and Enter input model, and dark additive-display UI. Make the smallest fix and run the relevant local checks.
HTML metadata
Add the following metadata to the
head
of your HTML file. This allows your web app to support upcoming discovery surfaces and enables us to message users when a website isn’t compatible with MRBD.
head
!-- A brief description of your app --
meta name= description  content= Description of your web app
!-- Identify your web app as MRBD-compatible --
meta name= mrbd-web-app-capable  content= yes
/head
Capabilities
Web Apps on MRBDs
support
these capabilities:
Capability
Description and guidance
Display
Additive waveguide overlay. Use dark backgrounds/light, high-contrast UI colors. Fixed 600x600px viewport. Avoid scrolling.
Input
Navigation via Neural Band/captouch gestures translates to standard arrow key and Enter events.  EMG pinch and drag gestures are translated into standard web events. On-glasses composer provides text input. No mouse/touch/keyboard. All elements must be focusable.
Sensors (IMU)
Standard
DeviceMotionEvent
(accelerometer, gyroscope) and
DeviceOrientationEvent
(heading, tilt, roll) W3C APIs. Requires user permission.
Location (GPS)
Standard
navigator.geolocation
W3C API. Location is fetched from the paired mobile device. Requires user permission.
Local storage
Standard Web Storage APIs (
localStorage
,
sessionStorage
). Best for lightweight data (preferences, small caches). Use JSON for structured data.
Offline mode
Standard Service Workers and Cache API. Save a copy of your app’s files directly on a device, so apps can load and render without a network request.
App icons
Use Unicode symbols or high-resolution PNG favicons ( = 52x52 px) via
link
tags or Web App Manifest. SVGs are not supported.
Web Apps do
not yet support
:
Camera
Microphone
Notifications
Display
The display is an additive waveguide that overlays rendered pixels onto the wearer’s real-world view. This has a direct impact on how your app looks.
A pixel rendered as pure black is fully transparent, since it contributes zero light.
Bright, vivid colors are the most visible, because they add light on top of the real-world scene.
Color and typography
Because the display is additive, color choices matter more than on a conventional screen:
Use dark backgrounds, since they effectively disappear. Bright backgrounds cause glare and reduce readability.
Use light, high-contrast colors for UI elements like text and interactive components. Also, use bright colors for accents.
Use large, readable fonts: a minimum of 16 px for body text and 20-24 px for primary content.
Viewport
All content should render within a fixed 600 x 600 pixel viewport and avoid scrolling.
Include the following viewport
meta
tag to lock the scale and prevent unexpected zooming:
!-- optional --
meta name= viewport  content= width=600, height=600, initial-scale=1.0, user-scalable=no
Set
overflow: hidden
on the
body
element to ensure no content extends beyond the viewport boundary:
body {
width: 600px;
height: 600px;
overflow: hidden;
}
Input: Neural band and captouch gesture
MRBD UI navigation is driven by two input mechanisms: the Neural Band worn on the wrist and captouch, a touch strip on the glasses temple arm that senses swipe gestures. They produce directional and selection inputs that the glasses OS translates into standard arrow key (
ArrowUp
,
ArrowDown
,
ArrowLeft
,
ArrowRight
) and
Enter
events delivered to your Web App.
Since MRBDs have no mouse, touch screen, or physical keyboard, every interactive element of your Web App must be reached and activated by gestures through these two mechanisms. These inputs are then translated into standard web platform events.
JavaScript
// — Input Constants —
const DPAD = {
UP:  ArrowUp , DOWN:  ArrowDown ,
LEFT:  ArrowLeft , RIGHT:  ArrowRight ,
SELECT:  Enter , BACK:  Escape ,
};
// — Focus Management —
function moveFocus(direction) {
var focusables = Array.from(
document.querySelectorAll( .focusable:not([disabled]):not(.hidden) )
);
if (!focusables.length) return;
var idx = focusables.indexOf(document.activeElement);
if (idx === -1) { focusables[0].focus(); return; }
var next = (direction ===  up  || direction ===  left )
? (idx   0 ? idx - 1 : focusables.length - 1)
: (idx   focusables.length - 1 ? idx + 1 : 0);
focusables[next].focus();
focusables[next].scrollIntoView({ block:  nearest , behavior:  smooth  });
}
// — D-pad Listener —
document.addEventListener( keydown , function(e) {
switch (e.key) {
case DPAD.UP:     moveFocus( up );    break;
case DPAD.DOWN:   moveFocus( down );  break;
case DPAD.LEFT:   moveFocus( left );  break;
case DPAD.RIGHT:  moveFocus( right ); break;
case DPAD.SELECT:
if (document.activeElement.classList.contains( focusable )) {
document.activeElement.click();
}
break;
case DPAD.BACK:   history.back();     break;
default: return; // don t preventDefault on unhandled keys
}
e.preventDefault();
});
HTML
!-- Mark interactive elements with the focusable class --
button class= focusable  data-action= settings  Settings /button
button class= focusable  data-action= start  Start /button
CSS
.focusable {
transition: all 150ms ease;
border: 2px solid transparent;
min-height: 88px; /* glasses minimum tap target */
}
.focusable:focus {
outline: none;
border-color: #00d4ff;
box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}
EMG pinch and drag gestures
MRBDs use EMG (electromyography) input from the Neural Band to detect hand gestures. These gestures are translated into standard web events that your Web App can respond to. No special SDK is required.
Two gesture modes are available to your Web App:
Pinch (always on):
A quick pinch activates the currently-focused element, equivalent to pressing Enter. Works on any focusable element. Used to tap buttons, links, and other interactive elements. No opt-in needed.
Drag (opt-in):
A pinch-and-hold with arm movement provides continuous positional input, delivered as
pointer events
. Used for sliders, drawing, panning, or any other interaction that needs smooth, continuous control. Page-level opt-in only.
Gesture
Web event
Action
Thumb swipe up/down/left/right
ArrowUp
/
ArrowDown
/
ArrowLeft
/
ArrowRight
keydown
Move focus between elements
Index pinch (tap)
Enter
keydown
Activate focused element
Pinch + hold + arm movement
pointerdown
/
pointermove
/
pointerup
Continuous drag (opt-in)
Pinch (activate)
A pinch fires
Enter
on the currently focused element (
document.activeElement
). It is
not
a positioned click, so there is no cursor or tap screen coordinate. The pinch targets the element currently with focus, so build your UI around focusable elements, not click targets.
This means your app must:
Make interactive elements
focusable
(use
button
,
a
, or add
tabindex= 0
).
Make them
keyboard-activatable
(respond to
Enter
key or
click
events).
Provide a
visible focus indicator
so the wearer knows which element is selected.
For most apps, pinch works automatically if you build a standard accessible, focusable UI.
!-- These elements are pinch-activatable by default --
button data-focusable onclick= doAction()  Start /button
a href= /next  data-focusable Next Page /a
!-- Make a custom element pinch-activatable --
div tabindex= 0  role= button  data-focusable onclick= doCustomAction()
Custom Control
/div
Next, handle focus navigation with keyboard events.
var focusableElements = [];
var focusIndex = 0;
function updateFocusables() {
focusableElements = Array.prototype.slice.call(
document.querySelectorAll( [data-focusable]:not([disabled]) )
);
}
function moveFocus(idx) {
focusableElements.forEach(function(el) { el.classList.remove( focused ); });
focusIndex = Math.max(0, Math.min(idx, focusableElements.length - 1));
if (focusableElements[focusIndex]) {
focusableElements[focusIndex].classList.add( focused );
focusableElements[focusIndex].focus();
}
}
// Keep `focusIndex` in sync if focus moves outside `moveFocus()` (for example, `programmatic .focus()`, native focus, or after `updateFocusables()`).
document.addEventListener( focusin , function(e) {
var idx = focusableElements.indexOf(e.target);
if (idx !== -1) {
focusableElements.forEach(function(el) { el.classList.remove( focused ); });
focusIndex = idx;
e.target.classList.add( focused );
}
});
document.addEventListener( keydown , function(e) {
switch (e.key) {
case  ArrowUp :
e.preventDefault();
moveFocus(focusIndex - 1);
break;
case  ArrowDown :
e.preventDefault();
moveFocus(focusIndex + 1);
break;
case  Enter :
e.preventDefault();
// Pinch fires Enter on `document.activeElement`.
// Activating `activeElement` (not a cached `focusIndex`) ensures the element the wearer sees as focused is the one that receives the click.
if (document.activeElement    document.activeElement.matches( [data-focusable] )) {
document.activeElement.click();
}
break;
case  Backspace :
e.preventDefault();
history.back();
break;
case  Escape :
e.preventDefault();
history.back();
break;
}
});
// Initialize the focusable set once the DOM is ready and keep it in sync after any DOM updates that add or remove `data-focusable` elements
document.addEventListener( DOMContentLoaded , function() {
updateFocusables();
if (focusableElements.length) {
moveFocus(0);
}
// The observer handles dynamic DOM changes automatically. Otherwise, call `updateFocusables()` directly from the code that mutates the DOM (for example, `container.appendChild(newItem); updateFocusables();`).
var observer = new MutationObserver(function() {
updateFocusables();
});
observer.observe(document.body, { childList: true, subtree: true });
});
Provide a visible focus indicator. Since the code sample above toggles a
.focused
class and calls
.focus()
, you need to style both
:focus
and
.focused
. Without this CSS, the focus change has no visual effect.
/* Visible focus indicator — matches the earlier .focusable styles */
[data-focusable],
.focusable {
transition: all 150ms ease;
border: 2px solid transparent;
min-height: 88px; /* glasses minimum tap target */
}
[data-focusable]:focus,
[data-focusable].focused,
.focusable:focus,
.focusable.focused {
outline: none;
border-color: #00d4ff;
box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}
You can use either convention:
class= focusable
with
document.querySelectorAll( .focusable )
, or
data-focusable
with
document.querySelectorAll( [data-focusable] )
. Either way, keep the selector, the toggled class, and the CSS in sync, so the wearer always sees which element is focused.
Drag (continuous input)
When drag is enabled, the wearer can pinch and hold while moving their arm to generate a continuous stream of positional data. This is delivered to your app as standard
pointer events
(
pointerdown
,
pointermove
,
pointerup
).
Drag is
off
by default. The only interactions available without it are D-pad focus navigation and pinch-to-activate, meaning there is no free cursor or sliding motion unless you explicitly enable it.
To enable drag, add
touch-action: none
to the
body
element in your initial stylesheet.
/* MUST be in your initial stylesheet, as it is not added dynamically via JavaScript */
body {
touch-action: none;
}
Note:
touch-action
is read on
body
only once at page load, so it must be in the corresponding CSS. It cannot be set on individual elements or included via JavaScript.
Once drag is enabled, listen for pointer events to receive the continuous motion.
const slider = document.getElementById( slider );
let dragging = false;
slider.addEventListener( pointerdown , function(e) {
dragging = true;
// Do not use requestPointerLock-- use standard pointer events instead
slider.setPointerCapture(e.pointerId);
});
slider.addEventListener( pointermove , function(e) {
if (dragging) {
// Use e.clientX and e.clientY for position
updatePosition(e.clientX, e.clientY);
}
});
slider.addEventListener( pointerup , function() {
dragging = false;
});
Some drag use cases
Sliders:
Adjust volume, brightness, or any continuous value with arm movement
Panning:
Navigate a map or large image by dragging in 2D
Drawing:
Simple freehand drawing or annotation
Games:
Control game elements with continuous positional input
Considerations
Text input and pinch interaction
A pinch on a focused text input (like
input
,
textarea
) opens the on-glasses text composer instead of dispatching a click to your page.
Verify on-device
The exact values in drag event fields (e.g.,
movementX
,
movementY
,
clientX
,
clientY
) are generated device-side. Always
test on real glasses
by logging
pointermove
events before relying on specific coordinate behavior. Desktop emulation will not accurately represent the drag input.
Feature availability
Pinch and drag rely on EMG hardware that may not be available on all device builds. The APIs are always present (for example, pointer events exist in the browser), but the gesture input may not fire on some hardware. Always design your app to remain usable if drag events never arrive. Provide alternative navigation via D-pad focus for critical actions.
Best practices
Do
Don’t
Use
button
,
a
, or
tabindex= 0
for pinch targets
Rely on positioned click coordinates from a pinch
Always show a visible focus indicator
Use hover-only styles for interactive elements
Set
touch-action: none
on
body
in your initial stylesheet
Set
touch-action
per-element or via JavaScript at runtime
Use
setPointerCapture()
for reliable drag tracking
Use
requestPointerLock()
, since it’s not supported.
Test drag behavior on real glasses hardware
Assume desktop pointer simulation matches device behavior
Provide D-pad focus fallbacks for all critical actions
Make drag the only way to complete an essential task
Call
e.preventDefault()
on all handled key events
Leave arrow key / Enter events unhandled (causes unexpected scrolling)
In addition to these best practices, verify the following before publishing your Web App with gesture support:
Pinch activates the currently focused element, so test every interactive element.
If using drag,
pointermove
events arrive when pinch-holding and moving arm, so test directly on a device.
If using drag, the app still works via D-pad focus + pinch if drag events never fire.
All interactive elements are reachable from the home screen via gestures.
Back navigation
The back gesture on Meta Ray-Ban Display glasses (MRBD) lets users move backward through a Web App’s screens, panels, and other navigable states.
For standard Web Apps, the native shell checks
navigation.canGoBack
⁠
when the user performs a back gesture. If a previous navigation entry is available, the shell calls
history.back()
. Otherwise, it shows the native system menu overlay.
Use the standard web
Navigation API
⁠
and
History API
⁠
to manage navigation. No custom SDK is required. Your Web App is responsible for rendering the destination state and restoring app-managed state, including focus, scroll offsets, and page/carousel positions.
User action
System behavior
Single back gesture with a previous history entry
Calls
history.back()
.
Single back gesture with no previous history entry
Shows the native system menu overlay.
Back gesture while the native menu is visible
Exits the Web App.
The native transient UI is handled before web history. For example, when the native text-input UI is open, the back gesture dismisses this UI before traversing the page’s history.
Navigation history limit
The shell guards entries created with
history.pushState()
using a limit of
five
total navigation entries, including the initial document, so a typical Web App can have its root entry plus four deeper nav entries. Once
navigation.entries().length
reaches 5, subsequent
history.pushState()
calls replace the current entry instead of adding another entry.
Note:
This guard applies
only
to
history.pushState()
. It is not a universal cap on entries created through other navigation mechanisms. Design your Web App’s
pushState()
-based navigation to stay within this five-entry limit.
Adding and restoring navigation history
Create a history entry when the user moves to a destination they would expect back navigation to reverse, such as a detail screen or a substantial panel. Seed the initial entry with
history.replaceState()
, save the current view state, and restore the destination from a
popstate
handler.
const HOME_STATE = {screen:  home };
// Give the initial document an explicit state without adding another entry.
history.replaceState(HOME_STATE,   );
function saveCurrentViewState() {
history.replaceState(
{
...history.state,
focusId: document.activeElement?.id ?? null,
scrollX: window.scrollX,
scrollY: window.scrollY,
// Store any app-specific position here, such as a pager index.
},
,
);
}
function navigateTo(state) {
saveCurrentViewState();
history.pushState(state,   );
renderScreen(state);
}
function openSettings() {
navigateTo({screen:  settings });
}
function openDetail(itemId) {
navigateTo({screen:  detail , id: itemId});
}
window.addEventListener( popstate , (event) =  {
const state = event.state ?? HOME_STATE;
renderScreen(state);
// Restore state after the destination DOM has been rendered.
requestAnimationFrame(() =  {
window.scrollTo(state.scrollX ?? 0, state.scrollY ?? 0);
if (state.focusId) {
document.getElementById(state.focusId)?.focus();
}
// Restore app-specific state, such as a pager or carousel index, here.
});
});
You can handle traversal with the standard web Navigation API’s
navigate
event instead of
popstate
. Use one coordinated traversal strategy so the destination isn’t restored twice.
When no previous history entry remains, the next back gesture shows the native system menu. This is the expected app boundary, so don’t add synthetic entries or push a new entry during Back handling to prevent the user from reaching it.
Best practices
Do
Don’t
Push an entry for a user-recognizable destination that Back should reverse.
Push entries for hover, focus changes, tooltips, or other transient UI.
Seed the initial document with
history.replaceState()
.
Push a duplicate initial entry that creates an artificial Back step.
Store serializable identifiers, offsets, and indexes in history state.
Store DOM elements or other non-serializable objects in history state.
Restore the destination screen, focus, scroll, and component positions after traversal.
Assume an arbitrary SPA UI state will be restored automatically.
Design for five total
pushState()
navigation history entries,
including
the root document.
Assume five additional screens can be pushed
after
the root entry.
Allow history to drain until the native system menu is reached.
Push a new entry while handling Back or otherwise trap the user.
Troubleshooting
Issue
Potential cause
Solution
Back opens the native system menu instead of the previous app screen.
The current screen did not add a history entry, or no previous entry remains.
Add an entry when navigating to a user-recognizable destination.
Back traverses history, but the displayed screen does not change.
The
popstate
or Navigation API traversal handler does not render the destination state.
Read the destination state and render the corresponding screen.
A newly opened screen cannot be reached again with Back.
The five-entry limit was reached, so
pushState()
likely replaced the current entry.
Keep the root plus deeper navigation within five total entries.
The app cannot reach the native system menu.
A traversal handler pushes new entries or repeatedly prevents history from draining.
Never push while handling Back, and allow traversal to reach the initial entry.
Focus, scroll, pager, or carousel position is lost.
The app did not save or restore that state, or restored it before rendering completed.
Store stable IDs and numeric positions, then restore them after rendering the destination.
Input: On-glasses composer for text
Meta Ray-Ban Display (MRBD) glasses provide text input for Web Apps through an on-glasses composer, a systems-level handwriting and dictation panel that appears when users focus and tap on a standard HTML text field. Since MRBD glasses have no touchscreen or physical keyboard, users must use this composer to enter text into your app’s search boxes, forms, notes fields, and name prompts. No special integration is required.
When the user focuses a text field and then taps (pinches), an
on-glasses composer panel
appears, allowing them to enter text via handwriting or voice dictation. The composed text is committed back to your field via standard DOM
input
and
change
events.
Note:
Text input requires glasses firmware
v127+
and Meta AI app
v272+
.
Composer lifecycle
flowchart TD
A[ User navigates\nvia D-pad ] --  B[ Text field\nreceives focus ]
B --  C{ User pinches\n(taps)? }
C -- |No| D[ Field stays focused.\nComposer does not open ]
C -- |Yes| E[ Composer panel opens\n(handwriting \+ voice) ]
E --  F[ User enters text ]
F --  G[ Text committed\nto field ]
G --  H[  input  event fires\non your element ]
H --  I{ More input\nneeded? }
I -- |Yes| F
I -- |No| J[ User navigates away.\nComposer closes ]
J --  K[  change  event fires ]
The composer opens on focus + tap,
not
on focus alone. Programmatic calls to
.focus()
will not surface the composer, so user-initiated activation is required.
Input types
Supported input types
The following HTML input types
can
open the composer.
input type= text
input type= search
input type= email
input type= url
input type= tel
input type= number
textarea
contenteditable
elements
Unsupported input types
The following HTML input types
can not
open the composer.
input type= password
input type= date
input type= checkbox
input type= radio
Text field implementation
Add a standard HTML text field with a descriptive placeholder attribute. The placeholder text should help the user understand what to enter in the composer panel.
HTML
!-- Search field --
input
type= search
id= search
class= focusable
placeholder= Tap to write or speak
/
!-- Multi-line notes field --
textarea
id= note
class= focusable
placeholder= Tap to write or speak
/textarea
JavaScript
// Read the composed text using standard event listeners in JavaScript.
const note = document.getElementById( note );
//The composer commits text via the  input  event
note.addEventListener( input , () =  {
console.log( Current text: , note.value);
});
//  change  fires when the field loses focus after editing
note.addEventListener( change , () =  {
console.log( Final text: , note.value);
});
Best practices
Do
Don’t
Provide a clear, descriptive placeholder or aria-label
Leave fields without hints
Use supported input types (
text
,
search
,
email
,
url
,
tel
,
number
)
Use
type= password
(since the composer won’t open)
Listen for
input
events to read composed text
Listen for
keydown
events (since no physical keyboard exists)
Provide a fallback if the composer is unavailable
Assume the composer will always be available
Make fields focusable and navigable via D-pad
Rely on mouse-click or touch to open fields
Known limitations
The
inputmode
and
enterkeyhint
attributes do
not
affect the composer behavior. The
type
attribute controls only whether the field is eligible.
On some firmware builds, the composer may be unavailable. Design your app to remain functional without it (for example, you can provide alternative navigation or pre-filled options).
Complete example
!DOCTYPE html
html lang= en
head
meta charset= UTF-8  /
meta name= viewport
content= width=600, height=600, initial-scale=1.0, user-scalable=no  /
title Search /title
style
.
.
.
/style
/head
body
!-- Text field: opens composer on focus + tap --
input
type= search
id= search
class= focusable
placeholder= Tap to write
/
div id= results  aria-live= polite   /div
script
const searchField = document.getElementById( search );
const results = document.getElementById( results );
// Read composed text from the field
searchField.addEventListener( input , () =  {
results.textContent =  Searching:   + searchField.value;
});
// D-pad Navigation
const focusables = Array.from(document.querySelectorAll( .focusable ));
document.addEventListener( keydown , (e) =  {
const idx = focusables.indexOf(document.activeElement);
if (e.key ===  ArrowDown  || e.key ===  ArrowRight ) {
focusables[(idx + 1) % focusables.length].focus();
e.preventDefault();
} else if (e.key ===  ArrowUp  || e.key ===  ArrowLeft ) {
focusables[(idx - 1 + focusables.length) % focusables.length].focus();
e.preventDefault();
} else if (e.key ===  Enter ) {
document.activeElement.click();
e.preventDefault();
}
});
focusables[0].focus();
/script
/body
/html
Text input troubleshooting
Issue
Cause
Solution
Composer does not open when field is focused.
Composer requires
focus + tap
(pinch).
Ensure the user pinches after focusing the field.
Composer does not open on a password field.
type= password
fields are excluded.
Use
type= text
if composer input is needed.
Programmatic
.focus()
does not open composer.
Only user-initiated tap opens the composer.
Let the user navigate and tap the field.
inputmode
and
enterkeyhint
have no effect.
These attributes are not honored by the on-glasses composer.
Remove them or leave as progressive enhancement for other platforms.
Text input features are simply not working.
Firmware version below v127.
Update glasses firmware to v127 or later.
Sensors
Overview
Meta Ray-Ban Display glasses expose access to accelerometer, gyroscope, and compass data through the standard
DeviceMotionEvent
and
DeviceOrientationEvent
web APIs. Simply add event listeners on
window
as you would in any mobile browser.
Requesting permission
Motion and orientation data require an explicit user permission grant. For cross-platform compatibility, check whether
DeviceOrientationEvent.requestPermission()
exists and call it before attaching listeners.
function startIMU() {
window.addEventListener( deviceorientation , handleOrientation);
window.addEventListener( devicemotion , handleMotion);
}
// Check whether requestPermission exists before calling it
if (typeof DeviceOrientationEvent !==  undefined
typeof DeviceOrientationEvent.requestPermission ===  function ) {
// Platforms that require explicit permission (e.g., iOS Safari)
DeviceOrientationEvent.requestPermission()
.then(function(state) {
if (state ===  granted ) {
startIMU();
}
});
} else {
// Glasses runtime and most Android browsers grant automatically
startIMU();
}
Note:
The permission request must be triggered by a user gesture (for example, a button press via Enter key). It cannot be called automatically.
Note:
Do not trigger any browser history changes (such as
history.pushState()
or SPA routing) before the sensor permission request resolves. Doing so can leave the
DeviceMotionEvent.requestPermission()
promise pending indefinitely, causing the app to hang when sensors are requested. To avoid this:
Serve the Web App without any
history.pushState()
or SPA routing before the sensor permission completes.
Request permission from a user action and
await
it before changing browser history.
DeviceMotionEvent
DeviceMotionEvent
provides real-time accelerometer and gyroscope readings. Use it to detect movement, measure G-forces, or track rotation speed.
window.addEventListener( devicemotion , function(e) {
// Accelerometer (including gravity), in m/s²
var ax = e.accelerationIncludingGravity.x;
var ay = e.accelerationIncludingGravity.y;
var az = e.accelerationIncludingGravity.z;
// Compute magnitude in G-force
var g = Math.sqrt(ax * ax + ay * ay + az * az) / 9.81;
document.getElementById( gforce ).textContent = g.toFixed(2) +   G ;
// Gyroscope (rotation rate in degrees/second)
var yawRate   = e.rotationRate.alpha;
var pitchRate = e.rotationRate.beta;
var rollRate  = e.rotationRate.gamma;
});
DeviceOrientationEvent
DeviceOrientationEvent
provides the current orientation of the glasses relative to the Earth. Use it for compass heading, tilt detection, or spatial UI.
window.addEventListener( deviceorientation , function(e) {
var heading = e.alpha;  // Compass direction (rotation around z-axis): 0-360°
var tilt    = e.beta;   // Forward/back tilt (rotation around x-axis): -180° to 180°
var roll    = e.gamma;  // Left/right tilt (rotation around y-axis): -90° to 90°
document.getElementById( heading ).textContent = heading.toFixed(1) +  ° ;
});
Best practices
Consider
Avoid
Requesting permission from a user gesture (for example, button press)
Calling
requestPermission()
automatically on page load
Checking for API availability before attaching listeners
Assuming
DeviceOrientationEvent
is always defined
Throttling or debouncing high-frequency sensor updates for UI rendering
Updating the DOM on every single sensor event without throttling
Using
accelerationIncludingGravity
for tilt-based interactions
Relying on acceleration alone when gravity context is needed
Removing event listeners when sensor data is no longer needed
Leaving listeners active in the background, which drains battery
Location
Overview
MRBD glasses implement the standard
navigator.geolocation
web API. Location data is fetched from the wearer’s paired mobile device, since the glasses themselves do not have location-aware sensors. Use the API exactly as you would in any Web App. Like Sensor Data, Location also requires user permission.
One-shot position
Use
getCurrentPosition
to request a single location fix.
navigator.geolocation.getCurrentPosition(
function(position) {
var coords = position.coords;
console.log( Latitude:    + coords.latitude);     // Decimal degrees
console.log( Longitude:   + coords.longitude);    // Decimal degrees
console.log( Accuracy:    + coords.accuracy);     // m
console.log( Altitude:    + coords.altitude);     // m (may be null)
console.log( Speed:       + coords.speed);        // m/s (may be null)
console.log( Heading:     + coords.heading);      // Degrees from north (may be null)
console.log( Timestamp:   + position.timestamp);  // ms since epoch (UTC)
},
function(error) {
// error.code:
//   1 = PERMISSION_DENIED: wearer denied permission request
//   2 = POSITION_UNAVAILABLE: location could not be retrieved (i.e., phone offline)
//   3 = TIMEOUT: request exceeded the timeout
// error.message - human-readable description
console.error( Geolocation error: , error.code, error.message);
},
{ timeout: 15000 }
);
Continuous position tracking
Use
watchPosition
to receive ongoing location updates as the wearer moves.
var watchId = navigator.geolocation.watchPosition(
function(position) {
// Called each time the position updates
updateMap(position.coords.latitude, position.coords.longitude);
},
function(error) {
// error.code:
//   1 = PERMISSION_DENIED: wearer denied permission request
//   2 = POSITION_UNAVAILABLE: location could not be retrieved (i.e., phone offline)
//   3 = TIMEOUT: request exceeded the timeout
// error.message - human-readable description
console.error( Watch error: , error.code, error.message);
}
);
Call
clearWatch
when updates are no longer needed.
// Stop watching when done
navigator.geolocation.clearWatch(watchId);
Position options
Both
getCurrentPosition
and
watchPosition
accept an optional third argument to configure behavior:
Option
Type
Default
Description
enableHighAccuracy
boolean
false
Request the most accurate position available. May take longer and use more power.
timeout
number
Infinity
Maximum time (in milliseconds) to wait for a position. Use 10000-15000 ms as a practical default.
maximumAge
number
0
Accept a cached position if it is no older than this value (in milliseconds).
navigator.geolocation.getCurrentPosition(successCb, errorCb, {
enableHighAccuracy: true, // Request most accurate position (boolean, default false)
timeout: 15000, // Max wait time in ms (number, default Infinity)
maximumAge: 5000 // Accept cached position if newer than this in ms (number, default 0)
});
Best practices
Consider
Avoid
Using a
timeout
of 10-15 seconds (10000-15000 ms), since the first request may take several seconds
Omitting using a
timeout
or setting it too low
Handling
PERMISSION_DENIED
gracefully, since the wearer must grant permission
Assuming wearer does not need to grant permissions
Ensuring permissions requests are triggered by a user gesture
Assuming permission requests are triggered
Notes
Remember, location comes from the paired companion phone’s GPS/network services.
Expect an accuracy of 5-50 meters, depending on signal quality.
Location error handling
Always provide an error callback to handle failure gracefully. Location may be unavailable if the following errors occur:
Description
Error code
Type
Wearer denies the permission prompt
1
PERMISSION_DENIED
Location data could not be retrieved (for example, companion device is offline)
2
POSITION_UNAVAILABLE
Request exceeded the specified timeout
3
TIMEOUT
Storage
Web Apps on MRBD glasses have access to standard Web Storage APIs, including both
localStorage
and
sessionStorage
, to persist lightweight data on MRBD glasses:
localStorage
persists data across sessions, even after the app is closed and reopened.
sessionStorage
persists data only for the current session, so values are cleared when the session ends.
These work exactly as they do in any modern browser, and both APIs store data as key-value string pairs.
Saving and reading data
Use the standard
setItem
,
getItem
, and
removeItem
methods.
// Save a value
localStorage.setItem( userPreference ,  dark );
// Read a value
var preference = localStorage.getItem( userPreference );
// Returns  dark , or null if the key does not exist
// Remove a value
localStorage.removeItem( userPreference );
// Clear all stored data
localStorage.clear();
Session storage
sessionStorage
has an identical API, but scopes data to the current session. Use it for temporary states that should not persist after the user exits your app.
// Track whether the user has seen the onboarding screen this session
if (sessionStorage.getItem( onboardingSeen )) {
showMainScreen();
} else {
showOnboarding();
sessionStorage.setItem( onboardingSeen ,  true );
}
Storage limits
The glasses runtime provides storage within the following limits:
localStorage
: 5 MB
sessionStorage
: 5 MB
As a general practice, keep stored data lightweight - avoid storing large blobs, images, or multi-megabyte datasets. Web storage is best suited for user preferences, small caches, and application state.
Offline mode
Web Apps can continue to work even when AI glasses lose their internet connection. By implementing offline support, your Web App will load reliably on flaky Wi-Fi, display cached content when connectivity drops, and provide a seamless experience regardless of network conditions.
Offline mode uses standard web platform APIs -
Service Workers
and the
Cache API
- to save a copy of your app’s files directly on the device. Once cached, your app can load and render without a network request.
Offline mode follows a three-stage lifecycle:
Register:
Your app registers a service worker (
sw.js
) that runs in the background.
Install and precache:
On first load, the service worker downloads and stores your app’s core files (HTML, CSS, JS) in a local cache.
Serve from cache:
On subsequent loads (including offline), the service worker intercepts network requests and serves cached files first, falling back to the network only when needed. This cache-first strategy means your app loads instantly from local storage, even with no connection.
Requirements for Web App offline mode setup include the following:
Requirement
Details
HTTPS
Service workers only register in a secure context. Your app must be served over
https://
. Local
file://
URLs won’t work.
Single app shell
Your app’s core files must be identifiable as a cacheable set.
No permission prompt
Offline mode works in the background, so it does not require user permission.
Setup
Step 1: Register the service worker
In your main app file (usually
index.html
or
app.js
), register the
serviceWorker
:
if ( serviceWorker  in navigator) {
navigator.serviceWorker.register( /sw.js )
.then((registration) =  {
console.log( Service Worker registered: , registration.scope);
})
.catch((error) =  {
console.log( Service Worker registration failed: , error);
});
}
Step 2: Create a service worker file
Create a file named
sw.js
at your app’s root. This file handles caching and request interception.
// Define a versioned cache name and the files to precache.
const CACHE_NAME =  my-app-v1 ;
const APP_SHELL = [
/ ,
/index.html ,
/app.js ,
/styles.css
];
// Install: precache the app shell.
self.addEventListener( install , (event) =  {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) =  cache.addAll(APP_SHELL))
);
});
// Activate: clean up old caches on version bump.
self.addEventListener( activate , (event) =  {
event.waitUntil(
caches.keys().then((names) =
Promise.all(
names
.filter((name) =  name !== CACHE_NAME)
.map((name) =  caches.delete(name))
)
)
);
});
// Fetch serve from cache first, fall back to network.
self.addEventListener( fetch , (event) =  {
event.respondWith(
caches.match(event.request).then((cached) =  cached || fetch(event.request))
);
})
Step 3: Show online/offline status in the UI
Let the wearer know when they are offline and when connectivity returns.
function updateConnectionStatus() {
const status = document.getElementById( connection-status );
if (navigator.onLine) {
status.textContent =  ● Online ;
status.style.color =  #00d4ff ;
} else {
status.textContent =  ● Offline ;
status.style.color =  #ffaa00 ;
}
}
window.addEventListener( online , updateConnectionStatus);
window.addEventListener( offline , updateConnectionStatus);
// Set initial state
updateConnectionStatus();
HTML for status indicator
div id= connection-status  style= font-size: 14px; padding: 8px;   /div
Updating your cached app
When you release a new version of your app, update the
CACHE_NAME
(for example, change
my-app-v1
to
my-app-v2
). The new service worker will install alongside the old one, precache the updated files, and clean up the outdated cache on activation.
// Update this version string whenever you update your app
const CACHE_NAME =  my-app-v2 ;
Best practices
Do
Don’t
Precache all files your app needs to render its initial screen.
Assume every request will succeed. Always handle the offline case.
Use a versioned cache name and clean old caches on activate.
Leave stale caches accumulating on the device.
Show a clear offline indicator, so your wearers know what to expect.
Silently fail or show broken content when offline.
Combine with
localStorage
for persisting user data between sessions.
Depend solely on the cache for user-generated data.
Decide which content makes sense offline and show a friendly message for content that requires fresh data.
Try to cache everything, including API responses that change frequently.
Other considerations
Precache real sub-resource URLs:
Ensure the file paths in your
APP_SHELL
array exactly match the URLs your app actually requests. Mismatched paths will cause cache misses, so your app won’t load offline.
Storage Is per-app:
Each Web App gets its own isolated cache. Combine offline caching with
localStorage
to persist user settings, notes, or preferences between sessions.
Feature detection:
The Service Worker API is present on supported builds, but always handle the case where registration fails gracefully, as illustrated here.
if ( serviceWorker  in navigator) {
// Safe to register
} else {
// Offline support not available — app still works, just requires a connection
}
Content that requires internet
Some features (live data feeds, API calls, real-time updates) cannot work offline. Design your app to show a friendly message for those sections.
async function fetchData(url) {
try {
const response = await fetch(url);
return await response.json();
} catch (error) {
// Network unavailable -- show cached or placeholder content
showOfflineMessage( This content requires an internet connection. );
return null;
}
}
Checklist
Before publishing your Web App with offline support, verify the following:
App is served over HTTPS.
navigator.serviceWorker.register()
resolves successfully.
App shell files are precached on install (check DevTools → Application → Cache Storage).
App loads and renders correctly after going offline (for example, airplane mode or disconnect Wi-Fi).
Old caches are cleaned up when the cache version is bumped.
Online/offline UI indicator updates correctly when connectivity changes.
Content that requires a live connection shows a friendly fallback message.
Service Worker registration failure is handled gracefully (app still works online).
App icons
For app icons, use Unicode symbols or high-resolution PNG favicons (larger than 52x52 px). The system checks the Web App manifest and page source (not just
favicon.ico
) for this content. If no suitable icon is found, a default fallback icon is shown. SVGs are not supported.
Icons can be implemented as HTML
link
tags in your page’s
head
section.
link rel= icon  href= /icon-96.png  sizes= 96x96
link rel= apple-touch-icon  href= /apple-touch-icon.png  sizes= 180x180
Icons can also be implemented by referencing the Web App JSON manifest. Each entry in the
icons
array must include a
src
attribute and ideal sizes.
HTML
link rel= manifest  href= /manifest.webmanifest
JSON
{
icons : [
{  src :  /icons/icon-96.png ,  sizes :  96x96  },
{  src :  /icons/icon-192.png ,  sizes :  192x192  }
]
}
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