"use client"

import dynamic from "next/dynamic"

// Agentation's annotation toolbar, for giving design feedback while developing.
// It loads only under `next dev`, so the live site never downloads it.
const Agentation = dynamic(() => import("agentation").then((m) => m.Agentation), { ssr: false })

export function DevFeedback() {
  if (process.env.NODE_ENV !== "development") return null
  return <Agentation />
}
