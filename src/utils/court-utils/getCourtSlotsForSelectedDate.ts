export const getCourtSlotsForSelectedDate = (
  data: string[][] | undefined,
  selectedDate: Date
) => {
  if (!data) return null; // Handle undefined data

  const dayOfWeek = selectedDate.getDay(); // Get day index from the selected date (0 for Sunday, 1 for Monday, etc.)

  // Find the data for the selected day index
  const dayData = data.find((slot: string[]) => {
    const dayIndex = parseInt(slot[0], 10); // Convert the first element to number (day index)
    return dayIndex === dayOfWeek; // Check if it matches the selected day's index
  });

  // If data for the selected day is found, return the corresponding slots
  if (dayData) {
    const day = dayData[0]; // Day of the week (e.g., 0 for Sunday)
    const duration = dayData[1]; // Duration between slots (in hours)
    const startTime = dayData[2]; // Start time for slots
    const endTime = dayData[3]; // End time for slots

    return { start_time: startTime, end_time: endTime, duration, day };
  }

  return null; // Return null if no data found for the selected day
};
