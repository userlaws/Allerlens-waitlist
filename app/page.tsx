import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { WhoItsForSection } from "@/components/who-its-for-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <DemoSection />
      <WhoItsForSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
