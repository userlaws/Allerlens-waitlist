"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Loader2, ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"

function WaitlistFormContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [showPhone, setShowPhone] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [utmParams, setUtmParams] = useState({ source: "", medium: "", campaign: "", ref: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "confirmed" | "unsubscribed">("idle")
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

    if (!email || !email.includes("@")) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
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
          smsOptIn: !!phone, // Implicit opt-in if phone is provided? Or should we add checkbox?
          // Plan said: "Keep your SMS opt-in checkbox as-is; it’s stored in sms_opt_in" 
          // but we don't have a checkbox in the UI, just "Add SMS updates (optional)".
          // I'll assume if they add a phone number, they are opting in, or I should add a checkbox.
          // The current UI just shows the input. I'll treat providing it as opt-in for now.
          ...utmParams,
        }),
      })

      if (!res.ok) throw new Error("Failed to join waitlist")

      setStatus("success")
    } catch (error) {
      console.error(error)
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  if (status === "confirmed") {
    return (
      <div className="bg-secondary rounded-2xl p-6 text-center max-w-md mx-auto lg:mx-0">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Subscription Confirmed!</h3>
        <p className="text-sm text-muted-foreground">
          You're officially on the list. We'll be in touch soon.
        </p>
      </div>
    )
  }

  if (status === "unsubscribed") {
    return (
      <div className="bg-secondary rounded-2xl p-6 text-center max-w-md mx-auto lg:mx-0">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-gray-600" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Unsubscribed</h3>
        <p className="text-sm text-muted-foreground">
          You've been removed from the waitlist.
        </p>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="bg-secondary rounded-2xl p-6 text-center max-w-md mx-auto lg:mx-0">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Check your email</h3>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to <strong>{email}</strong>. Click it to secure your spot.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status === "error") setStatus("idle")
              }}
              className="h-12 bg-card border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground w-full"
              aria-label="Email address"
              autoComplete="email"
              required
            />
            <p className="text-xs text-muted-foreground px-1">Privacy-first.</p>
          </div>
          <Button
            type="submit"
            disabled={status === "loading"}
            className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Joining...
              </>
            ) : (
              "Join the waitlist"
            )}
          </Button>
        </div>

        {!showPhone ? (
          <button
            type="button"
            onClick={() => setShowPhone(true)}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />+ Add SMS updates (optional)
          </button>
        ) : (
          <Input
            type="tel"
            placeholder="Phone number (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 bg-card border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground"
            aria-label="Phone number for SMS updates"
            autoComplete="tel"
            inputMode="tel"
          />
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

        <input type="hidden" name="utm_source" value={utmParams.source} />
        <input type="hidden" name="utm_medium" value={utmParams.medium} />
        <input type="hidden" name="utm_campaign" value={utmParams.campaign} />
        <input type="hidden" name="ref" value={utmParams.ref} />
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center lg:text-left">
        We'll never sell your health data.
      </p>
      {status === "error" && <p className="text-sm text-destructive mt-2">{errorMessage}</p>}
    </form>
  )
}

export function WaitlistForm() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto lg:mx-0">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <Input
                type="email"
                placeholder="Enter your email"
                disabled
                className="h-12 bg-card border-border rounded-xl px-4"
              />
              <p className="text-xs text-muted-foreground px-1">Privacy-first.</p>
            </div>
            <Button
              disabled
              className="h-12 px-6 bg-primary/50 rounded-xl font-medium sm:w-auto"
            >
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </Button>
          </div>
        </div>
      </div>
    }>
      <WaitlistFormContent />
    </Suspense>
  )
}
