import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SmallPrint } from "@/components/small-print"

export const metadata: Metadata = {
  title: "Questions and support",
  alternates: { canonical: "/support" },
  description: "Get help with AllerLens: cost, scanning, languages, what the labels mean, wrong results and deleting your data.",
}

export default function SupportPage() {
  return (
    <>
      <Header />
      <main>
        <SmallPrint />
      </main>
      <Footer />
    </>
  )
}
