import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_STORAGE_KEY = 'himalayan_vistas_inquiries_backup';

// Save local backup in localStorage
const saveLocalBackup = (type, payload) => {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const record = {
      id: payload.inquiry_ref_id || 'LOCAL-' + Date.now(),
      type,
      payload,
      createdAt: new Date().toISOString()
    };
    existing.unshift(record);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not save local backup:', err);
  }
};

/**
 * Submit a tour package inquiry (from Booking / Send Inquiry modal)
 */
export async function submitTourInquiry(inquiryData) {
  const payload = {
    inquiry_ref_id: inquiryData.inquiryRefId,
    package_id: inquiryData.packageId,
    package_title: inquiryData.packageTitle,
    departure_city: inquiryData.departureCity || 'Delhi NCR',
    start_date: inquiryData.startDate,
    adults: Number(inquiryData.adults) || 1,
    children: Number(inquiryData.children) || 0,
    vehicle: inquiryData.vehicle || 'sedan',
    room_type: inquiryData.roomType || 'deluxe',
    estimated_amount: Number(inquiryData.estimatedAmount) || 0,
    full_name: inquiryData.fullName,
    phone: inquiryData.phone,
    email: inquiryData.email || null,
    special_requests: inquiryData.specialRequests || null,
    status: 'new'
  };

  // Always keep a local backup
  saveLocalBackup('tour_inquiry', payload);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('tour_inquiries')
        .insert([payload]);

      if (error) {
        console.error('Supabase tour_inquiries insert error:', error);
        return { success: true, savedTo: 'local_fallback', error: error.message };
      }

      return { success: true, savedTo: 'supabase' };
    } catch (err) {
      console.error('Failed to communicate with Supabase:', err);
      return { success: true, savedTo: 'local_fallback', error: err.message };
    }
  }

  return { success: true, savedTo: 'local_storage', data: payload };
}

/**
 * Submit custom itinerary inquiry (from Custom Trip Planner wizard)
 */
export async function submitCustomTripInquiry(tripData) {
  const payload = {
    traveler_name: tripData.travelerName,
    whatsapp: tripData.whatsapp,
    destinations: Array.isArray(tripData.destinations) ? tripData.destinations : [tripData.destinations],
    duration: tripData.duration || '5-7 Days',
    month: tripData.month || 'Upcoming',
    travel_type: tripData.travelType || 'Family',
    budget_tier: tripData.budgetTier || 'Comfort',
    pickup_city: tripData.pickupCity || 'Delhi NCR',
    estimated_amount: Number(tripData.estimatedAmount) || 0,
    status: 'new'
  };

  saveLocalBackup('custom_trip', payload);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('custom_trip_inquiries')
        .insert([payload]);

      if (error) {
        console.error('Supabase custom_trip_inquiries insert error:', error);
        return { success: true, savedTo: 'local_fallback', error: error.message };
      }

      return { success: true, savedTo: 'supabase' };
    } catch (err) {
      console.error('Failed to communicate with Supabase:', err);
      return { success: true, savedTo: 'local_fallback', error: err.message };
    }
  }

  return { success: true, savedTo: 'local_storage', data: payload };
}

/**
 * Submit quick callback / contact request
 */
export async function submitCallbackRequest(contactData) {
  const payload = {
    name: contactData.name,
    phone: contactData.phone,
    destination: contactData.destination || 'Himachal Pradesh',
    travelers: contactData.travelers || '2 Adults',
    message: contactData.message || '',
    status: 'new'
  };

  saveLocalBackup('callback_request', payload);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('callback_requests')
        .insert([payload]);

      if (error) {
        console.error('Supabase callback_requests insert error:', error);
        return { success: true, savedTo: 'local_fallback', error: error.message };
      }

      return { success: true, savedTo: 'supabase' };
    } catch (err) {
      console.error('Failed to communicate with Supabase:', err);
      return { success: true, savedTo: 'local_fallback', error: err.message };
    }
  }

  return { success: true, savedTo: 'local_storage', data: payload };
}

/**
 * Submit newsletter subscriber
 */
export async function submitNewsletterSubscription(email) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Invalid email' };
  }

  const payload = { email: email.trim().toLowerCase() };
  saveLocalBackup('newsletter', payload);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([payload]);

      if (error) {
        if (error.code === '23505') {
          return { success: true, alreadySubscribed: true };
        }
        return { success: false, error: error.message };
      }

      return { success: true, savedTo: 'supabase' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  return { success: true, savedTo: 'local_storage' };
}
