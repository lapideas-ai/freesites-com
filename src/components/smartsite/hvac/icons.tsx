// HVAC domain icons — shared across every style variant (Fast Response,
// Trusted Local, Premium Professional). A style may choose *which* of these
// to use and in what order, but the icons themselves aren't reauthored per style.
type IconProps = { className?: string; style?: React.CSSProperties };

export function FlameIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M12 2.5c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-1 .3-1.8.8-2.6.3.9 1 1.4 1.7 1.1-.6-2-.2-4.4 1.5-7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SnowflakeIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12" strokeLinecap="round" />
      <path d="M12 2l-2 2M12 2l2 2M12 22l-2-2M12 22l2-2M4.5 6l2.7-.5M4.5 6l.5 2.7M19.5 6l-2.7-.5M19.5 6l-.5 2.7M4.5 18l2.7.5M4.5 18l.5-2.7M19.5 18l-2.7.5M19.5 18l-.5-2.7" strokeLinecap="round" />
    </svg>
  );
}

export function PumpIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="4" y="8" width="10" height="10" rx="1.5" />
      <path d="M14 11h3.5L20 8.5M14 15h3.5L20 17.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 8V5.5M11 8V5.5" strokeLinecap="round" />
    </svg>
  );
}

export function DropletIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BoltIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WrenchIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M14.5 6.5a4 4 0 0 1-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 1 5.3-5.3l-2.7 2.7-2-2 2.7-2.7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// One icon per service, in the order sample-data.ts lists HVAC services —
// each distinct, matched by meaning (AC/Furnace/Pump/Air/Maintenance/Emergency),
// not cycled — a repeated icon reads as a mistake, not a design choice.
export const hvacServiceIcons = [SnowflakeIcon, FlameIcon, PumpIcon, DropletIcon, WrenchIcon, BoltIcon];
