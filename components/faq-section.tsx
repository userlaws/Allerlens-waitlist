import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How accurate is AllerLens?",
    answer:
      "AllerLens highlights potential allergens based on menu text. We're continuously improving with geometry-aware OCR and community feedback. Always confirm with staff.",
  },
  {
    question: "What data do you store?",
    answer:
      "By default, we store anonymized menu text and your selections to improve detection. You can clear local data anytime and request account deletion in one tap.",
  },
  {
    question: "Will it work offline?",
    answer:
      "Core scanning will be available offline after beta. In early access we use a secure cloud parser for best accuracy.",
  },
  {
    question: "What will it cost?",
    answer:
      "Free tier for casual use. Pro adds unlimited scans, offline mode (when ready), and profile sharing. Founding testers get lifetime 30% off.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to know about AllerLens.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
