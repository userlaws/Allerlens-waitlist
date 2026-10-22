import Link from "next/link"
import { StatusPanel } from "@/components/status-panel"

export default function NotFound() {
  return (
    <StatusPanel
      tone="neutral"
      title="This page isn't on the menu"
      actions={
        <Link href="/" className="btn">
          Go to the home page
        </Link>
      }
    >
      <p>The link may be old, or the address has a typo.</p>
    </StatusPanel>
  )
}
