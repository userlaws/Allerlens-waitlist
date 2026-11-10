"use client"

import { useEffect, useRef } from "react"

// The 41 second promo (handoff/promo-video/README.md): landscape on wide screens, the vertical cut on phones.
// Nothing downloads until the section is near the screen. It then plays muted on a loop, and pauses when it leaves.
// With reduced motion it never starts by itself: the poster and the browser's own play button are shown.
// The captions are also burned into the picture, so neither track is on by default; both are in the captions menu.
const LABEL =
  "AllerLens demo: a restaurant menu opened from a link, each dish labelled Safe, Caution, Avoid or Ask staff, and the card that shows staff your allergies"

export function SeeItWork() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // The poster follows the same breakpoint as the <source media> below
    const narrow = window.matchMedia("(max-width: 767px)")
    video.poster = narrow.matches ? "/video/allerlens-promo-vertical-poster.jpg" : "/video/allerlens-promo-poster.jpg"

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let stopped = false // the visitor paused it; leave it alone
    const onPause = () => {
      if (!video.dataset.auto) stopped = true
    }
    const onPlay = () => {
      stopped = false
    }
    video.addEventListener("pause", onPause)
    video.addEventListener("play", onPlay)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!stopped) video.play().catch(() => {})
        } else if (!video.paused) {
          video.dataset.auto = "1"
          video.pause()
          delete video.dataset.auto
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => {
      observer.disconnect()
      video.removeEventListener("pause", onPause)
      video.removeEventListener("play", onPlay)
    }
  }, [])

  return (
    <section id="see-it-work" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] md:gap-14 md:px-8 md:py-28">
        <div>
          <h2 className="display text-[36px] text-ink sm:text-[44px] lg:text-[54px]">See it work.</h2>
          <p className="mt-5 max-w-[30rem] text-[18px] leading-relaxed text-ink-2">
            AllerLens is an allergy menu scanner for restaurant menus.{" "}
            Scan the menu, every page, or open it from a link or the QR code on the table. Every dish gets a label:
            Safe, Caution, Avoid or Ask staff. Tap a dish to see why. Show staff a card with your allergies, in the
            menu&apos;s language.
          </p>
          <p className="mt-4 text-[15px] text-ink-2">41 seconds · No sound · Captions in English and Spanish</p>
        </div>

        <div className="rounded-[28px] bg-stage p-4 sm:p-6 md:rounded-[40px] md:p-8">
          <video
            ref={ref}
            className="promo-video mx-auto block w-full rounded-[14px]"
            muted
            loop
            playsInline
            controls
            preload="none"
            aria-label={LABEL}
          >
            <source media="(max-width: 767px)" src="/video/allerlens-promo-vertical.mp4" type="video/mp4" />
            <source src="/video/allerlens-promo.mp4" type="video/mp4" />
            <track kind="captions" src="/video/allerlens-promo.en.vtt" srcLang="en" label="English" />
            <track kind="captions" src="/video/allerlens-promo.es.vtt" srcLang="es" label="Español" />
          </video>
        </div>
      </div>
    </section>
  )
}
