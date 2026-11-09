// What each way in looks like before the menu is read. Played once per run; all timing is CSS (globals.css, .way-*).
// Camera and QR use the owner's Corner Diner table photo (public/ways); the QR code is real and opens AllerLens on
// the App Store. The in-app browser is the real build 21 screen with Read this menu. Camera strings are the app's.
export type WayKey = "camera" | "qr" | "link" | "pdf"

// How long each input plays before the menu starts reading
export const INPUT_MS: Record<WayKey, number> = { camera: 2600, qr: 3400, link: 3400, pdf: 2800 }

function Brackets({ className = "" }: { className?: string }) {
  return (
    <span className={`way-brackets ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

function Browser() {
  return (
    <div className="way-browser">
      <img src="/screens/menu-link.webp" alt="" width={732} height={1596} />
      <span className="way-tap way-tap-read" aria-hidden="true" />
    </div>
  )
}

function Viewfinder({ src, children }: { src: string; children?: React.ReactNode }) {
  return (
    <div className="way-viewfinder">
      <img src={src} alt="" width={600} height={800} className="way-photo" />
      <div className="way-scrim" aria-hidden="true" />
      <p className="way-cam-title">Scan a menu</p>
      {children}
    </div>
  )
}

export function WayVisual({ way }: { way: WayKey }) {
  if (way === "camera") {
    return (
      <div className="way way-camera" role="img" aria-label="The camera framing a printed Corner Diner menu, then taking the photo.">
        <Viewfinder src="/ways/camera.webp">
          <Brackets />
          <p className="way-cam-hint">Point at the menu. We&apos;ll translate it and flag your allergens.</p>
          <span className="way-shutter" aria-hidden="true">
            <span />
          </span>
          <span className="way-flash" aria-hidden="true" />
        </Viewfinder>
      </div>
    )
  }

  if (way === "qr") {
    return (
      <div className="way way-qr" role="img" aria-label="The camera finding the QR code on the table, then the restaurant's menu opening inside the app with Read this menu.">
        <Viewfinder src="/ways/qr.webp">
          <Brackets className="way-brackets-qr" />
          <span className="way-pill">Open the menu</span>
        </Viewfinder>
        <Browser />
      </div>
    )
  }

  if (way === "link") {
    return (
      <div className="way way-link" role="img" aria-label="A menu link pasted into the app, then the menu opening inside the app with Read this menu.">
        <div className="way-sheet">
          <p className="heading text-[22px] text-[var(--app-ink)]">Open a menu link</p>
          <div className="mt-4 flex items-center gap-2 rounded-[11px] bg-[var(--app-sunken)] px-3.5 py-3 text-[15px] text-[var(--app-ink)]">
            <span className="way-typed">cornerdiner.com/menu</span>
            <span className="way-caret" aria-hidden="true" />
          </div>
          <span className="way-open">Open</span>
        </div>
        <Browser />
      </div>
    )
  }

  return (
    <div className="way way-pdf" role="img" aria-label="A six-page PDF menu chosen from Files, its pages lining up to be read.">
      <div className="way-sheet">
        <p className="heading text-[22px] text-[var(--app-ink)]">Choose a PDF</p>
        <ul className="mt-4 overflow-hidden rounded-[14px] bg-[var(--app-card)]">
          {[
            ["Lunch menu.pdf", "6 pages"],
            ["Wine list.pdf", "2 pages"],
            ["Specials.pdf", "1 page"],
          ].map(([name, pages], i) => (
            <li key={name} className={`way-file flex items-center gap-3 border-[var(--app-line)] px-4 py-3 [&+&]:border-t ${i === 0 ? "way-file-picked" : ""}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-[var(--app-ink-2)]">
                <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <span className="min-w-0 flex-1 text-[15px] text-[var(--app-ink)]">{name}</span>
              <span className="text-[13px] text-[var(--app-ink-2)]">{pages}</span>
            </li>
          ))}
        </ul>
        <p className="way-pages-label mt-5 text-[13px] text-[var(--app-ink-2)]">Lunch menu.pdf · 6 pages, read as one menu</p>
        <div className="mt-2 grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="way-page" style={{ ["--p" as string]: i }} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
