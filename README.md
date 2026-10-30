# 🏔️ Himalayan Vistas — Travel & Tour Booking Platform

A modern, responsive, and interactive travel platform for a Himachal-based tour operating business offering curated holiday packages, custom trip planning, cab rentals, and stays across **Himachal Pradesh** and **Uttarakhand**.

Built with **React**, **Vite**, **Tailwind CSS**, and connected to a **Supabase** cloud database backend.

---

## 🌟 Key Features

- **Hero & Floating Booking Card**: Real-time search by destination, travel dates, passenger counter, and inquiry generation.
- **Interactive Tour Packages**:
  - Filter by Region (*Himachal Pradesh*, *Uttarakhand*) and Themes (*Honeymoon*, *Family*, *Spiritual Pilgrimage*, *Adventure*, *Weekend Getaway*).
  - Search by keywords and sort by price or traveler rating.
  - Complete day-by-day itineraries, meal plans, inclusions, and exclusions.
- **Custom Trip Planner Wizard**: 3-step interactive custom itinerary builder for couples, families, and groups.
- **Private Cab & Tempo Traveller Estimator**: Transparent all-inclusive route fare calculator (Delhi/Chandigarh to Manali, Shimla, Rishikesh, Nainital, Kedarnath, etc.).
- **Backend & Database Integration**:
  - Connected to **Supabase** PostgreSQL.
  - Automatically stores inquiries from tour packages, custom trip planners, callback requests, and newsletter signups.
  - Row Level Security (RLS) enabled for safe public client submissions.
- **Instant WhatsApp Dispatch**: Generates customized WhatsApp messages pre-filled with traveler details and inquiry reference IDs.
- **Responsive Design**: Mobile-first, tablet-optimized, and full desktop experience with quick-action bottom bar on mobile.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: Canvas Confetti
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + PostgREST)

---

## 📂 Project Structure

```
himachal-travel-website/
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular UI components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchWidget.jsx
│   │   ├── HeadlinePillSection.jsx
│   │   ├── AboutStatsSection.jsx
│   │   ├── DestinationsBento.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── TourPackagesSection.jsx
│   │   ├── PackageDetailModal.jsx
│   │   ├── BookingModal.jsx
│   │   ├── CustomTripBuilder.jsx
│   │   ├── CabCalculator.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── FaqSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Footer.jsx
│   │   └── FloatingActions.jsx
│   ├── data/               # Destinations, packages, cabs, testimonials & FAQs data
│   │   ├── destinations.js
│   │   ├── packages.js
│   │   ├── cabs.js
│   │   ├── testimonials.js
│   │   └── faqs.js
│   ├── lib/
│   │   └── supabase.js     # Supabase client initialization
│   ├── services/
│   │   └── inquiryService.js # Database CRUD & local backup caching
│   ├── App.jsx             # Main application layout & state
│   ├── index.css           # Custom styles & scroll margins
│   └── main.jsx
├── supabase_schema.sql     # Database schema & RLS policies
├── .env.example            # Environment variables template
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ARYAN07-collab/Himachal-travel-website.git
cd Himachal-travel-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Supabase Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Setup Database Schema
In your Supabase project's **SQL Editor**, run the SQL commands from `supabase_schema.sql` to create all required tables and Row Level Security (RLS) policies.

### 5. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

### 6. Build for Production
```bash
npm run build
```

---

## 📄 License
This project is proprietary and built for Himalayan Vistas Travels.
