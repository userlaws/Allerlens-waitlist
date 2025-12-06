import { Camera, Cpu, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Snap",
    description: "Open the app and snap a photo of any menu, ingredient list, or food packaging.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Detect",
    description: "AI instantly scans the text and cross-references with your allergen profile.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Decide",
    description: "Get clear, color-coded results so you can order confidently.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">How AllerLens works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Three simple steps to safer dining. No complicated setup required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
              )}

              <div className="relative">
                <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                  <step.icon className="w-10 h-10 text-accent-foreground" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
