import React, { useState } from 'react';
import {
  Compass,
  Star,
  Clock,
  MapPin,
  Car,
  Hotel,
  Utensils,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Search
} from 'lucide-react';
import { tourPackagesData } from '../data/packages';

export default function TourPackagesSection({
  selectedDestinationId,
  onClearDestinationFilter,
  stateFilter: propStateFilter,
  onStateFilterChange,
  themeFilter: propThemeFilter,
  onThemeFilterChange,
  isHighlighted,
  onOpenDetail,
  onOpenBooking
}) {
  const [internalStateFilter, setInternalStateFilter] = useState('all');
  const [internalThemeFilter, setInternalThemeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const stateFilter = propStateFilter !== undefined ? propStateFilter : internalStateFilter;
  const setStateFilter = onStateFilterChange || setInternalStateFilter;

  const themeFilter = propThemeFilter !== undefined ? propThemeFilter : internalThemeFilter;
  const setThemeFilter = onThemeFilterChange || setInternalThemeFilter;

  const themes = [
    'All Themes',
    'Honeymoon & Adventure',
    'Family Holidays',
    'Spiritual & Pilgrimage',
    'Adventure & High Passes',
    'Weekend Getaways',
    'Offbeat & Nature'
  ];

  // Filtering logic
  const filteredPackages = tourPackagesData.filter((pkg) => {
    // If a destination was selected from search or bento
    if (selectedDestinationId && pkg.destinationId !== selectedDestinationId) {
      return false;
    }

    // State filter
    if (stateFilter === 'Himachal' && !pkg.state.includes('Himachal')) return false;
    if (stateFilter === 'Uttarakhand' && !pkg.state.includes('Uttarakhand')) return false;

    // Theme filter
    if (themeFilter !== 'all' && themeFilter !== 'All Themes' && pkg.theme !== themeFilter) {
      return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        pkg.title.toLowerCase().includes(q) ||
        pkg.state.toLowerCase().includes(q) ||
        pkg.travelRoute.toLowerCase().includes(q) ||
        pkg.theme.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Sorting logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended
  });

  return (
    <section
      id="packages"
      className={`py-20 lg:py-28 bg-slate-50 border-b border-slate-200 transition-all duration-700 ${
        isHighlighted ? 'highlight-pulse bg-emerald-50/30' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1 rounded-full">
            <Compass className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
            <span>Handcrafted Itineraries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
            Featured Himalayan Tour Packages
          </h2>
          <p className="text-base text-slate-500 font-light">
            All-inclusive holiday packages with private cabs, certified mountain drivers, handpicked stays, and daily breakfast & dinner.
          </p>
        </div>

        {/* Destination Active Filter Notice (if selected from bento or hero search) */}
        {selectedDestinationId && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-xs sm:text-sm font-semibold text-emerald-900">
                Showing packages matching destination: <span className="underline capitalize font-bold">{selectedDestinationId}</span>
              </span>
            </div>
            <button
              onClick={onClearDestinationFilter}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-sm cursor-pointer"
            >
              Clear Filter (Show All)
            </button>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-200/80 mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* State Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { setStateFilter('all'); onClearDestinationFilter(); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  stateFilter === 'all' && !selectedDestinationId
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Destinations ({tourPackagesData.length})
              </button>
              <button
                onClick={() => { setStateFilter('Himachal'); onClearDestinationFilter(); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  stateFilter === 'Himachal'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🏔️ Himachal Pradesh Tours
              </button>
              <button
                onClick={() => { setStateFilter('Uttarakhand'); onClearDestinationFilter(); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  stateFilter === 'Uttarakhand'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🙏 Uttarakhand (Devbhoomi)
              </button>
            </div>

            {/* Search and Sort controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search Manali, Spiti, Kedarnath..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated (Stars)</option>
              </select>
            </div>
          </div>

          {/* Theme Horizontal Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Theme:
            </span>
            {themes.map((theme, i) => (
              <button
                key={i}
                onClick={() => setThemeFilter(theme === 'All Themes' ? 'all' : theme)}
                className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition cursor-pointer ${
                  (themeFilter === 'all' && theme === 'All Themes') || themeFilter === theme
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>

        </div>

        {/* Packages Grid */}
        {sortedPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No packages match your search filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try resetting your filters or tell us your custom travel requirements to craft a personalized tour plan.
            </p>
            <button
              onClick={() => {
                setStateFilter('all');
                setThemeFilter('all');
                setSearchQuery('');
                onClearDestinationFilter();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-900 shadow-sm">
                      {pkg.state}
                    </span>
                    {pkg.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Duration on bottom of image */}
                  <div className="absolute bottom-3 left-3.5 text-white flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Rating & Theme */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {pkg.theme}
                      </span>
                      <div className="flex items-center gap-1 text-slate-700 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{pkg.rating}</span>
                        <span className="text-slate-400 font-normal">({pkg.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                      {pkg.title}
                    </h3>

                    {/* Route line */}
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{pkg.travelRoute}</span>
                    </p>
                  </div>

                  {/* Inclusions Feature Icons */}
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center">
                    <div className="flex flex-col items-center">
                      <Car className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-slate-500 font-medium">Cab / Bus</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Hotel className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-slate-500 font-medium">Stays</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Utensils className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-slate-500 font-medium">Meals</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Compass className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-slate-500 font-medium">Tours</span>
                    </div>
                  </div>

                  {/* Price & CTA Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-slate-900">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-600 font-bold">
                        {pkg.discountPercent}% Off • per person
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenDetail(pkg)}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      >
                        Itinerary
                      </button>
                      <button
                        onClick={() => onOpenBooking(pkg)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Send Inquiry</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
