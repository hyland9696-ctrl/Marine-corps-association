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

Everything happens on the website's private **HQ page → Newsletter Composer**:

1. The issue name and next-meeting dates are already filled in. Write the
   editor column, add this month's events, paste in the "Good of the League."
2. Drop up to 8 event photos into the photo box. They are resized in the
   browser and embedded in the email.
3. Enter the **send secret** (one time per browser; see setup step 3 below).
4. **Send test to me.** Check your inbox.
5. **Send to all subscribers.** Confirm the count. Done. The send is recorded
   on the sheet's **Sent Log** tab and the draft is cleared.

Your draft autosaves in the browser as you type, so you can come back to it.
The old copy-and-paste route still works under "Manual fallback."

### Setup step 3: the send secret
In the Google Sheet: **📣 Newsletter → 2. Set send secret**. Type a long
passphrase. Then on the HQ page, enter the same passphrase once in the
"Send secret" box. Nobody can trigger a send without it, even if they find
the HQ page.

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
- **Text messages (SMS)** are a separate paid add-on (Twilio); say the word
  when you're ready.
