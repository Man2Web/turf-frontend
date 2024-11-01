interface Coupon {
  id: string; // Assuming id is a string
  court_id: string; // Assuming court_id is a string (UUID or similar)
  coupon_code: string; // The code for the coupon
  coupon_label: string; // Description of the coupon
  coupon_type: boolean;
  min_amount: string;
  created_at: Date; // Date when the coupon was created
  percentage: string; // Percentage discount as a string
  amount: string; // Amount as a string
  start_time: Date; // Start time of the coupon
  end_time: Date; // End time of the coupon
  admin_id: string; // Assuming admin_id is a string
  court_info: CourtInfo; // Nested object for court information
}
