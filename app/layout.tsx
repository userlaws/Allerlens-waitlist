import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AllerLens — Scan menus for allergen risks in seconds",
  description:
    "Take a photo of any menu and AllerLens flags dairy, nuts, gluten, and more. Bilingual, multi-column OCR. Join the early access waitlist.",
  keywords: [
    "food allergy",
    "allergen detection",
    "menu scanner",
    "food safety",
    "AI",
    "OCR",
    "gluten free",
    "nut allergy",
  ],
  generator: "v0.app",
  openGraph: {
    title: "AllerLens — Scan menus for allergen risks in seconds",
    description: "Point, scan, and see risks instantly. Join the early access waitlist.",
    type: "website",
    images: [
      {
        url: "https://allerlens.app/og/og-allerlens.png",
        width: 1200,
        height: 630,
        alt: "AllerLens - AI menu scanner for allergen detection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllerLens — Scan menus for allergen risks in seconds",
    description: "Point, scan, and see risks instantly. Join the early access waitlist.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AllerLens",
              applicationCategory: "MobileApplication",
              operatingSystem: "iOS, Android",
              description: "AI menu scanner that flags dairy, nuts, gluten and more.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
