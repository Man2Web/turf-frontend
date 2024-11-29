interface AdvancedSearchForm {
  courtName: string;
  minPrice?: string;
  maxPrice?: string;
  userLocation: string | undefined;
  minGuest: string;
  maxGuest: string;
  sportType: string | undefined;
  amenities?: {
    parking: boolean;
    drinkingWater: boolean;
    firstAid: boolean;
    changeRoom: boolean;
    shower: boolean;
  };
}
