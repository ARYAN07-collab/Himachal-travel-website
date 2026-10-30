import React, { useState } from 'react';
import {
  X,
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Car,
  Hotel,
  Utensils,
  ShieldCheck,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function PackageDetailModal({ pkg, onClose, onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'inclusions' | 'stays'

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 my-8">
        
        {/* Modal Header Banner */}
        <div className="relative h-64 sm:h-72 bg-slate-900">
          <img
            src={pkg.bannerImage || pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Badges on Banner */}
          <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-900">
                {pkg.state}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {pkg.duration}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold bg-black/50 px-2.5 py-1 rounded-full border border-white/20">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{pkg.rating} ({pkg.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
              {pkg.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Route: {pkg.travelRoute}</span>
            </p>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Day-by-Day Itinerary ({pkg.itinerary?.length} Days)
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Inclusions & Exclusions
          </button>
          <button
            onClick={() => setActiveTab('stays')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'stays'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Hotel Stays & Transport
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              {pkg.itinerary?.map((item, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {/* Timeline bullet & line */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      D{item.day}
                    </div>
                    {idx < pkg.itinerary.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-200 my-1" />
                    )}
                  </div>

                  <div className="flex-1 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        Day {item.day}: {item.title}
                      </h4>
                      {item.meals && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 self-start sm:self-auto">
                          🍴 {item.meals}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                <h4 className="text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  What's Included in this Package
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {pkg.inclusions?.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100">
                <h4 className="text-sm font-bold text-rose-950 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  What's Excluded
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {pkg.exclusions?.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'stays' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Hotel className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Handpicked 3★ & 4★ Mountain Properties
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    We only partner with vetted resorts and alpine chalets offering 24/7 hot water geysers, mountain view balconies, hygienic dining halls, and winter room heaters. Upgrades to 5★ luxury cottages available on request.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Car className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Sanitized Private Mountain Chauffeur
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Dedicated hill-certified commercial vehicle (Dzire / Ertiga / Innova Crysta / Tempo Traveller) with experienced Pahadi driver. All toll taxes, interstate permits, fuel, and driver night food/lodging charges are already covered.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Price & Reservation CTA */}
        <div className="p-4 sm:p-6 bg-slate-100/90 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500">Starting Price Per Person</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                ₹{pkg.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{pkg.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Save {pkg.discountPercent}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking(pkg);
              }}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Send Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
