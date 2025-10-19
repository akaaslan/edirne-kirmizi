// Vercel serverless function (Node.js)
// Expects environment variables: SENDGRID_API_KEY, TO_EMAIL, FROM_EMAIL

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).send({ error: 'Missing fields' });

  try {
    const msg = {
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `Yeni iletişim mesajı: ${name}`,
      text: `İsim: ${name}\nE-posta: ${email}\n\n${message}`,
      html: `<p><strong>İsim:</strong> ${name}</p><p><strong>E-posta:</strong> ${email}</p><p>${message}</p>`
    };
    await sgMail.send(msg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SendGrid error', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
