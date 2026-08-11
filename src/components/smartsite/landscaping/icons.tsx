// Landscaping domain icons — shared across every style variant this trade
// eventually ships. A style may choose which of these to use and in what
// order, but the icons themselves aren't reauthored per style.
type IconProps = { className?: string; style?: React.CSSProperties };

export function LeafIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19c3-3 6.5-6 10.5-9.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlanIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 16c1.5-4 3-5 5-5s3.5 1 5-1" strokeLinecap="round" />
      <circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SprinklerIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M12 21V11" strokeLinecap="round" />
      <path d="M12 11a3 3 0 0 0 3-3" strokeLinecap="round" />
      <path d="M6 5.5c0 2 1.5 3.5 3 3.5M12 3.5c0 2.2 1.8 4 4 4M17 6c0 1.5 1 2.5 2 2.5" strokeLinecap="round" />
    </svg>
  );
}

export function RakeIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <path d="M6 21 16 5" strokeLinecap="round" />
      <path d="M12 5h6l-2 4H10l2-4Z" strokeLinejoin="round" />
    </svg>
  );
}

export function TreeIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v6" strokeLinecap="round" />
    </svg>
  );
}

export function PathwayIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} style={style}>
      <ellipse cx="7" cy="9" rx="2" ry="3" />
      <ellipse cx="13" cy="14" rx="2" ry="3" />
      <ellipse cx="19" cy="19" rx="2" ry="3" />
    </svg>
  );
}

export const landscapingServiceIcons = [LeafIcon, PlanIcon, SprinklerIcon, RakeIcon, TreeIcon, PathwayIcon];
