import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Indian Traveler Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
            Memories Made Across the Himalayas
          </h2>
          <p className="text-sm text-slate-500 font-light">
            Real feedback from couples, families, and solo explorers who trusted our native mountain team.
          </p>
        </div>

        {/* Carousel / Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic font-light">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                    <span>{item.name}</span>
                    {item.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {item.city} • <span className="text-slate-600 font-medium">{item.trip}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200/80 max-w-2xl mx-auto text-center shadow-sm flex flex-col sm:flex-row items-center justify-around gap-4">
          <div>
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <p className="text-xs text-slate-500">Google & TripAdvisor Reviews</p>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-lg font-bold text-slate-900">100% Hill-Vetted</p>
            <p className="text-xs text-slate-500">Zero Unverified Third Parties</p>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-lg font-bold text-emerald-700">10+ Years</p>
            <p className="text-xs text-slate-500">Born in Himachal Pradesh</p>
          </div>
        </div>

      </div>
    </section>
  );
}
