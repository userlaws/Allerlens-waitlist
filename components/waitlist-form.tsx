"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Loader2, ChevronDown } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [showPhone, setShowPhone] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [utmParams, setUtmParams] = useState({ source: "", medium: "", campaign: "", ref: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setUtmParams({
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      ref: params.get("ref") || "",
    })
  }, [])

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

    // Simulate API call - replace with actual database integration
    // In production, send: email, phone, utmParams.source, utmParams.medium, utmParams.campaign, utmParams.ref
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setStatus("success")
  }

  if (status === "success") {
    return (
      <div className="bg-secondary rounded-2xl p-6 text-center max-w-md mx-auto lg:mx-0">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">You're on the list!</h3>
        <p className="text-sm text-muted-foreground">
          We'll notify you when AllerLens is ready. Check your inbox for a confirmation email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === "error") setStatus("idle")
            }}
            className="h-12 bg-card border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground flex-1"
            aria-label="Email address"
            autoComplete="email"
            required
          />
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
      {status === "error" && <p className="text-sm text-destructive mt-2">{errorMessage}</p>}
    </form>
  )
}
