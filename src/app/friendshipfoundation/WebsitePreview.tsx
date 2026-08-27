"use client";

import { useState } from "react";

export default function WebsitePreview({
  desktopSrc,
  mobileSrc,
  siteHref,
}: {
  desktopSrc: string;
  mobileSrc: string;
  siteHref: string;
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="rev-previews">
        <a
          className="rev-frame rev-frame-desktop"
          href={siteHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the live website"
        >
          <span className="rev-frame-chrome" aria-hidden="true">
            <span /><span /><span />
          </span>
          <span className="rev-frame-scroll">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={desktopSrc} alt="Friendship Foundation website — desktop view" loading="lazy" />
          </span>
        </a>

        <button
          type="button"
          className="rev-frame rev-frame-mobile"
          onClick={() => setLightbox(mobileSrc)}
          aria-label="Enlarge mobile preview"
        >
          <span className="rev-frame-notch" aria-hidden="true" />
          <span className="rev-frame-scroll">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mobileSrc} alt="Friendship Foundation website — mobile view" loading="lazy" />
          </span>
        </button>
      </div>

      <div className="rev-actions">
        <a className="rev-btn rev-btn-primary" href={siteHref} target="_blank" rel="noopener noreferrer">
          View Your Website
        </a>
        <button type="button" className="rev-btn rev-btn-secondary" onClick={() => setLightbox(mobileSrc)}>
          See It On Mobile
        </button>
      </div>

      {lightbox && (
        <div className="rev-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button type="button" className="rev-lightbox-close" aria-label="Close preview" onClick={() => setLightbox(null)}>
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="Friendship Foundation website — mobile view enlarged" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
