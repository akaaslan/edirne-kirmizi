/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import HeroCarousel from "../components/HeroCarousel";
import { Link } from "react-router-dom";
import { title } from "framer-motion/client";

export default function Home(){
  return (
    <>
      <Helmet>
        <title>Edirne Kırmızısı — Ana Sayfa</title>
        <meta name="description" content="Edirne Kırmızısı renginin tarihçesi, koleksiyonlar ve ilham veren kullanımlar."/>
      </Helmet>

      <main>
        <section className="hero">
          <HeroCarousel />
          <div className="container reveal">
            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.7}}>
              <h1 style={{color: 'var(--dark)'}}>Edirne Kırmızısı — Zamana Direnen Renk</h1>
              <p style={{color: 'rgba(0,0,0,0.9)', textAlign: 'center'}}>Osmanlı'dan günümüze uzanan, doğal pigmentlerin ve zanaatkârlığın izlerini taşıyan bu tonun hikâyesini keşfedin.</p>
              <Link to="/hikaye"><button className="primary">Hikâyeyi Keşfet</button></Link>
            </motion.div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Öne Çıkan Koleksiyonlar</h2>
            <div className="grid" style={{marginTop:"1rem"}}>
              {[{
                title: 'Eşarp & Fular',
                desc: 'Yumuşak dokular ve zamansız formlar.'
              },{
                title: 'Bandana & Tokalar',
                desc: 'Günlük kullanıma uygun, yerel işçilik.'
              },{
                title: 'Renk Örnekleri',
                desc: 'Pigment örnekleri ve bakım önerileri.'
              },{
                title   : 'Ev Dekorasyonu',
                desc    : 'Edirne Kırmızısı ile yaşam alanlarınızı renklendirin.'
              }].map((c, i) => (
                <motion.div key={c.title} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:0.08*i, duration:0.45}} className="card">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{background:"linear-gradient(180deg, rgba(0,0,0,0.02), transparent)"}}>
          <div className="container reveal">
            <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Neden Bu Renk?</h2>
            <p style={{maxWidth:720, color:"var(--muted)"}}>
              Edirne Kırmızısı, tarih boyunca törenlerde, tekstilde ve mimaride özel bir yer tutmuştur. Doğal pigmentler, zengin bir ton ve dayanıklılık sunar.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
