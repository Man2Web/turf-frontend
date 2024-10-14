// Interface for Court Details
interface CourtDetails {
  id: number; // Assuming the ID is a number
  user_id: number; // Assuming user_id is a number
  court_name: string;
  phone_number: string;
  email: string;
  court_type: string;
  venue_overview: string; // Assuming HTML content is a string
  rules_of_venue: string; // Assuming HTML content is a string
  featured: boolean;
}

interface LocationDetails {
  id: number;
  country: string;
  city: string;
  location_link: string;
  court_id: number;
}

// Interface for Booking Details
interface BookingDetails {
  id: string; // Assuming ID is a string
  fname: string;
  lname: string;
  email: string;
  phone_number: string;
  location: string;
  city: string;
  country: string;
  pincode: string;
  guests: number;
  add_guests: number;
  payment_type: string;
  pg_tid: string;
  card_type: string;
  bank_id: string;
}

interface ReviewDetails {
  id: string;
  court_id: string;
  user_id: string;
  title: string;
  description: string;
  rating: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  status: boolean;
  booking_details_id: string;
  transaction_id: string;
}

interface ImagesData {
  id: number;
  court_id: number;
  image_url: string;
}

// Interface for Booking
interface BookingData {
  id: string; // Assuming ID is a string
  court_id: string; // Assuming court_id is a string
  booking_date: string; // ISO 8601 format date
  booking_time: string; // Time in HH:MM:SS format
  user_id: string; // Assuming user_id is a string
  booking_detail_id: string; // Assuming booking_detail_id is a string
  admin_id: string; // Assuming admin_id is a string
  payment_mode: boolean;
  courtDetails: CourtDetails;
  bookingDetails: BookingDetails;
  locationDetails: LocationDetails;
  reviewDetails: null | ReviewDetails;
  imagesData: ImagesData;
  booked_on: string;
  amount_paid: number;
  pay_required: number;
  transaction_id: string;
  duration: number;
}
