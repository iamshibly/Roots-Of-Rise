import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Roots of Rise',
    default: 'Roots of Rise — Educate. Empower. Elevate.',
  },
  description:
    'Roots of Rise is a youth-led nonprofit working to create meaningful impact through education, social welfare, and environmental sustainability.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  keywords: [
    'nonprofit', 'NGO', 'youth-led', 'education', 'environment',
    'social welfare', 'Bangladesh', 'volunteer', 'community',
  ],
  authors: [{ name: 'Roots of Rise' }],
  creator: 'Roots of Rise',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Roots of Rise',
    title: 'Roots of Rise — Educate. Empower. Elevate.',
    description:
      'A youth-led nonprofit working to create meaningful impact through education, social welfare, and environmental sustainability.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Roots of Rise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roots of Rise — Educate. Empower. Elevate.',
    description:
      'A youth-led nonprofit working to create meaningful impact through education, social welfare, and environmental sustainability.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo/roots-of-rise-logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
