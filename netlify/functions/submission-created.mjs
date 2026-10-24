/**
 * Runs automatically after every verified Netlify Forms submission (the "submission-created" event).
 *
 * Forwards Gap Review briefs to the Google Apps Script in integrations/gap-review-sheet.gs, which adds
 * the row to "The Gap Review - Brief" and sends Email 0. Apps Script answers a POST with a redirect,
 * which Netlify's outgoing webhooks count as a failure; fetch follows it, so this always succeeds.
 *
 * The script URL, including its ?key=…, lives only in the Netlify environment variable
 * GAP_REVIEW_SHEET_URL (Project configuration → Environment variables), never in this file.
 */
export default async (req) => {
  const { payload } = await req.json();
  if (payload?.form_name !== 'gap-review') return new Response('ignored');

  const url = process.env.GAP_REVIEW_SHEET_URL;
  if (!url) {
    console.error('GAP_REVIEW_SHEET_URL is not set: the brief was not sent to Google Sheets.');
    return new Response('not configured');
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    console.log(`Gap Review brief ${payload.id} → Google Sheets: ${res.status} ${(await res.text()).slice(0, 200)}`);
  } catch (err) {
    console.error(`Gap Review brief ${payload.id} → Google Sheets failed: ${err}`);
  }
  return new Response('ok');
};
