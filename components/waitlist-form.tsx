"use client"

import type React from "react"
import { useState, useEffect, useId, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircleIcon, ExclamationCircleIcon } from "@/components/icons"

type Status = "idle" | "loading" | "success" | "error" | "confirmed" | "unsubscribed"

// A pill on light grey, matching the pill button beside it
const inputClass =
  "h-12 w-full min-w-0 rounded-full border border-transparent bg-surface px-5 text-[16px] text-ink placeholder:text-[var(--placeholder)] transition-colors focus:border-ink"

function Notice({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div role="status" className={`flex max-w-md gap-3 rounded-2xl bg-surface p-5 text-ink ${className}`}>
      <CheckCircleIcon size={24} className="mt-0.5 shrink-0 text-ink" />
      <div className="text-left">
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-[15px] text-ink-2">{children}</p>
      </div>
    </div>
  )
}

function WaitlistFormContent({ note, className }: { note: string; className: string }) {
  const searchParams = useSearchParams()
  const id = useId()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [showPhone, setShowPhone] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [utmParams, setUtmParams] = useState({ source: "", medium: "", campaign: "", ref: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (searchParams.get("confirmed") === "1") {
      setStatus("confirmed")
    } else if (searchParams.get("unsub") === "1") {
      setStatus("unsubscribed")
    }
  }, [searchParams])

  useEffect(() => {
    setUtmParams({
      source: searchParams.get("utm_source") || "",
      medium: searchParams.get("utm_medium") || "",
      campaign: searchParams.get("utm_campaign") || "",
      ref: searchParams.get("ref") || "",
    })
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (honeypot) {
      setStatus("success")
      return
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      setErrorMessage("That email address doesn't look complete. Check it and try again.")
      return
    }

    setStatus("loading")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          // Adding a phone number is the opt-in for text updates.
          smsOptIn: !!phone,
          ...utmParams,
        }),
      })

      if (!res.ok) throw new Error("Failed to join waitlist")

      setStatus("success")
    } catch (error) {
      console.error(error)
      setStatus("error")
      setErrorMessage("We couldn't add you just now. Try again in a minute, or email allerlens.app@gmail.com.")
    }
  }

  if (status === "confirmed") {
    return (
      <Notice title="You're on the list" className={className}>
        Your email is confirmed. We&apos;ll write when the private beta opens.
      </Notice>
    )
  }

  if (status === "unsubscribed") {
    return (
      <Notice title="You've been unsubscribed" className={className}>
        We won&apos;t email you again. You can rejoin any time.
      </Notice>
    )
  }

  if (status === "success") {
    return (
      <Notice title="Check your email" className={className}>
        We sent a confirmation link to <strong className="font-semibold text-ink">{email}</strong>. Open it to keep
        your spot.
      </Notice>
    )
  }

  const errorId = `${id}-error`

  return (
    <form onSubmit={handleSubmit} noValidate className={`max-w-md ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === "error") setStatus("idle")
          }}
          className={inputClass}
          autoComplete="email"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
          required
        />
        <button type="submit" disabled={status === "loading"} className="btn shrink-0">
          {status === "loading" ? "Adding you…" : "Join the waitlist"}
        </button>
      </div>

      {status === "error" && (
        <p id={errorId} role="alert" className="mt-3 flex items-start gap-2 text-left text-[15px] text-avoid">
          <ExclamationCircleIcon size={18} className="mt-0.5 shrink-0" />
          {errorMessage}
        </p>
      )}

      {showPhone ? (
        <div className="mt-3">
          <label htmlFor={`${id}-phone`} className="mb-1.5 block text-[14px] text-ink-2">
            Phone number for text updates (optional)
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowPhone(true)}
          className="mt-2 inline-flex min-h-11 items-center text-[15px] text-ink-2 underline decoration-1 underline-offset-[3px] hover:text-ink"
        >
          Also get text updates
        </button>
      )}

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <p className="mt-1 text-[14px] leading-snug text-ink-2">{note}</p>
    </form>
  )
}

export function WaitlistForm({
  note = "We'll email you when the private beta opens. No spam, and you can unsubscribe any time.",
  className = "",
}: {
  note?: string
  className?: string
}) {
  return (
    <Suspense
      fallback={
        <div className={`flex max-w-md flex-col gap-3 sm:flex-row ${className}`} aria-busy="true">
          <input disabled placeholder="Your email" aria-label="Email address" className={inputClass} />
          <button disabled className="btn shrink-0">
            Join the waitlist
          </button>
        </div>
      }
    >
      <WaitlistFormContent note={note} className={className} />
    </Suspense>
  )
}
