interface LocationData {
  city: string;
  country: string;
  location_link: string;
  embed_link: string;
}

interface TimeSlot {
  day_of_week: string;
  duration: string;
  start_time: string | null;
  end_time: string | null;
}

interface Amenities {
  shower: boolean;
  parking: boolean;
  first_aid: boolean;
  change_room: boolean;
  drinking_water: boolean;
}

interface CourtIncludes {
  bats: boolean;
  green_turfs: boolean;
  spare_players: boolean;
  instant_racket: boolean;
  multiple_courts: boolean;
  badminton_racket: boolean;
  hitting_machines: boolean;
}

interface VenuePrice {
  max_guests: number;
  advance_pay: number;
  starting_price: number;
  additional_guests: number;
  price_of_additional_guests: number;
}

interface Image {
  id: string;
  court_id: string;
  image_url: string;
}

interface CourtDataType {
  id: string;
  court_id: string;
  user_id: string;
  court_name: string;
  court_type: string;
  venue_overview: string;
  rules_of_venue: string;
  featured: boolean;
  phone_number: string;
  email: string;
  approved: boolean;
  locationdata: LocationData;
  venueprice: VenuePrice;
  amenities: Amenities;
  courtincludes: CourtIncludes;
  time_Slots: TimeSlot[];
  images: Image[];
}
