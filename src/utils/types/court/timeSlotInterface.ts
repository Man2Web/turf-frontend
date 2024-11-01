interface TimeSlotInterface {
  time: string; // The time slot in a string format
  isChecked: boolean; // Whether the time slot is selected or not
  isActive: boolean; // Whether the time slot is available/active
  isBooked?: boolean; // Optional - Whether the time slot is already booked
}
