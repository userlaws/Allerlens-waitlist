"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useSeen } from "@/hooks/use-seen"
import { Segment } from "./segment"

// A rebuild of two of the app's Profile settings, "Translate menus to" and "Appearance", wired to a rebuilt results
// card for the sample menu Taberna El Puerto (dish names, prices and labels from the real screen). Until someone
// touches a control it plays through the settings on its own; after that it is theirs. The segment labels, section
// headers and the System footer are the app's strings.
type Lang = "en" | "es"
type Look = "system" | "light" | "dark"

const dishes = [
  { en: "Ham Croquettes", es: "Croquetas de jamón", price: "7.00", tier: "safe", word: "Safe" },
  {
    en: "Chicken Wings",
    es: "Alitas de pollo",
    price: "8.50",
    tier: "ask",
    word: "Ask staff",
    reason: "Points to sauces that were not scanned. Ask staff.",
  },
  { en: "Mixed Salad", es: "Ensalada mixta", price: "6.50", tier: "safe", word: "Safe" },
] as const

// The app's interface stays in English (it follows the phone); "Translate menus to" only changes the menu inside the
// results: dish names and the section header, plus the line that says what was translated.
const t = {
  profile: "Profile",
  menus: "Menus",
  language: "Translate menus to",
  appearance: "Appearance",
  looks: { system: "System", light: "Light", dark: "Dark" },
  footer: "System follows your iPhone's Light or Dark setting.",
  meta: "Gijón, Asturias · 3 sections",
  safe: "6 safe",
  ask: "4 ask staff",
  staff: "Show staff my allergies",
  words: { safe: "Safe", ask: "Ask staff" },
  reason: "Points to sauces that were not scanned. Ask staff.",
} as const

// The tour: language first, then appearance, then back
const tour: { lang: Lang; look: Look }[] = [
  { lang: "en", look: "system" },
  { lang: "es", look: "system" },
  { lang: "es", look: "dark" },
  { lang: "en", look: "dark" },
  { lang: "en", look: "light" },
]
const STEP_MS = 2600
// After the last touch, the controls stay with the visitor this long, then the tour picks up again
const IDLE_MS = 6000
const EASE = [0.22, 1, 0.36, 1] as const

export function SettingsSection() {
  const [step, setStep] = useState(0)
  const [touched, setTouched] = useState(false)
  const [touchTick, setTouchTick] = useState(0)
  const [lang, setLang] = useState<Lang>("en")
  const [look, setLook] = useState<Look>("system")
  const [inView, setInView] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const seen = useSeen(ref)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (touched || !inView || reduce) return
    const timer = window.setTimeout(() => setStep((s) => (s + 1) % tour.length), STEP_MS)
    return () => window.clearTimeout(timer)
  }, [step, touched, inView, reduce])

  useEffect(() => {
    if (touched) return
    setLang(tour[step].lang)
    setLook(tour[step].look)
  }, [step, touched])

  // Each touch restarts the idle clock; when it runs out, the tour resumes from its next step
  useEffect(() => {
    if (!touched) return
    const timer = window.setTimeout(() => {
      setTouched(false)
      setStep((s) => (s + 1) % tour.length)
    }, IDLE_MS)
    return () => window.clearTimeout(timer)
  }, [touched, touchTick])

  const touch = () => {
    setTouched(true)
    setTouchTick((t) => t + 1)
  }

  const translated = lang === "en"
  const scope = look === "system" ? "" : look === "dark" ? "app-scope-dark" : "app-scope-light"

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-[40rem]">
          <h2 className="display text-[36px] text-ink sm:text-[44px] lg:text-[54px]">Your language, your light.</h2>
          <p className="mt-5 text-[18px] leading-relaxed text-ink-2">
            AllerLens is a menu translator too. Menus are translated into English or Spanish, with the original name kept
            under each dish. The app follows
            your iPhone&apos;s light or dark setting unless you pick one. Try the settings below.
          </p>
        </div>

        <div ref={ref} data-seen={seen} className="mt-12 grid items-start gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-14">
          <div
            className="app-screen p-5 sm:p-6"
            onPointerDown={touch}
            onKeyDown={touch}
          >
            <p className="heading text-[28px] text-[var(--app-ink)]">{t.profile}</p>
            <p className="mt-5 px-1 text-[13px] text-[var(--app-ink-2)]">{t.menus}</p>
            <div className="mt-2 rounded-[14px] bg-[var(--app-card)] p-4">
              <p className="text-[16px] text-[var(--app-ink)]">{t.language}</p>
              <div className="mt-3">
                <Segment
                  label="Translate menus to"
                  value={lang}
                  onChange={setLang}
                  options={[
                    { value: "en", label: "English" },
                    { value: "es", label: "Español" },
                  ]}
                />
              </div>
            </div>
            <p className="mt-6 px-1 text-[13px] text-[var(--app-ink-2)]">{t.appearance}</p>
            <div className="mt-2">
              <Segment
                label="Appearance"
                value={look}
                onChange={setLook}
                options={[
                  { value: "system", label: t.looks.system },
                  { value: "light", label: t.looks.light },
                  { value: "dark", label: t.looks.dark },
                ]}
              />
            </div>
            <p className="mt-2 px-1 text-[13px] leading-snug text-[var(--app-ink-2)]">
              {t.footer}
            </p>
            <p className="mt-5 border-t border-[var(--app-line)] pt-4 text-[13px] text-[var(--app-ink-2)]" aria-live="polite">
              {reduce ? "Try the settings." : touched ? "Your turn. The demo picks up again after a few seconds." : "Playing on its own. Tap a setting to take over."}
            </p>
          </div>

          <div className={`app-preview app-screen ${scope} p-5 sm:p-6`} aria-live="polite">
            <p className="heading text-[24px] text-[var(--app-ink)]">Taberna El Puerto</p>
                <p className="mt-0.5 text-[13px] text-[var(--app-ink-2)]">{t.meta}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={lang} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.18 }}>
                <p className="mt-3 text-[13px] text-[var(--app-ink-2)]">
                  <span className="font-semibold">{translated ? "ES→EN" : "ES"}</span>{" "}
                  {translated ? "Translated to English" : "Already in Spanish"}
                </p>
                  </motion.div>
                </AnimatePresence>
                <p className="mt-4 text-[16px] font-semibold">
                  <span className="tier-ink" data-tier="safe">{t.safe}</span>
                  <span className="text-[var(--app-ink-2)]"> · </span>
                  <span className="tier-ink" data-tier="ask">{t.ask}</span>
                </p>
                <p className="mt-4 flex min-h-12 items-center justify-between rounded-[14px] bg-[var(--app-card)] px-4 text-[15px] text-[var(--app-ink)]">
                  {t.staff}
                  <span aria-hidden="true" className="text-[var(--app-ink-3)]">›</span>
                </p>
                {/* Only the menu changes: the dishes fade out and come back in the other language */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={lang}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: EASE }}
                  >
                <p className="heading mt-5 text-[20px] text-[var(--app-ink)]">
                  {translated ? "Appetizers" : "Entrantes"}
                  {translated && <span className="ml-2 font-sans text-[13px] font-normal text-[var(--app-ink-3)]">ENTRANTES</span>}
                </p>
                <ul className="mt-3 overflow-hidden rounded-[14px] bg-[var(--app-card)]">
                  {dishes.map((d) => (
                    <li key={d.en} className="flex items-start gap-3 border-[var(--app-line)] px-4 py-3.5 [&+&]:border-t">
                      <span className="min-w-0 flex-1">
                        <span className="block text-[16px] font-semibold leading-[21px] text-[var(--app-ink)]">
                          {translated ? d.en : d.es}
                        </span>
                        {translated && <span className="mt-0.5 block text-[13px] leading-[18px] text-[var(--app-ink-3)]">{d.es}</span>}
                        {"reason" in d && (
                          <span className="tier-ink mt-1 block text-[13px] font-medium leading-[18px]" data-tier={d.tier}>
                            {t.reason}
                          </span>
                        )}
                        <span className="mt-1 block text-[13px] text-[var(--app-ink-2)]">{d.price}</span>
                      </span>
                      <span className="label-word flex shrink-0 items-center gap-1.5 pt-0.5 text-right text-[13px] font-semibold" data-tier={d.tier}>
                        <span className="label-dot" aria-hidden="true" />
                        {t.words[d.tier]}
                      </span>
                    </li>
                  ))}
                </ul>
                  </motion.div>
                </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
