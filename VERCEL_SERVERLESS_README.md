Vercel serverless + SendGrid quick setup

This project includes a sample Vercel serverless function at `api/send-email.js` that sends form submissions via SendGrid.

Steps to enable:
1. Sign up at SendGrid and create an API key with "Mail Send" permission.
2. In your Vercel project settings, add the following Environment Variables:
   - SENDGRID_API_KEY = <your sendgrid api key>
   - TO_EMAIL = info@edirnekirmizi.com
   - FROM_EMAIL = no-reply@yourdomain.com (must be a verified sender in SendGrid)
3. Deploy the project to Vercel. The contact form posts to `/api/send-email` when the app is live.

Local testing:
- You can test the client-side fetch locally, but serverless function will run on Vercel. To emulate, set environment variables locally and run `vercel dev` or deploy to a staging branch.

Security note:
- Keep your SENDGRID_API_KEY secret. Do not commit it to the repo.

If you'd like, I can adapt the serverless function to use Nodemailer with SMTP or to forward to another service.
