import { WaitlistForm } from "./waitlist-form"

export function JoinSection() {
  return (
    <section id="waitlist" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end md:gap-12 md:px-8 md:py-28">
        <div>
          <h2 className="display text-[38px] text-ink md:text-[56px]">Get an invite to the private beta</h2>
          <p className="mt-5 max-w-[28rem] text-[18px] leading-relaxed text-ink-2">
            Leave your email. You&apos;ll get a confirmation link now, and an invite when the beta opens.
          </p>
        </div>
        <WaitlistForm note="No spam. You can unsubscribe any time." />
      </div>
    </section>
  )
}
