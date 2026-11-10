import Link from "next/link"
import { AppStoreLink } from "./app-store-link"

// The page ends where a visitor decides: one download, and the honest answer to "what does it cost?" (nothing).
export function GetIt() {
  return (
    <section id="get-the-app" className="border-t border-line bg-[var(--sunken)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <img src="/app-icon.png" alt="The AllerLens app icon." width={88} height={88} className="rounded-[22.4%] shadow-[var(--lift)]" />
        <h2 className="display mt-8 max-w-[14ch] text-[44px] text-ink sm:text-[60px] lg:text-[80px]">Try it at your next meal.</h2>
        <p className="mt-6 max-w-[30rem] text-[18px] leading-relaxed text-ink-2">
          A free food allergy app for iPhone, made for eating out.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <AppStoreLink className="min-h-14 px-8 text-[18px]" />
          <Link href="/support" className="text-link inline-flex min-h-11 items-center text-[17px]">
            Questions? Read the small print
          </Link>
        </div>

        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
          {[
            ["Price", "Free"],
            ["In-app purchases", "None"],
            ["Account", "Not needed"],
            ["Works on", "iPhone"],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-[13px] text-ink-2">{term}</dt>
              <dd className="heading mt-1 text-[24px] text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
