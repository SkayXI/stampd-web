import type { ReactNode } from 'react'

type IconProps = { className?: string }

const stroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function IconShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden
    >
      {children}
    </svg>
  )
}

export function WalletIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <rect x="3" y="6" width="18" height="14" rx="2.5" {...stroke} />
      <path d="M3 10h18" {...stroke} />
      <path d="M16 14.5h2" {...stroke} />
      <rect x="7" y="3" width="10" height="4" rx="1.5" {...stroke} />
    </IconShell>
  )
}

export function StampIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M8 4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2H8V4z"
        {...stroke}
      />
      <path d="M6 6h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6z" {...stroke} />
      <circle cx="9" cy="13" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="9" cy="17" r="1.25" fill="currentColor" stroke="none" opacity="0.35" />
      <circle cx="12" cy="17" r="1.25" fill="currentColor" stroke="none" opacity="0.35" />
    </IconShell>
  )
}

export function QrStampIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" {...stroke} />
      <rect x="14" y="3" width="7" height="7" rx="1" {...stroke} />
      <rect x="3" y="14" width="7" height="7" rx="1" {...stroke} />
      <path d="M14 14h2v2h-2zM18 14h3v3h-3zM14 18h2v3h-2zM18 21h3" {...stroke} />
      <path d="M21 3L3 21" {...stroke} strokeWidth={2} opacity="0.85" />
    </IconShell>
  )
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M12 3a8 8 0 0 0-6.9 12.1L3 21l5.1-1.5A8 8 0 1 0 12 3z"
        {...stroke}
      />
      <path d="M8.5 10.5c.4 1.6 2.1 3.2 3.8 3.5" {...stroke} />
      <path d="M9 9.5c1.2 2.4 3.6 4.2 5.8 4.5" {...stroke} opacity="0.55" />
    </IconShell>
  )
}

export function BirthdayIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M4 14h16v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5z" {...stroke} />
      <path d="M4 14c0-2 2.5-3.5 8-3.5S20 12 20 14" {...stroke} />
      <path d="M12 6v3M9.5 5.5l1 2M14.5 5.5l-1 2" {...stroke} />
      <circle cx="8" cy="17" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="16" cy="17" r="0.75" fill="currentColor" stroke="none" />
    </IconShell>
  )
}

export function CrmIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M4 19V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14" {...stroke} />
      <path d="M4 16h16" {...stroke} />
      <path d="M8 19v2M16 19v2" {...stroke} />
      <path d="M7 12v4M11 9v7M15 11v5M19 8v8" {...stroke} strokeWidth={2.25} />
    </IconShell>
  )
}
