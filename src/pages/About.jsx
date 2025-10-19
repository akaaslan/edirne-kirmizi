/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function About(){
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity:0, y:10 }, visible: { opacity:1, y:0 } };

  return (
    <>
      <Helmet><title>Marka Hikâyesi | Edirne Kırmızısı</title></Helmet>
      <motion.section className="section" initial="hidden" animate="visible" variants={container}>
        <div className="container">
          <motion.h2 variants={item} style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Marka Hikâyemiz</motion.h2>

          <motion.div variants={item} style={{marginTop:12, maxWidth:920}}>
            <p style={{color:"var(--muted)", marginBottom:12}}>
              Edirne Kırmızısı, unutulmuş bir rengi yeniden canlandırma isteğiyle doğdu. Köklerini Edirne’nin yüzyıllar öncesinden taşıdığı bu özel tondan alan markamız, geçmişin inceliğini bugünün dünyasında yeniden var etme arzusuyla yola çıktı. Bizim için bu renk yalnızca bir pigment değil; bir kültürün, bir emeğin ve bir zarafet anlayışının sembolüdür.
            </p>

            <p style={{color:"var(--muted)", marginBottom:12}}>
              Her bir ürünümüzde, tarihsel bir dokunuşun modern bir yoruma dönüşmesini hedefliyoruz. Eşarp, fular, bandana ve tokalarımız; sade formları, sürdürülebilir kumaşları ve yerel üretim anlayışıyla zamansız bir şıklığı temsil eder. Üretim sürecimiz yerel atölyelerde, el işçiliğiyle harmanlanarak şekillenir. Bu sayede her parça, hem bir zanaatkârın emeğini hem de yaşadığı toprakların ruhunu taşır.
            </p>

            <p style={{color:"var(--muted)", marginBottom:12}}>
              Edirne Kırmızısı, geçmişi bugüne taşırken nostaljiye değil, sürekliliğe inanır. Çünkü biz, kültürün yaşatılarak var olabileceğini biliyoruz. Bu yüzden üretimimizin her aşamasında doğaya saygıyı, emeğe değeri ve yerel dayanışmayı önceliklendiriyoruz. Sürdürülebilirlik bizim için bir tercih değil, bir sorumluluktur.
            </p>

            <p style={{color:"var(--muted)", marginBottom:12}}>
              Markamızın kalbinde “köklerden gelen zarafet” fikri yer alır. Renklerin, dokuların ve hikâyelerin bir araya geldiği her parça; hem bir kültürel mirası hem de modern bir yaşam biçimini yansıtır. Edirne Kırmızısı, yalnızca bir aksesuar markası değil; yerelden doğan, kültürü tasarımla buluşturan bir yaşam anlayışıdır.
            </p>

            <p style={{color:"var(--muted)", marginBottom:12}}>
              Bugün olduğu gibi gelecekte de, attığımız her ilmekte, seçtiğimiz her tonda, dokunduğumuz her detayda aynı inançla ilerleyeceğiz: Zamanın ötesinde bir zarafet mümkün — ve biz onu Edirne’den ilhamla yeniden yaşatıyoruz.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
