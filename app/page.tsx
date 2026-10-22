import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WaysSection } from "@/components/ways-section"
import { TableSection } from "@/components/table-section"
import { PrivacySection } from "@/components/privacy-section"
import { FaqSection } from "@/components/faq-section"
import { JoinSection } from "@/components/join-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WaysSection />
        <TableSection />
        <PrivacySection />
        <FaqSection />
        <JoinSection />
      </main>
      <Footer />
    </>
  )
}
