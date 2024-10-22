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
  images: courtImagesData[]; // Use `courtImagesData[]`, but only image_url is needed
}
