# Detachment 725 Newsletter Engine — Setup

A free, self-owned email newsletter system. Subscribers live in a **Google
Sheet**, and the newsletter sends through **your Gmail** via a **Google Apps
Script**. No monthly fees, no third-party platform.

There are two one-time setups, then a simple monthly routine.

---

## One-time setup (about 10 minutes)

### 1. Create the Google Sheet + script
1. Go to <https://sheets.google.com> and create a **blank spreadsheet**. Name it
   something like *"Detachment 725 Newsletter."*
2. In the menu: **Extensions → Apps Script**.
3. Delete anything in the editor, then **paste the entire contents of
   `Code.gs`** (the file next to this one).
4. Click **Save** (💾).
5. In the function dropdown at the top, choose **`setup`** and click **Run**.
   Google will ask you to **authorize** — click through and **Allow** (it's
   your own account granting your own script access to your sheet + Gmail).
6. Back on the spreadsheet, reload the tab. You'll see three tabs at the
   bottom — **Subscribers**, **Compose**, **Sent Log** — and a new
   **📣 Newsletter** menu.

### 2. Publish the signup endpoint
1. In the Apps Script editor: **Deploy → New deployment**.
2. Click the gear ⚙ → **Web app**.
3. Set **Execute as: Me**, **Who has access: Anyone**. Click **Deploy** and
   **Authorize** if asked.
4. **Copy the Web app URL** (ends in `/exec`).
5. Send me that URL (or paste it into the site config `newsletterEndpoint`).
   Once it's in, the website's **"Get the Newsletter"** form starts adding
   people straight into your Subscribers tab.

> Re-deploying later: use **Deploy → Manage deployments → Edit → New version**
> so the URL stays the same.

---

## Sending a newsletter (monthly routine)

1. Open the site's **Marketing HQ → Newsletter Composer**. Fill in the
   subject, intro, and a few highlights. Watch the live preview.
2. (Optional) **Add event photos:** drop this month's pictures into your Google
   Drive **"Scuttlebutt Photos"** folder — the send engine embeds them in a
   "Recent Events" grid at the bottom of the newsletter automatically. (Menu:
   **📣 Newsletter → Open Photos Folder** for the link.) You can also drop them
   into the composer's photo box to preview the layout first.
3. Click **Copy subject** and **Copy email HTML**.
4. In your Google Sheet's **Compose** tab: paste the subject into **B1** and
   the HTML into **B2**.
5. Use the **📣 Newsletter** menu → **Send TEST to me** first. Check your inbox.
6. Happy? **📣 Newsletter → Send to ALL subscribers.** Confirm the count.

Every email automatically includes a working **unsubscribe** link, and each
send is recorded on the **Sent Log** tab. Photos are embedded directly in the
email (not linked), so they display even when a recipient's app blocks external
images.

---

## Good to know

- **Gmail daily limits.** A regular Gmail account can send roughly **100–500
  emails/day**; a Google Workspace account, up to ~1,500. If your list is
  larger, the script sends what it can and tells you to run it again the next
  day to finish. For a monthly newsletter to a normal-size list, one run is
  plenty.
- **Deliverability.** Because these go to people who opted in, they land fine.
  Avoid buying lists or emailing people who didn't sign up — that's what gets
  senders flagged (and it's against the law under CAN-SPAM).
- **Unsubscribes are automatic.** When someone clicks unsubscribe, their row is
  marked and they're skipped on future sends. Don't email them manually after.
- **Text messages (SMS)** are a separate paid add-on (Twilio) — ask me when
  you're ready and I'll wire it in.
