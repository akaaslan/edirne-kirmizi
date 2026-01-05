/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import products from "../data/products";
import ProductCardCarousel from "../components/ProductCardCarousel";

export default function Products(){
  console.log("PRODUCTS COMPONENT RENDERING");
  // Restore page from localStorage
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem('productsPage');
    return saved ? parseInt(saved) : 1;
  });
  const [gridSize, setGridSize] = useState(3); // 2, 3, or 4 columns
  const [sortBy, setSortBy] = useState('default'); // default, price-asc, price-desc, name-asc, name-desc
  
  // Save page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('productsPage', page.toString());
  }, [page]);
  
  // perPage based on gridSize: 4 cols = 12 items, 3 cols = 9 items, 2 cols = 8 items
  const perPage = gridSize === 4 ? 12 : gridSize === 2 ? 8 : 9;
  
  const total = products.length;
  const pages = Math.ceil(total / perPage);
  // refs for pagination indicator
  const indicatorRef = useRef(null);
  const paginationContainerRef = useRef(null);
  const outerPaginationRef = useRef(null);

  // ensure current page is within bounds if perPage changes
  useEffect(() => {
    if (page > pages) setPage(pages || 1);
  }, [page, pages, gridSize]);

  // position indicator under active page button; responsive to resize
  useEffect(() => {
    function positionIndicator(){
      const inner = paginationContainerRef.current;
      const indicator = indicatorRef.current;
      if (!inner || !indicator) return;
      const active = inner.querySelector('.page-btn.active');
      if (!active) { indicator.style.opacity = '0'; return }
      const indicatorHalf = Math.round(indicator.offsetWidth / 2) || 6;
      // use offsetLeft/offsetWidth relative to the inner container (more robust than viewport math)
      const left = active.offsetLeft + (active.offsetWidth / 2) - indicatorHalf;
      indicator.style.transform = `translateX(${left}px)`;
      indicator.style.opacity = '1';
    }
    positionIndicator();
    window.addEventListener('resize', positionIndicator);
    const ro = new ResizeObserver(positionIndicator);
    if (paginationContainerRef.current) ro.observe(paginationContainerRef.current);
    return () => { window.removeEventListener('resize', positionIndicator); ro.disconnect(); };
  }, [page, pages, gridSize]);

  // Sort products based on selected option, with out-of-stock items always at the end
  const sortedProducts = [...products].sort((a, b) => {
    const aOutOfStock = a.price.toLowerCase().includes('stokta yok');
    const bOutOfStock = b.price.toLowerCase().includes('stokta yok');
    
    // Always push out-of-stock items to the end
    if (aOutOfStock && !bOutOfStock) return 1;
    if (!aOutOfStock && bOutOfStock) return -1;
    
    // Both in stock or both out of stock - apply normal sorting
    if (sortBy === 'price-asc') {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price-desc') {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
      return priceB - priceA;
    }
    if (sortBy === 'name-asc') {
      return a.title.localeCompare(b.title, 'tr');
    }
    if (sortBy === 'name-desc') {
      return b.title.localeCompare(a.title, 'tr');
    }
    return 0; // default order
  });

  const start = (page-1)*perPage;
  const pageItems = sortedProducts.slice(start, start + perPage);

  const container = { hidden: {opacity:0}, show: {opacity:1, transition:{staggerChildren:0.06}} };
  const itemVariants = { hidden:{opacity:0, y:8}, show:{opacity:1, y:0}, exit:{opacity:0, y:6} };

  return (
    <>
      <Helmet><title>Ürünler | Edirne Kırmızısı</title></Helmet>
      <section className="section">
        <div className="container reveal">
          <h2 style={{
            fontFamily:"var(--font-serif)", 
            color:"var(--edirne)",
            position: "relative",
            display: "inline-block",
            paddingBottom: "0.5rem"
          }}>
            Koleksiyon
            <span style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "60%",
              height: "3px",
              background: "linear-gradient(90deg, var(--edirne) 0%, rgba(156, 30, 36, 0.3) 100%)",
              borderRadius: "2px"
            }}></span>
          </h2>

          {/* Controls for grid size and sorting */}
          <div className="products-controls" style={{marginTop: "1.5rem", marginBottom: "1rem"}}>
            <div style={{display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between"}}>
              {/* Grid Size Controls */}
              <div style={{display: "flex", gap: "0.5rem", alignItems: "center"}}>
                <span style={{color: "var(--muted)", fontSize: "0.9rem", marginRight: "0.25rem"}}>Görünüm:</span>
                <button 
                  className={`grid-btn ${gridSize === 2 ? 'active' : ''}`}
                  onClick={() => setGridSize(2)}
                  aria-label="2 sütun"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="18"/>
                    <rect x="14" y="3" width="7" height="18"/>
                  </svg>
                </button>
                <button 
                  className={`grid-btn ${gridSize === 3 ? 'active' : ''}`}
                  onClick={() => setGridSize(3)}
                  aria-label="3 sütun"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="4" height="18"/>
                    <rect x="10" y="3" width="4" height="18"/>
                    <rect x="17" y="3" width="4" height="18"/>
                  </svg>
                </button>
                <button 
                  className={`grid-btn ${gridSize === 4 ? 'active' : ''}`}
                  onClick={() => setGridSize(4)}
                  aria-label="4 sütun"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="3" height="18"/>
                    <rect x="9" y="3" width="3" height="18"/>
                    <rect x="15" y="3" width="3" height="18"/>
                    <rect x="21" y="3" width="0" height="18"/>
                    <rect x="20" y="3" width="1" height="18"/>
                  </svg>
                </button>
              </div>

              {/* Sorting Controls */}
              <div style={{display: "flex", gap: "0.5rem", alignItems: "center"}}>
                <span style={{color: "var(--muted)", fontSize: "0.9rem", marginRight: "0.25rem"}}>Sırala:</span>
                <select 
                  className="sort-select"
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Varsayılan</option>
                  <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                  <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                  <option value="name-asc">İsim: A-Z</option>
                  <option value="name-desc">İsim: Z-A</option>
                </select>
              </div>
            </div>
          </div>

          <motion.div key={`${page}-${gridSize}-${sortBy}`} className={`grid products-grid grid-${gridSize}`} style={{marginTop:"1rem"}} variants={container} initial="hidden" animate="show">
            <AnimatePresence initial={false} mode="popLayout">
            {pageItems.map((p, i) => {
              const isOutOfStock = p.price.toLowerCase().includes('stokta yok');
              return (
              <Link key={p.id} to={`/urunler/${p.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <motion.article className={`card product-card ${isOutOfStock ? 'out-of-stock' : ''}`} variants={itemVariants} exit="exit" layout>
                  <div className="product-media">
                    <ProductCardCarousel images={p.images || [p.img]} alt={p.title} isOutOfStock={isOutOfStock} />
                  </div>
                    <div className="product-body">
                    <h3 style={isOutOfStock ? {opacity: 0.6} : {}}>{p.title}</h3>
                    <p style={isOutOfStock ? {color: "var(--edirne)", fontWeight: 600} : {color:"var(--muted)"}}>{p.price}</p>
                    <div className="product-actions">
                      <button className="primary large" style={isOutOfStock ? {opacity: 0.5} : {}}>İncele</button>
                    </div>
                  </div>
                </motion.article>
              </Link>
            )})}
            </AnimatePresence>
          </motion.div>

          <div ref={outerPaginationRef} style={{display:'flex', justifyContent:'center', marginTop:20, position:'relative'}} className="pagination">
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <button className="primary" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Önceki</button>
              <div ref={paginationRef => {
                /* attach to outer element via ref hook below */
                if (paginationRef) paginationContainerRef.current = paginationRef;
              }} style={{display:'flex', gap:8, alignItems:'center', margin:'0 12px', position:'relative'}}>
                {Array.from({length:pages}).map((_,i) => (
                  <button
                    key={i}
                    className={`primary page-btn ${page===i+1 ? 'active' : ''}`}
                    onClick={() => setPage(i+1)}
                    aria-current={page===i+1 ? 'page' : undefined}
                  >{i+1}</button>
                ))}
                <div ref={indicatorRef} className="indicator" aria-hidden="true" />
              </div>
              <button className="primary" onClick={() => setPage(p => Math.min(pages, p+1))} disabled={page===pages}>Sonraki</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
