type IconProps = { className?: string }

export function QrScanIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <rect x="6" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="28" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M28 28h4v4h-4zM36 28h6v6h-6zM28 38h4v4h-4zM38 38h4v4h-4z"
        fill="currentColor"
        opacity="0.85"
      />
      <rect x="11" y="11" width="4" height="4" rx="0.5" fill="currentColor" />
      <rect x="33" y="11" width="4" height="4" rx="0.5" fill="currentColor" />
      <rect x="11" y="33" width="4" height="4" rx="0.5" fill="currentColor" />
    </svg>
  )
}
