/**
 * Branded HTML email template for the Detachment 725 newsletter.
 * Table-based + inline styles so it renders in Gmail/Outlook/Apple Mail.
 * Placeholders {{NAME}} and {{UNSUBSCRIBE}} are filled per-recipient by the
 * Google Apps Script send engine (see /newsletter/Code.gs).
 */

export type Highlight = { title: string; body: string };

export type NewsletterContent = {
  preheader: string;
  greeting: string;
  intro: string;
  highlights: Highlight[];
  eventTitle: string;
  eventDetails: string;
  closing: string;
  signoff: string;
};

const NAVY = "#0a1220";
const GOLD = "#c9a349";
const SCARLET = "#8a1538";
const CREAM = "#f6f3ea";
const INK = "#1f2733";
const MUTED = "#5b6675";

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function para(s: string): string {
  // Escape, then turn blank lines into paragraph breaks and newlines into <br>.
  return esc(s.trim())
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${INK};">${block.replace(/\n/g, "<br>")}</p>`
    )
    .join("");
}

export function buildNewsletterHtml(c: NewsletterContent): string {
  const highlights = c.highlights
    .filter((h) => h.title.trim() || h.body.trim())
    .map(
      (h) => `
        <tr>
          <td style="padding:0 0 20px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;letter-spacing:.02em;text-transform:uppercase;color:${NAVY};margin:0 0 6px;">${esc(h.title)}</div>
            <div style="font-size:15px;line-height:1.6;color:${INK};">${esc(h.body).replace(/\n/g, "<br>")}</div>
          </td>
        </tr>`
    )
    .join("");

  const eventBlock =
    c.eventTitle.trim() || c.eventDetails.trim()
      ? `
      <tr>
        <td style="padding:8px 0 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NAVY};border-radius:4px;">
            <tr>
              <td style="padding:20px 24px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.18em;text-transform:uppercase;color:${GOLD};margin:0 0 6px;">Mark Your Calendar</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:${CREAM};margin:0 0 4px;">${esc(c.eventTitle)}</div>
                <div style="font-size:14px;line-height:1.5;color:#c9d3e0;">${esc(c.eventDetails).replace(/\n/g, "<br>")}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : "";

  return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Detachment 725</title></head>
<body style="margin:0;padding:0;background:${CREAM};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(c.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid #e6e1d5;border-radius:6px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
          <!-- Header -->
          <tr>
            <td style="background:${NAVY};padding:24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="vertical-align:middle;">
                  <div style="width:52px;height:52px;border:3px solid ${GOLD};border-radius:50%;text-align:center;line-height:48px;color:${GOLD};font-size:20px;font-weight:bold;">725</div>
                </td>
                <td style="vertical-align:middle;padding-left:14px;">
                  <div style="color:${CREAM};font-size:17px;font-weight:bold;letter-spacing:.03em;text-transform:uppercase;line-height:1.2;">St. Charles County<br>Detachment 725</div>
                  <div style="color:${GOLD};font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-top:3px;">Marine Corps League</div>
                </td>
              </tr></table>
            </td>
          </tr>
          <tr><td style="height:4px;background:${SCARLET};font-size:0;line-height:0;">&nbsp;</td></tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 28px 8px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${INK};">${esc(c.greeting)},</p>
              ${para(c.intro)}
            </td>
          </tr>
          ${highlights ? `<tr><td style="padding:8px 28px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${highlights}</table></td></tr>` : ""}
          ${eventBlock ? `<tr><td style="padding:0 28px;">${eventBlock}</td></tr>` : ""}
          <tr>
            <td style="padding:4px 28px 24px;">
              ${para(c.closing)}
              <p style="margin:16px 0 0;font-size:16px;line-height:1.6;color:${NAVY};font-weight:bold;">${esc(c.signoff)}</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${NAVY};padding:20px 28px;text-align:center;">
              <div style="color:${CREAM};font-size:12px;line-height:1.6;opacity:.85;">
                St. Charles County Detachment 725, Marine Corps League<br>
                P.O. Box 1362, St. Peters, MO 63376-0023
              </div>
              <div style="margin-top:10px;font-size:12px;color:${GOLD};">
                <a href="{{UNSUBSCRIBE}}" style="color:${GOLD};text-decoration:underline;">Unsubscribe</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const newsletterDefaults: NewsletterContent = {
  preheader: "The latest from Detachment 725 — meetings, events, and ways to serve.",
  greeting: "Marines, family, and friends of Detachment 725",
  intro:
    "Thank you for standing with us. Here's what's happening in the detachment this month — upcoming meetings, community events, and ways to get involved.",
  highlights: [
    { title: "Next Monthly Meeting", body: "First Wednesday, 7:00 PM at the O'Fallon Elks Lodge. Guests and prospective members welcome." },
    { title: "Toys for Tots", body: "Our holiday collection is underway — details on how to donate toys or volunteer coming soon." },
  ],
  eventTitle: "Marine Corps Birthday Ball",
  eventDetails: "This November — honoring the founding of the Corps in 1775. Watch for ticket details.",
  closing: "As always, thank you for your service and support. Semper Fidelis.",
  signoff: "— St. Charles County Detachment 725",
};
