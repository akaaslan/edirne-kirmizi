import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import '../styles/ForgotPassword.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="forgot-password-page">
        <motion.div
          className="success-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaCheckCircle className="success-icon" />
          <h2>E-posta Gönderildi!</h2>
          <p>Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.</p>
          <p className="info-text">Lütfen gelen kutunuzu kontrol edin.</p>
          <Link to="/giris" className="back-link">
            Giriş Sayfasına Dön
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page">
      <motion.div
        className="forgot-password-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Şifremi Unuttum</h1>
        <p className="description">
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> E-posta Adresi
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Gönderiliyor...' : 'Bağlantı Gönder'}
          </button>
        </form>

        <div className="links">
          <Link to="/giris">Giriş Sayfasına Dön</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
