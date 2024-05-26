import type { Metadata } from "next"
import { Libre_Franklin } from "next/font/google"

import "./globals.css"

const libre = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "PlayTime | YouTube Playlist Watch Time",
  description: "Calculate watch time of YouTube playlists",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en">
    <body className={`${libre.className} bg-gray-100`}>{children}</body>
  </html>
)

export default RootLayout
