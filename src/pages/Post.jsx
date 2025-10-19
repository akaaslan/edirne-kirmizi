import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Post(){
  const { slug } = useParams();
  return (
    <>
      <Helmet><title>Blog | {slug}</title></Helmet>
      <section className="section">
        <div className="container">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>{slug.replace(/-/g," ")}</h2>
          <p style={{color:"var(--muted)", marginTop:12}}>Tam blog içeriği burada yer alacak — metin, görsel ve atıflar.</p>
        </div>
      </section>
    </>
  );
}
