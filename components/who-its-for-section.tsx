import { Wheat, Milk, Baby, Plane, Dumbbell } from "lucide-react"

const audiences = [
  {
    icon: Wheat,
    label: "Celiac",
    description: "Gluten-free dining without the guesswork",
  },
  {
    icon: Milk,
    label: "Dairy & Nut Allergies",
    description: "Avoid hidden ingredients with confidence",
  },
  {
    icon: Baby,
    label: "Parents",
    description: "Keep your kids safe at any restaurant",
  },
  {
    icon: Plane,
    label: "Travelers",
    description: "Navigate foreign menus in 50+ languages",
  },
  {
    icon: Dumbbell,
    label: "Fitness & Macros",
    description: "Track ingredients for your diet goals",
  },
]

export function WhoItsForSection() {
  return (
    <section id="who-its-for" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Built for people like you
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Whether you have allergies, dietary restrictions, or just want to know what's in your food.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-card border border-border rounded-full px-5 py-3 hover:border-primary/30 hover:bg-accent/50 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <audience.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="text-left">
                <span className="font-medium text-foreground block">{audience.label}</span>
                <span className="text-xs text-muted-foreground">{audience.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
