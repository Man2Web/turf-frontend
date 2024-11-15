export const getCourtDuration = (
  data: string[][] | undefined,
  selectedDate?: Date
) => {
  if (!data) return null; // Handle undefined data

  // Use selectedDate if provided, otherwise fallback to today's date
  const date = selectedDate || new Date();
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, etc.

  // Filter for the selected day's index
  const selectedDayData = data.find((slot: string[]) => {
    const dayIndex = parseInt(slot[0], 10); // Convert the day string to a number
    return dayIndex === dayOfWeek; // Check if it matches the selected day
  });

  // If we find data for the selected day, return start and end time, otherwise return null
  if (selectedDayData) {
    const day = selectedDayData[0];
    const duration = selectedDayData[1];
    const startTime = selectedDayData[2]; // Start time
    const endTime = selectedDayData[3]; // End time
    return { start_time: startTime, end_time: endTime, duration, day };
  }

  return null; // If no data found for the selected day
};
