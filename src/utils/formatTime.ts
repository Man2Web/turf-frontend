export const formatTime = (time: any) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert to 12-hour format
  return `${formattedHours && formattedHours}:${minutes?.toString()?.padStart(2, "0")} ${period && period}`;
};
