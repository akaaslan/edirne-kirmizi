import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FaLock, FaCheckCircle } from 'react-icons/fa';
import '../styles/ResetPassword.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    if (!token) {
      setError('Geçersiz bağlantı');
      setVerifying(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/verify-reset-token?token=${token}`);
      if (!response.ok) throw new Error();
      setValidToken(true);
    } catch (err) {
      setError('Bu bağlantı geçersiz veya süresi dolmuş');
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/giris');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="reset-password-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Doğrulanıyor...</p>
        </div>
      </div>
    );
  }

  if (!validToken && !verifying) {
    return (
      <div className="reset-password-page">
        <motion.div
          className="error-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Geçersiz Bağlantı</h2>
          <p>{error}</p>
          <Link to="/sifremi-unuttum" className="retry-link">
            Yeni Bağlantı Talep Et
          </Link>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="reset-password-page">
        <motion.div
          className="success-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaCheckCircle className="success-icon" />
          <h2>Şifre Başarıyla Değiştirildi!</h2>
          <p>Yeni şifrenizle giriş yapabilirsiniz.</p>
          <p className="redirect-text">Giriş sayfasına yönlendiriliyorsunuz...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <motion.div
        className="reset-password-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Yeni Şifre Belirle</h1>
        <p className="description">
          Lütfen yeni şifrenizi girin
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Yeni Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="En az 6 karakter"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaLock /> Şifre Tekrar
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Şifrenizi tekrar girin"
              required
              minLength={6}
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
            {loading ? 'Kaydediliyor...' : 'Şifreyi Değiştir'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
