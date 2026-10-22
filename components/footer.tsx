import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-sm">
          <Link href="/" className="text-[20px] font-semibold tracking-[-0.02em] text-ink">
            AllerLens
          </Link>
          <p className="mt-2 text-[14px] leading-snug text-ink-2">
            Guidance, not medical advice. Always confirm ingredients with restaurant staff.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col text-[15px] sm:flex-row sm:gap-6">
          <Link href="/privacy" className="inline-flex min-h-11 items-center text-ink-2 hover:text-ink">
            Privacy policy
          </Link>
          <Link href="/support" className="inline-flex min-h-11 items-center text-ink-2 hover:text-ink">
            Support
          </Link>
          <a
            href="mailto:allerlens.app@gmail.com"
            className="inline-flex min-h-11 items-center text-ink-2 hover:text-ink"
          >
            allerlens.app@gmail.com
          </a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-10 text-[13px] text-ink-2 md:px-8">© 2026 AllerLens</p>
    </footer>
  )
}
