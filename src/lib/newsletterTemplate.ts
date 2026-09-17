/**
 * "The Scuttlebutt" — Detachment 725 monthly newsletter email template.
 * Table-based + inline styles so it renders in Gmail/Outlook/Apple Mail.
 * {{NAME}} / {{UNSUBSCRIBE}} / {{PHOTOS}} are filled by the Apps Script send
 * engine (see /newsletter/Code.gs).
 *
 * Modeled on the detachment's printed Scuttlebutt: editor's column, upcoming
 * events, meeting reminders, officer roster, and membership/dues — with a
 * newspaper-nameplate masthead and patriotic detailing.
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
  social: {
    facebook: "https://www.facebook.com/StCharlesMarines/",
    youtube: "https://www.youtube.com/@stcharlescountymomarinesmc1466",
  },
};

const NAVY = "#0a1220";
const NAVY2 = "#12203a";
const GOLD = "#c9a349";
const GOLD_LT = "#e0c37a";
const SCARLET = "#8a1538";
const CREAM = "#f6f3ea";
const INK = "#1f2733";
const MUTED = "#5b6675";
const STRIPE = "#f6f3ec";
const HAIR = "#e4ddcb";
const STAR = "&#9733;";

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function paras(s: string, color = INK, size = 15): string {
  return esc(s.trim())
    .split(/\n{2,}/)
    .map(
      (b) =>
        `<p style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:${size}px;line-height:1.7;color:${color};">${b.replace(/\n/g, "<br>")}</p>`
    )
    .join("");
}
export function sectionHeader(label: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="border-bottom:2px solid ${GOLD};padding-bottom:7px;">
      <span style="color:${SCARLET};font-size:11px;">${STAR}</span>
      <span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;letter-spacing:.18em;text-transform:uppercase;color:${NAVY};padding-left:7px;">${esc(label)}</span>
    </td></tr></table>`;
}
function starsDivider(): string {
  return `<tr><td style="padding:20px 28px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="border-bottom:1px solid ${HAIR};font-size:0;line-height:0;">&nbsp;</td>
      <td style="padding:0 14px;white-space:nowrap;color:${GOLD};font-size:11px;letter-spacing:5px;">${STAR} ${STAR} ${STAR}</td>
      <td style="border-bottom:1px solid ${HAIR};font-size:0;line-height:0;">&nbsp;</td>
    </tr></table>
  </td></tr>`;
}

/**
 * "Recent Events" photo grid. Takes image srcs (data: URLs in the composer
 * preview, or cid: refs when the Apps Script embeds them at send time), two-up
 * with a gold frame. The Apps Script mirrors this markup — keep in sync.
 */
export function photosSectionHtml(srcs: string[]): string {
  if (!srcs.length) return "";
  let cells = "";
  for (let i = 0; i < srcs.length; i += 2) {
    const pair = srcs.slice(i, i + 2);
    const tds = pair
      .map(
        (s) =>
          `<td width="50%" style="padding:5px;vertical-align:top;"><img src="${s}" width="262" style="width:100%;max-width:262px;border-radius:4px;display:block;border:3px solid #ffffff;outline:1px solid ${GOLD};" alt="Detachment 725 event photo"></td>`
      )
      .join("");
    const filler = pair.length === 1 ? `<td width="50%" style="padding:5px;">&nbsp;</td>` : "";
    cells += `<tr>${tds}${filler}</tr>`;
  }
  return `<tr><td style="padding:22px 28px 0;">
      ${sectionHeader("Recent Events")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">${cells}</table>
    </td></tr>`;
}

export function buildNewsletterHtml(c: NewsletterContent): string {
  const events = c.events
    .filter((e) => e.date.trim() || e.text.trim())
    .map(
      (e) => `<tr>
        <td width="80" valign="top" style="padding:7px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td bgcolor="${SCARLET}" style="background:${SCARLET};border-radius:3px;padding:4px 10px;">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:${CREAM};white-space:nowrap;">${esc(e.date)}</span>
            </td>
          </tr></table>
        </td>
        <td valign="top" style="padding:7px 0 7px 14px;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55;color:${INK};">${esc(e.text)}</td>
      </tr>`
    )
    .join("");

  const officers = detachmentInfo.officers
    .map(
      (o, i) => `<tr bgcolor="${i % 2 ? STRIPE : "#ffffff"}">
        <td style="padding:8px 14px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:${MUTED};">${esc(o.role)}</td>
        <td style="padding:8px 14px;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${NAVY};font-weight:bold;text-align:right;">${esc(o.name)}</td>
      </tr>`
    )
    .join("");

  const dues = detachmentInfo.duesRows
    .map(
      ([age, fee], i) =>
        `<td width="20%" style="padding:12px 4px;text-align:center;border-top:1px solid ${HAIR};${i ? `border-left:1px solid ${HAIR};` : ""}">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${MUTED};">${esc(age)}</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:bold;color:${NAVY};margin-top:2px;">${esc(fee)}</div>
        </td>`
    )
    .join("");

  const links = detachmentInfo.links
    .map(([l, u]) => `${esc(l)}: <span style="color:${GOLD};">${esc(u)}</span>`)
    .join("&nbsp;&nbsp;&middot;&nbsp;&nbsp;");

  const goodBlock = c.goodOfLeague.trim()
    ? `<tr><td style="padding:22px 28px 0;">
        ${sectionHeader("Good of the League")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#faf6ea" style="background:#faf6ea;border:1px solid #ecdfbf;border-radius:4px;margin-top:12px;">
          <tr><td style="padding:14px 18px;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:${INK};">${esc(c.goodOfLeague).replace(/\n/g, "<br>")}</td></tr>
        </table>
      </td></tr>`
    : "";

  const socialBtn = (href: string, label: string) =>
    `<a href="${href}" style="display:inline-block;border:1px solid ${GOLD};border-radius:4px;padding:7px 18px;margin:0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:${GOLD};text-decoration:none;">${label}</a>`;

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>The Scuttlebutt</title></head>
<body style="margin:0;padding:0;background:#ece4d6;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(c.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ece4d6" style="background:#ece4d6;padding:24px 0;">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid ${HAIR};border-radius:8px;overflow:hidden;">

        <!-- Top patriotic ribbon -->
        <tr><td style="padding:0;font-size:0;line-height:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="50%" height="6" bgcolor="${GOLD}" style="height:6px;font-size:0;line-height:0;">&nbsp;</td>
            <td width="50%" height="6" bgcolor="${SCARLET}" style="height:6px;font-size:0;line-height:0;">&nbsp;</td>
          </tr></table>
        </td></tr>

        <!-- Masthead -->
        <tr><td bgcolor="${NAVY}" style="background:${NAVY};padding:26px 28px 22px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="72" valign="middle">
              <div style="width:62px;height:62px;border:3px solid ${GOLD};border-radius:50%;text-align:center;line-height:58px;color:${GOLD};font-family:Georgia,'Times New Roman',serif;font-size:23px;font-weight:bold;">725</div>
            </td>
            <td valign="middle" style="padding-left:16px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:36px;font-weight:bold;color:${CREAM};letter-spacing:1px;line-height:1;">The Scuttlebutt</div>
              <div style="border-top:1px solid ${GOLD};border-bottom:1px solid ${GOLD};height:3px;margin:9px 0 7px;font-size:0;line-height:0;">&nbsp;</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${GOLD_LT};">St. Charles County Detachment 725 &middot; Devil Dog Pound 8</div>
            </td>
          </tr></table>
        </td></tr>

        <!-- Issue bar -->
        <tr><td bgcolor="${NAVY2}" style="background:${NAVY2};padding:11px 20px;text-align:center;">
          <span style="color:${GOLD};font-size:11px;letter-spacing:4px;">${STAR} ${STAR}</span>
          <span style="display:inline-block;background:${SCARLET};color:${CREAM};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;padding:5px 16px;border-radius:3px;margin:0 10px;">${esc(c.issue)}</span>
          <span style="color:${GOLD};font-size:11px;letter-spacing:4px;">${STAR} ${STAR}</span>
        </td></tr>

        <!-- Editor's column -->
        <tr><td style="padding:26px 28px 6px;">
          ${sectionHeader(c.editorTitle || "Thoughts from the Editor")}
          <div style="padding-top:15px;">
            <p style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:${INK};">Marines, family, and friends,</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
              <td width="3" bgcolor="${GOLD}" style="width:3px;font-size:0;line-height:0;background:${GOLD};">&nbsp;</td>
              <td style="padding-left:16px;">${paras(c.editorColumn, INK, 15)}</td>
            </tr></table>
            <div style="margin-top:14px;border-top:1px solid ${HAIR};padding-top:10px;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:17px;font-weight:bold;color:${NAVY};">${esc(c.editorName)}</span>
            </div>
          </div>
        </td></tr>

        ${events ? `${starsDivider()}<tr><td style="padding:20px 28px 0;">${sectionHeader("Upcoming Events")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">${events}</table>
        </td></tr>` : ""}

        <!-- Meetings -->
        <tr><td style="padding:22px 28px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${NAVY}" style="background:${NAVY};border-radius:4px;"><tr>
            <td width="4" bgcolor="${GOLD}" style="width:4px;font-size:0;line-height:0;background:${GOLD};">&nbsp;</td>
            <td style="padding:18px 22px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:.18em;text-transform:uppercase;color:${GOLD};margin-bottom:9px;">${STAR} Meetings</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${CREAM};line-height:1.5;"><strong style="color:${GOLD_LT};">Detachment:</strong> ${esc(detachmentInfo.detachmentMeeting)}${c.nextDetachmentMeeting ? ` <span style="color:#aebbcd;">(next: ${esc(c.nextDetachmentMeeting)})</span>` : ""}</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${CREAM};line-height:1.5;margin-top:7px;"><strong style="color:${GOLD_LT};">Staff:</strong> ${esc(detachmentInfo.staffMeeting)}${c.nextStaffMeeting ? ` <span style="color:#aebbcd;">(next: ${esc(c.nextStaffMeeting)})</span>` : ""}</div>
            </td>
          </tr></table>
        </td></tr>

        ${goodBlock}
        ${starsDivider()}

        <!-- Officers -->
        <tr><td style="padding:20px 28px 0;">
          ${sectionHeader("Detachment Officers")}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;border:1px solid ${HAIR};border-radius:4px;overflow:hidden;">${officers}</table>
        </td></tr>

        <!-- Membership & dues -->
        <tr><td style="padding:22px 28px 0;">
          ${sectionHeader("Membership & Dues")}
          <p style="margin:12px 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.6;color:${INK};">To upgrade to a life membership, contact Paymaster Mark Hoernschemeyer (314-482-3974). Annual dues can be paid by PayPal at stcharlesmarine.org or at a meeting.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${HAIR};border-radius:4px;overflow:hidden;">
            <tr><td colspan="5" bgcolor="${GOLD}" style="background:${GOLD};padding:7px 10px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:.14em;text-transform:uppercase;color:${NAVY};">Life Membership &mdash; One-Time Fee</td></tr>
            <tr>${dues}</tr>
          </table>
        </td></tr>

        <!-- Recent event photos (injected at send time from the Drive folder) -->
        {{PHOTOS}}

        ${starsDivider()}

        <!-- Links -->
        <tr><td style="padding:18px 28px 26px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${MUTED};text-align:center;line-height:1.9;">${links}</div>
        </td></tr>

        <!-- Footer -->
        <tr><td bgcolor="${NAVY}" style="background:${NAVY};padding:26px 28px;text-align:center;">
          <div style="width:44px;height:44px;border:2px solid ${GOLD};border-radius:50%;line-height:40px;color:${GOLD};font-family:Georgia,'Times New Roman',serif;font-size:16px;font-weight:bold;margin:0 auto;">725</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:19px;color:${GOLD};margin-top:10px;">Semper Fidelis</div>
          <div style="font-family:Arial,Helvetica,sans-serif;color:${CREAM};font-size:12px;line-height:1.6;opacity:.85;margin-top:8px;">St. Charles County Detachment 725, Marine Corps League<br>P.O. Box 1362, St. Peters, MO 63376-0023</div>
          <div style="margin-top:16px;">${socialBtn(detachmentInfo.social.facebook, "Facebook")}${socialBtn(detachmentInfo.social.youtube, "YouTube")}</div>
          <div style="margin-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8b97a8;">
            <a href="{{UNSUBSCRIBE}}" style="color:${GOLD};text-decoration:underline;">Unsubscribe</a>
          </div>
        </td></tr>

        <!-- Bottom ribbon -->
        <tr><td style="padding:0;font-size:0;line-height:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="50%" height="6" bgcolor="${SCARLET}" style="height:6px;font-size:0;line-height:0;">&nbsp;</td>
            <td width="50%" height="6" bgcolor="${GOLD}" style="height:6px;font-size:0;line-height:0;">&nbsp;</td>
          </tr></table>
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
