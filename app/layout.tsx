import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { DevFeedback } from "@/components/dev-feedback"
import "./globals.css"

const description =
  "AllerLens reads a restaurant menu page by page and checks every dish against your allergies: what to avoid, what looks safe and what to ask staff about. Join the waitlist for the private beta."

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://allerlens.app"),
  title: {
    default: "AllerLens: scan the menu, see what to avoid",
    template: "%s | AllerLens",
  },
  description,
  keywords: [
    "food allergy",
    "allergy app",
    "menu scanner",
    "restaurant menu allergens",
    "peanut allergy",
    "sesame allergy",
    "menu translation",
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
    title: "AllerLens: scan the menu, see what to avoid",
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
    title: "AllerLens: scan the menu, see what to avoid",
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AllerLens",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "iOS",
              description,
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <DevFeedback />
      </body>
    </html>
  )
}
