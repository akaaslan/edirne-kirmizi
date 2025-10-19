import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <section className="section">
      <div className="container" style={{textAlign:"center"}}>
  <h2 style={{fontFamily:"var(--font-serif)"}}>Sayfa bulunamadı</h2>
        <p style={{color:"var(--muted)"}}>Aradığınız sayfa mevcut değil. <Link to="/">Ana sayfaya dön</Link></p>
      </div>
    </section>
  );
}
