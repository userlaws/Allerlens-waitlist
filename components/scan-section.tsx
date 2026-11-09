"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useSeen } from "@/hooks/use-seen"
import { Segment } from "./segment"
import { INPUT_MS, WayVisual, type WayKey } from "./ways-visuals"

// Each way in plays in two parts on one fixed stage: first how that input works (the camera framing a menu, the QR
// code opening the menu in the app, a pasted link, a PDF from Files), then the app's "Reading the menu" card
// (ScanProcessingOverlay) loading into labelled dishes. Then the next way slides in. It plays on its own, keeps going
// after a tap, waits while off screen, and with reduced motion shows the finished reading card.
const ways: { key: WayKey; label: string; text: string }[] = [
  { key: "camera", label: "Camera", text: "Point at the printed menu. Up to five pages are read as one menu." },
  { key: "qr", label: "QR code", text: "Point the camera at the QR code on the table. The menu opens inside the app, and you tap Read this menu." },
  { key: "link", label: "Link", text: "Paste a link to a menu. It opens inside the app, and you tap Read this menu." },
  { key: "pdf", label: "PDF", text: "Pick a PDF (the first 10 pages are read) or photos from your library." },
]

const steps = ["Detecting text…", "Translating menu…", "Checking your allergens"]

const rows = [
  { name: "Peanut Satay", tier: "avoid", word: "Avoid", reason: "Likely contains peanuts. Please verify with staff." },
  { name: "Fruit Plate", tier: "safe", word: "Safe" },
  { name: "Ice Cream", tier: "ask", word: "Ask staff", reason: "Points to options that were not scanned. Ask staff." },
] as const

const READING_MS = 4200
const EASE = [0.22, 1, 0.36, 1] as const

function ReadingCard({ still }: { still: boolean }) {
  return (
    <div className={`reading h-full rounded-[20px] bg-[var(--app-card)] p-5 shadow-[0_2px_10px_rgb(0_0_0/0.06)] ${still ? "reading-static" : ""}`}>
      <div className="grid">
        <p className="reading-title-load heading text-[23px] text-[var(--app-ink)] [grid-area:1/1]">Reading the menu…</p>
        <p className="reading-title-done heading text-[23px] text-[var(--app-ink)] [grid-area:1/1]">Your menu is ready</p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--app-sunken)]">
        <div className="reading-bar h-full rounded-full bg-[var(--app-ink)]" />
      </div>

      <ol className="mt-5 space-y-3">
        {steps.map((step, i) => (
          <li key={step} className="reading-step flex items-center gap-3 text-[15px]" style={{ ["--i" as string]: i }}>
            <span className="reading-mark" aria-hidden="true">
              <span className="reading-spin" />
              <svg className="reading-check" viewBox="0 0 20 20">
                <path d="M5.5 10.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {step}
          </li>
        ))}
      </ol>

      {/* Placeholder rows shimmer while the menu is read, then the real dishes take their place */}
      <ul className="mt-5 overflow-hidden rounded-[14px] bg-[var(--app-bg)]">
        {rows.map((row, i) => (
          <li key={row.name} className="relative border-[var(--app-line)] px-3.5 py-3 [&+&]:border-t" style={{ ["--r" as string]: i }}>
            <span className="reading-skeleton" aria-hidden="true">
              <span className="skeleton-bar w-[46%]" />
              <span className="skeleton-bar ml-auto w-[18%]" />
            </span>
            <span className="reading-row flex items-start gap-3">
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-[20px] text-[var(--app-ink)]">{row.name}</span>
                {"reason" in row && (
                  <span className="tier-ink mt-0.5 block text-[12px] font-medium leading-[16px]" data-tier={row.tier}>
                    {row.reason}
                  </span>
                )}
              </span>
              <span className="label-word flex shrink-0 items-center gap-1.5 text-[12px] font-semibold" data-tier={row.tier}>
                <span className="label-dot" aria-hidden="true" />
                {row.word}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[12px] leading-snug text-[var(--app-ink-2)]">
        Your photo is sent to our server to be read and is not stored. Your allergen list stays on this phone.
      </p>
    </div>
  )
}

export function ScanSection() {
  const [index, setIndex] = useState(0)
  const [run, setRun] = useState(0)
  const [phase, setPhase] = useState<"input" | "reading">("input")
  const [inView, setInView] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const active = ways[index]
  const seen = useSeen(ref)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // One run: the input plays, then the reading card, then the next way
  useEffect(() => {
    if (reduce) {
      setPhase("reading")
      return
    }
    setPhase("input")
    if (!inView) return
    const input = INPUT_MS[ways[index].key]
    const toReading = window.setTimeout(() => setPhase("reading"), input)
    const toNext = window.setTimeout(() => {
      setIndex((i) => (i + 1) % ways.length)
      setRun((r) => r + 1)
    }, input + READING_MS)
    return () => {
      window.clearTimeout(toReading)
      window.clearTimeout(toNext)
    }
    // index is read through the run that changed with it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, inView, reduce])

  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-16 md:px-8 md:py-28">
        <div className="md:order-2">
          <h2 className="display text-[36px] text-ink sm:text-[44px] lg:text-[54px]">Four ways to get the menu in.</h2>
          <p className="mt-5 max-w-[30rem] text-[18px] leading-relaxed text-ink-2">
            Scan the printed pages, scan the QR code on the table, paste a link, or pick a PDF. Whichever you use, the
            menu is read, translated into English or Spanish, and checked against your allergens. Scanning needs an
            internet connection.
          </p>
          <p className="mt-4 text-[15px] text-ink-2">The QR code in the demo is real: scan it to open AllerLens on the App Store.</p>
        </div>

        <div ref={ref} data-seen={seen} className="app-screen mx-auto w-full max-w-[420px] overflow-hidden p-5 sm:p-6">
          <Segment
            label="Ways in"
            value={active.key}
            options={ways.map((w) => ({ value: w.key, label: w.label }))}
            onChange={(key) => {
              setIndex(ways.findIndex((w) => w.key === key))
              setRun((r) => r + 1)
            }}
          />
          <p className="mt-4 min-h-[4.3em] text-[15px] leading-snug text-[var(--app-ink-2)]" aria-live="polite">
            {active.text}
          </p>

          {/* One fixed stage: the way's input, then the reading card. Each change slides out left and in from the right. */}
          <div className="relative mt-3 h-[500px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={`${run}-${phase}`}
                className="absolute inset-0"
                initial={reduce ? false : phase === "reading" ? { opacity: 0, scale: 0.97 } : { opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reduce ? undefined : phase === "reading" ? { opacity: 0, x: -32 } : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                {phase === "input" ? <WayVisual way={active.key} /> : <ReadingCard still={!!reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
