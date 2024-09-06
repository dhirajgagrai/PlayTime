import type { Metadata } from "next"
import { Libre_Franklin } from "next/font/google"

import "./globals.css"

const libre = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "TubeTime | YouTube Playlist Watch Time",
  description: "Know watch time of YouTube playlists",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => (
  <html lang="en">
    <body className={`${libre.className} bg-gray-100`}>{children}</body>
  </html>
)

export default RootLayout
