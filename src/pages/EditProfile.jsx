import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MdEdit, MdSave, MdCancel, MdPerson, MdEmail, MdPhone } from 'react-icons/md';
import { api } from '../services/api';

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    fullName: '',
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      navigate('/giris');
      return;
    }

    // Fetch user details from backend
    const fetchProfile = async () => {
      try {
        const user = await api.getUserProfile(userId);
        setFormData({
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          fullName: user.fullName || '',
        });
      } catch (err) {
        // Fallback to localStorage data
        setFormData({
          username: localStorage.getItem('userName') || '',
          email: localStorage.getItem('userEmail') || '',
          phone: localStorage.getItem('userPhone') || '',
          fullName: localStorage.getItem('userFullName') || '',
        });
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      await api.updateUserProfile(userId, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
      // Update localStorage with new data
      localStorage.setItem('userFullName', formData.fullName);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userPhone', formData.phone);
      setSuccess(true);
      setSaving(false);
      setTimeout(() => {
        setSuccess(false);
        navigate('/hesabim');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Profil güncellenirken bir hata oluştu');
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profili Düzenle | Edirne Kırmızısı</title>
      </Helmet>

      <section className="section" style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #faf8f3 0%, #fff 100%)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <MdEdit size={40} style={{ color: 'var(--edirne)' }} />
              <h1 style={{
                margin: 0,
                fontFamily: 'var(--font-serif)',
                color: 'var(--edirne)',
                fontSize: '2.5rem'
              }}>
                Profili Düzenle
              </h1>
            </div>

            {error && (
              <div style={{
                padding: '1.25rem',
                background: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                borderRadius: '12px',
                color: '#F44336',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '1.05rem',
                fontWeight: 600
              }}>
                ✕ {error}
              </div>
            )}

            {success && (
              <div style={{
                padding: '1.25rem',
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: '12px',
                color: '#4CAF50',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '1.05rem',
                fontWeight: 600
              }}>
                ✓ Profiliniz başarıyla güncellendi!
              </div>
            )}

            <div style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(156, 30, 36, 0.08)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.75rem' }}>
                {/* Personal Info Section */}
                <div>
                  <h3 style={{
                    margin: '0 0 1.25rem 0',
                    color: 'var(--dark)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <MdPerson size={24} />
                    Kişisel Bilgiler
                  </h3>
                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem', color: 'var(--dark)' }}>
                        Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        disabled
                        style={{
                          width: '100%',
                          padding: '0.875rem',
                          border: '2px solid rgba(156, 30, 36, 0.1)',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          background: '#f5f5f5',
                          color: '#999',
                          cursor: 'not-allowed'
                        }}
                      />
                      <small style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Kullanıcı adı değiştirilemez</small>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem', color: 'var(--dark)' }}>
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Adınız Soyadınız"
                        style={{
                          width: '100%',
                          padding: '0.875rem',
                          border: '2px solid rgba(156, 30, 36, 0.1)',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--edirne)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(156, 30, 36, 0.1)'}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info Section */}
                <div>
                  <h3 style={{
                    margin: '0 0 1.25rem 0',
                    color: 'var(--dark)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <MdEmail size={24} />
                    İletişim Bilgileri
                  </h3>
                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem', color: 'var(--dark)' }}>
                        E-posta
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ornek@email.com"
                        style={{
                          width: '100%',
                          padding: '0.875rem',
                          border: '2px solid rgba(156, 30, 36, 0.1)',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--edirne)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(156, 30, 36, 0.1)'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem', color: 'var(--dark)' }}>
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0532 123 45 67"
                        style={{
                          width: '100%',
                          padding: '0.875rem',
                          border: '2px solid rgba(156, 30, 36, 0.1)',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--edirne)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(156, 30, 36, 0.1)'}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      flex: 1,
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
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.6 : 1,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => !saving && (e.target.style.transform = 'translateY(-2px)')}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <MdSave size={22} />
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/hesabim')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      background: 'transparent',
                      color: 'var(--muted)',
                      border: '2px solid rgba(156, 30, 36, 0.2)',
                      padding: '1rem 1.5rem',
                      borderRadius: '12px',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.borderColor = 'var(--edirne)';
                      e.target.style.color = 'var(--edirne)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.borderColor = 'rgba(156, 30, 36, 0.2)';
                      e.target.style.color = 'var(--muted)';
                    }}
                  >
                    <MdCancel size={22} />
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
