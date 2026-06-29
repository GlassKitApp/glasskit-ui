# Meta Wearables Developer Platform v0.8
> Two product journeys available. Choose DAT SDK for native mobile Android Kotlin or iOS Swift integration with Bluetooth Low Energy sessions, MWDATCore MWDATDevice MWDATCamera MWDATMedia MWDATDisplay MWDATState MWDATLogger MWDATMock MWDATKey, device registration via Meta AI app deeplink, permissions, camera photo video streaming, microphone HFP audio, speaker playback, display rendering, IMU sensors, device discovery, telemetry, Mock Device Kit, Ray-Ban Meta Gen 1 Gen 2 Optics Display. Choose WebApps SDK for web-based HTML CSS JavaScript experiences hosted over HTTPS specifically for Meta Ray-Ban Display MRBD only, 600 by 600 fixed viewport additive waveguide display, dark backgrounds transparent light opaque, Neural Band arrow keys Enter Escape navigation, temple swipe, DeviceMotionEvent DeviceOrientationEvent navigator.geolocation localStorage sessionStorage, PNG icons, AI coding plugin, no camera microphone text input offline notifications back navigation. Filter via ?product=dat or ?product=webapps if needed, ?sdk= alias supported for backward compat.
# DAT SDK v0.8
## Section 1: DAT Guides
### Setup
## Overview
The Wearables Device Access Toolkit supports iOS and Android mobile platforms, with the same OS version requirements as the Meta AI app (iOS 15.2+ and Android 10+).
Xcode 14.0+ is supported for iOS. Android Studio Flamingo or newer is supported for Android.
## Hardware requirements
Currently, the SDK supports the Ray-Ban Meta (Gen 1 and Gen 2), Ray-Ban Meta Optics, and Meta Ray-Ban Display glasses. You can test with a simulated device using [Mock Device Kit](/docs/develop/dat/mock-device-kit/), or directly with a device. Detailed version support of the Meta AI app and glasses firmware is located in the [Version Dependencies](/docs/develop/dat/version-dependencies/) page.
## Setting up your glasses
1. Ensure your versions of the Meta AI app and glasses software are in line with the version dependencies [outlined here](/docs/develop/dat/version-dependencies). Follow the instructions below to verify your current glasses version.
1. Connect your glasses to the Meta AI app.
1. Enable [developer mode](/docs/develop/dat/getting-started-toolkit#enable-developer-mode-in-the-meta-ai-app) in the Meta AI app. Developer mode allows your unpublished app to register and interact with your AI glasses without the need to submit it for publishing review. Your app appears under **Meta AI settings** > **App connections** > **Developer mode apps**. It also enables testing via invite-only [release channels](/docs/develop/dat/set-up-release-channels).
### Verify glasses software version
1. In the Meta AI app, go to the Devices tab (the glasses icon at the bottom of the app), and select your device.
2. Tap the gear icon to open **Device settings**.
3. Tap **General** > **About** > **Version**.
4. You should have the minimum supported version or above installed on your glasses, as outlined [here](/docs/develop/dat/version-dependencies/).
5. If your version is below minimum support requirements, update your glasses software.
### Enable developer mode in the Meta AI app
1. On your iOS or Android device, select **Settings** > **App Info**, and then tap the **App version** number five times to display the toggle for developer mode.
2. Select the toggle to enable **Developer Mode**.
3. Click **Enable** to confirm.
**iOS**
![Image of enabling developer mode on an iOS device](/images/wearables-devmode-ios.png){: width="296"}
**Android**
![Image of enabling developer mode on an android device](/images/wearables-devmode-android.png){: width="296"}
### Integration overview
## Overview
The Wearables Device Access Toolkit lets your mobile app integrate with supported AI glasses. An integration establishes a session with the device so your app can access supported sensors on the user’s glasses. Users start a session from your app, and then interact through their glasses. They can:
* Speak to your app through the device's microphones
* Send video or photos from the device's camera
* Pause, resume, or stop the session by tapping the glasses, taking them off, or closing the hinges
* Play audio to the user through the device’s speakers
## Supported devices
Detailed support to devices and version of the Meta AI app and glasses firmware are located in the [Version Dependencies](/docs/develop/dat/version-dependencies/) page.
## Integration lifecycle
1. **Registration**: The user connects your app to their wearable device by tapping a call-to-action in your app. This is a one‑time flow. After registration, your app can identify and connect to the user’s device when your app is open. The flow deeplinks the user to the Meta AI app for confirmation, then returns them to your app.
2. **Permissions**: The first time your app attempts to access the user's camera, you must request permission. The user can allow always, allow once, or deny. Your app deeplinks the user to the Meta AI app to confirm the requested permission, and then Meta AI returns them to your app. Microphone access uses the Hands‑Free Profile (HFP), so you request those permissions through iOS or Android platform dialogs.
3. **Session**: After registration and permissions, the user can start a session. During a session, the user engages with your app on their device.
## Sessions
All integrations with Meta AI glasses run as sessions. Only one session can run on a device at a time, and certain features are unavailable while your session is active. Users can pause, resume, or stop your session by closing the hinges, taking the glasses off (when wear detection is enabled), or tapping the glasses. Learn more in [Session lifecycle](/docs/develop/dat/lifecycle-events/).
## Key components
`MWDATCore` is the foundation for your integration. It handles:
- App registration with the user’s device and registration state
- Device discovery and management
- Permission requests and state management
- Telemetry
`MWDATCamera` handles camera access and:
- Resolution and frame rate selection
- Starting a video stream and sending/listening for pause, resume, and stop signals
- Receiving frames from devices
- Capturing a single frame during a stream and delivering it to your app
- Photo format
`MWDATDisplay` powers visual experiences on Meta Ray-Ban Display glasses, with support for:
- Content rendering with support for components like FlexBox, Text, Image, Button, and Icon
- Video playback of MP4 clips on the glasses display
For more, check out our **API reference documentation**: [iOS](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8), [Android](https://wearables.developer.meta.com/docs/reference/android/dat/0.8).
### Microphones and speakers
Use mobile platform functions to access the device over Bluetooth. To use the device's microphones for input, use HFP (Hands-Free Profile). Audio is streamed as 8 kHz mono from the device to your app.
### App management
After registration, your app appears in the user’s App Connections list in the Meta AI app, where permissions can be unregistered or managed.
## Next steps
- See real-world integration concepts on [our blog](https://developers.meta.com/blog/introducing-meta-wearables-device-access-toolkit/).
- Start building your first integration with our step‑by‑step guides for [iOS](/docs/develop/dat/build-integration-ios/) and [Android](/docs/develop/dat/build-integration-android/).
### Integrate Wearables Device Access Toolkit into your iOS app
## Overview
This guide explains how to add Wearables Device Access Toolkit registration, streaming, and photo capture to an existing iOS app. For a complete working sample, compare with the [provided sample app](https://github.com/facebook/meta-wearables-dat-ios/tree/main/samples).
## Prerequisites
Complete the environment and glasses steps in [Setup](/docs/develop/dat/getting-started-toolkit/).
Your integration must use a registered bundle identifier. To register or manage bundle IDs, see Apple's [Register an App ID](https://developer.apple.com/help/account/identifiers/register-an-app-id/) and [Bundle IDs](https://developer.apple.com/documentation/appstoreconnectapi/bundle-ids) documentation.
**App Store Submission Warning:** Publishing to the App Store is not currently supported, but we plan to do so in the future. In the meantime, you can share your integration with test users via our [release channels](/docs/develop/dat/set-up-release-channels/). As a result, since the SDK currently uses the `ExternalAccessory` framework, it will lead to App Store rejection due to Apple's MFi program and privacy manifest requirements.
## Step 1: Add info properties
In your app's `Info.plist`, or using Xcode UI, provide the Wearables Device Access Toolkit with the required keys (`AppLinkURLScheme`, `MetaAppID`, `ClientToken`, `TeamID`). `AppLinkURLScheme` enables the Meta AI app to callback to your app during registration. The example below uses `myexampleapp` as a placeholder, but the real one should be a universal link registered with Apple. Adjust the scheme to match your project.
These same identifiers are needed for **attestation** of your app, which ensures its authenticity. While app attestation is *not* used in Developer Mode, if you use incorrect identifiers or your app is misconfigured, it won't connect, and you will receive an error.
**Note:** To find your `TeamID`, you must first [Sign in to your developer account](https://developer.apple.com/help/account/access/sign-in-to-your-developer-account). Meanwhile, `ClientToken` and `MetaAppID` are autogenerated in the Wearables Developer Center (see [Manage projects](/docs/develop/dat/manage-projects/)).
**Note**: If you pre-process `Info.plist`, the `://` suffix will be stripped unless you add the `-traditional-cpp` flag. See [Apple Technical Note TN2175](https://developer.apple.com/library/archive/technotes/tn2175/_index.html#//apple_ref/doc/uid/DTS10004415-CH1-TNTAG3).
```xml
CFBundleURLTypes
CFBundleTypeRole
Editor
CFBundleURLName
$(PRODUCT_BUNDLE_IDENTIFIER)
CFBundleURLSchemes
myexampleapp
MWDAT
AppLinkURLScheme
myexampleapp://
MetaAppID
$(META_APP_ID)
ClientToken
$(CLIENT_TOKEN)
TeamID
$(DEVELOPMENT_TEAM)
DAMEnabled
UISupportedExternalAccessoryProtocols
com.meta.ar.wearable
UIBackgroundModes
bluetooth-peripheral
external-accessory
NSBluetoothAlwaysUsageDescription
Needed to connect to Meta Wearables
NSCameraUsageDescription
This app needs camera access to stream from your phone's camera as a mock device feed.
```
**Note:** The Device Access Toolkit App Model (DAM) flow is the default model for your app integration. This means that if `DAMEnabled` is missing in your `Info.plist` file, the *default* value is now `true`. If you already set `DAMEnabled` to `true`, there is no change. To opt-out of DAM, set `DAMEnabled` to `false`.
## Step 2: Add the SDK Swift package
Add the SDK through Swift Package Manager.
1. In Xcode, select **File** > **Add Package Dependencies...**
1. Search for `https://github.com/facebook/meta-wearables-dat-ios` in the top right corner.
1. Select `meta-wearables-dat-ios`.
1. Set the version to one of the [available versions](https://github.com/facebook/meta-wearables-dat-ios/tags).
1. Click **Add Package**.
1. Select the target to which you want to add the package.
1. Click **Add Package**.
Import the required modules in any Swift files that use the SDK.
```swift
import MWDATCamera
import MWDATCore
```
## Step 3: Initialize the SDK
Call [`Wearables.configure()`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcore_wearables#configure) once when your app launches.
```swift
func configureWearables() {
do {
try Wearables.configure()
} catch {
assertionFailure("Failed to configure Wearables SDK: \(error)")
}
}
```
## Step 4: Launch registration from your app
Register your application with the Meta AI app either at startup or when the user wants to turn on your wearables integration.
```swift
func startRegistration() throws {
try Wearables.shared.startRegistration()
}
func startUnregistration() throws {
try Wearables.shared.startUnregistration()
}
func handleWearablesCallback(url: URL) async throws {
_ = try await Wearables.shared.handleUrl(url)
}
```
Observe registration and device updates.
```swift
let wearables = Wearables.shared
Task {
for await state in wearables.registrationStateStream() {
// Update your registration UI or model
}
}
Task {
for await devices in wearables.devicesStream() {
// Update the list of available glasses
}
}
```
## Step 5: Manage camera permissions
Check permission status before streaming and request access if necessary.
```swift
var cameraStatus: PermissionStatus = .denied
...
cameraStatus = try await wearables.checkPermissionStatus(.camera)
...
cameraStatus = try await wearables.requestPermission(.camera)
```
## Step 6: Create device session
Use [`createSession`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcore_wearablesinterface#createsession) to create a device session and access the capabilities of a Meta Wearable Device. You can also add a stream to a previously created session.
You can use [`AutoDeviceSelector`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcore_autodeviceselector) to make a smart decision for the user to select a device. Alternatively, you can use [`SpecificDeviceSelector`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcore_specificdeviceselector) if you provide a UI for the user to manually select a specific device.
```swift
let deviceSelector = AutoDeviceSelector(wearables: wearables)
let session = try wearables.createSession(deviceSelector: deviceSelector)
let stateStream = session.stateStream()
try session.start()
for await state in stateStream {
if state == .started {
...
} else if state == .stopped {
...
}
}
```
## Step 7: Start a camera stream
Create a stream by adding it to an existing [`DeviceSession`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcore_devicesession), and observe its state and display frames.
You can request resolution and frame rate control using [`StreamConfiguration`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcamera_streamconfiguration). Valid `frameRate` values are `2`, `7`, `15`, `24`, or `30` FPS. `resolution` can be set to:
- `high`: 720 x 1280 pixels
- `medium`: 504 x 896 pixels
- `low`: 360 x 640 pixels
[`StreamState`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcamera_streamstate) transitions through `stopping`, `stopped`, `waitingForDevice`, `starting`, `streaming`, and `paused`.
Register callbacks to collect frames and state events.
```swift
let config = StreamConfiguration(
videoCodec: VideoCodec.raw,
resolution: StreamingResolution.low,
frameRate: 24)
guard let stream = try? session.addStream(config: config) else { return }
let stateToken = stream.statePublisher.listen { state in
Task { @MainActor in
// Update your streaming UI state
}
}
let frameToken = stream.videoFramePublisher.listen { frame in
guard let image = frame.makeUIImage() else { return }
Task { @MainActor in
// Render the frame in your preview surface
}
}
stream.start()
```
Resolution and frame rate are constrained by the Bluetooth Classic connection between the user’s phone and their AI glasses. To manage limited bandwidth, an automatic ladder reduces quality as needed. It first lowers the resolution by one step (for example, from `high` to `medium`). If bandwidth remains constrained, it then reduces the frame rate (for example, 30 to 24), but never below 15 fps.
The image delivered to your app may appear lower quality than expected, even when the resolution reports `high` or `medium`. This is due to per‑frame compression that adapts to available Bluetooth Classic bandwidth. Requesting a lower resolution, a lower frame rate, or both can yield higher visual quality with less compression loss.
## Step 8: Capture and share photos
Listen for [`photoDataPublisher`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcamera_stream#photodatapublisher) events and handle the returned [`PhotoData`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcamera_photodata). Then, when a stream session is active, call [`capturePhoto`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcamera_stream#capturephoto).
```swift
_ = stream.photoDataPublisher.listen { photoData in
let data = photoData.data
// Convert to UIImage or hand off to your storage layer
}
stream.capturePhoto(format: .jpeg)
```
## Next steps
- See details on permission flows in [Permissions and registration](/docs/develop/dat/permissions-requests/).
- See details on session lifecycles in [Session lifecycle](/docs/develop/dat/lifecycle-events/).
- Test without a device with [Mock Device Kit](/docs/develop/dat/testing-mdk-ios/).
- Compare against the [iOS sample app](https://github.com/facebook/meta-wearables-dat-ios/tree/main/samples).
- Prepare for release with [Manage projects](/docs/develop/dat/manage-projects/) and [Set up release channels](/docs/develop/dat/set-up-release-channels/) in the Wearables Developer Center.
### Integrate Wearables Device Access Toolkit into your Android app
## Overview
This guide explains how to add Wearables Device Access Toolkit registration, streaming, and photo capture to an existing Android app. For a complete working sample, compare with the [provided sample app](https://github.com/facebook/meta-wearables-dat-android/tree/main/samples).
## Prerequisites
Complete the environment and glasses configuration steps in [Setup](/docs/develop/dat/getting-started-toolkit/).
## Step 1: Add manifest entries
In your app's `AndroidManifest.xml`, add the permissions required to allow your app to communicate with the glasses through Bluetooth. The intent filter with the URI scheme is required so that the Meta AI app can callback to your application. The example below uses `myexampleapp` as a placeholder. Adjust the scheme to match your project.
Provide the Wearables Device Access Toolkit with `APPLICATION_ID` and `CLIENT_TOKEN` metadata. Both are needed for **attestation** of your app, which ensures its authenticity, and they can be found in the Wearables Developer Center (see [Manage projects](/docs/develop/dat/manage-projects/)).
While an App Signature is *not required* for attestation, the Meta AI app will use it to verify the authenticity of your app. If incorrect identifiers are used or your app is misconfigured, it won't connect, and you will receive an error.
**Note:** App attestation is *not* used in Developer Mode, since these apps rely on local logic, rather than connecting to a release channel. If you are using Developer Mode, you can omit these values or simply use `0`.
```xml
```
**Note:** The Device Access Toolkit App Model (DAM) flow is the default model for your app integration. This means that if `DAM_ENABLED` is missing in your app's `AndroidManifest.xml` file, the *default* value is now `true`. If you already set `DAM_ENABLED` to `true`, there is no change. To opt-out of DAM, set the value for `DAM_ENABLED` to `false`.
## Step 2: Add the SDK to Gradle
The Wearables Device Access Toolkit is distributed through [GitHub Packages](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages).
Add the Wearables Device Access Toolkit Maven repository to your app's Gradle repositories in `settings.gradle.kts`.
```kotlin
val localProperties =
Properties().apply {
val localPropertiesPath = rootDir.toPath() / "local.properties"
if (localPropertiesPath.exists()) {
load(localPropertiesPath.inputStream())
}
}
dependencyResolutionManagement {
...
repositories {
...
maven {
url = uri("https://maven.pkg.github.com/facebook/meta-wearables-dat-android")
credentials {
username = "" // not needed
password = System.getenv("GITHUB_TOKEN") ?: localProperties.getProperty("github_token")
}
}
}
}
```
Next, declare the Wearables Device Access Toolkit artifacts in `libs.versions.toml`.
Check the available versions in [GitHub Packages](https://github.com/orgs/facebook/packages?repo_name=meta-wearables-dat-android).
```toml
[versions]
mwdat = "0.8.0"
[libraries]
mwdat-core = { group = "com.meta.wearable", name = "mwdat-core", version.ref = "mwdat" }
mwdat-camera = { group = "com.meta.wearable", name = "mwdat-camera", version.ref = "mwdat" }
mwdat-display = { group = "com.meta.wearable", name = "mwdat-display", version.ref = "mwdat" }
mwdat-mockdevice = { group = "com.meta.wearable", name = "mwdat-mockdevice", version.ref = "mwdat" }
```
Then, add them as dependencies in your app's `build.gradle.kts`.
```kotlin
dependencies {
implementation(libs.mwdat.core)
implementation(libs.mwdat.camera)
implementation(libs.mwdat.display)
implementation(libs.mwdat.mockdevice)
}
```
To build and install your app with the Wearables Device Access Toolkit, you need a personal access token (classic) with at least the **read:packages** scope in GitHub. Follow [these instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) to create a new personal access token (classic).
Then, provide this personal access token following one of these two approaches:
- In a terminal, set the environment variable `GITHUB_TOKEN` with your personal access token.
```bash
export GITHUB_TOKEN=ghp...  # your personal access token (classic)
./gradlew installDebug  # from the directory of the actual project
```
- Alternatively, you can create a `local.properties` file in the project root and set the key `github_token` with your personal access token. Then, in Android Studio, refresh the Gradle project by clicking **File** > **Sync Project with Gradle Files**.
```properties
github_token=ghp...  # your personal access token (classic)
```
## Step 3: Initialize the SDK
Initialize the SDK once per process at start up.
```kotlin
Wearables.initialize(context)
```
Invoking other Wearables Device Access Toolkit APIs before initialization yields [`WearablesError.NOT_INITIALIZED`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_core_types_wearableserror).
For lifecycle placement guidance, read [Session lifecycle](/docs/develop/dat/lifecycle-events/).
## Step 4: Launch registration from your app
Register your application with the Meta AI app either at startup or when the user wants to turn on your wearables integration.
```kotlin
fun requestWearablesRegistration(activity: Activity) {
Wearables.startRegistration(activity)
}
fun requestWearablesUnregistration(activity: Activity) {
Wearables.startUnregistration(activity)
}
```
Observe registration and device updates.
```kotlin
...
Wearables.registrationState.collect { state ->
onState(state)
}
...
Wearables.devices.collect { devices ->
onDevices(devices.toList())
}
```
## Step 5: Manage camera permissions
Before streaming, check the Wearables camera permission and launch the SDK contract if required.
```kotlin
var permissionStatus = Wearables.checkPermissionStatus(Permission.CAMERA)
if (permissionStatus == PermissionStatus.Granted) {
// start streaming
}
permissionStatus = requestWearablesPermission(Permission.CAMERA)
...
private var permissionContinuation: CancellableContinuation
? = null
private val permissionMutex = Mutex()
// Requesting wearable device permissions via the Meta AI app
private val permissionsResultLauncher =
registerForActivityResult(Wearables.RequestPermissionContract()) { result ->
permissionContinuation?.resume(result)
permissionContinuation = null
}
// Convenience method to make a permission request in a sequential manner
// Uses a Mutex to ensure requests are processed one at a time, preventing race conditions
suspend fun requestWearablesPermission(permission: Permission): PermissionStatus {
return permissionMutex.withLock {
suspendCancellableCoroutine { continuation ->
permissionContinuation = continuation
continuation.invokeOnCancellation { permissionContinuation = null }
permissionsResultLauncher.launch(permission)
}
}
}
```
## Step 6: Create device session
Use [`createSession`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_core_wearables#createsession) to create a device session and access the capabilities of a Meta Wearable Device. You can also add a stream to a previously created session.
You can use [`AutoDeviceSelector`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_core_selectors_autodeviceselector) to make a smart decision for the user to select a device. Alternatively, you can use [`SpecificDeviceSelector`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_core_selectors_specificdeviceselector) if you provide a UI for the user to select a device.
```kotlin
val session = Wearables.createSession(AutoDeviceSelector()).getOrElse { error ->
showError(error.description)
return
}
session.start()
```
## Step 7: Start a camera stream
Create a stream by adding it to an existing [`DeviceSession`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_core_session_devicesession), and observe its state and display frames.
You can request resolution and frame rate control using [`StreamConfiguration`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_camera_types_streamconfiguration). Valid `frameRate` values are `2`, `7`, `15`, `24`, or `30` FPS. `videoQuality` can be set to:
- `HIGH`: 720 x 1280 pixels
- `MEDIUM`: 504 x 896 pixels
- `LOW`: 360 x 640 pixels
[`StreamState`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_camera_types_streamstate) transitions through `STARTING`, `STARTED`, `STREAMING`, `STOPPING`, `STOPPED`, and `CLOSED`.
Register callbacks to collect frames and state events.
```kotlin
fun start(deviceId: DeviceIdentifier) {
val config = StreamConfiguration(videoQuality = VideoQuality.MEDIUM, frameRate = 24)
session.addStream(config).fold(
onSuccess = { stream ->
scope.launch {
stream.videoStream.collect { frame ->
displayFrame(frame)
}
}
scope.launch {
stream.state.collect { state ->
updateStreamUi(state)
if (state == StreamState.STOPPED) {
stopStream()
}
}
}
stream.start()
},
onFailure = { error, _ -> showError(error.description) },
)
}
```
Resolution and frame rate are constrained by the Bluetooth Classic connection between the user’s phone and their AI glasses. To manage limited bandwidth, an automatic ladder reduces quality as needed. It first lowers the resolution by one step (for example, from `HIGH` to `MEDIUM`). If bandwidth remains constrained, it then reduces the frame rate (for example, 30 to 24), but never below 15 fps.
The image delivered to your app may appear lower quality than expected, even when the resolution reports `HIGH` or `MEDIUM`. This is due to per‑frame compression that adapts to available Bluetooth Classic bandwidth. Requesting a lower resolution, a lower frame rate, or both can yield higher visual quality with less compression loss.
## Step 8: Capture and share photos
When a stream session is active, call [`capturePhoto`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_camera_stream#capturephoto) and handle the returned [`PhotoData`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_camera_types_photodata). Add `app/src/main/res/xml/file_paths.xml` so that the FileProvider can expose cached images.
```kotlin
stream.capturePhoto()
.onSuccess { data ->
...
}
.onFailure(onError)
```
## Next steps
- See details on permission flows in [Permissions and registration](/docs/develop/dat/permissions-requests/).
- See details on session lifecycles in [Session lifecycle](/docs/develop/dat/lifecycle-events/).
- Test without a device with [Mock Device Kit](/docs/develop/dat/testing-mdk-android/).
- Compare against the [Android sample app](https://github.com/facebook/meta-wearables-dat-android/tree/main/samples).
- Prepare for release with [Manage projects](/docs/develop/dat/manage-projects/) and [Set up release channels](/docs/develop/dat/set-up-release-channels/) in the Wearables Developer Center.
### Display access overview
## Overview
The Meta Wearables Device Access Toolkit gives you access to the display on Meta Ray-Ban Display glasses. By using a component-based layout API inspired by popular UI frameworks in the mobile development community, you can build layouts with familiar mobile UI patterns in Swift or Kotlin. The SDK then handles rendering on the glasses automatically.
In addition to access to on-device sensors like camera, microphone, and speakers, the Meta Wearables Device Access Toolkit provides display functionality that enables you to build a variety of immersive experiences leveraging the glasses display. Users can control display integrations using captouch gestures and EMG gestures on the Meta Neural Band.
## Requirements
### Hardware
* Meta Ray-Ban Display glasses paired with a mobile device
* A mobile device with Meta AI app installed and configured.
**Note**: Refer to the [Version Dependencies](/docs/develop/dat/version-dependencies/) page for the latest Meta AI app and firmware versions supported.
### Software
Download the Meta AI app from the [App Store (iOS)](https://apps.apple.com/us/app/meta-ai-assistant-glasses/id1558240027) or [Play Store (Android)](https://play.google.com/store/apps/details?id=com.facebook.stella) if you haven't done so already.
The Device Access Toolkit needs to be installed on your Meta Ray-Ban Display glasses for the display functionality to work.
To install DAT:
1. Update Meta AI app to v272 or later.
2. Update your glasses firmware to v125 or later via the Meta AI app.
3. Put on your glasses. This is required before proceeding.
4. Enable Dev Mode in the Meta AI app:
* Go to Settings → App Info, then tap App Version 5 times.
* If Dev Mode is already enabled, Press the install button to install DAT on your glasses.
* On iOS, a Wi-Fi prompt should appear after a few seconds.
* App installation takes ~5–10 seconds. Please keep Meta AI app open during this time.
## Sessions
Display access operates on a session-based model, where your mobile app creates a Meta Wearables Device Access Toolkit session, attaches a display capability to it, and sends UI content to the glasses over Bluetooth. Essentially, the SDK serializes your layouts, transmits them to these glasses, and routes user interactions back to your app as events.
In this model:
* Users must explicitly initiate a display session.
* Your app has exclusive display control during active sessions.
* Sessions must be explicitly terminated by user action or app logic.
* The system may interrupt sessions for calls, notifications, or other priority events.
## Supported components
| Component | Description |
|-----------|-------------|
| **FlexBox** | Flexible layout container with row/column direction, spacing, alignment, and wrapping |
| **Text** | Styled text with heading, body, and meta presets |
| **Image** | Images loaded from a URL, with size and corner radius options |
| **Button** | Tappable buttons with label, icon, and style variants |
| **Icon** | System icons. See [Icons](/develop/dat/display-icons) for the full list. |
| **Video** | Video playback from a URL (MP4 format) |
## Examples of what you can build
* Informational overlays (weather, navigation, notifications)
* Step-by-step guides and tutorials
* Media viewers with images and short video clips
* Interactive menus with buttons and tap handlers
* Status dashboards with icons and styled text
## Display lifecycle
The display capability follows a defined lifecycle that your app must manage. Understanding these states is essential for building a reliable integration.
### States
| State | Description |
|-------|-------------|
| `stopped` | Display capability is not active. This is the initial state. |
| `starting` | The SDK is connecting to the glasses display service. |
| `started` | The display is ready. You can now send content with `send()` (iOS) or `sendContent()` (Android). |
| `stopping` | The display is shutting down. |
```
stopped ──▶ starting ──▶ started ──▶ stopping ──▶ stopped
```
The display transitions to `started` once the glasses accept the display capability request. If the glasses disconnect, the display transitions through `stopping` back to `stopped`. You can restart the display by calling `start()` again.
## Best practices
### Performance
- **Keep layouts simple.** Simple views (text, small images) transition quickly. Complex views with large images may introduce lag due to Bluetooth bandwidth constraints.
- **Optimize images.** Use appropriately sized images for the glasses display. The display resolution is 600x600, and there is no benefit to sending larger images.
- **Limit video size.** Keep videos under 400px per side and 70,000 total pixels. Use short clips.
### User experience
- **Always have a root view.** Designate one view as your L0 (root) view. The back gesture from L0 ends the session, so make sure users can always navigate back to it.
- **Handle disconnects gracefully.** Bluetooth connections can drop. Observe the display state and show appropriate UI in your mobile app when the connection is lost.
- **Respect display sleep.** The display dims and then enters sleep mode after a period of inactivity. Design your content updates around this behavior, like sending fresh content when the display wakes.
- **Use clear, readable text.** The glasses display is small. Use the `heading` style for key information, and keep text concise.
- **Provide visual feedback.** Use button style changes and icons to indicate interactive elements. Users interact through gestures, so make tappable areas obvious.
### Architecture
- **One display per session.** Only one display capability can be attached to a session at a time. Remove the existing display before adding a new one.
- **Send complete views.** Each [`send()`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_display#send) (iOS) / [`sendContent()`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_display#sendcontent) (Android) call replaces the entire display. There is no partial update mechanism, so always send the full layout.
- **Manage state on the phone.** The glasses do not retain application state. Your app is the source of truth for navigation state, data, and user preferences.
## Sample app
The SDK includes a **Display Access** sample app that demonstrates a complete display access integration. The sample shows:
- Session setup and display lifecycle management
- A scrollable list of tutorials with images and tap handlers
- Detail views with styled text, images, and navigation buttons
- Step-by-step navigation with back/next controls
- Video playback of tutorial clips
Find the sample apps in GitHub:
- [DisplayAccess for iOS](https://github.com/facebook/meta-wearables-dat-ios/tree/main/samples/DisplayAccess)
- [DisplayAccess for Android](https://github.com/facebook/meta-wearables-dat-android/tree/main/samples/DisplayAccess)
### Integrate Display capability into your iOS app
## Overview
This guide explains how to integrate display functionality into your existing iOS app. For a complete guide on adding Wearables Device Access Toolkit capabilities to an existing iOS app, including registration, streaming, and photo capture, check out the [iOS integration guide](/docs/develop/dat/build-integration-ios/).
## Create a visual display experience for your app
### Step 1: Configure Info.plist
The Device Access Toolkit App Model (DAM) flow is the default model for display integrations. This means that if `DAMEnabled` is missing from your `Info.plist` file, the *default* value is now `true`. If you already set `DAMEnabled` to `true`, there is no change.
```xml
MWDAT
...
DAMEnabled
```
### Step 2: Import modules
```swift
import MWDATCore
import MWDATDisplay
```
### Step 3: Connect to the display
Connect to the display by configuring the SDK, creating a session, and then initializing it.
```swift
// Configure the SDK
try Wearables.configure()
// Create a session targeting display-capable glasses
let wearables = Wearables.shared
let session = try wearables.createSession()
// Start the session and wait for it to connect. Then observe session.stateStream() for .started
try session.start()
// Attach the display capability
let display = try session.addDisplay()
// Start the display and observe state. Then observe display.statePublisher for .started
display.start()
// Send content once the display reaches .started
let view = FlexBox(direction: .column, spacing: 12) {
Text("Hello, glasses!", style: .heading)
}
try await display.send(view)
```
### Step 4: Observe state changes
```swift
// Using async stream
for await state in display.statePublisher.stream {
switch state {
case .started:
// Display is ready, send content
case .stopped:
// Display disconnected or stopped
case .starting, .stopping:
// Transitional states
}
}
```
### Step 5: Stop display
When your app is done using the display capabilities, clean up resources:
```swift
display.stop()
session.stop()
```
**Note:** The glasses display dims after 20 seconds of inactivity and enters sleep mode at 25 seconds. Display sleep does *not* end the Wearables Device Access Toolkit session. When the display wakes, your app can either show the previously displayed content or send a new view.
## Build content
Wearables Device Access Toolkit uses a declarative component system to build UI layouts for display, so you compose views using a result builder in Swift.
Each call to [`send()`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_display#functions-public) replaces the entire display, so there are no incremental updates. Views are presented one at a time with vertical scrolling. Horizontal scrolling is not supported.
### FlexBox
**FlexBox** is the primary layout container for Meta Ray-Ban Display apps. It helps you build declarative UI trees with text, images, icons, and buttons. This means that every layout starts with a root FlexBox. Inside, you arrange either these child components or nested FlexBoxes using specific layout properties.
[FlexBox](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_flexbox) arranges children along a main axis (row or column) with control over spacing, alignment, and wrapping.
```swift
FlexBox(
direction: .column,       // .column, .row, .columnReverse, .rowReverse
spacing: 12,              // Gap between children in dp
alignment: .start,        // Main axis: .start, .center, .end, .stretch
crossAlignment: .center,  // Cross axis: .start, .center, .end, .stretch
wrap: false,              // Whether children wrap to the next line
padding: EdgeInsets(all: 16)
) {
// Child components go here
}
```
### Text
Displays styled text. Three style presets match the glasses design system.
| [`TextStyle`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_textstyle) | Description |
|-------|-------------|
| `heading` | Large, bold text for section titles |
| `body` | Standard text for general content |
| `meta` | Small text for captions and metadata |
| [`TextColor`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_textcolor) | Description |
|-------|-------------|
| `primary` | Default high-contrast text |
| `secondary` | Lower-contrast supporting text |
```swift
Text("Welcome", style: .heading)
Text("Tap a button to continue", style: .body, color: .secondary)
Text("Step 1 of 5", style: .meta, color: .secondary)
```
### Images
Display images loaded from URLs.
| [`ImageSize`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_imagesize) | Description |
|-------------|-------------|
| `icon` | Small, inline-sized image |
| `fill` | Fills the available space |
| [`CornerRadius`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_cornerradius) | Description |
|---------------|-------------|
| `none` | Sharp corners |
| `small` | Slightly rounded |
| `medium` | Moderately rounded |
```swift
Image(
uri: "https://example.com/photo.png",
sizePreset: .fill,
cornerRadius: .medium
)
```
**Note:** The Meta Ray-Ban Display glasses render at 600x600 resolution. Use appropriately sized images — there is no benefit to sending larger images, and oversized assets introduce lag due to Bluetooth bandwidth constraints.
### Buttons
Implement tappable buttons with corresponding labels, optional icons, and click handlers.
| [`ButtonStyle`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_buttonstyle) | Description |
|-------|-------------|
| `primary` | High-emphasis filled button |
| `secondary` | Medium-emphasis filled button |
| `outline` | Low-emphasis outlined button |
```swift
Button(label: "Continue", style: .primary, iconName: .arrowRight) {
// Handle tap
}
Button(label: "Go back", style: .outline, iconName: .arrowLeft) {
// Handle tap
}
```
### Icons
Display a system icon from a built-in catalog of 100+ glyphs, covering navigation, media, weather, social, and more.
| [`IconStyle`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_iconstyle) | Description |
|-------|-------------|
| `filled` | Solid icon |
| `outline` | Hollow icon |
```swift
Icon(name: .checkmarkCircle, style: .filled)
Icon(name: .bell, style: .outline)
```
See the [icon catalog](/docs/develop/dat/display-icons) for all available `IconName` values.
If you need an icon outside the built-in catalog, you can also provide your own [custom image](#images).
### View Modifiers
On iOS, padding and tap handlers can be applied to any component. [`Flex modifiers`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_flexbox) (`flexGrow`, `flexShrink`, `alignSelf`) only apply to `FlexBox` — wrap a non-`FlexBox` child in a `FlexBox` to opt into flex layout behavior.
```swift
// Padding and tap handlers apply to any component.
Text("Tappable text", style: .body)
.padding(16)         // Uniform padding
.onTap {
// Handle tap on this component
}
// Per-edge padding
Image(uri: imageUrl, sizePreset: .fill)
.padding(EdgeInsets(top: 8, bottom: 8, leading: 16, trailing: 16))
// Flex modifiers only apply to a FlexBox.
// Wrap a non-FlexBox child in a FlexBox to apply flexGrow, flexShrink, or alignSelf.
FlexBox {
Text("Flexible text", style: .body)
}
.flexGrow(1)         // Grow to fill available space
.flexShrink(0)       // Don't shrink below natural size
.alignSelf(.center)  // Override cross-axis alignment
```
### Layouts
#### Column layout
Use [`direction`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_direction) to determine the main axis along which children are arranged. This code sample illustrates a *vertical* layout with a header, body text, and action button.
```swift
let view = FlexBox(direction: .column, spacing: 12, padding: EdgeInsets(all: 16)) {
Text("Oil Change Guide", style: .heading)
Text("Learn how to change your car's oil in 6 easy steps.", style: .body)
Text("Duration: 30 min", style: .meta, color: .secondary)
Button(label: "Start", style: .primary, iconName: .arrowRight) {
showFirstStep()
}
}
try await display.send(view)
```
#### Row layout
This code sample illustrates a *horizontal* layout with an image thumbnail and text.
```swift
let view = FlexBox(direction: .row, spacing: 12, crossAlignment: .center,
padding: EdgeInsets(all: 16)) {
FlexBox {
Image(uri: thumbnailUrl, sizePreset: .fill, cornerRadius: .medium)
}
.flexGrow(1)
FlexBox(direction: .column, spacing: 4) {
Text("Brake Pad Replacement", style: .body)
Text("45 min", style: .meta, color: .secondary)
}
.flexGrow(3)
}
try await display.send(view)
```
#### Clickable list items
Create a list of tappable items, each with its own icon and label.
```swift
let view = FlexBox(direction: .column, spacing: 8, padding: EdgeInsets(all: 16)) {
Text("Tutorials", style: .heading)
for tutorial in tutorials {
FlexBox(direction: .row, spacing: 12, crossAlignment: .center) {
Icon(name: .gear, style: .filled)
Text(tutorial.title, style: .body)
}
.padding(12)
.onTap { selectTutorial(tutorial) }
}
}
try await display.send(view)
```
#### Navigation
Create a step-by-step view with navigation buttons located at the bottom of the viewport.
```swift
let view = FlexBox(direction: .column, spacing: 12, padding: EdgeInsets(all: 16)) {
Text("Step \(stepIndex + 1) of \(totalSteps)", style: .meta, color: .secondary)
Text(step.title, style: .heading)
Text(step.description, style: .body)
Image(uri: step.imageUrl, sizePreset: .fill, cornerRadius: .medium)
FlexBox(direction: .row, spacing: 8, alignment: .center) {
Button(label: "Back", style: .outline, iconName: .arrowLeft) {
showPreviousStep()
}
Button(label: "Next", style: .primary, iconName: .arrowRight) {
showNextStep()
}
}
}
try await display.send(view)
```
## User inputs
Users can interact with display content through captouch. These interactions are abstracted as tap events and delivered to your app through callbacks.
### Button clicks
Buttons receive tap events through a handler.
```swift
Button(label: "Accept", style: .primary) {
handleAccept()
}
```
### Tappable areas
Make any component tappable by wrapping it in a tap handler.
```swift
FlexBox(direction: .row, spacing: 8) {
Icon(name: .heart, style: .filled)
Text("Favorites", style: .body)
}
// Tap handler
.onTap { openFavorites() }
```
### Back gesture
The back gesture (a two-finger tap on the glasses temple) ends the display session.
## Video
Video playback allows you to play video content from a URL on the full-screen video player of Meta Ray-Ban Display glasses.
### Constraints
- **Format:** MP4 only
- **Maximum dimensions:** 400 pixels per side, 70,000 total pixels
- **URL scheme:** `https` only
- **Concurrency:** One video at a time per display session
### Play video
Play video using [`VideoPlayer`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_videoplayer).
```swift
// Start video playback
let video = VideoPlayer(
provider: .uri("https://example.com/tutorial-clip.mp4"),
codec: .mp4,
onError: { error in
print("Video error: \(error)")
}
)
try await display.send(video)
// Stop video playback
await display.sendVideoStop()
```
### Observe video events
```swift
display.onPlaybackEvent = { event in
switch event.type {
case .started:
print("Video started playing")
case .ended:
print("Video finished")
case .error:
print("Video error: \(event.errorType)")
case .stopped:
print("Video was stopped")
case .unknown:
break
}
}
```
## Error handling
Display operations may fail. Handle errors gracefully to provide a better experience for your users.
### Display errors
[`DisplayError`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_displayerror) identifies errors for display operations on Meta AI glasses.
```swift
do {
try await display.send(view)
} catch let error as DisplayError {
switch error {
case .deviceDisconnected:
// The glasses disconnected — prompt user to reconnect
showReconnectPrompt()
case .connectionNotAvailable:
// No connection available to the glasses
showConnectionError()
case .deviceNotFound:
// The target device was not found
showDeviceNotFoundError()
case .invalidVideoURL:
// The video URL is blank or uses an unsupported scheme
showInvalidUrlError()
case .displayError(let message):
// The glasses reported an error (e.g., capability not active)
print("Display error: \(message)")
}
}
```
### Session-level errors when adding a display
```swift
do {
let display = try session.addDisplay()
} catch let error as DeviceSessionError {
switch error {
case .sessionIdle:
// Session hasn't been started yet — call session.start() first
case .sessionAlreadyStopped:
// Session was already stopped — create a new session
case .capabilityAlreadyActive:
// A display capability is already attached to this session
case .unexpectedError:
// SDK initialization issue
}
}
```
### Video errors
[`VideoError`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatdisplay_videoerror) outlines errors for video playback on Meta AI glasses.
```swift
let video = VideoPlayer(
provider: .uri(videoUrl),
codec: .mp4,
onError: { error in
switch error {
case .playbackFailed(let errorType):
switch errorType {
case .urlInvalid:
print("Invalid video URL")
case .alreadyPlaying:
print("Another video is already playing")
case .playbackFailed:
print("Playback failed on the glasses")
case .unknown:
print("Unknown video error")
}
}
}
)
```
### Integrate Display capability into your Android app
## Overview
This guide explains how to integrate display functionality into your existing Android app. For a complete guide on adding Wearables Device Access Toolkit capabilities to an existing Android app, including registration, streaming, and photo capture, check out the [Android integration guide](/docs/develop/dat/build-integration-android/).
## Create a visual display experience for your app
### Step 1: Add the Display dependency
In your app-level `build.gradle.kts`:
```kotlin
dependencies {
implementation("com.meta.wearable:mwdat-core:
")
implementation("com.meta.wearable:mwdat-display:
")
}
```
### Step 2: Configure AndroidManifest.xml
The Device Access Toolkit App Model (DAM) flow is the default for display integrations. This means that if `DAM_ENABLED` is missing from your app's `AndroidManifest.xml` file, the *default* value is now `true`. If you already set `DAM_ENABLED` to `true`, there is no change.
```xml
```
### Step 3: Import packages
Import the required display packages.
```kotlin
import com.meta.wearable.dat.core.*
import com.meta.wearable.dat.display.*
import com.meta.wearable.dat.display.types.*
import com.meta.wearable.dat.display.views.*
```
### Step 4: Connect to the display
Connect to the display by initializing the SDK, creating a session, and attaching the display capability.
```kotlin
// Initialize the SDK
Wearables.initialize(context)
// Create and start a session. Then observe session.state for DeviceSessionState.STARTED
val session = Wearables.createSession(AutoDeviceSelector()).getOrThrow()
session.start()
session.state.first { it == DeviceSessionState.STARTED }
// Attach the display capability. Then observe display.state for DisplayState.STARTED.
val displayResult = session.addDisplay(DisplayConfiguration())
val display = displayResult.getOrThrow()
// Send content once the display reaches STARTED
display.sendContent {
flexBox(direction = Direction.COLUMN, gap = 12) {
text("Hello, glasses!", style = TextStyle.HEADING)
}
}
```
### Step 5: Observe state changes
```kotlin
// Using Flow
display.state.collect { state ->
when (state) {
DisplayState.STARTED -> {
// Display is ready, send content
}
DisplayState.STOPPED -> {
// Display disconnected or stopped
}
DisplayState.STARTING,
DisplayState.STOPPING -> {
// Transitional states
}
DisplayState.CLOSED -> {
// Terminal: capability has been removed from the session
}
}
}
```
### Step 6: Stop display
When your app is done using the display capabilities, clean up resources.
```kotlin
session.removeDisplay()
session.stop()
```
**Note:** The glasses display dims after 20 seconds of inactivity and enters sleep mode at 25 seconds. Display sleep does *not* end a Wearables Device Access Toolkit session. When the display wakes, your app can either show the previously displayed content or send a new view.
## Build content
Wearables Device Access Toolkit uses a declarative component system to build UI layouts for display, so you compose views using a result builder in Kotlin.
Each call to [`sendContent()`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_display#sendcontent) replaces the entire display, so there are no incremental updates. Views are presented one at a time with vertical scrolling. Horizontal scrolling is not supported.
### FlexBox
**FlexBox** is the primary layout container for Meta Ray-Ban Display apps. It helps you build declarative UI trees with text, images, icons, and buttons. This means that every layout starts with a root FlexBox. Inside, you arrange either these child components or nested FlexBoxes using specific layout properties.
[`flexBox`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_flexboxscope) arranges children along a main axis (row or column) with control over spacing, alignment, and wrapping.
```kotlin
flexBox(
direction = Direction.COLUMN,      // COLUMN, ROW, COLUMN_REVERSE, ROW_REVERSE
gap = 12,                          // Gap between children in dp
alignment = Alignment.START,       // Main axis: START, CENTER, END, STRETCH
crossAlignment = Alignment.CENTER, // Cross axis: START, CENTER, END, STRETCH
wrap = true,                       // Whether children wrap
paddingTop = 16,                   // Per-edge padding in dp
paddingBottom = 16,
paddingStart = 16,
paddingEnd = 16
) {
// Child components go here
}
```
### Text
Display styled text. Three style presets match the glasses design system.
| [`TextStyle`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_textstyle) | Description |
|-------|-------------|
| `HEADING` | Large, bold text for section titles |
| `BODY` | Standard text for general content |
| `META` | Small text for captions and metadata |
| [`TextColor`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_textcolor) | Description |
|-------|-------------|
| `PRIMARY` | Default high-contrast text |
| `SECONDARY` | Lower-contrast supporting text |
```kotlin
text("Welcome", style = TextStyle.HEADING)
text("Tap a button to continue", style = TextStyle.BODY, color = TextColor.SECONDARY)
text("Step 1 of 5", style = TextStyle.META, color = TextColor.SECONDARY)
```
### Images
Display images loaded from URLs.
| [`ImageSize`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_imagesize) | Description |
|-------------|-------------|
| `ICON` | Small, inline-sized image |
| `FILL` | Fills the available space |
| [`CornerRadius`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_cornerradius) | Description |
|---------------|-------------|
| `NONE` | Sharp corners |
| `SMALL` | Slightly rounded |
| `MEDIUM` | Moderately rounded |
```kotlin
image(
uri = "https://example.com/photo.png",
sizePreset = ImageSize.FILL,
cornerRadius = CornerRadius.MEDIUM
)
```
**Note:** The Meta Ray-Ban Display glasses render at 600x600 resolution. Use appropriately sized images — there is no benefit to sending larger images, and oversized assets introduce lag due to Bluetooth bandwidth constraints.
### Buttons
Implement tappable buttons with corresponding labels, optional icons, and click handlers.
| [`ButtonStyle`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_buttonstyle) | Description |
|-------|-------------|
| `PRIMARY` | High-emphasis filled button |
| `SECONDARY` | Medium-emphasis filled button |
| `OUTLINE` | Low-emphasis outlined button |
```kotlin
button(
label = "Continue",
style = ButtonStyle.PRIMARY,
iconName = IconName.ARROW_RIGHT,
onClick = { /* Handle tap */ }
)
button(
label = "Go back",
style = ButtonStyle.OUTLINE,
iconName = IconName.ARROW_LEFT,
onClick = { /* Handle tap */ }
)
```
### Icons
Display a system icon from a built-in catalog of 100+ glyphs, covering navigation, media, weather, social, and more.
| [`IconStyle`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_iconstyle) | Description |
|-------|-------------|
| `FILLED` | Solid icon |
| `OUTLINE` | Hollow icon |
```kotlin
icon(name = IconName.CHECKMARK_CIRCLE, style = IconStyle.FILLED)
icon(name = IconName.BELL, style = IconStyle.OUTLINE)
```
See the [icon catalog](/develop/dat/display-icons) for all available `IconName` enum values.
If you need an icon outside the built-in catalog, you can also provide your own [custom image](#images).
### Flex layout properties
[Flex properties](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_flexboxscope) (`flexGrow`, `flexShrink`) are constructor parameters on `flexBox`. To apply flex behavior to a non-`flexBox` child, wrap it in a `flexBox`.
```kotlin
flexBox(direction = Direction.ROW) {
flexBox(flexGrow = 1f) {
text("Label", style = TextStyle.BODY)
}
flexBox(flexShrink = 0f) {
button("Action", style = ButtonStyle.PRIMARY)
}
}
```
FlexBox containers also support click handling and per-edge padding.
```kotlin
flexBox(paddingAll = 16, onClick = { /* Handle tap */ }) {
text("Tappable area", style = TextStyle.BODY)
}
```
### Layouts
#### Column layout
Use [`Direction`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_direction) to determine the main axis along which children are arranged. This code sample illustrates a *vertical* layout with a header, body text, and action button.
```kotlin
display.sendContent {
flexBox(direction = Direction.COLUMN, gap = 12, paddingAll = 16) {
text("Oil Change Guide", style = TextStyle.HEADING)
text("Learn how to change your car's oil in 6 easy steps.", style = TextStyle.BODY)
text("Duration: 30 min", style = TextStyle.META, color = TextColor.SECONDARY)
button(
label = "Start",
style = ButtonStyle.PRIMARY,
iconName = IconName.ARROW_RIGHT,
onClick = { showFirstStep() }
)
}
}
```
#### Row layout
This code sample illustrates a *horizontal* layout with an image thumbnail and text.
```kotlin
display.sendContent {
flexBox(
direction = Direction.ROW,
gap = 12,
crossAlignment = Alignment.CENTER,
paddingAll = 16,
) {
flexBox(direction = Direction.COLUMN, flexGrow = 1f) {
image(
uri = thumbnailUrl,
sizePreset = ImageSize.FILL,
cornerRadius = CornerRadius.MEDIUM,
)
}
flexBox(direction = Direction.COLUMN, gap = 4, flexGrow = 3f) {
text("Brake Pad Replacement", style = TextStyle.BODY)
text("45 min", style = TextStyle.META, color = TextColor.SECONDARY)
}
}
}
```
#### Clickable list items
Create a list of tappable items, each with its own icon and label.
```kotlin
display.sendContent {
flexBox(direction = Direction.COLUMN, gap = 8, paddingAll = 16) {
text("Tutorials", style = TextStyle.HEADING)
for (tutorial in tutorials) {
flexBox(
direction = Direction.ROW,
gap = 12,
crossAlignment = Alignment.CENTER,
paddingAll = 12,
onClick = { selectTutorial(tutorial) },
) {
icon(name = IconName.GEAR, style = IconStyle.FILLED)
text(tutorial.title, style = TextStyle.BODY)
}
}
}
}
```
#### Navigation
Create a step-by-step view with navigation buttons located at the bottom of the viewport.
```kotlin
display.sendContent {
flexBox(direction = Direction.COLUMN, gap = 12, paddingAll = 16) {
text(
"Step ${stepIndex + 1} of $totalSteps",
style = TextStyle.META,
color = TextColor.SECONDARY,
)
text(step.title, style = TextStyle.HEADING)
text(step.description, style = TextStyle.BODY)
image(
uri = step.imageUrl,
sizePreset = ImageSize.FILL,
cornerRadius = CornerRadius.MEDIUM,
)
flexBox(direction = Direction.ROW, gap = 8, alignment = Alignment.CENTER) {
button(
label = "Back",
style = ButtonStyle.OUTLINE,
iconName = IconName.ARROW_LEFT,
onClick = { showPreviousStep() },
)
button(
label = "Next",
style = ButtonStyle.PRIMARY,
iconName = IconName.ARROW_RIGHT,
onClick = { showNextStep() },
)
}
}
}
```
## User inputs
Users can interact with display content through captouch. These interactions are abstracted as tap events and delivered to your app through callbacks.
### Button clicks
Buttons receive tap events through their `onClick` handler.
```kotlin
button(label = "Accept", style = ButtonStyle.PRIMARY, onClick = { handleAccept() })
```
### Tappable areas
Make any FlexBox tappable by passing an `onClick` handler.
```kotlin
flexBox(direction = Direction.ROW, gap = 8, onClick = { openFavorites() }) {
icon(name = IconName.HEART, style = IconStyle.FILLED)
text("Favorites", style = TextStyle.BODY)
}
```
### Back gesture
The back gesture (a two-finger tap on the glasses temple) ends the display session.
## Video
Video playback allows you to play video content from a URL on the full-screen video player of Meta Ray-Ban Display glasses.
### Constraints
- **Format:** MP4 only
- **Maximum dimensions:** 400 pixels per side, 70,000 total pixels
- **URL scheme:** `https` only
- **Concurrency:** One video at a time per display session
### Play video
Play video using [`VideoPlayer`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_views_videoplayer).
```kotlin
val player = VideoPlayer(
source = VideoSource.Url("https://example.com/tutorial-clip.mp4"),
codec = VideoCodec.MP4
)
// Send the video to the display
display.sendContent {
video(player = player)
}
// Start video playback
player.play()
// Observe playback state
player.state.collect { state ->
when (state) {
VideoPlayerState.PLAYING -> { /* Video is playing */ }
VideoPlayerState.ENDED -> { /* Video finished */ }
VideoPlayerState.IDLE -> { /* Not started */ }
VideoPlayerState.STARTING -> { /* Buffering */ }
VideoPlayerState.PAUSE -> { /* Paused */ }
}
}
// Stop playback
player.close()
```
## Error handling
Display operations may fail. Handle errors gracefully to provide a better experience for your users.
### Display errors
Display operations return [`DatResult`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_core_types_datresult), which will contain a [`DisplayError`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_types_displayerror) if an error occurred during that operation.
```kotlin
display.sendContent {
flexBox { text("Hello") }
}.fold(
onSuccess = { /* Content sent successfully */ },
onFailure = { error, _ ->
when (error) {
DisplayError.CAPABILITY_DENIED ->
// Device denied display capability — check Wearables Developer Center config
checkDeveloperCenterSetup()
DisplayError.DEVICE_DISCONNECTED ->
// Glasses disconnected — prompt user to reconnect
showReconnectPrompt()
DisplayError.INVALID_SESSION_STATE ->
// Display not in .STARTED state — wait for state change
waitForDisplayReady()
DisplayError.RENDERING_FAILED ->
// Content failed to render on the glasses
showRenderError()
DisplayError.UNEXPECTED_ERROR ->
// Unknown error
showGenericError()
}
}
)
```
### Session-level errors when adding a display
```kotlin
session.addDisplay().fold(
onSuccess = { display -> /* Use the display */ },
onFailure = { error, _ -> showError(error.description) }
)
```
### Video errors
[`VideoPlayerError`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_display_types_videoplayererror) outlines errors for video playback on MRBD.
```kotlin
player.error.collect { error ->
when (error) {
VideoPlayerError.NOT_BOUND ->
// play() called before player was bound — send content first
VideoPlayerError.INVALID_URL ->
// URL is blank or uses unsupported scheme (only https)
VideoPlayerError.INVALID_DIMENSIONS ->
// Video exceeds max dimensions (400px per side, 70,000 total pixels)
VideoPlayerError.ALREADY_PLAYING ->
// Another video is active on the device
VideoPlayerError.STREAM_REJECTED ->
// Device rejected the video stream
VideoPlayerError.PLAYBACK_FAILED ->
// Codec error or surface unavailable on glasses
VideoPlayerError.UNEXPECTED_ERROR ->
// Unknown error
null -> { /* No error */ }
}
}
```
### Display icons
## Overview
Use the `Icon` component to render a system icon from the built-in catalog. Reference an icon by its enum value on the platform you are targeting — the SDK serializes the icon name to the device, which renders it using the on-device icon set.
## Reference
| Icon | iOS | Android |
|------|-----|---------|
| ![airplane](/images/icons/airplane.png){:width="32" style="filter: invert(1)"} | .airplane | IconName.AIRPLANE |
| ![arrow-down-shallow-u](/images/icons/arrow-down-shallow-u.png){:width="32" style="filter: invert(1)"} | .arrowDownShallowU | IconName.ARROW_DOWN_SHALLOW_U |
| ![arrow-left](/images/icons/arrow-left.png){:width="32" style="filter: invert(1)"} | .arrowLeft | IconName.ARROW_LEFT |
| ![arrow-right](/images/icons/arrow-right.png){:width="32" style="filter: invert(1)"} | .arrowRight | IconName.ARROW_RIGHT |
| ![arrow-u-left](/images/icons/arrow-u-left.png){:width="32" style="filter: invert(1)"} | .arrowULeft | IconName.ARROW_U_LEFT |
| ![arrow-up-shallow-u](/images/icons/arrow-up-shallow-u.png){:width="32" style="filter: invert(1)"} | .arrowUpShallowU | IconName.ARROW_UP_SHALLOW_U |
| ![avatar](/images/icons/avatar.png){:width="32" style="filter: invert(1)"} | .avatar | IconName.AVATAR |
| ![avatar-off](/images/icons/avatar-off.png){:width="32" style="filter: invert(1)"} | .avatarOff | IconName.AVATAR_OFF |
| ![bed-side](/images/icons/bed-side.png){:width="32" style="filter: invert(1)"} | .bedSide | IconName.BED_SIDE |
| ![bell](/images/icons/bell.png){:width="32" style="filter: invert(1)"} | .bell | IconName.BELL |
| ![bell-diagonal-right-dot](/images/icons/bell-diagonal-right-dot.png){:width="32" style="filter: invert(1)"} | .bellDiagonalRightDot | IconName.BELL_DIAGONAL_RIGHT_DOT |
| ![bell-off](/images/icons/bell-off.png){:width="32" style="filter: invert(1)"} | .bellOff | IconName.BELL_OFF |
| ![bike-share](/images/icons/bike-share.png){:width="32" style="filter: invert(1)"} | .bikeShare | IconName.BIKE_SHARE |
| ![bug](/images/icons/bug.png){:width="32" style="filter: invert(1)"} | .bug | IconName.BUG |
| ![bullhorn](/images/icons/bullhorn.png){:width="32" style="filter: invert(1)"} | .bullhorn | IconName.BULLHORN |
| ![bus](/images/icons/bus.png){:width="32" style="filter: invert(1)"} | .bus | IconName.BUS |
| ![calendar](/images/icons/calendar.png){:width="32" style="filter: invert(1)"} | .calendar | IconName.CALENDAR |
| ![campfire](/images/icons/campfire.png){:width="32" style="filter: invert(1)"} | .campfire | IconName.CAMPFIRE |
| ![car-front-view](/images/icons/car-front-view.png){:width="32" style="filter: invert(1)"} | .carFrontView | IconName.CAR_FRONT_VIEW |
| ![caret-down](/images/icons/caret-down.png){:width="32" style="filter: invert(1)"} | .caretDown | IconName.CARET_DOWN |
| ![caret-left](/images/icons/caret-left.png){:width="32" style="filter: invert(1)"} | .caretLeft | IconName.CARET_LEFT |
| ![caret-right](/images/icons/caret-right.png){:width="32" style="filter: invert(1)"} | .caretRight | IconName.CARET_RIGHT |
| ![caret-up](/images/icons/caret-up.png){:width="32" style="filter: invert(1)"} | .caretUp | IconName.CARET_UP |
| ![cart](/images/icons/cart.png){:width="32" style="filter: invert(1)"} | .cart | IconName.CART |
| ![checkmark](/images/icons/checkmark.png){:width="32" style="filter: invert(1)"} | .checkmark | IconName.CHECKMARK |
| ![checkmark-circle](/images/icons/checkmark-circle.png){:width="32" style="filter: invert(1)"} | .checkmarkCircle | IconName.CHECKMARK_CIRCLE |
| ![circle-8-rays-large](/images/icons/circle-8-rays-large.png){:width="32" style="filter: invert(1)"} | .circle8RaysLarge | IconName.CIRCLE_8_RAYS_LARGE |
| ![circle-handle](/images/icons/circle-handle.png){:width="32" style="filter: invert(1)"} | .circleHandle | IconName.CIRCLE_HANDLE |
| ![clock](/images/icons/clock.png){:width="32" style="filter: invert(1)"} | .clock | IconName.CLOCK |
| ![cloud](/images/icons/cloud.png){:width="32" style="filter: invert(1)"} | .cloud | IconName.CLOUD |
| ![cloud-crescent-moon](/images/icons/cloud-crescent-moon.png){:width="32" style="filter: invert(1)"} | .cloudCrescentMoon | IconName.CLOUD_CRESCENT_MOON |
| ![cloud-dot-four-rays](/images/icons/cloud-dot-four-rays.png){:width="32" style="filter: invert(1)"} | .cloudDotFourRays | IconName.CLOUD_DOT_FOUR_RAYS |
| ![cloud-five-dashes](/images/icons/cloud-five-dashes.png){:width="32" style="filter: invert(1)"} | .cloudFiveDashes | IconName.CLOUD_FIVE_DASHES |
| ![cloud-hook-swirl](/images/icons/cloud-hook-swirl.png){:width="32" style="filter: invert(1)"} | .cloudHookSwirl | IconName.CLOUD_HOOK_SWIRL |
| ![cloud-lightning](/images/icons/cloud-lightning.png){:width="32" style="filter: invert(1)"} | .cloudLightning | IconName.CLOUD_LIGHTNING |
| ![cocktail-glass](/images/icons/cocktail-glass.png){:width="32" style="filter: invert(1)"} | .cocktailGlass | IconName.COCKTAIL_GLASS |
| ![code](/images/icons/code.png){:width="32" style="filter: invert(1)"} | .code | IconName.CODE |
| ![coffee-cup](/images/icons/coffee-cup.png){:width="32" style="filter: invert(1)"} | .coffeeCup | IconName.COFFEE_CUP |
| ![compass-north-up-red](/images/icons/compass-north-up-red.png){:width="32" style="filter: invert(1) hue-rotate(180deg)"} | .compassNorthUpRed | IconName.COMPASS_NORTH_UP_RED |
| ![container-with-lid](/images/icons/container-with-lid.png){:width="32" style="filter: invert(1)"} | .containerWithLid | IconName.CONTAINER_WITH_LID |
| ![cross-briefcase](/images/icons/cross-briefcase.png){:width="32" style="filter: invert(1)"} | .crossBriefcase | IconName.CROSS_BRIEFCASE |
| ![dropper](/images/icons/dropper.png){:width="32" style="filter: invert(1)"} | .dropper | IconName.DROPPER |
| ![envelope-open](/images/icons/envelope-open.png){:width="32" style="filter: invert(1)"} | .envelopeOpen | IconName.ENVELOPE_OPEN |
| ![exclamation-circle](/images/icons/exclamation-circle.png){:width="32" style="filter: invert(1)"} | .exclamationCircle | IconName.EXCLAMATION_CIRCLE |
| ![exclamation-triangle](/images/icons/exclamation-triangle.png){:width="32" style="filter: invert(1)"} | .exclamationTriangle | IconName.EXCLAMATION_TRIANGLE |
| ![eye](/images/icons/eye.png){:width="32" style="filter: invert(1)"} | .eye | IconName.EYE |
| ![fork-knife](/images/icons/fork-knife.png){:width="32" style="filter: invert(1)"} | .forkKnife | IconName.FORK_KNIFE |
| ![four-arcs-up-filled](/images/icons/four-arcs-up-filled.png){:width="32" style="filter: invert(1)"} | .fourArcsUpFilled | IconName.FOUR_ARCS_UP_FILLED |
| ![four-arcs-up-grayscale](/images/icons/four-arcs-up-grayscale.png){:width="32" style="filter: invert(1)"} | .fourArcsUpGrayscale | IconName.FOUR_ARCS_UP_GRAYSCALE |
| ![four-corner-frame](/images/icons/four-corner-frame.png){:width="32" style="filter: invert(1)"} | .fourCornerFrame | IconName.FOUR_CORNER_FRAME |
| ![gear](/images/icons/gear.png){:width="32" style="filter: invert(1)"} | .gear | IconName.GEAR |
| ![globe-western-hemisphere](/images/icons/globe-western-hemisphere.png){:width="32" style="filter: invert(1)"} | .globeWesternHemisphere | IconName.GLOBE_WESTERN_HEMISPHERE |
| ![graduation-cap](/images/icons/graduation-cap.png){:width="32" style="filter: invert(1)"} | .graduationCap | IconName.GRADUATION_CAP |
| ![hashtag](/images/icons/hashtag.png){:width="32" style="filter: invert(1)"} | .hashtag | IconName.HASHTAG |
| ![headphones](/images/icons/headphones.png){:width="32" style="filter: invert(1)"} | .headphones | IconName.HEADPHONES |
| ![heart](/images/icons/heart.png){:width="32" style="filter: invert(1)"} | .heart | IconName.HEART |
| ![house](/images/icons/house.png){:width="32" style="filter: invert(1)"} | .house | IconName.HOUSE |
| ![i-circle](/images/icons/i-circle.png){:width="32" style="filter: invert(1)"} | .iCircle | IconName.I_CIRCLE |
| ![light-bulb](/images/icons/light-bulb.png){:width="32" style="filter: invert(1)"} | .lightBulb | IconName.LIGHT_BULB |
| ![magic-wand](/images/icons/magic-wand.png){:width="32" style="filter: invert(1)"} | .magicWand | IconName.MAGIC_WAND |
| ![meta-ai](/images/icons/meta-ai.png){:width="32" style="filter: invert(1)"} | .metaAi | IconName.META_AI |
| ![mountain-square](/images/icons/mountain-square.png){:width="32" style="filter: invert(1)"} | .mountainSquare | IconName.MOUNTAIN_SQUARE |
| ![mountain-square-stacked](/images/icons/mountain-square-stacked.png){:width="32" style="filter: invert(1)"} | .mountainSquareStacked | IconName.MOUNTAIN_SQUARE_STACKED |
| ![museum-building](/images/icons/museum-building.png){:width="32" style="filter: invert(1)"} | .museumBuilding | IconName.MUSEUM_BUILDING |
| ![music-note](/images/icons/music-note.png){:width="32" style="filter: invert(1)"} | .musicNote | IconName.MUSIC_NOTE |
| ![nine-squares-grid](/images/icons/nine-squares-grid.png){:width="32" style="filter: invert(1)"} | .nineSquaresGrid | IconName.NINE_SQUARES_GRID |
| ![padlock-closed](/images/icons/padlock-closed.png){:width="32" style="filter: invert(1)"} | .padlockClosed | IconName.PADLOCK_CLOSED |
| ![padlock-open](/images/icons/padlock-open.png){:width="32" style="filter: invert(1)"} | .padlockOpen | IconName.PADLOCK_OPEN |
| ![palette](/images/icons/palette.png){:width="32" style="filter: invert(1)"} | .palette | IconName.PALETTE |
| ![paper-airplane](/images/icons/paper-airplane.png){:width="32" style="filter: invert(1)"} | .paperAirplane | IconName.PAPER_AIRPLANE |
| ![pencil](/images/icons/pencil.png){:width="32" style="filter: invert(1)"} | .pencil | IconName.PENCIL |
| ![pencil-square](/images/icons/pencil-square.png){:width="32" style="filter: invert(1)"} | .pencilSquare | IconName.PENCIL_SQUARE |
| ![person](/images/icons/person.png){:width="32" style="filter: invert(1)"} | .person | IconName.PERSON |
| ![person-circle](/images/icons/person-circle.png){:width="32" style="filter: invert(1)"} | .personCircle | IconName.PERSON_CIRCLE |
| ![phone](/images/icons/phone.png){:width="32" style="filter: invert(1)"} | .phone | IconName.PHONE |
| ![phone-handset-arrow-down-left](/images/icons/phone-handset-arrow-down-left.png){:width="32" style="filter: invert(1)"} | .phoneHandsetArrowDownLeft | IconName.PHONE_HANDSET_ARROW_DOWN_LEFT |
| ![phone-handset-arrow-up-right](/images/icons/phone-handset-arrow-up-right.png){:width="32" style="filter: invert(1)"} | .phoneHandsetArrowUpRight | IconName.PHONE_HANDSET_ARROW_UP_RIGHT |
| ![phone-slash](/images/icons/phone-slash.png){:width="32" style="filter: invert(1)"} | .phoneSlash | IconName.PHONE_SLASH |
| ![pizza-slice](/images/icons/pizza-slice.png){:width="32" style="filter: invert(1)"} | .pizzaSlice | IconName.PIZZA_SLICE |
| ![plus](/images/icons/plus.png){:width="32" style="filter: invert(1)"} | .plus | IconName.PLUS |
| ![plus-circle](/images/icons/plus-circle.png){:width="32" style="filter: invert(1)"} | .plusCircle | IconName.PLUS_CIRCLE |
| ![shopping-bag](/images/icons/shopping-bag.png){:width="32" style="filter: invert(1)"} | .shoppingBag | IconName.SHOPPING_BAG |
| ![sliders-horizontal](/images/icons/sliders-horizontal.png){:width="32" style="filter: invert(1)"} | .slidersHorizontal | IconName.SLIDERS_HORIZONTAL |
| ![smart-glasses](/images/icons/smart-glasses.png){:width="32" style="filter: invert(1)"} | .smartGlasses | IconName.SMART_GLASSES |
| ![smiley-circle](/images/icons/smiley-circle.png){:width="32" style="filter: invert(1)"} | .smileyCircle | IconName.SMILEY_CIRCLE |
| ![speaker-off](/images/icons/speaker-off.png){:width="32" style="filter: invert(1)"} | .speakerOff | IconName.SPEAKER_OFF |
| ![speaker-with-one-arc](/images/icons/speaker-with-one-arc.png){:width="32" style="filter: invert(1)"} | .speakerWithOneArc | IconName.SPEAKER_WITH_ONE_ARC |
| ![speaker-with-three-arcs](/images/icons/speaker-with-three-arcs.png){:width="32" style="filter: invert(1)"} | .speakerWithThreeArcs | IconName.SPEAKER_WITH_THREE_ARCS |
| ![speaker-with-two-arcs](/images/icons/speaker-with-two-arcs.png){:width="32" style="filter: invert(1)"} | .speakerWithTwoArcs | IconName.SPEAKER_WITH_TWO_ARCS |
| ![speech-bubble](/images/icons/speech-bubble.png){:width="32" style="filter: invert(1)"} | .speechBubble | IconName.SPEECH_BUBBLE |
| ![speech-bubble-off](/images/icons/speech-bubble-off.png){:width="32" style="filter: invert(1)"} | .speechBubbleOff | IconName.SPEECH_BUBBLE_OFF |
| ![stadium](/images/icons/stadium.png){:width="32" style="filter: invert(1)"} | .stadium | IconName.STADIUM |
| ![star](/images/icons/star.png){:width="32" style="filter: invert(1)"} | .star | IconName.STAR |
| ![star-circle-triangle-ai](/images/icons/star-circle-triangle-ai.png){:width="32" style="filter: invert(1)"} | .starCircleTriangleAi | IconName.STAR_CIRCLE_TRIANGLE_AI |
| ![taxi](/images/icons/taxi.png){:width="32" style="filter: invert(1)"} | .taxi | IconName.TAXI |
| ![three-dot-speech-bubble](/images/icons/three-dot-speech-bubble.png){:width="32" style="filter: invert(1)"} | .threeDotSpeechBubble | IconName.THREE_DOT_SPEECH_BUBBLE |
| ![three-dots-horizontal](/images/icons/three-dots-horizontal.png){:width="32" style="filter: invert(1)"} | .threeDotsHorizontal | IconName.THREE_DOTS_HORIZONTAL |
| ![three-horizontal-lines](/images/icons/three-horizontal-lines.png){:width="32" style="filter: invert(1)"} | .threeHorizontalLines | IconName.THREE_HORIZONTAL_LINES |
| ![three-horizontal-lines-stacked-descending](/images/icons/three-horizontal-lines-stacked-descending.png){:width="32" style="filter: invert(1)"} | .threeHorizontalLinesStackedDescending | IconName.THREE_HORIZONTAL_LINES_STACKED_DESCENDING |
| ![three-people-overlapping](/images/icons/three-people-overlapping.png){:width="32" style="filter: invert(1)"} | .threePeopleOverlapping | IconName.THREE_PEOPLE_OVERLAPPING |
| ![train](/images/icons/train.png){:width="32" style="filter: invert(1)"} | .train | IconName.TRAIN |
| ![tree](/images/icons/tree.png){:width="32" style="filter: invert(1)"} | .tree | IconName.TREE |
| ![triangle-left-vertical-line](/images/icons/triangle-left-vertical-line.png){:width="32" style="filter: invert(1)"} | .triangleLeftVerticalLine | IconName.TRIANGLE_LEFT_VERTICAL_LINE |
| ![triangle-right](/images/icons/triangle-right.png){:width="32" style="filter: invert(1)"} | .triangleRight | IconName.TRIANGLE_RIGHT |
| ![triangle-right-circle](/images/icons/triangle-right-circle.png){:width="32" style="filter: invert(1)"} | .triangleRightCircle | IconName.TRIANGLE_RIGHT_CIRCLE |
| ![triangle-right-vertical-line](/images/icons/triangle-right-vertical-line.png){:width="32" style="filter: invert(1)"} | .triangleRightVerticalLine | IconName.TRIANGLE_RIGHT_VERTICAL_LINE |
| ![two-arrows-clockwise](/images/icons/two-arrows-clockwise.png){:width="32" style="filter: invert(1)"} | .twoArrowsClockwise | IconName.TWO_ARROWS_CLOCKWISE |
| ![two-lines-parallel](/images/icons/two-lines-parallel.png){:width="32" style="filter: invert(1)"} | .twoLinesParallel | IconName.TWO_LINES_PARALLEL |
| ![two-squares-stacked-right-down](/images/icons/two-squares-stacked-right-down.png){:width="32" style="filter: invert(1)"} | .twoSquaresStackedRightDown | IconName.TWO_SQUARES_STACKED_RIGHT_DOWN |
| ![two-triangles-left](/images/icons/two-triangles-left.png){:width="32" style="filter: invert(1)"} | .twoTrianglesLeft | IconName.TWO_TRIANGLES_LEFT |
| ![two-triangles-right](/images/icons/two-triangles-right.png){:width="32" style="filter: invert(1)"} | .twoTrianglesRight | IconName.TWO_TRIANGLES_RIGHT |
| ![video-camera](/images/icons/video-camera.png){:width="32" style="filter: invert(1)"} | .videoCamera | IconName.VIDEO_CAMERA |
| ![video-camera-off](/images/icons/video-camera-off.png){:width="32" style="filter: invert(1)"} | .videoCameraOff | IconName.VIDEO_CAMERA_OFF |
| ![wristband](/images/icons/wristband.png){:width="32" style="filter: invert(1)"} | .wristband | IconName.WRISTBAND |
| ![wristband-slash](/images/icons/wristband-slash.png){:width="32" style="filter: invert(1)"} | .wristbandSlash | IconName.WRISTBAND_SLASH |
| ![x](/images/icons/x.png){:width="32" style="filter: invert(1)"} | .x | IconName.X |
### Session lifecycle
## Overview
The Wearables Device Access Toolkit runs inside sessions. Meta AI glasses expose two experience types:
- **Device sessions** grant sustained access to device sensors and outputs.
- **Transactions** are short, system-owned interactions (for example, notifications or "Hey Meta").
When your app requests a device session, the glasses grant or revoke access as needed, the app observes state, and the system decides when to change it.
## Device session states
`DeviceSessionState` is device-driven and delivered asynchronously. On Android, observe the state using [`state`](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_core_session_devicesession#state). On iOS, use [`stateStream()`](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcore_devicesession#statestream).
| State              | Meaning                                   | App expectation                       |
|--------------------|--------------------------------------------|---------------------------------------|
| `STOPPED`          | Session is inactive and not reconnecting.  | Free resources. Wait for user action. |
| `STARTED`          | Session is active and streaming data.      | Perform live work.                    |
| `PAUSED`          | Session is temporarily suspended.          | Hold work. Paths may resume.          |
**Note:**  `DeviceSessionState` does not expose the reason for a transition.
Observe the `DeviceSessionState` and react without assuming the cause of a change.
**Android**
```kotlin
val session = Wearables.createSession(AutoDeviceSelector()).getOrThrow()
session.state.collect { state ->
when (state) {
DeviceSessionState.STARTED -> onStarted()
DeviceSessionState.PAUSED -> onPaused()
DeviceSessionState.STOPPED -> onStopped()
else -> {}
}
}
```
**iOS**
```swift
let session = try wearables.createSession(deviceSelector: AutoDeviceSelector(wearables: wearables))
for await state in session.stateStream() {
switch state {
case .started: onStarted()
case .paused: onPaused()
case .stopped: onStopped()
default: break
}
}
```
Recommended reactions:
- On `STARTED`, confirm UI shows that the device session is live.
- On `PAUSED`, keep the connection and wait for `STARTED` or `STOPPED`.
- On `STOPPED`, release device resources and allow the user to restart.
## Common device session transitions
The device can change `DeviceSessionState` when:
- The user performs a system gesture that opens another experience.
- Another app or system feature starts a device session.
- The user removes or folds the glasses, disconnecting Bluetooth.
- The user removes the app from the Meta AI app.
- Connectivity between the Meta AI app and the glasses drops.
Many events lead to `STOPPED`, while some gestures pause a session and later resume it.
## Pause and resume
When `DeviceSessionState` changes to `PAUSED`:
- The device keeps the connection alive.
- Streams stop delivering data while paused.
- The device resumes streaming by returning to `STARTED`.
Your app should not attempt to restart a device session while it is paused.
## Device availability
Use device metadata to detect availability. Hinge position is not exposed, but it influences connectivity. Again, for an Android integration:
**Android**
```kotlin
Wearables.devicesMetadata[deviceId]?.collect { metadata ->
if (metadata.available) {
onDeviceAvailable()
} else {
onDeviceUnavailable()
}
}
```
**iOS**
```swift
let token = Wearables.shared.deviceForIdentifier(deviceId).addLinkStateListener { linkState in
if linkState == .connected {
onDeviceAvailable()
} else {
onDeviceUnavailable()
}
}
```
Expected effects:
- Closing the hinges disconnects Bluetooth, stops active streams, and forces `DeviceSessionState` to `STOPPED`.
- Opening the hinges restores Bluetooth when the glasses are nearby, but does not restart the device session. Start a new session after the device becomes available/connected.
## Implementation checklist
- Subscribe to `session.state`/`stateStream` and handle all `DeviceSessionState` values.
- Monitor device availability before starting work.
- Release resources only after receiving `STOPPED` or loss of availability.
- Rely only on observable state rather than inferring transition causes.
### Permissions and registration
## Overview
The Wearables Device Access Toolkit separates app registration and device permissions. All permission grants occur through the Meta AI app. Permissions work across multiple linked wearables.
Camera permissions are granted at the app level. However, each device will need to confirm permissions specifically, in turn allowing your app to support a set of devices with individual permissions.
To create an integration, follow this guidance to build your first integration for [Android](/docs/develop/dat/build-integration-android/) or [iOS](/docs/develop/dat/build-integration-ios/).
## Registration
Your app registers with the Meta AI app to be an permitted integration. This establishes the connection between your app and the glasses platform. Registration happens once through Meta AI app with glasses connected. Users see your app name in the list of connected apps. They can unregister anytime through the Meta AI app. You can also implement an unregistration flow is desired.
## Device permissions
After registration, request specific permissions (see possible values for [Android](https://wearables.developer.meta.com/docs/reference/android/dat/0.8/com_meta_wearable_dat_core_types_permission#enumeration_constants) and [iOS](https://wearables.developer.meta.com/docs/reference/ios_swift/dat/0.8/mwdatcore_permission#enumeration_constants)). The Meta AI app runs the permission grant flow. Users choose **Allow once** (temporary) or **Allow always** (persistent).
### User experience flow
![Illustrating the user experience flow for permissions and using features.](/images/wearables-permissions-request-1.png)
- Without registration, permission requests fail.
- With registration but no permissions, your app connects but cannot access camera.
## Multi-device permission behavior
Users can link multiple glasses to Meta AI. The toolkit handles this transparently.
### How it works
Users can have multiple pairs of glasses. Permission granted on any linked device allows your app to use that feature. When checking permissions, Wearables Device Access Toolkit queries all connected devices. If any device has the permission granted, your app receives "granted" status.
### Practical implications
You don't track which specific device has permissions. Permission checks return granted if _any_ connected device has approved. If all devices disconnect, permission checks will indicate unavailability. Users manage permissions per device in the Meta AI app.
## Distribution and registration
Testing vs. production have different permission requirements. When developer mode is activated, registration is always allowed. When a build is distributed, users must be in the proper release channel to get the app. This is controlled by the `MWDAT` application ID.
**Note:** For security purposes, only one 3rd party app can remain registered at a time in Developer Mode. Registering a new app will automatically unregister any previously registered app.
- For setting up developer mode, see [Getting started with the Wearables Device Access Toolkit](/docs/develop/dat/getting-started-toolkit/).
- For details on creating release channels, see [Manage projects in Developer Center](/docs/develop/dat/manage-projects/).
- This page also explains where to find the `APPLICATION_ID` that must be added to your production manifest/bundle configuration.
### Use device microphones and speakers
## Overview
Device audio uses two Bluetooth profiles:
| Profile | Direction | Quality | Use case |
|---------|-----------|---------|----------|
| **A2DP** (Advanced Audio Distribution Profile) | Output only | High quality (44.1/48 kHz stereo) | Music, media playback, TTS |
| **HFP** (Hands-Free Profile) | Bidirectional | 8 kHz mono | Voice capture from the glasses microphone |
In HFP mode, the wearable's microphones use beamforming to isolate the wearer's voice, which significantly reduces the volume of ambient sounds and other speakers. This is expected behavior, not a bug.
## Choose a profile
Use **A2DP** when you only need to play audio to the glasses, since it provides significantly higher fidelity than HFP. Use **HFP** when you need microphone input from the wearer. The two profiles are mutually exclusive: activating HFP switches the glasses away from A2DP, and audio output quality drops to 8 kHz mono for the duration of the session.
Wearables Device Access Toolkit sessions share microphone and speaker access with the system Bluetooth stack on the glasses.
## iOS
### A2DP (output only) — Play audio to the glasses
A2DP is the high-quality Bluetooth media route on iOS. Configure your app for playback, and the system can route output to paired glasses automatically.
```swift
import AVFoundation
let audioSession = AVAudioSession.sharedInstance()
try audioSession.setCategory(.playback, mode: .default, options: [])
try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
```
Use `AVAudioPlayer`, `AVSpeechSynthesizer`, or any standard audio API to play audio, then verify the active route before assuming output is on the glasses.
```swift
let player = try AVAudioPlayer(contentsOf: audioFileURL)
player.play()
```
#### Verify the route
```swift
let hasA2DPOutput = audioSession.currentRoute.outputs.contains {
$0.portType == .bluetoothA2DP
}
```
### HFP (bidirectional) — Capture audio from the glasses microphone
HFP requires more setup than A2DP. Use `.allowBluetoothHFP` for microphone capture; A2DP output options do not provide microphone access. If your SDK only exposes the older `.allowBluetooth` option, use that option for HFP.
**Ordering constraint:** When using HFP with a DAT camera stream, the HFP microphone must be fully configured before the stream starts. The correct ordering is:
1. Add the DAT camera stream to the session.
2. Configure and start the HFP microphone. Wait for the route to settle.
3. Start the DAT camera stream.
Starting the DAT stream before HFP is ready can cause the audio route to fail silently.
#### Configure the audio session
```swift
import AVFoundation
// Request microphone permission
let granted = await withCheckedContinuation { continuation in
AVAudioApplication.requestRecordPermission { granted in
continuation.resume(returning: granted)
}
}
guard granted else { return }
// Configure the session for HFP
let audioSession = AVAudioSession.sharedInstance()
try audioSession.setCategory(.playAndRecord, mode: .default, options: [.allowBluetoothHFP])
try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
```
#### Select glasses as the preferred input
The system may have multiple Bluetooth inputs available. Find the HFP port that corresponds to the glasses and set it as the preferred input.
```swift
if let hfpInput = audioSession.availableInputs?.first(where: { $0.portType == .bluetoothHFP }) {
try audioSession.setPreferredInput(hfpInput)
}
```
#### Capture audio with `AVAudioEngine`
Install a tap on the audio engine's input node to receive raw PCM buffers from the glasses microphone.
```swift
let audioEngine = AVAudioEngine()
let inputNode = audioEngine.inputNode
let format = inputNode.inputFormat(forBus: 0)
inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, _ in
// Forward the buffer to your audio pipeline (e.g., LiveKit, a file writer, etc.)
handleAudioBuffer(buffer)
}
audioEngine.prepare()
try audioEngine.start()
```
#### Wait for the route to settle
After starting the audio engine, the Bluetooth HFP route needs time to stabilize. After waiting, verify the route is active before starting the DAT stream.
```swift
// Allow the Bluetooth HFP route to settle
try await Task.sleep(nanoseconds: 2 * NSEC_PER_SEC)
// Verify HFP is actually routed
let hasHFPRoute = audioSession.currentRoute.inputs.contains { $0.portType == .bluetoothHFP }
guard hasHFPRoute else {
audioEngine.stop()
try audioSession.setActive(false, options: .notifyOthersOnDeactivation)
throw MyError.hfpRouteUnavailable
}
```
#### Teardown
When you're done capturing, call `removeTap(onBus:)` to stop receiving input buffers, then deactivate the session. If you need to return to A2DP playback, reconfigure the audio session with `.playback` category after deactivation.
```swift
inputNode.removeTap(onBus: 0)
audioEngine.stop()
try audioSession.setActive(false, options: .notifyOthersOnDeactivation)
```
## Android
```kotlin
import android.content.Context
import android.media.AudioDeviceInfo
import android.media.AudioManager
import android.os.Build
private fun routeAudioToBluetooth(context: Context): Boolean {
if (Build.VERSION.SDK_INT
device.type == userSelectedDeviceType
}
if (selectedDevice == null) {
return false
}
audioManager.mode = AudioManager.MODE_IN_COMMUNICATION
return audioManager.setCommunicationDevice(selectedDevice)
}
```
For guidance on how to use audio in your app, refer to the corresponding iOS API and Android API docs:
- iOS API: [AVAudioSession](https://developer.apple.com/documentation/AVFAudio/AVAudioSession)
- Android API: [AudioManager](https://developer.android.com/reference/android/media/AudioManager)
### Mock Device Kit
## Overview
Mock Device Kit is a component of the Device Access Toolkit that helps you build and test integrations for Meta glasses, without the need to access the actual hardware.
This kit provides a simulated device that mirrors the capabilities and behavior of Meta glasses, including camera streaming, photo capture, permissions, and device state changes. You can use it to test your app integrations in a virtual environment. This is useful for rapid iteration, automated testing, and development workflows where physical devices may not be available or practical to use.
When Mock Device Kit is enabled, it simulates the entire SDK stack -- including app connection (registration) and permission requests. Your app code works the same way regardless of whether it's talking to a real device or a mock device.
**Note:** This page covers the debug UI in the CameraAccess sample app. For writing automated tests, see [Android testing with Mock Device Kit](/docs/develop/dat/testing-mdk-android/) or [iOS testing with Mock Device Kit](/docs/develop/dat/testing-mdk-ios/).
## Using Mock Device Kit in the CameraAccess sample
The CameraAccess sample app includes a built-in debug UI for controlling Mock Device Kit, available in debug builds only.
### Enabling Mock Device Kit
1. Launch the CameraAccess sample app. You'll see the home screen prompting you to connect your glasses.
2. Tap the **debug icon** (ladybug) on the right side of the screen to open the Mock Device Kit sheet.
3. Tap **Enable MockDeviceKit**. This activates the mock device system, which simulates app connection and permission requests. The CameraAccess sample is configured to automatically complete registration when Mock Device Kit is enabled, so the app passes the connection step.
4. Close the sheet to see the main screen with a "Start streaming" button.
![Image showing the Mock Device Kit debug menu](/images/mock-device-kit-debug-menu.png){:width="60%"}
You can tap **Disable MockDeviceKit** at any time to return to the real SDK stack.
### Pairing a mock device
1. Open the debug menu and tap **Pair RayBan Meta** to create a simulated device. A mock device card appears in the sheet.
2. Use the toggles on the device card to set the device state:
- **Power** -- Simulates powering on the glasses.
- **Don** -- Simulates wearing the glasses. This automatically unfolds the device as well.
- **Unfold** -- Simulates unfolding the glasses.
The device must be powered on and worn (donned) before streaming can start. You can pair up to three mock devices at a time. To remove a device, open the sheet and tap **Unpair** on the device card.
![Image showing mock device controls](/images/mock-device-kit-device-controls.png){:width="60%"}
## Simulating media streaming
Once your mock device is powered on and worn, close the Mock Device Kit sheet. The app detects the active device and enables the **Start streaming** button.
Before starting a stream, you can configure Mock Device Kit with either a live phone camera feed or a video file to simulate streaming from the glasses.
### Using phone camera as a mock feed
You can use your phone's own camera as a live mock camera feed. This is useful for real-time testing and demos without needing pre-recorded video files.
1. Open the Mock Device Kit sheet and expand your paired device card.
2. Tap the **camera source picker** and select **Front Camera** or **Back Camera**.
3. If prompted, grant camera permission to the app.
4. Close the sheet and tap **Start streaming**. The phone's camera feed appears as if it were streaming from the glasses.
When using a phone camera as the mock feed, photo capture takes a live still from the active camera session.
### Using a video file
1. Open the Mock Device Kit sheet and expand your paired device card.
2. Tap the **camera source picker** and select **Video File**.
3. Tap **Select video** and choose a video from your photo library. This video is used as the mock streaming feed.
**Note**: Mock Device Kit requires video files in h265 format. The iOS CameraAccess sample app converts video automatically, but the Android sample does not. To transcode a video to h265 manually, you can use [FFmpeg](https://www.ffmpeg.org/). For example:
```bash
ffmpeg -hwaccel videotoolbox -i input_video.mp4 -c:v hevc_videotoolbox -c:a aac_at -tag:v hvc1 -vf "scale=540:960" output_video.mov
```
### Image capture
To set a specific image as the mock capture result, tap **Select image** and choose a photo from your photo library. This image is returned when you trigger a photo capture during streaming.
If you are using a phone camera as the mock feed, you don't need to set a separate captured image -- capture takes a live photo from the active camera instead.
## Simulating touch gestures
The mock device card includes buttons for simulating capacitive touch gestures on the glasses temple:
- **Tap** -- Simulates a single capacitive touch. During an active stream, this toggles between pause and resume.
- **Tap and Hold** -- Simulates a tap-and-hold gesture. During an active stream, this stops the session.
These gestures let you test how your app responds to user interactions on the glasses without needing physical hardware.
### How to test with Mock Device Kit on iOS
## Overview
Use this guide when your iOS project already integrates the Wearables Device Access Toolkit and you need to test without physical glasses.
## Set up Mock Device Kit in XCTest
Create a reusable base rule or test class that configures Mock Device Kit, grants permissions, and resets state.
```swift
import XCTest
import MetaWearablesDAT
@MainActor
class MockDeviceKitTestCase: XCTestCase {
override func setUp() async throws {
try await super.setUp()
try? Wearables.configure()
MockDeviceKit.shared.enable()
}
override func tearDown() async throws {
MockDeviceKit.shared.disable()
try await super.tearDown()
}
}
```
## Configure camera feeds for streaming tests
Mock camera feeds let you verify streaming and capture workflows without video hardware.
### Provide a mock video feed
```swift
let device = try MockDeviceKit.shared.pairGlasses(model: .rayBanMeta)
let camera = device.services.camera
await camera.setCameraFeed(fileURL: videoURL)
```
### Provide a captured photo
```swift
let device = try MockDeviceKit.shared.pairGlasses(model: .rayBanMeta)
let camera = device.services.camera
await camera.setCapturedImage(fileURL: imageURL)
```
## MockDevice test server for XCUITest
The MockDevice test server enables UI automation testing by allowing XCUITest processes to control mock devices at runtime via HTTP. This eliminates the need to hardcode mock device setup in your app, enabling dynamic test scenarios where each test can configure its own device state.
This approach enables UI automation without physical hardware (run XCUITests on CI simulators), dynamic test scenarios (each test pairs different devices and configures unique camera feeds), full flow testing (registration, pairing, streaming, photo capture), deterministic testing (control exact device state to test edge cases), and parallel test execution (each test manages its own mock device independently).
> **Note:** For more examples of how to leverage the MockDevice Test Server to test your apps, see the Camera Access sample code at `ExternalSampleApps/CameraAccess/CameraAccessUITests/`.
### Architecture
The test server runs in your app process and listens on localhost. The XCUITest client connects via HTTP to control mock devices. The server writes its port to a temp file that the client reads to discover the connection details. Both processes share the same `/tmp` directory on the simulator.
```
┌─────────────────────────────────────┐                         ┌──────────────────────────────────┐
│         App Process (DEBUG)         │     HTTP (localhost)    │     XCUITest Process             │
│                                     │                         │                                  │
│  MockDeviceKit                      │   POST /device/pair     │  MockDeviceTestClient            │
│   └─ startTestServer()              │   POST /device/don      │                                  │
│                                     │   POST /device/doff     │  Port discovery:                 │
│                                     │   POST /device/power-on │   reads port from temp file      │
│                                     │   GET  /device/state    │   written by server on start     │
│                                     │   POST /camera/set-feed │                                  │
│                                     │   ...                   │                                  │
│                                     │◄────────────────────────│                                  │
└─────────────────────────────────────┘                         └──────────────────────────────────┘
```
### Server setup (app process)
Start the test server when the app launches with a `--ui-testing` flag. The server should only be enabled in DEBUG builds.
```swift
import MWDATMockDevice
if ProcessInfo.processInfo.arguments.contains("--ui-testing") {
MockDeviceKit.shared.enable(config: MockDeviceKitConfig(initiallyRegistered: false))
let portFilePath = ProcessInfo.processInfo.environment["MWDAT_TEST_SERVER_PORT_FILE"]
Task {
try await MockDeviceKit.shared.startTestServer(portFilePath: portFilePath)
// Server is now listening — tests drive mock device setup via HTTP
}
}
```
### Client setup (XCUITest process)
Link `MWDATMockDeviceTestClient` in your UI test target. The client reads the port from the temp file.
```swift
import MWDATMockDeviceTestClient
import XCTest
final class MyUITests: XCTestCase {
var portFilePath: String {
NSTemporaryDirectory() + "mwdat_test_server_port.txt"
}
private let app = XCUIApplication()
private var mockClient: MockDeviceTestClient!
private var deviceId: String?
override func setUpWithError() throws {
// Remove any stale port file from a previous run
try? FileManager.default.removeItem(atPath: portFilePath)
app.launchArguments = ["--ui-testing"]
app.launchEnvironment["MWDAT_TEST_SERVER_PORT_FILE"] = portFilePath
app.launch()
// Initialize the client after launch so the server has time to write the port file
mockClient = MockDeviceTestClient(portFilePath: portFilePath)
XCTAssertTrue(mockClient.waitForServer(timeout: 10), "Test server should be running")
}
override func tearDownWithError() throws {
if let deviceId {
mockClient.unpairDevice(deviceId: deviceId)
}
deviceId = nil
}
func testStreaming() {
// Pair a device — pairDevice() powers it on and dons it automatically
guard let id = mockClient.pairDevice() else {
XCTFail("Failed to pair mock device")
return
}
deviceId = id
// Configure camera resources for this device
mockClient.setCameraFeed(deviceId: id, resourceName: "plant", ext: "mp4")
mockClient.setCapturedImage(deviceId: id, resourceName: "plant", ext: "png")
// Device is now paired, powered on, and donned
let startButton = app.buttons["Start streaming"]
XCTAssertTrue(startButton.waitForExistence(timeout: 15))
// Control device state mid-test
mockClient.doff(deviceId: id)   // device becomes inactive
mockClient.don(deviceId: id)    // device becomes active again
mockClient.fold(deviceId: id)   // hinges close, streaming stops
mockClient.unfold(deviceId: id) // hinges open
// Query device state
let state = mockClient.getDeviceState()
XCTAssertEqual(state?["pairedDeviceCount"] as? Int, 1)
}
}
```
### Available client methods
| Method | Description |
|--------|-------------|
| `pairDevice()` | Pairs a mock Ray-Ban Meta, powers on, dons; returns the device ID (nil on failure) |
| `unpairDevice(deviceId:)` | Unpairs the specified mock device |
| `powerOn(deviceId:)` / `powerOff(deviceId:)` | Controls device power state |
| `don(deviceId:)` / `doff(deviceId:)` | Simulates wearing / removing the device |
| `fold(deviceId:)` / `unfold(deviceId:)` | Simulates folding / unfolding the glasses |
| `captouchTap(deviceId:)` | Simulates a single tap gesture (toggles pause/resume) |
| `captouchTapAndHold(deviceId:)` | Simulates tap-and-hold (stops active session) |
| `setCameraFeed(deviceId:resourceName:ext:)` | Sets the camera feed video resource from the test bundle |
| `setCapturedImage(deviceId:resourceName:ext:)` | Sets the captured image resource from the test bundle |
| `getDeviceState()` | Returns `{"pairedDeviceCount": Int, "deviceIds": [String]}` |
| `healthCheck()` | Checks if the server is reachable |
| `waitForServer(timeout:)` | Polls until the server responds or timeout expires |
### Swift Package Manager setup
Add `MWDATMockDeviceTestClient` as a dependency of your UI test target. The client has no dependency on `MWDATMockDevice` — it communicates purely over HTTP.
### How to test with Mock Device Kit on Android
## Overview
Use this guide when your Android project already integrates the Wearables Device Access Toolkit and you need to test without physical glasses.
## Set up Mock Device Kit in instrumentation tests
Create a reusable base rule or test class that configures Mock Device Kit, grants permissions, and resets state.
```kotlin
import android.content.Context
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.platform.app.InstrumentationRegistry
import com.meta.wearable.dat.mockdevice.MockDeviceKit
import com.meta.wearable.dat.mockdevice.api.MockDeviceKitInterface
import org.junit.After
import org.junit.Before
import org.junit.Rule
open class MockDeviceKitTestCase
(
private val activityClass: Class
) {
@get:Rule
val scenarioRule = ActivityScenarioRule(activityClass)
protected lateinit var mockDeviceKit: MockDeviceKitInterface
protected lateinit var targetContext: Context
@Before
open fun setUp() {
val instrumentation = InstrumentationRegistry.getInstrumentation()
targetContext = instrumentation.targetContext
mockDeviceKit = MockDeviceKit.getInstance(targetContext)
mockDeviceKit.enable()
grantRuntimePermissions()
}
@After
open fun tearDown() {
mockDeviceKit.disable()
}
private fun grantRuntimePermissions() {
val packageName = targetContext.packageName
val shell = InstrumentationRegistry.getInstrumentation().uiAutomation
shell.executeShellCommand("pm grant $packageName android.permission.BLUETOOTH_CONNECT")
shell.executeShellCommand("pm grant $packageName android.permission.CAMERA")
}
}
```
## Configure camera data for streaming and capture
Mock camera feeds let you test streaming logic without hardware. The examples below assume assets live under `androidTest/assets`.
### Provide a mock video feed
```kotlin
@Test
fun testCameraStreaming() {
val device = mockDeviceKit.pairGlasses(GlassesModel.RAYBAN_META).getOrThrow()
prepareForStreaming(device)
val camera = device.services.camera
camera.setCameraFeed(getAssetUri("test_video.mp4"))
// Assert on streaming state in your UI
}
```
### Provide a captured photo
```kotlin
@Test
fun testPhotoCapture() {
val device = mockDeviceKit.pairGlasses(GlassesModel.RAYBAN_META).getOrThrow()
prepareForStreaming(device)
val camera = device.services.camera
camera.setCapturedImage(getAssetUri("test_image.png"))
// Assert on capture results
}
```
### AI-Assisted Development
## Overview
The Wearables Device Access Toolkit provides three levels of AI assistance for developers:
1. **Git-native tool integrations** — SDK knowledge delivered directly from the DAT GitHub repos through Claude marketplace/plugin installs, Codex plugins, and repo-native tool files.
2. **Live docs lookup** — The shared Wearables MCP server exposes `search_dat_docs` so your AI tool can search current DAT guides while it works. When your MCP client supports response formats, ask for Markdown output so headings, links, and code blocks stay intact.
3. **API reference endpoint** — The full API surface served via [llms.txt](https://llmstxt.org/) as a supplementary reference for on-demand queries.
For implementation work, use the GitHub-hosted DAT plugin or repo-native skills for coding patterns, then use MCP for current docs lookup. The plugin teaches the assistant how DAT projects are structured; MCP keeps the assistant grounded in the latest published guides.
Start by copying one of the prompts below into an AI coding tool. Each prompt includes the GitHub repo, install options, MCP endpoint, MCP tool, and docs links so a fresh AI session knows where to start.
## Git-native tool integrations
The SDK GitHub repos ship the same public DAT guidance in several formats. Each tool gets the same core knowledge — setup guides, streaming patterns, MockDeviceKit testing, session lifecycle, permissions, debugging, and sample app guidance — in whatever format it expects.
| Tool | Public artifact | Recommended setup |
|------|-----------------|-------------------|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | `.claude-plugin/marketplace.json` + plugin manifests | Add the DAT GitHub repo as a marketplace, then install the DAT plugin |
| Codex | `.codex-plugin/plugin.json` inside `plugins/` | Add the DAT GitHub repo as a marketplace, then add the DAT plugin |
| [GitHub Copilot](https://github.com/features/copilot) | `.github/copilot-instructions.md` | Auto-loaded by Copilot in VS Code |
| [Cursor](https://cursor.sh/) | `.cursor/rules/*.mdc` | Auto-loaded with glob-based triggers |
| [AGENTS.md](https://agents.md) | `AGENTS.md` | Portable fallback for tools that read `AGENTS.md` |
See the dedicated setup guides for each tool: [Claude Code](/docs/develop/dat/ai-assisted-claude-code/), [Codex](/docs/develop/dat/ai-assisted-codex), [GitHub Copilot](/docs/develop/dat/ai-assisted-github-copilot/), [Cursor](/docs/develop/dat/ai-assisted-cursor/), [AGENTS.md](/docs/develop/dat/ai-assisted-agents-md/).
### Setup
For Claude Code and Codex, start from the DAT GitHub repo for your platform:
```bash
claude plugin marketplace add facebook/meta-wearables-dat-ios
claude plugin install mwdat-ios@mwdat-ios-marketplace
```
```bash
codex plugin marketplace add facebook/meta-wearables-dat-ios
codex plugin add mwdat-ios@mwdat-ios-marketplace
```
Android uses the same flow with `facebook/meta-wearables-dat-android` and `mwdat-android@mwdat-android-marketplace`.
For tools that use repo-native checked-in files instead of plugin manifests, use:
```bash
./install-skills.sh copilot
./install-skills.sh cursor
./install-skills.sh agents
```
### What the config covers
All surfaces receive the same SDK knowledge, covering:
- **Getting started** — Dependencies, project setup, and first integration
- **Session lifecycle** — Connecting, reconnecting, and managing device sessions
- **Camera streaming** — Resolution selection, frame rates, and photo capture
- **Permissions** — Requesting and handling device permissions
- **MockDeviceKit** — Testing without physical hardware
- **Debugging** — Common issues, Developer Mode, version compatibility
- **Sample app guide** — Building a complete DAT app from scratch
## API reference endpoint (llms.txt)
As a supplement to the GitHub-hosted integrations, the SDK provides an [llms.txt](https://llmstxt.org/) endpoint with the full API surface. The GitHub integrations cover patterns and best practices; the endpoint covers the API reference.
### Endpoints
| Endpoint | Description |
|----------|-------------|
| [wearables.developer.meta.com/llms.txt](https://wearables.developer.meta.com/llms.txt) | Index of available documentation sections with links |
| [wearables.developer.meta.com/llms.txt?full=true](https://wearables.developer.meta.com/llms.txt?full=true) | Full API reference content in a single document |
The index endpoint follows the [llms.txt specification](https://llmstxt.org/) and returns a lightweight listing of documentation sections. The `?full=true` variant returns the complete API reference inline, which is what most AI tools need to write code.
### What's included
The endpoint serves API reference documentation for both iOS (Swift) and Android (Kotlin) platforms, covering:
- `MWDATCore` — App registration, device discovery, session management, and telemetry
- `MWDATCamera` — Camera access, resolution and frame rate selection, and photo capture
- `MWDATMockDevice` — Simulated device for testing without physical hardware
## Tips for effective use
- **Start with the GitHub-hosted integration** — Use the Claude marketplace or Codex plugin when your tool supports it. Use the repo-native file installs for Copilot, Cursor, or `AGENTS.md` readers. This gives the assistant DAT-specific coding patterns, setup flow, and test guidance.
- **Add MCP for live docs lookup** — Add the [DAT MCP server](/docs/develop/dat/ai-assisted-mcp/) and tell your AI tool to use the Wearables MCP endpoint https://mcp.developer.meta.com/wearables to call `search_dat_docs` before choosing SDK APIs. MCP is the live-docs layer; it should complement the GitHub plugin or skills rather than replace them. Request Markdown-formatted results when your MCP client supports response formats.
- **Add the API reference when you need specifics** — If your AI tool can't find a particular method signature or parameter type, point it at the llms.txt endpoint for the full API surface.
- **Be specific in your prompts** — Mention the platform (iOS or Android) and the module you're working with (`MWDATCore`, `MWDATCamera`, or `MWDATMockDevice`).
- **Combine with the guides** — For deeper integration patterns and lifecycle management, point your AI tool at the [integration overview](/docs/develop/dat/build-overview/) and platform-specific integration guides ([iOS](/docs/develop/dat/build-integration-ios/), [Android](/docs/develop/dat/build-integration-android/)).
### Claude Code
## Overview
[Claude Code](https://docs.anthropic.com/en/docs/claude-code) should use the DAT GitHub repository as a plugin marketplace. This keeps Claude on the same git-backed payload that the DAT repos publish, instead of relying on hand-copied `.claude/` files.
Once loaded, Claude Code has full context on the SDK and can help you:
- Set up your project and add DAT SDK dependencies
- Implement camera streaming, session lifecycle, and permissions
- Write tests with Mock Device Kit
- Debug common integration issues
## Setup
Add the DAT repository as a marketplace, then install the platform plugin.
iOS:
```bash
claude plugin marketplace add facebook/meta-wearables-dat-ios
claude plugin install mwdat-ios@mwdat-ios-marketplace
```
Android:
```bash
claude plugin marketplace add facebook/meta-wearables-dat-android
claude plugin install mwdat-android@mwdat-android-marketplace
```
## Usage
Start Claude Code in your project directory:
```bash
claude
```
You can then ask it about any DAT SDK topic, have it implement a specific app functionality, or make it write tests — the DAT plugin is already loaded:
```text
> How do I set up camera streaming in my Android app?
> Write a test for my session lifecycle using MockDeviceKit
```
## Adding the API reference
The DAT plugin covers integration patterns and best practices. To also include the full API reference, paste the llms.txt URL directly into your Claude Code prompt:
```text
> Using https://wearables.developer.meta.com/llms.txt?full=true as reference, what parameters does Stream accept?
```
Or add it to your local project guidance so it loads automatically:
```markdown
## API Reference
Fetch https://wearables.developer.meta.com/llms.txt?full=true for the Wearables Device Access Toolkit API reference.
```
Claude Code will fetch and read the URL contents automatically when you include it in your prompt.
### Codex
## Overview
Codex should use the DAT GitHub repository as a plugin marketplace. This keeps Codex on the same git-backed DAT guidance that is published for Claude Code and other tools, instead of relying on pasted prompt text.
Once loaded, Codex has DAT-specific context and can help you:
- Set up your project and add DAT SDK dependencies
- Implement camera streaming, display, session lifecycle, and permissions
- Write tests with Mock Device Kit
- Debug common integration issues
For the best results, combine the Codex plugin with the [DAT MCP server](/docs/develop/dat/ai-assisted-mcp/). The plugin provides coding patterns from the GitHub repo; MCP provides current published docs through `search_dat_docs`.
## Setup
Add the DAT repository for your platform as a Codex plugin marketplace, then add the platform plugin.
iOS:
```bash
codex plugin marketplace add facebook/meta-wearables-dat-ios
codex plugin add mwdat-ios@mwdat-ios-marketplace
```
Android:
```bash
codex plugin marketplace add facebook/meta-wearables-dat-android
codex plugin add mwdat-android@mwdat-android-marketplace
```
If you already have a checkout of the DAT GitHub repo, add it as a local marketplace from the repo root, then add the same plugin:
```bash
codex plugin marketplace add .
codex plugin add mwdat-ios@mwdat-ios-marketplace
```
Use `mwdat-android@mwdat-android-marketplace` for an Android checkout.
## Adding live docs lookup
The Codex plugin covers integration patterns and best practices. Add the Wearables MCP endpoint when you also want Codex to look up current DAT docs while it works:
```bash
codex mcp add wearables --url https://mcp.developer.meta.com/wearables
```
If you are editing Codex configuration manually, use this URL:
```text
https://mcp.developer.meta.com/wearables
```
After adding the endpoint in your Codex MCP configuration, verify that `search_dat_docs` is available. A running Codex session may not hot-reload newly added MCP servers, so start a fresh Codex session if `codex mcp list` shows `wearables` but the assistant cannot see the tool yet. When Codex calls `search_dat_docs`, ask it to request Markdown-formatted results if the MCP client supports output formats.
Example prompt:
```text
Use the installed DAT Codex plugin for implementation guidance. Then use the Wearables MCP endpoint https://mcp.developer.meta.com/wearables to call search_dat_docs for current iOS camera streaming guidance, with Markdown-formatted results if available. Inspect my project first, make the smallest safe change, and run the relevant local checks.
```
## Usage
Start Codex in your project directory and ask DAT-specific questions directly:
```text
How do I set up camera streaming in my Android app?
Write a test for my session lifecycle using MockDeviceKit.
Implement a DAT display session for iOS and explain the required permission flow.
```
## Adding the API reference
The DAT plugin covers setup and integration guidance. If you need exact API signatures or full reference content, provide the llms.txt URL in your prompt:
```text
Use https://wearables.developer.meta.com/llms.txt?full=true as reference and show the current StreamSession configuration options.
```
Or add it to your local project guidance so it loads automatically:
```markdown
## API Reference
Fetch https://wearables.developer.meta.com/llms.txt?full=true for the Wearables Device Access Toolkit API reference.
```
Codex can use the plugin, MCP docs search, and llms.txt together: plugin for project patterns, MCP for current guides, and llms.txt for exact API reference details.
### GitHub Copilot
## Overview
[GitHub Copilot](https://github.com/features/copilot) auto-loads `.github/copilot-instructions.md` when you open a project in VS Code. The SDK knowledge is available in Copilot Chat immediately.
Copilot also provides inline completions as you write DAT SDK code — the project config gives it enough context to suggest correct API usage, parameter names, and patterns.
## Setup
If you cloned the SDK repo, the `.github/copilot-instructions.md` file is already included. Otherwise, install with the CLI:
```bash
./install-skills.sh copilot
```
Or install remotely:
iOS:
```bash
curl -sL https://raw.githubusercontent.com/facebook/meta-wearables-dat-ios/main/install-skills.sh | bash -s copilot
```
Android:
```bash
curl -sL https://raw.githubusercontent.com/facebook/meta-wearables-dat-android/main/install-skills.sh | bash -s copilot
```
## Usage
Use Copilot Chat to ask SDK questions directly:
```text
How do I request camera permissions in my iOS DAT app?
```
## Adding the API reference
The project-level config covers integration patterns and best practices. To also pull in the full API reference during a chat session, paste the URL directly into your Copilot Chat prompt:
```text
Using https://wearables.developer.meta.com/llms.txt?full=true as reference,
what parameters does MWDATCameraSession.startStreaming accept?
```
Copilot Chat fetches and reads URL contents automatically when you include them in your prompt.
### Cursor
## Overview
[Cursor](https://cursor.sh/) auto-loads `.cursor/rules/*.mdc` files with glob-based triggers. When you're editing a file that matches a rule's glob pattern, Cursor loads the relevant SDK knowledge automatically.
## Setup
If you cloned the SDK repo, the `.cursor/` directory is already included. Otherwise, install with the CLI:
```bash
./install-skills.sh cursor
```
Or install remotely:
iOS:
```bash
curl -sL https://raw.githubusercontent.com/facebook/meta-wearables-dat-ios/main/install-skills.sh | bash -s cursor
```
Android:
```bash
curl -sL https://raw.githubusercontent.com/facebook/meta-wearables-dat-android/main/install-skills.sh | bash -s cursor
```
## Usage
Use Cursor Chat or inline editing to ask SDK questions:
```text
Set up a DAT session with camera streaming and handle lifecycle events.
```
## Adding the API reference
The project-level config covers integration patterns and best practices. To add the full API reference as a persistent documentation source:
1. Open **Settings** > **Features** > **Docs**.
2. Click **Add new doc**.
3. Enter `https://wearables.developer.meta.com/llms.txt?full=true` as the URL.
4. Name it "Wearables Device Access Toolkit".
Once added, reference it in Cursor Chat with `@Docs`, and then select the Wearables Device Access Toolkit entry.
### DAT MCP
## Overview
The Wearables Device Access Toolkit uses the shared public Wearables MCP server for live DAT documentation search. Use it when you want your editor or agent to query current guides and API reference instead of relying only on repo-local config files.
For coding tasks, pair this MCP server with the DAT GitHub plugin or repo-native skills from the iOS or Android DAT repo. The GitHub plugin or skills provide project-specific implementation patterns; MCP provides current documentation lookup while the assistant works.
The server exposes a DAT-specific tool:
- `search_dat_docs` — semantic search over DAT guides, API reference, and code examples
When your client exposes an output or response format option, choose Markdown. Markdown results preserve headings, links, tables, and code blocks, which makes it easier for the assistant to quote the docs accurately before editing code.
The public endpoint is:
```text
https://mcp.developer.meta.com/wearables
```
Use the direct MCP host above. Do not use the Wearables developer site URL as the MCP endpoint.
This server complements the project-level AI config described in the [AI-Assisted Development overview](/docs/develop/dat/ai-assisted/). Use the repo config for coding patterns and setup guidance, and use the MCP endpoint for live DAT docs lookup.
## Claude Code
Add the DAT MCP server with the Claude CLI:
```bash
claude mcp add --transport http wearables https://mcp.developer.meta.com/wearables
```
To check the configuration into your project, use project scope:
```bash
claude mcp add --transport http wearables --scope project https://mcp.developer.meta.com/wearables
```
Verify that Claude Code can see the server:
```bash
claude mcp list
```
Example prompt:
```text
Search the DAT docs for camera streaming setup on Android.
```
## Codex
Add the DAT MCP server with the Codex CLI:
```bash
codex mcp add wearables --url https://mcp.developer.meta.com/wearables
```
Verify that the server is enabled:
```bash
codex mcp list
```
If `codex mcp list` shows `wearables` but the active assistant session cannot call `search_dat_docs`, start a fresh Codex session. Running sessions may not hot-reload newly added MCP servers.
Example prompt:
```text
Use the Wearables MCP endpoint https://mcp.developer.meta.com/wearables to call search_dat_docs for DAT setup guidance. Request Markdown-formatted results if available, then inspect my project before suggesting changes.
```
## Cursor
Add the endpoint as an HTTP MCP server:
1. Open **Settings** and go to **MCP**.
2. Add a new server.
3. Set the name to `wearables`.
4. Set the transport or server type to `HTTP`.
5. Use `https://mcp.developer.meta.com/wearables` as the URL.
If your Cursor build uses JSON-backed MCP settings, the entry should look like this:
```json
{
"mcpServers": {
"wearables": {
"type": "http",
"url": "https://mcp.developer.meta.com/wearables"
}
}
}
```
After saving the config, reconnect the server or restart Cursor. You can then ask Cursor Chat to search the DAT docs through the MCP tool.
## MCP Inspector
Use MCP Inspector for a direct endpoint check:
```bash
npx @modelcontextprotocol/inspector
```
In the browser UI:
1. Set **Transport Type** to `Streamable HTTP`.
2. Set **URL** to `https://mcp.developer.meta.com/wearables`.
3. Set **Connection Type** to `Direct`.
4. Click **Connect**.
Run:
1. Initialize the session.
2. Open **Tools** and click **List Tools**.
3. Confirm that `search_dat_docs` is present.
4. Run `search_dat_docs` with a query such as `camera streaming`, and request Markdown output if your client exposes a format option.
If your Inspector build labels the transport as `HTTP` instead of `Streamable HTTP`, use the HTTP option with the same URL.
## Example queries
These are representative queries we tested against the DAT MCP:
- `How do I stream camera on Ray-Ban Meta glasses?`
Returns the camera streaming guide, including `Session.addStream(...)`, `StreamConfiguration`, valid frame rates, quality levels, and device-side caveats such as hinge-close and doff behavior.
- `How do I initialize the DAT SDK?`
Returns SDK startup and device session details such as `Wearables.initialize(context)`, `WearablesError.NOT_INITIALIZED`, `SessionState`, and the platform-specific session state listeners.
- `How do I test DAT integrations without physical glasses?`
Returns Mock Device Kit guidance, including the `Mock Device Kit` docs, simulated media streaming, and the Android and iOS MDK testing guides.
- `Bluetooth connection lifecycle events`
Returns `SessionState` transition behavior, device availability callbacks such as `devicesMetadata` on Android and `addLinkStateListener` on iOS, and the fact that reopening the hinges restores Bluetooth but does not restart the session.
## Troubleshooting
| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| The server does not connect | The client is still using the old DAT-specific URL or cached config | Re-enter `https://mcp.developer.meta.com/wearables` and reconnect |
| No tools appear | The client did not finish initialization | Reconnect, then run initialize before `tools/list` |
| The client asks for auth | The server was configured with stale custom headers | Remove custom auth headers and reconnect |
| Search results are too broad | The query is too vague | Include the platform, module, or exact API name in the query |
### AGENTS.md
## Overview
[AGENTS.md](https://agents.md) is the DAT SDK fallback path for AI coding agents that do not support the Claude marketplace or the Codex plugin format directly. It provides a universal, tool-agnostic way to give an AI assistant project context.
## What is AGENTS.md?
`AGENTS.md` is a predictable, discoverable file at the repo root that any AI coding agent can find and use. Key properties:
- **Standard Markdown** — no required fields or special syntax
- **Closest file wins** — supports nested files for monorepos
- **Open standard** — stewarded by the Linux Foundation's Agentic AI Foundation
- **Widely supported** — works with Codex, Gemini CLI, Devin, Windsurf, Jules, Cursor, VS Code, Zed, Aider, and others
It's complementary to `README.md`, but where README is for humans, AGENTS.md is for AI agents, providing additional context that might otherwise clutter a README.
For DAT, prefer:
1. Claude marketplace install
2. Codex plugin add
3. `AGENTS.md` only when your tool does not support those native paths
## Which tools support it?
AGENTS.md is supported by a growing ecosystem of AI coding tools, all of which have support for auto-discover:
* OpenAI Codex
* Google Gemini CLI
* Devin
* Windsurf
* Jules
* Cursor
* VS Code (GitHub Copilot)
* Zed
* Aider
## What's included
The Device Access Toolkit SDK's `AGENTS.md` file contains the same knowledge as our other tool configs — SDK architecture, API patterns, setup instructions, testing guides, and debugging tips — but structured for universal agent consumption:
- **Code style** — Architecture, naming conventions, error handling patterns
- **Dev environment tips** — SDK setup, dependency management, initialization
- **Testing instructions** — MockDeviceKit setup and test patterns
- **Building and streaming** — Stream, VideoFrame, photo capture
- **Session management** — Device session states, pause/resume behavior
- **Permissions** — Registration and camera permission flows
- **Debugging** — Common issues, Developer Mode, version compatibility
- **Sample app** — Complete end-to-end integration example
## Setup
### Already included in the repo
Both SDK repositories include `AGENTS.md` at the root:
- [Android](https://github.com/facebook/meta-wearables-dat-android) — `AGENTS.md`
- [iOS](https://github.com/facebook/meta-wearables-dat-ios) — `AGENTS.md`
Once you clone the repo, any supported AI tool will auto-discover it.
### Adding to your own project
Use the installer script when your tool needs `AGENTS.md` specifically:
Android:
```bash
curl -sL https://raw.githubusercontent.com/facebook/meta-wearables-dat-android/main/install-skills.sh | bash -s -- agents
```
iOS:
```bash
curl -sL https://raw.githubusercontent.com/facebook/meta-wearables-dat-ios/main/install-skills.sh | bash -s -- agents
```
Or install another repo-native compatibility file explicitly:
```bash
curl -sL https://raw.githubusercontent.com/facebook/meta-wearables-dat-android/main/install-skills.sh | bash -s -- cursor
```
## Other tool configs
The SDK also includes first-class Claude and Codex plugin payloads plus compatibility config for Copilot and Cursor. See the [AI-Assisted Development overview](/ai-assisted/) for the full list.
### Onboarding and organization management
Wearables Developer Center manages the full lifecycle of wearables integrations,
from development and testing to app sharing. It oversees integration projects,
versions, and release channels. To manage your team and projects effectively,
you need to understand organizational roles and account requirements. This guide
explains how to set up and manage your organization, team, and members.
## One organization per company
**Important:** Each company must have only **one** Managed Meta Account (MMA)
organization in [Admin Center.](https://work.meta.com/admin/work_tools_overview)
**Do not create a new MMA organization if one already exists for your company.**
Check with your IT, engineering lead, or project manager before proceeding.
## Key terms
| Term                           | Definition                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------ |
| **Managed Meta Account (MMA)** | A Meta account managed by an organization admin for secure access and control. |
| **Admin Center**               | A portal for managing IT tasks related to people management and security.      |
| **Organization**               | Represents your company in Admin Center                                        |
| **Team**                       | A group within Wearables Developer Center representing your project team.      |
## Set up your organization and team
### 1. Check for an existing MMA Organization
- **Before you start:** Ask your company's IT, engineering lead, or project
manager if an MMA organization already exists in Admin Center.
### 2. Designate an organization admin
- Only one person (ideally IT, engineering lead, or project manager) should
create the MMA organization for your company.
- This person becomes the MMA organization admin and manages membership for all
contributors. You can change
[admin roles in Admin Center](https://work.meta.com/help/632623761283671) if
needed.
### 3. Create the MMA organization in Admin Center
- The admin should sign up to Wearables Developer Center. During this process
they will be redirected to the MMA setup in
[work.meta.com](https://work.meta.com/).
- Use your company’s official name for the organization.
### 4. Invite developers to the MMA organization
- The admin invites all developers and contributors who need access to Wearables
Developer Center.
- Invited members will receive prompts to create or link their MMA.
- **Note:** Only members of your company’s MMA organization can join your
Wearables Developer Center team.
### 5. Access Wearables Developer Center
- Once your MMA and organization membership are set up, log into Wearables
Developer Center with your MMA credentials.
### 6. Invite team members in Wearables Developer Center
- You will have a default personal team when you first log into Wearables
Developer Center with your MMA account. You can create a new team and/or add
people to your existing team. You don't have to be admin in Admin Center to do
this.
- Only developers in the same MMA organization can join Wearables Developer
Center team.
- Use the **Invite Member** process. If invitees lack an MMA, they will be
prompted to create one and join the organization.
## Get started in Wearables Developer Center
Use Wearables Developer Center to:
- Create and manage AI glasses projects, including device permissions and
connectivity.
- Manage integration versions (Major, Minor, Patch).
- Invite testers to
[release channels](https://wearables.developer.meta.com/docs/set-up-release-channels).
## Invite team members: admin rights
- **If you're an admin in Admin Center:**
- **Option 1:** Set up the new member's MMA first, then invite them via
Wearables Developer Center.
- **Option 2:** Invite directly from Wearables Developer Center; if the person
lacks an MMA, they will receive an email to create one.
- **If you are not an admin:**
- You can only invite people who already have an MMA. Organizational setup
remains the administrator's responsibility.
## Add, remove, or leave a team
**Add a member:**
1. Select your team from the team selector in the header of Wearables
Developer Center.
2. Click **Team** in the left menu.
3. Click **Invite member**.
4. Enter the member's email (must be linked to a Managed Meta account).
5. The invitee receives an invitation email.
**Remove a member:**
1. Select your team from the team selector in the header.
2. Click **Team** in the left menu.
3. Find the member in the **Members** tab and click **Remove member**.
4. Confirm by clicking **Remove**.
**Leave a team:**
1. Select your team from the team selector in the header.
2. Click **Team** in the left menu.
3. Next to your name in the **Members** tab, click **Remove member**.
4. Confirm by clicking **Remove Myself**.
### Manage projects
Once you have
[onboarded](https://wearables.developer.meta.com/docs/onboarding-and-organization-management),
you can create a project or manage existing ones in
[Meta Wearables Developer Center](https://wearables.developer.meta.com/).
## Projects
You can create new projects or manage your existing ones directly in the Wearables Developer Center.
## Create a project
1. Click **New project**.
2. Give your project a name (what you want to call it) and a brief description (what it does).
## Configuration
You can connect your own mobile apps with your Meta wearable device by defining the app details.
1. Click **Configuration** in the project sidebar.
1. Add the requested details for a mobile app you want to integrate with Meta wearable devices.
### Application ID integration
To register your application successfully (without using Developer Mode), you must include the Wearables Application ID in your app’s manifest and pass it in the registration call. Copy and paste the integration details into your iOS or Android application build to complete this step.
If your bundle ID and package name are different for iOS and Android, respectively (e.g., com.myapp.android vs. com.myapp.ios), you will need to create two separate apps — one that defines only the Android platform and another that defines only the iOS platform.
> **Note:** A hyphen `-` is *not* supported for iOS bundle IDs.
## Product listing
**App name and icon**
- You need to provide your app's name and an icon.
- The icon must be in PNG or JPEG format.
- Separate icons for dark and light mode are supported.
- The maximum supported dimensions for the icon are 200x200 pixels.
These details will also be visible to other users in the Meta AI app when they
[adjust permissions](https://wearables.developer.meta.com/docs/set-up-release-channels#manage-permissions-for-connected-apps).
## Permissions
If your app or project needs access to device functionality like the camera or microphone, you must provide a justification in the **Permissions** tab. This justification is for Meta's internal review only and is not shown to end-users. Reviewers use your explanation to determine if the permission is necessary and appropriate for your app's functionality.
> **Note:** Available permissions include camera, microphone, and voice invocation. New device capabilities may be added in future iterations.
## Distribute
When you’re ready for people to try your project, you need to
[set up release channels](https://wearables.developer.meta.com/docs/set-up-release-channels).
Device Access Toolkit v0.7 and later automatically generate a corresponding Device Access Toolkit application for each new version. Builds usually complete within 10 minutes, but may take up to 30 minutes. Use a version with a release channel only after its Device Access Toolkit app finishes building. Monitor build status in the Distribution dashboard:
- **N/A:** Version is missing build artifact.
- **In Progress:** Device Access Toolkit application is still building.
- **Ready:** Device Access Toolkit application is ready to distribute.
- **Failed:** Device Access Toolkit application build failed.
Builds rarely fail. Create a new version to resolve build failures.
> **Note:** Existing projects created before SDK v0.7 must publish a new
> version if build status is not shown as 'Ready', even if no other project details have changed.
## Remove a project
When you no longer need a project, you can remove it from the Meta Wearables Developer Center. Removed projects are kept for a recovery period before they are permanently deleted, so you can restore a project if you change your mind during this time.
### Before you remove a project
Before you can remove a project, make sure it has no active version on the production release channel. If a version is currently distributed on the production channel, remove that version from the channel first. See [Manage versions and release channels](https://wearables.developer.meta.com/docs/set-up-release-channels) for details.
> **Note:** Users who have already connected to your application will still have access until they manually disconnect their device.
### Remove a project
1. Open your project from the dashboard.
2. Go to **Overview** and click **Remove project**.
3. To confirm, type the project name exactly as it's shown.
4. Click **Remove**.
After you remove a project, it no longer appears in your active projects list. You can find it under the **Deleted projects** view from your organization dashboard.
### Recovery window
Removed projects are kept for **180 days**. During this period, you can restore the project and return it to development mode. After 180 days, the project and its configuration are permanently deleted and can no longer be recovered.
### Restore a removed project
1. From your organization dashboard, open the **Deleted projects** view.
2. Locate the project you want to restore.
3. Click **Restore**.
The restored project returns to development mode. You can continue editing its configuration, create new versions, and assign them to release channels as usual. Production release channels and previously distributed versions are not automatically re-published; review your distribution setup before sharing the project with testers again.
### Manage versions and release channels in Meta Wearables Developer Center
Effectively manage how you distribute and test Meta integrations by setting up versions and release channels in the Meta Wearables Developer Center. This guide walks you through best practices and step-by-step instructions to help you roll out updates, gather meaningful feedback, test features safely, and maintain integration quality.
## Understand versions
Wearables Developer Center uses a versioning system that helps track changes and maintain stability across your integrations. Each version details product specifics, including the name, icon, and any edits to permission requests or app configuration.
After you add and save these details you can find them by going to **Distribute > Version details > Project data**.
When you change any of these details, you need to create a new version of the integration so you can distribute it to testers on a release channel.
When selecting the version to use, the type of change you are making determines the category you should choose:
- **Major (e.g., 2.3.4 to 3.0.0):** Choose this for significant changes or API revisions that are not guaranteed to maintain compatibility with previous versions. For example, select a major version if you change core app functionality in a way that breaks existing features.
- **Minor (e.g., 2.3.4 to 2.4.0):** Select a minor version when introducing new features while still maintaining backwards compatibility. For example, if you add a new button or feature.
- **Patch (e.g., 2.3.4 to 2.3.5):** Use a patch version for fixing bugs or delivering minor improvements that do not break compatibility, such as correcting a typo or a small bug fix.
## Create versions
To create a new version of your integration:
1. Log in to the [Meta Wearables Developer Center](https://wearables.developer.meta.com/).
2. Select your project from the dashboard.
3. Go to the **Distribute** menu and choose **Versions**.
4. Click **Create new version**.
5. Select your version type (**Major, Minor, or Patch**).
6. Click **Create version**.
## About release channels
Release channels let you control distribution of your versions. By creating and assigning versions to specific channels, you determine which user groups access each version. Each channel supports only one version at a time, but you can attach the same version to multiple channels if needed.
### Release channel options
- **Invite-only channels:** Useful for alpha/beta testing. All release channels for Device Access Toolkit are currently invite-only.
- **User invitations by email:** You can only invite testers who have [Meta accounts](https://developers.meta.com/horizon/blog/introducing-meta-accounts-what-developers-need-to-know/). Make sure to add the email associated with the tester’s Meta account when prompted to invite testers.
- **Tester autonomy:** Testers may accept or decline invitations and can remove themselves at any time.
- **Developer control:** You can revoke tester access at any point. You can also reinvite users you have previously revoked.
- **Limitations:** The maximum number of release channels per integration and users per channel are configured per app. Check your project's distribution page for current limits.
## Create a release channel
To set up a new release channel:
1. In the **Distribute** menu, select the **Release channels** tab (next to **Versions**).
2. Click **Create a release channel**.
3. Enter a unique **Name** and a clear **Description** for your channel. Click **Next**.
4. Select the **Version** you wish to distribute. You can update this selection whenever needed. Click **Next**.
5. Enter the email addresses of the testers you wish to invite.
**Note:** These must be emails for already existing Meta Accounts (this is different from a Managed Meta Account). If the tester needs a Meta Account, they can [create one here](https://auth.meta.com/).
6. Click **Next**.
7. Review your selections, then click **Create release channel** to confirm. If you do not confirm by clicking this button, users will not receive the invitation.
## Manage test user access
Testers can belong to multiple release channels for one integration, such as for regression or parallel testing. Each invited tester must accept the email invitation to join a test group. Developers can remove testers, and testers can leave at any time.
**Note:** Release channels control a user's ability to register an app integration. Removing a user from a channel after they've registered will not unregister the connected app for Meta AI and the wearable device.
To view release channel details and manage test users, click **Edit** next to the channel. From here, you can also change the distributed version.
Test users can view the integrations they are testing at: [https://wearables.meta.com/invites](https://wearables.meta.com/invites)
## Manage permissions and switch release channels in the Meta AI app
People testing your integration can manage app permissions and switch release channels for your devices and connected apps in the Meta AI app. These settings help you control what your connected apps can access and allow you to try new features by joining different release channels.
## Manage permissions for connected apps
As a test user, managing permissions lets you control what each integration can access on your device.
To manage permissions:
1. Open the Meta AI App.
2. Go to the device menu and tap **Settings**.
3. Select **Connected Apps** to see a list of all apps linked to your Meta AI account.
4. Tap on an app to view its permissions.
5. Adjust specific permissions, e.g., for the camera:
- You may see options like:
- Always allow
- Always ask
- Don’t allow
6. Click **Confirm** to save your changes.
**Note:** Changes made to these settings will apply to all devices connected to your Meta AI app.
## Switch release channel
Release channels let testers choose between different versions of your integration.
### To switch release channel
1. Open the Meta AI App.
2. Go to the device menu and tap **Settings**.
3. Tap **Release Channel** to see available options.
4. Select your preferred channel.
- If there are multiple channels, you can pick the one you want.
- If only one is available, it will be selected by default.
5. Click **Confirm** to save your changes.
![switch release channel](/images/switch-release-channel.gif)
Learn [How to disconnect apps from AI glasses](https://www.meta.com/help/ai-glasses/836668612353969/).
### Access your Meta Wearables Device Access Toolkit information
You can request a copy of your information related to Wearables Device Access Toolkit integrations. You will get a file containing your profile information and other data.
### Telemetry
## Overview
This page describes the telemetry data that the Device Access Toolkit SDK collects from Android and iOS apps that integrate with Meta AI glasses.
The SDK collects operational and diagnostic telemetry (for example, device discovery, registration flows, streaming session lifecycle, permission checks, attestation, and performance markers) to support reliability, performance monitoring, troubleshooting, and product improvement. In turn, telemetry helps Meta identify issues, measure SDK health, and improve the developer experience.
Some of the data collected includes:
* Device identifiers
* Firmware versions
* Session durations
* Error types
* Success/failure flags
**Supported devices for telemetry:** Ray-Ban Meta glasses, Oakley Meta HSTN, Oakley Meta Vanguard, and Meta Ray-Ban Display (MRBD).
## Opt Out
Telemetry collection is enabled by default, but you can disable it at the app level.
### Android
Add the following to your `AndroidManifest.xml` inside `
`:
```xml
```
### iOS
Add the following to your `Info.plist`:
```xml
MWDAT
Analytics
OptOut
```
## Data Categories
We collect the following categories of telemetry data via the SDK:
### Application and SDK identification
Identifies which third-party app and SDK version generated an event, enabling usage attribution and version-specific issue diagnosis:
**Examples:**
* App bundle ID / package name, app name, and app version
* Public-key SHA-256
* App session UUID and session start time, which resets on each app start
* SDK version (for example, `0.7.0`)
### Device and platform context
Describes the phone and glasses involved in an interaction.
**Examples:**
* Phone OS, OS version, and device model
* Glasses device identifier, device type (for example, `RAYBAN_META`)
* Glasses SoC firmware build version
* Platform and link mode (`dynamic`, `static`, or `mixed`)
### Registration and authentication
Tracks the one-time app linking flow between your app and the Meta AI app.
**Examples:**
* Registration step (for example, `started`, `completed`, `failed`)
* App linking flow ID (UUID for end-to-end correlation)
* Attestation session ID and event type
### Permissions
Records when your app checks or requests device capabilities through the Meta AI app.
**Examples:**
* Permission name (for example, `CAMERA`, `MICROPHONE`) and whether it is granted
* Success or failure of the permission check/request API, with error details if applicable
* For bulk queries, a map of permission names to consent states
### Session lifecycle
Measures the connection lifecycle between your app and the glasses. A session represents a sustained period of access to device sensors or outputs.
**Examples:**
* Session state transitions: `starting`, `started`, `paused`, `stopping`, `stopped`
* Previous session state
* Error details if a transition fails
### Camera streaming
Captures usage and quality signals for video and photo streaming.
**Examples:**
* Stream event type (prepare started/completed, start, stop, error)
* Configuration: video codec, audio codec, resolution tier (`LOW` 360×640, `MEDIUM` 504×896, `HIGH` 720×1280), frame delivery method
* Duration in seconds
### Display content delivery
For glasses with display capabilities (Meta Ray-Ban Display glasses), logs display session usage.
**Examples:**
* Display event type (start, stop, send content, video playback states)
* Display session ID and duration
* Video source type, video codec, payload size in bytes
* Video transfer duration in milliseconds
### Device discovery
Tracks glasses availability from the SDK's perspective.
**Examples:**
* Event type (`device_discovered`, `device_forgotten`, `error`)
* Device identifier
* Error details if applicable
### Error reporting and diagnostics
Supports stability monitoring and crash triage.
**Examples:**
* Structured error name, description, and type category
* Crash grouping hash, crash type (signal or exception class)
* Breadcrumbs (last N analytics event names before the crash)
### Developer testing with Mock Device Kit
When you use Mock Device Kit to test without physical hardware, separate events are logged.
**Examples:**
* Mock device event type, mock device ID, device type code
* Mock service event type, service ID, success/error details
### Known issues
## Wearables Device Access Toolkit
| Issue | Workaround |
| --- | --- |
|Device Access Toolkit Wearables App installation fails if the device battery is below 10%.|Charge your glasses until the battery level exceeds 10%, then try again.|
|Device Access Toolkit Wearables App installation may fail intermittently while setting or resetting device connections.|No current fix available. Future versions of Meta AI and Glasses firmware will include a more robust installation process.|
|Android SDK crashes intermittently when multiple captures are taken in quick succession on long-running streams (>1 min).|Close the device session and start a new one.|
|Android Device Access Toolkit Wearables App transfer may fail silently if Wi-Fi is off.|Enable Wi-Fi and try again.|
## Wearables Developer Center
| Issue | Workaround |
| --- | --- |
|Beta testing: Distribution functionality requires minimum firmware v125| Update glasses firmware to v125 or higher. |
|Beta testing: Device Access Toolkit doesn’t currently allow for an application to have both a unique package name and a different bundle ID.|In the Wearables Developer Center, developers should set up individual applications for the iOS and Android platforms.|
|Beta testing: Device Access Toolkit currently doesn't support the '-'  dash character in the iOS Bundle ID.|Don't use this character in the Bundle ID.|
|Beta testing: For v272, if the Meta AI app is connected to multiple devices, registering an app will install the Device Access Toolkit Wearables App only on one device.|All other devices will require manual installation of the DAT Wearables App from the Meta AI app.|
|Beta testing: New versions on Wearables Developer Center may not be compatible with apps that are not using the latest SDK and have the Device Access Toolkit Wearables App enabled.|Update your application to use the latest SDK.|
|Beta testing: If your application is using the latest SDK and has the Device Access Toolkit Wearables App enabled it may not be compatible with old versions on Wearables Developer Center.|Create a new version on Wearables Developer Center and push to beta testers via a Release Channel.|
|Email addresses of members invited to a release channel must already be associated with a Meta account. | Verify anyone you invite to a release channel has set up a Meta account at [meta.ai](https://www.meta.ai/). |
|Users logged into [developers.meta.com](https://developers.meta.com/) (Meta Horizon) may face an error with links from the Wearables Developer Center because it uses a different domain ([developer.meta.com](https://developer.meta.com/)). | Logout from [developers.meta.com](https://developers.meta.com/) before signing up for the Wearables Developer Center. |
### Version Dependencies
## Overview
This page outlines the supported versions of the Meta AI app and glasses firmware for each release of the Meta Wearables Device Access Toolkit.
## 0.8.0
| App/Firmware | Support |
| --- | --- |
| Meta AI app (Android) | V272 |
| Meta AI app (iOS) | V272 |
| Ray-Ban Meta glasses | V127 |
| Meta Ray-Ban Display glasses | V127 |
| Oakley Meta HSTN glasses | V127 |
| Oakley Meta Vanguard glasses | V127 |
## 0.7.0
| App/Firmware | Support |
| --- | --- |
| Meta AI app (Android) | V272 |
| Meta AI app (iOS) | V272 |
| Ray-Ban Meta glasses | V125 |
| Meta Ray-Ban Display glasses | V125 |
| Oakley Meta HSTN glasses | V125 |
| Oakley Meta Vanguard glasses | V125 |
## 0.6.0
| App/Firmware | Support |
| --- | --- |
| Meta AI app (Android) | V254 |
| Meta AI app (iOS) | V254 |
| Ray-Ban Meta glasses | V22 |
| Meta Ray-Ban Display glasses | V21 |
| Oakley Meta HSTN glasses | V22 |
| Oakley Meta Vanguard glasses | V22 |
## 0.5.0
| App/Firmware | Support |
| --- | --- |
| Meta AI app (Android) | V254 |
| Meta AI app (iOS) | V254 |
| Ray-Ban Meta glasses | V22 |
| Meta Ray-Ban Display glasses | V21 |
| Oakley Meta HSTN glasses | V22 |
| Oakley Meta Vanguard glasses | V22 |
## 0.4.0
| App/Firmware | Support |
| --- | --- |
| Meta AI app (Android) | V254 |
| Meta AI app (iOS) | V254 |
| Ray-Ban Meta glasses | V20 |
| Meta Ray-Ban Display glasses | V21 |
| Oakley Meta HSTN glasses | V20 |
| Oakley Meta Vanguard glasses | V22 |
## 0.3.0
| App/Firmware | Support |
| --- | --- |
| Meta AI app (Android) | V249 |
| Meta AI app (iOS) | V249 |
| Ray-Ban Meta glasses | V20 |
| Oakley Meta HSTN glasses | V20 |
## Section 2: Android API Reference
### StreamConfiguration
Configuration for a media streaming session with a Meta Wearables device. Defines the video quali...
### VideoFrame
Represents a single frame of video data from a Meta Wearables device. Contains the raw video buff...
### AutoDeviceSelector
A device selector that automatically selects an optimal device from the provided device set. Uses...
### DeviceSelectorBase
Abstract base class for [DeviceSelector](com_meta_wearable_dat_core_selectors_deviceselector) imp...
### SpecificDeviceSelector
A device selector that always selects a specific, predetermined device. Use this when you want to...
### DeviceSession
Manages a session with a Meta Wearables device. Sessions are created via Wearables.createSession ...
### DatException
Base exception class for the DAT (Device Access Toolkit) SDK.
### DatResult
A specialized Result wrapper for DAT SDK operations that provides type-safe error handling while ...
### Device
Contains metadata information about a Meta Wearables device.
### DeviceIdentifier
A unique identifier for a Meta Wearables device. This identifier is used to distinguish between d...
### DeviceState
Observable state of a connected device.
### WearablesException
Base exception class for the DAT (Device Access Toolkit) SDK.
### DisplayConfiguration
Configuration for a display capability on a Meta Wearables device.
### VideoSource
Represents the source of video data for a [VideoPlayer](com_meta_wearable_dat_display_views_video...
### ContentScope
Scope for building the root display content sent to a wearable device.
### FlexBoxScope
Scope for building children inside a FlexBox layout.
### VideoPlayer
Controls video playback on a wearable display.
### VideoScope
Configuration scope for video content within [ContentScope.video](com_meta_wearable_dat_display_v...
### MockDeviceKitConfig
Configuration for MockDeviceKit behavior.
### MockDeviceKit
Main entry point for managing simulated Meta Wearables devices.
### StreamError (enum)
Represents all possible stream error types that can occur during camera streaming operations.
### StreamState (enum)
Represents the current state of a media streaming session with a Meta Wearables device.
### VideoQuality (enum)
Defines the quality levels available for video streaming from Meta Wearables devices. Higher qual...
### DeviceSessionState (enum)
Represents the current state of a Meta Wearables device session.
### DeviceCompatibility (enum)
Indicates the compatibility status between AI glasses and the Wearables Device Access Toolkit.
### DeviceSessionError (enum)
Enum representing errors that can occur during session lifecycle operations in the DAT SDK.
### DeviceType (enum)
Represents the types of Meta Wearables devices supported by the Wearables Device Access Toolkit.
### LinkState (enum)
### NavigationError (enum)
Enum representing errors that can occur when navigating to a screen in the Meta AI companion app.
### Permission (enum)
Represents the types of permissions that can be requested from Meta Wearables devices.
### PermissionError (enum)
Represents the specific types of errors that can occur during permission operations with Meta Wea...
### RegistrationError (enum)
Enum representing errors that can occur during the Meta Wearables registration process.
### RegistrationState (enum)
### ThermalLevel (enum)
Thermal level reported by the device.
### WearablesError (enum)
Enum representing errors that can occur in the Wearables Device Access Toolkit.
### DisplayError (enum)
Errors that can occur during display operations on a wearable device.
### DisplayState (enum)
Represents the current lifecycle state of a display on a Meta Wearables device.
### VideoCodec (enum)
Video codec format for streaming video data to the wearable device.
### VideoPlayerError (enum)
Errors that can occur during [VideoPlayer](com_meta_wearable_dat_display_views_videoplayer) opera...
### VideoPlayerState (enum)
Lifecycle state of a [VideoPlayer](com_meta_wearable_dat_display_views_videoplayer).
### Alignment (enum)
Alignment options for positioning children within a FlexBox layout.
### ButtonStyle (enum)
Visual style presets for button components on the wearable display.
### CornerRadius (enum)
Corner radius presets for image components displayed on the wearable.
### Direction (enum)
Layout direction for FlexBox-backed layout components.
### FlexBoxBackground (enum)
Background options for FlexBox layouts.
### IconName (enum)
Supported icon names for display.
### IconStyle (enum)
Visual style for icon components on the wearable display.
### ImageSize (enum)
Size presets for image components displayed on the wearable.
### TextColor (enum)
Color presets for text components on the wearable display.
### TextStyle (enum)
Typography style presets for text components on the wearable display.
### CameraFacing (enum)
Specifies which phone camera to use as the mock device camera source.
### GlassesModel (enum)
Available glasses models that MockDeviceKit can simulate.
## Section 3: iOS Swift API Reference
### CaptureError (enum)
### PhotoCaptureFormat (enum)
Supported formats for capturing photos from Meta Wearables devices.
### PhotoData
A photo captured from a Meta Wearables device.
### Stream
A class for managing media streaming capabilities with Meta Wearables devices. Handles video stre...
### StreamConfiguration
Configuration for a media streaming session with a Meta Wearables device. Defines video codec, re...
### StreamError (enum)
Errors that can occur during streaming sessions.
### StreamingResolution (enum)
Valid Live Streaming resolutions. We are using 9:16 aspect ratio.
### StreamState (enum)
Represents the current state of a media streaming session with a Meta Wearables device.
### VideoCodec (enum)
Specifies the video codec to use for streaming.
### VideoFrame
Represents a single frame of video data from a Meta Wearables device. Contains the raw video samp...
### VideoFrameSize
Represents the width and height of a video frame in pixels.
### Announcer
A protocol for objects that can announce events to registered listeners.
### AnyListenerToken
A token that can be used to cancel a listener subscription. When the token is no longer reference...
### AutoDeviceSelector
A device selector that automatically selects the best available device. Selects the first connect...
### CapabilityState (enum)
Represents the state of a capability attached to a [DeviceSession](/reference/ios_swift/dat/0.8/m...
### Compatibility (enum)
Indicates the compatibility status between AI glasses and the Wearables Device Access Toolkit.
### DatError
Base protocol for all DAT SDK error types.
### Device
AI glasses accessible through the Wearables Device Access Toolkit.
### DeviceSelector
Protocol for selecting which device should be used for operations. Device selectors determine whi...
### DeviceSession
A session representing a connection to a specific wearable device.
### DeviceSessionError (enum)
Errors that can occur during [DeviceSession](/reference/ios_swift/dat/0.8/mwdatcore_devicesession...
### DeviceSessionState (enum)
Represents the current state of a [DeviceSession](/reference/ios_swift/dat/0.8/mwdatcore_devicese...
### DeviceState
Represents the current state of a connected device.
### DeviceType (enum)
Represents the types of Meta Wearables devices supported by the Wearables Device Access Toolkit.
### LinkState (enum)
Represents the connection state between a device and the Wearables Device Access Toolkit.
### Mutex
### NavigationError (enum)
Errors that can occur when navigating to a screen in the Meta AI companion app.
### Permission (enum)
Represents the types of permissions that can be requested from AI glasses.
### PermissionError (enum)
Errors that can occur during permission requests.
### PermissionStatus (enum)
Represents the status of a permission request.
### RegistrationError (enum)
Error conditions that can occur during the registration process.
### RegistrationState (enum)
Represents the current state of user registration with the Meta Wearables platform.
### SessionState (enum)
Represents the current state of a device session in the Wearables Device Access Toolkit.
### SpecificDeviceSelector
A device selector that always selects a specific, predetermined device. Use this when you want to...
### ThermalLevel (enum)
Represents the thermal level reported by the connected device.
### UnregistrationError (enum)
Error conditions that can occur during the unregistration process.
### Wearables (enum)
The entry point for configuring and accessing the Wearables Device Access Toolkit.
### WearablesError (enum)
Errors that can occur during Device Access Toolkit configuration.
### WearablesHandleURLError (enum)
Errors that can occur during URL handling.
### WearablesInterface
The primary interface for Wearables Device Access Toolkit.
### Alignment (enum)
Alignment options for positioning children within a [FlexBox](/reference/ios_swift/dat/0.8/mwdatd...
### Background (enum)
Background-style options for [FlexBox](/reference/ios_swift/dat/0.8/mwdatdisplay_flexbox).
### Button
A tappable button component displayed on the wearable.
### ButtonStyle (enum)
Visual style presets for button components on the wearable display.
### ComponentBuilder
A result builder for composing view components inside a [FlexBox](/reference/ios_swift/dat/0.8/mw...
### CornerRadius (enum)
Corner radius presets for image components on the wearable display.
### Direction (enum)
Layout direction for [FlexBox](/reference/ios_swift/dat/0.8/mwdatdisplay_flexbox) and container c...
### Display
Manages rendering content on a Meta Wearables display.
### DisplayableView
A protocol for views that can be displayed on glasses.
### DisplayError (enum)
Errors that can occur during display operations such as [Display.send(_:)](/reference/ios_swift/d...
### DisplayState (enum)
The current lifecycle state of a [Display](/reference/ios_swift/dat/0.8/mwdatdisplay_display).
### Edge
A set of edges for padding modifiers.
### EdgeInsets
Edge inset values for padding, in density-independent pixels (dp).
### FlexBox
A flex layout container that arranges children along a configurable axis.
### Icon
An icon component displayed on the wearable.
### IconName (enum)
Supported icon names for display.
### IconStyle (enum)
Visual style for icon components on the wearable display.
### Image
An image component loaded from a URI and displayed on the wearable.
### ImageSize (enum)
Size presets for image components on the wearable display.
### Text
A text component displayed on the wearable.
### TextColor (enum)
Color presets for text components on the wearable display.
### TextStyle (enum)
Typography style presets for text components on the wearable display.
### VideoError (enum)
Errors that occur during video playback via [VideoPlayer](/reference/ios_swift/dat/0.8/mwdatdispl...
### VideoPlayer
A video player configuration to be sent to the glasses via [Display.send(_:)](/reference/ios_swif...
### ViewComponent
A protocol for components that can be arranged inside a [FlexBox](/reference/ios_swift/dat/0.8/mw...
### CameraFacing (enum)
The camera to use for live streaming from the phone.
### GlassesModel (enum)
Identifies a glasses model for use with [MockDeviceKitInterface.pairGlasses(model:)](/reference/i...
### MockCameraKit
A suite for mocking camera functionality.
### MockCaptouchKit
Public interface for simulating captouch gestures on a mock device.
### MockDevice
### MockDeviceKit (enum)
The entry-point to the MockDeviceKit for managing simulated Meta Wearables devices. Use this in t...
### MockDeviceKitConfig
Configuration options for MockDeviceKit.
### MockDeviceKitError (enum)
Errors thrown by MockDeviceKit.
### MockDeviceKitInterface
Interface for managing mock Meta Wearables devices for testing and development.
### MockGlasses
Protocol for simulating smart glasses behavior in testing and development. Provides functionality...
### MockGlassesServices
Container for accessing mock device service kits.
### MockPermissions
Interface for configuring mock permission behavior during testing.
### MockDeviceTestClient
Client for communicating with the MockDeviceKit test server from XCUITest processes.
# WebApps SDK
> WebApps SDK for Meta Ray-Ban Display MRBD only, not other Ray-Ban models. HTML CSS JavaScript hosted over HTTPS with 600 by 600 fixed viewport additive waveguide display where dark backgrounds render transparent and light colors opaque, no scrolling overflow hidden, focus ring styling with 88px minimum interactive target. Input via Neural Band wristband or temple capacitive swipe translating to ArrowUp ArrowDown ArrowLeft ArrowRight Enter Escape keyboard events, no mouse touch or physical keyboard. No camera access, no microphone access, no text input, no offline support, no notifications, no back navigation yet. Supports DeviceMotionEvent accelerometer gyroscope, DeviceOrientationEvent heading tilt roll requiring user gesture permission, navigator.geolocation from paired phone with 5 to 50 meter accuracy, localStorage sessionStorage up to 5 MB each, PNG icons via link rel icon or web manifest start_url scope display standalone, SVG not supported. AI coding plugin available at github.com/facebookincubator/meta-wearables-webapp for Claude Code Cursor Copilot Codex with skills for Vercel deploy, MCP server at https://mcp.developer.meta.com/wearables provides search_webapps_docs tool. Requires Meta AI app developer mode enabled via tapping app version five times, HTTPS hosting on Vercel Netlify GitHub Pages Replit Lovable or similar, minimum glasses software v125 and Meta AI app v272. Skip this entire section if task mentions Android Kotlin, iOS Swift, DAT SDK, MWDATCore, MWDATCamera, MWDATDisplay, DeviceManager, SessionManager, native API reference, Bluetooth session, camera photo video streaming, microphone HFP audio, speaker playback, Mock Device Kit, Ray-Ban Meta Gen1 Gen2 Optics, or native mobile integration.
## Section 1: WebApps Guides
### Setup
## Overview
Setting up to build Web Apps for Meta Ray-Ban Display glasses (MRBD) takes three steps:
1. **Check your hardware.** Confirm your glasses, paired phone, and (optionally) Meta Neural Band meet the minimum requirements.
2. **Check your Meta AI app and enable Developer Mode.** Verify the app version on your phone, then put the app into Developer Mode so it can load Web Apps onto the glasses.
3. **Prepare to host your Web App.** Pick a hosting platform that serves your app over HTTPS so the glasses can load it.
## Requirements
### Hardware
Web Apps are supported only on Meta Ray-Ban Display (MRBD) glasses. Meta Neural Band is optional, though recommended for an optimal experience.
### Software
Download the Meta AI app from the [App Store (iOS)](https://apps.apple.com/us/app/meta-ai-assistant-glasses/id1558240027) or [Play Store (Android)](https://play.google.com/store/apps/details?id=com.facebook.stella) if you haven't done so already.
For the best experience, always update your glasses and Meta Neural Band with the latest software updates.
**Glasses**
The minimum glasses software version is `v125`+. To verify the glasses software version:
1. In the Meta AI app, tap **Devices** (the glasses icon), and select your device.
2. Tap the gear icon to open **Device settings**.
3. Tap **General** > **About** > **Release Version**.
4. Check for glasses software updates if your version is below `v125`.
**Meta AI App**
The minimum Meta AI app version is `v272`+. To verify Meta AI app version:
1. Open the **Meta AI app**.
2. Tap **Settings** > **App Info**.
3. Note the **App version** number. If it's older than `v272`, update the Meta AI app from the App Store (iOS) or Play Store (Android).
## Enabling Developer Mode in the Meta AI app
Developer Mode in the Meta AI app unlocks the menu options used to load and reload Web Apps on MRBD.
1. Open the Meta AI app on your paired iOS or Android device.
2. Select **Settings** > **App Info**, and then tap the **App version** number five times to display a pop-up that enables Developer Mode.
3. Click **Enable** to confirm.
**Note:** Developer Mode persists across sessions, so you don't need to re-enable it each time you open the Meta AI app.
## Hosting your Web App
Your Web App must be hosted on a publicly accessible HTTPS URL so MRBD can load it.
Common options include: Replit, Lovable, Vercel, GitHub Pages, Netlify, Cloudflare Pages, or any static site host that serves over HTTPS. You can also host from your own server, as long as it serves the app over HTTPS with a valid TLS certificate.
While it's possible to point MRBD at any website, most sites are not configured to work well within the platform's display and input constraints. See the [Build guide](/docs/develop/webapps/build/) for the design and runtime constraints to keep in mind.
**Note:**
* HTTP-only URLs are not supported. The glasses runtime requires HTTPS for every Web App URL it loads.
* Our [AI Coding plugin](https://github.com/facebookincubator/meta-wearables-webapp) includes skills that will help you deploy to Vercel.
### Build
## Overview
Web Apps for Meta Ray-Ban Display (MRBD) use standard web APIs. The easiest way to build Web Apps is using AI coding tools.
Learn how to build optimized Meta Ray-Ban Display Web Apps by understanding:
* How to Build with AI
* Capabilities and Best Practices
* Display
* Input
* Sensors
* Location
* Local Storage
* App Icons
## HTML metadata
Add the following metadata to the `
` of your HTML file. This allows your web app to support upcoming discovery surfaces and enables us to message users when a website isn't compatible with MRBD.
```html
```
## Capabilities
### Summary
Below are the currently supported capabilities for Web Apps.
| Capability | Description and guidance |
| ---------- | ------------------------ |
| Display | Additive waveguide overlay. Use dark backgrounds/light, high-contrast UI colors. Fixed 600x600px viewport. Avoid scrolling. |
| Input | Navigation via Neural Band/captouch gestures translates to standard arrow key and Enter events. No mouse/touch/keyboard. All elements must be focusable. |
| Sensors (IMU) | Standard `DeviceMotionEvent` (accelerometer, gyroscope) and `DeviceOrientationEvent` (heading, tilt, roll) W3C APIs. Requires user permission. |
| Location (GPS) | Standard `navigator.geolocation` W3C API. Location is fetched from the paired mobile device. Requires user permission. |
| Local Storage | Standard Web Storage APIs (`localStorage`, `sessionStorage`). Best for lightweight data (preferences, small caches). Use JSON for structured data. |
| App Icons | Use Unicode symbols or high-resolution PNG favicons (>= 52x52 px) via `
` tags or Web App Manifest. SVGs are not supported. |
**Unsupported Capabilities:** Web Apps do **not** yet support:
* Camera
* Microphone
* Text Input
* Offline Support
* Notifications
* Back Navigation
Also, there is no continuous cursor support for Web Apps.
### Display
The display is an additive waveguide that overlays rendered pixels onto the wearer's real-world view. This has a direct impact on how your app looks.
* A pixel rendered as pure black is fully transparent, since it contributes zero light.
* Bright, vivid colors are the most visible, because they add light on top of the real-world scene.
#### Color and typography
Because the display is additive, color choices matter more than on a conventional screen:
* Use dark backgrounds, since they effectively disappear. Bright backgrounds cause glare and reduce readability.
* Use light, high-contrast colors for UI elements like text and interactive components. Also, use bright colors for accents.
* Use large, readable fonts: a minimum of 16 px for body text and 20-24 px for primary content.
#### Viewport
All content should render within a fixed 600 x 600 pixel viewport and avoid scrolling.
Include the following viewport `meta` tag to lock the scale and prevent unexpected zooming:
```html
```
Set `overflow: hidden` on the `
` element to ensure no content extends beyond the viewport boundary:
```css
body {
width: 600px;
height: 600px;
overflow: hidden;
}
```
### Input: Neural band and captouch gesture
MRBD UI navigation is driven by two input mechanisms: the Neural Band and a touch strip on the glasses temple arm that senses swipe gestures. They produce directional and selection inputs that the glasses OS translates into standard arrow key (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) and `Enter` events delivered to your Web App.
**Note:** Since there is no mouse, touch screen, or physical keyboard, every interactive element of your Web App must be reached and activated by these gestures.
**JavaScript**
```javascript
// — Input Constants —
const DPAD = {
UP: 'ArrowUp', DOWN: 'ArrowDown',
LEFT: 'ArrowLeft', RIGHT: 'ArrowRight',
SELECT: 'Enter', BACK: 'Escape',
};
// — Focus Management —
function moveFocus(direction) {
var focusables = Array.from(
document.querySelectorAll('.focusable:not([disabled]):not(.hidden)')
);
if (!focusables.length) return;
var idx = focusables.indexOf(document.activeElement);
if (idx === -1) { focusables[0].focus(); return; }
var next = (direction === 'up' || direction === 'left')
? (idx > 0 ? idx - 1 : focusables.length - 1)
: (idx
Settings
Start
```
**CSS**
```css
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
```
### Sensors
#### Overview
Meta Ray-Ban Display glasses expose access to accelerometer, gyroscope, and compass data through the standard `DeviceMotionEvent` and `DeviceOrientationEvent` web APIs. Simply add event listeners on `window` as you would in any mobile browser.
#### Requesting permission
Motion and orientation data require an explicit user permission grant. For cross-platform compatibility, check whether `DeviceOrientationEvent.requestPermission()` exists and call it before attaching listeners.
```javascript
function startIMU() {
window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('devicemotion', handleMotion);
}
// Check whether requestPermission exists before calling it
if (typeof DeviceOrientationEvent !== 'undefined' &&
typeof DeviceOrientationEvent.requestPermission === 'function') {
// Platforms that require explicit permission (e.g., iOS Safari)
DeviceOrientationEvent.requestPermission()
.then(function(state) {
if (state === 'granted') {
startIMU();
}
});
} else {
// Glasses runtime and most Android browsers grant automatically
startIMU();
}
```
**Note:** The permission request must be triggered by a user gesture (for example, a button press via Enter key). It cannot be called automatically.
#### DeviceMotionEvent
`DeviceMotionEvent` provides real-time accelerometer and gyroscope readings. Use it to detect movement, measure G-forces, or track rotation speed.
```javascript
window.addEventListener('devicemotion', function(e) {
// Accelerometer (including gravity), in m/s²
var ax = e.accelerationIncludingGravity.x;
var ay = e.accelerationIncludingGravity.y;
var az = e.accelerationIncludingGravity.z;
// Compute magnitude in G-force
var g = Math.sqrt(ax * ax + ay * ay + az * az) / 9.81;
document.getElementById('gforce').textContent = g.toFixed(2) + ' G';
// Gyroscope (rotation rate in degrees/second)
var yawRate   = e.rotationRate.alpha;
var pitchRate = e.rotationRate.beta;
var rollRate  = e.rotationRate.gamma;
});
```
#### DeviceOrientationEvent
`DeviceOrientationEvent` provides the current orientation of the glasses relative to the Earth. Use it for compass heading, tilt detection, or spatial UI.
```javascript
window.addEventListener('deviceorientation', function(e) {
var heading = e.alpha;  // Compass direction (rotation around z-axis): 0-360°
var tilt    = e.beta;   // Forward/back tilt (rotation around x-axis): -180° to 180°
var roll    = e.gamma;  // Left/right tilt (rotation around y-axis): -90° to 90°
document.getElementById('heading').textContent = heading.toFixed(1) + '°';
});
```
#### Best practices
| Consider | Avoid |
| -------- | ----- |
| Requesting permission from a user gesture (for example, button press) | Calling `requestPermission()` automatically on page load |
| Checking for API availability before attaching listeners | Assuming `DeviceOrientationEvent` is always defined |
| Throttling or debouncing high-frequency sensor updates for UI rendering | Updating the DOM on every single sensor event without throttling |
| Using `accelerationIncludingGravity` for tilt-based interactions | Relying on acceleration alone when gravity context is needed |
| Removing event listeners when sensor data is no longer needed | Leaving listeners active in the background, which drains battery |
### Location
#### Overview
MRBD glasses implement the standard `navigator.geolocation` web API. Location data is fetched from the wearer's paired mobile device, since the glasses themselves do not have location-aware sensors. Use the API exactly as you would in any Web App. Like Sensor Data, Location also requires user permission.
#### One-shot position
Use `getCurrentPosition` to request a single location fix.
```javascript
navigator.geolocation.getCurrentPosition(
function(position) {
var coords = position.coords;
console.log('Latitude:  ' + coords.latitude);     // Decimal degrees
console.log('Longitude: ' + coords.longitude);    // Decimal degrees
console.log('Accuracy:  ' + coords.accuracy);     // m
console.log('Altitude:  ' + coords.altitude);     // m (may be null)
console.log('Speed:     ' + coords.speed);        // m/s (may be null)
console.log('Heading:   ' + coords.heading);      // Degrees from north (may be null)
console.log('Timestamp: ' + position.timestamp);  // ms since epoch (UTC)
},
function(error) {
// error.code:
//   1 = PERMISSION_DENIED: wearer denied permission request
//   2 = POSITION_UNAVAILABLE: location could not be retrieved (i.e., phone offline)
//   3 = TIMEOUT: request exceeded the timeout
// error.message - human-readable description
console.error('Geolocation error:', error.code, error.message);
},
{ timeout: 15000 }
);
```
#### Continuous position tracking
Use `watchPosition` to receive ongoing location updates as the wearer moves.
```javascript
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
console.error('Watch error:', error.code, error.message);
}
);
```
Call `clearWatch` when updates are no longer needed.
```javascript
// Stop watching when done
navigator.geolocation.clearWatch(watchId);
```
#### Position options
Both `getCurrentPosition` and `watchPosition` accept an optional third argument to configure behavior:
| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `enableHighAccuracy` | boolean | false | Request the most accurate position available. May take longer and use more power. |
| `timeout` | number | Infinity | Maximum time (in milliseconds) to wait for a position. Use 10000-15000 ms as a practical default. |
| `maximumAge` | number | 0 | Accept a cached position if it is no older than this value (in milliseconds). |
```javascript
navigator.geolocation.getCurrentPosition(successCb, errorCb, {
enableHighAccuracy: true, // Request most accurate position (boolean, default false)
timeout: 15000, // Max wait time in ms (number, default Infinity)
maximumAge: 5000 // Accept cached position if newer than this in ms (number, default 0)
});
```
#### Best practices
| Consider | Avoid |
| -------- | ----- |
| Using a `timeout` of 10-15 seconds (10000-15000 ms), since the first request may take several seconds | Omitting using a `timeout` or setting it too low |
| Handling `PERMISSION_DENIED` gracefully, since the wearer must grant permission | Assuming wearer does not need to grant permissions |
| Ensuring permissions requests are triggered by a user gesture | Assuming permission requests are triggered |
#### Notes
* Remember, location comes from the paired companion phone's GPS/network services.
* Expect an accuracy of 5-50 meters, depending on signal quality.
#### Location error handling
Always provide an error callback to handle failure gracefully. Location may be unavailable if the following errors occur:
| Description | Error code | Type |
| ----------- | ---------- | ---- |
| Wearer denies the permission prompt | 1 | `PERMISSION_DENIED` |
| Location data could not be retrieved (for example, companion device is offline) | 2 | `POSITION_UNAVAILABLE` |
| Request exceeded the specified timeout | 3 | `TIMEOUT` |
### Storage
Web Apps on MRBD glasses have access to standard Web Storage APIs, including both `localStorage` and `sessionStorage`, to persist lightweight data on MRBD glasses:
* `localStorage` persists data across sessions, even after the app is closed and reopened.
* `sessionStorage` persists data only for the current session, so values are cleared when the session ends.
These work exactly as they do in any modern browser, and both APIs store data as key-value string pairs.
#### Saving and reading data
Use the standard `setItem`, `getItem`, and `removeItem` methods.
```javascript
// Save a value
localStorage.setItem('userPreference', 'dark');
// Read a value
var preference = localStorage.getItem('userPreference');
// Returns 'dark', or null if the key does not exist
// Remove a value
localStorage.removeItem('userPreference');
// Clear all stored data
localStorage.clear();
```
#### Session storage
`sessionStorage` has an identical API, but scopes data to the current session. Use it for temporary states that should not persist after the user exits your app.
```javascript
// Track whether the user has seen the onboarding screen this session
if (sessionStorage.getItem('onboardingSeen')) {
showMainScreen();
} else {
showOnboarding();
sessionStorage.setItem('onboardingSeen', 'true');
}
```
#### Storage limits
The glasses runtime provides storage within the following limits:
* `localStorage`: 5 MB
* `sessionStorage`: 5 MB
As a general practice, keep stored data lightweight - avoid storing large blobs, images, or multi-megabyte datasets. Web storage is best suited for user preferences, small caches, and application state.
### App Icons
For app icons, use Unicode symbols or high-resolution PNG favicons (larger than 52x52 px). The system checks the Web App manifest and page source (not just `favicon.ico`) for this content. If no suitable icon is found, a default fallback icon is shown. SVGs are not supported.
Icons can be implemented as HTML `
` tags in your page's `
` section.
```html
```
Icons can also be implemented by referencing the Web App JSON manifest. Each entry in the `icons` array must include a `src` attribute and ideal sizes.
**HTML**
```html
```
**JSON**
```json
{
"icons": [
{ "src": "/icons/icon-96.png", "sizes": "96x96" },
{ "src": "/icons/icon-192.png", "sizes": "192x192" }
]
}
```
### Test
## Overview
Once you've built a Web App, you will need to test it.
## Hosting your Web App
Web Apps for Meta Ray-Ban Display glasses must be served over HTTPS from a publicly accessible URL. See [Hosting your Web App](/docs/develop/webapps/setup/#hosting-your-web-app) for details.
## Accessing your Web App on Meta Ray-Ban Display glasses
In the Meta AI app, after you've enabled Developer Mode (see [Enabling Developer Mode in the Meta AI app](/docs/develop/webapps/setup/#enabling-developer-mode-in-the-meta-ai-app)):
1. Tap **App Settings** (left panel) > **App Connections**
1. Select **Web Apps** > **Add a Web App**
1. Add an app name and your URL
1. Tap **Connect**
Your Web App will appear immediately at the bottom of your Meta Ray-Ban Display glasses app grid. You can then pin it for easier access.
Select your Web App in MRBD to launch it. Once in the Web App, you can use up/down/left/right swipes and index pinch or tap. A middle pinch will surface a universal Web App menu with:
* A **Restart** button to reload the Web app
* A **Resume** button to return to the Web app
* A **Permissions** button to manage permissions (if necessary)
## Testing on other devices
Your Web App will run on any other browsers, like on your computer or mobile phone. If it works on your computer with up/down/left/right arrow keys and Enter, it should also work on your glasses. If you use Chrome debugging tools, set the viewport to 600 x 600 px.
## Sharing your Web App
After testing your Web App, you can easily share it with other users:
1. In the Meta AI app, go back to **App Settings** > **App Connections**.
1. Tap on your Web App.
1. Tap the **Share link** button.
Others who receive the link can also access your Web App. If they have Developer Mode enabled, they'll be one tap away from adding your Web App. Otherwise, they'll be asked to enable Developer Mode first.
If you use the MRBD Web App [AI Coding plugin](https://github.com/facebookincubator/meta-wearables-webapp), it can generate the deeplink and QR code to scan with your phone to add the Web App in the Meta AI App.
## Recording your Web App
You can now record video of your MRBD while running and using your Web App, in order to show others what the experience is like.
From Meta AI app:
1. In the Meta AI app, tap **Devices** (the glasses icon), and scroll to your MRBD glasses.
2. Scroll the buttons underneath the glasses and tap the **Record Display** button.
From MRBD:
1. From the glasses settings pane, tap the **Display Recording** button.
2. When you're done recording, import the media to your camera roll.
### Troubleshoot
## Overview
This page will be updated with known issues, workarounds, and updates as they come up.
When something isn't working:
1. Ensure your glasses and Meta AI app are updated to the latest versions.
2. Try describing the issue to an AI assistant to see if it can resolve the issue.
3. Test your app on a desktop browser using arrow and enter/return keys. Use your browser's developer tools for deeper investigation.
## Reporting Feedback
To share bugs, feature requests, or other comments about Web Apps for Meta Ray-Ban Display glasses, please see [our GitHub repo](https://github.com/facebookincubator/meta-wearables-webapp).
## Known issues
| Issue | Workaround |
| ----- | ---------- |
| SVG favicons are not supported | Use PNG favicons (larger than 52x52 px). |
### Web Apps MCP
## Overview
Display Web Apps use the shared public Wearables MCP server for live documentation search. Use it when you want your editor or agent to query current Web Apps guides and references while building with the [AI Coding plugin](https://github.com/facebookincubator/meta-wearables-webapp).
For coding tasks, pair this MCP server with the Web Apps GitHub plugin. The plugin provides Display Web Apps implementation patterns and constraints; MCP provides current documentation lookup while the assistant works.
The Web Apps docs tool is:
- `search_webapps_docs` — semantic search over Display Web Apps guides and references
When your client exposes an output or response format option, choose Markdown. Markdown results preserve headings, links, tables, and code blocks, which makes it easier for the assistant to quote the docs accurately before editing code.
The shared Wearables MCP server also includes DAT docs search, but use `search_webapps_docs` for Display Web Apps questions.
The public endpoint is:
```text
https://mcp.developer.meta.com/wearables
```
Use the direct MCP host above. Do not use the Wearables developer site URL as the MCP endpoint.
The AI Coding plugin provides the coding skills for creating, testing, and publishing Web Apps. The MCP server complements those skills with live Web Apps documentation lookup. Use both when your tool supports them.
## Claude Code
Add the Wearables MCP server with the Claude CLI:
```bash
claude mcp add --transport http wearables https://mcp.developer.meta.com/wearables
```
To check the configuration into your project, use project scope:
```bash
claude mcp add --transport http wearables --scope project https://mcp.developer.meta.com/wearables
```
Verify that Claude Code can see the server:
```bash
claude mcp list
```
Example prompt:
```text
Search the Wearables Web Apps docs for the required viewport size.
```
## Cursor
Add the endpoint as an HTTP MCP server:
1. Open **Settings** and go to **MCP**.
2. Add a new server.
3. Set the name to `wearables`.
4. Set the transport or server type to `HTTP`.
5. Use `https://mcp.developer.meta.com/wearables` as the URL.
If your Cursor build uses JSON-backed MCP settings, the entry should look like this:
```json
{
"mcpServers": {
"wearables": {
"type": "http",
"url": "https://mcp.developer.meta.com/wearables"
}
}
}
```
After saving the config, reconnect the server or restart Cursor. You can then ask Cursor Chat to search the Web Apps docs through the MCP tool.
## MCP Inspector
Use MCP Inspector for a direct endpoint check:
```bash
npx @modelcontextprotocol/inspector
```
In the browser UI:
1. Set **Transport Type** to `Streamable HTTP`.
2. Set **URL** to `https://mcp.developer.meta.com/wearables`.
3. Set **Connection Type** to `Direct`.
4. Click **Connect**.
Run:
1. Initialize the session.
2. Open **Tools** and click **List Tools**.
3. Confirm that `search_webapps_docs` is present.
4. Run `search_webapps_docs` with a query such as `viewport size`, and request Markdown output if your client exposes a format option.
If your Inspector build labels the transport as `HTTP` instead of `Streamable HTTP`, use the HTTP option with the same URL.
## Example queries
These are representative queries for the Web Apps MCP tool:
- `What viewport size should a Display Web App use?`
Returns the fixed viewport guidance and related display constraints.
- `How do I handle arrow key and Enter input?`
Returns input guidance for directional navigation and selection events.
- `How do I test a Web App on Meta Ray-Ban Display glasses?`
Returns setup, hosting, and testing steps for loading a Web App onto glasses.
- `What Web APIs are supported for sensors and location?`
Returns guidance for motion, orientation, and geolocation APIs.
## Troubleshooting
| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| The server does not connect | The client is still using an old or cached URL | Re-enter `https://mcp.developer.meta.com/wearables` and reconnect |
| No tools appear | The client did not finish initialization | Reconnect, then run initialize before `tools/list` |
| The client asks for auth | The server was configured with stale custom headers | Remove custom auth headers and reconnect |
| Search results are too broad | The query is too vague | Include `Web Apps`, a guide name, or an exact capability in the query |