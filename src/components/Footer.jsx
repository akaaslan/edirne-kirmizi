import React from "react";

export default function Footer(){
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
          <div>
            <p style={{margin:0}}>© {new Date().getFullYear()} Edirne Kırmızısı — Kültürel mirasa saygı ile.</p>
          </div>

          <nav className="footer-icons" style={{display:'flex', gap:12, alignItems:'center'}} aria-label="Sosyal medya bağlantıları">
            <a href="https://instagram.com/edirnekirmizi" target="_blank" rel="noreferrer noopener" aria-label="Instagram'da Edirne Kırmızısı">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
              </svg>
            </a>

            <a href="mailto:info@edirnekirmizi.com" aria-label="Email ile iletişim">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <path d="M3 7.5l8.5 6L20 7.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            <a href="https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0" target="_blank" rel="noreferrer noopener" aria-label="Trendyol mağazamız">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="10" cy="20" r="1.2" fill="currentColor" />
                <circle cx="18" cy="20" r="1.2" fill="currentColor" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
