import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Mountain, CheckCircle2 } from 'lucide-react';

export default function AboutStatsSection({ onOpenCustomPlan }) {
  const stats = [
    { value: "98%", label: "Customer Satisfaction", sub: "Based on 3,400+ verified Indian travelers" },
    { value: "85+", label: "Himalayan Destinations", sub: "Handpicked across Himachal & Uttarakhand" },
    { value: "245+", label: "Local Pahadi Guides & Drivers", sub: "Hill-certified & all-weather trained" },
    { value: "40k+", label: "Happy Explorers Hosted", sub: "From Delhi, Mumbai, BLR & all India" }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait Scenic Image Card matching reference */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                alt="Scenic Himalayan Lake and Boat"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-slate-800 shadow-xl border border-white/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">
                    <Mountain className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Local Roots in Himachal & Uttarakhand
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Offices in Manali, Shimla & Dehradun
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small decorative accent badge */}
            <div className="hidden sm:flex absolute -top-5 -right-5 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl items-center gap-2 border border-slate-700">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">HP Tourism Dept</p>
                <p className="text-xs font-bold text-white">Registered Operator</p>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Story & Stats matching reference */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" />
                <span>Our Himalayan Heritage</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18] font-sans">
                Traveling brings you closer to new places, people, and memories
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-light">
                Founded by native Himalayan explorers who grew up navigating high passes, apple orchards, and sacred river valleys, we bridge the gap between tourists and authentic mountain experiences.
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-light">
                Whether you are a couple seeking a romantic snow chalet in Solang, a family taking sacred blessings at Kedarnath and Badrinath, or friends tackling the barren landscapes of Spiti, our local team ensures safety, verified comfort, and zero hassle from doorstep pickup to return.
              </p>
            </div>

            {/* Impact Counters Grid (Matching reference layout) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-sans">
                    {stat.value}
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-500 font-light">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Value checklist and CTA */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24/7 Real-Time Mountain Road & Weather Assistance</span>
              </div>
              <button
                onClick={onOpenCustomPlan}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs tracking-wider uppercase transition shadow-md cursor-pointer self-start sm:self-auto"
              >
                <span>Plan Custom Journey</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
