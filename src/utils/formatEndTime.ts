// Function to calculate and format the end time based on court duration to 12-hour format
export const formatEndTime = (startTime: string, duration: string) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const durationInMinutes = Number(duration) * 60;

  // Calculate total minutes for end time
  const totalMinutes = hours * 60 + minutes + durationInMinutes;

  // Calculate end hours and minutes
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;

  // Convert to 12-hour format
  const period = endHours >= 12 ? "PM" : "AM";
  const formattedEndHours = endHours % 12 === 0 ? 12 : endHours % 12; // Convert to 12-hour format

  return `${formattedEndHours}:${endMinutes.toString().padStart(2, "0")} ${period}`;
};
