interface SuccessBookingData {
  id: string;
  court_id: string;
  booking_date: string; // Date string in ISO format
  user_id: string;
  booking_detail_id: string;
  admin_id: string;
  payment_mode: boolean;
  amount_paid: string; // Assuming it's a string due to quotes, could also be number
  transaction_id: string;
  booked_on: string; // Date string in ISO format
  duration: string;
  pay_required: string;
  booking_time: string[]; // Array of time strings
  court_info: CourtInfo;
  booking_info: BookingInfo;
  court_details: CourtDetails;
  review_details: ReviewDetails;
  total_count: string; // Assuming it's a string due to quotes, could also be number
}

interface ReviewDetails {
  status: boolean | null;
}

interface CourtInfo {
  court_id: number;
  admin_id: number;
  court_name: string;
  court_type: string;
  featured: boolean;
}

interface BookingInfo {
  email: string;
  phone_number: string;
  location: string | null;
  fname: string;
  lname: string;
  city: string | null;
  pincode: string | null;
  guests: number;
  add_guests: number;
  payment_type: string | null;
  pg_type: string | null;
  bank_id: string | null;
  state: string | null;
  pg_tid: string | null;
  card_type: string | null;
  country: string | null;
}

interface CourtDetails {
  city: string;
  location_link: string;
  price: number;
  add_price: number;
  guests: number;
  add_guests: number;
  email: string;
  phone_number: number;
  advance_pay: number;
  images: string[];
}
