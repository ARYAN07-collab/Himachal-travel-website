import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitCallbackRequest } from '../services/inquiryService';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: 'Manali & Solang Valley',
    travelers: '2 Adults',
    travelMonth: 'Upcoming Month',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    // Save to Supabase backend & local backup
    submitCallbackRequest({
      name: formData.name,
      phone: formData.phone,
      destination: formData.destination,
      travelers: formData.travelers,
      message: formData.message
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Local Himalayan Presence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
            Connect With Our On-Ground Team
          </h2>
          <p className="text-sm text-slate-500 font-light">
            Walk into our local offices in Manali, Shimla, or Dehradun, or talk directly to our tour captains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Office Details & Helpline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Himachal Head Office Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                  Himachal Pradesh Head Office (Manali)
                </h3>
              </div>
              <p className="text-xs text-slate-600 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Level 2, Himalayan Heritage Complex, The Mall Road, Manali, Distt. Kullu, Himachal Pradesh - 175131</span>
              </p>
            </div>

            {/* Uttarakhand Branch Office Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                  Uttarakhand Regional Desk (Dehradun & Rishikesh)
                </h3>
              </div>
              <p className="text-xs text-slate-600 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>34-A, Rajpur Road, Near Clock Tower, Dehradun, Uttarakhand - 248001</span>
              </p>
            </div>

            {/* Direct Contact Points */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>24/7 Mountain Control Room</span>
              </div>
              <div className="space-y-2 text-xs">
                <a href="tel:+919816054321" className="flex items-center gap-3 hover:text-emerald-300 transition">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold">+91 98160 54321 (General Enquiries & Bookings)</span>
                </a>
                <a href="tel:+919418012345" className="flex items-center gap-3 hover:text-emerald-300 transition">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold">+91 94180 12345 (24x7 Road & Emergency Helpline)</span>
                </a>
                <div className="flex items-center gap-3 text-slate-300 pt-1">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>bookings@himalayanvistas.in • info@himalayanvistas.in</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 pt-1">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Support Hours: Monday - Sunday, 8:00 AM - 10:00 PM IST</span>
                </div>
              </div>
            </div>

          </div>

          {/* Contact / Quick Callback Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-md">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Thank you {formData.name}. Our trip curator from Manali will call you within 15 minutes to answer your questions.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 mb-4">
                  <h3 className="text-xl font-bold text-slate-900 font-sans">
                    Quick Trip Inquiry / Request Callback
                  </h3>
                  <p className="text-xs text-slate-500 font-light">
                    Leave your details and get an instant custom quote with complete hotel and cab options.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amit Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number * (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Destination of Interest
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    >
                      <option value="Manali & Solang Valley">Manali & Solang Valley (HP)</option>
                      <option value="Spiti Valley & Chandratal">Spiti Valley & Chandratal (HP)</option>
                      <option value="Shimla & Kufri">Shimla, Kufri & Chail (HP)</option>
                      <option value="Jibhi & Tirthan Valley">Jibhi & Tirthan Valley (HP)</option>
                      <option value="Dharamshala & McLeodganj">Dharamshala & McLeodganj (HP)</option>
                      <option value="Kedarnath & Badrinath">Kedarnath & Badrinath (UK)</option>
                      <option value="Auli & Chopta">Auli Skiing & Chopta (UK)</option>
                      <option value="Rishikesh Adventure">Rishikesh Rafting & Camps (UK)</option>
                      <option value="Nainital & Jim Corbett">Nainital & Jim Corbett (UK)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Group Size / Travelers
                    </label>
                    <select
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    >
                      <option value="Couple (2 Adults)">Couple (2 Adults)</option>
                      <option value="Family (3-4 Members)">Family (3-4 Members)</option>
                      <option value="Extended Family (5-8 Members)">Extended Family (5-8 Members)</option>
                      <option value="Group of Friends (6-12+ Members)">Group of Friends (6-12+ Members)</option>
                      <option value="Solo Traveler">Solo Backpacker</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Requirements or Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your trip dates, preferred hotels, snowfall query, or Jain meal requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Request Instant Itinerary & Callback</span>
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  🔒 We respect your privacy. No spam. You will only receive a direct phone/WhatsApp reply from our local mountain manager.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
