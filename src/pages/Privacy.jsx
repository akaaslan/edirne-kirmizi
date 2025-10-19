import React from "react";
import { Helmet } from "react-helmet-async";

export default function Privacy(){
  return (
    <>
      <Helmet><title>Gizlilik Politikası</title></Helmet>
      <section className="section">
        <div className="container">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Gizlilik Politikası (Örnek)</h2>
          <p style={{color:"var(--muted)"}}>Bu sayfa, kullanıcı verilerinin nasıl işlendiğine dair örnek metin içerir. (Gerçek metin için hukuk danışmanına ihtiyaç vardır.)</p>
        </div>
      </section>
    </>
  );
}
