"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set end time to 24 hours from first visit
    const storageKey = "veloura-sale-end";
    let endTime = localStorage.getItem(storageKey);
    if (!endTime) {
      const end = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, end.toString());
      endTime = end.toString();
    }

    const updateTimer = () => {
      const diff = Math.max(0, parseInt(endTime!) - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="text-white text-center py-2.5 px-4 relative z-[60]" style={{ backgroundColor: '#333333' }}>
      <div className="container mx-auto flex items-center justify-center gap-2 text-xs md:text-sm font-sans font-medium">
        <span>מבצע! גרביים ב-59.90₪ / $18.99 — נגמר בעוד <span className="inline-block px-1.5 py-0.5 bg-white/20 rounded font-mono mx-1">{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</span> 🔥 | משלוח חינם בהזמנות מעל ₪250 🚚</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="סגור הודעה"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
