import React, { useState } from 'react';
import { Car, Users, Briefcase, ShieldCheck, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { cabsData, popularCabRoutes } from '../data/cabs';

export default function CabCalculator({ onOpenBooking }) {
  const [selectedCabId, setSelectedCabId] = useState('sedan');
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  const selectedCab = cabsData.find((c) => c.id === selectedCabId) || cabsData[0];
  const selectedRoute = popularCabRoutes[selectedRouteIndex];

  // Base fare lookup
  const getEstimatedFare = (cab, routeIdx) => {
    switch (routeIdx) {
      case 0: // Delhi to Manali
        return cab.baseFareDelhiToManali;
      case 1: // Delhi to Shimla
        return cab.baseFareDelhiToShimla;
      case 2: // Delhi to Rishikesh
        return cab.baseFareDelhiToRishikesh;
      case 3: // Delhi to Nainital
        return cab.baseFareDelhiToNainital;
      case 4: // Chandigarh to Manali
        return Math.round(cab.baseFareDelhiToManali * 0.75);
      case 5: // Chandigarh to Dharamshala
        return Math.round(cab.baseFareDelhiToShimla * 0.9);
      case 6: // Haridwar to Kedarnath
        return Math.round(cab.baseFareDelhiToManali * 0.85);
      default:
        return cab.baseFareDelhiToManali;
    }
  };

  const fare = getEstimatedFare(selectedCab, selectedRouteIndex);

  return (
    <section id="cabs" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            <Car className="w-3.5 h-3.5" />
            <span>Dedicated Mountain Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
            Private Cabs & Tempo Traveler Fare Estimator
          </h2>
          <p className="text-base text-slate-500 font-light">
            Sanitized tourist cabs with experienced Pahadi drivers, all-inclusive pricing (Tolls, State Road Tax, Driver DA & Fuel included).
          </p>
        </div>

        {/* Interactive Calculator Box */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Route Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  1. Select Travel Route
                </label>
                <div className="relative">
                  <select
                    value={selectedRouteIndex}
                    onChange={(e) => setSelectedRouteIndex(Number(e.target.value))}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {popularCabRoutes.map((route, idx) => (
                      <option key={idx} value={idx}>
                        {route.from} ➔ {route.to} ({route.distance} • {route.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cab Model Selector Cards */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Choose Vehicle Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cabsData.map((cab) => (
                    <button
                      key={cab.id}
                      type="button"
                      onClick={() => setSelectedCabId(cab.id)}
                      className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        selectedCabId === cab.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <Car className={`w-5 h-5 mb-2 ${selectedCabId === cab.id ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <h4 className="text-xs font-bold line-clamp-1">{cab.name}</h4>
                        <p className={`text-[10px] ${selectedCabId === cab.id ? 'text-slate-300' : 'text-slate-500'}`}>
                          {cab.seating}
                        </p>
                      </div>
                      <span className={`text-[11px] font-bold mt-3 ${selectedCabId === cab.id ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        {cab.ratePerKm}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Vehicle Specs */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-4 text-slate-800 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    {selectedCab.seating}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    {selectedCab.luggage}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Ideal for:</span> {selectedCab.idealFor}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedCab.features.map((feat, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary & Price Estimate */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg text-slate-800 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Transparent Hill Pricing
                </span>
                <h3 className="text-xl font-bold text-slate-900 pt-1">
                  Estimated One-Way / Drop Fare
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedRoute.from} to {selectedRoute.to} • {selectedCab.name}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">All-Inclusive Fare:</span>
                  <span className="text-3xl font-black text-slate-900">
                    ₹{fare.toLocaleString('en-IN')}*
                  </span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-500 border-t border-slate-200 pt-2">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Fuel charges & driver allowance included</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>State road passenger tax & highway tolls covered</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Doorstep pickup from residence / airport / railway station</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking()}
                className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Send Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-400">
                *Multi-day round trip packages available with unlimited local sightseeing at discounted per-day rates.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
