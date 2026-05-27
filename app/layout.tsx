import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stampd — Digital Loyalty Cards for Coffee Shops',
  description:
    'Stampd gives every coffee shop a branded digital loyalty card that lives in Apple Wallet and Google Wallet. No app download, no paper cards. Just scan, stamp, and keep customers coming back.',
  metadataBase: new URL('https://stampd.co'),
  openGraph: {
    title: 'Stampd — Digital Loyalty Cards for Coffee Shops',
    description:
      'Digital stamp cards that live inside Apple Wallet & Google Wallet — branded to your café, powered by Stampd.',
    url: 'https://stampd.co',
    siteName: 'Stampd',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stampd — Digital Loyalty Cards for Coffee Shops',
    description: 'No app. No friction. Just loyalty. Built for coffee shops in Egypt & MENA.',
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
