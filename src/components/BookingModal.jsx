import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Car,
  Hotel,
  ShieldCheck,
  Send,
  Phone,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { tourPackagesData } from '../data/packages';
import { submitTourInquiry } from '../services/inquiryService';

export default function BookingModal({ preselectedPackage, isOpen, onClose }) {
  const [selectedPackageId, setSelectedPackageId] = useState(
    preselectedPackage ? preselectedPackage.id : tourPackagesData[0].id
  );
  const [departureCity, setDepartureCity] = useState('Delhi NCR');
  const [startDate, setStartDate] = useState('2026-11-15');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [vehicle, setVehicle] = useState('sedan');
  const [roomType, setRoomType] = useState('deluxe');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    if (preselectedPackage) {
      setSelectedPackageId(preselectedPackage.id);
    }
  }, [preselectedPackage]);

  if (!isOpen) return null;

  const currentPkg =
    tourPackagesData.find((p) => p.id === selectedPackageId) || tourPackagesData[0];

  // Dynamic pricing calculation
  const basePricePerPerson = currentPkg.price;
  const totalBasePrice = basePricePerPerson * adults + (basePricePerPerson * 0.5 * children);

  // Vehicle surcharge
  let vehicleSurcharge = 0;
  if (vehicle === 'ertiga') vehicleSurcharge = 3000;
  if (vehicle === 'innova') vehicleSurcharge = 6000;
  if (vehicle === 'tempo') vehicleSurcharge = 12000;

  // Room type upgrade
  let roomSurcharge = 0;
  if (roomType === 'premium') roomSurcharge = 2500 * (currentPkg.nights || 4);
  if (roomType === 'luxury-chalet') roomSurcharge = 5000 * (currentPkg.nights || 4);

  const grandTotal = Math.round(totalBasePrice + vehicleSurcharge + roomSurcharge);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Please enter your full name and 10-digit WhatsApp phone number.');
      return;
    }

    const generatedId = 'HV-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);
    setIsSubmitted(true);

    // Save inquiry to Supabase backend & local backup
    submitTourInquiry({
      inquiryRefId: generatedId,
      packageId: currentPkg.id,
      packageTitle: currentPkg.title,
      departureCity,
      startDate,
      adults,
      children,
      vehicle,
      roomType,
      estimatedAmount: grandTotal,
      fullName,
      phone,
      email,
      specialRequests: specialRequest
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // fallback if canvas-confetti is not loaded
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURI(
      `Hello Himalayan Vistas Team! I have submitted a tour inquiry on your website.\n\n` +
      `Inquiry Reference ID: ${bookingId}\n` +
      `Package: ${currentPkg.title}\n` +
      `Travelers: ${adults} Adults, ${children} Kids\n` +
      `Start Date: ${startDate}\n` +
      `Pickup City: ${departureCity}\n` +
      `Vehicle: ${vehicle.toUpperCase()}\n` +
      `Guest Name: ${fullName} (${phone})\n` +
      `Estimated Amount: ₹${grandTotal.toLocaleString('en-IN')}\n\n` +
      `Please confirm package availability, hotel options, and share the customized itinerary.`
    );
    window.open(`https://wa.me/919816054321?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 my-8">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold">
              {isSubmitted ? 'Tour Package Inquiry Confirmation' : 'Inquire & Plan Your Himalayan Journey'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success / Voucher State */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Inquiry Successfully Sent
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2">
                Thank You, {fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Your tour inquiry has been registered. Our Himalayan travel expert from Manali will connect with you within 15 minutes with verified availability and custom quote.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-3 font-sans text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Inquiry Reference ID</span>
                <span className="font-mono font-bold text-base text-emerald-700 bg-white px-2.5 py-1 rounded border border-slate-200">
                  {bookingId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Package</span>
                <span className="font-semibold text-slate-900 text-right max-w-[220px]">
                  {currentPkg.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dates & Pickup</span>
                <span className="font-medium text-slate-800">
                  Starting {startDate} from {departureCity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travelers</span>
                <span className="font-medium text-slate-800">
                  {adults} Adults {children > 0 && `, ${children} Children`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900 text-base">
                <span>Total Estimated Price</span>
                <span className="text-emerald-900">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-semibold">
                <span>Payment Status:</span>
                <span>No Payment Required Now (100% Free Inquiry)</span>
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Our local manager will verify exact seasonal hotel & vehicle availability before confirming.
              </p>
            </div>

            {/* WhatsApp & Print Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={shareToWhatsApp}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 98160 54321)</span>
              </button>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Print Inquiry Summary</span>
              </button>
            </div>
          </div>
        ) : (
          /* Reservation / Inquiry Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Package selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Selected Tour Package
              </label>
              <select
                value={selectedPackageId}
                onChange={(e) => setSelectedPackageId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {tourPackagesData.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} ({pkg.duration}) - ₹{pkg.price.toLocaleString('en-IN')}/person
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pickup City
                </label>
                <select
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Delhi NCR">Delhi NCR (Airport / Station / Doorstep)</option>
                  <option value="Chandigarh">Chandigarh (Airport / Station)</option>
                  <option value="Amritsar">Amritsar</option>
                  <option value="Dehradun / Haridwar">Dehradun / Haridwar</option>
                  <option value="Direct Destination">Direct Arrival at Hotel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Travelers counter */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Adults (12+ Yrs)
                </label>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-sm">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Children (2-11 Yrs)
                </label>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-sm">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences: Vehicle & Room Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Preferred Vehicle
                </label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 cursor-pointer"
                >
                  <option value="sedan">Sedan (Swift Dzire / Etios) - Included</option>
                  <option value="ertiga">Maruti Ertiga 6-Seater (+₹3,000)</option>
                  <option value="innova">Toyota Innova Crysta Luxury (+₹6,000)</option>
                  <option value="tempo">12-Seater Luxury Tempo Traveller (+₹12,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Stay Preference
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 cursor-pointer"
                >
                  <option value="deluxe">3★ Deluxe Mountain View Room</option>
                  <option value="premium">4★ Premium Valley Balcony (+₹2,500/N)</option>
                  <option value="luxury-chalet">5★ Luxury Alpine Wooden Chalet (+₹5,000/N)</option>
                </select>
              </div>
            </div>

            {/* Traveler Contact Info */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Primary Traveler Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile Number * (+91)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email Address (for detailed itinerary PDF)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800"
                />
                <input
                  type="text"
                  placeholder="Special requests (e.g. Pure Jain Food, Honeymoon Cake)"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Live Pricing Breakdown Card - Clean without any Token references */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Base Package ({adults} Adults):</span>
                <span className="font-semibold">₹{totalBasePrice.toLocaleString('en-IN')}</span>
              </div>
              {vehicleSurcharge > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Vehicle Upgrade:</span>
                  <span>+₹{vehicleSurcharge.toLocaleString('en-IN')}</span>
                </div>
              )}
              {roomSurcharge > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Stay Upgrade:</span>
                  <span>+₹{roomSurcharge.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-emerald-200">
                <span>Total Estimated Price:</span>
                <span className="text-base text-emerald-900 font-black">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium pt-1">
                ✓ Includes hotel accommodation, daily breakfast & dinner, private cab with fuel, toll & mountain taxes.
              </p>
            </div>

            {/* Submit Button - Changed to "Send Inquiry" */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm tracking-wide shadow-xl active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Send Inquiry</span>
              <Send className="w-4 h-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-[11px] text-center text-slate-400">
              Zero upfront payment needed. Our native mountain team will verify dates and contact you with full availability.
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
