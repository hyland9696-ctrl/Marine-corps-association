/**
 * Detachment 725 — Newsletter Engine (Google Apps Script)
 * ------------------------------------------------------------------
 * A free "build our own" email system that runs on your Google account:
 *   • Subscribers live in a Google Sheet you own.
 *   • The public website's signup form adds people to that sheet (doPost).
 *   • You compose the newsletter in the site's Marketing HQ, paste it here,
 *     and send it to everyone through your Gmail (sendNewsletter).
 *   • Every email includes a working one-click unsubscribe link (doGet).
 *
 * SETUP (one time) is in README.md next to this file. Short version:
 *   1. Create a blank Google Sheet.
 *   2. Extensions → Apps Script, paste this whole file, Save.
 *   3. Run `setup` once (authorize when asked).
 *   4. Deploy → New deployment → Web app → Execute as: Me,
 *      Who has access: Anyone. Copy the Web App URL.
 *   5. Paste that URL into the website (site.newsletterEndpoint) so the
 *      signup form feeds this sheet.
 */

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------
var SHEET_SUBSCRIBERS = 'Subscribers';
var SHEET_COMPOSE = 'Compose';
var SHEET_LOG = 'Sent Log';
var FROM_NAME = 'St. Charles County Detachment 725';

// ------------------------------------------------------------------
// One-time setup: build the tabs
// ------------------------------------------------------------------
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var subs = ss.getSheetByName(SHEET_SUBSCRIBERS) || ss.insertSheet(SHEET_SUBSCRIBERS);
  if (subs.getLastRow() === 0) {
    subs.appendRow(['Email', 'Name', 'Status', 'Date Joined', 'Unsubscribe Token']);
    subs.setFrozenRows(1);
    subs.getRange('A1:E1').setFontWeight('bold');
  }

  var compose = ss.getSheetByName(SHEET_COMPOSE) || ss.insertSheet(SHEET_COMPOSE);
  if (compose.getRange('A1').getValue() === '') {
    compose.getRange('A1').setValue('Subject:');
    compose.getRange('A2').setValue('HTML:');
    compose.getRange('A1:A2').setFontWeight('bold');
    compose.getRange('B1').setValue('Detachment 725 — Monthly Update');
    compose.getRange('B2').setValue('Paste the newsletter HTML from Marketing HQ here.');
    compose.setColumnWidth(2, 600);
  }

  var log = ss.getSheetByName(SHEET_LOG) || ss.insertSheet(SHEET_LOG);
  if (log.getLastRow() === 0) {
    log.appendRow(['Sent At', 'Subject', 'Recipients', 'Sent', 'Skipped/Errors', 'Note']);
    log.setFrozenRows(1);
    log.getRange('A1:F1').setFontWeight('bold');
  }

  SpreadsheetApp.getUi().alert('Setup complete. Subscribers, Compose, and Sent Log tabs are ready.');
}

// ------------------------------------------------------------------
// Sheet menu
// ------------------------------------------------------------------
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📣 Newsletter')
    .addItem('1. Setup (run once)', 'setup')
    .addSeparator()
    .addItem('Send TEST to me', 'sendTest')
    .addItem('Send to ALL subscribers', 'sendNewsletter')
    .addToUi();
}

// ------------------------------------------------------------------
// Website signup endpoint  (POST email + name)
// ------------------------------------------------------------------
function doPost(e) {
  try {
    var params = (e && e.parameter) || {};
    // Honeypot: bots fill this hidden field — silently accept and drop.
    if (params._gotcha) return textOut('ok');

    var email = String(params.email || '').trim().toLowerCase();
    var name = String(params.name || '').trim();
    if (!isEmail(email)) return textOut('invalid');

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SUBSCRIBERS);
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim().toLowerCase() === email) {
        // Already known — make sure they're subscribed again.
        sheet.getRange(i + 1, 3).setValue('subscribed');
        return textOut('ok');
      }
    }
    sheet.appendRow([email, name, 'subscribed', new Date(), Utilities.getUuid()]);
    return textOut('ok');
  } catch (err) {
    return textOut('error');
  }
}

// ------------------------------------------------------------------
// Unsubscribe endpoint  (GET ?action=unsubscribe&u=TOKEN)
// ------------------------------------------------------------------
function doGet(e) {
  var params = (e && e.parameter) || {};
  if (params.action === 'unsubscribe' && params.u) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SUBSCRIBERS);
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][4]) === String(params.u)) {
        sheet.getRange(i + 1, 3).setValue('unsubscribed');
        return htmlPage('You’ve been unsubscribed', 'You will no longer receive the Detachment 725 newsletter. Semper Fi.');
      }
    }
    return htmlPage('Link not found', 'We couldn’t find that subscription. It may already be removed.');
  }
  return htmlPage('Detachment 725 Newsletter', 'This is the newsletter service endpoint.');
}

// ------------------------------------------------------------------
// Send the newsletter to everyone
// ------------------------------------------------------------------
function sendNewsletter() {
  send_(false);
}
function sendTest() {
  send_(true);
}

function send_(testOnly) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var compose = ss.getSheetByName(SHEET_COMPOSE);
  var subject = String(compose.getRange('B1').getValue() || '').trim();
  var html = String(compose.getRange('B2').getValue() || '').trim();

  if (!subject || !html || html.indexOf('Paste the newsletter') === 0) {
    SpreadsheetApp.getUi().alert('Add a Subject (B1) and the newsletter HTML (B2) on the Compose tab first.');
    return;
  }

  var webAppUrl = ScriptApp.getService().getUrl();
  var me = Session.getActiveUser().getEmail();

  var recipients;
  if (testOnly) {
    recipients = [{ email: me, name: 'Test', token: 'test' }];
  } else {
    var ui = SpreadsheetApp.getUi();
    recipients = getSubscribers_(ss);
    var resp = ui.alert('Send newsletter?',
      'Subject: ' + subject + '\nThis will email ' + recipients.length + ' subscriber(s) from your Gmail.',
      ui.ButtonSet.OK_CANCEL);
    if (resp !== ui.Button.OK) return;
  }

  var quota = MailApp.getRemainingDailyQuota();
  var sent = 0, errors = 0, note = '';

  for (var i = 0; i < recipients.length; i++) {
    if (sent >= quota) { note = 'Stopped at Gmail daily limit (' + quota + '). Run again tomorrow to finish.'; break; }
    var r = recipients[i];
    var unsub = webAppUrl + '?action=unsubscribe&u=' + encodeURIComponent(r.token);
    var body = html
      .replace(/{{\s*UNSUBSCRIBE\s*}}/g, unsub)
      .replace(/{{\s*NAME\s*}}/g, r.name || 'Marine');
    try {
      GmailApp.sendEmail(r.email, subject, 'Please view this email in an HTML-capable client.', {
        htmlBody: body,
        name: FROM_NAME,
      });
      sent++;
    } catch (err) {
      errors++;
    }
  }

  ss.getSheetByName(SHEET_LOG).appendRow([
    new Date(), subject + (testOnly ? ' (TEST)' : ''), recipients.length, sent, errors, note,
  ]);
  SpreadsheetApp.getUi().alert('Done. Sent ' + sent + ' of ' + recipients.length + '.' + (note ? '\n' + note : ''));
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
function getSubscribers_(ss) {
  var data = ss.getSheetByName(SHEET_SUBSCRIBERS).getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]).trim().toLowerCase() === 'subscribed' && isEmail(String(data[i][0]).trim())) {
      out.push({ email: String(data[i][0]).trim(), name: String(data[i][1] || '').trim(), token: String(data[i][4]) });
    }
  }
  return out;
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function textOut(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.TEXT);
}

function htmlPage(title, body) {
  var html = '<html><head><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>body{font-family:system-ui,Arial,sans-serif;background:#0a1220;color:#f6f3ea;' +
    'display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px}' +
    'div{max-width:420px}h1{color:#c9a349;font-size:22px}p{color:#f6f3ea;opacity:.85}</style></head>' +
    '<body><div><h1>' + title + '</h1><p>' + body + '</p></div></body></html>';
  return HtmlService.createHtmlOutput(html);
}
