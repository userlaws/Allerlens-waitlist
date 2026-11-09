"use client"

import { useEffect, useRef, useState } from "react"
import { AppStoreLink } from "./app-store-link"
import { DemoScreen } from "./app-demo"

// The only phone on the page: the real app playing a 14s loop on a pale sage panel.
export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-14 md:px-8 md:pb-24 md:pt-14">
      <div>
        <h1 className="display text-[44px] text-ink sm:text-[56px] lg:text-[72px]">Scan the menu. See what to avoid, and why.</h1>
        <p className="mt-6 max-w-[30rem] text-[18px] leading-relaxed text-ink-2 md:text-[19px]">
          Scan a menu, open it from the QR code on the table, or upload a PDF. AllerLens translates it and checks every
          dish against the allergens you chose.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <AppStoreLink />
          <span className="text-[15px] text-ink-2">Free · iPhone only · No account</span>
        </div>
      </div>

      <div ref={ref} className="flex justify-center rounded-[36px] bg-stage px-6 py-10 md:py-12">
        <div className="phone w-[min(66vw,300px)]">
          <div
            className="phone-screen"
            role="img"
            aria-label="The app in use: a finger opens a saved scan, taps Show staff my allergies to show the allergy card, swipes it away and goes back to Saved."
          >
            <DemoScreen running={running} />
          </div>
        </div>
      </div>
    </section>
  )
}
