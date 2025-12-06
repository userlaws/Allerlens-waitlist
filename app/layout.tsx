import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://allerlens.app'),
  title: {
    default: "AllerLens — Scan menus for allergen risks in seconds",
    template: "%s | AllerLens"
  },
  description:
    "Take a photo of any menu and AllerLens flags dairy, nuts, gluten, and more. Bilingual, multi-column OCR. Works on noisy, multi-column, and bilingual menus. Join the early access waitlist.",
  keywords: [
    "food allergy",
    "allergen detection",
    "menu scanner",
    "food safety",
    "AI",
    "OCR",
    "gluten free",
    "nut allergy",
    "dairy free",
    "celiac",
    "allergy app",
    "menu analysis",
    "restaurant safety",
  ],
  authors: [{ name: "AllerLens" }],
  creator: "AllerLens",
  publisher: "AllerLens",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AllerLens",
    title: "AllerLens — Scan menus for allergen risks in seconds",
    description: "Point your camera at a menu—AllerLens flags dairy, nuts, gluten and more. Works on noisy, multi-column, and bilingual menus. Join the early access waitlist.",
    images: [
      {
        url: "/metadata.jpg",
        width: 1200,
        height: 630,
        alt: "AllerLens - AI menu scanner for allergen detection. Scan any menu and spot allergens in seconds.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllerLens — Scan menus for allergen risks in seconds",
    description: "Point your camera at a menu—AllerLens flags dairy, nuts, gluten and more. Works on noisy, multi-column, and bilingual menus.",
    images: ["/metadata.jpg"],
    creator: "@AllerLens",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  manifest: "/manifest.json",
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
