import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MdSupport, MdEmail, MdPhone, MdQuestionAnswer, MdSend } from 'react-icons/md';

export default function Support() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/giris');
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Implement actual support ticket API
    setTimeout(() => {
      setSuccess(true);
      setFormData({ subject: '', message: '' });
      setSubmitting(false);
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  const faqs = [
    {
      question: 'Sipariş iadesi nasıl yapılır?',
      answer: 'Ürün teslimatından itibaren 14 gün içinde iade talebinde bulunabilirsiniz. Hesabım > Siparişlerim bölümünden iade işlemi başlatabilirsiniz.'
    },
    {
      question: 'Kargo ücreti ne kadar?',
      answer: '₺500 ve üzeri alışverişlerde kargo ücretsizdir. Altındaki siparişlerde ₺29,90 kargo ücreti uygulanır.'
    },
    {
      question: 'Ürünler ne zaman kargoya veriliyor?',
      answer: 'Siparişiniz onaylandıktan sonra 1-2 iş günü içerisinde kargoya verilir. Kargo takip numaranız e-posta ile size iletilir.'
    },
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Kredi kartı, banka havalesi ve kapıda ödeme seçeneklerini kullanabilirsiniz.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Destek | Edirne Kırmızısı</title>
      </Helmet>

      <section className="section" style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #faf8f3 0%, #fff 100%)' }}>
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <MdSupport size={40} style={{ color: 'var(--edirne)' }} />
              <h1 style={{
                margin: 0,
                fontFamily: 'var(--font-serif)',
                color: 'var(--edirne)',
                fontSize: '2.5rem'
              }}>
                Destek
              </h1>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {/* Contact Cards */}
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(156, 30, 36, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(33, 150, 243, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <MdEmail size={32} style={{ color: '#2196F3' }} />
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--dark)' }}>E-posta</h3>
                <p style={{ margin: 0, color: 'var(--muted)' }}>
                  <a href="mailto:destek@edirnekirmizisi.com" style={{ color: 'var(--edirne)', textDecoration: 'none' }}>
                    destek@edirnekirmizisi.com
                  </a>
                </p>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(156, 30, 36, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(76, 175, 80, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <MdPhone size={32} style={{ color: '#4CAF50' }} />
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--dark)' }}>Telefon</h3>
                <p style={{ margin: 0, color: 'var(--muted)' }}>
                  <a href="tel:+902842360000" style={{ color: 'var(--edirne)', textDecoration: 'none' }}>
                    +90 (284) 236 00 00
                  </a>
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Hafta içi 09:00 - 18:00
                </p>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(156, 30, 36, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255, 152, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <MdQuestionAnswer size={32} style={{ color: '#FF9800' }} />
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--dark)' }}>Canlı Destek</h3>
                <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Anında yanıt alın
                </p>
                <button
                  style={{
                    background: 'var(--edirne)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Sohbet Başlat
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Support Form */}
              <div style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(156, 30, 36, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--dark)' }}>
                  Destek Talebi Oluştur
                </h3>
                
                {success && (
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    borderRadius: '10px',
                    color: '#4CAF50',
                    marginBottom: '1.5rem'
                  }}>
                    ✓ Talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem', color: 'var(--dark)' }}>
                      Konu
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      placeholder="Örn: Sipariş iadesi"
                      style={{
                        width: '100%',
                        padding: '0.875rem',
                        border: '2px solid rgba(156, 30, 36, 0.1)',
                        borderRadius: '10px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem', color: 'var(--dark)' }}>
                      Mesajınız
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      placeholder="Lütfen detaylı bir şekilde açıklayın..."
                      style={{
                        width: '100%',
                        padding: '0.875rem',
                        border: '2px solid rgba(156, 30, 36, 0.1)',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      background: 'var(--edirne)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.6 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <MdSend size={20} />
                    {submitting ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </form>
              </div>

              {/* FAQ */}
              <div>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--dark)', fontSize: '1.5rem' }}>
                  Sık Sorulan Sorular
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(156, 30, 36, 0.08)',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
                      }}
                    >
                      <h4 style={{
                        margin: '0 0 0.75rem 0',
                        color: 'var(--dark)',
                        fontSize: '1.05rem',
                        fontWeight: 600
                      }}>
                        {faq.question}
                      </h4>
                      <p style={{
                        margin: 0,
                        color: 'var(--muted)',
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
