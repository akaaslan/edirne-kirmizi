import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "../services/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await api.login({ username, password });
      
      // Check if we received a token
      if (!response || !response.token) {
        setError("Giriş yanıtında token bulunamadı!");
        return;
      }
      
      // Verify user has ADMIN role
      if (response.role !== 'ADMIN') {
        setError("Bu hesap admin yetkisine sahip değil.");
        return;
      }

      // Save token and user info
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem("adminUsername", response.username || username);
      localStorage.setItem("adminRole", response.role);
      localStorage.setItem("tokenTimestamp", Date.now().toString());
      
      // Small delay to ensure localStorage is written
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Use replace to avoid back button issues
      navigate("/admin/panel", { replace: true });
    } catch (error) {
      setError(error.message || "Giriş başarısız! Kullanıcı adı veya şifre hatalı.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Admin Giriş | Edirne Kırmızısı</title></Helmet>
      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #fff 0%, rgba(250, 248, 243, 0.6) 100%)',
            padding: '2.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(156, 30, 36, 0.08)',
            boxShadow: '0 12px 40px rgba(156, 30, 36, 0.08)'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--edirne)',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              Admin Girişi
            </h2>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: 'var(--dark)'
                }}>
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı adınızı girin"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    border: '1px solid rgba(156, 30, 36, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    background: '#fff',
                    marginBottom: '1rem'
                  }}
                  required
                  autoFocus
                />
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: 'var(--dark)'
                }}>
                  Şifre
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi girin"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    border: '1px solid rgba(156, 30, 36, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                  required
                />
              </div>

              {error && (
                <p style={{
                  color: 'var(--edirne)',
                  fontSize: '0.95rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontWeight: 600
                }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="primary"
                style={{ width: '100%', fontSize: '1.05rem' }}
                disabled={loading}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
