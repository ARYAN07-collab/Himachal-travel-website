import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeadlinePillSection from './components/HeadlinePillSection';
import AboutStatsSection from './components/AboutStatsSection';
import DestinationsBento from './components/DestinationsBento';
import FeaturesSection from './components/FeaturesSection';
import TourPackagesSection from './components/TourPackagesSection';
import PackageDetailModal from './components/PackageDetailModal';
import BookingModal from './components/BookingModal';
import CustomTripBuilder from './components/CustomTripBuilder';
import CabCalculator from './components/CabCalculator';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedPackage, setPreselectedPackage] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetailPackage, setSelectedDetailPackage] = useState(null);
  const [customPlanOpen, setCustomPlanOpen] = useState(false);

  // Controlled filters for Tour Packages
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState(null);
  const [packageStateFilter, setPackageStateFilter] = useState('all');
  const [packageThemeFilter, setPackageThemeFilter] = useState('all');
  const [packagesHighlighted, setPackagesHighlighted] = useState(false);

  const handleNavigateToPackages = (options = {}) => {
    // Clear any previous destination filter so all packages are available
    setSelectedDestinationFilter(null);

    // Apply state filter if provided
    if (options.state) {
      setPackageStateFilter(options.state);
    } else {
      setPackageStateFilter('all');
    }

    // Apply theme filter if provided
    if (options.theme) {
      setPackageThemeFilter(options.theme);
    } else {
      setPackageThemeFilter('all');
    }

    // Visual feedback pulse
    setPackagesHighlighted(true);
    setTimeout(() => setPackagesHighlighted(false), 2000);

    // Accurate scroll into view
    const pkgEl = document.getElementById('packages');
    if (pkgEl) {
      pkgEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateToDestination = (destinationId) => {
    setSelectedDestinationFilter(destinationId);
    setPackageStateFilter('all');
    setPackageThemeFilter('all');
    setPackagesHighlighted(true);
    setTimeout(() => setPackagesHighlighted(false), 2000);

    const pkgEl = document.getElementById('packages');
    if (pkgEl) {
      pkgEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHeroSearch = (searchData) => {
    if (searchData.tab === 'cab') {
      const cabEl = document.getElementById('cabs');
      if (cabEl) cabEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (searchData.destinationId) {
      setSelectedDestinationFilter(searchData.destinationId);
    }
    setPackageStateFilter('all');
    setPackageThemeFilter('all');
    setPackagesHighlighted(true);
    setTimeout(() => setPackagesHighlighted(false), 2000);

    const pkgEl = document.getElementById('packages');
    if (pkgEl) {
      pkgEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectDestinationFromBento = (destinationId) => {
    handleNavigateToDestination(destinationId);
  };

  const handleOpenDetailModal = (pkg) => {
    setSelectedDetailPackage(pkg);
    setDetailModalOpen(true);
  };

  const handleOpenBookingModal = (pkg = null) => {
    setPreselectedPackage(pkg);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Sticky Header Navigation with Perfect Icon Clicks & Dropdowns */}
      <Navbar
        onNavigateToPackages={handleNavigateToPackages}
        onNavigateToDestination={handleNavigateToDestination}
        onOpenBooking={() => handleOpenBookingModal(null)}
        onOpenCustomPlan={() => setCustomPlanOpen(true)}
      />

      {/* Hero Section matching Tourex reference design */}
      <Hero
        onSearch={handleHeroSearch}
        onOpenBooking={() => handleOpenBookingModal(null)}
        onOpenCustomPlan={() => setCustomPlanOpen(true)}
      />

      {/* Signature Inline Capsule Photo Headline */}
      <HeadlinePillSection />

      {/* Two-Column About & Statistics section matching reference */}
      <AboutStatsSection
        onOpenCustomPlan={() => setCustomPlanOpen(true)}
      />

      {/* Experience Our Destination Bento Grid */}
      <DestinationsBento
        onSelectDestination={handleSelectDestinationFromBento}
      />

      {/* 4-Feature Value Propositions matching reference bottom row */}
      <FeaturesSection />

      {/* Interactive Tour Packages Explorer (Accurately Controlled) */}
      <TourPackagesSection
        selectedDestinationId={selectedDestinationFilter}
        onClearDestinationFilter={() => setSelectedDestinationFilter(null)}
        stateFilter={packageStateFilter}
        onStateFilterChange={setPackageStateFilter}
        themeFilter={packageThemeFilter}
        onThemeFilterChange={setPackageThemeFilter}
        isHighlighted={packagesHighlighted}
        onOpenDetail={handleOpenDetailModal}
        onOpenBooking={handleOpenBookingModal}
      />

      {/* Private Cabs & Tempo Fare Calculator */}
      <CabCalculator
        onOpenBooking={() => handleOpenBookingModal(null)}
      />

      {/* Customer Testimonials & Reviews */}
      <TestimonialsSection />

      {/* FAQs & Mountain Travel Guidelines */}
      <FaqSection />

      {/* Local Office Presence & Contact / Callback Form */}
      <ContactSection />

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBookingModal(null)}
        onOpenCustomPlan={() => setCustomPlanOpen(true)}
      />

      {/* Floating WhatsApp, Call & Mobile Sticky Bar */}
      <FloatingActions
        onOpenBooking={() => handleOpenBookingModal(null)}
      />

      {/* Modals */}
      {detailModalOpen && (
        <PackageDetailModal
          pkg={selectedDetailPackage}
          onClose={() => setDetailModalOpen(false)}
          onOpenBooking={(pkg) => {
            setDetailModalOpen(false);
            handleOpenBookingModal(pkg);
          }}
        />
      )}

      {bookingModalOpen && (
        <BookingModal
          preselectedPackage={preselectedPackage}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

      {customPlanOpen && (
        <CustomTripBuilder
          isOpen={customPlanOpen}
          onClose={() => setCustomPlanOpen(false)}
        />
      )}
    </div>
  );
}
