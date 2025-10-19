import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const dummy = [
  {id: "esarp-1", title: "Eşarp - İnce İpek", price: "₺350"},
  {id: "bandana-1", title: "Bandana - Pamuklu", price: "₺120"},
  {id: "tok-1", title: "Ahşap Toka - El İşçiliği", price: "₺95"},
];

export default function Products(){
  return (
    <>
      <Helmet><title>Ürünler | Edirne Kırmızısı</title></Helmet>
      <section className="section">
        <div className="container reveal">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Koleksiyon</h2>
          <div className="grid" style={{marginTop:"1rem"}}>
            {dummy.map((p, i) => (
              <motion.article key={p.id} className="card" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:0.06*i}}>
                <h3>{p.title}</h3>
                <p style={{color:"var(--muted)"}}>{p.price}</p>
                <Link to={`/urunler/${p.id}`}><button className="primary" style={{marginTop:"0.8rem"}}>İncele</button></Link>
              </motion.article>
            ))}
          </div>
          <p style={{marginTop:"1rem", color:"var(--muted)"}}>Not: Bu site şu an için yalnızca tanıtım amaçlıdır; mağaza entegrasyonu şu an planlanmamıştır.</p>
        </div>
      </section>
    </>
  );
}
