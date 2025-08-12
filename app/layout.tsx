import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "Starr Journals - A place where Hope reflects",
  description: "A journal of faith, feeling, and finding God in code. Bold, messy, beautiful reflections and poetry.",
  keywords: ["journal", "faith", "poetry", "reflection", "spirituality", "personal growth"],
  authors: [{ name: "Starr" }],
  openGraph: {
    title: "Starr Journals",
    description: "A place where Hope reflects—bold, messy, beautiful",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
