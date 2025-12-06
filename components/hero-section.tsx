import { WaitlistForm } from "./waitlist-form"
import { PhoneMockup } from "./phone-mockup"
import { AlertTriangle, Lock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Private beta now recruiting
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mb-6">
              Scan any menu. <span className="text-primary">Spot allergens in seconds.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 text-pretty">
              Point your camera at a menu—AllerLens flags dairy, nuts, gluten and more. Works on noisy, multi-column,
              and bilingual menus.
            </p>
            <WaitlistForm />
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 justify-center lg:justify-start">
                <Lock className="w-3 h-3" />
                No spam. Unsubscribe anytime.
              </p>
              <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5 justify-center lg:justify-start">
                <AlertTriangle className="w-3 h-3" />
                This is guidance, not medical advice.
              </p>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
