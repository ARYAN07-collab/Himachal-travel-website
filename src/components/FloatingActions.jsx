import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Calendar, Compass } from 'lucide-react';

export default function FloatingActions({ onOpenBooking }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const text = encodeURI('Hi Himalayan Vistas! I want to inquire about a tour package to Himachal Pradesh & Uttarakhand.');
    window.open(`https://wa.me/919816054321?text=${text}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp & Phone Widgets */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="group flex items-center bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 shrink-0 fill-white" />
          <span className="hidden sm:inline-block ml-2 text-xs font-bold tracking-wide">
            Chat on WhatsApp
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-ping" />
        </button>

        {/* Call Helpline Button */}
        <a
          href="tel:+919816054321"
          className="flex items-center bg-slate-900 hover:bg-black text-white p-3.5 sm:px-4 sm:py-2.5 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          aria-label="Call Helpline"
        >
          <Phone className="w-5 h-5 text-emerald-400" />
          <span className="hidden sm:inline-block ml-2 text-xs font-bold">
            +91 98160 54321
          </span>
        </a>

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-800 shadow-xl border border-slate-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile Sticky Quick Action Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-1 flex flex-col items-center py-1 text-slate-600 hover:text-emerald-600 transition"
          >
            <Compass className="w-5 h-5 text-slate-700" />
            <span className="text-[10px] font-semibold mt-0.5">Explore</span>
          </button>

          <button
            onClick={scrollToPackages}
            className="flex-1 flex flex-col items-center py-1 text-slate-600 hover:text-emerald-600 transition"
          >
            <Calendar className="w-5 h-5 text-slate-700" />
            <span className="text-[10px] font-semibold mt-0.5">Packages</span>
          </button>

          <a
            href="tel:+919816054321"
            className="flex-1 flex flex-col items-center py-1 text-slate-600 hover:text-emerald-600 transition"
          >
            <Phone className="w-5 h-5 text-slate-700" />
            <span className="text-[10px] font-semibold mt-0.5">Call</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex-2 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition text-center cursor-pointer"
          >
            Send Inquiry
          </button>

        </div>
      </div>
    </>
  );
}
