import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Stampd — Digital Loyalty Cards for Coffee Shops',
    template: '%s | Stampd',
  },
  description:
    'Stampd gives every coffee shop a branded digital loyalty card that lives in Apple Wallet and Google Wallet — no app download, no paper cards. Now live in Egypt & MENA.',
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
