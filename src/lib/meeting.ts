// The detachment meets the third Thursday of each month at 7:00 PM local time.
// Shared by the add-to-calendar buttons and the home-page countdown.

export const MEETING_RRULE = "FREQ=MONTHLY;BYDAY=3TH";

function thirdThursday(year: number, month: number): Date {
  const d = new Date(year, month, 1, 19, 0, 0, 0);
  // First Thursday (Thu = day 4), then add two weeks for the third.
  d.setDate(1 + ((4 - d.getDay() + 7) % 7) + 14);
  return d;
}

/** Next upcoming meeting start, in the browser's local time. */
export function nextMeeting(now: Date = new Date()): Date {
  let d = thirdThursday(now.getFullYear(), now.getMonth());
  if (d.getTime() < now.getTime()) d = thirdThursday(now.getFullYear(), now.getMonth() + 1);
  return d;
}
