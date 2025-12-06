import { Camera, Languages, Shield, Zap, Users, Smartphone } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Instant Menu Scanning",
    description: "Point your camera at any menu and get allergen analysis in under 3 seconds.",
    badge: null,
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Works with menus in 50+ languages. Perfect for international travel.",
    badge: null,
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your allergy profile stays on your device. We never sell your health data.",
    badge: null,
  },
  {
    icon: Zap,
    title: "Offline Mode",
    description: "Core features work without internet. Stay safe even in remote areas.",
    badge: "Planned",
  },
  {
    icon: Users,
    title: "Family Profiles",
    description: "Manage allergen profiles for your whole family in one app.",
    badge: null,
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Available on iOS and Android. Sync seamlessly across all devices.",
    badge: null,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything you need to dine safely
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Built by people with allergies, for people with allergies. Every feature designed with your safety in mind.
          </p>
          <p className="text-sm text-muted-foreground/70 mt-3">
            Powered by geometry-aware OCR—not just keyword matching
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative"
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full font-medium">
                  {feature.badge}
                </span>
              )}
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
