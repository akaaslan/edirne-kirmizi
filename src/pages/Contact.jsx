/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function Contact(){
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be added later with backend
    setStatus('Mesajınız alındı! En kısa sürede dönüş yapacağız.');
    setTimeout(() => setStatus(''), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity:0, y:20 }, visible: { opacity:1, y:0, transition: { duration: 0.5 } } };

  return (
    <>
      <Helmet><title>İletişim | Edirne Kırmızısı</title></Helmet>
      <section className="section" style={{background: "linear-gradient(180deg, rgba(250, 248, 243, 0.3) 0%, transparent 100%)"}}>
        <motion.div className="container" initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item} style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)", fontSize: '2.5rem', marginBottom: '0.5rem'}}>
              Bizimle İletişime Geçin
            </h2>
            <p style={{color:"var(--muted)", fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto'}}>
              Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşın.
            </p>
          </motion.div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto'}}>
            
            {/* Contact Form */}
            <motion.div variants={item}>
              <div className="contact-card">
                <h3 style={{color: 'var(--edirne)', marginBottom: '1.5rem', fontSize: '1.5rem'}}>Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--dark)', fontWeight: 600}}>Adınız</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-input"
                      placeholder="Adınızı girin"
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--dark)', fontWeight: 600}}>E-posta</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-input"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--dark)', fontWeight: 600}}>Mesajınız</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="contact-input"
                      rows="5"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>
                  <button type="submit" className="primary large" style={{width: '100%', marginTop: '0.5rem'}}>
                    Gönder
                  </button>
                  {status && (
                    <motion.p 
                      initial={{opacity: 0, y: -10}} 
                      animate={{opacity: 1, y: 0}}
                      style={{color: 'var(--edirne)', textAlign: 'center', margin: 0, fontWeight: 600}}
                    >
                      {status}
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={item} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              {/* Email Card */}
              <div className="contact-card">
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                  <div style={{
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, var(--edirne) 0%, rgba(156, 30, 36, 0.8) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(156, 30, 36, 0.2)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="2" fill="none" />
                      <path d="M3 7.5l8.5 6L20 7.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{margin: 0, color: 'var(--edirne)', fontSize: '1.2rem'}}>E-posta</h4>
                    <a href="mailto:info@edirnekirmizi.com" className="contact-link" style={{fontSize: '1rem'}}>
                      info@edirnekirmizi.com
                    </a>
                  </div>
                </div>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: '0.95rem'}}>
                  Sorularınız için 7/24 yanıt veriyoruz.
                </p>
              </div>

              {/* Instagram Card */}
              <div className="contact-card">
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                  <div style={{
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, #E4405F 0%, #C13584 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(228, 64, 95, 0.3)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none" />
                      <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="2" fill="none" />
                      <circle cx="17.5" cy="6.5" r="1" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{margin: 0, color: 'var(--edirne)', fontSize: '1.2rem'}}>Instagram</h4>
                    <a href="https://www.instagram.com/edirnekirmizisi.store" target="_blank" rel="noreferrer" className="contact-link" style={{fontSize: '1rem'}}>
                      @edirnekirmizisi.store
                    </a>
                  </div>
                </div>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: '0.95rem'}}>
                  Yeni koleksiyonlar ve özel kampanyalar için takip edin.
                </p>
              </div>

              {/* Trendyol Card */}
              <div className="contact-card">
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                  <div style={{
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, #F27A1A 0%, #E65100 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(242, 122, 26, 0.3)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <circle cx="10" cy="20" r="1.5" fill="white" />
                      <circle cx="18" cy="20" r="1.5" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{margin: 0, color: 'var(--edirne)', fontSize: '1.2rem'}}>Mağazamız</h4>
                    <a href="https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682" target="_blank" rel="noreferrer" className="contact-link" style={{fontSize: '1rem'}}>
                      Trendyol'da Ziyaret Et
                    </a>
                  </div>
                </div>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: '0.95rem'}}>
                  Tüm ürünlerimizi online mağazamızdan satın alabilirsiniz.
                </p>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
