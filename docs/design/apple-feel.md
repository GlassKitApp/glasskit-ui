# GlassKit UI — Apple-feel design reference (additive lens)

> The aesthetic spec the GlassKit UI component library is built to: **Apple-Watch-grade
> crisp, clean, modern, premium — achieved entirely through _emitted light_ on a true-black
> additive lens, never backdrop-blur.** On a see-through additive display the Apple-Watch look
> and "renders correctly on real glasses" are the _same_ design (both are black-OLED,
> emitted-light, glanceable) — so this is not a compromise, it's the strongest version.
>
> Generated from cited research — watchOS HIG, SF typography, WWDC25 Liquid Glass, and
> OLED color/motion (4 facets, 41 sources; see §10). The website chrome (landing/docs) is the
> one place real Liquid-Glass _is_ allowed — see the two-surfaces table in §2.
>
> **Source of truth for:** the `additive` on-lens component styling, the on-lens design tokens,
> and the GlassKit agent-skills' design rules. Pairs with `PLAN.md` ("GlassKit UI's own Apple
> feel") and the lens rules in `AGENTS.md`. The SDK's `styles.css` will adopt these tokens when
> the styled components land (Phase 4); the extracted base stylesheet stays as-is until then.

## 1. North star

GlassKit is **Apple-Watch-grade crisp, clean, modern, and premium — built entirely from emitted light on a true-black additive lens.** Every surface is defined by luminous hairline edges, specular highlights, and soft glow rather than fills or blur; the canvas is real transparency (#000 = the world showing through), and a single phosphor-green key color carries all emphasis against white emitted type. The result reads as one luminous material floating in the void — never a "page," never frosted glass.

## 2. Two surfaces, two recipes

These are physically different displays. Do not share a stylesheet.

| Technique                                                  | THE LENS (600×600 additive HUD, emitted light)        | THE WEBSITE (opaque emissive, landing/docs)                |
| ---------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| Canvas                                                     | Pure `#000` = true transparency (world shows through) | Any background; real dark/light surfaces OK                |
| Translucent fills / `rgba` panels                          | **Banned** — wash to gray, kill legibility            | Allowed                                                    |
| `backdrop-filter` / blur / vibrancy / refraction / lensing | **Banned** — no backdrop to sample                    | Encouraged — real Liquid-Glass                             |
| Scrims behind text                                         | **Banned** — put type on pure black instead           | Allowed                                                    |
| Dark drop shadows                                          | **Banned** — black = invisible; use outer _glow_      | Allowed                                                    |
| Surface definition                                         | Luminous 1–1.5px hairline edge + content light only   | Filled cards, materials, shadows                           |
| Depth                                                      | Emitted light: edge + specular highlight + glow       | Blur, translucency, shadow layering                        |
| Accent                                                     | `#36e27f` as the single key color                     | `#36e27f` + real glass tints                               |
| Type                                                       | Bundled font (deterministic), white/near-white        | `system-ui` stack → real SF on Apple, Inter/Geist fallback |
| Photo/image fills                                          | **Banned** — occlude reality, wash out                | Allowed                                                    |

Rule of thumb: **on the lens, if it isn't emitting light, it doesn't exist.**

## 3. Design principles (watchOS-derived, additive-translated)

**Black-first canvas (content-as-light).** Default everything to `#000`. Never paint a visible "panel" or "card fill." A card _is_ its luminous edge plus the light of its contents — nothing else. On the lens this isn't a style choice; black literally emits no light, so the watchOS "no-screen illusion" is physically real. Keep **≥50–60% of every screen pure #000** as premium negative space.

**Glanceability & density discipline.** One question per view; one task per screen. Cap focusable elements at **3–5 per screen**. The primary value must be legible in a **1–2 second glance** while the user is walking/talking with reality behind the UI. Interactions complete in a few D-pad / Neural-Band steps.

**Hierarchy from luminance, not surfaces.** With no fills, scrims, or blur, hierarchy comes only from **size + weight + emitted luminance + the green accent**. Brightest near-white = the one primary value; dimmer near-white = secondary; faint green = tertiary/idle. Green is reserved for the single most important focus/action/status — never decoration.

**Content-as-light, restraint-as-premium.** Effects bloom on additive hardware, so over-decoration instantly reads cheap. Budget **per element: 1 edge highlight + 1 specular highlight + (focused only) 1 inner glow + 1 outer lift-glow.** Stop there.

## 4. Tokens & numbers (concrete starting set)

**Type ramp** — collapse Apple's 11 rungs to 4 emitted tiers (no scroll, few simultaneous elements, viewed close). Sizes in px @ 600×600; floor at Medium weight; leading slightly looser than Apple (emitted glyphs halate).

| Tier            | Size  | Weight           | Line-height | Tracking                           | Use                        |
| --------------- | ----- | ---------------- | ----------- | ---------------------------------- | -------------------------- |
| HUD Title       | 28–34 | Bold (700)       | 110–120%    | -0.5% (tight, refined)             | Screen title, hero readout |
| Primary readout | 20–22 | Semibold (600)   | 120%        | -1.5% to -2%                       | The one key value          |
| Body / label    | 15–17 | Medium (500) min | 130–140%    | +0.5% to +1% (positive!)           | Labels, short body         |
| Caption / hint  | 12–13 | Medium (500)     | 135%        | +1% to +1.5% (positive, amplified) | Sparse hints only          |

- **Never go below ~15px** for sustained reading. **Never use Light/Thin/Ultralight** — thin stems vanish first on an emitter.
- **Positive tracking at small sizes is the #1 crispness trick** — push beyond Apple's values (start ~+0.5–1% over their numbers) and tune on real hardware; emitted glyphs merge without it.
- **Tabular numerals are mandatory** for any changing readout (time, battery, ETA, counts): `font-variant-numeric: tabular-nums` / `'tnum' 1`. Live digits that jitter read as cheap.

**Accent green (the single key color):**

```
--green-active   #7BF0AE   /* focused/hot, brightest */
--green          #36e27f   /* base accent, primary action */
--green-muted    #2A8F57   /* secondary edges, idle-but-present */
--green-faint     #1C5C3A   /* tertiary, trailing edges (never #000) */
```

Use green for focus rings, primary actions, status, brand moments — and nothing else. No second saturated hue.

**Neutral ink on black (emitted, never pure #FFF for body):**

```
--ink-primary    #F2F4F3   /* ~90% luminance — primary value/title */
--ink-secondary  #B8C0BC   /* ~70% — secondary text */
--ink-tertiary   #7C8480   /* ~45% — captions, idle labels */
```

Pure `#FFFFFF` / `#EAFFF3` reserved for specular highlights and the single brightest hero value.

**Hairline luminous border (the backbone):** width **1–1.5px** @ 600×600. **Gradient stroke**, lit from a fixed virtual **top-left** light: brightest corner `#FFFFFF`/`#EAFFF3` at 80–100% luminance → trailing edges `#36e27f` at 35–55%. **Never let any edge fall to #000** or the shape disappears. Uniform fully-bright borders read as neon/toy — keep the gradient.

**Glow:**

- Inner glow (body/thickness): inset, blur ~10–20px, white/green at 15–30% luminance.
- Outer lift-glow (replaces dark shadow): blur **24–40px**, spread 0–4px, `#36e27f` or white at **8–18%** luminance. This is how things "float."
- Layered recipe for a hot point: 0px-blur bright core + one mid halo (~6–10px, 25–35%) + optional wide bleed (~20–30px, 6–10%) for focus/brand only.
- **No glow on body text** (kills legibility); a tight backing glow is allowed only for text over bright real-world scenes.

**Corner radii (concentric to the lens):**

```
Root frame      24–40px (echo the physical lens curvature)
Cards / rows    16–22px (watchOS list-row spirit = 18pt)
Controls        16–28px
Pills / buttons fully rounded (radius = height/2)
```

Maintain concentricity: **innerRadius = outerRadius − padding.** Prefer continuous/squircle corners over plain circular radius.

**Spacing / density:** safe margins **16–24px** (glowing edges must not clip at lens curvature; keep content in the comfortable foveal zone). Safe inset from the outer ~5–8% of the lens (waveguide dims edges). One navigation model per app: **vertical list OR horizontal paging** — never both.

**Focus ring (the load-bearing input pattern):** D-pad / Neural Band has no cursor, so an always-visible focus indicator is mandatory. **Focused element:** green `#36e27f` hairline outline **1–2px** + bump inner glow to ~40–50% + tighten edge highlight. Focus means **both "selected" and "actionable now."** **No filled/gray selection backgrounds** (they wash out). Focused = 100% luminance; unfocused siblings dim to ~60–70%, idle to ~45%.

## 5. "Premium without blur" recipe

The Apple-glass feel survives on additive hardware via four backdrop-_independent_ emitted-light cues. Apply in this exact stacking order, and no more:

1. **Luminous hairline edge (highest ROI).** A 1–1.5px gradient stroke _is_ the surface — with no fill, the glowing outline does all geometry work. Brightest at the top-left virtual light, dimming to faint green around the far edges. This is the "crisp, clean" Apple-Watch edge.
2. **Specular highlight.** One small, bright, off-center white (→green) highlight at ~10–25% from the top-left corner, ~8–16px, full luminance falling to 0 over ~20–30px; plus a 1px brighter run along the top lit edge. **Fix the virtual light at top-left for the entire UI** so every element highlights consistently — consistency is what reads as "one material."
3. **Soft glow depth.** Inner glow gives a surface body/thickness; outer lift-glow (never a dark shadow) makes it float. Reserve the brightest internal glow for the focused element — this doubles as Apple's "illuminate-from-within" interaction feedback.
4. **Rounded concentric lens geometry.** Generous radii, nested concentric to the 600×600 frame, squircle feel — free on additive hardware and a major premium cue. Pair every rounded form with the edge + specular highlight so the geometry catches the virtual light.

That's it: **crisp light type + one luminous hairline + one specular highlight + soft focus glow + concentric rounding — and nothing more.** "Thicker/heavier" surfaces are implied by +0.5px edge width and +10–15% glow, never by fills.

## 6. Motion

- **Focus move (D-pad/Neural Band press):** discrete snappy spring, **~0.30–0.40s, bounce ~0.10–0.15.** Brighten the new focus ring, dim the old (luminance cross-fade) and move the green ring between targets.
- **Screen transitions:** luminance cross-fades + short slides, **~0.30–0.35s.** Spring-first (velocity continuity); default bounce 0, **avoid bounce > 0.4.**
- **Reduce-motion / busy real-world scene:** swap to a **≤0.15s** luminance dim, no spatial movement.
- **Restraint rules — DROP:** parallax, idle/ambient motion, modal scrims, motion-reactive pointer lights (no cursor exists — tie any light shift to the _focused element_ instead). Motion should clarify focus, never decorate.

## 7. Iconography & typography

**Font strategy (per surface):**

- **Lens:** you control the runtime, so **bundle ONE deterministic face** — fallback chains swap metrics and break the tracking/leading tuning. Prefer a **rounded** character (SF Pro Rounded / SF Compact Rounded if the runtime is an Apple-licensed Apple platform; otherwise **Geist or Inter**, both UI-tuned and shipping `tnum`). Rounded terminals echo the round lens and read soft + premium as light. Favor **straight verticals + generous inter-letter space** (the SF Compact bargain) — this anti-aliases cleanly and, with glow, matters more than fitting more per line. Drop condensed/narrow widths.
- **Website:** `font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` → renders **real SF on Apple devices**, Inter/Geist fallback. (SF Pro is not `@font-face`-embeddable — system stack only.)

**Icons (thin luminous line-icons):** SF-Symbols-grade craft — render strokes as crisp **1–1.5px emitted hairlines** (thinned at small sizes for equal optical weight), **round caps and joins**, cap-height optical alignment, faint glow only. Translate SF Symbols "hierarchical" mode into **luminance/green tiers, 2 max** (e.g. ~100% / ~50%). **Inert icon = near-white; active icon = `#36e27f`.** Drop multicolor/gradient icons — extra hues are noise on additive and wash out. Verify every icon and label **over a busy real-world background**, not just black.

## 8. watchOS → GlassKit mapping

| watchOS pattern                              | GlassKit (lens) translation                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Black blends with bezel (no-screen illusion) | Literal: `#000` = transparent, world shows through. Keep as default.                           |
| Full-bleed rounded-rect list rows (~18pt)    | Rounded rows defined by **hairline edge + content light**, never a fill. 16–22px radius.       |
| One key color per app                        | `#36e27f` as the single key color — focus, primary, status, brand.                             |
| Green Digital-Crown focus border             | Green hairline focus ring (1–2px) + inner glow; D-pad up/down = crown-scroll, confirm = press. |
| Complication (glance-in-a-blink)             | Single-value readout, tabular numerals, primary value brightest, one task.                     |
| SF Compact small-size legibility             | Bundled rounded grotesk, straight verticals, positive small-size tracking, Medium+ weight.     |
| Full-bleed photo card                        | **Translate to** line/icon/type composition — no photo fills (occlude reality, wash out).      |
| Translucency / vibrancy / scrim depth        | **Dropped** → luminous edge + specular highlight + glow.                                       |
| Spring-based gesture motion                  | Discrete focus spring (~0.3–0.4s, low bounce) moving the luminous focus ring.                  |
| Hierarchical OR page navigation (pick one)   | One navigation model per component set: vertical list OR horizontal paging.                    |

## 9. Do / Don't

**Do**

- Default to pure `#000`; keep ≥50–60% of each screen black.
- Define every surface with a 1–1.5px **gradient** hairline, lit from a fixed top-left virtual light.
- Build hierarchy from luminance + size + weight; reserve green for the one emphasis.
- Use tabular numerals for every changing readout.
- Floor type at Medium weight, ~15px min; positive tracking at small sizes.
- Use concentric squircle radii nested to the 600×600 frame; keep 16–24px safe margins.
- Make the focus ring always visible (green outline + inner glow) — it doubles as "actionable."
- Verify legibility over busy real-world backgrounds.

**Don't**

- **No `backdrop-filter` / blur / vibrancy / refraction / lensing on the lens** — nothing to sample; washes to gray.
- **No translucent or gray fills, no scrims, no card backgrounds** — emitted gray is a glowing rectangle.
- **No dark/black drop shadows** — invisible on black; use outer glow for lift.
- **No pastels or second saturated hue** — pastels wash out; extra colors add noise against reality.
- **No heavy fills, neon over-glow, or stacked effects** — additive bloom reads cheap; respect the per-element effects budget.
- **No Light/Thin/Ultralight weights; no hairline-thin emitted text** — first to vanish.
- **No photo/image fills, no pure `#FFFFFF` body text** (reserve white for highlights), **no text glow on body**.
- **No parallax, idle motion, modal scrims, or pointer-tracking lights** (there's no cursor).

## 10. Sources

All four research facets reported **web_access: "used"** — no facet reported web access as "unavailable," so every recommendation below leans on cited sources rather than model knowledge alone. (The single hardware-specific inference not directly citable — exact emitted-light alpha/glow values for the additive lens — is extrapolated from the CSS Liquid-Glass recipes and tuned-on-hardware guidance noted throughout.)

**watchOS / interface design language**

- Designing for watchOS — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos
- Human Interface Guidelines (Clarity/Deference/Depth) — https://developer.apple.com/design/human-interface-guidelines/
- watchOS Layout — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/watchos/visual/layout
- watchOS Color — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/watchos/visual/color/
- watchOS Typography — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/watchos/visual/typography/
- Complications — watchOS HIG — https://developers.apple.com/design/human-interface-guidelines/watchos/overview/complications/
- The SwiftUI cookbook for focus — WWDC23 — https://developer.apple.com/videos/play/wwdc2023/10162/
- An Introduction to the watchOS WatchKit WKInterfacePicker — https://www.techotopia.com/index.php/An_Introduction_to_the_watchOS_2_WatchKit_WKInterfacePicker_Object
- Supporting multiple watch sizes — Apple Developer — https://developer.apple.com/documentation/watchos-apps/supporting-multiple-watch-sizes
- Designing better UX for Apple Watch — Significa — https://significa.co/blog/designing-better-ux-for-apple-watch
- Quick Guide to Designing the Apple Watch Interface — Nitin Nain — https://nitinnain.com/quick-guide-to-designing-apple-watch-interface/
- Designing user-centric Apple Watch apps — UX Collective — https://uxdesign.cc/designing-apple-watch-apps-for-better-user-experience-and-accessibility-36a1d3d6e5b6
- Customize your SwiftUI list for watchOS — Level Up Coding — https://levelup.gitconnected.com/how-to-customize-your-swiftui-list-for-watchos-3efb4a9a1fb5
- Design User-Friendly Interfaces for Apple Watch — MoldStud — https://moldstud.com/articles/p-how-to-design-user-friendly-interfaces-for-apple-watch-apps-essential-tips-and-best-practices
- Why Your Card Design Needs a Gradient Overlay (scrim — the pattern to DROP) — https://medium.com/@lilskyjuicebytes/why-your-card-design-needs-a-gradient-overlay-and-how-to-do-it-b142393572e1
- Apple Unveils Liquid Glass (valid only on opaque screens) — https://eshop.macsales.com/blog/97489-apple-unveils-liquid-glass-how-this-new-design-language-will-redefine-your-mac-iphone-ipad-and-apple-watch-experience/

**Typography (San Francisco / Dynamic Type)**

- Typography — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/typography
- Fonts — Apple Developer — https://developer.apple.com/fonts/
- iPhone App Font Size & Typography Guidelines (iOS 17) — https://www.learnui.design/blog/ios-font-size-guidelines.html
- Apple Human Interface Typography Guide (Figma) — https://gist.github.com/eonist/b9c180a67980c6e18a5184f19bff68fa
- San Francisco (typeface) — Wikipedia — https://en.wikipedia.org/wiki/San_Francisco_(sans-serif_typeface)
- Arriving at San Francisco (why SF Compact) — MartianCraft — https://martiancraft.com/blog/2015/10/san-francisco-part-2/
- System Font Stack — CSS-Tricks — https://css-tricks.com/snippets/css/system-font-stack/
- How to Use Apple's San Francisco Font on a Webpage — https://www.tutorialpedia.org/blog/how-to-use-apple-s-san-francisco-font-on-a-webpage/
- Geist Typography — Vercel — https://vercel.com/geist/typography

**Materials / vibrancy / Liquid Glass**

- Meet Liquid Glass — WWDC25 — https://developer.apple.com/videos/play/wwdc2025/219/
- Apple introduces a delightful and elegant new software design — Apple Newsroom — https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- Materials — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/materials
- Liquid Glass in the Browser: Refraction with CSS and SVG — kube.io — https://kube.io/blog/liquid-glass-css-svg/
- nikdelvin/liquid-glass — GitHub — https://github.com/nikdelvin/liquid-glass
- Recreating Apple's Liquid Glass Effect with Pure CSS — kevinbism, DEV — https://dev.to/kevinbism/recreating-apples-liquid-glass-effect-with-pure-css-3gpl
- Apple Liquid Glass: A Deep Dive — https://www.liquid-glass.org/
- Dark Glassmorphism / premium glass edge & rim-light recipes — Medium — https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f
- Next-level frosted glass with backdrop-filter — Josh W. Comeau — https://www.joshwcomeau.com/css/backdrop-filter/
- Using materials with SwiftUI — Create with Swift — https://www.createwithswift.com/using-materials-with-swiftui/

**Color / motion / iconography on OLED-black**

- Color — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/color
- Dark Mode — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/dark-mode
- Animate with springs — WWDC23 — https://developer.apple.com/videos/play/wwdc2023/10158/
- SF Symbols — Apple HIG — https://developer.apple.com/design/human-interface-guidelines/sf-symbols
- Meet Liquid Glass — WWDC25 — https://developer.apple.com/videos/play/wwdc2025/219/
- Green ~555nm eye sensitivity — https://lasgootools.com/blogs/lasgoo-blogs/why-are-human-eyes-most-sensitive-to-green-light
