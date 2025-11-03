"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onResult: (text: string) => void;
  label?: string;
};

export default function VoiceButton({ onResult, label = "Dictate" }: Props) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recRef = useRef<any>(null);
  const resultRef = useRef(onResult);

  useEffect(() => {
    resultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      setSupported(true);
      const rec = new SR();
      rec.continuous = false;
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e: any) => {
        const txt = e.results?.[0]?.[0]?.transcript || "";
        if (txt) resultRef.current(txt);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recRef.current = rec;
    }
    return () => {
      if (recRef.current) {
        try {
          recRef.current.stop();
        } catch {
          // ignore stop errors during cleanup
        }
      }
    };
  }, []);

  if (!supported) {
    return (
      <button
        type="button"
        disabled
        className="text-xs px-2 py-1 rounded-lg border border-white/10 text-brand-mute"
        title="Voice dictation not supported in this browser"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (!recRef.current) return;
        if (!listening) {
          try {
            recRef.current.start();
            setListening(true);
          } catch {
            setListening(false);
          }
        } else {
          try {
            recRef.current.stop();
          } catch {
            setListening(false);
          }
        }
      }}
      className={`text-xs px-2 py-1 rounded-lg border ${
        listening ? "border-amber-400 bg-amber-500/10 text-amber-300" : "border-white/10 hover:bg-white/5"
      }`}
      aria-pressed={listening}
      aria-label="Voice dictation"
      title="Use microphone to dictate this field"
    >
      {listening ? "Listening…" : label}
    </button>
  );
}
