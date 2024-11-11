export const updateGuestCount = (
  movement: number,
  direction: number,
  numberOfGuests: number,
  additionalNumberOfGuests: number,
  courtData: CourtsData,
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
      if (
        numberOfGuests <
        Number(
          Number(courtData.pricing.guests) +
            Number(courtData.pricing.additional_guests)
        )
      ) {
        if (numberOfGuests < Number(courtData.pricing.guests)) {
          setValue("numberOfGuests", numberOfGuests + 1, {
            shouldValidate: true,
          });
        } else {
          setValue(
            "additionalNumberOfGuests",
            Number(numberOfGuests + Number(courtData.pricing.guests)) - 1,
            {
              shouldValidate: true,
            }
          );
        }
      }
    }
  } else if (movement === 1) {
    if (direction === 0) {
      if (additionalNumberOfGuests > 0) {
        setValue(
          "additionalNumberOfGuests",
          Number(additionalNumberOfGuests) - 1,
          {
            shouldValidate: true,
          }
        );
      }
    } else {
      if (
        Number(additionalNumberOfGuests) <
        Number(courtData.pricing.additional_guests)
      ) {
        setValue(
          "additionalNumberOfGuests",
          Number(additionalNumberOfGuests) + 1,
          {
            shouldValidate: true,
          }
        );
      }
    }
  }
};
