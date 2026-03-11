import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../services/api';

export default function UserAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        const response = await api.login({
          username: formData.username,
          password: formData.password
        });
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userName', response.username);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userEmail', response.email || '');
        localStorage.setItem('userPhone', response.phone || '');
        localStorage.setItem('userFullName', response.fullName || '');
        localStorage.setItem('userRole', response.role);
        localStorage.setItem('tokenTimestamp', Date.now().toString()); // Token alındığı zaman
        
        // Trigger custom event to update navbar
        window.dispatchEvent(new Event('authChange'));
        
        navigate('/hesabim');
      } else {
        // Register
        await api.register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        alert('Hesap başarıyla oluşturuldu! Giriş yapabilirsiniz.');
        setIsLogin(true);
        setFormData({ username: formData.username, email: '', password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'} | Edirne Kırmızısı</title>
      </Helmet>
      
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div style={{
            maxWidth: '450px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #fff 0%, rgba(250, 248, 243, 0.8) 100%)',
            padding: '3rem',
            borderRadius: '16px',
            border: '1px solid rgba(156, 30, 36, 0.1)',
            boxShadow: '0 8px 32px rgba(156, 30, 36, 0.12)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--edirne)',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              {isLogin ? '🔐 Giriş Yap' : '✨ Kayıt Ol'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    border: '1px solid rgba(156, 30, 36, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {!isLogin && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      border: '1px solid rgba(156, 30, 36, 0.2)',
                      borderRadius: '10px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    border: '1px solid rgba(156, 30, 36, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {!isLogin && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                    Şifre Tekrar
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      border: '1px solid rgba(156, 30, 36, 0.2)',
                      borderRadius: '10px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              )}

              {error && (
                <div style={{
                  background: 'rgba(220, 53, 69, 0.1)',
                  color: '#dc3545',
                  padding: '0.875rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="primary"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.05rem',
                  marginTop: '0.5rem'
                }}
              >
                {loading ? 'İşleniyor...' : isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>

              {isLogin && (
                <div style={{ textAlign: 'right', marginTop: '0.75rem' }}>
                  <Link
                    to="/sifremi-unuttum"
                    style={{
                      color: 'var(--edirne)',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                  >
                    Şifremi Unuttum
                  </Link>
                </div>
              )}
            </form>

            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(156, 30, 36, 0.1)'
            }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
              </p>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--edirne)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  textDecoration: 'underline'
                }}
              >
                {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
