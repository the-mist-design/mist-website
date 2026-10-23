/**
 * The Gap Review: Netlify Forms → Google Sheets + confirmation email (Email 0).
 *
 * Lives in the Google Sheet "The Gap Review - Brief" (Extensions → Apps Script) and runs as a web app.
 * Netlify sends every new "gap-review" submission here through an outgoing webhook
 * (Forms → Form notifications), with ?key=… in the URL. The key itself is stored only in
 * Project Settings → Script Properties as WEBHOOK_KEY, never in this file.
 */

const SHEET_NAME = 'Briefs';
const TIME_ZONE = 'Europe/Belgrade';
const FROM_ADDRESS = 'stefan@mistdesign.co';
const FROM_NAME = 'Stefan Milić';
const SITE = 'https://mistdesign.co';
const WORKING_DAYS_TO_DELIVERY = 3;

// Sheet header → form field name (from src/pages/the-gap-review.astro).
const COLUMNS = {
  'Full name': 'full_name',
  'Business name': 'business_name',
  'Business email': 'email',
  'Email consent': 'consent',
  'Phone / WhatsApp': 'phone',
  'Website / Instagram': 'website',
  'What they sell': 'what_you_sell',
  'Category': 'category',
  'Category (other)': 'category_other',
  'Physical product': 'physical_product',
  'Business stage': 'stage',
  'Price position': 'price',
  'Product count': 'product_count',
  'Range growth': 'range_growth',
  'Where people buy': 'where_bought',
  'Packaging': 'packaging',
  'Real customer': 'customer',
  'Why they choose them': 'why_you',
  "What isn't working": 'not_working',
  'Tried so far': 'tried',
  'Why now': 'why_now',
  'A year from now': 'year_from_now',
  'Competitors they respect': 'competitors',
  'Brand as a place': 'place',
  'Timeline': 'timeline',
  'Budget': 'budget',
  'Decision maker': 'decision',
  'Files link': 'files',
  'Found MIST via': 'found_via',
};

function doPost(e) {
  const key = PropertiesService.getScriptProperties().getProperty('WEBHOOK_KEY');
  if (!key || !e || !e.parameter || e.parameter.key !== key) return respond('forbidden');

  const payload = JSON.parse(e.postData.contents);
  if (payload.form_name && payload.form_name !== 'gap-review') return respond('ignored');
  saveBrief(payload.data || {}, payload.created_at ? new Date(payload.created_at) : new Date());
  return respond('ok');
}

/** Appends the brief as a row, then sends Email 0 and records the result in "Confirmation sent". */
function saveBrief(data, submitted) {
  const delivery = addWorkingDays(submitted, WORKING_DAYS_TO_DELIVERY);
  const firstName = String(data.full_name || '').trim().split(/\s+/)[0];

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map((header) => {
      if (header === 'Submitted') return submitted;
      if (header === 'Delivery date') return delivery;
      if (header === 'First name') return asText(firstName);
      return COLUMNS[header] ? asText(data[COLUMNS[header]]) : '';
    });
    sheet.appendRow(row);
    const rowNumber = sheet.getLastRow();

    let status;
    try {
      sendConfirmation(String(data.email || '').trim(), firstName, String(data.business_name || '').trim(), delivery);
      status = 'Sent ' + Utilities.formatDate(new Date(), TIME_ZONE, 'yyyy-MM-dd HH:mm');
    } catch (err) {
      status = 'Not sent: ' + err.message;
    }
    const statusColumn = headers.indexOf('Confirmation sent') + 1;
    if (statusColumn > 0) sheet.getRange(rowNumber, statusColumn).setValue(status);
  } finally {
    lock.releaseLock();
  }
}

/** Email 0 — The Confirmation (copy from "The Gap Review - Email Sequence"). */
function sendConfirmation(to, firstName, businessName, delivery) {
  if (!to) throw new Error('no email address');
  const date = formatDeliveryDate(delivery);
  const paragraphs = [
    `${firstName},`,
    `Your brief arrived, and I'll read it myself. Your Gap Review will be in your inbox by ${date}.`,
    "While you wait, here's the idea behind it.",
    'Most good businesses have a gap between what they are and how they look.',
    'The product is made with care, the price is fair, and the people who know it come back.',
    "But someone who doesn't know it yet only sees the label, the website, the sign above the door. If those say less than the product does, that person never finds out.",
    `That difference is the gap. It's hard to see from the inside, because you know the product too well. Your review will show where it sits in ${businessName}, and what it costs you.`,
    `There's nothing you need to do for now. You'll hear from me on ${date}.`,
    'Stefan',
  ];

  const plainBody = paragraphs.join('\n\n') + '\n\n--\nStefan Milić\nMIST DESIGN STUDIO\nBuilt for generations. Not trends.\n' + SITE;
  const htmlBody =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#121212">' +
    paragraphs.map((p) => `<p style="margin:0 0 14px">${escapeHtml(p)}</p>`).join('') +
    signatureHtml() +
    '</div>';

  const options = { htmlBody: htmlBody, name: FROM_NAME, replyTo: FROM_ADDRESS };
  // Sends as stefan@mistdesign.co once that address is added in Gmail under "Send mail as".
  if (GmailApp.getAliases().indexOf(FROM_ADDRESS) !== -1) options.from = FROM_ADDRESS;
  GmailApp.sendEmail(to, 'Your brief is with me', plainBody, options);
}

function signatureHtml() {
  const img = (file, w, h, alt) =>
    `<img src="${SITE}/signature/${file}" width="${w}" height="${h}" alt="${alt}" style="display:block;border:0">`;
  const icon = (file, w, h, alt, url) =>
    `<a href="${url}" style="display:inline-block;margin-right:12px;text-decoration:none">${img(file, w, h, alt)}</a>`;
  return (
    '<table cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;font-family:Arial,Helvetica,sans-serif"><tr>' +
    `<td style="padding-right:16px;vertical-align:top">${img('photo.png', 84, 84, 'Stefan Milić')}</td>` +
    '<td style="vertical-align:top">' +
    '<div style="font-size:14px;font-weight:bold;color:#121212">Stefan Milić</div>' +
    '<div style="font-size:10px;letter-spacing:1px;color:#8e6b54;margin:3px 0 8px">MIST DESIGN STUDIO</div>' +
    img('tagline.png', 200, 16, 'Built for generations. Not trends.') +
    '<div style="margin-top:10px;font-size:0">' +
    icon('web.png', 16, 16, 'Website', SITE) +
    icon('instagram.png', 16, 16, 'Instagram', 'https://www.instagram.com/the.mist.design/') +
    icon('tiktok.png', 14, 16, 'TikTok', 'https://www.tiktok.com/@mistdesign') +
    '</div></td></tr></table>'
  );
}

/** Monday to Friday only; the review is due three working days after the brief arrives. */
function addWorkingDays(start, days) {
  const date = new Date(start.getTime());
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const weekday = Number(Utilities.formatDate(date, TIME_ZONE, 'u')); // 1 = Monday … 7 = Sunday
    if (weekday <= 5) added++;
  }
  return date;
}

/** "Monday, 27 October" */
function formatDeliveryDate(date) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekday = Number(Utilities.formatDate(date, TIME_ZONE, 'u'));
  const day = Number(Utilities.formatDate(date, TIME_ZONE, 'd'));
  const month = Number(Utilities.formatDate(date, TIME_ZONE, 'M'));
  return `${days[weekday - 1]}, ${day} ${months[month - 1]}`;
}

// Keeps answers like "=…" or "+381…" as plain text instead of formulas.
function asText(value) {
  const text = value == null ? '' : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function respond(result) {
  return ContentService.createTextOutput(JSON.stringify({ result: result })).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor: adds a test row and sends Email 0 to your own address. */
function testWithSampleBrief() {
  saveBrief(
    {
      full_name: 'Stefan Test',
      business_name: 'Test Distillery',
      email: Session.getActiveUser().getEmail(),
      consent: 'yes',
      what_you_sell: 'Test row from the Apps Script editor. Delete it.',
    },
    new Date(),
  );
}
