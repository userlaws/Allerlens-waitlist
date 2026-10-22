import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

// Long-form pages (privacy, support): one reading column, serif headings.
export function DocPage({ title, meta, children }: { title: string; meta?: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[42rem] px-5 pb-24 pt-14 md:px-8 md:pt-20">
        <h1 className="display text-[44px] text-ink md:text-[56px]">{title}</h1>
        {meta && <p className="mt-4 text-[15px] text-ink-2">{meta}</p>}
        <div className="doc mt-10">{children}</div>
      </main>
      <Footer />
    </>
  )
}
