import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ProductDetail(){
  const { id } = useParams();
  // placeholder data (ileride API'den çekilecek)
  return (
    <>
      <Helmet><title>Ürün | Edirne Kırmızısı</title></Helmet>
      <section className="section">
        <div className="container">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Ürün: {id}</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 320px", gap:"1rem", marginTop:"1rem"}}>
            <div>
              <div style={{height:320, background:"#f5f5f5", borderRadius:8}}/>
              <p style={{marginTop:"0.8rem", color:"var(--muted)"}}>Detaylı açıklama burada yer alacak. Malzeme, ölçü, bakım önerileri ve hikâye.</p>
            </div>
            <aside className="card">
              <p style={{fontWeight:700}}>Fiyat: —</p>
              <p style={{color:"var(--muted)", marginTop:6}}>Stok: Hazır</p>
              <button className="primary" style={{width:"100%", marginTop:12}}>Sepete Ekle (yakında)</button>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
