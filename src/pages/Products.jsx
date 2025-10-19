/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import products from "../data/products";

export default function Products(){
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(() => (typeof window !== 'undefined' && window.innerWidth <= 640 ? 10 : 9));
  const total = products.length;
  const pages = Math.ceil(total / perPage);
  // refs for pagination indicator
  const indicatorRef = useRef(null);
  const paginationContainerRef = useRef(null);
  const outerPaginationRef = useRef(null);

  // ensure current page is within bounds if perPage changes
  useEffect(() => {
    if (page > pages) setPage(pages || 1);
  }, [pages, page]);

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
  }, [page, pages]);

  // responsive perPage: 10 items on small screens, otherwise 9
  useEffect(() => {
    function onResize(){
      const small = window.innerWidth <= 640;
      setPerPage(small ? 10 : 9);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const start = (page-1)*perPage;
  const pageItems = products.slice(start, start + perPage);

  const container = { hidden: {opacity:0}, show: {opacity:1, transition:{staggerChildren:0.06}} };
  const itemVariants = { hidden:{opacity:0, y:8}, show:{opacity:1, y:0}, exit:{opacity:0, y:6} };

  return (
    <>
      <Helmet><title>Ürünler | Edirne Kırmızısı</title></Helmet>
      <section className="section">
        <div className="container reveal">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Koleksiyon</h2>
          <motion.div key={page} className="grid products-grid" style={{marginTop:"1rem"}} variants={container} initial="hidden" animate="show">
            <AnimatePresence initial={false} mode="popLayout">
            {pageItems.map((p, i) => (
              <motion.article key={p.id} className="card product-card" variants={itemVariants} exit="exit" layout>
                <div className="product-media">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="product-body">
                  <h3>{p.title}</h3>
                  <p style={{color:"var(--muted)"}}>{p.price}</p>
                  <div style={{display:'flex', gap:8, marginTop:12}}>
                    <Link to={`/urunler/${p.id}`}><button className="primary large">İncele</button></Link>
                  </div>
                </div>
              </motion.article>
            ))}
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
