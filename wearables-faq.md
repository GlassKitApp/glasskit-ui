# Frequently Asked Questions
- [Getting started](https://developers.meta.com/wearables/faq/#getting-started)
- [Device Access Toolkit](https://developers.meta.com/wearables/faq/#device-access-toolkit)
- [Web Apps](https://developers.meta.com/wearables/faq/#web-apps)
- [Meta AI Connectors](https://developers.meta.com/wearables/faq/#meta-ai-connectors)
- [Integrations & APIs](https://developers.meta.com/wearables/faq/#integration-apis)
- [Submission & Discovery](https://developers.meta.com/wearables/faq/#submission-and-discovery)
## Getting started
* * *
### What are the ways to build for Meta's portfolio of AI glasses?
There are two ways to create experiences for Meta's portfolio of AI glasses:
- **The Meta Wearables Device Access Toolkit** — extends iOS and Android mobile apps to build hands-free experiences across both display and displayless glasses.
- **Web Apps** (Display Glasses only) — Create standalone display experiences that run directly on Meta Ray-Ban Display glasses using standard HTML, CSS, and JavaScript. No native app or SDK required.
- **Meta AI Connectors** Connect your service directly to Meta AI so people can use it through the assistant without leaving the conversation. Available in developer preview [here⁠](https://dev.meta.ai.products/connectors).
* * *
### Can I use AI coding tools to build for Meta's portfolio of AI glasses?
Yes. We provide AI-ready documentation and coding skills for Muse Code, Claude Code, Cursor, GitHub Copilot, Codex, Gemini CLI, and more — across both the Device Access Toolkit and Web Apps. Details in our GitHub repos - [iOS⁠](https://github.com/facebook/meta-wearables-dat-ios/discussions), [Android⁠](https://github.com/facebook/meta-wearables-dat-android/discussions), [Web Apps⁠](https://github.com/facebook/meta-wearables-webapp).
* * *
### Can I record my Device Access Toolkit content or Web App on my Meta Ray-Ban Display?
You can record what you are seeing with the new 'Record display' button visible when swiping right below the glasses overview in the Meta AI app or via the same button in the glasses settings.
* * *
## Device Access Toolkit
* * *
### What is the Meta Wearables Device Access Toolkit?
The Meta Wearables Device Access Toolkit enables developers to utilize our AI glasses to build hands-free wearable experiences into their mobile applications. By integrating this toolkit, developers can leverage capabilities like video streaming, photo capture, microphone and audio, Once integration covers both display and displayless AI glasses.
* * *
### Is the Device Access Toolkit still in developer preview?
No. After a year in developer preview, Wearables Device Access Toolkit 1.0 is here — a stable, supported release to build on. It begins rolling out September 30, 2026. Details in our [developer documentation⁠](https://wearables.developer.meta.com/docs/develop/dat/).
* * *
### What markets is the toolkit available for?
While developers everywhere will be able to download the SDK, only those in [AI glasses supported countries⁠](https://www.meta.com/help/ai-glasses/4961066940605960/) will have access to the full capabilities of the toolkit, including the [Wearables Developers Center⁠](https://wearables.developer.meta.com/).
* * *
### What devices will be supported by this toolkit?
We support our portfolio of AI glasses:
- Ray-Ban Meta (Gen 1 and Gen 2)
- Ray-Ban Meta Display
- Oakley Meta HSTN
- Oakley Meta Vanguard
New SKUs of these devices are supported as they become available. Capability availability varies by device.
* * *
### What are the system requirements (OS, hardware, dependencies)?
Wearables Device Access Toolkit supports both [iOS⁠](https://wearables.developer.meta.com/docs/build-integration-ios) and [Android⁠](https://wearables.developer.meta.com/docs/build-integration-android) with the same OS version requirements as the Meta AI app. For full requirements, see [here⁠](https://wearables.developer.meta.com/docs/getting-started-toolkit).
* * *
### Will there be a Hello World or quick-start project?
Yes, a sample app as well as a getting started tutorial are provided to help developers get started quickly.
* * *
### Will I need a pair of AI glasses to start developing?
You can start development using the SDK with simulated devices via [Mock Device Kit⁠](https://wearables.developer.meta.com/docs/develop/dat/mock-device-kit/), allowing testing without hardware. However, our Device Kit currently doesn't support display glasses. For on-device testing and full integration, a compatible device is recommended.
* * *
### What capabilities does the Device Access Toolkit provide?
1.0 gives your app the context it needs to stay in the moment, including camera, microphone, audio, motion and IMU capabilities. Capabilities ship regularly, so see our Device Access Toolkit [page](https://developers.meta.com/wearables/device-access-toolkit) for the latest.
* * *
### Where can I find the full SDK documentation?
Full documentation is available at [https://wearables.developer.meta.com/docs/develop/⁠](https://wearables.developer.meta.com/docs/develop/).
* * *
### What additional tools will be available to developers outside of the SDK?
The Wearables Device Access Toolkit provides a [Mock Device Kit⁠](https://wearables.developer.meta.com/docs/develop/dat/mock-device-kit/) for testing integrations without hardware - pair a mock device, change its state, and simulate permissions and media streaming. You can also get access to the Wearables Developer Center where you can manage organizations, release channels, and more. A growing catalog of AI plugins and skills makes building a mobile app integration easier.
* * *
### How do I get started?
Enable Developer Mode on your glasses using the Meta AI mobile app, add the toolkit to your [iOS⁠](https://github.com/facebook/meta-wearables-dat-ios) or [Android⁠](https://github.com/facebook/meta-wearables-dat-android) project, and start building. Full guides are in our [developer documentation⁠](https://wearables.developer.meta.com/docs/getting-started-toolkit).
* * *
## Web Apps
* * *
### What are Web Apps?
Web Apps run directly on Meta Ray-Ban Display glasses using standard HTML, CSS, and JavaScript with display and inputs optimized for these glasses - no native app and no separate SDK required. If you write for the web, you already know how to build them. Refer to our [documentation⁠](https://wearables.developer.meta.com/docs/develop/webapps/) for best practices and our [AI skills⁠](https://github.com/facebookincubator/meta-wearables-webapp) to help achieve this.
* * *
### What capabilities do Web Apps support?
Your web app can tune into the wearer's context — device position, location, and wrist motion from the Meta Neural Band — and take text input however fits the moment: dictation, handwriting, or an on-screen keyboard. Capabilities ship regularly, so see our Web apps [page](https://developers.meta.com/wearables/web-apps) for the latest.
* * *
### What tools are available for building Web Apps?
The new [UI Toolkit for Meta Ray-Ban Display⁠](https://github.com/facebook/meta-ray-ban-display-ui-toolkit-web) and its accompanying skills help you build interactive experiences that feel at home on glasses, and a browser-based [simulator⁠](https://wearables.developer.meta.com/docs/develop/dat/display-simulation) lets you test without hardware.
* * *
### What input methods can I use in a Web App?
Web Apps support navigation and selection from Meta Neural Band and captouch, plus text entry by dictation, handwriting, or on-screen keyboard. For the current list of supported inputs and gestures — and guidance on designing for them — see our [documentation⁠](https://wearables.developer.meta.com/docs/develop/webapps/build/input-and-navigation).
* * *
### What is WebMCP?
WebMCP lets you define which features and actions in your web app Meta AI can control, so people can get things done in your app just by asking, hands-free — while you stay in control of exactly what Meta AI can do. WebMCP is currently in [developer preview⁠](https://wearables.developer.meta.com/docs/develop/webapps/wearables-documentation-mcp).
* * *
### Do I need Meta Ray-Ban Display glasses to start developing?
No. You can start developing and test layouts in a standard web browser, including with our browser-based simulator. For on-device testing, you'll need Meta Ray-Ban Display glasses paired with the Meta AI app. For more information see our [documentation⁠](https://wearables.developer.meta.com/docs/develop/webapps/).
* * *
### How do I get started?
Build with your preferred web tools or download the [AI Coding plugin⁠](https://github.com/facebookincubator/meta-wearables-webapp) from GitHub. Preview in your browser, then deploy to any URL and add it to your glasses through the Meta AI app in Developer mode.
* * *
## Meta AI Connectors
* * *
### What are Meta AI Connectors?
Meta AI Connectors let you connect your service directly into Meta AI, so people can access it through our AI assistant without ever leaving the conversation. It turns your API into tools Meta AI can call: you define the actions, and Meta AI calls them when someone needs your service. There's no new SDK, no new app to ship.
* * *
### Where do Meta AI Connectors work?
We're starting with AI glasses and Meta AI on app and web. As Meta AI Connectors reach more surfaces and devices, your integration grows with them. Learn more [here⁠](http://dev.meta.ai/products/connectors).
* * *
### How do I get access?
Meta AI Connectors are available in developer preview. Sign up to get early access to build and test your connector [here⁠](http://dev.meta.ai/products/connectors).
* * *
## Integrations & APIs
* * *
### Can I integrate with cloud services or edge computing platforms?
Yes, developers can process data locally or via cloud/edge platforms. However, the Meta AI app must be used to pair your glasses.
* * *
### Where can I find the SDK and documentation?
- **Device Access Toolkit:** Available on [GitHub (Android)⁠](https://github.com/facebook/meta-wearables-dat-android) and [GitHub (iOS)⁠](https://github.com/facebook/meta-wearables-dat-ios)
- **Web Apps:** Starter kit and AI coding skills on [GitHub⁠](https://github.com/facebookincubator/meta-wearables-webapp)
- **Documentation:** [https://wearables.developer.meta.com/docs/develop/⁠](https://wearables.developer.meta.com/docs/develop/)
* * *
## Submission & Discovery
* * *
### Are there rules about what I can build?
Yes. All integrations and apps must comply with the [Meta Wearables Developer Acceptable Use Policy⁠](https://wearables.developer.meta.com/acceptable-use-policy). Check the Acceptable Use Policy to learn more.
* * *
### Can people discover what I build?
Soon, yes. Two new discovery surfaces are coming: on Meta Ray-Ban Display glasses you'll be able to find select experiences right on the device, and in the Meta AI app you'll be able to find a list of curated experiences for connected AI glasses. These surfaces will continue to expand as we begin taking submissions and approving more experiences. Learn more about where your experience can appear and how to be featured [here](https://developers.meta.com/wearables/explore/).
* * *
### When can I submit and submit my experience?
You'll soon be able to submit your Device Access Toolkit and Web Apps experiences to be published on these surfaces. We'll have more to share on submission and publishing timing soon. Create an account in the [Wearables Developer Center⁠](https://wearables.developer.meta.com/) so you're ready the moment submissions open — we'll share timing and details there first.
* * *
### Will there be any bootcamps or hackathons?
We're exploring opportunities to host bootcamps, hackathons, and other community events. Stay connected with us for future announcements and opportunities at [developer.meta.com/wearables⁠](http://developer.meta.com/wearables).
* * *
### How can I share my Web App?
You can host your web app on a server, and then share the URL. If a Meta Ray-Ban Display user has toggled the Developer Mode, they can go to App Settings, select App connections, slide down and tap "Add a Web App" and enter the URL. You can also generate a shareable deeplink, or let users add your app by scanning a QR code – see our [documentation⁠](https://wearables.developer.meta.com/docs/develop/webapps/) for details.
* * *
* * *
![Meta](https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg)
[Facebook](https://www.facebook.com/MetaforDevelopers)[X](https://www.instagram.com/metafordevelopers/)[X](https://x.com/metafordevs)[LinkedIn](https://www.linkedin.com/showcase/meta-for-developers/)[LinkedIn](https://www.youtube.com/MetaDevelopers)
Developer Centers
[AI](https://www.llama.com/)
[VR](https://developers.meta.com/horizon/)
[Social technologies](https://developers.facebook.com/)
[Wearables](https://developers.meta.com/wearables/)
[Horizon](https://developers.meta.com/horizon-worlds/)
Documentation
[Llama](https://www.llama.com/docs/overview/)
[Unity](https://developers.meta.com/horizon/develop/unity/)
[Unreal Engine](https://developers.meta.com/horizon/develop/unreal/)
[Android apps](https://developers.meta.com/horizon/develop/android-apps/)
[Worlds in Meta Horizon](https://developers.meta.com/horizon-worlds/learn/)
[Meta Spatial SDK](https://developers.meta.com/horizon/develop/spatial-sdk/)
[Wearables](https://wearables.developer.meta.com/docs)
[Facebook Login](https://developers.facebook.com/docs/facebook-login/)
[Instagram Platform](https://developers.facebook.com/docs/instagram-platform/)
[WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/)
[Threads API](https://developers.facebook.com/docs/threads/)
Resources
[Blog](https://developers.meta.com/resources/blog/)
[Success stories](https://developers.meta.com/resources/success-stories/)
[Videos](https://developers.meta.com/resources/videos/)
[Programs](https://developers.meta.com/resources/programs/)
Support and legal
[AI](https://www.llama.com/docs/community-support-and-resources/)
[VR](https://developers.meta.com/horizon/support/)
[Social technologies](https://developers.facebook.com/support/)
[Wearables](https://wearables.developer.meta.com/docs/support)
[Horizon](https://developers.meta.com/horizon-worlds/support/)
[Wearables Developer Terms](https://wearables.developer.meta.com/terms/)
[Acceptable Use Policy](https://wearables.developer.meta.com/acceptable-use-policy/)
Developer Centers
[AI](https://www.llama.com/)
[VR](https://developers.meta.com/horizon/)
[Social technologies](https://developers.facebook.com/)
[Wearables](https://developers.meta.com/wearables/)
[Horizon](https://developers.meta.com/horizon-worlds/)
Documentation
[Llama](https://www.llama.com/docs/overview/)
[Unity](https://developers.meta.com/horizon/develop/unity/)
[Unreal Engine](https://developers.meta.com/horizon/develop/unreal/)
[Android apps](https://developers.meta.com/horizon/develop/android-apps/)
[Worlds in Meta Horizon](https://developers.meta.com/horizon-worlds/learn/)
[Meta Spatial SDK](https://developers.meta.com/horizon/develop/spatial-sdk/)
[Wearables](https://wearables.developer.meta.com/docs)
[Facebook Login](https://developers.facebook.com/docs/facebook-login/)
[Instagram Platform](https://developers.facebook.com/docs/instagram-platform/)
[WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/)
[Threads API](https://developers.facebook.com/docs/threads/)
Resources
[Blog](https://developers.meta.com/resources/blog/)
[Success stories](https://developers.meta.com/resources/success-stories/)
[Videos](https://developers.meta.com/resources/videos/)
[Programs](https://developers.meta.com/resources/programs/)
Support and legal
[AI](https://www.llama.com/docs/community-support-and-resources/)
[VR](https://developers.meta.com/horizon/support/)
[Social technologies](https://developers.facebook.com/support/)
[Wearables](https://wearables.developer.meta.com/docs/support)
[Horizon](https://developers.meta.com/horizon-worlds/support/)
[Wearables Developer Terms](https://wearables.developer.meta.com/terms/)
[Acceptable Use Policy](https://wearables.developer.meta.com/acceptable-use-policy/)
Developer Centers
[AI](https://www.llama.com/)
[VR](https://developers.meta.com/horizon/)
[Social technologies](https://developers.facebook.com/)
[Wearables](https://developers.meta.com/wearables/)
[Horizon](https://developers.meta.com/horizon-worlds/)
Documentation
[Llama](https://www.llama.com/docs/overview/)
[Unity](https://developers.meta.com/horizon/develop/unity/)
[Unreal Engine](https://developers.meta.com/horizon/develop/unreal/)
[Android apps](https://developers.meta.com/horizon/develop/android-apps/)
[Worlds in Meta Horizon](https://developers.meta.com/horizon-worlds/learn/)
[Meta Spatial SDK](https://developers.meta.com/horizon/develop/spatial-sdk/)
[Wearables](https://wearables.developer.meta.com/docs)
[Facebook Login](https://developers.facebook.com/docs/facebook-login/)
[Instagram Platform](https://developers.facebook.com/docs/instagram-platform/)
[WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/)
[Threads API](https://developers.facebook.com/docs/threads/)
Resources
[Blog](https://developers.meta.com/resources/blog/)
[Success stories](https://developers.meta.com/resources/success-stories/)
[Videos](https://developers.meta.com/resources/videos/)
[Programs](https://developers.meta.com/resources/programs/)
Support and legal
[AI](https://www.llama.com/docs/community-support-and-resources/)
[VR](https://developers.meta.com/horizon/support/)
[Social technologies](https://developers.facebook.com/support/)
[Wearables](https://wearables.developer.meta.com/docs/support)
[Horizon](https://developers.meta.com/horizon-worlds/support/)
[Wearables Developer Terms](https://wearables.developer.meta.com/terms/)
[Acceptable Use Policy](https://wearables.developer.meta.com/acceptable-use-policy/)
English (US)
© 2026 Meta
Facebook
Facebook
Facebook
Facebook