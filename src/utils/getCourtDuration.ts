export const getCourtDuration = (data: string[][] | undefined) => {
  if (!data) return null; // Handle undefined data

  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, etc.

  // Filter for today's day index
  const todayData = data.find((slot: string[]) => {
    const dayIndex = parseInt(slot[0], 10); // Convert the day string to a number
    return dayIndex === dayOfWeek; // Check if it matches today's day
  });

  // If we find today's data, return start and end time, otherwise return null
  if (todayData) {
    const today = todayData[0];
    const duration = todayData[1];
    const startTime = todayData[2]; // Start time
    const endTime = todayData[3]; // End time
    return { start_time: startTime, end_time: endTime, duration, today };
  }

  return null; // If no data found for today
};
