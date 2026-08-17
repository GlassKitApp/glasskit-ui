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
Aug 4, 2026
Overview
Web Apps for Meta Ray-Ban Display (MRBD) use standard web APIs. The easiest way to build Web Apps is using AI coding tools.
Learn how to build optimized Meta Ray-Ban Display Web Apps by understanding:
How to Build with AI
Capabilities and Best Practices
Display
Input
Sensors
Location
Local Storage
App Icons
Build with AI
AI coding tools and app platforms such as Replit, Manus, Lovable, Claude Code, Vercel, and Cursor can help build Web Apps for Meta Ray-Ban Display glasses when prompts include the platform constraints. The most reliable setup combines the
Web Apps GitHub plugin
⁠
, this guide, and the Wearables MCP endpoint https://mcp.developer.meta.com/wearables and its
search_webapps_docs
tool.
Copy a starter prompt
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
Summary
Below are the currently supported capabilities for Web Apps.
Capability
Description and guidance
Display
Additive waveguide overlay. Use dark backgrounds/light, high-contrast UI colors. Fixed 600x600px viewport. Avoid scrolling.
Input
Navigation via Neural Band/captouch gestures translates to standard arrow key and Enter events. On-glasses composer provides text input. No mouse/touch/keyboard. All elements must be focusable.
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
Local Storage
Standard Web Storage APIs (
localStorage
,
sessionStorage
). Best for lightweight data (preferences, small caches). Use JSON for structured data.
App Icons
Use Unicode symbols or high-resolution PNG favicons ( = 52x52 px) via
link
tags or Web App Manifest. SVGs are not supported.
Unsupported Capabilities:
Web Apps do
not
yet support:
Camera
Microphone
Offline Support
Notifications
Also, there is no continuous cursor support for Web Apps.
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
MRBD UI navigation is driven by two input mechanisms: the Neural Band and a touch strip on the glasses temple arm that senses swipe gestures. They produce directional and selection inputs that the glasses OS translates into standard arrow key (
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
Note:
Since there is no mouse, touch screen, or physical keyboard, every interactive element of your Web App must be reached and activated by these gestures.
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
Input: On-glasses composer for text
Meta Ray-Ban Display (MRBD) glasses provide text input for Web Apps through an on-glasses composer, a systems-level handwriting and dictation panel that appears when users focus and tap on a standard HTML text field. Since MRBD glasses have no touchscreen or physical keyboard, users must use this composer to enter text into your Web App’s search boxes, forms, notes fields, and name prompts. No special integration is required.
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
Input Types
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
Best Practices
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
Known Limitations
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
| Issue | Cause | Solution |
| :---- | :---- | :---- |
| Composer does not open when field is focused. | Composer requires
focus + tap
(pinch). | Ensure the user pinches after focusing the field. |
| Composer does not open on a password field. |
type= password
fields are excluded. | Use
type= text
if composer input is needed. |
| Programmatic
.focus()
does not open composer. | Only user-initiated tap opens the composer. | Let the user navigate and tap the field. |
| inputmode or enterkeyhint has no effect. | These attributes are not honored by the on-glasses composer. | Remove them or leave as progressive enhancement for other platforms. |
| Text input features are simply not working. | Firmware version below v127. | Update glasses firmware to v127 or later. |
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
Install   precache:
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
In your main app file (e.g.,
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
(e.g., change
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
Precache real subresource URLs:
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
App Icons
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