import Link from "next/link"
import { ThemeSwitch } from "./theme-switch"

const links = [
  { href: "/#see-it-in-action", label: "What it does" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#faq", label: "Questions" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="text-[20px] font-semibold tracking-[-0.02em] text-ink">
          AllerLens
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 text-[15px] lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-ink-2 transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitch />
          <a href="/#waitlist" className="btn min-h-10 px-4 text-[15px]">
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  )
}
