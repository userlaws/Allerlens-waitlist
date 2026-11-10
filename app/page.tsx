import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SeeItWork } from "@/components/see-it-work"
import { ScanSection } from "@/components/scan-section"
import { LabelsSection } from "@/components/labels-section"
import { SettingsSection } from "@/components/settings-section"
import { PrivacyLimits } from "@/components/privacy-limits"
import { GetIt } from "@/components/get-it"
import { Footer } from "@/components/footer"
import { PROMO_VIDEO, SITE_URL } from "@/lib/site"

// Tells search engines about the promo video in the "See it work" section
const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: PROMO_VIDEO.title,
  description: PROMO_VIDEO.description,
  thumbnailUrl: [`${SITE_URL}${PROMO_VIDEO.poster}`, `${SITE_URL}${PROMO_VIDEO.verticalPoster}`],
  uploadDate: PROMO_VIDEO.uploadDate,
  duration: `PT${PROMO_VIDEO.seconds}S`,
  contentUrl: `${SITE_URL}${PROMO_VIDEO.landscape}`,
  inLanguage: "en",
  publisher: { "@type": "Person", name: "Imanol Aracena" },
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <Header />
      <main>
        <Hero />
        <SeeItWork />
        <ScanSection />
        <LabelsSection />
        <SettingsSection />
        <PrivacyLimits />
        <GetIt />
      </main>
      <Footer />
    </>
  )
}
