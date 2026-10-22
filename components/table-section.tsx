// Generated scenes with the app's real screens composited into the phones (originals in assets/photos).
const gijon = [
  {
    src: "/photos/gijon-reading.webp",
    alt: "At a seafront table in Gijón, a hand holds a phone showing Taberna El Puerto's menu translated into English, beside the printed Spanish menu and a plate of croquetas.",
    title: "Read it in English",
    body: "AllerLens detects the menu's language and translates it into English or Spanish. The original dish name stays underneath, so you can point to the right line.",
  },
  {
    src: "/photos/gijon-showing.webp",
    alt: "A phone held out across the table shows the AllerLens staff card in Spanish: Alergia, Cacahuetes (maní) · Sésamo.",
    title: "Then turn it around",
    body: "Show staff my allergies puts them on screen in the language of the menu, with the question your server can answer: does this dish contain any of these?",
  },
]

export function TableSection() {
  return (
    <section id="at-the-table" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <h2 className="display text-[38px] text-ink md:text-[52px]">At the table</h2>
          <p className="mt-5 text-[18px] leading-relaxed text-ink-2">
            Corner Diner in New York and Taberna El Puerto in Gijón, as AllerLens sees them.
          </p>
        </div>

        <figure className="mt-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[1.777] md:rounded-[28px]">
            <picture>
              <source media="(min-width: 640px)" srcSet="/photos/diner-wide.webp" />
              <img
                src="/photos/diner-tall.webp"
                alt="A hand holds a phone running AllerLens over Corner Diner's printed menu. The app marks Peanut Satay and Sesame Ginger Avoid, Ice Cream Ask staff, and the rest Safe."
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-bottom"
              />
            </picture>
          </div>
          <figcaption className="mt-5 max-w-[30rem]">
            <p className="text-[15px] font-semibold text-ink-2">Corner Diner, New York</p>
            <h3 className="heading mt-1 text-[24px] text-ink md:text-[26px]">Check it before you order</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-2">
              Peanut Satay and Sesame Ginger come back Avoid, Ice Cream Ask staff, and the rest Safe.
            </p>
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8">
          {gijon.map((moment) => (
            <figure key={moment.src}>
              <div className="overflow-hidden rounded-[24px]">
                <img
                  src={moment.src}
                  alt={moment.alt}
                  width={1672}
                  height={941}
                  loading="lazy"
                  className="aspect-[16/10] h-auto w-full object-cover"
                />
              </div>
              <figcaption className="mt-5 max-w-[30rem]">
                <p className="text-[15px] font-semibold text-ink-2">Taberna El Puerto, Gijón</p>
                <h3 className="heading mt-1 text-[24px] text-ink md:text-[26px]">{moment.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{moment.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
