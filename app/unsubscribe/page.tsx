"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import Link from "next/link"
import { StatusPanel } from "@/components/status-panel"

// Reached from the email footer (?e=email) or from /api/unsubscribe's one-click redirect (?success=1|0).
function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("e")
  const success = searchParams.get("success")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleUnsubscribe = async () => {
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (success === "1" || status === "success") {
    return (
      <StatusPanel
        tone="neutral"
        title="You're unsubscribed"
        actions={
          <Link href="/" className="text-link">
            Back to AllerLens
          </Link>
        }
      >
        <p>We&apos;ve removed you from the AllerLens waitlist and won&apos;t email you again. You can rejoin any time.</p>
      </StatusPanel>
    )
  }

  if (success === "0" || status === "error") {
    return (
      <StatusPanel
        tone="problem"
        title="We couldn't unsubscribe you"
        actions={
          <a href="mailto:allerlens.app@gmail.com?subject=Unsubscribe" className="btn">
            Email us to unsubscribe
          </a>
        }
      >
        <p>Something went wrong on our side. Email us and we&apos;ll remove you by hand.</p>
      </StatusPanel>
    )
  }

  if (!email) {
    return (
      <StatusPanel
        tone="problem"
        title="This link is incomplete"
        actions={
          <a href="mailto:allerlens.app@gmail.com?subject=Unsubscribe" className="btn">
            Email us to unsubscribe
          </a>
        }
      >
        <p>Use the unsubscribe link at the bottom of any AllerLens email, or email us and we&apos;ll remove you.</p>
      </StatusPanel>
    )
  }

  return (
    <StatusPanel
      tone="neutral"
      title="Leave the waitlist?"
      actions={
        <>
          <button type="button" onClick={handleUnsubscribe} disabled={status === "loading"} className="btn">
            {status === "loading" ? "Unsubscribing…" : "Unsubscribe"}
          </button>
          <Link href="/" className="text-link">
            Keep my spot
          </Link>
        </>
      }
    >
      <p>
        We&apos;ll remove <strong className="font-semibold text-ink">{email}</strong> from the AllerLens waitlist and
        stop emailing you.
      </p>
    </StatusPanel>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <UnsubscribeContent />
    </Suspense>
  )
}
