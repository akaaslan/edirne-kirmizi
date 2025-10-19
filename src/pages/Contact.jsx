import React from "react";
import { Helmet } from "react-helmet-async";

export default function Contact(){
  return (
    <>
      <Helmet><title>İletişim | Edirne Kırmızısı</title></Helmet>
      <section className="section">
        <div className="container">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>İletişim</h2>

          <div style={{marginTop:12, maxWidth:720}}>
            <p style={{color:"var(--muted)", marginBottom:8}}>Bizimle iletişime geçmek için lütfen aşağıdaki bilgileri kullanın.</p>
            <p style={{margin:0}}><strong>Email:</strong> <a className="contact-link" href="mailto:info@edirnekirmizi.com">info@edirnekirmizi.com</a></p>
            <p style={{marginTop:4}}><strong>Instagram:</strong> <a className="contact-link" href="https://instagram.com/edirnekirmizi" target="_blank" rel="noreferrer">@edirnekirmizi</a></p>
            </div>
        </div>
      </section>
    </>
  );
}
