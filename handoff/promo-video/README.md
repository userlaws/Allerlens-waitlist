# AllerLens promo video (Nov 10 2026)

A 41 second promo built from real AllerLens 1.1.0 (21) footage: a simulator recording of a menu read from a link, the
results list, a dish sheet and the staff card, plus four real screens from the App Store set. It has no sound, so it can
autoplay muted on the site. The look matches the App Store images: teal `#235E6B`, white Fraunces 600 captions, the
warm paper `#F3F1EC` title and end cards.

The menu in the footage is the made-up Corner Diner test page. The in-app browser's address bar was changed to read
"cornerdiner" because the page was served from a test address.

## Files

| File | Use |
| --- | --- |
| `public/video/allerlens-promo.mp4` | 1920x1080, 41.2 s, H.264, 7.7 MB. Desktop hero or "watch it" section |
| `public/video/allerlens-promo-vertical.mp4` | 1080x1920, same cut, 7.0 MB. Phones, Instagram Reels, TikTok, YouTube Shorts |
| `public/video/allerlens-promo-poster.jpg` | First frame stand-in for the landscape video (results list) |
| `public/video/allerlens-promo-vertical-poster.jpg` | Poster for the vertical video |
| `public/video/allerlens-promo.en.vtt` / `.es.vtt` | Captions with the on-screen text, English and Spanish |

Higher bitrate masters for uploading to YouTube and social sites are on the Mac at `~/Desktop/AllerLens-Promo/`
(`allerlens-promo-landscape.mp4` 14 MB, `allerlens-promo-vertical.mp4` 22 MB). The web files above are fine to upload
too if the masters are not at hand.

## Putting it on the site

Show the landscape file above 768 px and the vertical one below it, lazy loaded, muted, with captions:

```tsx
<video
  className="w-full rounded-[14px]"
  autoPlay
  muted
  loop
  playsInline
  preload="none"
  poster="/video/allerlens-promo-poster.jpg"
  aria-label="AllerLens demo: a restaurant menu opened from a link, each dish labelled Safe, Caution, Avoid or Ask staff, and the card that shows staff your allergies"
>
  <source media="(max-width: 767px)" src="/video/allerlens-promo-vertical.mp4" type="video/mp4" />
  <source src="/video/allerlens-promo.mp4" type="video/mp4" />
  <track kind="captions" src="/video/allerlens-promo.en.vtt" srcLang="en" label="English" default />
  <track kind="captions" src="/video/allerlens-promo.es.vtt" srcLang="es" label="Español" />
</video>
```

`<source media>` is honoured by Safari and by Chrome 120 and later. If that matters, pick the file in React from a media
query instead. Respect `prefers-reduced-motion`: do not autoplay then, show the poster with a play button.

Put a short text summary next to the video. Search engines read text, not the pixels of a video:

> Scan the menu, every page, or open it from a link or the QR code on the table. Every dish gets a label: Safe,
> Caution, Avoid or Ask staff. Tap a dish to see why. Show staff a card with your allergies, in the menu's language.

## Structured data (VideoObject)

Add this next to the existing SoftwareApplication JSON-LD in `app/layout.tsx`, or on the page that shows the video.
Replace the domain if the site is not on www.allerlens.app. `uploadDate` is the day the video goes live on the site.

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "AllerLens: scan a restaurant menu for food allergens",
  "description": "AllerLens reads a restaurant menu from a photo, a link or a QR code, translates it, and labels every dish Safe, Caution, Avoid or Ask staff for the allergens you chose. Free for iPhone.",
  "thumbnailUrl": ["https://www.allerlens.app/video/allerlens-promo-poster.jpg", "https://www.allerlens.app/video/allerlens-promo-vertical-poster.jpg"],
  "uploadDate": "2026-11-10",
  "duration": "PT41S",
  "contentUrl": "https://www.allerlens.app/video/allerlens-promo.mp4",
  "inLanguage": "en",
  "publisher": { "@type": "Person", "name": "Imanol Aracena" }
}
```

If the video is also uploaded to YouTube, add `"embedUrl": "https://www.youtube.com/embed/<id>"`.

Google indexes a video only when it is the main content of a page or clearly featured, so give it its own heading
("See it work" or similar) and keep it high on the page. A `/video` page is not needed.

## Sitemap

The site has no `app/sitemap.ts` or `app/robots.ts` yet. Add both. A video entry in the sitemap helps discovery:

```xml
<url>
  <loc>https://www.allerlens.app/</loc>
  <video:video>
    <video:thumbnail_loc>https://www.allerlens.app/video/allerlens-promo-poster.jpg</video:thumbnail_loc>
    <video:title>AllerLens: scan a restaurant menu for food allergens</video:title>
    <video:description>AllerLens reads a restaurant menu from a photo, a link or a QR code and labels every dish Safe, Caution, Avoid or Ask staff for the allergens you chose.</video:description>
    <video:content_loc>https://www.allerlens.app/video/allerlens-promo.mp4</video:content_loc>
    <video:duration>41</video:duration>
  </video:video>
</url>
```

Next's `MetadataRoute.Sitemap` supports a `videos` field on each entry (Next 15 and later), so this can live in
`app/sitemap.ts`.

## YouTube, TikTok, Instagram

The text below follows the same rules as the App Store listing: no safety promises, no dashes, plain words.

**YouTube title** (61 characters)

```
AllerLens: scan a restaurant menu for food allergens (iPhone)
```

**YouTube description**

```
AllerLens reads a restaurant menu and checks every dish against the food allergies you pick: peanuts, tree nuts, dairy, eggs, gluten, soy, fish, shellfish and sesame.

Scan the menu with your camera, every page of it, or open it from the QR code on the table or a link. AllerLens translates the menu into English or Spanish and marks each dish Safe, Caution, Avoid or Ask staff. Tap a dish to see the words that caused the flag. When it knows nothing about a dish, it says Ask staff and never calls it Safe.

There is no account and no sign-in. Your allergen list stays on your phone.

Free on the App Store for iPhone: https://apps.apple.com/app/id6802429618
Website: https://www.allerlens.app

AllerLens uses AI, and AI makes mistakes. It gives guidance, not medical advice. Always confirm ingredients and preparation with restaurant staff before you order, especially if your allergy is severe.

0:00 Pick your allergens and scan a menu
0:13 A label on every dish, and why
0:24 Ask staff, translated menus and the staff card
```

**Tags:** food allergy app, allergy menu scanner, restaurant menu allergens, peanut allergy, sesame allergy, gluten free
menu, celiac, nut allergy, menu translator, travel with food allergies, AllerLens, iPhone app

Upload the landscape file as the main video, add `allerlens-promo.en.vtt` and `.es.vtt` as subtitles, and use
`poster-landscape.jpg` as the custom thumbnail. Upload the vertical file separately as a Short.

**Short / Reels / TikTok caption**

```
Scan a menu, see what to avoid. AllerLens marks every dish Safe, Caution, Avoid or Ask staff for your allergies. Free on iPhone. #foodallergy #peanutallergy #celiac #glutenfree #allergyfriendly #travel
```

## App Store app preview

This cut is not usable as an App Store app preview as it is: Apple wants previews captured from the app, 15 to 30
seconds, at 886x1920 for the 6.9 inch slot. A 30 second preview could be cut from the same recording later.
