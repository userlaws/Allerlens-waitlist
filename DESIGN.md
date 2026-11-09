# AllerLens site: design direction

Owner direction (Nov 6, 2026): the app's warm paper and Fraunces, no teal (hated), no brand colour yet, only subtle sage from the app icon, and no template page structure. The plain white page (Oct 21) read as blank. Dark mode switch stays. Edit this file if the brand changes; the CSS tokens in `app/globals.css` follow it.

Dial: ENERGY 1 / RHYTHM 2 / MOTION 2

Design Read: the landing page for an iPhone menu-scanning app, linking to its App Store listing, for people with food allergies who eat out. Plain white and black like the iOS app's own light and dark appearance; the photos and the real app screens carry the character.

## Identity

- The app first. The hero is the phone showing Corner Diner's scan, with four rows cut from that same screen (`public/screens/rows`) enlarged beside it, each level with its own row: Ask staff, Safe and two Avoids.
- The app in a real setting. "At the table" pairs the sunlit Corner Diner photo with the two Gijón photos of a Spanish menu.
- Only real screens. Every phone and every callout is a screenshot cropped from the App Store sheets. The table photos are generated scenes (originals with green screens in `assets/photos`); the real screenshots are perspective-warped into the green screens, so the app UI is never redrawn by a model.
- No text over photos. Copy sits on plain white (or black), photos sit below it in rounded frames.

## Palette

Direction change, Nov 6, 2026: the owner found the plain white page blank, with no flavor, and asked for the app's own look. This reverses the Oct 21 decision. The earlier white, system-font version is in git history (`site-redesign`).

| Token | Light | Dark | Why |
|---|---|---|---|
| paper | `#f3f1ec` | `#111110` | The app's `bg`, "warm paper" |
| surface | `#ffffff` | `#1d1d1b` | Cards and grouped rows; the app's `card` |
| ink | `#16242a` | `#f2f1ed` | Headings and body |
| ink-2 | `#566869` | `#b0aea6` | Secondary text |
| line | `#dad6cd` | `#30302d` | Hairlines |
| brand | `#2f6b4f` | `#8fc9a6` | A quiet sage taken from the app icon: focus ring, selection only |
| stage | `#dfe8e0` | `#1b2620` | The pale sage panel behind the pinned phone |

Colour appears in three places only: the pale sage stage behind the phone, the four label colours (the app's own, dark-mode values on the stage), and the photos and screens. `--safe-*`, `--caution-*`, `--avoid-*`, `--ask-*` hold the label colours.

## Theme

- next-themes with a `dark` class on `<html>`; the default follows the device ("system"), and the header switch overrides it and remembers the choice.
- The toggle is just an icon: a sun in light mode, a moon in dark mode (`role="switch"`, 40px tap area, no track or background). Tapping turns the icon into the other one, 250ms on smoothOut. Which icon shows follows the `dark` class, so it is right before React loads. Animate UI's `ThemeToggler` wipes the new theme in from the right; with reduced motion it switches instantly.

## Type

- Display: Fraunces SemiBold 600 (`next/font/google`, the app's own display face), sentence case, 1.06 leading, -0.02em. Used for the wordmark, h1, h2 and card titles via `.display` and `.heading`.
- Everything else: the system font, body 17px, secondary text in ink-2.
- No uppercase eyebrows, no monospace.

## Shape and depth

- Buttons and inputs 14px radius (the app's primary button); grouped cards and caption cards 14px; teal stages 28px on phones and 40px on desktop; photos 24 to 36px; phone screens clipped to the device curve.
- Buttons: ink fill with paper text, 14px radius like the app's primary button, 48px tall. Pressing scales to 0.98 and springs back on the app's bounce curve; hover fades to 0.88, the app's pressed opacity.
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
