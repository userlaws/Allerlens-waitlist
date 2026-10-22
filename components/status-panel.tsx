import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { CheckCircleIcon, ExclamationCircleIcon } from "./icons"

// One-message pages: email confirmation, unsubscribe, not found.
export function StatusPanel({
  tone,
  title,
  children,
  actions,
}: {
  tone: "ok" | "problem" | "neutral"
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-5 py-20 md:px-8">
        {tone === "ok" && <CheckCircleIcon size={32} className="mb-5 text-ink" />}
        {tone === "problem" && <ExclamationCircleIcon size={32} className="mb-5 text-avoid" />}
        <h1 className="display text-[40px] text-ink md:text-[48px]">{title}</h1>
        <div className="mt-4 text-[18px] leading-relaxed text-ink-2">{children}</div>
        {actions && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{actions}</div>}
      </main>
      <Footer />
    </>
  )
}
