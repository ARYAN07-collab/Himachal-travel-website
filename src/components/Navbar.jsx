import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Phone,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Sparkles,
  Home,
  Car,
  Users,
  PhoneCall,
  CalendarCheck,
  Heart,
  Flame,
  Mountain,
  Check
} from 'lucide-react';

export default function Navbar({
  onNavigateToPackages,
  onNavigateToDestination,
  onOpenBooking,
  onOpenCustomPlan
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tourDropdownOpen, setTourDropdownOpen] = useState(false);
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const tourTimeoutRef = useRef(null);
  const destTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Scrollspy to detect which section is in view
      const sections = ['packages', 'destinations', 'cabs', 'about', 'contact'];
      let current = 'home';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToElement = (id) => {
    setMobileMenuOpen(false);
    setTourDropdownOpen(false);
    setDestinationDropdownOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTourPackagesClick = (filterOptions = {}) => {
    setTourDropdownOpen(false);
    setMobileMenuOpen(false);
    
    // Notify App to clear destination filter and set state/theme filters
    if (onNavigateToPackages) {
      onNavigateToPackages(filterOptions);
    }

    // Smooth scroll to the packages section
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDestinationClick = (destId = null) => {
    setDestinationDropdownOpen(false);
    setMobileMenuOpen(false);

    if (destId && onNavigateToDestination) {
      onNavigateToDestination(destId);
    } else {
      const element = document.getElementById('destinations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/10'
            : 'bg-gradient-to-b from-black/80 via-black/50 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo - Tourex Style with Icon */}
            <div
              onClick={() => scrollToElement('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="Go to Homepage"
            >
              <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-emerald-600 transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                    himalayan<span className="text-emerald-400">vistas</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-400/30">
                    HP & UK
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 tracking-wider">
                  Himachal & Uttarakhand Travels
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links with Clear Icons & Submenus */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs xl:text-sm font-semibold text-white/90">
              
              {/* Home */}
              <button
                onClick={() => scrollToElement('home')}
                className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                  activeSection === 'home'
                    ? 'text-emerald-400 font-bold'
                    : 'text-white/90 hover:text-emerald-400'
                }`}
              >
                <Home className="w-4 h-4 text-emerald-400" />
                <span>Home</span>
              </button>

              {/* Tour Packages (with Dropdown & Direct Click) */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
                  setTourDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  tourTimeoutRef.current = setTimeout(() => setTourDropdownOpen(false), 200);
                }}
              >
                <button
                  onClick={() => handleTourPackagesClick({ state: 'all', theme: 'all' })}
                  className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                    activeSection === 'packages'
                      ? 'text-emerald-400 font-bold'
                      : 'text-white/90 hover:text-emerald-400'
                  }`}
                  aria-expanded={tourDropdownOpen}
                >
                  <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                  <span>Tour Packages</span>
                  <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                    Popular
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      tourDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-white/60'
                    }`}
                  />
                </button>

                {/* Tour Packages Dropdown Menu */}
                {tourDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2.5 z-50 text-slate-800 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Curated Tour Categories
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        8+ Packages
                      </span>
                    </div>

                    <div className="p-1.5 space-y-0.5 text-xs">
                      <button
                        onClick={() => handleTourPackagesClick({ state: 'all', theme: 'all' })}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-slate-900 group-hover:text-emerald-700">
                            All Tour Packages
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">View All</span>
                      </button>

                      <button
                        onClick={() => handleTourPackagesClick({ state: 'Himachal', theme: 'all' })}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Mountain className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-slate-800 group-hover:text-emerald-700">
                            Himachal Pradesh Tours
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 rounded">
                          HP
                        </span>
                      </button>

                      <button
                        onClick={() => handleTourPackagesClick({ state: 'Uttarakhand', theme: 'all' })}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">🙏</span>
                          <span className="font-semibold text-slate-800 group-hover:text-emerald-700">
                            Uttarakhand (Devbhoomi)
                          </span>
                        </div>
                        <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 rounded">
                          UK
                        </span>
                      </button>

                      <div className="my-1 border-t border-slate-100" />

                      <button
                        onClick={() => handleTourPackagesClick({ theme: 'Honeymoon & Adventure' })}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center gap-2 text-slate-700 hover:text-emerald-700 cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span>Honeymoon & Romantic Specials</span>
                      </button>

                      <button
                        onClick={() => handleTourPackagesClick({ theme: 'Family Holidays' })}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center gap-2 text-slate-700 hover:text-emerald-700 cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5 text-sky-500" />
                        <span>Family Himalayan Holidays</span>
                      </button>

                      <button
                        onClick={() => handleTourPackagesClick({ theme: 'Spiritual & Pilgrimage' })}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center gap-2 text-slate-700 hover:text-emerald-700 cursor-pointer"
                      >
                        <span className="text-xs">🕉️</span>
                        <span>Kedarnath & Badrinath Yatra</span>
                      </button>

                      <button
                        onClick={() => handleTourPackagesClick({ theme: 'Adventure & High Passes' })}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center gap-2 text-slate-700 hover:text-emerald-700 cursor-pointer"
                      >
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        <span>Spiti 4x4 & Auli Skiing</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Destinations (with Dropdown & Direct Click) */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (destTimeoutRef.current) clearTimeout(destTimeoutRef.current);
                  setDestinationDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  destTimeoutRef.current = setTimeout(() => setDestinationDropdownOpen(false), 200);
                }}
              >
                <button
                  onClick={() => handleDestinationClick(null)}
                  className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                    activeSection === 'destinations'
                      ? 'text-emerald-400 font-bold'
                      : 'text-white/90 hover:text-emerald-400'
                  }`}
                  aria-expanded={destinationDropdownOpen}
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Destinations</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      destinationDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-white/60'
                    }`}
                  />
                </button>

                {/* Destinations Dropdown Menu */}
                {destinationDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 z-50 text-slate-800 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 pb-1.5 border-b border-slate-100 flex items-center gap-1">
                          <Mountain className="w-3 h-3" /> Himachal
                        </p>
                        <div className="mt-2 space-y-1 text-xs">
                          {['manali', 'spiti', 'shimla', 'jibhi', 'dharamshala', 'kasol'].map((id) => (
                            <button
                              key={id}
                              onClick={() => handleDestinationClick(id)}
                              className="w-full text-left py-1 px-1.5 rounded hover:bg-slate-100 text-slate-700 capitalize font-medium block truncate cursor-pointer"
                            >
                              {id === 'manali' && 'Manali & Solang'}
                              {id === 'spiti' && 'Spiti & Chandratal'}
                              {id === 'shimla' && 'Shimla & Kufri'}
                              {id === 'jibhi' && 'Jibhi & Tirthan'}
                              {id === 'dharamshala' && 'Dharamshala & Bir'}
                              {id === 'kasol' && 'Kasol & Tosh'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 pb-1.5 border-b border-slate-100 flex items-center gap-1">
                          <span>🙏</span> Uttarakhand
                        </p>
                        <div className="mt-2 space-y-1 text-xs">
                          {['kedarnath', 'auli', 'rishikesh', 'nainital', 'mussoorie'].map((id) => (
                            <button
                              key={id}
                              onClick={() => handleDestinationClick(id)}
                              className="w-full text-left py-1 px-1.5 rounded hover:bg-slate-100 text-slate-700 capitalize font-medium block truncate cursor-pointer"
                            >
                              {id === 'kedarnath' && 'Kedarnath & Badrinath'}
                              {id === 'auli' && 'Auli & Chopta'}
                              {id === 'rishikesh' && 'Rishikesh & Haridwar'}
                              {id === 'nainital' && 'Nainital & Corbett'}
                              {id === 'mussoorie' && 'Mussoorie & Dhanaulti'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cabs & Rentals */}
              <button
                onClick={() => scrollToElement('cabs')}
                className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                  activeSection === 'cabs'
                    ? 'text-emerald-400 font-bold'
                    : 'text-white/90 hover:text-emerald-400'
                }`}
              >
                <Car className="w-4 h-4 text-emerald-400" />
                <span>Cabs & Rentals</span>
              </button>

              {/* Custom Itinerary Wizard */}
              <button
                onClick={onOpenCustomPlan}
                className="flex items-center gap-1.5 py-2 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer font-bold"
              >
                <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
                <span>Custom Plan</span>
              </button>

              {/* About Us */}
              <button
                onClick={() => scrollToElement('about')}
                className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                  activeSection === 'about'
                    ? 'text-emerald-400 font-bold'
                    : 'text-white/90 hover:text-emerald-400'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>About Us</span>
              </button>

              {/* Contact */}
              <button
                onClick={() => scrollToElement('contact')}
                className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                  activeSection === 'contact'
                    ? 'text-emerald-400 font-bold'
                    : 'text-white/90 hover:text-emerald-400'
                }`}
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Contact</span>
              </button>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3.5">
              <a
                href="tel:+919816054321"
                className="hidden xl:flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-emerald-300 transition-colors bg-white/10 px-3.5 py-2 rounded-full border border-white/15"
                title="Call 24/7 Helpline"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>+91 98160 54321</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-emerald-600 border border-white/30 hover:border-emerald-500 transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
                <span>Send Inquiry</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => onOpenBooking()}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow cursor-pointer"
              >
                Send Inquiry
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer with Icons & Direct Accurate Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-2xl lg:hidden pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Navigation Menu
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" /> Manali & Dehradun
              </span>
            </div>

            <nav className="flex flex-col space-y-2 text-base font-semibold text-white">
              
              {/* Home */}
              <button
                onClick={() => scrollToElement('home')}
                className="text-left py-2.5 px-3 rounded-xl hover:bg-white/10 border-b border-white/5 flex items-center gap-3 cursor-pointer"
              >
                <Home className="w-5 h-5 text-emerald-400" />
                <span>Home</span>
              </button>

              {/* Tour Packages (Direct Accurate Click) */}
              <button
                onClick={() => handleTourPackagesClick({ state: 'all', theme: 'all' })}
                className="text-left py-2.5 px-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-emerald-400 animate-spin-slow" />
                  <span className="text-emerald-300 font-bold">Tour Packages</span>
                </div>
                <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  8+ Tours
                </span>
              </button>

              {/* Sub-tours quick links */}
              <div className="pl-8 pr-2 py-1 space-y-1.5 text-xs text-slate-300">
                <button
                  onClick={() => handleTourPackagesClick({ state: 'Himachal', theme: 'all' })}
                  className="w-full text-left py-1 text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Himachal Pradesh Tours (Manali, Spiti, Shimla)</span>
                </button>
                <button
                  onClick={() => handleTourPackagesClick({ state: 'Uttarakhand', theme: 'all' })}
                  className="w-full text-left py-1 text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <span>🙏</span>
                  <span>Uttarakhand Devbhoomi Tours (Kedarnath, Auli)</span>
                </button>
              </div>

              {/* Destinations */}
              <button
                onClick={() => handleDestinationClick(null)}
                className="text-left py-2.5 px-3 rounded-xl hover:bg-white/10 border-b border-white/5 flex items-center gap-3 cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Destinations (HP & UK)</span>
              </button>

              {/* Cabs */}
              <button
                onClick={() => scrollToElement('cabs')}
                className="text-left py-2.5 px-3 rounded-xl hover:bg-white/10 border-b border-white/5 flex items-center gap-3 cursor-pointer"
              >
                <Car className="w-5 h-5 text-emerald-400" />
                <span>Private Cabs & Tempo Fares</span>
              </button>

              {/* Custom Plan */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomPlan();
                }}
                className="text-left py-2.5 px-3 rounded-xl hover:bg-white/10 border-b border-white/5 flex items-center gap-3 text-emerald-300 font-bold cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <span>Build Custom Itinerary</span>
              </button>

              {/* About Us */}
              <button
                onClick={() => scrollToElement('about')}
                className="text-left py-2.5 px-3 rounded-xl hover:bg-white/10 border-b border-white/5 flex items-center gap-3 cursor-pointer"
              >
                <Users className="w-5 h-5 text-emerald-400" />
                <span>About Our Local Agency</span>
              </button>

              {/* Contact */}
              <button
                onClick={() => scrollToElement('contact')}
                className="text-left py-2.5 px-3 rounded-xl hover:bg-white/10 border-b border-white/5 flex items-center gap-3 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <span>Contact & Local Offices</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href="tel:+919816054321"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition text-sm"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Helpline: +91 98160 54321</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition text-center shadow-lg"
            >
              Send Inquiry
            </button>
          </div>
        </div>
      )}
    </>
  );
}
