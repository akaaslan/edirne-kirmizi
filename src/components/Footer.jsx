import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Edirne Kırmızısı — Kültürel mirasa saygı ile.</p>
        <p style={{marginTop:"0.35rem", color:"#bbb", fontSize:"0.85rem"}}>Gizlilik | Mesafeli Satış sözleşmesi yakında eklenecek</p>
      </div>
    </footer>
  );
}
