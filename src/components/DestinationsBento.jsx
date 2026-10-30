import React, { useState } from 'react';
import { MapPin, ArrowUpRight, Compass, Sparkles, Filter } from 'lucide-react';
import { destinationsData } from '../data/destinations';

export default function DestinationsBento({ onSelectDestination }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'HP' | 'UK'

  const filteredDestinations = destinationsData.filter((dest) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'HP') return dest.stateShort === 'HP';
    if (activeFilter === 'UK') return dest.stateShort === 'UK';
    return true;
  });

  return (
    <section id="destinations" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Tourex layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Popular Escapes
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
              Experience Our Destination
            </h2>
            <p className="text-base text-slate-500 font-light">
              From the snow-crowned passes of Himachal to the sacred peaks and emerald lakes of Uttarakhand.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Regions ({destinationsData.length})
            </button>
            <button
              onClick={() => setActiveFilter('HP')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'HP'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏔️ Himachal Pradesh
            </button>
            <button
              onClick={() => setActiveFilter('UK')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'UK'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🙏 Uttarakhand
            </button>
          </div>
        </div>

        {/* Bento Grid layout matching reference style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest, idx) => {
            // First 2 items can take slightly more visual prominence on large screens
            const isWide = idx === 0 || idx === 1;

            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest.id)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-slate-900 ${
                  isWide ? 'sm:col-span-2 lg:col-span-2 xl:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={dest.bannerImage || dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-[0.9]"
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/25">
                    {dest.state}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center transition-transform group-hover:rotate-45 group-hover:bg-emerald-500 group-hover:text-white shadow">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white z-10 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Alt: {dest.altitude}</span>
                    <span className="text-white/40">•</span>
                    <span>Best: {dest.bestTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-1 font-light">
                    {dest.tagline}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/15 text-xs">
                    <span className="text-slate-300">
                      From{' '}
                      <span className="text-white font-bold text-sm">
                        ₹{dest.startingPrice.toLocaleString('en-IN')}
                      </span>{' '}
                      / person
                    </span>
                    <span className="text-emerald-400 font-semibold group-hover:underline">
                      Explore Tours →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
