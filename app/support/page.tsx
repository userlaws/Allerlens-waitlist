import type { Metadata } from "next"
import Link from "next/link"
import { DocPage } from "@/components/doc-page"
import { faqs } from "@/lib/faqs"

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with AllerLens: accounts, wrong results, scanning tips, languages and deleting your data.",
}

export default function SupportPage() {
  return (
    <DocPage title="Support" meta="We usually reply within a few days.">
      <p>
        Questions, bug reports, or feedback:{" "}
        <a href="mailto:allerlens.app@gmail.com" className="text-link">
          allerlens.app@gmail.com
        </a>
      </p>

      {faqs.map((faq) => (
        <section key={faq.question}>
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
        </section>
      ))}

      <p className="mt-12">
        <Link href="/privacy" className="text-link">
          Privacy policy
        </Link>
      </p>
    </DocPage>
  )
}
