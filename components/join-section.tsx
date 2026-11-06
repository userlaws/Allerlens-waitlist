import { AppStoreLink } from "./app-store-link"

export function JoinSection() {
  return (
    <section id="get-the-app" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end md:gap-12 md:px-8 md:py-28">
        <div>
          <h2 className="display text-[38px] text-ink md:text-[56px]">Get AllerLens</h2>
          <p className="mt-5 max-w-[28rem] text-[18px] leading-relaxed text-ink-2">
            Free on the App Store, for iPhone. There is no sign-up and nothing to buy.
          </p>
        </div>
        <div>
          <AppStoreLink />
        </div>
      </div>
    </section>
  )
}
