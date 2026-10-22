import Link from "next/link"

// Every line here comes from the privacy policy (app/privacy/page.tsx). Change both together.
const rows = [
  { what: "Your allergies", where: "On your phone. Matching against the menu happens on the device too." },
  { what: "Scans and saved dishes", where: "On your phone." },
  { what: "Menu photos", where: "Sent over HTTPS to read the menu, then discarded. Never stored." },
  { what: "Location", where: "Optional. Used to find the city, postal code and country. Never sent to AllerLens." },
  { what: "Account", where: "There isn't one. Nothing to sign up for or sign in to." },
  {
    what: "Problem reports",
    where: "Only if you send one: the dish, its tag, the reason you picked and the app version. Nothing that identifies you.",
  },
]

export function PrivacySection() {
  return (
    <section id="privacy" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 className="display text-[38px] text-ink md:text-[52px]">Your allergies stay on your phone</h2>
          <p className="mt-5 max-w-[30rem] text-[18px] leading-relaxed text-ink-2">
            To read a menu, the photo goes to our server, which passes it or its text to Anthropic (Claude) and Google
            Cloud Vision. Your allergy list never leaves the phone, and the photo isn&apos;t kept.
          </p>
          <p className="mt-5">
            <Link href="/privacy" className="text-link inline-flex min-h-11 items-center text-[17px]">
              Read the privacy policy
            </Link>
          </p>
        </div>

        <dl className="rows self-start">
          {rows.map((row) => (
            <div key={row.what} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6 sm:px-6">
              <dt className="text-[15px] font-semibold text-ink">{row.what}</dt>
              <dd className="text-[15px] leading-snug text-ink-2">{row.where}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
