import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import products from "../data/products";

export default function ProductDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) return (
    <section className="section"><div className="container"><h2>Ürün bulunamadı</h2></div></section>
  );

  return (
    <section className="section">
      <Helmet><title>{product.title} | Edirne Kırmızısı</title></Helmet>
      <div className="container">
        <div style={{display:'flex', gap:32, alignItems:'flex-start', flexWrap:'wrap'}}>
          <div style={{flex:'0 0 400px', maxWidth:'100%'}}>
            <img 
              src={product.img} 
              alt={product.title} 
              style={{
                width:'100%', 
                borderRadius:16, 
                boxShadow:'0 12px 40px rgba(156, 30, 36, 0.12)',
                border: '1px solid rgba(156, 30, 36, 0.08)'
              }} 
            />
          </div>
          <div style={{flex:1, minWidth:'300px'}}>
            <h1 style={{
              fontFamily:'var(--font-serif)', 
              color:'var(--edirne)',
              fontSize: '2rem',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              {product.title}
            </h1>
            <p style={{
              color:'var(--edirne)', 
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem'
            }}>
              {product.price}
            </p>
            
            {product.description && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(250, 248, 243, 0.8) 0%, rgba(231, 216, 201, 0.2) 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(156, 30, 36, 0.08)',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--dark)',
                  marginTop: 0,
                  marginBottom: '0.75rem'
                }}>
                  Ürün Açıklaması
                </h3>
                <p style={{
                  color:'var(--muted)', 
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {product.description}
                </p>
              </div>
            )}
            
            <div style={{display:'flex', gap:12, marginTop:20, flexWrap:'wrap'}}>
              <a href={product.url} target="_blank" rel="noreferrer">
                <button className="primary buy" style={{fontSize: '1.05rem'}}>Trendyol'da Satın Al</button>
              </a>
              <button className="primary" onClick={() => navigate('/urunler')} style={{
                background: 'transparent',
                color: 'var(--edirne)',
                border: '2px solid var(--edirne)',
                fontSize: '1.05rem'
              }}>
                ← Geri Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
