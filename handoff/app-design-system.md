# AllerLens design handoff (for the waitlist website)

Taken from branch `release/1.1-redesign` at commit `aa5f857` (app version 1.1.0, iOS build 19).

**Rules used here**

- Every value is quoted from the code and comes with a file and line number.
- Units are React Native points (pt). On the web, 1 pt = 1 CSS px.
- "Not defined" means the repo has no value for it.
- Where the code holds two systems, this file follows what the app shows today and names the old one as old.

**Where the design lives.** Almost all of it is in one file, [src/theme.ts](src/theme.ts) (colors, type, radii, spacing, shadows), plus [src/motion.ts](src/motion.ts) (motion). Three other places hold older design values that the current screens do not use:

- [src/styles/theme.ts](src/styles/theme.ts) and [tailwind.config.js](tailwind.config.js): Tailwind-style blue, green, amber and red.
- [design/AllerLens_Flow_dc.html](design/AllerLens_Flow_dc.html): an early mockup that uses the fonts Manrope and IBM Plex Mono.

Do not copy from those three; section 1 says more.

---

## 1. Stack

| Item | Value | Source |
|---|---|---|
| Platforms | iOS (iPhone only, `supportsTablet: false`); an Android config exists | [app.json:22](app.json:22), [app.json:37-48](app.json:37) |
| Language | TypeScript ~5.9.2 | [package.json](package.json) (`typescript`) |
| UI framework | React Native 0.81.5 on Expo SDK ~54 | [package.json](package.json) (`react-native`, `expo`) |
| Navigation | React Navigation 6: bottom tabs and stack. No native headers: `headerShown: false` everywhere | [src/navigation/TabNavigator.tsx:38](src/navigation/TabNavigator.tsx:38), [:84](src/navigation/TabNavigator.tsx:84), [src/navigation/RootNavigator.tsx:14](src/navigation/RootNavigator.tsx:14) |
| Minimum iOS | 15.1 for the app, 16.2 for the second target in the project (likely the Live Activity widget). Both are in the generated `ios/` folder, which git ignores ([.gitignore:17](.gitignore:17)); no deployment target is set in `app.json` | `ios/Podfile:19`, `ios/AllerLens.xcodeproj/project.pbxproj:518, 580` |
| Animation | react-native-reanimated ~4.1.1, moti ^0.30.0, react-native-gesture-handler ~2.28.0. lottie-react-native and @shopify/react-native-skia are installed, but no `src/` file imports them | [package.json](package.json) |
| Glass and blur | @callstack/liquid-glass ^0.8.0 (tab bar on iOS 26+), expo-blur ~15.0.7, expo-linear-gradient ~15.0.8 | [package.json](package.json), [src/navigation/tabBarAppearance.tsx:3](src/navigation/tabBarAppearance.tsx:3) |
| Icons | Ionicons from `@expo/vector-icons` (no SF Symbols in the app UI) | [src/navigation/TabNavigator.tsx:5](src/navigation/TabNavigator.tsx:5) |
| Fonts | `@expo-google-fonts/fraunces` ^0.4.1 (only `Fraunces_600SemiBold` is loaded) plus the system font | [App.tsx:11](App.tsx:11), [App.tsx:65](App.tsx:65) |
| Haptics | expo-haptics ~15.0.7 | [src/utils/haptics.ts](src/utils/haptics.ts) |
| Styling | Plain `StyleSheet` objects built through `themedStyles()` ([src/theme.ts:58](src/theme.ts:58)). NativeWind and Tailwind are configured, but no file uses `className=` (0 uses in `src/`), so the Tailwind palette in [tailwind.config.js](tailwind.config.js) is not used | — |
| Localization | English and Spanish, picked from the phone's language | [src/i18n/index.ts:9-22](src/i18n/index.ts:9) |

---

## 2. Colors

Every color is a light/dark pair built with `dyn(light, dark)` ([src/theme.ts:50](src/theme.ts:50)). The app has no asset-catalog color sets of its own; the colorsets in the generated `ios/` folder are an Expo splash color plus two empty Xcode defaults (see the end of 2.4).

### 2.1 Core palette

| Token | Light | Dark | Role | Source |
|---|---|---|---|---|
| `bg` | `#F3F1EC` | `#111110` | Screen background ("warm paper" light, neutral charcoal dark). Also the background of the dish sheet and the staff-phrase sheet | [src/theme.ts:178](src/theme.ts:178) |
| `bgSubtle` | `#EAE7E0` | `#191918` | Input fills, chips, secondary buttons | [src/theme.ts:179](src/theme.ts:179) |
| `card` | `#FFFFFF` | `#1D1D1B` | Cards, grouped-list rows | [src/theme.ts:180](src/theme.ts:180) |
| `border` | `#DAD6CD` | `#30302D` | Hairline borders and dividers between rows | [src/theme.ts:181](src/theme.ts:181) |
| `borderSubtle` | `#E7EFF0` | `#272725` | Tab bar border (fallback only), highlighted row, selected chip | [src/theme.ts:182](src/theme.ts:182) |
| `profileCardBorder` | `#E6E2DA` | `#2C2C29` | Header hairline that fades in on scroll | [src/theme.ts:185](src/theme.ts:185), [src/screens/SavedScreen.tsx:572](src/screens/SavedScreen.tsx:572) |
| `ink` | `#16242A` | `#F2F1ED` | Primary text | [src/theme.ts:172](src/theme.ts:172) |
| `inkSecondary` | `#566869` | `#B0AEA6` | Secondary text, section headers, meta lines | [src/theme.ts:173](src/theme.ts:173) |
| `inkMuted` | `#5F6D6F` | `#9A988F` | Hints, placeholders, inactive tab | [src/theme.ts:174](src/theme.ts:174) |
| `inkFaint` | `#8A9696` | `#75736C` | Chevrons, disabled, empty-state icons | [src/theme.ts:175](src/theme.ts:175) |
| `brand` | `#235E6B` | `#7FC1CE` | Accent: links, active tab, selected heart and star, text buttons, progress fill | [src/theme.ts:168](src/theme.ts:168) |
| `brandFill` | `#235E6B` | `#2A6E7C` | Solid fills behind white text: primary button, selected allergen tile, switch track | [src/theme.ts:159](src/theme.ts:159) |
| `brandDark` | `#1B2A2D` | `#ECEBE6` | Pressed states, dark headers (code comment) | [src/theme.ts:169](src/theme.ts:169) |
| `onDark` | `#FFFFFF` | `#FFFFFF` | Text on `brandFill`, on the camera, on `inverseCard` | [src/theme.ts:155](src/theme.ts:155) |
| `inverseCard` | `#1C1C1A` | `#2B2B28` | The dark "show staff" phrase card (dark in both modes) | [src/theme.ts:162](src/theme.ts:162) |
| `cameraPlane` | `#0F0F0E` | `#0F0F0E` | Behind the live camera | [src/theme.ts:157](src/theme.ts:157) |
| `segmentTrack` | `#E6E3DB` | `#0B0B0A` | Segmented control track | [src/theme.ts:164](src/theme.ts:164) |
| `segmentThumb` | `#FFFFFF` | `#34342F` | Segmented control thumb | [src/theme.ts:165](src/theme.ts:165) |

How these map to the parts you asked about:

| Part | Color | Source |
|---|---|---|
| Page background | `bg` | [src/screens/SavedScreen.tsx:558](src/screens/SavedScreen.tsx:558), [src/components/MenuTranslationView.tsx:1086](src/components/MenuTranslationView.tsx:1086) |
| Cards and rows | `card` | [src/components/MenuTranslationView.tsx:1357](src/components/MenuTranslationView.tsx:1357) |
| Primary text | `ink` | [src/theme.ts:271](src/theme.ts:271) (`type.row`) |
| Secondary text | `inkSecondary` | [src/theme.ts:270](src/theme.ts:270) (`type.sectionHeader`) |
| Accent | `brand` | [src/theme.ts:168](src/theme.ts:168) |
| Dividers | `border`, as a hairline (`StyleSheet.hairlineWidth`, one device pixel) | [src/components/MenuTranslationView.tsx:1367-1370](src/components/MenuTranslationView.tsx:1367) |
| Tab bar | glass, or a translucent fill (see 5.4) | [src/navigation/tabBarAppearance.tsx:20-60](src/navigation/tabBarAppearance.tsx:20) |

Other tokens in the file:

- [src/theme.ts:184-231](src/theme.ts:184) holds per-screen tokens (`profile*`, `saved*`, `scan*`, `sheet*`, `results*`). Most simply repeat the colors above.
- `iosBlue #007AFF` ([src/theme.ts:234](src/theme.ts:234)) is defined but no screen uses it.

### 2.2 Verdict colors

**There are no badges in the dish list.** A verdict there is a 7 pt dot plus a colored text label, with no pill and no background. The pill-badge helpers in the theme (`riskBadgeStyle`, `resultsRiskBadgeStyle`, `riskCardStyle`, at [src/theme.ts:849-907](src/theme.ts:849)) are not used by any file.

Each tier has these roles ([src/theme.ts:86-91](src/theme.ts:86)):

- `color` is for the dot and other graphics only.
- `ink` is for text and is tuned to meet WCAG AA contrast.
- `bg` is the tinted block on the dish sheet.
- `border` is used by the warning banner.

| Verdict | Label shown | Text (`ink`) light / dark | Dot (`color`) light / dark | Tint (`bg`) light / dark | `border` light / dark | Source |
|---|---|---|---|---|---|---|
| Safe | "Safe" | `#1B6B45` / `#7FD4AC` | `#2F7D5F` / `#4FB58A` | `#EAF9EE` / `#16332A` | `#CDE9D8` / `#235043` | [src/theme.ts:93-99](src/theme.ts:93) |
| Caution ("to check") | "Caution" on rows and the sheet; "{n} to check" in the counts line | `#8A5A00` / `#EBC16A` | `#B9822A` / `#D9A441` | `#FBF3DF` / `#33290F` | `#EDDCB4` / `#57461C` | [src/theme.ts:100-106](src/theme.ts:100), [src/components/MenuTranslationView.tsx:647](src/components/MenuTranslationView.tsx:647) |
| Avoid (tier name `hidden`) | "Avoid" | `#9E2F1C` / `#FF9A85` | `#C0523F` / `#E0705B` | `#F9ECEA` / `#3A1D18` (**the pink box on the dish sheet**) | `#E8C3BC` / `#6A332A` | [src/theme.ts:107-116](src/theme.ts:107) |
| Ask staff (`noInfo`, not a tier) | "Ask staff" | `#4F6163` / `#C2C0B8` | `#93A0A0` / `#8F8D85` | `#ECEFEF` / `#2A2A27` | not defined | [src/theme.ts:128-136](src/theme.ts:128) |

Where each value is used:

- **Dish row:** the dot takes `color` and the label takes `ink` ([src/components/MenuTranslationView.tsx:970-985](src/components/MenuTranslationView.tsx:970)). The one-line reason under the dish name also takes `ink` ([:955-958](src/components/MenuTranslationView.tsx:955)).
- **Dish sheet verdict block:** a box filled with `bg`, with the label in `ink` ([src/components/DishTagsSheet.tsx:736-751](src/components/DishTagsSheet.tsx:736)). It has no border.
- **Counts line** ("1 to avoid · 2 to check · 5 safe · 1 ask staff"): each part in its tier's `ink` ([src/components/MenuTranslationView.tsx:638-664](src/components/MenuTranslationView.tsx:638), [src/screens/SavedScreen.tsx:119-125](src/screens/SavedScreen.tsx:119)).
- **Unused Avoid values:** `strong` (`#D70015` / `#FF6B5E`) and `cardBg` (`#FEF7F6` / `#2A1A18`) are defined ([src/theme.ts:110](src/theme.ts:110), [:114](src/theme.ts:114)) but no file uses them.
- **Dark phrase card:** the "ALLERGY" eyebrow is `#FF6B52` (`scanTintOnDark.hidden`, [src/theme.ts:147-149](src/theme.ts:147)).

### 2.3 Gradients, blur and opacity

| What | Value | Source |
|---|---|---|
| Camera title scrim (gradient) | `rgba(0,0,0,0.55)` → `rgba(0,0,0,0.22)` → `transparent` at stops 0, 0.55, 1 | [src/screens/ScanScreen.tsx:1420-1422](src/screens/ScanScreen.tsx:1420) |
| Modal scrim | `rgba(0,0,0,0.5)`; soft scrim (sheets) `rgba(0,0,0,0.4)` | [src/theme.ts:787-790](src/theme.ts:787) |
| "Reading the menu" scrim | `rgba(0,0,0,0.55)` | [src/theme.ts:207](src/theme.ts:207) |
| Text on the camera | `rgba(255,255,255,0.82)`; frame label `0.5`; frame corners `0.92`; shutter ring `0.35` | [src/theme.ts:203-206](src/theme.ts:203) |
| Tab bar | Liquid glass `effect="regular"` on iOS 26+. Fallback fill: `rgba(255,255,255,0.92)` light, `rgba(29,29,27,0.94)` dark | [src/navigation/tabBarAppearance.tsx:12](src/navigation/tabBarAppearance.tsx:12), [:39-47](src/navigation/tabBarAppearance.tsx:39) |
| Toast | `BlurView` with intensity 80 (`blur.large`) and `tint="light"` | [src/components/feedback/SuccessToast.tsx:112](src/components/feedback/SuccessToast.tsx:112), [src/motion.ts:92-99](src/motion.ts:92) |
| Blur scale (expo-blur intensity, 0–100) | small 20, medium 40, large 80 | [src/motion.ts:92-99](src/motion.ts:92) |
| Image outline | `rgba(0,0,0,0.1)`, 1 pt | [src/theme.ts:793-796](src/theme.ts:793) |
| Disabled opacity | 0.55 | [src/theme.ts:761](src/theme.ts:761) |
| Pressed opacity | 0.88, only on `TouchableOpacity` rows. The main press effect is a scale with no opacity change (see 7) | [src/theme.ts:760](src/theme.ts:760), [src/screens/ProfileScreen.tsx:338](src/screens/ProfileScreen.tsx:338) |

### 2.4 Brand green (outside the app UI)

The app icon, splash screen and Android icon use a **green that appears nowhere in the app UI**. Inside the app the accent is teal `#235E6B`.

- **Splash and Android icon background:** `#1FA44B` ([app.json:16](app.json:16), [app.json:40](app.json:40)).
- **Icon generator** ([scripts/generate_logo.py:9-11](scripts/generate_logo.py:9)) uses three greens:
  - primary `(31,164,75)` = `#1FA44B`
  - light `(52,190,100)` = `#34BE64`
  - dark `(24,140,60)` = `#188C3C`
- **The generated `ios/` folder** holds:
  - `SplashScreenBackground` = `#1FA44B`, an Expo-made color set.
  - `WidgetBackground` and `AccentColor`, empty Xcode default color sets with no value.

---

## 3. Typography

### 3.1 Families

| Family | Use | File / weight | License | Source |
|---|---|---|---|---|
| **Fraunces SemiBold** (`Fraunces_600SemiBold`) | Screen titles, venue names, section headers, the dish name on the dish sheet, empty-state titles | `node_modules/@expo-google-fonts/fraunces/600SemiBold/Fraunces_600SemiBold.ttf`, weight 600, loaded at launch. The font is not copied into the repo. Optical-size and other axis settings: not defined | SIL Open Font License 1.1 (package license "MIT AND OFL-1.1") | [src/theme.ts:243-247](src/theme.ts:243), [App.tsx:65](App.tsx:65) |
| **System** (SF Pro on iOS, `sans-serif` elsewhere) | Everything else | weights 400, 500, 600, 700 | — | [src/theme.ts:246-255](src/theme.ts:246) |

The approved design uses no monospace font and no uppercase eyebrow labels.

### 3.2 Which style each element uses

Letter spacing is 0 unless stated. Text case is whatever the string says: the app never transforms case, except one old grid view, `FoodGridView.tsx:446`, which no screen opens.

| Element | Style | Family | Size / line height | Weight | Letter spacing | Color | Source |
|---|---|---|---|---|---|---|---|
| Tab screen title ("Saved scans", "Profile") | `type.screenTitle` | Fraunces | 32 / 38 | 600 | −0.3 | `ink` | [src/theme.ts:269](src/theme.ts:269), [src/screens/SavedScreen.tsx:580-583](src/screens/SavedScreen.tsx:580) |
| Onboarding question ("What are you allergic to?") | `type.screenTitle` | Fraunces | 32 / 38 | 600 | −0.3 | `ink` | [src/screens/onboarding/OnboardingLayout.tsx:142-144](src/screens/onboarding/OnboardingLayout.tsx:142) |
| Restaurant title on results ("Corner Diner" is sample data, not in the repo) | `type.resultsVenueTitle` | Fraunces | 24 / 29 | 600 | −0.2 | `ink` | [src/theme.ts:395-401](src/theme.ts:395), [src/components/MenuTranslationView.tsx:1113-1115](src/components/MenuTranslationView.tsx:1113) |
| Dish name on the dish sheet | `screenTitle`, overridden | Fraunces | 28 / 33 | 600 | −0.3 | `ink` | [src/components/DishTagsSheet.tsx:972-976](src/components/DishTagsSheet.tsx:972) |
| Menu section header ("DESSERTS") | `type.h2` | Fraunces | 20 / 24 | 600 | −0.2 | `ink` | [src/theme.ts:261](src/theme.ts:261), [src/components/MenuTranslationView.tsx:1341-1344](src/components/MenuTranslationView.tsx:1341). Case comes from the menu text; no uppercase is applied |
| Original-language section name (beside the header) | `type.resultsSectionJa` | System | 13 / 17 | 400 | 0 | `inkFaint` | [src/theme.ts:450-455](src/theme.ts:450) |
| Restaurant group name on Saved; empty-state title | `type.h2` | Fraunces | 20 / 24 | 600 | −0.2 | `ink` | [src/screens/SavedScreen.tsx:613-615](src/screens/SavedScreen.tsx:613), [:667-670](src/screens/SavedScreen.tsx:667) |
| "Your menu is ready" | `type.h1` | Fraunces | 23 / 27 | 600 | −0.25 | `ink` | [src/theme.ts:259](src/theme.ts:259), [src/screens/ScanScreen.tsx:1973-1976](src/screens/ScanScreen.tsx:1973) |
| Dish name in the results list | `type.row` + weight 600 | **System** | 16 / 21 | 600 | 0 | `ink` | [src/components/MenuTranslationView.tsx:1378-1381](src/components/MenuTranslationView.tsx:1378). The theme comment says Fraunces is for dish names, but the list uses the system font |
| List row text and body (rows, sheet body, buttons) | `type.row` | System | 16 / 21 | 400 | 0 | `ink` | [src/theme.ts:271](src/theme.ts:271) |
| Counts line ("1 to avoid · 2 to check") | `type.row` + weight 600, tabular numbers | System | 16 / 21 | 600 | 0 | tier `ink` | [src/components/MenuTranslationView.tsx:1185-1189](src/components/MenuTranslationView.tsx:1185) |
| Verdict label on the dish sheet ("Avoid") | `type.row`, overridden | System | 20 / 25 | 700 | 0 | tier `ink` | [src/components/DishTagsSheet.tsx:988-993](src/components/DishTagsSheet.tsx:988) |
| Grouped-list section header ("Allergens", "Appearance", "Why") | `type.sectionHeader` | System | 13 / 18 | 400 | 0, sentence case | `inkSecondary` | [src/theme.ts:270](src/theme.ts:270) |
| Caption, meta, disclaimer ("Checked for … Guidance only …") | `type.footnote` | System | 13 / 18 | 400 | 0 | `inkMuted`, usually overridden to `inkSecondary` | [src/theme.ts:273](src/theme.ts:273), [src/components/MenuTranslationView.tsx:1190-1193](src/components/MenuTranslationView.tsx:1190) |
| Verdict label in a row ("Safe") | `type.footnote` + weight 600 | System | 13 / 18 | 600 | 0 | tier `ink` | [src/components/MenuTranslationView.tsx:1415-1418](src/components/MenuTranslationView.tsx:1415) |
| Dish reason line under the name | `type.footnote` + weight 500 | System | 13 / 18 | 500 | 0 | tier `ink` | [src/components/MenuTranslationView.tsx:1386-1390](src/components/MenuTranslationView.tsx:1386) |
| Primary button label ("Next", "Get started") | `type.row` + weight 600 | System | 16 / 21 | 600 | 0 | `onDark` | [src/screens/onboarding/OnboardingLayout.tsx:183-187](src/screens/onboarding/OnboardingLayout.tsx:183) |
| Text button and link row ("Report a problem with this result") | `type.row` | System | 16 / 21 | 400 | 0 | `brand` | [src/components/DishTagsSheet.tsx:1020-1026](src/components/DishTagsSheet.tsx:1020) |
| Segmented control label | `type.secondary` + weight 600 | System | 13 / 18 | 600 | 0 | `inkMuted`; selected `ink` | [src/components/SegmentedControl.tsx:138-146](src/components/SegmentedControl.tsx:138) |
| Tab bar label | `type.caption` + weight 600 | System | 11 / 14 | 600 | 0 | `brand` active, `inkMuted` inactive | [src/navigation/TabNavigator.tsx:113-118](src/navigation/TabNavigator.tsx:113) |
| Camera title "Scan a menu" | `type.scanTitle` | System | 18 / 23 | 700 | 0 | `#FFFFFF` | [src/theme.ts:347-352](src/theme.ts:347) |
| Staff phrase card: eyebrow / allergens / question | inline styles | System | 11/15 · 22/28 · 13/18 | 500 · 600 · 400 | 1.2 · 0 · 0 | `#FF6B52` · `#FFFFFF` · `rgba(255,255,255,0.82)` | [src/components/MenuTranslationView.tsx:1275-1298](src/components/MenuTranslationView.tsx:1275) |

The full type scale ([src/theme.ts:257-545](src/theme.ts:257)) also defines these base styles:

- `title` 16/20, weight 600
- `body` 15/21
- `secondary` 13/18
- `caption` 11/14
- `badge` 11, weight 600, letter spacing 0.2 (no screen uses it)

It also has more per-screen styles. The smallest size is 11 ([src/theme.ts:242](src/theme.ts:242)).

Text sizes grow with the iPhone's Dynamic Type setting. Only the camera overlay limits it, to 1.6× ([src/theme.ts:775-784](src/theme.ts:775)).

---

## 4. Shape and depth

### 4.1 Corner radii ([src/theme.ts:565-578](src/theme.ts:565))

| Token | Value | Used for |
|---|---|---|
| `pill` | 999 | Segmented control track and thumb, chips, small buttons, dots, tab bar capsule |
| `card` | 14 | Cards, grouped lists, action rows, verdict block, allergen tiles, primary onboarding button, phrase sheet and language sheet top corners |
| `readingCard` | 20 | Dish sheet top corners ([src/components/DishTagsSheet.tsx:942-943](src/components/DishTagsSheet.tsx:942)), "Reading the menu" card, staff phrase card |
| `savedCard` | 13 | defined; no current use found |
| `cardInner` | 11 | Text input, warning banner |
| `control` | 9 | Small buttons, icon tiles |
| `scanCorner` | 12 | Camera frame corners |
| `resultsBadge` | 8 | Only in the unused badge helper |

### 4.2 Borders

| Border | Value | Source |
|---|---|---|
| Card, row and grouped-list border | `StyleSheet.hairlineWidth` (one device pixel) in `border` | [src/screens/ProfileScreen.tsx:389-394](src/screens/ProfileScreen.tsx:389) |
| Row divider | hairline, inset 16 pt from the left | [src/screens/ProfileScreen.tsx:412-416](src/screens/ProfileScreen.tsx:412) |
| Rows inside one dish section | top hairline between rows, no inset | [src/components/MenuTranslationView.tsx:1367-1370](src/components/MenuTranslationView.tsx:1367) |
| Header hairline | 1 pt `profileCardBorder`, shown only once content scrolls under the header | [src/components/MenuTranslationView.tsx:1094-1101](src/components/MenuTranslationView.tsx:1094), [src/hooks/useScrollHeaderShadow.ts:25-33](src/hooks/useScrollHeaderShadow.ts:25) |
| Warning banner | 1 pt, Avoid `border` color | [src/components/IncompleteMenuBanner.tsx:51-60](src/components/IncompleteMenuBanner.tsx:51) |
| Text input | hairline in `brand` | [src/components/VenueConfirmationModal.tsx:280-288](src/components/VenueConfirmationModal.tsx:280) |

### 4.3 Shadows ([src/theme.ts:799-828](src/theme.ts:799))

Grouped lists, rows and the dish sheet have no shadow.

| Name | Color | Opacity | Blur radius | Offset | Used on |
|---|---|---|---|---|---|
| `card` | `#000000` | 0.06 | 10 | 0, 2 | Venue modal, toast, "menu is ready" card |
| `toggleKnob` | `#000000` | 0.15 | 3 | 0, 1 | Segmented control thumb |
| `readingCard` | `#000000` | 0.35 | 50 | 0, 20 | "Reading the menu" card |
| Tab bar (inline) | `#000000` | 0.12 | 28 | 0, 10 | Floating tab bar ([src/navigation/tabBarAppearance.tsx:50-55](src/navigation/tabBarAppearance.tsx:50)) |

### 4.4 Spacing ([src/theme.ts:581-589](src/theme.ts:581))

The scale is on a 4 pt grid: `xs 4 · s 8 · m 12 · l 16 · xl 20 · xxl 28`.

Screen padding:

| Screen | Horizontal padding | Source |
|---|---|---|
| Saved, Profile, onboarding | 20 (`spacing.xl`) | [src/screens/SavedScreen.tsx:597](src/screens/SavedScreen.tsx:597), [src/screens/ProfileScreen.tsx:363](src/screens/ProfileScreen.tsx:363), [src/screens/onboarding/OnboardingLayout.tsx:133](src/screens/onboarding/OnboardingLayout.tsx:133) |
| Results header | 22 | [src/theme.ts:662](src/theme.ts:662) |
| Results body | 18 | [src/theme.ts:664](src/theme.ts:664) |
| Dish sheet | 20 | [src/components/DishTagsSheet.tsx:966-971](src/components/DishTagsSheet.tsx:966) |

`spacing.screenX` is 16 ([src/theme.ts:588](src/theme.ts:588)) but is only used on the scan screens.

Gaps between groups and sections:

- Saved and Profile: 28 pt.
- Results: 16 pt.
- Dish sheet: 20 pt.

Minimum touch target is 44 pt ([src/theme.ts:765-769](src/theme.ts:765)). A list row is at least 50 pt tall (44 + 6). A Saved row is at least 56 pt (44 + 12).

---

## 5. Components

### 5.1 Segmented control (Restaurants | Dishes, and System | Light | Dark)
[src/components/SegmentedControl.tsx](src/components/SegmentedControl.tsx)

- **Track:**
  - background `segmentTrack` (`#E6E3DB` light / `#0B0B0A` dark)
  - radius 999
  - padding 3 ([:34](src/components/SegmentedControl.tsx:34), [:117-122](src/components/SegmentedControl.tsx:117))
- **Thumb:** one indicator that slides under the labels.
  - background `segmentThumb` (`#FFFFFF` / `#34342F`)
  - radius 999
  - shadow `toggleKnob` ([:123-131](src/components/SegmentedControl.tsx:123))
- **Segment:** equal widths, vertical padding 8 ([:132-137](src/components/SegmentedControl.tsx:132)).
- **Label:** system 13/18, weight 600.
  - Unselected: `inkMuted`.
  - Selected: `ink` ([:138-146](src/components/SegmentedControl.tsx:138)).
- **Motion:** the thumb slides in 250 ms with `cubic-bezier(0.22, 1, 0.36, 1)` ([:63-73](src/components/SegmentedControl.tsx:63)). A selection haptic plays on change ([:78](src/components/SegmentedControl.tsx:78)).
- **On Saved:** it sits 12 pt below the screen title ([src/screens/SavedScreen.tsx:593-595](src/screens/SavedScreen.tsx:593)).

### 5.2 Dish row (results list)
[src/components/MenuTranslationView.tsx:902-1000](src/components/MenuTranslationView.tsx:902), styles at [:1349-1423](src/components/MenuTranslationView.tsx:1349)

- **Layout:** each menu section is a grouped list. Rows are square in the middle and rounded 14 at the first and last row, with hairline `border` dividers.
  - Row: horizontal layout, background `card`, padding 16 horizontal × 14 vertical, gap 11.
- **Left column:**
  - Dish name: system 16/21 weight 600, up to 3 lines.
  - Original-language name: footnote 13/18, `inkMuted`.
  - Reason line for Caution and Avoid: 13/18 weight 500, in the tier `ink`, 4 pt above.
  - Price, optional: 13/18 tabular, `inkSecondary`.
- **Right column:** the verdict (dot + label), then a heart icon, with a 12 pt gap.
- **Highlighted row:** background `borderSubtle` ([:1371-1373](src/components/MenuTranslationView.tsx:1371)).
- **Interaction:**
  - Tap opens the dish sheet.
  - Long-press (380 ms) toggles the favorite.
  - Pressing scales the row to 0.98.

### 5.3 Verdict badge (dot + label)
[src/components/MenuTranslationView.tsx:968-986](src/components/MenuTranslationView.tsx:968), [:1410-1423](src/components/MenuTranslationView.tsx:1410)

- **Dot:** a 7 × 7 circle (radius 999) in the tier `color` ([src/theme.ts:691](src/theme.ts:691)).
- **Gap** between dot and label: 6 ([src/theme.ts:692](src/theme.ts:692)).
- **Label:** system 13/18 weight 600, in the tier `ink`.
- **Container:** none (no background or border).

The same dot + label pattern is used for Ask staff, with the `noInfo` colors.

### 5.4 Primary and secondary buttons

There is no shared Button component; each screen styles its own. These are the patterns in use:

| Pattern | Spec | Example | Source |
|---|---|---|---|
| **Action row** ("Show staff my allergies") | A card-like row, not a filled button: min height 50, padding 16 horizontal, background `card`, radius 14, hairline `border`; label `type.row` in `ink`; trailing `chevron-forward` 18 pt in `inkFaint` | results screen | [src/components/MenuTranslationView.tsx:718-727](src/components/MenuTranslationView.tsx:718), [:1194-1209](src/components/MenuTranslationView.tsx:1194) |
| **Grouped-list text row** ("Report a problem with this result") | Inside a `card` group (radius 14, hairline border); min height 50, padding 16 horizontal; label `type.row` in `brand`; no icon. Opens a native alert | dish sheet | [src/components/DishTagsSheet.tsx:908-916](src/components/DishTagsSheet.tsx:908), [:1006-1026](src/components/DishTagsSheet.tsx:1006) |
| **Primary filled** ("Next", "Get started") | min height 52, full width, radius 14, background `brandFill`; label 16/21 weight 600 `#FFFFFF`; press scale 0.98 | onboarding | [src/screens/onboarding/OnboardingLayout.tsx:175-187](src/screens/onboarding/OnboardingLayout.tsx:175) |
| **Primary pill** ("Yes") | min height 44, radius 999, background `brand`, label 13/18 weight 700 in `card` color | venue modal | [src/components/VenueConfirmationModal.tsx:353-366](src/components/VenueConfirmationModal.tsx:353) |
| **Secondary pill** ("Not now", "Change") | radius 999, background `bgSubtle`, label 13/18 weight 700 in `inkSecondary` or `brand` | venue modal | [src/components/VenueConfirmationModal.tsx:325-352](src/components/VenueConfirmationModal.tsx:325) |
| **Text button** ("Back", "Retake") | `brand` text, no background ("Retake" is 13/17 weight 700) | onboarding, results header | [src/screens/onboarding/OnboardingLayout.tsx:171-174](src/screens/onboarding/OnboardingLayout.tsx:171), [src/components/MenuTranslationView.tsx:1134-1137](src/components/MenuTranslationView.tsx:1134) |
| **Destructive row** ("Clear scans and settings") | `type.row` in Avoid `ink` | Profile | [src/screens/ProfileScreen.tsx:426-428](src/screens/ProfileScreen.tsx:426) |
| **Shutter** | outer 78 white with a 5 pt ring at `rgba(255,255,255,0.35)`; inner 56 disc in `brand` | camera | [src/screens/ScanScreen.tsx:1936-1954](src/screens/ScanScreen.tsx:1936), [src/theme.ts:739-741](src/theme.ts:739) |

### 5.5 Tab bar
[src/navigation/tabBarAppearance.tsx](src/navigation/tabBarAppearance.tsx), [src/navigation/TabNavigator.tsx](src/navigation/TabNavigator.tsx)

- **Shape:** a floating capsule.
  - Position: absolute, 16 from the left and right, 14 from the bottom (10 on Android).
  - Height 66, radius 999, no top border.
  - Padding: top 6, bottom 8 ([tabBarAppearance.tsx:26-49](src/navigation/tabBarAppearance.tsx:26), [src/theme.ts:647-651](src/theme.ts:647)).
- **Surface:**
  - iOS 26+: Liquid Glass (`effect="regular"`).
  - Older iOS: a fill of `rgba(255,255,255,0.92)` light or `rgba(29,29,27,0.94)` dark, with a hairline `borderSubtle` border.
- **Shadow:** black, opacity 0.12, blur 28, offset y 10.
- **Tints:** active `brand`, inactive `inkMuted`.
  - Over the camera they are fixed at active `#7FC1CE` and inactive `#E4E3DE`, and the glass is forced dark ([tabBarAppearance.tsx:8-9](src/navigation/tabBarAppearance.tsx:8), [:21-25](src/navigation/tabBarAppearance.tsx:21)).
- **Tabs:** three tabs (Scan, Saved, Profile) with Ionicons. Each icon is filled when selected and outlined when not:
  - `camera` / `camera-outline`
  - `bookmark` / `bookmark-outline`
  - `person` / `person-outline`

  Icon size is whatever React Navigation passes, with a fallback of 24 ([TabNavigator.tsx:125-206](src/navigation/TabNavigator.tsx:125)).
- **Labels:** 11/14 weight 600, 2 pt below the icon. Labels hide at accessibility text sizes (fontScale ≥ 1.5).
- **Behavior:** no animation on tab switch; a selection haptic plays ([TabNavigator.tsx:90-112](src/navigation/TabNavigator.tsx:90)).

### 5.6 Navigation header

There is no native navigation bar. Each screen draws its own header:

- Background `bg`, padding 22 horizontal and 15 at the bottom.
- The title is left-aligned in Fraunces: 32 on tab roots, 24 on the restaurant results screen.
- A 1 pt hairline fades in (150 ms, ease-out) once the content scrolls more than 1 pt ([src/screens/SavedScreen.tsx:560-583](src/screens/SavedScreen.tsx:560), [src/hooks/useScrollHeaderShadow.ts:28-30](src/hooks/useScrollHeaderShadow.ts:28)).
- The results header adds:
  - a back `chevron-back` 22 pt in `inkSecondary`
  - a save `star` / `star-outline` 20 pt
  - a "Retake" text button
  - a meta line (13/18 footnote) ([src/components/MenuTranslationView.tsx:519-617](src/components/MenuTranslationView.tsx:519))

### 5.7 Sheets and modals

| Surface | Spec | Source |
|---|---|---|
| **Dish sheet** | RN `Modal` with `animationType="slide"`; scrim `rgba(0,0,0,0.4)`; sheet background `bg`, top radius 20, height 92%; header with `chevron-down` (close) and `heart` 22 pt in 44 pt targets; content padding 20, gap 20 | [src/components/DishTagsSheet.tsx:683-716](src/components/DishTagsSheet.tsx:683), [:934-971](src/components/DishTagsSheet.tsx:934) |
| **Verdict block** (inside the dish sheet) | tier `bg`, radius 14, padding 16 horizontal × 14 vertical, gap 4; label 20/25 weight 700; body lines 16/21 | [src/components/DishTagsSheet.tsx:982-996](src/components/DishTagsSheet.tsx:982) |
| **Staff phrase sheet** | RN `Modal` slide; background `bg`, top radius 14; inside it a dark `inverseCard` card, radius 20, padding 16 × 12 | [src/components/MenuTranslationView.tsx:1009-1050](src/components/MenuTranslationView.tsx:1009), [:1239-1268](src/components/MenuTranslationView.tsx:1239) |
| **Center modal** (venue confirm, pre-permission) | `MotionModal`; card width 85% (max 400), background `card`, radius 14, padding 16, shadow `card`; scrim `rgba(0,0,0,0.5)` | [src/components/VenueConfirmationModal.tsx:203-220](src/components/VenueConfirmationModal.tsx:203) |
| **Bottom panel** (language picker) | `MotionModal variant="panel"`; background `card`, top radius 14; scrim `rgba(0,0,0,0.4)` | [src/components/LanguageSelector.tsx:93-96](src/components/LanguageSelector.tsx:93), [:223-229](src/components/LanguageSelector.tsx:223) |
| **Toast** | absolute position, 20 from the left and right, radius 14, blur (intensity 80, light); 40 pt round icon tile in the tier `bg`; message 15/21 weight 600; stays 2000 ms | [src/components/feedback/SuccessToast.tsx:101-158](src/components/feedback/SuccessToast.tsx:101) |
| **Warning banner** ("This is not the whole menu") | Avoid `bg`, 1 pt Avoid `border`, radius 11, padding 16; `alert-circle` 20 pt; title 16/20 weight 600 in Avoid `ink` | [src/components/IncompleteMenuBanner.tsx:35-75](src/components/IncompleteMenuBanner.tsx:35) |

### 5.8 Text input

The only text field in the app is the restaurant name ([src/components/VenueConfirmationModal.tsx:127-151](src/components/VenueConfirmationModal.tsx:127), [:280-304](src/components/VenueConfirmationModal.tsx:280)):

- **Container:** background `bgSubtle`, radius 11, hairline border in `brand`.
- **Text:** system 15/21 weight 600 in `ink`, padding 12, min height 44.
- **Placeholder:** `inkMuted`, reading "e.g., La Bella Italia".
- **Clear button:** `close-circle` 20 pt in `inkMuted`.

### 5.9 Toggles

- **Switch:** the native iOS `Switch`. Only the "on" track color is set, to `brandFill`; the knob and "off" track colors are not set, so iOS defaults apply ([src/screens/ProfileScreen.tsx:205-210](src/screens/ProfileScreen.tsx:205), [src/screens/onboarding/PreferencesScreen.tsx:66-70](src/screens/onboarding/PreferencesScreen.tsx:66)).
  - The theme also defines custom toggle sizes (46 × 28, knob 22, [src/theme.ts:606-610](src/theme.ts:606)), but no file uses them.
- **Allergen tile** (a 3 × 3 checkbox grid):
  - Each tile is 31.6% wide, radius 14, background `card`, hairline `border` ([src/components/AllergenGrid.tsx:55-91](src/components/AllergenGrid.tsx:55)).
  - Selected: background `brandFill`, white label at weight 600, white `checkmark-circle` 16 pt in the top-right corner.

### 5.10 Appearance setting

On Profile, under the "Appearance" section header, a segmented control offers **System | Light | Dark** ([src/screens/ProfileScreen.tsx:46-49](src/screens/ProfileScreen.tsx:46), [:216-224](src/screens/ProfileScreen.tsx:216)).

- The footer reads: "System follows your iPhone's Light or Dark setting."
- The choice is stored in NSUserDefaults under the key `allerlens.appearance` ([src/theme.ts:19-35](src/theme.ts:19)).

### 5.11 Grouped list (Profile, onboarding, dish sheet)

- Background `card`, radius 14, hairline `border` ([src/screens/ProfileScreen.tsx:389-394](src/screens/ProfileScreen.tsx:389)).
- Rows: min height 50, padding 16 horizontal.
- Dividers: hairline, inset 16 from the left.
- Section header: 13/18 `inkSecondary`, sentence case, 4 pt side inset, 8 pt above the group.
- Footer: 13/18, 8 pt below the group.

---

## 6. Icons and brand

**Icon set.** All app icons are Ionicons ([src/navigation/TabNavigator.tsx:5](src/navigation/TabNavigator.tsx:5)). Names found in the code:

| Purpose | Ionicons names |
|---|---|
| Tabs | `camera`, `camera-outline`, `bookmark`, `bookmark-outline`, `person`, `person-outline` |
| Navigation | `chevron-back`, `chevron-forward`, `chevron-down`, `chevron-up`, `arrow-back`, `arrow-forward`, `arrow-up-outline` (rotated 45° for an external link) |
| Save and favorite | `heart`, `heart-outline`, `star`, `star-outline` |
| Status | `checkmark`, `checkmark-circle`, `close`, `close-circle`, `alert`, `alert-circle`, `information-circle` |
| Other | `language`, `language-outline`, `swap-horizontal`, `location-outline`, `pencil-outline`, `sparkles-outline`, `images-outline`, `flashlight`, `document-text-outline`, `document-outline` |

The Live Activity widget is the only place that uses an SF Symbol: `text.viewfinder` ([plugins/liveActivity/LiveActivityWidget.swift:195](plugins/liveActivity/LiveActivityWidget.swift:195)).

**Allergen icons are emoji:**

| Allergen | Emoji |
|---|---|
| peanut | 🥜 |
| tree nut | 🌰 |
| dairy | 🥛 |
| egg | 🥚 |
| gluten | 🌾 |
| soy | 🫘 |
| fish | 🐟 |
| shellfish | 🦐 |
| sesame | 🌱 |

They are defined in [src/types/preferences.ts:57-67](src/types/preferences.ts:57). The code has a slot for illustrated artwork, but it is empty (`ARTWORK = {}`, [src/components/AllergenIcon.tsx:10](src/components/AllergenIcon.tsx:10)), so emoji are what users see. No allergen artwork files are in the repo.

**App icon and logo.** These are generated PNGs. There is no SVG or other vector version anywhere in the repo.

| File | Size | What it shows |
|---|---|---|
| [assets/icon.png](assets/icon.png) | 1024 × 1024 | Green vertical gradient (`#34BE64` → `#188C3C`) with four white rounded "scan bracket" corners |
| [assets/adaptive-icon.png](assets/adaptive-icon.png) | 1024 × 1024 | Android foreground, same mark |
| [assets/splash.png](assets/splash.png) | 1242 × 2436 | Green gradient with a small bracket mark in the center |
| [assets/favicon.png](assets/favicon.png) | 48 × 48 | — |
| [assets/liveActivity/allerlens_icon.png](assets/liveActivity/allerlens_icon.png) | 76 × 76 | — |

All five are drawn by [scripts/generate_logo.py](scripts/generate_logo.py). For the icon, the strokes are 5% of the icon's size, the arms 17% and the inset 24% ([:104-107](scripts/generate_logo.py:104)). The bracket geometry could be redrawn as SVG from those numbers.

**Wordmark.** None exists: no logotype file and no styled "AllerLens" title. Inside the app, the name appears only:

- in plain copy, and
- as the Profile footer "AllerLens {version}", in footnote 13/18, `inkMuted`, centered ([src/screens/ProfileScreen.tsx:347](src/screens/ProfileScreen.tsx:347), [:457-461](src/screens/ProfileScreen.tsx:457)).

It is always written "AllerLens" (capital A, capital L).

---

## 7. Motion

Tokens are in [src/motion.ts](src/motion.ts). They follow the transitions.dev scale. Every animation respects the iPhone's Reduce Motion setting ([src/motion.ts:105](src/motion.ts:105), [:244-247](src/motion.ts:244)).

**Durations** ([:28-43](src/motion.ts:28)):

| Token | ms |
|---|---|
| stagger | 40 |
| micro | 80 |
| quick | 150 |
| fast | 250 |
| medium | 350 |
| slow | 400 |
| verySlow | 500 |

**Easing curves** ([:47-60](src/motion.ts:47)):

| Token | Curve |
|---|---|
| smoothOut (the main one) | `cubic-bezier(0.22, 1, 0.36, 1)` |
| inOut | ease-in-out |
| out | ease-out |
| bounce | `cubic-bezier(0.34, 1.36, 0.64, 1)` |
| bounceStrong | `cubic-bezier(0.34, 3.85, 0.64, 1)` |

**Distances:** 4, 6, 8, 12, 30 pt ([:63-74](src/motion.ts:63)).

**Scales:** 0.96 modal, 0.97, 0.98, 0.99 ([:77-86](src/motion.ts:77)).

**Springs** ([:154-159](src/motion.ts:154)):

| Spring | Duration | Damping ratio |
|---|---|---|
| press | 150 ms | 1 |
| release | 250 ms | 0.7 (slight overshoot) |
| entrance | 350 ms | 0.9 |

What happens on screen:

| Moment | Motion | Source |
|---|---|---|
| Press on any tappable thing | Scales to 0.98 for cards and rows, 0.96 for small controls, using the press spring; springs back with a slight overshoot. No opacity change | [src/components/animated/PressableScale.tsx:79-94](src/components/animated/PressableScale.tsx:79), [src/theme.ts:755-763](src/theme.ts:755) |
| Scan in progress | Progress bar fills over 700 ms (smoothOut); step labels change from pending to active to done | [src/components/ScanProcessingOverlay.tsx:77](src/components/ScanProcessingOverlay.tsx:77) |
| Scan finishes | Success haptic, then a 600 ms pause, then the next screen | [src/screens/ScanScreen.tsx:622-624](src/screens/ScanScreen.tsx:622) |
| "Your menu is ready" card | Fades in and rises 12 pt over 250 ms (smoothOut), items staggered 80 ms | [src/screens/ScanScreen.tsx:155-156](src/screens/ScanScreen.tsx:155), [:1600-1604](src/screens/ScanScreen.tsx:1600) |
| **Results appear** | Each dish row fades from opacity 0 to 1 and rises 8 pt over 250 ms (smoothOut). Each row starts 40 ms after the previous one, and the delay stops growing after 6 rows | [src/components/MenuTranslationView.tsx:902-909](src/components/MenuTranslationView.tsx:902), [src/motion.ts:188](src/motion.ts:188), [:204-205](src/motion.ts:204) |
| Scan sub-pages (camera → ready → results) | The new page slides in from the right over 250 ms (smoothOut); the old page moves 25% the other way (parallax). Swipe back commits past 30% of the width and follows the finger | [src/components/animated/SwipeBackPage.tsx:47](src/components/animated/SwipeBackPage.tsx:47), [:58](src/components/animated/SwipeBackPage.tsx:58), [:182-236](src/components/animated/SwipeBackPage.tsx:182) |
| Stack pushes (Saved → restaurant → results) | React Navigation stack default; no custom transition is set | [src/navigation/TabNavigator.tsx:55-63](src/navigation/TabNavigator.tsx:55) |
| Dish sheet and staff sheet | Native iOS slide-up (`animationType="slide"`); timing is set by the system | [src/components/DishTagsSheet.tsx:684](src/components/DishTagsSheet.tsx:684) |
| Center modal | Scrim fades in; the card scales from 0.96 to 1 and fades in over 250 ms (smoothOut); it closes in 150 ms | [src/components/animated/MotionModal.tsx:47-127](src/components/animated/MotionModal.tsx:47), [src/motion.ts:190-191](src/motion.ts:190) |
| Bottom panel | Slides up from the bottom of the screen over 400 ms; closes in 350 ms | [src/motion.ts:193-194](src/motion.ts:193) |
| Toast | Enters from 12 pt off its edge at 0.96 scale over 250 ms; leaves in 150 ms | [src/components/feedback/SuccessToast.tsx:49-110](src/components/feedback/SuccessToast.tsx:49), [src/motion.ts:167-168](src/motion.ts:167) |
| Favorite heart | On adding: scales to 1.25 and back, with a success haptic. On removing: no scale, a light haptic | [src/components/animated/FavoriteHeart.tsx:48-59](src/components/animated/FavoriteHeart.tsx:48) |
| Segmented control | Thumb slides 250 ms (smoothOut) | [src/components/SegmentedControl.tsx:63-73](src/components/SegmentedControl.tsx:63) |
| Tab switch | No animation, on purpose | [src/navigation/TabNavigator.tsx:90-93](src/navigation/TabNavigator.tsx:90) |

**Haptics** ([src/utils/haptics.ts](src/utils/haptics.ts)):

| Haptic | When |
|---|---|
| Selection | Tab switch, segment change |
| Light impact | Shutter (the `HapticButton` default) |
| Success notification | Scan complete, favorite added |
| Light impact | Favorite removed |

---

## 8. Dark mode

**Supported: yes.** `userInterfaceStyle: "automatic"` ([app.json:8](app.json:8)).

**Setting:** the app follows the system by default. Profile → Appearance has an in-app override: System / Light / Dark ([src/screens/ProfileScreen.tsx:216-224](src/screens/ProfileScreen.tsx:216)).

**How it works:**

- Changing the setting swaps every color token and redraws the whole app ([App.tsx:67-77](App.tsx:67), [src/theme.ts:553-562](src/theme.ts:553)).
- Colors are plain strings, not iOS dynamic colors ([src/theme.ts:48-50](src/theme.ts:48)).

**Dark palette:**

- Neutral warm charcoal: `bg #111110`, `card #1D1D1B`.
- Teal stays on accents only; no dark surface is tinted teal.

**What looks different in dark mode:**

- **Accent:** `brand` lightens from `#235E6B` to `#7FC1CE` (links, active tab, hearts). Solid fills use `brandFill #2A6E7C` instead, so white text stays readable.
- **Verdict tints:** the light blocks become deep tints (e.g. the Avoid box goes from `#F9ECEA` to `#3A1D18`), and the verdict text gets lighter (Avoid `#FF9A85`).
- **Segmented control:** the track gets darker than the page (`#0B0B0A`), with a lighter thumb (`#34342F`).
- **Places that stay light in dark mode:**
  - The toast blur is hard-coded to `tint="light"` ([src/components/feedback/SuccessToast.tsx:112](src/components/feedback/SuccessToast.tsx:112)).
  - The image placeholder blur is also light ([src/components/animated/ImageWithPlaceholder.tsx:48](src/components/animated/ImageWithPlaceholder.tsx:48)).
- **Places that look the same in both modes:**
  - The camera screen (`#0F0F0E`, white text) and the dark tab bar over it.
  - The staff phrase card (`inverseCard`).
- **Screens still on the old light-only palette** ([src/styles/theme.ts](src/styles/theme.ts)): FoodGridView, DishImageCarousel, FullscreenGalleryModal, ExploreScreen, SyncChoiceScreen. In 1.1, none of them can be reached:
  - Explore is commented out of the tab bar ([src/navigation/TabNavigator.tsx:156-172](src/navigation/TabNavigator.tsx:156)).
  - Community photos and accounts are switched off ([src/config/features.ts:7](src/config/features.ts:7), [:13](src/config/features.ts:13)).
  - Nothing opens the food-pictures view.

---

## 9. Voice

### Verdicts

- **Tier labels:** "Safe", "Caution", "Avoid", "Ask staff" ([src/theme.ts:98](src/theme.ts:98), [:105](src/theme.ts:105), [:115](src/theme.ts:115), [:132](src/theme.ts:132)).
- **Counts line:** "{n} to avoid" · "{n} to check" · "{n} safe" · "{n} ask staff" ([src/components/MenuTranslationView.tsx:641-661](src/components/MenuTranslationView.tsx:641)).
- **Dish sheet lines:**
  - "Contains {allergens}."
  - "May contain {allergens}."
  - "No match found for your allergens." ([src/components/DishTagsSheet.tsx:627-633](src/components/DishTagsSheet.tsx:627))
- **Ask staff explanation:** "The menu gives no ingredients for this dish and nothing in its name matched an allergen. That is not the same as safe. Ask staff before ordering." ([src/theme.ts:133-135](src/theme.ts:133))
- **Disclaimers:**
  - "Checked for {allergens}. Guidance only. Always confirm ingredients with restaurant staff." ([src/components/MenuTranslationView.tsx:685](src/components/MenuTranslationView.tsx:685))
  - "Checked for {allergens}. This is guidance, not medical advice. Always confirm with restaurant staff." ([src/components/DishTagsSheet.tsx:921](src/components/DishTagsSheet.tsx:921))
- **Staff phrase card:**
  - eyebrow "ALLERGY"
  - the allergens joined with " · "
  - "Does this dish contain any of these ingredients?" ([src/services/staffPhrase.ts:62-66](src/services/staffPhrase.ts:62))

### Empty states

- "No saved scans yet" / "Scan a menu and it shows up here. Tap the star on a result to keep the restaurant." ([src/screens/SavedScreen.tsx:458-460](src/screens/SavedScreen.tsx:458))
- "No favorite dishes yet" / "Tap the heart on any dish in a scan to find it here later." ([src/screens/SavedScreen.tsx:467-469](src/screens/SavedScreen.tsx:467))
- "No menu loaded" / "Scan a menu to see the translation" and "No dishes found" / "Try scanning again with better lighting or a closer photo." ([src/components/MenuTranslationView.tsx:457-471](src/components/MenuTranslationView.tsx:457))
- "Set your allergens to see safety checks" ([src/components/MenuTranslationView.tsx:703](src/components/MenuTranslationView.tsx:703))

### Errors

- **Scan error titles:** "Request Timed Out", "Connection Error", "Server Error", "Try Again Later", "No Text Detected", "No Menu Found", "Scan Error"; buttons "Try Again" / "Cancel" ([src/screens/ScanScreen.tsx:660-679](src/screens/ScanScreen.tsx:660)).
- **Offline:** "You’re offline" / "Connect to the internet to scan a new menu. You can still view saved scans." ([src/screens/ScanScreen.tsx:862-863](src/screens/ScanScreen.tsx:862))
- **Report flow:**
  - "Report a problem" / "What's wrong with this result?"
  - Choices: "Not an allergen", "Wrong dish", "Price parsed wrong", "Other"
  - Afterwards: "Thank You" / "Your report was sent. It helps us improve!" ([src/components/DishTagsSheet.tsx:649-678](src/components/DishTagsSheet.tsx:649))
- **Incomplete menu:** "This is not the whole menu" ([src/components/IncompleteMenuBanner.tsx:43](src/components/IncompleteMenuBanner.tsx:43)).

### Onboarding

1. "Step 1 of 3" · "What are you allergic to?" · "We'll flag risky dishes on every menu you scan. You can change this later in Profile." · "AllerLens helps you spot risks. It doesn't replace checking with staff." ([src/screens/onboarding/AllergensScreen.tsx:21-24](src/screens/onboarding/AllergensScreen.tsx:21))
2. "How should menus look?" · "Pick the language to translate into and whether to show prices." ([src/screens/onboarding/PreferencesScreen.tsx:24-25](src/screens/onboarding/PreferencesScreen.tsx:24))
3. "Camera and location" · "The camera scans menus. Location is optional and fills in the restaurant's name for you." · button "Get started" ([src/screens/onboarding/PermissionsScreen.tsx:81-83](src/screens/onboarding/PermissionsScreen.tsx:81))

### Scan flow

- Camera title: "Scan a menu"
- Camera hint: "Point at the menu. We'll translate it and flag your allergens." ([src/screens/ScanScreen.tsx:1439](src/screens/ScanScreen.tsx:1439), [:1494](src/screens/ScanScreen.tsx:1494))
- While processing: "Reading the menu…"; steps "Detecting text…", "Translating menu…", "Checking your allergens" ([src/components/ScanProcessingOverlay.tsx:42-53](src/components/ScanProcessingOverlay.tsx:42), [:132](src/components/ScanProcessingOverlay.tsx:132))
- Privacy note: "Your photo is sent to our server to be read and is not stored. Your allergen list stays on this phone." ([src/components/ScanProcessingOverlay.tsx:136](src/components/ScanProcessingOverlay.tsx:136))

### Tagline and App Store copy ([docs/APP_STORE_LISTING.md](docs/APP_STORE_LISTING.md))

- **Subtitle:** "Scan menus. Spot allergens." ([:36](docs/APP_STORE_LISTING.md:36))
- **Promotional text:** "Point your camera at a menu and get it translated, with every dish checked against the allergens you chose. No account needed." ([:42](docs/APP_STORE_LISTING.md:42))
- **Description opener:** "AllerLens turns a restaurant menu into something you can actually read, and checks it against your own allergies, in about the time it takes to sit down." ([:64](docs/APP_STORE_LISTING.md:64))
- **Phrases the copy must avoid:** "guaranteed", "100%", "safe to eat", and medical framing ([:99-103](docs/APP_STORE_LISTING.md:99)). The listing deliberately avoids promising safety ([:45-46](docs/APP_STORE_LISTING.md:45)).
- **Support and privacy pages** are already hosted on the waitlist site: `https://userlaws.github.io/Allerlens-waitlist/support.html` and `/privacy-policy.html` ([:111-112](docs/APP_STORE_LISTING.md:111)).

### Tone, from the strings above

- Plain sentence case.
- Short declaratives.
- Never claims a dish is safe without saying "guidance".
- Uses a middle dot " · " as the separator.
- The app is in English and Spanish. In Spanish the tiers read "Seguro, Precaución, Evitar, Preguntar al personal" ([docs/APP_STORE_LISTING.md:21](docs/APP_STORE_LISTING.md:21)). The string table is [src/i18n/ui.es.ts](src/i18n/ui.es.ts).

---

## 10. Key tokens for the website

| # | Token | Light | Dark | Source |
|---|---|---|---|---|
| 1 | Page background | `#F3F1EC` | `#111110` | [src/theme.ts:178](src/theme.ts:178) |
| 2 | Card / surface | `#FFFFFF` | `#1D1D1B` | [src/theme.ts:180](src/theme.ts:180) |
| 3 | Hairline border / divider | `#DAD6CD` | `#30302D` | [src/theme.ts:181](src/theme.ts:181) |
| 4 | Primary text | `#16242A` | `#F2F1ED` | [src/theme.ts:172](src/theme.ts:172) |
| 5 | Secondary text | `#566869` | `#B0AEA6` | [src/theme.ts:173](src/theme.ts:173) |
| 6 | Accent (links, active) | `#235E6B` | `#7FC1CE` | [src/theme.ts:168](src/theme.ts:168) |
| 7 | Solid button fill (white text) | `#235E6B` | `#2A6E7C` | [src/theme.ts:159](src/theme.ts:159) |
| 8 | Safe: text / dot / tint | `#1B6B45` / `#2F7D5F` / `#EAF9EE` | `#7FD4AC` / `#4FB58A` / `#16332A` | [src/theme.ts:94-96](src/theme.ts:94) |
| 9 | Caution: text / dot / tint | `#8A5A00` / `#B9822A` / `#FBF3DF` | `#EBC16A` / `#D9A441` / `#33290F` | [src/theme.ts:101-103](src/theme.ts:101) |
| 10 | Avoid: text / dot / tint | `#9E2F1C` / `#C0523F` / `#F9ECEA` | `#FF9A85` / `#E0705B` / `#3A1D18` | [src/theme.ts:108-111](src/theme.ts:108) |
| 11 | Ask staff: text / dot / tint | `#4F6163` / `#93A0A0` / `#ECEFEF` | `#C2C0B8` / `#8F8D85` / `#2A2A27` | [src/theme.ts:129-131](src/theme.ts:129) |
| 12 | Display font | Fraunces SemiBold 600; title 32/38, letter spacing −0.3 | same | [src/theme.ts:245](src/theme.ts:245), [:269](src/theme.ts:269) |
| 13 | Body font | System (SF Pro): row 16/21 at 400; label 13/18 at 600; caption 13/18 at 400 | same | [src/theme.ts:246](src/theme.ts:246), [:271-273](src/theme.ts:271) |
| 14 | Radius | card 14 · sheet 20 · pill 999 · input 11 | same | [src/theme.ts:565-578](src/theme.ts:565) |
| 15 | Spacing / page padding | 4 · 8 · 12 · 16 · 20 · 28; page sides 20; group gap 28 | same | [src/theme.ts:581-589](src/theme.ts:581) |
| 16 | Card shadow | `0 2px 10px rgba(0,0,0,0.06)` | same | [src/theme.ts:801-809](src/theme.ts:801) |
| 17 | Main easing / duration | `cubic-bezier(0.22,1,0.36,1)`, 250 ms; stagger 40 ms; rise 8 px | same | [src/motion.ts:36](src/motion.ts:36), [:49](src/motion.ts:49) |

Notes:

- **Row 16:** iOS shadow radius 10 is written here as CSS blur 10px. iOS and CSS blur do not match exactly.
- **Logo:** if the site shows the app icon, it is the green `#1FA44B` mark from section 2.4. Inside the app the accent is teal; the two do not match today.
