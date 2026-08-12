// The FreeSites lightning-bolt mark — extracted from Header.tsx so it can
// be reused anywhere else on the site (e.g. the /build wizard chrome)
// without duplicating the SVG.
export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect width="26" height="26" rx="7" fill="#f97316" />
      <path d="M14.5 5.5 8 14.5h4.2l-1.2 6 6.8-9.5h-4.3z" fill="white" />
    </svg>
  );
}
