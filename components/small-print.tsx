import { faqs } from "@/lib/faqs"

// The questions people actually ask (lib/faqs.ts), grouped by topic: the topic on the left, its questions on the
// right, one ruled row per topic. Lives on /support.
const order = ["Getting it", "Scanning", "Labels and results", "Your data"]

export function SmallPrint() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
      <h1 className="display text-[44px] text-ink md:text-[60px]">Questions</h1>
      <p className="mt-4 max-w-[36rem] text-[18px] leading-relaxed text-ink-2">
        Something not covered here? Email{" "}
        <a href="mailto:allerlens.app@gmail.com" className="text-link">
          allerlens.app@gmail.com
        </a>
        . We usually reply within a few days.
      </p>

      <div className="mt-12 border-t border-ink">
        {order.map((group) => (
          <section key={group} className="grid gap-6 border-b border-line py-10 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12">
            <h2 className="heading text-[22px] text-ink">{group}</h2>
            <dl className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
              {faqs
                .filter((faq) => faq.group === group)
                .map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-[17px] font-semibold text-ink">{faq.question}</dt>
                    <dd className="mt-2 text-[16px] leading-relaxed text-ink-2">{faq.answer}</dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}
