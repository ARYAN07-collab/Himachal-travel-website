-- ==============================================================================
-- HIMALAYAN VISTAS - TRAVEL & TOUR BOOKING DATABASE SCHEMA
-- Compatible with Supabase Postgres
-- ==============================================================================

-- 1. TOUR PACKAGES INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.tour_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    inquiry_ref_id TEXT NOT NULL,
    package_id TEXT NOT NULL,
    package_title TEXT NOT NULL,
    departure_city TEXT NOT NULL DEFAULT 'Delhi NCR',
    start_date DATE NOT NULL,
    adults INTEGER NOT NULL DEFAULT 1,
    children INTEGER NOT NULL DEFAULT 0,
    vehicle TEXT NOT NULL DEFAULT 'sedan',
    room_type TEXT NOT NULL DEFAULT 'deluxe',
    estimated_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'confirmed', 'archived'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CUSTOM ITINERARY TRIP BUILDER INQUIRIES
CREATE TABLE IF NOT EXISTS public.custom_trip_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    traveler_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    destinations TEXT[] NOT NULL DEFAULT '{}',
    duration TEXT NOT NULL,
    month TEXT NOT NULL,
    travel_type TEXT NOT NULL,
    budget_tier TEXT NOT NULL,
    pickup_city TEXT NOT NULL DEFAULT 'Delhi NCR',
    estimated_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. QUICK CALLBACK & CONTACT REQUESTS
CREATE TABLE IF NOT EXISTS public.callback_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    destination TEXT,
    travelers TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CAB & TEMPO TRAVELER INQUIRIES
CREATE TABLE IF NOT EXISTS public.cab_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    route_name TEXT NOT NULL,
    cab_type TEXT NOT NULL,
    estimated_fare NUMERIC(10, 2) NOT NULL,
    customer_name TEXT,
    customer_phone TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR FAST QUERYING
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_tour_inquiries_created_at ON public.tour_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tour_inquiries_ref_id ON public.tour_inquiries(inquiry_ref_id);
CREATE INDEX IF NOT EXISTS idx_custom_trip_created_at ON public.custom_trip_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_callback_requests_created_at ON public.callback_requests(created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Enable RLS on all tables
ALTER TABLE public.tour_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_trip_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.callback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cab_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous visitors to INSERT their inquiries (safe client-side submission)
CREATE POLICY "Allow public insert on tour_inquiries" 
    ON public.tour_inquiries FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow public insert on custom_trip_inquiries" 
    ON public.custom_trip_inquiries FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow public insert on callback_requests" 
    ON public.callback_requests FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow public insert on cab_inquiries" 
    ON public.cab_inquiries FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow public insert on newsletter_subscribers" 
    ON public.newsletter_subscribers FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

-- Allow authenticated admins to view/manage inquiries
CREATE POLICY "Allow full access for authenticated users on tour_inquiries" 
    ON public.tour_inquiries FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access for authenticated users on custom_trip_inquiries" 
    ON public.custom_trip_inquiries FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access for authenticated users on callback_requests" 
    ON public.callback_requests FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access for authenticated users on cab_inquiries" 
    ON public.cab_inquiries FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access for authenticated users on newsletter_subscribers" 
    ON public.newsletter_subscribers FOR ALL 
    TO authenticated 
    USING (true) WITH CHECK (true);
