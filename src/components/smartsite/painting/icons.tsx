// Painting domain icons — shared across every style variant this trade
// eventually ships. A style may choose which of these to use and in what
// order, but the icons themselves aren't reauthored per style.
type IconProps = { className?: string; style?: React.CSSProperties };

export function RollerIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="3.5" y="6" width="12" height="6" rx="1.5" />
      <path d="M9.5 12v3M9.5 15h4a2 2 0 0 1 2 2v3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HouseIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9.5h12V10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19.5V14h4v5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CabinetIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
      <path d="M12 3.5v17" strokeLinecap="round" />
      <circle cx="9.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SwatchIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M5 4h5a1.5 1.5 0 0 1 1.5 1.5V19a2.5 2.5 0 0 1-5 0V4Z" strokeLinejoin="round" />
      <circle cx="16.5" cy="14.5" r="4" />
    </svg>
  );
}

export function PlankIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M3.5 8h17M3.5 12h17M3.5 16h17" strokeLinecap="round" />
    </svg>
  );
}

export function ClipboardCheckIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="5" y="4.5" width="14" height="17" rx="1.5" />
      <path d="M9 4.5V3h6v1.5" strokeLinecap="round" />
      <path d="M8.5 13l2.2 2.2L15.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const paintingServiceIcons = [RollerIcon, HouseIcon, CabinetIcon, SwatchIcon, PlankIcon, ClipboardCheckIcon];
