import React, { useState } from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp, CheckCircle2 } from 'lucide-react';
import { submitNewsletterSubscription } from '../services/inquiryService';

export default function Footer({ onOpenBooking, onOpenCustomPlan }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    await submitNewsletterSubscription(emailInput);
    setSubscribed(true);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg text-center lg:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Join Our Himalayan Club
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Get Seasonal Snow Updates & ₹1,000 Off
            </h3>
            <p className="text-xs text-slate-400 font-light">
              Receive secret offbeat trails, snowfall alerts in Solang & Auli, and early bird seasonal package discounts.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-slate-950 px-4 py-3 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscribed successfully! Welcome to the Himalayan Club.</span>
            </div>
          ) : (
            <div className="flex w-full sm:w-auto items-center gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full sm:w-72 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSubscribe}
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl transition shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>

        {/* Directory & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-4">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                himalayan<span className="text-emerald-400">vistas</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
              We are a Himachal-based bespoke travel agency specializing exclusively in authentic journeys across Himachal Pradesh and Uttarakhand. From luxury alpine chalets to mountain-tested private cabs and holy pilgrimages.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:+919816054321" className="hover:text-white transition">+91 98160 54321</a> / <a href="tel:+919418012345" className="hover:text-white transition">+91 94180 12345</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>bookings@himalayanvistas.in</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mall Road, Manali (HP) & Rajpur Road, Dehradun (UK)</span>
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HP Tourism Reg. No: HP-TOUR-2016-8942</span>
            </div>
          </div>

          {/* Himachal Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              🏔️ Himachal Pradesh
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Manali & Solang Valley</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Spiti Valley & Kaza 4x4</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Shimla, Kufri & Chail</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Jibhi & Tirthan Valley</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Dharamshala & McLeodganj</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Kasol, Tosh & Kheerganga</button></li>
            </ul>
          </div>

          {/* Uttarakhand Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              🙏 Uttarakhand
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Kedarnath & Badrinath</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Auli Skiing Slopes</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Chopta Tungnath Peak</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Rishikesh Rafting & Aarti</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Nainital Lakes & Corbett</button></li>
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Mussoorie & Dhanaulti</button></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => scrollTo('packages')} className="hover:text-emerald-400 transition cursor-pointer">Tour Packages Explorer</button></li>
              <li><button onClick={() => scrollTo('cabs')} className="hover:text-emerald-400 transition cursor-pointer">Cab & Tempo Fare Estimator</button></li>
              <li><button onClick={onOpenCustomPlan} className="hover:text-emerald-400 transition cursor-pointer text-emerald-300 font-semibold">Custom Itinerary Wizard</button></li>
              <li><button onClick={() => onOpenBooking()} className="hover:text-emerald-400 transition cursor-pointer">Instant Reservation</button></li>
              <li><button onClick={() => scrollTo('faqs')} className="hover:text-emerald-400 transition cursor-pointer">Permits & Travel FAQs</button></li>
              <li><button onClick={() => scrollTo('contact')} className="hover:text-emerald-400 transition cursor-pointer">Office Locations</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Himalayan Vistas Travels Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 transition cursor-pointer">Cancellation & Refunds</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
