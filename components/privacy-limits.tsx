import Link from "next/link"
import { AppStoreLink } from "./app-store-link"

// Two plain statements, side by side: what stays on the phone, and what the app cannot promise.
// Wording follows docs/privacy-policy.html and the App Store description.
export function PrivacyLimits() {
  return (
    <section id="privacy" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div>
          <h2 className="display text-[32px] text-ink sm:text-[40px]">Your allergies stay on your phone.</h2>
          <p className="mt-5 max-w-[30rem] text-[17px] leading-relaxed text-ink-2">
            There is no account and no sign-in. Your allergen list and saved scans stay on the phone. Menu photos, PDFs
            and page text go to our server only to be read, then are discarded.
          </p>
          <p className="mt-4">
            <Link href="/privacy" className="text-link inline-flex min-h-11 items-center text-[17px]">
              Read the privacy policy
            </Link>
          </p>
        </div>
        <div>
          <h2 className="display text-[32px] text-ink sm:text-[40px]">It&apos;s AI, and AI makes mistakes.</h2>
          <p className="mt-5 max-w-[30rem] text-[17px] leading-relaxed text-ink-2">
            Results are guidance, not medical advice. Always confirm ingredients and preparation with restaurant staff
            before you order, especially if your allergy is severe.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <AppStoreLink />
            <span className="text-[15px] text-ink-2">Free · iPhone only</span>
          </div>
        </div>
      </div>
    </section>
  )
}
