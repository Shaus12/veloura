"use client";

import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setDrawerOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold tracking-widest text-luna-deep">VELŌURA</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          <a href="#collection" className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-300">
            Slow Girl Era
          </a>
          <a href="#difference" className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-300">
            למה VELOURA
          </a>
          <a href="#stories" className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-300">
            הקהילה
          </a>
          <a href="#extras" className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-300">
            ציוד משלים
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="relative text-foreground hover:text-primary transition-colors duration-300"
            aria-label="סל קניות"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-sans font-semibold flex items-center justify-center text-destructive-foreground">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="תפריט"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 py-6 space-y-4">
          {[
            { href: "#collection", label: "Slow Girl Era" },
            { href: "#difference", label: "למה VELOURA" },
            { href: "#stories", label: "קהילה" },
            { href: "#extras", label: "ציוד משלים" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-sans font-medium text-foreground/80 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navigation;
