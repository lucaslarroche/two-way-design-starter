import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "two-way-design-starter",
  description: "Two-way design system sync between Figma and Storybook/code using Claude Code",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
