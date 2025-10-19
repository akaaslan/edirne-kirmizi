import React, {useState} from "react";
import { Helmet } from "react-helmet-async";

// By default this app will post to the local serverless endpoint at /api/send-email
// Deploy to Vercel and set the SENDGRID_API_KEY, TO_EMAIL and FROM_EMAIL environment variables.
// If you prefer Formspree, replace FORM_ENDPOINT with the Formspree URL.
const FORM_ENDPOINT = "/api/send-email";

export default function Contact(){
  const [form, setForm] = useState({name:"", email:"", message:""});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function onChange(e){ setForm({...form, [e.target.name]: e.target.value})}

  function fallbackMailto(values){
    const subject = encodeURIComponent(`İletişim: ${values.name}`);
    const body = encodeURIComponent(`İsim: ${values.name}\nE-posta: ${values.email}\n\n${values.message}`);
    window.location.href = `mailto:info@edirnekirmizi.com?subject=${subject}&body=${body}`;
  }

  async function onSubmit(e){
    e.preventDefault();
    setSending(true);
    const payload = {name: form.name, email: form.email, message: form.message};

    // Try to send via Formspree (no backend required). Replace FORM_ENDPOINT with your real endpoint.
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSent(true);
      } else {
        // fallback to mailto if endpoint not configured
        fallbackMailto(form);
      }
    } catch {
      // network error -> fallback
      fallbackMailto(form);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Helmet><title>İletişim | Edirne Kırmızısı</title></Helmet>
      <section className="section">
        <div className="container">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>İletişim</h2>

          <div style={{marginTop:12, maxWidth:720}}>
            <p style={{color:"var(--muted)", marginBottom:8}}>Bizimle iletişime geçin:</p>
            <p style={{margin:0}}><strong>Email:</strong> <a href="mailto:info@edirnekirmizi.com">info@edirnekirmizi.com</a></p>
            <p style={{marginTop:4}}><strong>Instagram:</strong> <a href="https://instagram.com/edirnekirmizisi" target="_blank" rel="noreferrer">@edirnekirmizisi</a></p>

            <div style={{marginTop:16}}>
              {sent ? (
                <p style={{color:"var(--muted)"}}>Mesajınız alındı. Teşekkürler!</p>
              ) : (
                /*
                  Netlify Forms: easiest zero-server option.
                  - Deploy to Netlify and the form will be captured automatically.
                  - In Netlify site settings you can set email notifications.
                  If you prefer Formspree, keep FORM_ENDPOINT above and the fetch will be used.
                */
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={onSubmit}
                  style={{display:"grid", gap:10}}
                >
                  {/* Netlify required hidden inputs */}
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  <input className="input" name="name" placeholder="İsim" value={form.name} onChange={onChange} required/>
                  <input className="input" name="email" placeholder="E-posta" value={form.email} onChange={onChange} required/>
                  <textarea className="input" name="message" placeholder="Mesajınız" rows="6" value={form.message} onChange={onChange} required/>
                  <button className="primary" type="submit" disabled={sending}>{sending ? 'Gönderiliyor...' : 'Gönder'}</button>
                  <noscript>
                    <p style={{color:'var(--muted)'}}>JavaScript devre dışıysa form gönderimi sayfa yenilemesi ile yapılacaktır.</p>
                  </noscript>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
