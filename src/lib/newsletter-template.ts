/**
 * Newsletter email template.
 *
 * Table-based layout with inline styles on purpose — Outlook and several mobile
 * clients ignore <style> blocks and flexbox, so anything cleverer than this
 * renders inconsistently.
 */

/** Escape values interpolated into the HTML — article titles can contain & or <. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function newsletterHtml(opts: {
  title: string
  excerpt: string
  url: string
  recipientName?: string | null
  unsubscribeUrl: string
}): string {
  const greeting = opts.recipientName ? `Hello ${esc(opts.recipientName)},` : 'Hello,'

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F1E8;">
  <!-- Preview text shown in the inbox list before the email is opened -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.excerpt.slice(0, 140))}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F1E8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;">

          <tr>
            <td style="padding:28px 32px 8px 32px;font-family:Georgia,'Times New Roman',serif;">
              <p style="margin:0 0 16px 0;font-size:15px;color:#6B5D4F;font-family:Arial,Helvetica,sans-serif;">${greeting}</p>
              <h1 style="margin:0 0 12px 0;font-size:24px;line-height:1.3;color:#1B3B36;font-weight:bold;">${esc(opts.title)}</h1>
              <div style="width:48px;height:3px;background-color:#C9A86A;border-radius:2px;margin:0 0 20px 0;"></div>
              <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#2A2520;font-family:Arial,Helvetica,sans-serif;">${esc(opts.excerpt)}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#1B3B36;border-radius:8px;">
                    <a href="${opts.url}" style="display:inline-block;padding:12px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">Read the full article →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;border-top:1px solid #EBE5D5;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#6B5D4F;">
                You're receiving this because you subscribed at mohamedabukhadra.com.<br>
                <a href="${opts.unsubscribeUrl}" style="color:#6B5D4F;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
