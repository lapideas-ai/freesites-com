"use client";

import { useEffect, useState } from "react";

type Design = {
  key: string;
  label: string;
  name: string;
  href: string;
  rationale: string;
  desktop: string;
  mobile: string;
};

const STORAGE_KEY = "ff-design-review-selection";

export default function DesignReviewGallery({ designs }: { designs: Design[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage, an external system, on mount
      if (saved) setSelected(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function select(key: string) {
    setSelected(key);
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      {selected && (
        <div className="rev-selection-banner">
          Current selection: <strong>{designs.find((d) => d.key === selected)?.label} — {designs.find((d) => d.key === selected)?.name}</strong>
        </div>
      )}

      <div className="rev-designs">
        {designs.map((design) => (
          <section className="rev-design" key={design.key} id={design.key}>
            <div className="rev-design-heading">
              <p className="rev-design-label">{design.label}</p>
              <h2>{design.name}</h2>
              <p className="rev-design-rationale">{design.rationale}</p>
            </div>

            <div className="rev-previews">
              <button
                type="button"
                className="rev-frame rev-frame-desktop"
                onClick={() => setLightbox({ src: design.desktop, alt: `${design.name} — full desktop preview` })}
                aria-label={`Enlarge ${design.name} desktop preview`}
              >
                <span className="rev-frame-chrome" aria-hidden="true">
                  <span /><span /><span />
                </span>
                <span className="rev-frame-scroll">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={design.desktop} alt={`${design.name} desktop preview`} loading="lazy" />
                </span>
              </button>

              <button
                type="button"
                className="rev-frame rev-frame-mobile"
                onClick={() => setLightbox({ src: design.mobile, alt: `${design.name} — full mobile preview` })}
                aria-label={`Enlarge ${design.name} mobile preview`}
              >
                <span className="rev-frame-notch" aria-hidden="true" />
                <span className="rev-frame-scroll">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={design.mobile} alt={`${design.name} mobile preview`} loading="lazy" />
                </span>
              </button>
            </div>

            <div className="rev-actions">
              <a className="rev-btn rev-btn-primary" href={design.href} target="_blank" rel="noopener noreferrer">
                View Full Design
              </a>
              <button
                type="button"
                className="rev-btn rev-btn-secondary"
                onClick={() => setLightbox({ src: design.mobile, alt: `${design.name} — full mobile preview` })}
              >
                View Mobile
              </button>
              <button
                type="button"
                className={`rev-btn ${selected === design.key ? "rev-btn-selected" : "rev-btn-outline"}`}
                onClick={() => select(design.key)}
              >
                {selected === design.key ? "✓ Selected" : "Select This Design"}
              </button>
            </div>
          </section>
        ))}
      </div>

      {lightbox && (
        <div className="rev-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button type="button" className="rev-lightbox-close" aria-label="Close preview" onClick={() => setLightbox(null)}>
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
