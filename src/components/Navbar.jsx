/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo-1cropped.png";

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll(){
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
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
                </ul>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
