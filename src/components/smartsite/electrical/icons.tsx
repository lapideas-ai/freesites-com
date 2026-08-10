// Electrical domain icons — shared across every style variant (Fast
// Response, Trusted Local, Premium Professional). A style may choose *which*
// of these to use and in what order, but the icons themselves aren't
// reauthored per style.
type IconProps = { className?: string; style?: React.CSSProperties };

export function PanelIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h6M9 11h6M9 15h6" strokeLinecap="round" />
    </svg>
  );
}

export function WiringIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M4 5v4a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="5" r="1.5" />
      <circle cx="20" cy="19" r="1.5" />
    </svg>
  );
}

export function LightBulbIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M9 18h6M10 21h4" strokeLinecap="round" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.45 1 1.2 1 2.1h5c0-.9.4-1.65 1-2.1A6 6 0 0 0 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EvPlugIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="6" y="9" width="12" height="10" rx="2" />
      <path d="M9 9V5.5M15 9V5.5" strokeLinecap="round" />
      <path d="M10.5 14h3M12 12.5v3" strokeLinecap="round" />
    </svg>
  );
}

export function InspectionIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 2.5h6v3H9z" />
      <path d="m8.5 12 2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BoltEmergencyIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// One icon per service, in the order sample-data.ts lists Electrical
// services — each distinct, matched by meaning (Panel/Wiring/Lighting/EV/
// Inspection/Emergency), not cycled — a repeated icon reads as a mistake,
// not a design choice.
export const electricalServiceIcons = [PanelIcon, WiringIcon, LightBulbIcon, EvPlugIcon, InspectionIcon, BoltEmergencyIcon];
