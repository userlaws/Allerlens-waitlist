"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@animate-ui/react/primitives/tabs"
import { PauseIcon, PlayIcon } from "./icons"

// The six App Store sheets, in the order the store listing tells the story.
const ways = [
  {
    value: "scan",
    word: "Scan",
    title: "Scan every page of the menu",
    body: "Photograph each page, sauces and sides included. A dish that points to a page you didn't scan gets Ask staff, not a guess.",
    src: "/screens/scan-every-page.webp",
    alt: "Corner Diner in the app: Ice Cream marked Ask staff, Fruit Plate Safe, Peanut Satay Avoid, Honey Mustard and Ranch Safe, Sesame Ginger Avoid.",
  },
  {
    value: "avoid",
    word: "Avoid",
    title: "See what to avoid, and why",
    body: "Tap a dish to see which of your allergens it likely contains, and every reason, down to a shared fryer.",
    src: "/screens/avoid-and-why.webp",
    alt: "Chicken Tenders marked Avoid: contains peanuts and sesame, followed by the list of reasons.",
  },
  {
    value: "ask",
    word: "Ask",
    title: "Not sure? It tells you to ask",
    body: "When the menu gives no ingredients, AllerLens says so. Ask staff is not the same as safe, and the app doesn't pretend it is.",
    src: "/screens/ask-staff.webp",
    alt: "Scallion Pancake marked Ask staff: the menu gives no ingredients, so sesame could not be ruled out.",
  },
  {
    value: "translate",
    word: "Translate",
    title: "Read menus in other languages",
    body: "The menu's language is detected for you and translated into English or Spanish, with the original dish name kept underneath.",
    src: "/screens/translated-menu.webp",
    alt: "Taberna El Puerto translated from Spanish: Ham Croquettes, Croquetas de jamón, marked Safe; Chicken Wings, Alitas de pollo, Ask staff.",
  },
  {
    value: "staff",
    word: "Show staff",
    title: "Show staff your allergies",
    body: "One tap puts your allergies on screen in the language of the menu, with the question your server can answer: does this dish contain any of these?",
    src: "/screens/show-staff.webp",
    alt: "A card in Spanish reading Alergia, Cacahuetes (maní) · Sésamo, ¿Este plato contiene alguno de estos ingredientes?",
  },
  {
    value: "save",
    word: "Save",
    title: "Keep every restaurant you've checked",
    body: "Scans stay on your phone, grouped by restaurant, with a count of what to avoid and what looked safe.",
    src: "/screens/saved-scans.webp",
    alt: "Saved scans grouped by restaurant, each with counts of dishes to avoid, to check and safe.",
  },
]

// Time on each screen. The bar under the active word fills over this time, and its animationend advances the tour.
const DWELL_MS = 3500
// The app's smoothOut curve and "medium" duration (src/motion.ts in the app repo). The underline, the screen and
// the word colour all move on this one timing, so a change reads as a single motion.
const SMOOTH_OUT = [0.22, 1, 0.36, 1] as const
const MOVE_S = 0.35

// Screens scroll in step with the word list: going down the list, the next screen rises from below and covers
// the old one, which moves a quarter of the way (the app's page parallax, SwipeBackPage).
// Both sets share one resting state, so the server's markup matches whichever set the browser picks.
const center = { y: "0%", opacity: 1, zIndex: 1 }
const slide = {
  enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 1, zIndex: 1 }),
  center,
  exit: (dir: number) => ({ y: dir > 0 ? "-25%" : "25%", opacity: 1, zIndex: 0 }),
}
const fade = {
  enter: { y: "0%", opacity: 0, zIndex: 1 },
  center,
  exit: { y: "0%", opacity: 0, zIndex: 0 },
}

export function WaysSection() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [bar, setBar] = useState<{ x: number; y: number; w: number } | null>(null)

  // One underline glides from word to word. Its place is measured from the active word, and again
  // whenever the list changes size (wrapping on phones, window resizes).
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const el = triggerRefs.current[index]
      if (el) setBar({ x: el.offsetLeft, y: el.offsetTop + el.offsetHeight - 7, w: el.offsetWidth })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [index])

  // Reduced motion: the tour starts paused. The play button still works, with fades instead of slides.
  useEffect(() => {
    if (reduceMotion) setPlaying(false)
  }, [reduceMotion])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Load and decode every screen once the section is in view, so no slide waits on a picture.
  useEffect(() => {
    if (!inView) return
    for (const way of ways) {
      const img = new Image()
      img.src = way.src
      img.decode?.().catch(() => {})
    }
  }, [inView])

  const advance = useCallback(() => {
    setDir(1)
    setIndex((i) => (i + 1) % ways.length)
  }, [])

  // Choosing a word stops the tour; the play button starts it again from there.
  const choose = useCallback(
    (value: string) => {
      const next = ways.findIndex((way) => way.value === value)
      if (next === -1 || next === index) return
      setDir(next > index ? 1 : -1)
      setIndex(next)
      setPlaying(false)
    },
    [index],
  )

  // The pause button is the way to stop it; hovering does not.
  const running = playing && inView && !keyboardFocus
  const active = ways[index]

  return (
    <section id="see-it-in-action" ref={sectionRef} className="border-t border-line">
      <Tabs
        value={active.value}
        onValueChange={choose}
        orientation="vertical"
        onFocus={(e) => setKeyboardFocus(e.target.matches(":focus-visible") && !!e.target.closest('[role="tablist"]'))}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false)
        }}
        className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12 md:px-8 md:py-28"
      >
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-semibold text-ink-2">What the app does</h2>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause the tour" : "Play the tour"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface text-ink transition-opacity hover:opacity-70"
            >
              {playing ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
            </button>
          </div>

          {/* On phones the words wrap into two short rows so the screen they switch stays in view */}
          <TabsList
            ref={listRef}
            className="relative mt-5 flex flex-wrap items-baseline gap-x-5 md:flex-col md:items-start md:gap-0"
          >
            {ways.map((way, i) => (
              <TabsTrigger
                key={way.value}
                ref={(el: HTMLButtonElement | null) => {
                  triggerRefs.current[i] = el
                }}
                value={way.value}
                className="ways-word display relative min-h-11 rounded-md pb-2 pt-1 text-left text-[32px] sm:text-[40px] md:text-[56px] lg:text-[68px]"
              >
                {way.word}
              </TabsTrigger>
            ))}
            {bar && (
              <motion.span
                aria-hidden="true"
                className="ways-indicator"
                initial={false}
                animate={{ x: bar.x, y: bar.y, width: bar.w }}
                transition={reduceMotion ? { duration: 0 } : { duration: MOVE_S, ease: SMOOTH_OUT }}
              >
                {/* Fills while the tour plays; a full line marks the chosen word once it stops */}
                <span
                  key={`${index}-${playing}`}
                  className="ways-progress"
                  data-playing={playing}
                  style={{ animationDuration: `${DWELL_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                  onAnimationEnd={playing ? advance : undefined}
                />
              </motion.span>
            )}
          </TabsList>
        </div>

        <div className="relative px-3 pb-8 pt-2">
          <div aria-hidden="true" className="phone ml-auto mr-auto w-[68%] max-w-[300px] md:mr-0 md:w-[62%]">
            <div className="phone-screen">
              <AnimatePresence initial={false} custom={dir}>
                <motion.img
                  key={active.src}
                  src={active.src}
                  alt=""
                  width={732}
                  height={1596}
                  draggable={false}
                  custom={dir}
                  variants={reduceMotion ? fade : slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduceMotion ? 0.15 : MOVE_S, ease: SMOOTH_OUT }}
                  className="absolute inset-0 h-full w-full will-change-transform"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* All six captions share one card, stacked in one grid cell, so the card keeps its size as the text changes */}
          <div className="relative z-10 mx-auto -mt-16 grid max-w-[24rem] rounded-[14px] bg-surface p-5 shadow-[var(--lift)] md:absolute md:bottom-10 md:left-0 md:mt-0 md:w-[58%]">
            {ways.map((way, i) => (
              <TabsContent
                key={way.value}
                value={way.value}
                className="[grid-area:1/1]"
                initial={false}
                // Hand-off without overlap: the old caption fades out in 120ms, then the new one fades in and
                // rises 8px over 250ms on smoothOut (the app's results entrance)
                animate={
                  i === index
                    ? { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.25, ease: SMOOTH_OUT, delay: reduceMotion ? 0 : 0.12 } }
                    : { opacity: 0, y: reduceMotion ? 0 : 8, transition: { duration: reduceMotion ? 0 : 0.12, ease: "easeOut" } }
                }
              >
                <h3 className="heading text-[22px] text-ink">{way.title}</h3>
                <p className="mt-2 text-[15px] leading-snug text-ink-2">{way.body}</p>
                <span className="sr-only">Screen: {way.alt}</span>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </section>
  )
}
