/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function About(){
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity:0, y:20 }, visible: { opacity:1, y:0, transition: { duration: 0.6 } } };
  const cardItem = { hidden: { opacity:0, scale: 0.95 }, visible: { opacity:1, scale: 1, transition: { duration: 0.5 } } };

  const values = [
    {
      icon: "🌿",
      title: "Sürdürülebilirlik",
      desc: "Doğaya saygıyı önceliklendiren üretim süreçleri ve çevre dostu malzemeler."
    },
    {
      icon: "🎨",
      title: "Yerel Üretim",
      desc: "El işçiliği ve yerel atölyelerde özenle üretilen her bir parça."
    },
    {
      icon: "⏳",
      title: "Zamansız Tasarım",
      desc: "Modayı aşan, kültürel mirasımızla modern estetiği birleştiren tasarımlar."
    },
    {
      icon: "💎",
      title: "Kalite",
      desc: "Premium kumaşlar ve titiz işçilikle ömür boyu kullanılacak ürünler."
    }
  ];

  return (
    <>
      <Helmet><title>Hakkımızda | Edirne Kırmızısı</title></Helmet>
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(156, 30, 36, 0.05) 0%, rgba(250, 248, 243, 0.8) 50%, rgba(231, 216, 201, 0.3) 100%)',
        padding: '4rem 0 3rem'
      }}>
        <motion.div 
          className="container" 
          initial="hidden" 
          animate="visible" 
          variants={container}
          style={{textAlign: 'center'}}
        >
          <motion.h1 
            variants={item}
            style={{
              fontFamily:"var(--font-serif)", 
              color:"var(--edirne)", 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}
          >
            Köklerden Gelen Zarafet
          </motion.h1>
          <motion.p 
            variants={item}
            style={{
              color:"var(--muted)", 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
              maxWidth: '700px', 
              margin: '0 auto 2rem',
              lineHeight: 1.6
            }}
          >
            Edirne Kırmızısı, unutulmuş bir rengi yeniden canlandırma isteğiyle doğdu. 
            Geçmişin inceliğini bugünün dünyasında yeniden var ediyoruz.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <motion.section 
        className="section"
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <div className="container" style={{maxWidth: '900px'}}>
          <motion.div variants={item} className="about-card" style={{marginBottom: '2rem'}}>
            <h2 style={{color: 'var(--edirne)', fontSize: '2rem', marginBottom: '1.5rem'}}>
              Hikâyemiz
            </h2>
            <p style={{color:"var(--dark)", marginBottom: '1.2rem', lineHeight: 1.8, fontSize: '1.05rem'}}>
              Edirne Kırmızısı, yüzyıllar öncesinden taşıdığı özel tondan ilham alan bir markadır. 
              Bu renk bizim için yalnızca bir pigment değil; bir kültürün, bir emeğin ve bir zarafet anlayışının sembolüdür.
            </p>
            <p style={{color:"var(--dark)", marginBottom: '1.2rem', lineHeight: 1.8, fontSize: '1.05rem'}}>
              Her bir ürünümüzde, tarihsel bir dokunuşun modern bir yoruma dönüşmesini hedefliyoruz. 
              Eşarp, fular, bandana ve tokalarımız; sade formları, sürdürülebilir kumaşları ve yerel üretim 
              anlayışıyla zamansız bir şıklığı temsil eder.
            </p>
            <p style={{color:"var(--dark)", marginBottom: 0, lineHeight: 1.8, fontSize: '1.05rem'}}>
              Üretim sürecimiz yerel atölyelerde, el işçiliğiyle harmanlanarak şekillenir. 
              Bu sayede her parça, hem bir zanaatkârın emeğini hem de yaşadığı toprakların ruhunu taşır.
            </p>
          </motion.div>

          <motion.div variants={item} className="about-card">
            <h2 style={{color: 'var(--edirne)', fontSize: '2rem', marginBottom: '1.5rem'}}>
              Felsefemiz
            </h2>
            <p style={{color:"var(--dark)", marginBottom: '1.2rem', lineHeight: 1.8, fontSize: '1.05rem'}}>
              Edirne Kırmızısı, geçmişi bugüne taşırken nostaljiye değil, sürekliliğe inanır. 
              Çünkü biz, kültürün yaşatılarak var olabileceğini biliyoruz.
            </p>
            <p style={{color:"var(--dark)", marginBottom: '1.2rem', lineHeight: 1.8, fontSize: '1.05rem'}}>
              Üretimimizin her aşamasında doğaya saygıyı, emeğe değeri ve yerel dayanışmayı önceliklendiriyoruz. 
              Sürdürülebilirlik bizim için bir tercih değil, bir sorumluluktur.
            </p>
            <p style={{color:"var(--dark)", marginBottom: 0, lineHeight: 1.8, fontSize: '1.05rem'}}>
              Markamızın kalbinde "köklerden gelen zarafet" fikri yer alır. Her parça; hem bir kültürel 
              mirası hem de modern bir yaşam biçimini yansıtır.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section style={{background: 'linear-gradient(180deg, rgba(250, 248, 243, 0.3) 0%, transparent 100%)', padding: '3rem 0'}}>
        <motion.div 
          className="container"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={container}
        >
          <motion.h2 
            variants={item}
            style={{
              fontFamily:"var(--font-serif)", 
              color:"var(--edirne)", 
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '3rem'
            }}
          >
            Değerlerimiz
          </motion.h2>
          
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {values.map((value, i) => (
              <motion.div 
                key={i}
                variants={cardItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className="value-card"
              >
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{value.icon}</div>
                <h3 style={{color: 'var(--edirne)', fontSize: '1.4rem', marginBottom: '0.75rem'}}>
                  {value.title}
                </h3>
                <p style={{color: 'var(--muted)', margin: 0, lineHeight: 1.6}}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, rgba(156, 30, 36, 0.03) 0%, rgba(231, 216, 201, 0.15) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(156, 30, 36, 0.1)',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--edirne)',
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>
            Hikâyemize Ortak Olun
          </h3>
          <p style={{color: 'var(--muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6}}>
            Zamanın ötesinde bir zarafet mümkün — ve biz onu Edirne'den ilhamla yeniden yaşatıyoruz.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/urunler" style={{textDecoration: 'none'}}>
              <button className="primary large">Koleksiyonu Keşfet</button>
            </a>
            <a href="/iletisim" style={{textDecoration: 'none'}}>
              <button className="primary large" style={{background: 'transparent', color: 'var(--edirne)', border: '2px solid var(--edirne)'}}>
                İletişime Geç
              </button>
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
