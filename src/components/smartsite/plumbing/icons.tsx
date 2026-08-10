// Plumbing domain icons — shared across every style variant (Fast Response,
// Trusted Local, Premium Professional). A style may choose *which* of these
// to use and in what order, but the icons themselves aren't reauthored per style.
type IconProps = { className?: string; style?: React.CSSProperties };

export function DrainSpiralIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5A4.5 4.5 0 0 1 14 16.5 3 3 0 0 1 11 13.5a2 2 0 0 1 2-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WaterHeaterIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="7" y="3" width="10" height="18" rx="3" />
      <path d="M9.5 8h5M9.5 12h5M9.5 16h5" strokeLinecap="round" />
    </svg>
  );
}

export function LeakDropletIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PipeIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M4 8h8a4 4 0 0 1 4 4v4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="8" r="2" />
      <circle cx="16" cy="16" r="2" />
    </svg>
  );
}

export function FaucetIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M6 10V7a2 2 0 0 1 2-2h3v3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 8h6a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 11v3" strokeLinecap="round" />
      <path d="M12 14v3a3 3 0 0 0 6 0" strokeLinecap="round" />
    </svg>
  );
}

export function EmergencyWrenchIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M14.5 6.5a4 4 0 0 1-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 1 5.3-5.3l-2.7 2.7-2-2 2.7-2.7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// One icon per service, in the order sample-data.ts lists Plumbing services —
// each distinct, matched by meaning (Drain/Water Heater/Leak/Pipe/Fixture/
// Emergency), not cycled — a repeated icon reads as a mistake, not a choice.
export const plumbingServiceIcons = [DrainSpiralIcon, WaterHeaterIcon, LeakDropletIcon, PipeIcon, FaucetIcon, EmergencyWrenchIcon];
