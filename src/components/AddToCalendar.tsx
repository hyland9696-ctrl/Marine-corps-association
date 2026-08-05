"use client";

/**
 * Add-to-calendar buttons for the detachment's recurring monthly meeting
 * (first Wednesday, 7:00 PM). Values are computed fresh on click so the links
 * always start from the next upcoming meeting, and the .ics carries a monthly
 * recurrence rule so the whole series lands on the member's calendar.
 */

const RRULE = "FREQ=MONTHLY;BYDAY=1WE";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Next first-Wednesday of the month at 7:00 PM local time.
function nextMeeting(): Date {
  const now = new Date();
  const firstWed = (year: number, month: number) => {
    const d = new Date(year, month, 1, 19, 0, 0, 0);
    d.setDate(1 + ((3 - d.getDay() + 7) % 7));
    return d;
  };
  let d = firstWed(now.getFullYear(), now.getMonth());
  if (d.getTime() < now.getTime()) d = firstWed(now.getFullYear(), now.getMonth() + 1);
  return d;
}

// Floating local time, e.g. 20260107T190000
function fmtLocal(d: Date) {
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}00`
  );
}

// UTC stamp for DTSTAMP, e.g. 20260101T120000Z
function fmtUtc(d: Date) {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

export default function AddToCalendar({
  title,
  description,
  location,
}: {
  title: string;
  description: string;
  location: string;
}) {
  function details() {
    const start = nextMeeting();
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    return { start, end };
  }

  function openGoogle() {
    const { start, end } = details();
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${fmtLocal(start)}/${fmtLocal(end)}`,
      details: description,
      location,
      recur: `RRULE:${RRULE}`,
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener");
  }

  function downloadIcs() {
    const { start, end } = details();
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Detachment 725//Meetings//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:monthly-meeting-${fmtLocal(start)}@stcharlesmarines.org`,
      `DTSTAMP:${fmtUtc(new Date())}`,
      `DTSTART:${fmtLocal(start)}`,
      `DTEND:${fmtLocal(end)}`,
      `RRULE:${RRULE}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "detachment-725-meeting.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const btn =
    "inline-flex items-center gap-2 rounded-sm border-2 border-navy px-4 py-2 font-display text-sm font-semibold tracking-wide uppercase text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-cream";

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" onClick={openGoogle} className={btn}>
        <span aria-hidden="true">📅</span> Google Calendar
      </button>
      <button type="button" onClick={downloadIcs} className={btn}>
        <span aria-hidden="true">📅</span> Apple / Outlook (.ics)
      </button>
    </div>
  );
}
