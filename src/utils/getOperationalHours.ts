import { formatTime } from "./formatTime";

export const getTimeSlotDuration = (
  day: string,
  courtData: CourtDataType | undefined
): string | undefined => {
  if (!courtData) return;

  const timeSlot = courtData.time_Slots.find(
    (slot) => slot.day_of_week === day
  );

  if (timeSlot) {
    return `${formatTime(timeSlot.start_time)} - ${formatTime(timeSlot.end_time)}`;
  }

  return "No slots available for today"; // Return undefined if no match found
};
