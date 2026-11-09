"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useSeen } from "@/hooks/use-seen"

// A rebuild of the app's results list and dish sheet. Every dish, label, reason and "Why" line is copied from a real
// app screen (handoff/assets/screens); the four come from four of the app's made-up test menus, named under each dish.
type Tier = "safe" | "caution" | "avoid" | "ask"

const dishes: {
  name: string
  menu: string
  tier: Tier
  word: string
  reason?: string
  verdict: string
  why: string[]
  ingredients?: string
}[] = [
  {
    name: "Spanish Omelette",
    menu: "Taberna El Puerto · Tortilla española",
    tier: "safe",
    word: "Safe",
    verdict: "No match found for your allergens.",
    why: ["Likely contains eggs. Please verify with staff.", "Likely contains gluten. Please verify with staff."],
    ingredients: "Egg, potato and onion",
  },
  {
    name: "Tom Kha Gai",
    menu: "Baan Siam",
    tier: "caution",
    word: "Caution",
    reason: "May contain peanuts.",
    verdict: "May contain peanuts.",
    why: [
      "Likely contains dairy. Please verify with staff.",
      "Likely contains fish. Please verify with staff.",
      "Likely contains tree nuts. Please verify with staff.",
      "Uses non-dairy milk: coconut milk.",
      "Related species. Cross-reaction possible.",
    ],
  },
  {
    name: "Chicken Tenders",
    menu: "Corner Diner",
    tier: "avoid",
    word: "Avoid",
    reason: "Likely contains peanuts. Please verify with staff.",
    verdict: "Contains peanuts, sesame.",
    why: [
      "Likely contains gluten. Please verify with staff.",
      "Likely contains eggs. Please verify with staff.",
      "Likely contains dairy. Please verify with staff.",
      "Likely contains peanuts. Please verify with staff.",
      "Likely contains sesame. Please verify with staff.",
    ],
  },
  {
    name: "Scallion Pancake",
    menu: "Golden Lantern",
    tier: "ask",
    word: "Ask staff",
    reason: "Common on this menu: sesame. Ask staff.",
    verdict:
      "Common on this menu: sesame. The menu gives no ingredients for this dish, so it could not be ruled out. That is not the same as safe. Ask staff before ordering.",
    why: [
      "Likely contains gluten. Please verify with staff.",
      "Likely contains dairy. Please verify with staff.",
      "Likely contains eggs. Please verify with staff.",
      "Fried. Possible shared fryer with shellfish. Ask staff.",
    ],
  },
]

// The app's smoothOut curve; its rows rise 8px, 40ms apart, and its sheets slide up from the bottom.
const SMOOTH_OUT = [0.22, 1, 0.36, 1] as const

export function LabelsSection() {
  const [open, setOpen] = useState<number | null>(null)
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([])
  const last = useRef<number | null>(null)
  const dish = open === null ? null : dishes[open]
  const cardRef = useRef<HTMLDivElement>(null)
  const seen = useSeen(cardRef)

  // Focus moves into the sheet when it opens and back to its row when it closes; Escape closes it
  useEffect(() => {
    if (open !== null) {
      last.current = open
      closeRef.current?.focus()
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
      window.addEventListener("keydown", onKey)
      return () => window.removeEventListener("keydown", onKey)
    }
    if (last.current !== null) rowRefs.current[last.current]?.focus()
  }, [open])

  return (
    <section id="labels" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-16 md:px-8 md:py-28">
        <div>
          <h2 className="display text-[36px] text-ink sm:text-[44px] lg:text-[54px]">Every dish gets a label. Tap it for the reasons.</h2>
          <p className="mt-5 max-w-[30rem] text-[18px] leading-relaxed text-ink-2">
            Safe, Caution, Avoid or Ask staff. A flagged dish shows the words that caused it, and AllerLens knows what a
            dish usually contains even when the menu lists no ingredients. Ask staff is never shown as Safe.
          </p>
          <p className="mt-5 text-[15px] text-ink-2">Try it: tap a dish.</p>
        </div>

        <div ref={cardRef} data-seen={seen} className="app-screen relative mx-auto w-full max-w-[420px] overflow-hidden">
          <div className="p-5 sm:p-6">
            <p className="heading text-[24px] text-[var(--app-ink)]">Sample dishes</p>
            <p className="mt-1 text-[13px] text-[var(--app-ink-2)]">Checked for peanuts and sesame</p>

            <ul className="mt-5 overflow-hidden rounded-[14px] bg-[var(--app-card)]">
              {dishes.map((d, i) => (
                <motion.li
                  key={d.name}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, ease: SMOOTH_OUT, delay: reduce ? 0 : i * 0.04 }}
                  className="border-[var(--app-line)] [&+&]:border-t"
                >
                  <button
                    ref={(el) => {
                      rowRefs.current[i] = el
                    }}
                    type="button"
                    onClick={() => setOpen(i)}
                    className="app-row flex w-full items-start gap-3 px-4 py-3.5 text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-semibold leading-[21px] text-[var(--app-ink)]">{d.name}</span>
                      <span className="mt-0.5 block text-[13px] leading-[18px] text-[var(--app-ink-3)]">{d.menu}</span>
                      {d.reason && (
                        <span className="tier-ink mt-1 block text-[13px] font-medium leading-[18px]" data-tier={d.tier}>
                          {d.reason}
                        </span>
                      )}
                    </span>
                    <span className="label-word flex shrink-0 items-center gap-1.5 pt-0.5 text-[13px] font-semibold" data-tier={d.tier}>
                      <span className="label-dot" aria-hidden="true" />
                      {d.word}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] leading-snug text-[var(--app-ink-2)]">
              Guidance only. Always confirm ingredients with restaurant staff.
            </p>
          </div>

          <AnimatePresence>
            {dish && (
              <>
                <motion.div
                  key="scrim"
                  className="absolute inset-0 bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                  onClick={() => setOpen(null)}
                  aria-hidden="true"
                />
                <motion.div
                  key="sheet"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${dish.name}, ${dish.word}`}
                  className="absolute inset-x-0 bottom-0 top-10 overflow-y-auto rounded-t-[20px] bg-[var(--app-bg)] px-5 pb-6 pt-3"
                  initial={reduce ? { opacity: 0 } : { y: "100%" }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  exit={reduce ? { opacity: 0 } : { y: "100%" }}
                  transition={{ duration: reduce ? 0.15 : 0.35, ease: SMOOTH_OUT }}
                >
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(null)}
                    aria-label="Close"
                    className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-[var(--app-ink-2)]"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <p className="heading text-[28px] leading-[33px] text-[var(--app-ink)]">{dish.name}</p>
                  <div className="tier-block mt-4 rounded-[14px] px-4 py-3.5" data-tier={dish.tier}>
                    <p className="tier-ink text-[20px] font-bold leading-[25px]" data-tier={dish.tier}>
                      {dish.word}
                    </p>
                    <p className="mt-1 text-[16px] leading-[21px] text-[var(--app-ink)]">{dish.verdict}</p>
                  </div>
                  <p className="mt-5 text-[13px] text-[var(--app-ink-2)]">Why</p>
                  <ul className="mt-1.5 space-y-1.5 text-[16px] leading-[21px] text-[var(--app-ink)]">
                    {dish.why.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  {dish.ingredients && (
                    <>
                      <p className="mt-5 text-[13px] text-[var(--app-ink-2)]">Ingredients</p>
                      <p className="mt-1.5 text-[16px] text-[var(--app-ink)]">{dish.ingredients}</p>
                    </>
                  )}
                  <p className="mt-6 text-[13px] leading-snug text-[var(--app-ink-2)]">
                    Checked for peanuts and sesame. This is guidance, not medical advice. Always confirm with restaurant staff.
                  </p>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
