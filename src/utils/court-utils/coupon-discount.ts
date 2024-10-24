export const couponDiscount = (
  totalPrice: number,
  coupon: Coupon
): { totalPrice: number; discountedPrice: number } => {
  let discountedPrice = 0;
  if (coupon.coupon_type) {
    if (totalPrice >= Number(coupon.min_amount)) {
      // Subtract the fixed discount amount from the total price
      totalPrice = totalPrice - Number(coupon.amount);
      discountedPrice = Number(coupon.amount);
    }
  } else {
    if (totalPrice >= Number(coupon.min_amount)) {
      // Apply percentage-based discount
      const discountAmount = (totalPrice * Number(coupon.percentage)) / 100;
      const finalDiscount =
        discountAmount <= Number(coupon.amount)
          ? discountAmount
          : Number(coupon.amount);
      discountedPrice = finalDiscount;
      totalPrice = totalPrice - finalDiscount;
    }
  }
  // If no coupon is applied or conditions aren't met, return original totalPrice
  return { totalPrice, discountedPrice };
};
