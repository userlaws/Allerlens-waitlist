"use client"

import {
  Root as Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@animate-ui/react/primitives/radix-ui/accordion"
import { ChevronDownIcon } from "./icons"
import { faqs } from "@/lib/faqs"

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="display text-[38px] text-ink md:text-[52px]">Questions</h2>

        <Accordion type="single" collapsible className="faq mt-10 border-y border-line">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`q${index}`} className="border-line [&+&]:border-t">
              <AccordionHeader>
                <AccordionTrigger className="heading flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left text-[21px] text-ink md:text-[23px]">
                  {faq.question}
                  <ChevronDownIcon size={24} className="faq-chevron shrink-0 text-ink-2" />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <p className="max-w-[40rem] pb-6 text-[17px] leading-relaxed text-ink-2">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-8 text-[17px] leading-relaxed text-ink-2">
          Something else? Email{" "}
          <a href="mailto:allerlens.app@gmail.com" className="text-link">
            allerlens.app@gmail.com
          </a>
          . We usually reply within a few days.
        </p>
      </div>
    </section>
  )
}
