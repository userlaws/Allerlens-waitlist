"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { StatusPanel } from "@/components/status-panel"

// /api/waitlist/confirm redirects here with ?confirmed=1 or ?confirmed=0.
function ConfirmContent() {
  const confirmed = useSearchParams().get("confirmed")

  if (confirmed === "1") {
    return (
      <StatusPanel
        tone="ok"
        title="You're on the list"
        actions={
          <Link href="/" className="btn">
            Back to AllerLens
          </Link>
        }
      >
        <p>Your email is confirmed. A welcome email is on its way, and we&apos;ll write again when the private beta opens.</p>
      </StatusPanel>
    )
  }

  if (confirmed === "0") {
    return (
      <StatusPanel
        tone="problem"
        title="That link didn't work"
        actions={
          <>
            <Link href="/#waitlist" className="btn">
              Sign up again
            </Link>
            <a href="mailto:allerlens.app@gmail.com" className="text-link">
              Email us
            </a>
          </>
        }
      >
        <p>
          Confirmation links expire after 48 hours, and each one works once. Sign up again and we&apos;ll send a fresh
          link.
        </p>
      </StatusPanel>
    )
  }

  return (
    <StatusPanel
      tone="neutral"
      title="Confirm from your inbox"
      actions={
        <Link href="/" className="text-link">
          Back to AllerLens
        </Link>
      }
    >
      <p>Open the link in the email we sent you to confirm your spot on the waitlist.</p>
    </StatusPanel>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <ConfirmContent />
    </Suspense>
  )
}
