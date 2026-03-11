import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MdPerson, MdSupport, MdLogout, MdEdit } from 'react-icons/md';

export default function UserAccount() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');
    
    if (!token || !userName) {
      navigate('/giris');
      return;
    }
    
    setUser({ username: userName });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('tokenTimestamp');
    
    // Trigger custom event for Navbar
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  if (!user) {
    return (
      <section className="section">
        <div className="container">
          <p style={{ textAlign: 'center' }}>Yükleniyor...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Hesabım | Edirne Kırmızısı</title>
      </Helmet>
      
      <section className="section" style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #faf8f3 0%, #fff 100%)' }}>
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--edirne) 0%, rgba(156, 30, 36, 0.85) 100%)',
              padding: '2.5rem',
              borderRadius: '20px',
              marginBottom: '2rem',
              color: 'white',
              boxShadow: '0 10px 40px rgba(156, 30, 36, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <MdPerson size={48} />
                </div>
                <div style={{ flex: 1 }}>
                  <h1 style={{ 
                    margin: 0,
                    fontSize: '2rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-serif)'
                  }}>
                    Hoş geldiniz, {user.username}!
                  </h1>
                  <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '1.05rem' }}>
                    Hesap ayarlarınızı ve siparişlerinizi buradan yönetebilirsiniz
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { icon: MdSupport, title: 'Destek', desc: 'Yardım ve destek alın', link: '/destek', color: '#FF9800' },
                { icon: MdEdit, title: 'Profili Düzenle', desc: 'Bilgilerinizi güncelleyin', link: '/profil-duzenle', color: '#9C51B6' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(item.link)}
                  style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(156, 30, 36, 0.08)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(156, 30, 36, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${item.color}22, ${item.color}11)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <item.icon size={32} style={{ color: item.color }} />
                  </div>
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--dark)'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    color: 'var(--muted)',
                    fontSize: '0.95rem'
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Account Info */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(156, 30, 36, 0.08)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                margin: '0 0 1.5rem 0',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--dark)'
              }}>
                Hesap Bilgileri
              </h3>
              <div style={{
                padding: '1.5rem',
                background: 'rgba(250, 248, 243, 0.5)',
                borderRadius: '12px',
                border: '1px solid rgba(156, 30, 36, 0.05)'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Kullanıcı Adı</strong>
                  <p style={{
                    margin: '0.5rem 0 0 0',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--dark)'
                  }}>
                    {user.username}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'transparent',
                border: '2px solid var(--edirne)',
                color: 'var(--edirne)',
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--edirne)';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--edirne)';
              }}
            >
              <MdLogout size={22} />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
