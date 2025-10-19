import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const posts = [
  {slug:"renk-teorisi", title:"Edirne Kırmızısı ve Renk Teorisi", excerpt:"Rengin diğer tonlarla ilişkisi..."},
  {slug:"tasarim-ips", title:"Tasarımda Kullanım Örnekleri", excerpt:"İç mimaride ve tekstilde örnekler..."}
];

export default function Blog(){
  return (
    <>
      <Helmet><title>Blog | Edirne Kırmızısı</title></Helmet>
      <section className="section">
        <div className="container">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Blog</h2>
          <div style={{marginTop:12}}>
            {posts.map(p => (
              <article key={p.slug} className="card" style={{marginBottom:12}}>
                <h3>{p.title}</h3>
                <p style={{color:"var(--muted)"}}>{p.excerpt}</p>
                <Link to={`/blog/${p.slug}`}><button className="primary" style={{marginTop:8}}>Oku</button></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
