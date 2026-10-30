import React, { useState } from 'react';
import { Compass, Car, Hotel, MapPin, Calendar, Users, ArrowRight, Check } from 'lucide-react';
import { destinationsData } from '../data/destinations';

export default function SearchWidget({ onSearch, onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('tour'); // 'tour' | 'cab' | 'hotel'
  const [selectedDestination, setSelectedDestination] = useState('manali');
  const [checkInDate, setCheckInDate] = useState('2026-11-05');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-10');
  const [guestCount, setGuestCount] = useState(2);
  const [showGuestMenu, setShowGuestMenu] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleGuestsConfirm = () => {
    setGuestCount(adults + children);
    setShowGuestMenu(false);
  };

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    if (tabKey === 'cab') {
      const el = document.getElementById('cabs');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'hotel') {
      if (onOpenBooking) {
        onOpenBooking();
      }
      return;
    }

    if (onSearch) {
      onSearch({
        tab: activeTab,
        destinationId: selectedDestination,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guestCount
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/60 text-slate-800 transition-all hover:shadow-3xl">
      {/* Top Filter Tabs (Tour / Private Cab / Stays) */}
      <div className="flex items-center justify-between bg-slate-100/90 p-1.5 rounded-full mb-5 border border-slate-200/80">
        <button
          type="button"
          onClick={() => handleTabClick('tour')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'tour'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tour</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('cab')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'cab'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Car className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cabs & Tempo</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('hotel')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'hotel'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Hotel className="w-3.5 h-3.5 text-emerald-600" />
          <span>Hotels & Camps</span>
        </button>
      </div>

      <form onSubmit={handleReserveSubmit} className="space-y-4">
        {/* Destination Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            {activeTab === 'cab'
              ? 'Cab Drop / Tour Destination'
              : activeTab === 'hotel'
              ? 'Mountain Stay Location'
              : 'Destination in HP & UK'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <optgroup label="🏔️ Himachal Pradesh">
                <option value="manali">Manali & Solang Valley (Snow & Adventure)</option>
                <option value="spiti">Spiti Valley & Chandratal (Expedition)</option>
                <option value="shimla">Shimla, Kufri & Mashobra (Colonial)</option>
                <option value="dharamshala">Dharamshala, McLeodganj & Bir</option>
                <option value="jibhi">Jibhi & Tirthan Valley (Offbeat River)</option>
                <option value="kasol">Kasol, Tosh & Kheerganga (Hot Springs)</option>
              </optgroup>
              <optgroup label="🙏 Uttarakhand (Devbhoomi)">
                <option value="kedarnath">Kedarnath & Badrinath (Sacred Yatra)</option>
                <option value="auli">Auli Skiing, Chopta & Tungnath</option>
                <option value="rishikesh">Rishikesh & Haridwar (Rafting & Aarti)</option>
                <option value="nainital">Nainital & Jim Corbett (Safari & Lakes)</option>
                <option value="mussoorie">Mussoorie & Dhanaulti (Queen of Hills)</option>
              </optgroup>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Check In & Check Out Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Check In / Start
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Check Out / Return
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Guest Selector */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            Guests / Travelers
          </label>
          <button
            type="button"
            onClick={() => setShowGuestMenu(!showGuestMenu)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>
                {adults} {adults > 1 ? 'Adults' : 'Adult'}
                {children > 0 && `, ${children} ${children > 1 ? 'Kids' : 'Kid'}`}
              </span>
            </div>
            <span className="text-xs text-slate-400">Change</span>
          </button>

          {/* Guest Selector Dropdown */}
          {showGuestMenu && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Adults</p>
                  <p className="text-[10px] text-slate-400">Age 12+ years</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Children</p>
                  <p className="text-[10px] text-slate-400">Age 2-11 years</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGuestsConfirm}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition mt-2 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 group"
        >
          <span>Send Inquiry</span>
          <ArrowRight className="w-4 h-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-[11px] text-center text-slate-400 pt-1 flex items-center justify-center gap-1.5">
          <Check className="w-3 h-3 text-emerald-500" />
          <span>Zero hidden charges • 100% Free Inquiry • 24/7 Hill support</span>
        </p>
      </form>
    </div>
  );
}
