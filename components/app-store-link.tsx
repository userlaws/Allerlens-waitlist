export const APP_STORE_URL = "https://apps.apple.com/app/id6802429618"

// A plain button that links to the App Store listing. Swap in Apple's official badge artwork when it is added to public/.
// onStage flips it to white with teal text, for use on the teal panels.
export function AppStoreLink({
  className = "",
  label = "Download on the App Store",
  onStage = false,
}: {
  className?: string
  label?: string
  onStage?: boolean
}) {
  return (
    <a href={APP_STORE_URL} className={`btn ${onStage ? "btn-on-stage" : ""} ${className}`}>
      {label}
    </a>
  )
}
