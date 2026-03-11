"use client";

import { useState } from "react";
import { Accessibility, ZoomIn, ZoomOut, Eye, Type } from "lucide-react";

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [linkHighlight, setLinkHighlight] = useState(false);

  const changeFontSize = (delta: number) => {
    const newSize = Math.min(150, Math.max(80, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle("high-contrast");
  };

  const toggleLinkHighlight = () => {
    setLinkHighlight(!linkHighlight);
    document.body.classList.toggle("highlight-links");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-foreground text-background rounded-full shadow-elevated flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="תפריט נגישות"
      >
        <Accessibility className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-64 bg-background rounded-2xl shadow-elevated border border-border p-5 animate-scale-in">
          <h3 className="font-serif text-lg text-foreground mb-4">נגישות</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-sans text-foreground">גודל טקסט</span>
              <div className="flex gap-2">
                <button
                  onClick={() => changeFontSize(-10)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="הקטן טקסט"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => changeFontSize(10)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="הגדל טקסט"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={toggleHighContrast}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-colors ${
                highContrast ? "bg-foreground text-background" : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              <Eye className="w-4 h-4" />
              ניגודיות גבוהה
            </button>

            <button
              onClick={toggleLinkHighlight}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-colors ${
                linkHighlight ? "bg-foreground text-background" : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              <Type className="w-4 h-4" />
              הדגש קישורים
            </button>

            <button
              onClick={() => {
                setFontSize(100);
                document.documentElement.style.fontSize = "100%";
                if (highContrast) toggleHighContrast();
                if (linkHighlight) toggleLinkHighlight();
              }}
              className="w-full text-center text-xs font-sans text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
