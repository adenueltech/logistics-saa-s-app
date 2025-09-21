import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "FleetFlow - Advanced Logistics & Delivery Management",
  description:
    "Revolutionary logistics platform for real-time tracking, route optimization, and fleet management. Transform your delivery operations with AI-powered insights.",
  generator: "FleetFlow",
  keywords: "logistics, delivery, fleet management, tracking, route optimization, transportation",
  authors: [{ name: "FleetFlow Team" }],
  openGraph: {
    title: "FleetFlow - Advanced Logistics Platform",
    description: "Revolutionary logistics platform for real-time tracking and fleet management",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
