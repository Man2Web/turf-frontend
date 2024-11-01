interface CourtAvailability {
  duration: string;
  startTime: string | null;
  endTime: string | null;
}

interface VenuePrice {
  startingPrice: string;
  maxGuests: number;
  additionalGuests: number;
  priceOfAdditionalGuests: string;
  advancePay: number;
}

interface CourtIncludes {
  badmintonRacket: boolean;
  bats: boolean;
  hittingMachines: boolean;
  multipleCourts: boolean;
  sparePlayers: boolean;
  instantRacket: boolean;
  greenTurfs: boolean;
}

interface Amenities {
  parking: boolean;
  drinkingWater: boolean;
  firstAid: boolean;
  changeRoom: boolean;
  shower: boolean;
}

interface Location {
  country: string;
  city: string;
  locationLink: string;
  embedLink: string;
}

interface CourtImages {
  file: object;
  url: string;
}

interface CourtFormDataType {
  courtName: string;
  phoneNumber: string;
  email: string;
  courtType: string;
  venuePrice: VenuePrice;
  venueOverview: string;
  courtIncludes: CourtIncludes;
  rulesOfVenue: string;
  amenities: Amenities;
  location: Location;
  courtImages: CourtImages[];
  courtAvailability: {
    monday: CourtAvailability;
    tuesday: CourtAvailability;
    wednesday: CourtAvailability;
    thursday: CourtAvailability;
    friday: CourtAvailability;
    saturday: CourtAvailability;
    sunday: CourtAvailability;
  };
  userId: number;
}
