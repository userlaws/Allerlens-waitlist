"use client"

import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "./icons"

// Just a sun or a moon. Tapping it grows the new theme out of the icon as a circle that covers the page (a View
// Transition), so the page, the app pieces and the phone in the hero all change together. Browsers without View
// Transitions, and reduced motion, switch instantly. The icon follows the "dark" class in CSS, so it is right
// before React loads.
export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === "dark"

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = dark ? "light" : "dark"
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!document.startViewTransition || reduce) {
      setTheme(next)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 560, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      )
    })
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={toggle}
      className="relative inline-flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-70"
    >
      <SunIcon size={21} className="theme-icon theme-icon-sun" />
      <MoonIcon size={19} className="theme-icon theme-icon-moon" />
    </button>
  )
}
