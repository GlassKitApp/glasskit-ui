# Frequently Asked Questions
[Getting started](https://developers.meta.com/wearables/faq/#getting-started)
[Device Access Toolkit](https://developers.meta.com/wearables/faq/#device-access-toolkit)
[Web Apps](https://developers.meta.com/wearables/faq/#web-apps)
[Integrations & APIs](https://developers.meta.com/wearables/faq/#integration-apis)
[Developer Preview & Publishing](https://developers.meta.com/wearables/faq/#developer-preview)
## Getting started
* * *
### What are the ways to build for Meta's portfolio of AI glasses?
There are two ways to create experiences for Meta's portfolio of AI glasses:
**The Meta Wearables Device Access Toolkit** — extends iOS and Android for developers to leverage the sensors on our AI glasses to build hands-free wearable experiences into their mobile applications.
**Web Apps** (Display Glasses only) — Create standalone display experiences that run directly on Meta Ray-Ban Display glasses using standard HTML, CSS, and JavaScript.
* * *
### Can I use AI coding tools to build for Meta's portfolio of AI glasses?
Yes. We provide AI-ready documentation and coding skills for Claude Code, Cursor, GitHub Copilot, Codex, Gemini CLI, and more — across both the Device Access Toolkit and Web Apps. Details in our [GitHub repos⁠](https://github.com/facebookincubator/meta-wearables-webapp/tree/main).
* * *
## Device Access Toolkit
* * *
### What is the Meta Wearables Device Access Toolkit?
The Meta Wearables Device Access Toolkit enables developers to utilize our AI glasses to build hands-free wearable experiences into their mobile applications. By integrating this toolkit, developers can leverage capabilities like video streaming, photo capture, microphone and audio — and on Meta Ray-Ban Display glasses, access to the on-device display.
* * *
### What markets is the toolkit available for?
While developers everywhere will be able to download the SDK, only those in [AI glasses supported countries⁠](https://www.meta.com/help/ai-glasses/4961066940605960/) will have access to the full capabilities of the toolkit, including the Wearables Developers Center.
* * *
### What devices will be supported by this toolkit?
We plan to support our entire portfolio of AI glasses. Developers will initially have camera access via the toolkit and be able to access the microphone and speakers through iOS or Android Bluetooth profiles for
Ray-Ban Meta (Gen 1 and Gen 2)
Ray-Ban Meta Display
Oakley Meta HSTN
Oakley Meta Vanguard
* * *
### What are the system requirements (OS, hardware, dependencies)?
Wearables Device Access Toolkit supports both [iOS⁠](https://wearables.developer.meta.com/docs/build-integration-ios) and [Android⁠](https://wearables.developer.meta.com/docs/build-integration-android) with the same OS version requirements as the Meta AI app. For full requirements, see [here⁠](https://wearables.developer.meta.com/docs/getting-started-toolkit).
* * *
### Will there be a Hello World or quick-start project?
Yes, a sample app as well as a getting started tutorial are provided to help developers get started quickly.
* * *
### Will I need a pair of AI glasses to start developing?
You can start development using the SDK with simulated devices via [Mock Device Kit⁠](https://wearables.developer.meta.com/docs/mock-device-kit), allowing testing without hardware. However, our Device Kit currently doesn't support display glasses. For on-device testing and full integration, a compatible device is recommended.
* * *
### What capabilities does the Device Access Toolkit provide?
The toolkit provides access to on-device sensors including cameras, microphones, speakers, and for Meta Ray-Ban Display glasses, the display. See our [documentation⁠](https://wearables.developer.meta.com/) for the latest.
* * *
### Where can I find the full SDK documentation?
Full documentation is available at [https://wearables.developer.meta.com/docs/develop/⁠](https://wearables.developer.meta.com/docs/develop/).
* * *
### What additional tools will be available to developers outside of the SDK?
The Wearables Device Access Toolkit provides a [Mock Device Kit⁠](https://wearables.developer.meta.com/docs/develop/dat/mock-device-kit/) for testing integrations without hardware. Developers can pair a mock device, change its state, and simulate permissions and media streaming. Developers will also get access to the Wearables Developer Center where they can manage organizations, release channels, and more.
* * *
### How do I get started?
Enable Developer Mode on your glasses using the Meta AI mobile app, add the toolkit to your [iOS⁠](https://github.com/facebook/meta-wearables-dat-ios) or [Android⁠](https://github.com/facebook/meta-wearables-dat-android) project, and start building. Full guides are in our [developer documentation⁠](https://wearables.developer.meta.com/docs/getting-started-toolkit).
* * *
## Web Apps
* * *
### What are Web Apps?
Web Apps run directly on Meta Ray-Ban Display glasses using standard HTML, CSS, and JavaScript with display and inputs optimized for these glasses. Refer to our [documentation⁠](https://wearables.developer.meta.com/docs/develop/webapps/) for best practices and our [AI skills⁠](https://github.com/facebookincubator/meta-wearables-webapp) to help achieve this.
* * *
### What capabilities do Web Apps support?
At launch, Web Apps can access motion and orientation data from the glasses, GPS from a connected phone, input from both the Meta Neural Band and captouch, and local storage. See our [documentation⁠](https://wearables.developer.meta.com/) for the latest.
* * *
### Do I need Meta Ray-Ban Display glasses to start developing?
You can start developing and test layouts in a standard web browser. For on-device testing, you'll need Meta Ray-Ban Display glasses paired with the Meta AI app. For more information see our [documentation⁠](https://wearables.developer.meta.com/docs/develop/webapps/).
* * *
### How do I get started?
Build with your preferred web tools or download the [AI Coding plugin⁠](https://github.com/facebookincubator/meta-wearables-webapp) from GitHub. Preview in your browser, then deploy to any URL and add it to your glasses through the Meta AI app in Developer mode.
* * *
## Integrations & APIs
* * *
### What are the capabilities of Meta Wearables Device Access Toolkit and Web Apps?
See our [documentation⁠](https://wearables.developer.meta.com/) for latest.
* * *
### Can I integrate with cloud services or edge computing platforms?
Yes, developers can process data locally or via cloud/edge platforms. However, the Meta AI app must be used to pair your glasses.
* * *
### Where can I find the SDK and documentation?
**Device Access Toolkit:** Available on [GitHub (Android)⁠](https://github.com/facebook/meta-wearables-dat-android) and [GitHub (iOS)⁠](https://github.com/facebook/meta-wearables-dat-ios)
**Web Apps:** Starter kit and AI coding skills on [GitHub⁠](https://github.com/facebookincubator/meta-wearables-webapp)
**Documentation:** [developer.meta.com/wearables](https://developers.meta.com/wearables)
* * *
## Developer Preview & Publishing
* * *
### What does "Developer Preview" mean?
Developer Preview means you can build and test experiences, but you cannot yet distribute them to end users. This phase is for prototyping, experimentation, and sharing feedback that shapes what comes next.
* * *
### What can I expect in developer preview?
**Download the SDK:** Streamline your development process with pre-built libraries and our sample app.
**Access documentation:** Understand the API architecture, available endpoints, data structures, and best practices. Kick start your development with our sample app and tutorial.
**Test with or without hardware:** Test applications in Developer Mode on glasses or by using our Mock Device Kit without hardware.
* * *
### Where is the Developer Preview available?
While developers everywhere will be able to build, only those in [AI glasses supported countries⁠](https://www.meta.com/help/ai-glasses/4961066940605960/) ⁠ will have access to the full capabilities, including the Wearables Developers Center.
Documentation, samples, and getting-started guides are available at [developer.meta.com/wearables⁠](https://developers.meta.com/wearables).
* * *
### When can I start publishing my integrations?
Publishing is currently not available during the Developer Preview phase. We're working toward open publishing and will share updates as the platform matures. While publishing is unavailable, you can still share your experiences to gather feedback. For Web Apps, you can simply share the URL, and for the Device Access Toolkit, you can share via release channels. Please read our documentation for more details.
* * *
### Will there be any bootcamps or hackathons?
We're exploring opportunities to host bootcamps, hackathons, and other community events. Stay connected with us for future announcements and opportunities at [developer.meta.com/wearables⁠](http://developer.meta.com/wearables).
* * *
### How can I share my Web App?
You can host your web app on a server, and then share the URL. If a Meta Ray-Ban Display user has toggled the Developer Mode, they can go to App Settings, select App connections, slide down and tap "Add a Web App" and enter the URL. You can also generate a shareable deeplink – see our [documentation⁠](https://wearables.developer.meta.com/) for details.
* * *
### What hand gestures can I use in a Web App with the Neural Band?
You can use left, right, up, down swipes, enter with index finger pinch and cancel with middle finger pinch. There is no ability to do custom gestures from the Neural Band.
* * *
### Can I record my Device Access Toolkit content or Web App on my Meta Ray-Ban Display?
You can record what you are seeing with the new 'Record display' button visible when swiping right below the glasses overview in the Meta AI app or via the same button in the glasses settings.
* * *
* * *
![Meta](https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg)
[Facebook](https://www.facebook.com/MetaforDevelopers)[X](https://www.instagram.com/metafordevelopers/)[X](https://x.com/metafordevs)[LinkedIn](https://www.linkedin.com/showcase/meta-for-developers/)[LinkedIn](https://www.youtube.com/MetaDevelopers)
Developer Centers
[AI](https://www.llama.com/)
[Meta Horizon OS](https://developers.meta.com/horizon/)
[Social technologies](https://developers.facebook.com/)
[Wearables](https://developers.meta.com/wearables/)
Documentation
[Llama](https://www.llama.com/docs/overview/)
[Unity](https://developers.meta.com/horizon/develop/unity/)
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
Support
[AI](https://www.llama.com/docs/community-support-and-resources/)
[Meta Horizon](https://developers.meta.com/horizon/support/)
[Wearables](https://wearables.developer.meta.com/docs/support)
[Social technologies](https://developers.facebook.com/support/)
Developer Centers
[AI](https://www.llama.com/)
[Meta Horizon OS](https://developers.meta.com/horizon/)
[Social technologies](https://developers.facebook.com/)
[Wearables](https://developers.meta.com/wearables/)
Documentation
[Llama](https://www.llama.com/docs/overview/)
[Unity](https://developers.meta.com/horizon/develop/unity/)
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
Support
[AI](https://www.llama.com/docs/community-support-and-resources/)
[Meta Horizon](https://developers.meta.com/horizon/support/)
[Wearables](https://wearables.developer.meta.com/docs/support)
[Social technologies](https://developers.facebook.com/support/)
Developer Centers
[AI](https://www.llama.com/)
[Meta Horizon OS](https://developers.meta.com/horizon/)
[Social technologies](https://developers.facebook.com/)
[Wearables](https://developers.meta.com/wearables/)
Documentation
[Llama](https://www.llama.com/docs/overview/)
[Unity](https://developers.meta.com/horizon/develop/unity/)
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
Support
[AI](https://www.llama.com/docs/community-support-and-resources/)
[Meta Horizon](https://developers.meta.com/horizon/support/)
[Wearables](https://wearables.developer.meta.com/docs/support)
[Social technologies](https://developers.facebook.com/support/)
English (US)
© 2026 Meta
Facebook
Facebook
Facebook
Facebook