"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ThemeToggler } from "@animate-ui/react/primitives/effects/theme-toggler"
import { MoonIcon, SunIcon } from "./icons"

// Just a sun or a moon: the icon shows the current theme and turns into the other one when tapped.
// Which icon shows is decided by the "dark" class on <html> in CSS, so it is right before React loads.
// Animate UI's ThemeToggler wipes the new theme in from the right; with reduced motion it switches instantly.
export function ThemeSwitch() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <ThemeToggler
      theme={(theme ?? "system") as "light" | "dark" | "system"}
      resolvedTheme={resolvedTheme === "dark" ? "dark" : "light"}
      setTheme={setTheme}
      direction="rtl"
    >
      {({ resolved, toggleTheme }) => {
        // The server can't know the theme, so the switch reads "off" until the page has loaded
        const dark = mounted && resolved === "dark"
        return (
          <button
            type="button"
            role="switch"
            aria-checked={dark}
            aria-label="Dark mode"
            onClick={() => toggleTheme(dark ? "light" : "dark")}
            className="relative inline-flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-70"
          >
            <SunIcon size={21} className="theme-icon theme-icon-sun" />
            <MoonIcon size={19} className="theme-icon theme-icon-moon" />
          </button>
        )
      }}
    </ThemeToggler>
  )
}
