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
            <p style={{margin:0}}><strong>Email:</strong> <a href="mailto:info@edirnekirmizi.com">info@edirnekirmizi.com</a></p>
            <p style={{marginTop:4}}><strong>Instagram:</strong> <a href="https://instagram.com/edirnekirmizisi" target="_blank" rel="noreferrer">@edirnekirmizisi</a></p>

            <p style={{marginTop:16, color:"var(--muted)"}}>Not: Bu site şu an sadece tanıtım amaçlıdır; form gönderimi devre dışı bırakıldı.</p>
          </div>
        </div>
      </section>
    </>
  );
}
