// Previously a serverless function to send emails. Removed per project request.

export default function handler(req, res) {
  res.status(404).json({ error: 'Not Found' });
}
