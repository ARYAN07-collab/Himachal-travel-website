import React, { useState } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { submitCustomTripInquiry } from '../services/inquiryService';

export default function CustomTripBuilder({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedRegions, setSelectedRegions] = useState(['Manali', 'Solang Valley']);
  const [duration, setDuration] = useState('5-7 Days');
  const [month, setMonth] = useState('November');
  const [travelType, setTravelType] = useState('Family');
  const [budgetTier, setBudgetTier] = useState('Comfort (3-Star & 4-Star)');
  const [pickupCity, setPickupCity] = useState('Delhi NCR');
  const [travelerName, setTravelerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const popularSpots = [
    { name: 'Manali & Solang', region: 'HP' },
    { name: 'Spiti Valley & Kaza', region: 'HP' },
    { name: 'Shimla & Kufri', region: 'HP' },
    { name: 'Jibhi & Tirthan Valley', region: 'HP' },
    { name: 'Dharamshala & Bir', region: 'HP' },
    { name: 'Kasol & Kheerganga', region: 'HP' },
    { name: 'Kedarnath & Badrinath', region: 'UK' },
    { name: 'Auli & Chopta', region: 'UK' },
    { name: 'Rishikesh & Haridwar', region: 'UK' },
    { name: 'Nainital & Jim Corbett', region: 'UK' },
    { name: 'Mussoorie & Dhanaulti', region: 'UK' }
  ];

  const toggleSpot = (spotName) => {
    if (selectedRegions.includes(spotName)) {
      setSelectedRegions(selectedRegions.filter((s) => s !== spotName));
    } else {
      setSelectedRegions([...selectedRegions, spotName]);
    }
  };

  const calculateEstimate = () => {
    let base = 12000;
    if (duration === '3-4 Days') base = 9000;
    if (duration === '5-7 Days') base = 15000;
    if (duration === '8-10 Days') base = 23000;
    if (duration === '10+ Days') base = 31000;

    if (budgetTier.includes('Luxury')) base *= 1.5;
    if (budgetTier.includes('Pocket')) base *= 0.85;

    return Math.round(base);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (!travelerName || !whatsapp) {
      alert('Please fill your name and WhatsApp number.');
      return;
    }
    
    // Save to Supabase backend & local backup
    submitCustomTripInquiry({
      travelerName,
      whatsapp,
      destinations: selectedRegions,
      duration,
      month,
      travelType,
      budgetTier,
      pickupCity,
      estimatedAmount: calculateEstimate()
    });

    setIsCompleted(true);
  };

  const handleSendToWhatsApp = () => {
    const msg = encodeURI(
      `Hello Himalayan Vistas! I used your Custom Trip Builder on the website.\n\n` +
      `Name: ${travelerName} (${whatsapp})\n` +
      `Destinations: ${selectedRegions.join(', ')}\n` +
      `Duration: ${duration} in ${month}\n` +
      `Group Style: ${travelType}\n` +
      `Tier: ${budgetTier}\n` +
      `Pickup: ${pickupCity}\n` +
      `Estimated budget: ~₹${calculateEstimate().toLocaleString('en-IN')}/person\n\n` +
      `Please curate a custom itinerary for us!`
    );
    window.open(`https://wa.me/919816054321?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold">Himalayan Custom Trip Planner</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-emerald-500 h-1.5 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {isCompleted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">Custom Plan Request Sent!</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Thank you {travelerName}. Our Himachal travel designer will send you a personalized PDF itinerary on WhatsApp with your exact preferred stops and dates.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Places Selected:</span>
                <span className="font-semibold text-slate-800 text-right">{selectedRegions.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration & Month:</span>
                <span className="font-semibold text-slate-800">{duration} ({month})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Approx. Starting Estimate:</span>
                <span className="font-bold text-emerald-700 text-sm">~₹{calculateEstimate().toLocaleString('en-IN')} / person</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Back to Website
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-7 space-y-6">
            
            {/* Step 1: Destinations Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 1: Which destinations do you want to visit?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select one or multiple locations in Himachal Pradesh and Uttarakhand.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
                  {popularSpots.map((spot, i) => {
                    const isSelected = selectedRegions.includes(spot.name);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleSpot(spot.name)}
                        className={`p-3 rounded-xl border text-xs text-left transition font-medium flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <span>{spot.name}</span>
                          <span className="block text-[10px] text-slate-400 font-normal">
                            {spot.region === 'HP' ? 'Himachal' : 'Uttarakhand'}
                          </span>
                        </div>
                        {isSelected && <span className="text-emerald-600 font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedRegions.length === 0) {
                        alert('Please select at least 1 destination');
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <span>Next: Dates & Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Dates, Duration & Travel Style */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 2: When & How would you like to travel?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tell us your preferred pacing and traveling group.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    >
                      <option value="3-4 Days">3-4 Days (Quick Weekend Trip)</option>
                      <option value="5-7 Days">5-7 Days (Standard Classic Holiday)</option>
                      <option value="8-10 Days">8-10 Days (Comprehensive Exploration)</option>
                      <option value="10+ Days">10+ Days (Grand Circuit / Expedition)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Traveling Month
                    </label>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    >
                      <option value="This Month / Immediate">This Month / Immediate</option>
                      <option value="November 2026">November (Crisp Mountain Autumn)</option>
                      <option value="December 2026">December (Snowfall & Winter Holidays)</option>
                      <option value="January 2027">January (Deep Snow Season)</option>
                      <option value="February 2027">February (Snow & Valentine's)</option>
                      <option value="March-May 2027">March-May (Spring & Summer Break)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Travel Style
                    </label>
                    <select
                      value={travelType}
                      onChange={(e) => setTravelType(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    >
                      <option value="Couple / Honeymoon">Couple / Honeymoon (Romantic)</option>
                      <option value="Family with Kids/Seniors">Family with Kids & Elders</option>
                      <option value="Friends / Group">Friends Group (Adventure & Fun)</option>
                      <option value="Solo Traveler">Solo Backpacker</option>
                      <option value="Spiritual / Pilgrimage">Spiritual Pilgrimage (Char Dham)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Hotel & Stay Tier
                    </label>
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    >
                      <option value="Pocket Friendly (Clean 3-Star)">Pocket Friendly (Clean 3-Star)</option>
                      <option value="Comfort (3-Star & 4-Star)">Comfort (3-Star & 4-Star)</option>
                      <option value="Luxury (Alpine Chalets & 5-Star)">Luxury (Alpine Chalets & 5-Star)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <span>Next: Get Custom Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Estimate */}
            {step === 3 && (
              <form onSubmit={handleFinish} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 3: Where should we send your customized itinerary?
                  </h3>
                  <p className="text-xs text-slate-500">
                    We will share an instant quote and day-by-day itinerary on your WhatsApp.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                    Estimated Price Range:
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-950">
                      ~₹{calculateEstimate().toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-emerald-700">/ person (All-inclusive Cab + Hotels + Meals)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number * (+91)"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pickup Location
                  </label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="Delhi NCR">Delhi NCR (Airport / Railway Station / Home)</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Amritsar">Amritsar</option>
                    <option value="Dehradun">Dehradun</option>
                    <option value="Direct Destination">Direct at Destination</option>
                  </select>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg"
                  >
                    <span>Receive Custom Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
