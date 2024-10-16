interface Booking {
  id: string;
  court_id: string;
  booking_date: string; // ISO 8601 date string
  booking_time: string; // HH:mm:ss format
  user_id: string;
  booking_detail_id: string;
  admin_id: string;
  payment_mode: boolean;
  amount_paid: string; // You may want to use number if this is always numeric
  transaction_id: string;
  booked_on: string; // ISO 8601 date string
  duration: string; // You may want to use number if this is always numeric
  pay_required: string; // You may want to use number if this is always numeric
}

interface CourtDetails {
  id: number;
  user_id: number;
  court_name: string;
  court_type: string;
  venue_overview: string; // HTML string
  rules_of_venue: string; // HTML string
  featured: boolean;
  phone_number: string;
  email: string;
  approved: boolean;
}

interface SuccessBookingDetails {
  id: string;
  email: string;
  phone_number: string;
  location: string | null; // Assuming location can be null
  fname: string;
  lname: string;
  city: string | null; // Assuming city can be null
  country: string | null; // Assuming country can be null
  pincode: string | null; // Assuming pincode can be null
  guests: string; // You may want to use number if this is always numeric
  add_guests: string; // You may want to use number if this is always numeric
  payment_type: string | null; // Assuming payment_type can be null
  pg_tid: string | null; // Assuming pg_tid can be null
  card_type: string | null; // Assuming card_type can be null
  bank_id: string | null; // Assuming bank_id can be null
  state: string | null; // Assuming state can be null
}

interface LocationDetails {
  id: number;
  country: string;
  city: string;
  location_link: string; // URL
  court_id: number;
  embed_link: string; // HTML string for embedding a map
}

interface SuccessBookingData {
  booking: Booking[];
  courtDetails: CourtDetails;
  bookingDetails: SuccessBookingDetails;
  locationDetails: LocationDetails;
}
