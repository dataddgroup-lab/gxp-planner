import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GxP Facility Planner',
  description: 'AI-powered GxP facility implementation and validation platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
