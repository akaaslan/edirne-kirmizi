Netlify Forms quick setup

This project includes a Netlify-ready contact form in `src/pages/Contact.jsx`.

How to enable Netlify Forms:
1. Deploy this site to Netlify (link your GitHub/Git provider repo) or drag-and-drop the `dist` folder after `npm run build`.
2. Netlify will automatically discover forms that have `data-netlify="true"` and `form-name` hidden input.
3. In Netlify dashboard > Site > Forms you can see submissions and configure email notifications.

Notes:
- The form also supports Formspree via the `FORM_ENDPOINT` constant at the top of `Contact.jsx`.
- If you need a custom serverless function (Vercel/Netlify functions or Cloudflare Worker) to forward form data to your own mailbox or an API (SendGrid/Mailgun), I can add a minimal example.

Simple test locally:
- Netlify form handling requires a Netlify build/deploy to capture submissions; however, the JS fetch path (Formspree) will work locally if you set `FORM_ENDPOINT` to a valid Formspree URL.

If you'd like, I can add a small serverless example for Vercel functions + SendGrid. Tell me which provider you prefer.
