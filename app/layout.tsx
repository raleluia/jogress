import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Jogress — Digimon TCG Card Browser',
  description: 'Search and browse every Digimon Card Game card',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Inter:wght@300..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text font-body antialiased">
        <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
          <nav className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="font-display text-2xl font-bold text-primary tracking-widest uppercase">
              Jogress
            </a>
            {/* Nav links */}
            <div className="flex items-center gap-6 text-sm text-muted">
              <a href="/search" className="hover:text-text transition-colors">Cards</a>
              <a href="/sets" className="hover:text-text transition-colors">Sets</a>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}