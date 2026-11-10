# Update for Claude Code on the Mac (Nov 10 2026)

Written by Claude Code on the Windows PC. It says where the site stands and what is left, so the Mac does not redo or
undo anything.

## Where things stand

- The new site is finished on `site-app-showcase` at commit `3d6e022`. PR 2 into `main` is open, clean and not merged:
  https://github.com/userlaws/Allerlens-waitlist/pull/2
- `origin/promo-video` is merged into that branch. Nothing else is needed from it.
- www.allerlens.app still serves the old site on purpose. The App Store link
  `https://apps.apple.com/app/id6802429618` returned 404 when this was written, and the owner chose to keep the old
  site up until the app is released.
- A production build of `3d6e022` is already on Vercel, not attached to the domain:
  `https://allerlenswaitlist-isrlsucah-garyvees-projects.vercel.app` (behind Vercel login; read it with `vercel curl`).
  Going live is one command, with no build to wait for.

## What was done on the branch

- "See it work" section below the hero (`components/see-it-work.tsx`) with the promo video and the README summary.
  Landscape file from 768 px, vertical below. Nothing downloads until the section nears the screen. Muted loop, native
  controls, no autoplay under `prefers-reduced-motion`. Both caption tracks are in the menu and neither is on by
  default, because the same text is burned into the picture.
- `lib/site.ts` holds the site URL (www) and the video facts. `app/sitemap.ts` and `app/robots.ts` use it.
- `MobileApplication` JSON-LD in `app/layout.tsx`, `VideoObject` in `app/page.tsx`, www canonicals on `/`, `/support`
  and `/privacy`, Smart App Banner, title `AllerLens: scan restaurant menus for food allergens`.
- Removed `/api/setup-db` and `/api/test-email` (both ran without a secret), the waitlist sign-up route and its form.
  `/api/waitlist/confirm` and `/api/unsubscribe` stay because emails already sent link to them.

## Do not

- Do not merge PR 2 or push to `main` before the app is released. The Vercel project is linked to GitHub with `main`
  as the production branch. Pushes have not been triggering deployments lately, but if that link works for `main`, a
  merge would put the new site on the domain early.
- Do not push new commits to `site-app-showcase` unless the owner asks for a change. The build waiting on Vercel is
  `3d6e022`. Any later commit needs a new build before going live (see the last section).
- Do not move or rename `docs/privacy-policy.html` or `docs/support.html`.
- No AI credit in commits or pull requests (`CLAUDE.md`).

## When to go live

Only after both are true:

1. The owner has pressed Release in App Store Connect.
2. This prints `200`:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -L -A "Mozilla/5.0" https://apps.apple.com/app/id6802429618
```

Then, from either machine (the PC session will do it if the owner says "released" there, so check first that
www.allerlens.app is still the old site):

```bash
npx vercel@latest promote https://allerlenswaitlist-isrlsucah-garyvees-projects.vercel.app --scope garyvees-projects
```

```bash
gh pr merge 2 --merge --repo userlaws/Allerlens-waitlist
```

The Vercel account is `gary-vee`, team `garyvees-projects`, project `allerlenswaitlist`. If the Mac is not logged in
to that account, leave the promote step to the PC.

## Check after going live

- `https://www.allerlens.app` has the title `AllerLens: scan restaurant menus for food allergens` and the
  "See it work" section. `https://allerlens.app` redirects to www.
- `https://www.allerlens.app/sitemap.xml` and `/robots.txt` return 200. `/api/setup-db` and `/api/test-email` return
  404.
- `https://userlaws.github.io/Allerlens-waitlist/privacy-policy.html` and `/support.html` still return 200 after the
  merge. Both did before it.
- Not yet looked at by a person: the phone layout in light mode, desktop in dark mode, and the reduced-motion path.

Then remind the owner of the three things only they can do: add www.allerlens.app to Google Search Console and submit
`https://www.allerlens.app/sitemap.xml`; upload the promo to YouTube with the title, description and captions from
`handoff/promo-video/README.md`; post the vertical cut as a Short, Reel and TikTok. Once the YouTube video exists, add
`"embedUrl": "https://www.youtube.com/embed/<id>"` to the `VideoObject` in `app/page.tsx`.

## If the site needs a change before going live

Commit to `site-app-showcase`, push, then build a new production deployment without attaching the domain, and promote
that one instead of the URL above:

```bash
npx vercel@latest deploy --prod --skip-domain --yes --scope garyvees-projects
```

Run it from a clean checkout of the branch. The PC working folder has large untracked video files that should not be
uploaded.
