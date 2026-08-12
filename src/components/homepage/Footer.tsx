import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center">
        <div className="text-[13px] font-black tracking-tight text-[#1a2f4a]">
          Free<span className="text-[#f97316]">Sites</span>
        </div>
        <p className="text-[12px] font-semibold text-slate-500">Made with ❤️ by FreeSites in the USA</p>
        <SocialIcons variant="light" />
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-slate-400">
          <a href="https://freesites.com/privacypolicy" className="hover:text-slate-600">
            Privacy
          </a>
          <a href="https://freesites.com/termsofservice" className="hover:text-slate-600">
            Terms
          </a>
          <a href="mailto:admin@freesites.com" className="hover:text-slate-600">
            Contact
          </a>
          <a href="/funding" className="hover:text-slate-600">
            FreeSites Funding
          </a>
          <span>© 2026 FreeSites.com LLC</span>
        </div>
      </div>
    </footer>
  );
}
