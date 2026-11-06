# Website rebrand handoff (Nov 2026)

Written for Claude Code working on this repo. It describes the AllerLens app as it ships in **1.1.0 (build 21)**, and
gives the design system and assets the site needs so it can look like the app and show it off.

## Where things stand

- **The app is in App Review.** 1.1.0 (21) was submitted Nov 2 2026 and is set to **manual release**. The owner will
  press Release only after the site is updated. Plan for the site to go live at the same time as the app.
- **App Store link** (works once released): `https://apps.apple.com/app/id6802429618`. Bundle `com.allerlens.app`.
- **This repo serves two things.** Keep both working:
  - The Next.js site in `app/` and `components/` (Vercel: allerlenswaitlist.vercel.app). This is the site to rebrand.
  - `docs/privacy-policy.html` and `docs/support.html`, served by GitHub Pages from `main/docs` at
    `https://userlaws.github.io/Allerlens-waitlist/`. The app and the App Store listing link to those two URLs, so do
    not move, rename or delete them. Restyling them to match is fine; their wording was reviewed for build 21.
  - `app/privacy/page.tsx` is an old August copy of the policy and does not match the live one. Replace it with the
    text of `docs/privacy-policy.html` or redirect it there.
- **Nothing has to be kept.** The owner said the site can be rebranded freely: new layout, new sections, new copy.

## What the app is now

AllerLens reads a restaurant menu, translates it, and marks every dish against the allergens the user picked.

- **Ways in:** point the camera at a printed menu (up to five pages, read as one menu); point it at the QR code on
  the table and the menu opens inside the app; paste a link to a menu; upload a PDF (first 10 pages) or photos.
- **Four labels on every dish:** Safe, Caution, Avoid, Ask staff. Each flagged dish shows the words that caused the
  flag and why. Ask staff is used when the app has nothing to go on (no description, a dish that changes daily like
  the soup of the day, or "choice of sauce" pointing at a list it did not see). Ask staff is never shown as Safe.
- **Knows typical recipes:** flags allergens a dish usually contains even when the menu lists no ingredients.
- **Menu notes count:** a line like "all fried items share a fryer" applies across the whole menu; a frying-oil line
  applies to fried dishes only.
- **Related allergens:** squid, octopus and cuttlefish show as Caution for a fish allergy; tree nuts and peanuts are
  treated as related.
- **Nine allergens:** peanuts, tree nuts, dairy, eggs, gluten, soy, fish, shellfish, sesame.
- **Translation:** menus into English or Spanish, original text kept under each dish. The app itself is in English
  and Spanish, following the phone.
- **Show staff:** a card listing the user's allergies, written in the menu's language, to hold up to the server.
- **Saved:** scans grouped by restaurant, with favourite dishes.
- **Private by design:** no account, no sign-in. Allergen profile and history stay on the phone. Menu photos, PDFs
  and page text go to the server only to be read, then are discarded. Light and dark mode.
- **Free.** No in-app purchases, no subscription. iPhone only (no iPad, no Android build).
- **Age rating 16+**, only because the in-app browser can open any web address.

## The current site says things that are no longer true

Remove or rewrite all of these. The App Store reviewers and users will compare the site with the app.

| Where | Claim | Reality |
| --- | --- | --- |
| `app/layout.tsx` metadata, hero | "Join the early access waitlist", waitlist form | The app is on the App Store. Lead with the App Store badge. Keep the email list only if the owner wants it |
| `features-section.tsx` | "under 3 seconds" | A scan takes several seconds to tens of seconds; a dense page can take about 40 s. Do not quote a time |
| `features-section.tsx`, `who-its-for-section.tsx` | "50+ languages" | The app reads menus in many languages but translates into English or Spanish only. Say that |
| `features-section.tsx`, FAQ | Works offline | Scanning needs an internet connection |
| `features-section.tsx` | Profiles for the whole family | One allergen profile per phone |
| `features-section.tsx` | iOS and Android, sync across devices | iPhone only, no sync, no account |
| `how-it-works-section.tsx` | Ingredient lists and food packaging | Built for restaurant menus |
| FAQ | "we store anonymized menu text", "request account deletion" | Nothing is stored; there are no accounts. Match `docs/privacy-policy.html` |
| FAQ | Free tier, Pro, "lifetime 30% off" | Free, nothing to buy |
| `demo-section.tsx` | "real menu scans from NYC cafes and diners" | Use the screenshots in `handoff/assets` |
| `app/globals.css`, `app/layout.tsx` | Inter, green primary (oklch hue 145) | Use the app's type and colours below |
| `footer.tsx` | © 2025 | © 2026 Imanol Aracena (the App Store copyright line) |

## Brand system (from the app's code, unchanged in build 21)

Full detail with source lines: [`app-design-system.md`](app-design-system.md). It was written for the app repo
(`userlaws/Allerlens`), so its file links point into that repo. Its tagline section quotes an older promo text; use
the copy in this file instead.

**Type**
- Display: **Fraunces SemiBold 600** (Google Fonts; in Next use `next/font/google` `Fraunces`, weight 600). Screen
  titles 32/38 with -0.3 letter spacing, section heads 20/24. Sentence case. No uppercase eyebrows.
- Everything else: the system UI font (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`), body
  16/21 at 400, labels 13/18 at 600. The app uses no monospace font. Drop Inter and Geist Mono.

**Colour** (light / dark)

| Role | Light | Dark |
| --- | --- | --- |
| Page background ("warm paper") | `#F3F1EC` | `#111110` |
| Card / surface | `#FFFFFF` | `#1D1D1B` |
| Subtle fill (chips, inputs) | `#EAE7E0` | `#191918` |
| Hairline border | `#DAD6CD` | `#30302D` |
| Primary text | `#16242A` | `#F2F1ED` |
| Secondary text | `#566869` | `#B0AEA6` |
| Accent (links, active) | `#235E6B` | `#7FC1CE` |
| Button fill (white text) | `#235E6B` | `#2A6E7C` |

Colour appears only in the four labels; everything else is neutral. Label colours (text / dot / tint):

| Label | Light | Dark |
| --- | --- | --- |
| Safe | `#1B6B45` / `#2F7D5F` / `#EAF9EE` | `#7FD4AC` / `#4FB58A` / `#16332A` |
| Caution | `#8A5A00` / `#B9822A` / `#FBF3DF` | `#EBC16A` / `#D9A441` / `#33290F` |
| Avoid | `#9E2F1C` / `#C0523F` / `#F9ECEA` | `#FF9A85` / `#E0705B` / `#3A1D18` |
| Ask staff (grey on purpose) | `#4F6163` / `#93A0A0` / `#ECEFEF` | `#C2C0B8` / `#8F8D85` / `#2A2A27` |

In the app a label is a small dot plus the word in the text colour, never a filled pill.

**Shape and motion:** cards radius 14, sheets 20, inputs 11, pills 999. Spacing steps 4, 8, 12, 16, 20, 28; page
side padding 20. Card shadow `0 2px 10px rgba(0,0,0,0.06)`. Hairline dividers. Motion: `cubic-bezier(0.22,1,0.36,1)`
at 250 ms, items rise 8 px with a 40 ms stagger. Nothing bounces.

**Icons:** Ionicons in the app (outline style). Allergens are shown as emoji (🥜 🌰 🥛 🥚 🌾 🫘 🐟 🦐 🌱).

**App icon:** `assets/brand/icon-1024.png`. It is green (`#34BE64` to `#188C3C`) with white scan brackets, while the
app UI is teal. Use the icon as it is (it is what people see on the App Store) next to a teal site; do not recolour
it. There is no wordmark; set "AllerLens" in Fraunces 600.

**The App Store look:** the store screenshots put the app screen on solid teal `#235E6B` with a white Fraunces 600
caption above it, no device frame. That pairing (teal panel, white Fraunces, warm paper page) is a good base for the
site's hero and feature sections.

## Voice

Taken from the App Store listing and the app's own strings.

- Plain sentence case, short sentences, concrete words. Say what the app does, not how it feels.
- **Never promise safety.** No "safe to eat", "guaranteed", "100%", "protects you", or medical framing. The app's
  own line is that results are guidance and the user should confirm with restaurant staff. Keep a short version of
  that on the page (the App Store description ends with it).
- No dashes as punctuation, no "not X but Y" lines, no sales words, no stacks of three adjectives (the owner writes
  public copy with github.com/blader/humanizer rules).
- Middle dot " · " as a separator.

Usable lines from the App Store listing:
- Subtitle: "Scan menus. Spot allergens."
- Promo: "Scan a menu, open it from the QR code on the table, or upload a PDF. AllerLens translates it and checks
  every dish against the allergens you chose."
- "When it knows nothing about a dish, it marks it Ask staff and never calls it Safe."
- "There is no sign-up and no sign-in."
- "AllerLens uses AI, and AI makes mistakes. ... always confirm ingredients and preparation with restaurant staff
  before you order, especially if your allergy is severe."

## Assets (`handoff/assets`)

All screens are real app screens (iPhone 16 Pro Max simulator, 1320x2868, status bar 9:41). Menus are made-up test
menus (Corner Diner, Taberna El Puerto, Golden Lantern, Baan Siam, Trattoria Da Luca); do not caption them as real
restaurants. Profile in every shot: Peanuts and Sesame.

- `app-store/01` to `07`: the framed App Store images (teal, Fraunces caption). Usable as is in a carousel.
  - 01 Scan every page of the menu · 02 See what to avoid, and why · 03 Not sure? It tells you to ask ·
    04 Read menus in other languages · 05 Show staff your allergies · 06 Keep every restaurant you've checked ·
    07 Open the menu from a link or QR code
- `screens/light`: unframed screens from build 20 (the look is the same in 21), for your own phone mockups.
  Onboarding, results, each label's dish sheet, multi-page, show staff, saved, profile, plus
  `11-link-browser-light.png` from build 21 (a menu web page open in the app with **Read this menu**). The demo
  page in that shot was served from a test address, so its header reads "cornerdiner.localhost"; crop or cover the
  header if that looks odd on the site.
- `screens/dark`: a few dark mode screens (build 19; same design).
- `brand/`: `icon-1024.png` and cropped label badges for each tier in light and dark.

The phone mockup in `components/phone-mockup.tsx` can hold these screens; round the corners to match an iPhone
(about 12% of the width) rather than adding a heavy device frame.

## Suggested page

A suggestion, not a requirement:

1. Hero: icon, "AllerLens" in Fraunces, the subtitle, the App Store badge (use Apple's official badge artwork), one
   phone screen (results list).
2. Four ways in: camera, QR code, link, PDF.
3. The four labels, each with its dish sheet screenshot and one line on what it means.
4. Translation and the show-staff card.
5. Privacy: no account, stays on your phone, link to the privacy policy.
6. Limits: the AI-makes-mistakes line, confirm with staff.
7. FAQ rewritten from `docs/support.html`; footer with Support, Privacy, contact `allerlens.app@gmail.com`.

Support light and dark mode with the token pairs above (the app follows the phone's setting).
