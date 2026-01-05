/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import HeroCarousel from "../components/HeroCarousel";
import { Link } from "react-router-dom";

// Koleksiyon fotoğrafları - src/assets/homescreengaleri/ klasörüne fotoğraflarınızı ekleyin
import esarpImg from "../assets/homescreengaleri/esarp.PNG";
// import bandanaImg from "../assets/homescreengaleri/bandana.jpg";
// import renkImg from "../assets/homescreengaleri/renk.jpg";
import kurumsalImg from "../assets/homescreengaleri/kurumsal.JPG";

export default function Home(){
  return (
    <>
      <Helmet>
        <title>Edirne Kırmızısı</title>
        <meta name="description" content="Edirne Kırmızısı - Osmanlı'dan günümüze uzanan geleneksel Türk dokuma sanatının modern yorumu. Özenle tasarlanmış fular, şal ve aksesuar koleksiyonumuzla zarafeti keşfedin." />
        <meta name="keywords" content="edirne kırmızısı, türk dokuma sanatı, geleneksel fular, ipek şal, osmanlı renkleri, el dokuması, yerel üretim, sürdürülebilir moda" />
        <link rel="canonical" href="https://www.edirnekirmizisi.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.edirnekirmizisi.com" />
        <meta property="og:title" content="Edirne Kırmızısı - Geleneksel Türk Dokuma Sanatı" />
        <meta property="og:description" content="Osmanlı'dan günümüze uzanan geleneksel dokuma sanatının modern yorumu" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Edirne Kırmızısı",
            "url": "https://www.edirnekirmizisi.com",
            "logo": "https://www.edirnekirmizisi.com/logo.png",
            "description": "Geleneksel Türk dokuma sanatının modern yorumu",
            "sameAs": [
              "https://instagram.com/edirnekirmizi",
              "https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@edirnekirmizi.com",
              "contactType": "Customer Service"
            }
          })}
        </script>
      </Helmet>

      <main>
        <section className="hero" aria-label="Ana banner">
          <HeroCarousel />
          <div className="container reveal">
              <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.7}}>
              <h1>Edirne Kırmızısı — Zamana Direnen Renk</h1>
              <p className="hero-sub">Osmanlı'dan günümüze uzanan, doğal pigmentlerin ve zanaatkârlığın izlerini taşıyan bu tonun hikâyesini keşfedin.</p>
              <div style={{display:'flex', gap:12, justifyContent:'center', marginTop:12}}>
                <Link to="/hikaye" aria-label="Hikâyeyi keşfet"><button className="primary">Hikâyeyi Keşfet</button></Link>
                <a href="https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0" target="_blank" rel="noreferrer noopener" aria-label="Trendyol mağazamızı ziyaret edin">
                  <button className="primary buy">Mağaza</button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section" aria-labelledby="collections-heading">
          <div className="container">
            <h2 id="collections-heading" style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Öne Çıkan Koleksiyonlar</h2>
            <div className="grid" style={{marginTop:"1rem"}}>
              {[{
                title: 'Eşarp & Fular',
                desc: 'Yumuşak dokular ve zamansız formlar.',
                img: esarpImg  // Fotoğraf eklemek için yorumu kaldırın
              },{
                title: 'Bandana & Tokalar',
                desc: 'Günlük kullanıma uygun, yerel işçilik.',
                // img: bandanaImg
              },{
                title: 'Renk Örnekleri',
                desc: 'Pigment örnekleri ve bakım önerileri.',
                // img: renkImg
              },{
                title: 'Kurumsal Hediyelik',
                desc: 'Edirne Kırmızısı koleksiyonlarımızdan istediğiniz seçeneklerle kurumsal hediyeleriniz özenle hazırlanır.',
                img: kurumsalImg
              }].map((c, i) => (
                <Link key={c.title} to="/urunler" style={{textDecoration:'none', color:'inherit'}} aria-label={`${c.title} koleksiyonunu inceleyin`}>
                  <motion.article 
                    initial={{opacity:0, y:8}} 
                    animate={{opacity:1, y:0}} 
                    whileHover={{ y:-6, scale:1.02 }} 
                    transition={{delay:0.08*i, duration:0.45}} 
                    className="card collection-card"
                    style={{overflow: 'hidden', padding: 0}}
                  >
                    {c.img && (
                      <div style={{
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden',
                        borderRadius: '12px 12px 0 0'
                      }}>
                        <img 
                          src={c.img} 
                          alt={c.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                    )}
                    <div style={{padding: '1.5rem'}}>
                      <h3>{c.title}</h3>
                      <p>{c.desc}</p>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{background:"linear-gradient(180deg, rgba(0,0,0,0.02), transparent)"}} aria-labelledby="why-heading">
          <div className="container reveal">
            <h2 id="why-heading" style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Neden Bu Renk?</h2>
            <p style={{maxWidth:720, color:"var(--muted)"}}>
              Edirne Kırmızısı, tarih boyunca törenlerde, tekstilde ve mimaride özel bir yer tutmuştur. Doğal pigmentler, zengin bir ton ve dayanıklılık sunar.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
