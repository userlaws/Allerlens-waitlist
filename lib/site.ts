// The live site answers on www; allerlens.app redirects there.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.allerlens.app").replace(/\/$/, "")

export const PROMO_VIDEO = {
  title: "AllerLens: scan a restaurant menu for food allergens",
  description:
    "AllerLens reads a restaurant menu from a photo, a link or a QR code, translates it, and labels every dish Safe, Caution, Avoid or Ask staff for the allergens you chose. Free for iPhone.",
  // The day the video went live on the site
  uploadDate: "2026-11-10",
  seconds: 41,
  landscape: "/video/allerlens-promo.mp4",
  vertical: "/video/allerlens-promo-vertical.mp4",
  poster: "/video/allerlens-promo-poster.jpg",
  verticalPoster: "/video/allerlens-promo-vertical-poster.jpg",
}
