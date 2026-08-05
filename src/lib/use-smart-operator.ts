"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AGENT_ID = "agent_BN1cRSL8ZKJdSZWX";
const TOKEN_ENDPOINT = "/.netlify/functions/voice-token";

export type TranscriptEntry = {
  role: "agent" | "user";
  text: string;
};

export type SmartOperatorStatus = "idle" | "connecting" | "active" | "error";

export type SmartOperatorSession = {
  status: SmartOperatorStatus;
  muted: boolean;
  transcript: TranscriptEntry[];
  errorMessage: string | null;
  start: () => Promise<void>;
  end: () => void;
  toggleMute: () => void;
};

// Ports the legacy vanilla-JS voice widget (legacy/voice-widget.js) to a React
// hook. Kept as the single seam other channels — a future GoHighLevel
// integration in particular — hook into: `onSessionEnd` fires with the full
// transcript once a call ends, ready to forward to a CRM webhook.
export function useSmartOperator(options?: {
  onSessionEnd?: (transcript: TranscriptEntry[]) => void;
}): SmartOperatorSession {
  const [status, setStatus] = useState<SmartOperatorStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const mutedRef = useRef(false);
  const audioQueueRef = useRef<Uint8Array[]>([]);
  const isPlayingRef = useRef(false);
  const onSessionEndRef = useRef(options?.onSessionEnd);
  const transcriptRef = useRef<TranscriptEntry[]>([]);
  const drainQueueRef = useRef<() => void>(() => {});

  useEffect(() => {
    onSessionEndRef.current = options?.onSessionEnd;
  }, [options?.onSessionEnd]);

  const appendTranscript = useCallback((entry: TranscriptEntry) => {
    transcriptRef.current = [...transcriptRef.current, entry];
    setTranscript(transcriptRef.current);
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new Ctor({ sampleRate: 24000 });
    }
    return audioContextRef.current;
  }, []);

  const drainQueue = useCallback(() => {
    const queue = audioQueueRef.current;
    if (queue.length === 0) {
      isPlayingRef.current = false;
      return;
    }
    isPlayingRef.current = true;
    const pcm = queue.shift()!;
    const ctx = getAudioContext();
    const samples = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.byteLength / 2);
    const float32 = new Float32Array(samples.length);
    for (let i = 0; i < samples.length; i++) float32[i] = samples[i] / 32768;
    const buffer = ctx.createBuffer(1, float32.length, 24000);
    buffer.getChannelData(0).set(float32);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.onended = () => drainQueueRef.current();
    src.start();
  }, [getAudioContext]);

  useEffect(() => {
    drainQueueRef.current = drainQueue;
  }, [drainQueue]);

  const playPCM = useCallback(
    (pcm: Uint8Array) => {
      audioQueueRef.current.push(pcm);
      if (!isPlayingRef.current) drainQueue();
    },
    [drainQueue]
  );

  const startCapture = useCallback(() => {
    const ctx = getAudioContext();
    const source = ctx.createMediaStreamSource(mediaStreamRef.current!);
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = (e) => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN || mutedRef.current) return;
      const float32 = e.inputBuffer.getChannelData(0);
      const int16 = new Int16Array(float32.length);
      for (let i = 0; i < float32.length; i++) {
        int16[i] = Math.max(-32768, Math.min(32767, float32[i] * 32768));
      }
      const bytes = new Uint8Array(int16.buffer);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      ws.send(
        JSON.stringify({ type: "input_audio_buffer.append", audio: btoa(binary) })
      );
    };
    source.connect(processor);
    processor.connect(ctx.destination);
    processorRef.current = processor;
  }, [getAudioContext]);

  const cleanup = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    wsRef.current = null;
  }, []);

  const end = useCallback(() => {
    wsRef.current?.close();
    cleanup();
    setStatus("idle");
    onSessionEndRef.current?.(transcriptRef.current);
  }, [cleanup]);

  const start = useCallback(async () => {
    setStatus("connecting");
    setErrorMessage(null);

    try {
      const tokenRes = await fetch(TOKEN_ENDPOINT);
      if (!tokenRes.ok) throw new Error("Could not get voice token");
      const { token } = await tokenRes.json();

      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 24000, channelCount: 1 },
      });

      const ws = new WebSocket(
        `wss://api.x.ai/v1/realtime?agent_id=${AGENT_ID}`,
        ["realtime", token]
      );
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus("active");
        appendTranscript({ role: "agent", text: "Connected! How can I help you today?" });
        startCapture();
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === "response.output_audio.delta") {
          const binary = atob(msg.delta);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          playPCM(bytes);
        } else if (msg.type === "response.output_audio_transcript.done") {
          if (msg.transcript) appendTranscript({ role: "agent", text: msg.transcript });
        } else if (msg.type === "conversation.item.input_audio_transcription.completed") {
          if (msg.transcript) appendTranscript({ role: "user", text: msg.transcript });
        }
      };

      ws.onclose = () => {
        cleanup();
        setStatus("idle");
        onSessionEndRef.current?.(transcriptRef.current);
      };

      ws.onerror = () => {
        appendTranscript({ role: "agent", text: "Connection issue — please try again." });
        cleanup();
        setStatus("error");
      };
    } catch (e) {
      cleanup();
      setStatus("error");
      if (e instanceof DOMException && e.name === "NotAllowedError") {
        setErrorMessage("Microphone access needed — please allow and try again.");
      } else {
        setErrorMessage("Could not connect. Please try again.");
      }
    }
  }, [appendTranscript, cleanup, playPCM, startCapture]);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
  }, []);

  useEffect(() => {
    return () => {
      wsRef.current?.close();
      cleanup();
    };
  }, [cleanup]);

  return { status, muted, transcript, errorMessage, start, end, toggleMute };
}
