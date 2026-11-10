import Link from "next/link"
import { ThemeSwitch } from "./theme-switch"
import { AppStoreLink } from "./app-store-link"

const links = [
  { href: "/#privacy", label: "Privacy" },
  { href: "/support", label: "Questions" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="font-display flex items-center gap-2.5 text-[22px] font-semibold text-ink">
          <img src="/app-icon.png" alt="" width={28} height={28} className="rounded-[22.4%]" />
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
          <AppStoreLink className="min-h-10 px-4 text-[15px]" label="Get the app" />
        </div>
      </div>
    </header>
  )
}
