export const updateGuestCount = (
  movement: number,
  direction: number,
  numberOfGuests: number,
  additionalNumberOfGuests: number,
  courtData: CourtDataType,
  setValue: any
) => {
  if (movement === 0) {
    if (direction === 0) {
      if (numberOfGuests > 1) {
        setValue("numberOfGuests", numberOfGuests - 1, {
          shouldValidate: true,
        });
      }
    } else {
      if (numberOfGuests < courtData.venueprice.max_guests) {
        setValue("numberOfGuests", numberOfGuests + 1, {
          shouldValidate: true,
        });
      }
    }
  } else if (movement === 1) {
    if (direction === 0) {
      if (additionalNumberOfGuests > 0) {
        setValue("additionalNumberOfGuests", additionalNumberOfGuests - 1, {
          shouldValidate: true,
        });
      }
    } else {
      if (additionalNumberOfGuests < courtData.venueprice.additional_guests) {
        setValue("additionalNumberOfGuests", additionalNumberOfGuests + 1, {
          shouldValidate: true,
        });
      }
    }
  }
};
