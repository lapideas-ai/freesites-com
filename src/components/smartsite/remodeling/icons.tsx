// Remodeling domain icons — shared across every style variant this trade
// eventually ships. A style may choose which of these to use and in what
// order, but the icons themselves aren't reauthored per style.
type IconProps = { className?: string; style?: React.CSSProperties };

export function BlueprintIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M8 3.5v17M3.5 12h17" strokeLinecap="round" />
      <circle cx="15" cy="7.5" r="1.4" />
    </svg>
  );
}

export function BathIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" strokeLinejoin="round" />
      <path d="M6 12V7a2 2 0 0 1 3.5-1.3" strokeLinecap="round" />
      <path d="M4 19v1.5M18 19v1.5" strokeLinecap="round" />
    </svg>
  );
}

export function StructureIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M4 20V9l8-5 8 5v11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20h16M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CompassDraftIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <circle cx="12" cy="7" r="2.5" />
      <path d="M12 9.5 6 20M12 9.5l6 10.5M6 20h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LevelIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="2.5" y="10" width="19" height="5" rx="1.5" />
      <circle cx="12" cy="12.5" r="1.6" />
    </svg>
  );
}

export function ClipboardListIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="5" y="4.5" width="14" height="17" rx="1.5" />
      <path d="M9 4.5V3h6v1.5" strokeLinecap="round" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4.5" strokeLinecap="round" />
    </svg>
  );
}

export const remodelingServiceIcons = [
  BlueprintIcon,
  BathIcon,
  StructureIcon,
  CompassDraftIcon,
  LevelIcon,
  ClipboardListIcon,
];
