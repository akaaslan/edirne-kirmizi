/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdPerson, MdLogin, MdLogout, MdShoppingBag, MdLocalShipping, MdSupport } from "react-icons/md";
import logo from "../assets/logo-1cropped.png";

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll(){
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('userToken');
      const name = localStorage.getItem('userName');
      const role = localStorage.getItem('userRole');
      setIsLoggedIn(!!token);
      setUserName(name || '');
      setIsAdmin(role === 'ADMIN');
    };
    
    // Check on mount
    checkAuth();
    
    // Listen for storage events from other tabs
    window.addEventListener('storage', checkAuth);
    
    // Custom event for same-page updates
    const handleAuthChange = () => checkAuth();
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('userRole');
    // Also clear admin tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    setIsLoggedIn(false);
    setUserName('');
    setIsAdmin(false);
    setShowDropdown(false);
    
    // Trigger custom event
    window.dispatchEvent(new Event('authChange'));
    
    navigate('/');
  };
  return (
  <header className={`navbar ${scrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container bar">
        <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Link to="/" className="logo" aria-label="Edirne Kırmızısı Ana Sayfa">
            <img src={logo} alt="Edirne Kırmızısı Logo" style={{height:50, display:'block'}} width="auto" height="50" />
          </Link>
        </motion.div>

        <nav role="navigation" aria-label="Ana menü">
          <ul className="nav-links">
            <motion.li whileHover={{ y: -3 }}><Link to="/hikaye" aria-label="Hikâyemiz sayfasına git">Hikâye</Link></motion.li>
            <motion.li whileHover={{ y: -3 }}><Link to="/urunler" aria-label="Ürünler sayfasına git">Ürünler</Link></motion.li>
            <motion.li whileHover={{ y: -3 }}><Link to="/hakkimizda" aria-label="Hakkımızda sayfasına git">Hakkımızda</Link></motion.li>
            <motion.li whileHover={{ y: -3 }}><Link to="/iletisim" aria-label="İletişim sayfasına git">İletişim</Link></motion.li>
            
            {/* Shopping Cart - DISABLED */}
            {/* <motion.li whileHover={{ y: -3, scale: 1.05 }}>
              <Link to="/sepet" aria-label="Alışveriş sepeti">
                <FaShoppingCart size={20} />
              </Link>
            </motion.li> */}
            
            <motion.li 
              whileHover={{ y: -3 }}
              style={{ position: 'relative' }}
              onMouseEnter={() => isLoggedIn && setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {isLoggedIn ? (
                <>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    color: 'var(--dark)',
                    fontWeight: 500
                  }}>
                    <MdPerson size={20} />
                    <span>{userName}</span>
                  </div>
                  
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          marginTop: '0.5rem',
                          background: 'white',
                          borderRadius: '12px',
                          boxShadow: '0 8px 24px rgba(156, 30, 36, 0.15)',
                          border: '1px solid rgba(156, 30, 36, 0.1)',
                          minWidth: '200px',
                          overflow: 'hidden',
                          zIndex: 1000
                        }}
                      >
                        <Link 
                          to="/hesabim" 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1.25rem',
                            color: 'var(--dark)',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            borderBottom: '1px solid rgba(156, 30, 36, 0.05)'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(156, 30, 36, 0.05)'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <MdPerson size={18} />
                          <span>Profil</span>
                        </Link>
                        
                        {/* ORDERS DISABLED */}
                        {/* <Link to="/siparislerim">
                          <MdShoppingBag size={18} />
                          <span>Siparişler</span>
                        </Link> */}
                        
                        {/* <Link to="/kargo-takibi">
                          <MdLocalShipping size={18} />
                          <span>Kargo Takibi</span>
                        </Link> */}
                        
                        {isAdmin && (
                          <Link 
                            to="/admin/panel" 
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.875rem 1.25rem',
                              color: 'var(--edirne)',
                              textDecoration: 'none',
                              transition: 'all 0.2s',
                              fontWeight: 600,
                              borderBottom: '1px solid rgba(156, 30, 36, 0.05)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(156, 30, 36, 0.05)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <MdPerson size={18} />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        
                        <Link 
                          to="/destek" 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1.25rem',
                            color: 'var(--dark)',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            borderBottom: '1px solid rgba(156, 30, 36, 0.05)'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(156, 30, 36, 0.05)'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <MdSupport size={18} />
                          <span>Destek</span>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1.25rem',
                            color: 'var(--edirne)',
                            background: 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(156, 30, 36, 0.05)'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <MdLogout size={18} />
                          <span>Çıkış Yap</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link to="/giris" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MdLogin size={20} />
                  <span>Giriş</span>
                </Link>
              )}
            </motion.li>
          </ul>
        </nav>

        <button
          className="mobile-toggle"
          aria-expanded={open}
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setOpen(v => !v)}
        >
          <span className="hamburger" aria-hidden="true" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mobile-menu"
              onClick={() => setOpen(false)}
              role="navigation"
              aria-label="Mobil menü"
            >
                <ul>
                  <li><Link to="/hikaye" aria-label="Hikâyemiz sayfasına git">Hikâye</Link></li>
                  <li><Link to="/urunler" aria-label="Ürünler sayfasına git">Ürünler</Link></li>
                  <li><Link to="/hakkimizda" aria-label="Hakkımızda sayfasına git">Hakkımızda</Link></li>
                  <li><Link to="/iletisim" aria-label="İletişim sayfasına git">İletişim</Link></li>
                  {isLoggedIn ? (
                    <>
                      <li><Link to="/hesabim"><MdPerson size={18} style={{verticalAlign: 'middle', marginRight: '0.5rem'}} />Profil</Link></li>
                      {/* ORDERS & SHIPPING DISABLED */}
                      {/* <li><Link to="/siparislerim"><MdShoppingBag size={18} />Siparişler</Link></li> */}
                      {/* <li><Link to="/kargo-takibi"><MdLocalShipping size={18} />Kargo Takibi</Link></li> */}
                      {isAdmin && <li><Link to="/admin/panel" style={{color: 'var(--edirne)', fontWeight: 600}}><MdPerson size={18} style={{verticalAlign: 'middle', marginRight: '0.5rem'}} />Admin Panel</Link></li>}
                      <li><Link to="/destek"><MdSupport size={18} style={{verticalAlign: 'middle', marginRight: '0.5rem'}} />Destek</Link></li>
                      <li>
                        <button 
                          onClick={handleLogout}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--edirne)',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <MdLogout size={18} />Çıkış Yap
                        </button>
                      </li>
                    </>
                  ) : (
                    <li><Link to="/giris"><MdLogin size={18} style={{verticalAlign: 'middle', marginRight: '0.5rem'}} />Giriş Yap</Link></li>
                  )}
                </ul>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
