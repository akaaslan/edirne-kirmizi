import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Story from "./pages/Story";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
// Products and Blog pages removed for promo-only site
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
  <Route path="/hikaye" element={<Story />} />
  <Route path="/urunler" element={<Products />} />
  <Route path="/urunler/:id" element={<ProductDetail />} />
  {/* product and blog routes removed — site is promo-only */}
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="/gizlilik" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <Navbar />
        <main className="content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
