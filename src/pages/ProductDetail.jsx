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
        <div style={{display:'flex', gap:20, alignItems:'flex-start', flexWrap:'wrap'}}>
          <div style={{flex:'0 0 360px'}}>
            <img src={product.img} alt={product.title} style={{width:'100%', borderRadius:12}} />
          </div>
          <div style={{flex:1}}>
            <h2 style={{fontFamily:'var(--font-serif)', color:'var(--edirne)'}}>{product.title}</h2>
            <p style={{color:'var(--muted)', fontSize:18}}>{product.price}</p>
            <div style={{display:'flex', gap:8, marginTop:12}}>
              <a href={product.url} target="_blank" rel="noreferrer"><button className="primary buy">Trendyol'da Aç</button></a>
              <button className="primary" onClick={() => navigate('/urunler')}>Geri</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
