import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tanvin Waseef - Video Editor & Creative Professional",
  description:
    "Passionate Video Editor, Image Editor & Prompt Engineer. Transforming ideas into compelling visual content since 2020. Based in Dhaka, Bangladesh.",
  keywords: "video editing, image editing, AI prompting, creative content, Premiere Pro, After Effects, Bangladesh",
  authors: [{ name: "Tanvin Waseef" }],
  creator: "Tanvin Waseef",
  openGraph: {
    title: "Tanvin Waseef - Video Editor & Creative Professional",
    description:
      "Passionate Video Editor, Image Editor & Prompt Engineer. Transforming ideas into compelling visual content since 2020.",
    url: "https://tanvinwaseef.com",
    siteName: "Tanvin Waseef Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvin Waseef - Video Editor & Creative Professional",
    description:
      "Passionate Video Editor, Image Editor & Prompt Engineer. Transforming ideas into compelling visual content since 2020.",
    creator: "@tha_introvert_bro",
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
