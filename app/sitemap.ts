import type { MetadataRoute } from "next"
import { PROMO_VIDEO, SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
      videos: [
        {
          title: PROMO_VIDEO.title,
          thumbnail_loc: `${SITE_URL}${PROMO_VIDEO.poster}`,
          description:
            "AllerLens reads a restaurant menu from a photo, a link or a QR code and labels every dish Safe, Caution, Avoid or Ask staff for the allergens you chose.",
          content_loc: `${SITE_URL}${PROMO_VIDEO.landscape}`,
          duration: PROMO_VIDEO.seconds,
        },
      ],
    },
    { url: `${SITE_URL}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.4 },
  ]
}
