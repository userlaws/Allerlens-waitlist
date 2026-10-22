import { PhoneFrame } from "./phone-frame"
import { WaitlistForm } from "./waitlist-form"

// Rows cut straight from the Corner Diner screen (public/screens/rows), enlarged beside the phone that shows them,
// the way flighty.com's hero sets real notifications around its phone. `at` is the row's centre as a share of the
// phone's height, so each callout sits level with its own row. Phones under 768px show three, alternating sides.
const callouts = [
  { src: "/screens/rows/ice-cream.webp", h: 184, side: "right", at: 0.282, phone: true },
  { src: "/screens/rows/fruit-plate.webp", h: 116, side: "left", at: 0.375, phone: false },
  { src: "/screens/rows/peanut-satay.webp", h: 184, side: "left", at: 0.528, phone: true, desktopSide: "right" },
  { src: "/screens/rows/sesame-ginger.webp", h: 183, side: "right", at: 0.847, phone: true, desktopSide: "left" },
] as const

export function HeroSection() {
  return (
    <section className="overflow-hidden px-3 pb-12 pt-12 md:px-6 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-4xl px-2 text-center">
        <h1 className="display text-[40px] text-ink sm:text-[56px] lg:text-[68px]">
          Scan the menu. <br className="hidden sm:inline" />
          See what to avoid, and&nbsp;why.
        </h1>
        <p className="mx-auto mt-5 max-w-[34rem] text-[18px] leading-relaxed text-ink-2 md:text-[19px]">
          AllerLens reads a restaurant menu page by page and checks every dish against the allergies you set.
        </p>
        <WaitlistForm className="mx-auto mt-8 text-center" />
      </div>

      <div className="hero-stage relative mx-auto mt-12 max-w-[1000px] md:mt-14">
        <PhoneFrame
          src="/screens/scan-every-page.webp"
          alt="Corner Diner in the app: Ice Cream marked Ask staff, Fruit Plate Safe, Peanut Satay Avoid, Honey Mustard and Ranch Safe, Sesame Ginger Avoid."
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, 220px"
          priority
          className="mx-auto w-[var(--phone)]"
        />
        {callouts.map((c, i) => (
          <img
            key={c.src}
            src={c.src}
            alt=""
            width={676}
            height={c.h}
            data-side={c.side}
            data-desktop-side={"desktopSide" in c ? c.desktopSide : c.side}
            data-phone={c.phone ? "show" : "hide"}
            className="callout"
            style={{ top: `${c.at * 100}%`, animationDelay: `${0.2 + i * 0.08}s` }}
          />
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl px-2 text-center text-[14px] leading-snug text-ink-2">
        Guidance, not medical advice. Always confirm ingredients with restaurant staff before you order.
      </p>
    </section>
  )
}
