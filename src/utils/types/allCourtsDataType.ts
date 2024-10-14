interface courtImagesData {
  id: number;
  court_id: number;
  image_url: string;
}

interface LocationData {
  id: number;
  country: string;
  city: string;
  location_link: string;
  court_id: number;
}

interface CourtPriceData {
  id: number;
  court_id: number;
  starting_price: number;
  max_guests: number;
  additional_guests: number;
  price_of_additional_guests: string;
}

interface CourtDurationData {
  id: number;
  court_id: number;
  day_of_week: string;
  duration: string;
  start_time: string;
  end_time: string;
}

interface CourtsData {
  id: number;
  user_id: number;
  court_name: string;
  court_type: string;
  venue_overview: any;
  rules_of_venue: string;
  featured: boolean;
  email: string;
  m_name: string;
  locationData: LocationData;
  courtPriceData: CourtPriceData;
  courtImagesData: courtImagesData[];
  courtAvailabilityData: CourtDurationData;
}
