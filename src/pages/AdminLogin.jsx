import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Admin şifresi - .env dosyasından alınıyor
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/panel");
    } else {
      setError("Yanlış şifre!");
      setPassword("");
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
                  Şifre
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin şifresini girin"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    border: '1px solid rgba(156, 30, 36, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                  autoFocus
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
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
