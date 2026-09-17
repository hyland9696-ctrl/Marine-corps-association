/**
 * "The Scuttlebutt" — Detachment 725 monthly newsletter email template.
 * Table-based + inline styles so it renders in Gmail/Outlook/Apple Mail.
 * {{NAME}} / {{UNSUBSCRIBE}} are filled per-recipient by the Apps Script
 * send engine (see /newsletter/Code.gs).
 *
 * Modeled on the detachment's printed Scuttlebutt: editor's column, upcoming
 * events, meeting reminders, officer roster, and membership/dues — redesigned
 * to look sharp in the inbox.
 */

export type EventItem = { date: string; text: string };

export type NewsletterContent = {
  issue: string; // e.g. "September 2026"
  preheader: string;
  editorTitle: string;
  editorColumn: string;
  editorName: string;
  events: EventItem[];
  nextDetachmentMeeting: string;
  nextStaffMeeting: string;
  goodOfLeague: string;
};

/** Recurring detachment info (rarely changes — edit here once). */
export const detachmentInfo = {
  officers: [
    { role: "Commandant", name: "Matt White", contact: "636-545-4822" },
    { role: "Sr Vice Commandant", name: "Kirgan Taylor", contact: "" },
    { role: "Jr Vice Commandant", name: "Stel Steller", contact: "" },
    { role: "Adjutant", name: "Andy Riggle", contact: "314-313-8842" },
    { role: "Paymaster", name: "Mark Hoernschemeyer", contact: "314-482-3974" },
    { role: "Chaplain", name: "Gene Vaucher", contact: "314-724-4811" },
    { role: "Judge Advocate", name: "Janice Hartley", contact: "314-799-4568" },
    { role: "Sgt at Arms", name: "Dave Thomas", contact: "636-248-5290" },
    { role: "Auditor / Editor", name: "Ray Hinman", contact: "636-233-1215" },
    { role: "Auditor", name: "Marilyn Kitchen-New", contact: "" },
  ],
  detachmentMeeting: "1900, 3rd Thursday monthly · Elks Lodge, 1163 Tom Ginnever Ave, O'Fallon, MO",
  staffMeeting: "1900, 2nd Monday monthly · AmVets Hall, 360 Brown Rd, St. Peters, MO",
  duesRows: [
    ["0–35", "$1,000"],
    ["36–50", "$800"],
    ["51–64", "$600"],
    ["65–84", "$400"],
    ["85 & over", "$100"],
  ],
  links: [
    ["National MCL", "www.mclnational.org"],
    ["Dept. of Missouri", "www.momcl.org"],
    ["Detachment 725", "www.stcharlesmarine.com"],
  ],
};

const NAVY = "#0a1220";
const GOLD = "#c9a349";
const SCARLET = "#8a1538";
const CREAM = "#f6f3ea";
const INK = "#1f2733";
const MUTED = "#5b6675";

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function paras(s: string, color = INK, size = 15): string {
  return esc(s.trim())
    .split(/\n{2,}/)
    .map(
      (b) =>
        `<p style="margin:0 0 14px;font-size:${size}px;line-height:1.65;color:${color};">${b.replace(/\n/g, "<br>")}</p>`
    )
    .join("");
}
function sectionHeader(label: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="border-bottom:2px solid ${GOLD};padding-bottom:6px;">
      <span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;color:${SCARLET};">${esc(label)}</span>
    </td></tr></table>`;
}

export function buildNewsletterHtml(c: NewsletterContent): string {
  const events = c.events
    .filter((e) => e.date.trim() || e.text.trim())
    .map(
      (e) => `<tr>
        <td width="72" style="vertical-align:top;padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:14px;color:${SCARLET};white-space:nowrap;">${esc(e.date)}</td>
        <td style="vertical-align:top;padding:6px 0 6px 12px;font-size:15px;line-height:1.5;color:${INK};">${esc(e.text)}</td>
      </tr>`
    )
    .join("");

  const officers = detachmentInfo.officers
    .map(
      (o) => `<tr>
        <td style="padding:5px 0;font-size:13px;color:${MUTED};width:40%;">${esc(o.role)}</td>
        <td style="padding:5px 0;font-size:13px;color:${INK};font-weight:bold;">${esc(o.name)}${o.contact ? `<span style="font-weight:normal;color:${MUTED};"> · ${esc(o.contact)}</span>` : ""}</td>
      </tr>`
    )
    .join("");

  const dues = detachmentInfo.duesRows
    .map(
      ([age, fee]) =>
        `<td style="padding:8px 4px;text-align:center;border:1px solid #e6e1d5;font-family:Arial,Helvetica,sans-serif;">
          <div style="font-size:11px;color:${MUTED};">${esc(age)}</div>
          <div style="font-size:15px;font-weight:bold;color:${NAVY};">${esc(fee)}</div>
        </td>`
    )
    .join("");

  const links = detachmentInfo.links
    .map(([l, u]) => `${esc(l)}: <span style="color:${GOLD};">${esc(u)}</span>`)
    .join("&nbsp;&nbsp;·&nbsp;&nbsp;");

  const goodBlock = c.goodOfLeague.trim()
    ? `<tr><td style="padding:20px 28px 0;">${sectionHeader("Good of the League")}<div style="padding-top:12px;">${paras(c.goodOfLeague)}</div></td></tr>`
    : "";

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Scuttlebutt</title></head>
<body style="margin:0;padding:0;background:${CREAM};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(c.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid #e6e1d5;border-radius:6px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">

        <!-- Masthead -->
        <tr><td style="background:${NAVY};padding:26px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;width:64px;">
              <div style="width:58px;height:58px;border:3px solid ${GOLD};border-radius:50%;text-align:center;line-height:54px;color:${GOLD};font-size:22px;font-weight:bold;">725</div>
            </td>
            <td style="vertical-align:middle;padding-left:14px;">
              <div style="color:${CREAM};font-size:30px;font-weight:bold;letter-spacing:.06em;line-height:1;">THE SCUTTLEBUTT</div>
              <div style="color:${GOLD};font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-top:5px;">St. Charles County Detachment 725 · Devil Dog Pound 8</div>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="height:4px;background:${SCARLET};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="background:#0e1a30;padding:8px 28px;text-align:right;">
          <span style="color:${CREAM};opacity:.75;font-size:12px;letter-spacing:.12em;text-transform:uppercase;">${esc(c.issue)}</span>
        </td></tr>

        <!-- Editor's column -->
        <tr><td style="padding:26px 28px 6px;">
          ${sectionHeader(c.editorTitle || "Thoughts from the Editor")}
          <div style="padding-top:14px;">
            <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:${INK};">${esc("Marines, family, and friends,")}</p>
            ${paras(c.editorColumn, INK, 15)}
            <p style="margin:14px 0 0;font-size:15px;font-weight:bold;color:${NAVY};">${esc(c.editorName)}</p>
          </div>
        </td></tr>

        <!-- Upcoming Events -->
        ${events ? `<tr><td style="padding:20px 28px 0;">${sectionHeader("Upcoming Events")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">${events}</table>
        </td></tr>` : ""}

        <!-- Meetings -->
        <tr><td style="padding:22px 28px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NAVY};border-radius:4px;"><tr><td style="padding:18px 22px;">
            <div style="font-size:11px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;color:${GOLD};margin-bottom:8px;">Meetings</div>
            <div style="font-size:14px;color:${CREAM};line-height:1.5;"><strong>Detachment:</strong> ${esc(detachmentInfo.detachmentMeeting)}${c.nextDetachmentMeeting ? ` <span style="color:#c9d3e0;">(next: ${esc(c.nextDetachmentMeeting)})</span>` : ""}</div>
            <div style="font-size:14px;color:${CREAM};line-height:1.5;margin-top:6px;"><strong>Staff:</strong> ${esc(detachmentInfo.staffMeeting)}${c.nextStaffMeeting ? ` <span style="color:#c9d3e0;">(next: ${esc(c.nextStaffMeeting)})</span>` : ""}</div>
          </td></tr></table>
        </td></tr>

        ${goodBlock}

        <!-- Officer roster -->
        <tr><td style="padding:22px 28px 0;">
          ${sectionHeader("Detachment Officers")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">${officers}</table>
        </td></tr>

        <!-- Membership & dues -->
        <tr><td style="padding:22px 28px 0;">
          ${sectionHeader("Membership & Dues")}
          <p style="margin:12px 0 10px;font-size:14px;line-height:1.6;color:${INK};">Life membership (one-time fee) by age. To upgrade, contact Paymaster Mark Hoernschemeyer (314-482-3974). Annual dues can be paid by PayPal at stcharlesmarine.org or at a meeting.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${dues}</tr></table>
        </td></tr>

        <!-- Links -->
        <tr><td style="padding:20px 28px 24px;">
          <div style="font-size:12px;color:${MUTED};text-align:center;line-height:1.8;">${links}</div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:${NAVY};padding:20px 28px;text-align:center;">
          <div style="color:${CREAM};font-size:12px;line-height:1.6;opacity:.85;">St. Charles County Detachment 725, Marine Corps League<br>P.O. Box 1362, St. Peters, MO 63376-0023</div>
          <div style="margin-top:10px;font-size:12px;"><a href="{{UNSUBSCRIBE}}" style="color:${GOLD};text-decoration:underline;">Unsubscribe</a></div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

export const newsletterDefaults: NewsletterContent = {
  issue: "September 2026",
  preheader: "The Scuttlebutt — upcoming events, meetings, and news from Detachment 725.",
  editorTitle: "Thoughts from the Editor",
  editorColumn:
    "Once a Marine, always a Marine? Just because you have a DD-214 doesn't mean you've left the Marines — or more important, that the Marines have left you. Like most Marines you still have that Marine Corps t-shirt or ball cap, and your chest swells every time someone says \"Thank you for your service, Devil Dog.\" Continue the mission.\n\nI'm looking forward to seeing you at our meetings — and if life keeps you away, throw on your cover and meet us at one of our upcoming events. Thank you for your service, Devil Dog!",
  editorName: "Ray Hinman, Editor",
  events: [
    { date: "Sep 26", text: "Barbecue sale at Valente's" },
    { date: "Oct 10", text: "Hamburgers & hot dog sale — twilight market, Old Town St. Peters" },
    { date: "Oct 17", text: "Family night at the Elks — hot dogs & s'mores over the fire" },
  ],
  nextDetachmentMeeting: "Oct 15, 2026",
  nextStaffMeeting: "Oct 12, 2026",
  goodOfLeague: "50/50 drawing and a one-year free membership up for grabs at the next meeting.",
};
