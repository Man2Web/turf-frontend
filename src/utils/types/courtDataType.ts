interface Location {
  country: string;
  city: string;
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
  id: number;
  court_id: number;
  parking: boolean;
  drinking_water: boolean;
  first_aid: boolean;
  change_room: boolean;
  shower: boolean;
}

interface Includes {
  id: number;
  court_id: number;
  badminton_racket: boolean;
  bats: boolean;
  hitting_machines: boolean;
  multiple_courts: boolean;
  spare_players: boolean;
  instant_racket: boolean;
  green_turfs: boolean;
}

interface Pricing {
  starting_price: number;
  max_guests: number;
  additional_guests: number;
  price_of_additional_guests: string;
  advance_pay: string;
}

interface CourtDataType {
  court_id: number;
  phone_number: string;
  m_name?: string;
  email: string;
  court_name: string;
  court_type: string;
  venue_overview: any;
  rules_of_venue: any;
  location: Location;
  time_Slots: TimeSlot[];
  amenities: Amenities;
  includes: Includes;
  pricing: Pricing;
  images: string[];
}
