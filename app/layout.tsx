import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { DevFeedback } from "@/components/dev-feedback"
import { Fraunces } from "next/font/google"
import { SITE_URL } from "@/lib/site"
import "./globals.css"

// The app's display face: Fraunces SemiBold, the only weight it loads
const fraunces = Fraunces({ subsets: ["latin"], weight: "600", variable: "--font-fraunces", display: "swap" })

const APP_STORE_URL = "https://apps.apple.com/app/id6802429618"
const TITLE = "AllerLens: scan restaurant menus for food allergens"

const description =
  "Scan a menu, open it from the QR code on the table, or upload a PDF. AllerLens translates it and checks every dish against the allergens you chose. Free on the App Store for iPhone."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | AllerLens",
  },
  description,
  // The site answers on www, so every canonical is built from metadataBase
  alternates: { canonical: "/" },
  // Safari shows its Smart App Banner from this
  other: { "apple-itunes-app": "app-id=6802429618" },
  keywords: [
    "food allergy app",
    "allergy menu scanner",
    "restaurant allergen app",
    "peanut allergy app",
    "menu translator",
    "restaurant menu allergens",
    "sesame allergy",
    "menu translation",
  ],
  authors: [{ name: "Imanol Aracena" }],
  creator: "Imanol Aracena",
  publisher: "Imanol Aracena",
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
    title: TITLE,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "AllerLens on an iPhone, showing a diner menu with each dish marked Safe, Avoid or Ask staff.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // next-themes sets the "dark" class before paint, so the server markup differs on purpose
    <html lang="en" suppressHydrationWarning className={fraunces.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "AllerLens",
              url: SITE_URL,
              operatingSystem: "iOS",
              applicationCategory: "LifestyleApplication",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              installUrl: APP_STORE_URL,
              downloadUrl: APP_STORE_URL,
              screenshot: [`${SITE_URL}/screens/avoid-and-why.webp`, `${SITE_URL}/screens/translated-menu.webp`],
              author: { "@type": "Person", name: "Imanol Aracena" },
              description,
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <DevFeedback />
      </body>
    </html>
  )
}
