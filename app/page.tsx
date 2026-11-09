import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ScanSection } from "@/components/scan-section"
import { LabelsSection } from "@/components/labels-section"
import { SettingsSection } from "@/components/settings-section"
import { PrivacyLimits } from "@/components/privacy-limits"
import { GetIt } from "@/components/get-it"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
