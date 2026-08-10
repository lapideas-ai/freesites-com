// Real SVG icons replacing the legacy footer's text glyphs (𝕏, f, in, ig).
// URLs preserved exactly from legacy/index.html — no new platforms added.
const SOCIALS = [
  {
    name: "X",
    href: "https://x.com/freesites_com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/freesitesdotcom",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/freesites/",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z",
    circle: { cx: 4, cy: 4, r: 2 },
  },
  {
    name: "Instagram",
    href: "https://instagram.com/freesites/",
    isInstagram: true,
  },
];

export function SocialIcons({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const styles =
    variant === "light"
      ? "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-[#1a2f4a] focus-visible:ring-[#f97316]"
      : "bg-white/8 text-white/60 hover:bg-white/15 hover:text-white focus-visible:ring-[var(--fs-blue3)]";
  return (
    <div className="flex items-center gap-2">
      {SOCIALS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`FreeSites on ${social.name}`}
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 ${styles}`}
        >
          {social.isInstagram ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5.5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={social.path} />
              {social.circle && <circle cx={social.circle.cx} cy={social.circle.cy} r={social.circle.r} />}
            </svg>
          )}
        </a>
      ))}
    </div>
  );
}
