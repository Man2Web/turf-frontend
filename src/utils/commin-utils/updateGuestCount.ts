export const updateGuestCount = (
  movement: number,
  direction: number,
  numberOfGuests: number,
  additionalNumberOfGuests: number,
  courtData: CourtsData,
  setValue: any
) => {
  const maxGuests =
    Number(courtData.pricing.guests) +
    Number(courtData.pricing.additional_guests);
  const totalGuests = numberOfGuests + additionalNumberOfGuests;

  if (movement === 0) {
    // Decrease guests
    if (direction === 0) {
      // First, decrease additional guests if they are greater than 0
      if (additionalNumberOfGuests > 0) {
        setValue("additionalNumberOfGuests", additionalNumberOfGuests - 1, {
          shouldValidate: true,
        });
      }
      // Then, decrease the main number of guests, but ensure it doesn't go below 1
      else if (numberOfGuests > 1) {
        setValue("numberOfGuests", numberOfGuests - 1, {
          shouldValidate: true,
        });
      }
    }
    // Increase guests
    else {
      // First, increment the numberOfGuests until it hits the pricing.guests limit
      if (numberOfGuests < Number(courtData.pricing.guests)) {
        if (totalGuests + 1 <= maxGuests) {
          setValue("numberOfGuests", numberOfGuests + 1);
        }
      }
      // If the numberOfGuests exceeds pricing.guests, increment additionalNumberOfGuests until pricing.additional_guests limit
      else if (
        numberOfGuests >= Number(courtData.pricing.guests) &&
        additionalNumberOfGuests < Number(courtData.pricing.additional_guests)
      ) {
        if (totalGuests + 1 <= maxGuests) {
          setValue("additionalNumberOfGuests", additionalNumberOfGuests + 1);
        }
      }
    }
  }
};
