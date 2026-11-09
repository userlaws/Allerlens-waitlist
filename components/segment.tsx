// The app's segmented control: a pill track with one white thumb that slides to the chosen segment.
// Segments are equal widths, so the thumb is one element moved with a CSS transform (250ms on the app's
// smoothOut curve). Nothing is measured, so it slides the same way whether a person or the auto-play moves it.
export function Segment<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  const index = Math.max(0, options.findIndex((o) => o.value === value))
  return (
    <div role="group" aria-label={label} className="segment">
      <span
        aria-hidden="true"
        className="segment-thumb"
        style={{ width: `calc((100% - 6px) / ${options.length})`, transform: `translateX(${index * 100}%)` }}
      />
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} className="segment-item" onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
