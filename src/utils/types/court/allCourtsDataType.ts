interface courtImagesData {
  image_url: string;
}

interface LocationData {
  country: string;
  city: string;
  location_link: string;
  embedded_link: string;
}

interface CourtPriceData {
  starting_price: string;
  guests: string;
  additional_guests: string;
  price_of_additional_guests: string;
  advance_pay: string;
}

interface CouponData {
  amount: number; // The maximum discount amount (e.g., 100)
  status: boolean; // Whether the coupon is active or not
  admin_id: number; // ID of the admin who created the coupon
  end_time: string; // The end time of the coupon validity in ISO string format
  created_at: string; // The timestamp when the coupon was created, in ISO string format
  min_amount: number; // Minimum amount required to use the coupon (e.g., 2000)
  percentage: number; // Discount percentage (e.g., 10%)
  start_time: string; // The start time of the coupon validity in ISO string format
  coupon_code: string; // The code for the coupon (e.g., "GET10")
  coupon_type: boolean; // Type of coupon, false indicating a specific type
  coupon_label: string; // Descriptive label for the coupon
}

interface CourtDurationData {
  id: number;
  court_id: number;
  day_of_week: string;
  duration: string;
  start_time: string;
  end_time: string;
}

interface Availability {
  day: string;
  duration: string;
  start_time: string;
  end_time: string;
}

interface CourtsData {
  court_id: string;
  admin_id: string;
  status: boolean;
  phone_number: string;
  email: string;
  court_name: string;
  court_type: string;
  featured: boolean;
  venue_overview: string; // Change from `any` to `string`
  rules_of_venue: string[]; // Change to array of strings
  approved: boolean; // Since the data has `approved` field instead of `featured`
  location: LocationData; // Correct field name
  pricing: CourtPriceData; // Correct field name and structure
  availability: string[][];
  includes: string[];
  amenities: string[];
  images: string[]; // Use `courtImagesData[]`, but only image_url is needed
  coupon_data?: CouponData;
}
