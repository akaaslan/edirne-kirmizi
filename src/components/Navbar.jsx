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
  <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container bar">
        <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Link to="/" className="logo">
            <img src={logo} alt="Edirne Kirmizisi" style={{height:50, display:'block'}} />
          </Link>
        </motion.div>

        <nav>
          <ul className="nav-links">
            <motion.li whileHover={{ y: -3 }}><Link to="/hikaye">Hikâye</Link></motion.li>
            <motion.li whileHover={{ y: -3 }}><Link to="/urunler">Ürünler</Link></motion.li>
            <motion.li whileHover={{ y: -3 }}><Link to="/hakkimizda">Hakkımızda</Link></motion.li>
            <motion.li whileHover={{ y: -3 }}><Link to="/iletisim">İletişim</Link></motion.li>
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
            >
                <ul>
                  <li><Link to="/hikaye">Hikâye</Link></li>
                  <li><Link to="/urunler">Ürünler</Link></li>
                  <li><Link to="/hakkimizda">Hakkımızda</Link></li>
                  <li><Link to="/iletisim">İletişim</Link></li>
                </ul>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
