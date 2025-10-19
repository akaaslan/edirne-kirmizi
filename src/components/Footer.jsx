import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
          <div>
            <p style={{margin:0}}>© {new Date().getFullYear()} Edirne Kırmızısı — Kültürel mirasa saygı ile.</p>
          </div>

          <div className="footer-icons" style={{display:'flex', gap:12, alignItems:'center'}}>
            <a href="https://instagram.com/edirnekirmizi" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
              </svg>
            </a>

            <a href="mailto:info@edirnekirmizi.com" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <path d="M3 7.5l8.5 6L20 7.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
