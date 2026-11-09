// The screen of a 10s screen recording made from real app screens (public/demo, from the simulator shots). Each
// theme has its own set, so the phone matches the site: light opens Taberna El Puerto and shows the Spanish staff
// card; dark opens a recent scan and shows the English one. Only the movement is added: the push between Saved and
// results, the sheet rising over a 40% scrim, and a pointer that taps and drags.
// The timeline lives in globals.css (.demo-*). It pauses when `running` is false.
function Shot({ name, className = "" }: { name: string; className?: string }) {
  return (
    <>
      <img className={`only-light ${className}`} src={`/demo/${name}.webp`} alt="" width={732} height={1596} draggable={false} />
      <img className={`only-dark ${className}`} src={`/demo/${name}-dark.webp`} alt="" width={732} height={1596} draggable={false} />
    </>
  )
}

export function DemoScreen({ running }: { running: boolean }) {
  return (
    <div className="demo" data-run={running}>
      <div className="demo-layer demo-saved">
        <Shot name="saved" />
      </div>
      <div className="demo-layer demo-results">
        <Shot name="results" />
      </div>
      <div className="demo-layer demo-scrim" aria-hidden="true" />
      <div className="demo-layer demo-sheet" aria-hidden="true">
        <Shot name="sheet" />
      </div>
      {/* A pointer arrow (hand-drawn, tip at its top-left) that glides, presses and drags like a screen recording */}
      <svg className="demo-touch" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 2.5v17.2l4.6-4.3 3.3 6.9 3.1-1.5-3.3-6.8h6.4L4 2.5Z"
          fill="#111111"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
