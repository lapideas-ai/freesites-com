"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_CANONICAL_WIDTH = 1440;

// Renders `children` (designed at a fixed canonical width — 1440 desktop by
// default, or pass 390 to use a SmartSite's own mobile-breakpoint layout)
// scaled to exactly fill whatever width its container actually is, at any
// viewport. A fixed transform:scale() only matches one specific container
// width and either clips content (scale too high) or leaves empty space
// (scale too low). Measuring via ResizeObserver keeps it correct at every
// breakpoint without a separate mobile/desktop code path.
export function ScaledPreview({
  children,
  height,
  canonicalWidth = DEFAULT_CANONICAL_WIDTH,
}: {
  children: React.ReactNode;
  height: number;
  canonicalWidth?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / canonicalWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [canonicalWidth]);

  return (
    <div ref={containerRef} className="w-full min-w-0 overflow-hidden" style={{ height }}>
      {scale > 0 && (
        <div style={{ width: canonicalWidth, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {children}
        </div>
      )}
    </div>
  );
}
