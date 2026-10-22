# AllerLens site: design direction

Owner direction (Oct 21, 2026): a simple white page, no green or teal, plain buttons and plain type, with a dark mode switch like the app's. Earlier passes (warm paper and teal, then a serif) were rejected. Edit this file if the brand changes; the CSS tokens in `app/globals.css` follow it.

Dial: ENERGY 1 / RHYTHM 2 / MOTION 2

Design Read: a waitlist page for an iPhone menu-scanning app, for people with food allergies who eat out. Plain white and black like the iOS app's own light and dark appearance; the photos and the real app screens carry the character.

## Identity

- The app first. The hero is the phone showing Corner Diner's scan, with four rows cut from that same screen (`public/screens/rows`) enlarged beside it, each level with its own row: Ask staff, Safe and two Avoids.
- The app in a real setting. "At the table" pairs the sunlit Corner Diner photo with the two Gijón photos of a Spanish menu.
- Only real screens. Every phone and every callout is a screenshot cropped from the App Store sheets. The table photos are generated scenes (originals with green screens in `assets/photos`); the real screenshots are perspective-warped into the green screens, so the app UI is never redrawn by a model.
- No text over photos. Copy sits on plain white (or black), photos sit below it in rounded frames.

## Palette

| Token | Light | Dark | Why |
|---|---|---|---|
| paper | `#ffffff` | `#111110` | Plain white page; dark is the app's `bg` |
| surface | `#f5f5f7` | `#1d1d1b` | Grouped cards and inputs; dark is the app's `card` |
| ink | `#111111` | `#f2f1ed` | All headings, body and buttons |
| ink-2 | `#6e6e73` | `#b0aea6` | Secondary text; 5.1:1 on white, 8.5:1 on `#111110` |
| ink-3 | `#8e8e93` | `#75736c` | Unselected tab words only (large text, 3:1 or better) |
| line | `#e5e5ea` | `#30302d` | Hairlines and section borders |
| avoid | `#c4291c` | `#ff9a85` | Form errors only; dark is the app's Avoid text color |

Dark mode copies the app's dark palette exactly (`src/theme.ts` in the app repo, documented in its `design-handoff.md`): warm charcoal, not pure black. Light mode stays plain white with neutral greys, the system font and black buttons. On Oct 21, 2026 the owner compared previews of Fraunces headings on white and of the app's full light look (warm paper `#F3F1EC`, teal `#235E6B` buttons, Fraunces titles) and chose to keep this one. Don't bring the paper, teal or serif back without a new request.

No accent color. The only color on the page comes from the photos and the app screenshots.

## Theme

- next-themes with a `dark` class on `<html>`; the default follows the device ("system"), and the header switch overrides it and remembers the choice.
- The toggle is just an icon: a sun in light mode, a moon in dark mode (`role="switch"`, 40px tap area, no track or background). Tapping turns the icon into the other one, 250ms on smoothOut. Which icon shows follows the `dark` class, so it is right before React loads. Animate UI's `ThemeToggler` wipes the new theme in from the right; with reduced motion it switches instantly.

## Type

- One family: the system font (SF Pro on iPhone and Mac, the same face as the app's text; Segoe UI on Windows).
- Headlines 700 with -0.03em tracking and 1.04 leading (flighty.com: 700, about -1px at 65px). Section titles and card titles 600.
- Body 17px, secondary text in ink-2.

## Shape and depth

- Buttons and inputs are full pills (flighty.com's 50px radius, and the app's own pill buttons); grouped cards and caption cards 14px (the app's card radius); photos 24 to 36px; phone screens clipped to the device curve.
- Buttons: black in light mode, near-white in dark mode, 48px tall. Pressing scales to 0.98 and springs back on the app's bounce curve; hover fades to 0.88, the app's pressed opacity.
- Shadows: hairline ring plus one soft layer, only on phones and the caption card that overlaps them.

## Motion

Curves and timings come from the app's `src/motion.ts`: smoothOut `cubic-bezier(0.22, 1, 0.36, 1)` for nearly everything, bounce `cubic-bezier(0.34, 1.36, 0.64, 1)` for press release, 250ms for most changes, 400ms for page moves.


- Hero: each callout slides out from the phone once on load, staggered by 120ms.
- "What the app does": Animate UI `Tabs`, run as a tour. Each word stays 3.5 seconds while one underline fills beneath it, then glides to the next word as the screen changes; the underline, the screen and the word colour all move on one 350ms smoothOut timing. The phone stays still and its screen scrolls in step with the list: going down, the next screen rises from below and covers the old one, which moves a quarter of the way (the app's page parallax). Captions hand off without overlapping: the old one fades out in 120ms, then the new one fades in and rises 8px. The tour pauses only while a word has keyboard focus or the section is off screen (hovering does not pause it); choosing a word stops it and leaves a solid underline, and the button beside "What the app does" pauses or plays it.
- Questions: Animate UI's Radix accordion, so answers open with a height animation and the chevron turns.
- Theme toggle: the sun turns and shrinks away as the moon turns in (and back); the page wipes to the new theme.
- `prefers-reduced-motion`: the tour starts paused and fades instead of sliding, callouts appear without moving, and tab and theme changes are instant.

## References (measured Oct 21, 2026)

1. White page, black system type, bold tight headlines, secondary text as a soft grey, pill buttons (flighty.com: white body, 700 65px system-ui at -1px, body copy at 65% black, 50px button radius).
2. System sans throughout, no display face (culturedcode.com/things: ui-sans-serif headings and body).
3. Big words as tabs with the phone swapping beside them (foodisgood.com "Ways to Fig").
4. The app in real context rather than a drawing (foodisgood.com hero; the owner's own App Store composite).
5. Phone in the middle of the hero with real app content floating around it (flighty.com: notifications beside a hand-held phone). Here the content is rows cut from the phone's own screen.

Rejected: Flighty's yellow and Fig's lime accents (the owner asked for no color); Things' blue-grey page (the owner asked for white); the earlier teal and serif treatment (the owner disliked it).

## Copy rules

- Use the app's own words: Safe, Avoid, Ask staff, "Show staff my allergies", "Report a problem with this result".
- Only claim what the privacy policy, support page or screenshots show. No numbers, testimonials or platform claims without a source.
- No em dashes in site copy.
