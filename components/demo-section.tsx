import { ArrowRight, ArrowDown } from "lucide-react"

export function DemoSection() {
  return (
    <section id="see-it-in-action" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">See it in action</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Watch AllerLens scan a real menu and detect allergens instantly.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
            {/* Screenshot 1 */}
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl w-full max-w-[300px] md:max-w-[350px]">
                <div className="bg-muted flex items-center justify-center">
                  <img
                    src="/screenshot-1.png"
                    alt="AllerLens screenshot 1"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              {/* Mobile arrow below */}
              <div className="md:hidden">
                <ArrowDown className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Desktop arrow between 1 and 2 */}
            <div className="hidden md:block -mx-4">
              <ArrowRight className="w-10 h-10 text-primary animate-pulse" />
            </div>

            {/* Screenshot 2 */}
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl w-full max-w-[300px] md:max-w-[350px]">
                <div className="bg-muted flex items-center justify-center">
                  <img
                    src="/screenshot-2.png"
                    alt="AllerLens screenshot 2"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              {/* Mobile arrow below */}
              <div className="md:hidden">
                <ArrowDown className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Desktop arrow between 2 and 3 */}
            <div className="hidden md:block -mx-4">
              <ArrowRight className="w-10 h-10 text-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>

            {/* Screenshot 3 */}
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl w-full max-w-[300px] md:max-w-[350px]">
                <div className="bg-muted flex items-center justify-center">
                  <img
                    src="/screenshot-3.png"
                    alt="AllerLens screenshot 3"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Real scans of multi-column menus with bilingual text from NYC cafes and diners
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">Built with real menu scans from NYC cafes and diners</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground/70">
              <span className="px-3 py-1 bg-secondary rounded-full">Italian</span>
              <span className="px-3 py-1 bg-secondary rounded-full">Thai</span>
              <span className="px-3 py-1 bg-secondary rounded-full">Mexican</span>
              <span className="px-3 py-1 bg-secondary rounded-full">Cafe</span>
              <span className="px-3 py-1 bg-secondary rounded-full">Bakery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
