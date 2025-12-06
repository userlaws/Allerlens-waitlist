"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Scan, Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If already on home page, scroll to top
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if scrolled past threshold
      setIsScrolled(currentScrollY > 100)

      // Show/hide header based on scroll direction
      if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show header
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        // Scrolling down and past threshold - hide header on mobile only
        if (isMobile) {
          setIsHeaderVisible(false)
        }
      }

      // Always show at top
      if (currentScrollY < 50) {
        setIsHeaderVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted, isMobile])

  if (!mounted) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-2 md:py-3">
        <div
          className={`mx-auto flex items-center justify-center transition-all duration-500 ease-out ${
            isScrolled
              ? "max-w-fit rounded-full bg-background/95 backdrop-blur-md border border-border shadow-lg px-4 md:px-6 py-2 md:py-2.5 gap-4 md:gap-6"
              : "max-w-full gap-8 md:gap-12"
          }`}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 md:gap-4 hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Go to home page"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center">
              <Scan className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg md:text-xl text-foreground">
              AllerLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 md:gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-background/95 backdrop-blur-md border border-border shadow-lg overflow-hidden">
            <nav className="flex flex-col py-2">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-3"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-3"
              >
                How It Works
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-3"
              >
                FAQ
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
