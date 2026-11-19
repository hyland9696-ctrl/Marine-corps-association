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

// The HQ page's "Send" buttons call this script directly. They must present
// the SEND_SECRET stored in Script Properties (menu: Newsletter → Set send
// secret). Anyone without it can only subscribe/unsubscribe.
function getSendSecret_() {
  return PropertiesService.getScriptProperties().getProperty('SEND_SECRET') || '';
}
function setSendSecret() {
  var ui = SpreadsheetApp.getUi();
  var resp = ui.prompt('Send secret',
    'Type a long passphrase. You will enter the same one on the website HQ page. Leave blank to keep the current one.',
    ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;
  var v = String(resp.getResponseText() || '').trim();
  if (v.length < 12) { ui.alert('Use at least 12 characters.'); return; }
  PropertiesService.getScriptProperties().setProperty('SEND_SECRET', v);
  ui.alert('Saved. Enter the same secret on the HQ page.');
}

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
    .addItem('2. Set send secret (for the HQ page)', 'setSendSecret')
    .addItem('Open Photos Folder', 'openPhotosFolder')
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
    // JSON requests come from the website's HQ page (send / stats).
    var raw = e && e.postData && e.postData.contents;
    var ct = e && e.postData && e.postData.type;
    if (raw && ct && ct.indexOf('application/json') === -1 && ct.indexOf('text/plain') !== -1) {
      var req = null;
      try { req = JSON.parse(raw); } catch (ignore) { req = null; }
      if (req && req.action) return handleJson_(req);
    }
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
  var ui = SpreadsheetApp.getUi();

  if (!subject || !html || html.indexOf('Paste the newsletter') === 0) {
    ui.alert('Add a Subject (B1) and the newsletter HTML (B2) on the Compose tab first.');
    return;
  }
  if (!testOnly) {
    var n = getSubscribers_(ss).length;
    var resp = ui.alert('Send newsletter?', 'Subject: ' + subject + '\nThis will email ' + n + ' subscriber(s) from your Gmail.', ui.ButtonSet.OK_CANCEL);
    if (resp !== ui.Button.OK) return;
  }
  var result = deliver_(ss, subject, html, buildPhotos_(), testOnly ? 'test' : 'all');
  ui.alert('Done. Sent ' + result.sent + ' of ' + result.recipients + '.' + (result.note ? '\n' + result.note : ''));
}

// ------------------------------------------------------------------
// JSON API used by the website HQ page
//   {action:'stats', secret}                         → counts + last send
//   {action:'send',  secret, mode:'test'|'all',
//    subject, html, photos:[{name,type,data(base64)}]} → sends
// ------------------------------------------------------------------
function handleJson_(req) {
  var secret = getSendSecret_();
  if (!secret || String(req.secret || '') !== secret) {
    return jsonOut({ ok: false, error: 'bad_secret' });
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (req.action === 'stats') {
    var subs = getSubscribers_(ss).length;
    var log = ss.getSheetByName(SHEET_LOG);
    var last = null;
    if (log && log.getLastRow() > 1) {
      var row = log.getRange(log.getLastRow(), 1, 1, 6).getValues()[0];
      last = { at: row[0], subject: row[1], recipients: row[2], sent: row[3], errors: row[4] };
    }
    return jsonOut({ ok: true, subscribers: subs, quota: MailApp.getRemainingDailyQuota(), last: last });
  }
  if (req.action === 'send') {
    var subject = String(req.subject || '').trim();
    var html = String(req.html || '');
    if (!subject || !html) return jsonOut({ ok: false, error: 'missing_content' });
    var photos = photosFromPayload_(req.photos || []);
    if (!photos.html) photos = buildPhotos_();
    var result = deliver_(ss, subject, html, photos, req.mode === 'all' ? 'all' : 'test', req.testTo);
    return jsonOut(result);
  }
  return jsonOut({ ok: false, error: 'unknown_action' });
}

// Photos posted from the HQ page (already resized in the browser).
function photosFromPayload_(list) {
  var imgs = [];
  for (var i = 0; i < Math.min(list.length, 8); i++) {
    var p = list[i];
    if (!p || !p.data || !/^image\//.test(String(p.type || ''))) continue;
    try {
      imgs.push(Utilities.newBlob(Utilities.base64Decode(p.data), p.type, p.name || ('photo' + i + '.jpg')));
    } catch (ignore) {}
  }
  if (!imgs.length) return { html: '', inlineImages: {} };
  return photosHtml_(imgs.map(function (b) { return { getBlob: function () { return b; } }; }));
}

// Shared delivery used by the sheet menu and the HQ page.
function deliver_(ss, subject, html, photos, mode, testTo) {
  var webAppUrl = ScriptApp.getService().getUrl();
  var me = Session.getEffectiveUser().getEmail();
  var recipients = mode === 'all'
    ? getSubscribers_(ss)
    : [{ email: isEmail(String(testTo || '')) ? String(testTo) : me, name: 'Test', token: 'test' }];

  html = html.replace(/{{\s*PHOTOS\s*}}/g, photos.html);
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
        htmlBody: body, name: FROM_NAME, inlineImages: photos.inlineImages,
      });
      sent++;
    } catch (err) { errors++; }
  }
  ss.getSheetByName(SHEET_LOG).appendRow([
    new Date(), subject + (mode === 'test' ? ' (TEST)' : ''), recipients.length, sent, errors, note,
  ]);
  return { ok: true, mode: mode, recipients: recipients.length, sent: sent, errors: errors, note: note };
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
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

// ------------------------------------------------------------------
// Event photos: a Drive folder whose images are embedded (inline/CID)
// into the "Recent Events" section at the bottom of the newsletter.
// ------------------------------------------------------------------
var PHOTOS_FOLDER = 'Scuttlebutt Photos';

function getPhotosFolder_() {
  var it = DriveApp.getFoldersByName(PHOTOS_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(PHOTOS_FOLDER);
}

function openPhotosFolder() {
  var f = getPhotosFolder_();
  SpreadsheetApp.getUi().alert(
    'Scuttlebutt Photos folder',
    'Drop this month’s event photos into this Google Drive folder, then send the newsletter — they’ll be embedded automatically:\n\n' + f.getUrl(),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function buildPhotos_() {
  var files = getPhotosFolder_().getFiles();
  var imgs = [];
  while (files.hasNext()) {
    var f = files.next();
    var mt = f.getMimeType();
    if (mt && mt.indexOf('image/') === 0) imgs.push(f);
  }
  if (!imgs.length) return { html: '', inlineImages: {} };
  imgs.sort(function (a, b) { return a.getName() < b.getName() ? -1 : 1; });
  return photosHtml_(imgs.slice(0, 8));
}

// Builds the "Recent Events" grid + inline image map from blob holders.
function photosHtml_(imgs) {
  var inline = {}, cells = '';
  for (var i = 0; i < imgs.length; i += 2) {
    var row = '';
    for (var j = i; j < Math.min(i + 2, imgs.length); j++) {
      var key = 'photo' + j;
      inline[key] = imgs[j].getBlob();
      row += '<td width="50%" style="padding:5px;vertical-align:top;"><img src="cid:' + key +
        '" width="262" alt="Detachment 725 event photo" style="width:100%;max-width:262px;border-radius:4px;display:block;border:3px solid #ffffff;outline:1px solid #c9a349;"></td>';
    }
    if (imgs.length - i === 1) row += '<td width="50%" style="padding:5px;">&nbsp;</td>';
    cells += '<tr>' + row + '</tr>';
  }
  var html = '<tr><td style="padding:22px 28px 0;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-bottom:2px solid #c9a349;padding-bottom:7px;">' +
    '<span style="color:#8a1538;font-size:11px;">&#9733;</span>' +
    '<span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;letter-spacing:.18em;text-transform:uppercase;color:#0a1220;padding-left:7px;">Recent Events</span>' +
    '</td></tr></table>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">' + cells + '</table>' +
    '</td></tr>';
  return { html: html, inlineImages: inline };
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
