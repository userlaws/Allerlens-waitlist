"use client"

import { useEffect, useRef, useState } from "react"
import { PauseIcon, PlayIcon } from "@/components/icons"

// The 41 second promo (handoff/promo-video/README.md): landscape on wide screens, the vertical cut on phones.
// No browser controls: the whole picture is one button. Clicking it pauses or plays; a round play button sits in
// the middle while it is paused, and a pause button shows on hover while it plays.
// Nothing downloads until the section is close to the screen. It then plays muted on a loop, and pauses when it
// leaves. If the browser refuses to autoplay, or the visitor prefers reduced motion, the play button stays up.
// The captions are burned into the picture.
const LABEL =
  "AllerLens demo: a restaurant menu opened from a link, each dish labelled Safe, Caution, Avoid or Ask staff, and the card that shows staff your allergies"

export function SeeItWork() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const stoppedRef = useRef(false) // the visitor paused it; scrolling back does not restart it
  const autoPauseRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // React does not write the muted attribute, and Safari will not autoplay without it
    video.muted = true
    video.defaultMuted = true
    video.setAttribute("muted", "")

    const narrow = window.matchMedia("(max-width: 767px)")
    video.poster = narrow.matches ? "/video/allerlens-promo-vertical-poster.jpg" : "/video/allerlens-promo-poster.jpg"

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const onPlay = () => {
      setPlaying(true)
      stoppedRef.current = false
    }
    const onPause = () => {
      setPlaying(false)
      if (!autoPauseRef.current) stoppedRef.current = true
    }
    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)

    // Start loading a screen early, so the first frame is ready when it scrolls in
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "auto"
          loader.disconnect()
        }
      },
      { rootMargin: "600px 0px" },
    )
    loader.observe(video)

    const player = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced && !stoppedRef.current && video.paused) video.play().catch(() => {})
        } else if (!video.paused) {
          autoPauseRef.current = true
          video.pause()
          autoPauseRef.current = false
        }
      },
      { threshold: 0.35 },
    )
    player.observe(video)

    return () => {
      loader.disconnect()
      player.disconnect()
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
    }
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

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
        </div>

        <div className="rounded-[28px] bg-stage p-4 sm:p-6 md:rounded-[40px] md:p-8">
          <div className="promo-player relative mx-auto">
            <video
              ref={videoRef}
              className="promo-video mx-auto block w-full rounded-[14px]"
              muted
              loop
              playsInline
              preload="none"
              aria-label={LABEL}
            >
              <source media="(max-width: 767px)" src="/video/allerlens-promo-vertical.mp4" type="video/mp4" />
              <source src="/video/allerlens-promo.mp4" type="video/mp4" />
              <track kind="captions" src="/video/allerlens-promo.en.vtt" srcLang="en" label="English" />
              <track kind="captions" src="/video/allerlens-promo.es.vtt" srcLang="es" label="Español" />
            </video>

            <button
              type="button"
              className="promo-toggle"
              data-paused={playing ? undefined : ""}
              aria-label={playing ? "Pause the demo" : "Play the demo"}
              onClick={toggle}
            >
              <span className="promo-toggle-icon">
                {playing ? <PauseIcon size={24} /> : <PlayIcon size={28} className="translate-x-[2px]" />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
