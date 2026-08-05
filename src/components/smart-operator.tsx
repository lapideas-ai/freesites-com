"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSmartOperator, type TranscriptEntry } from "@/lib/use-smart-operator";

const GHL_LEAD_ENDPOINT = "/.netlify/functions/ghl-lead";

function reportSessionToCrm(transcript: TranscriptEntry[]) {
  if (transcript.length === 0) return;
  // Fire-and-forget: the endpoint currently just logs, and forwards to
  // GoHighLevel once GHL_WEBHOOK_URL is configured server-side. Never blocks
  // the UI on this.
  fetch(GHL_LEAD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, capturedAt: new Date().toISOString() }),
  }).catch(() => {});
}

export function SmartOperator() {
  const [open, setOpen] = useState(false);
  const { status, muted, transcript, errorMessage, start, end, toggleMute } =
    useSmartOperator({ onSessionEnd: reportSessionToCrm });
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight });
  }, [transcript]);

  const isActive = status === "active";
  const hasEnded = status === "idle" && transcript.length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Talk to Smart Operator"
        className={`fixed bottom-7 right-7 z-50 flex h-15 w-15 items-center justify-center rounded-full text-2xl shadow-lg transition-transform hover:scale-110 ${
          status === "active"
            ? "bg-green-600 shadow-green-600/40"
            : status === "connecting"
              ? "bg-blue-600 shadow-blue-600/40"
              : "bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/40 animate-pulse"
        }`}
        style={{ width: 60, height: 60 }}
      >
        {status === "active" ? "🔴" : "🎙️"}
      </button>

      {open && (
        <div className="fixed bottom-25 right-7 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-3 rounded-2xl border border-white/10 bg-[#1e3a5f] p-5 shadow-2xl">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                status === "active" ? "animate-pulse bg-green-500" : "bg-slate-500"
              }`}
            />
            <span className="text-sm font-bold text-white">Smart Operator</span>
          </div>
          <p className="text-xs leading-relaxed text-white/55">
            Ask anything about FreeSites, pricing, or how it works — answered
            instantly, right in your browser.
          </p>

          <div
            ref={transcriptRef}
            className="max-h-32 min-h-15 overflow-y-auto rounded-lg bg-white/6 px-3 py-2.5 text-[13px] leading-relaxed"
          >
            {transcript.length === 0 ? (
              <span className="italic text-white/30">Say hello to get started...</span>
            ) : (
              transcript.map((entry, i) => (
                <div
                  key={i}
                  className={`mb-1.5 ${entry.role === "agent" ? "text-white/90" : "text-blue-300"}`}
                >
                  {entry.role === "agent" ? "🤖 " : "👤 "}
                  {entry.text}
                </div>
              ))
            )}
          </div>

          {errorMessage && (
            <div className="text-xs font-medium text-red-300">{errorMessage}</div>
          )}

          {isActive ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="flex-1 rounded-lg bg-white/10 py-2.5 text-[13px] font-semibold text-white/80 transition-colors hover:bg-white/18"
              >
                {muted ? "🔇 Unmute" : "🎤 Mute"}
              </button>
              <button
                type="button"
                onClick={end}
                className="flex-1 rounded-lg border border-red-600/30 bg-red-600/20 py-2.5 text-[13px] font-semibold text-red-300 transition-colors hover:bg-red-600/35"
              >
                End Call
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={start}
                disabled={status === "connecting"}
                className="block w-full rounded-lg bg-blue-600 py-2.5 text-center text-[13px] font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
              >
                {status === "connecting"
                  ? "⏳ Connecting..."
                  : hasEnded
                    ? "🎙️ Talk Again"
                    : "🎙️ Start Talking — It's Free"}
              </button>
              <div className="mt-2 text-center text-[11px] text-white/35">
                No phone needed · Works in your browser
              </div>
            </div>
          )}

          {hasEnded && (
            <Link
              href="/build"
              className="block rounded-lg bg-orange-500 py-2.5 text-center text-[13px] font-bold text-white transition-colors hover:bg-orange-600"
            >
              ⚡ Build My Free SmartSite →
            </Link>
          )}
        </div>
      )}
    </>
  );
}
