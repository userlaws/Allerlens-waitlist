export const APP_STORE_URL = "https://apps.apple.com/app/id6802429618"

// A plain pill that links to the App Store listing. Swap in Apple's official badge artwork when it is added to public/.
export function AppStoreLink({ className = "", label = "Download on the App Store" }: { className?: string; label?: string }) {
  return (
    <a href={APP_STORE_URL} className={`btn ${className}`}>
      {label}
    </a>
  )
}
