import type { BusinessData } from "@/lib/smartsite/types";
import { PhoneIcon } from "../icons";

export type ContactContent = {
  eyebrow: string;
  heading: string;
  subhead: string;
  smartReplyBadge: string;
  formLabels: { name: string; phone: string; message: string; messagePlaceholder: string; submit: string };
};

export function Contact({ business, content }: { business: BusinessData; content: ContactContent }) {
  return (
    <section id="contact" className="px-4 py-14 sm:px-8 sm:py-20" style={{ background: "var(--ss-paper)" }}>
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }}>
            {content.eyebrow}
          </span>
          <h2 className="ss-display mt-2 text-3xl" style={{ color: "var(--ss-text-on-light)" }}>
            {content.heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ss-text-on-light-dim)" }}>
            {content.subhead}
          </p>

          <div
            className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: "var(--ss-success-soft, rgba(60,154,95,0.12))", color: "var(--ss-success)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ss-success)" }} />
            {content.smartReplyBadge}
          </div>

          <dl className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" style={{ color: "var(--ss-accent-dark, var(--ss-accent))" }} />
              <a href={`tel:${business.phone.replace(/[^\d+]/g, "")}`} className="font-semibold" style={{ color: "var(--ss-text-on-light)" }}>
                {business.phone}
              </a>
            </div>
            <div style={{ color: "var(--ss-text-on-light-dim)" }}>{business.email}</div>
            <div style={{ color: "var(--ss-text-on-light-dim)" }}>
              {business.address.street}, {business.address.city}, {business.address.state} {business.address.zip}
            </div>
            <div style={{ color: "var(--ss-text-on-light-dim)" }}>Serving: {business.serviceArea}</div>
          </dl>
        </div>

        <form
          className="flex flex-col gap-3 rounded-xl p-5"
          style={{ background: "var(--ss-surface, #fff)", border: "1px solid var(--ss-line-dark)" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="flex flex-col gap-1 text-sm font-semibold" style={{ color: "var(--ss-text-on-light)" }}>
            {content.formLabels.name}
            <input
              type="text"
              placeholder="Your name"
              className="rounded-lg px-3 py-2.5 text-sm font-normal outline-none"
              style={{ border: "1px solid var(--ss-line-dark)" }}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold" style={{ color: "var(--ss-text-on-light)" }}>
            {content.formLabels.phone}
            <input
              type="tel"
              placeholder="(555) 123-4567"
              className="rounded-lg px-3 py-2.5 text-sm font-normal outline-none"
              style={{ border: "1px solid var(--ss-line-dark)" }}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold" style={{ color: "var(--ss-text-on-light)" }}>
            {content.formLabels.message}
            <textarea
              rows={3}
              placeholder={content.formLabels.messagePlaceholder}
              className="resize-none rounded-lg px-3 py-2.5 text-sm font-normal outline-none"
              style={{ border: "1px solid var(--ss-line-dark)" }}
            />
          </label>
          <button
            type="submit"
            className="mt-1 rounded-lg py-3 text-sm font-bold"
            style={{ background: "var(--ss-accent)", color: "var(--ss-text-on-dark)" }}
          >
            {content.formLabels.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
