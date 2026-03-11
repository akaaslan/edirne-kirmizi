import React, { useState } from "react";
import { api } from "../services/api";

export default function Footer(){
  const [email, setEmail] = useState('');
  const [nlStatus, setNlStatus] = useState(''); // 'success' | 'error' | ''
  const [nlMsg, setNlMsg] = useState('');
  const [nlLoading, setNlLoading] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNlLoading(true);
    setNlStatus('');
    try {
      await api.subscribeNewsletter(email.trim());
      setNlStatus('success');
      setNlMsg('Bültenimize başarıyla abone oldunuz!');
      setEmail('');
    } catch (err) {
      setNlStatus('error');
      setNlMsg(err.message || 'Bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setNlLoading(false);
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Newsletter */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.15)'
        }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem' }}>
            Yeni ürünlerden haberdar olun
          </p>
          <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: 420 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.1)',
                color: 'inherit',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              disabled={nlLoading}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--edirne)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: nlLoading ? 'not-allowed' : 'pointer',
                opacity: nlLoading ? 0.6 : 1,
                whiteSpace: 'nowrap'
              }}
            >
              {nlLoading ? '...' : 'Abone Ol'}
            </button>
          </form>
          {nlStatus && (
            <p style={{
              margin: 0,
              fontSize: '0.85rem',
              color: nlStatus === 'success' ? '#4CAF50' : '#FF5252'
            }}>
              {nlMsg}
            </p>
          )}
        </div>

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
