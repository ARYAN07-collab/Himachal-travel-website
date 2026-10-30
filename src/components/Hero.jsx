import React, { useState } from 'react';
import { ArrowUpRight, Compass, ShieldCheck, Star, Sparkles, MapPin } from 'lucide-react';
import SearchWidget from './SearchWidget';

export default function Hero({ onSearch, onOpenBooking, onOpenCustomPlan }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroBackgrounds = [
    {
      url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=2000&q=85",
      caption: "Solang Valley & Rohtang Pass, Himachal Pradesh",
      badge: "Winter Snowfall & Pine Chalets"
    },
    {
      url: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=2000&q=85",
      caption: "Kedarnath Dham & Garhwal Peaks, Uttarakhand",
      badge: "Sacred Devbhoomi Mountains"
    },
    {
      url: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2000&q=85",
      caption: "Spiti Valley & Chandratal Lake, Himachal Pradesh",
      badge: "Middle Land High-Altitude Wonderland"
    }
  ];

  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[95vh] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackgrounds[activeSlide].url}
          alt="Himalayan Mountain Landscape"
          className="w-full h-full object-cover object-center transition-all duration-1000 scale-105"
        />
        {/* Soft Vignette & Cinematic Gradient Overlay matching reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Title & CTA (Matching tourex reference design) */}
          <div className="lg:col-span-7 text-white space-y-6 sm:space-y-7">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Himachal & Uttarakhand Travel Specialists</span>
              <span className="text-white/40">|</span>
              <span className="text-white/80">Local Pahadi Team</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] font-sans">
              Let's find your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-emerald-300">
                next adventure
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-200/90 max-w-xl font-normal leading-relaxed">
              Curated tour packages, luxury mountain chalets, and private sanitized cabs with trusted Pahadi drivers across Manali, Spiti, Shimla, Kedarnath, Auli & Rishikesh.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Reference Style Pill Button: "Take a tour" + Black Circle Arrow */}
              <button
                onClick={scrollToPackages}
                className="group flex items-center bg-white hover:bg-slate-100 text-slate-900 rounded-full pl-6 pr-2 py-2 font-semibold text-sm transition-all shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer"
              >
                <span className="mr-3 font-medium">Take a tour</span>
                <span className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center transition-transform group-hover:rotate-45 group-hover:bg-emerald-600">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </button>

              <button
                onClick={onOpenCustomPlan}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-medium text-sm transition-all cursor-pointer flex items-center gap-2 hover:border-emerald-400"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Customize Your Trip</span>
              </button>
            </div>

            {/* Quick Himalayan Highlights pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="text-slate-400">Popular:</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition cursor-pointer" onClick={() => onSearch({ destinationId: 'manali' })}>
                Solang Snow
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition cursor-pointer" onClick={() => onSearch({ destinationId: 'spiti' })}>
                Spiti 4x4
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition cursor-pointer" onClick={() => onSearch({ destinationId: 'kedarnath' })}>
                Kedarnath Yatra
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition cursor-pointer" onClick={() => onSearch({ destinationId: 'auli' })}>
                Auli Ski Slopes
              </span>
            </div>

            {/* Bottom Slider Progress Bar / Indicators matching reference */}
            <div className="pt-6 flex items-center gap-3">
              {heroBackgrounds.map((bg, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'w-12 bg-white'
                      : 'w-4 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-xs text-white/60 ml-2">
                {heroBackgrounds[activeSlide].caption}
              </span>
            </div>
          </div>

          {/* Right Column: High-conversion Floating Search Widget (Matching reference) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SearchWidget
              onSearch={onSearch}
              onOpenBooking={onOpenBooking}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
