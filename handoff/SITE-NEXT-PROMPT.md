# Prompt for Claude Code on the site (Nov 10 2026)

Paste everything below the line into Claude Code in the `Allerlens-waitlist` repo on the Windows PC.

---

AllerLens 1.1.0 (21) passed App Review and is in "Pending Developer Release". I will press Release in App Store Connect
myself. After that the App Store link `https://apps.apple.com/app/id6802429618` starts working, which can take a few
hours to reach every country. The site must go live the same day.

Right now www.allerlens.app (and allerlenswaitlist.vercel.app) still serves the October waitlist site ("Join the
waitlist for the private beta"). The new site is on `site-app-showcase` and is not in production yet.

Do these in order. Follow `CLAUDE.md`, `DESIGN.md` and `handoff/README.md` (voice: never promise safety, no dashes as
punctuation, plain sentence case).

1. **Bring in the promo video.** `git fetch` and merge `origin/promo-video` into `site-app-showcase` (it branches from
   it and only adds files). Read `handoff/promo-video/README.md`. Add a "See it work" section with the video, high on
   the home page and below the hero is fine: landscape file on wide screens, vertical on phones, muted autoplay loop,
   `playsInline`, `preload="none"`, poster, both caption tracks, no autoplay under `prefers-reduced-motion`. Put the
   short text summary from the README next to it. Style it like the rest of the page (radius 14, the existing stage
   colours). Do not re-encode the files.

2. **SEO.**
   - Add `app/sitemap.ts` (home, `/support`, `/privacy`, and the video entry from the README) and `app/robots.ts`
     (allow all, point to the sitemap, disallow `/api/`).
   - Add the `VideoObject` JSON-LD from the README. Change the existing `SoftwareApplication` block to
     `MobileApplication`, and add `"operatingSystem": "iOS"`, `"applicationCategory": "LifestyleApplication"`,
     `"installUrl"` (the App Store link), `"screenshot"` (two of the `public/screens` images, absolute URLs) and
     `"author": {"@type": "Person", "name": "Imanol Aracena"}`. Do not add ratings or reviews; there are none yet.
   - `allerlens.app` redirects to `www.allerlens.app`, so set `metadataBase` (and `NEXT_PUBLIC_SITE_URL` on Vercel) to
     `https://www.allerlens.app`; canonicals and the sitemap must use the www host.
   - Add `alternates: { canonical: "/" }` to the root metadata and a canonical on `/support` and `/privacy`.
   - Add the Safari Smart App Banner: `other: { "apple-itunes-app": "app-id=6802429618" }` in the root metadata.
   - Make the title more searchable while keeping the voice, for example
     `AllerLens: scan restaurant menus for food allergens`, and keep the current description. People search for
     "allergy menu scanner", "food allergy app", "restaurant allergen app", "peanut allergy app" and "menu translator";
     use those words where they read naturally in headings and body text, not as a keyword list.
   - Check that every meaningful image has an `alt` that says what it shows, and that the page has one `h1`.
   - Run `npm run build`, then check the rendered HTML of `/` for the JSON-LD, canonical, robots and the banner meta.

3. **Production safety.** `app/api/setup-db` and `app/api/test-email` ship to production. Read them. If either can
   run without a secret (creating tables, sending email), remove it or require a secret from an environment variable.
   Keep the waitlist API only if the page still uses it.

4. **Ship.** Open a PR from `site-app-showcase` to `main`, check the Vercel preview on a phone and a desktop, light and
   dark, then merge and make sure the production deployment on www.allerlens.app is the new site. `docs/privacy-policy.html`
   and `docs/support.html` must keep working at `https://userlaws.github.io/Allerlens-waitlist/` because the app and
   the App Store listing link there; check both URLs after the merge.

5. **After it is live**, tell me to do these myself (they need my accounts): add www.allerlens.app to Google Search
   Console and submit `https://www.allerlens.app/sitemap.xml`; upload the promo to YouTube with the title, description
   and captions from the README; post the vertical cut as a Short / Reel / TikTok.

Do not change the App Store wording of the app's features. If something on the page disagrees with
`handoff/README.md`, the README wins.
