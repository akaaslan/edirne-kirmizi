/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import g1 from "../assets/galeri/foti2.jpg";
import g2 from "../assets/galeri/foti3.jpg";
import g3 from "../assets/galeri/foti4.jpg";
import g4 from "../assets/galeri/foti6.jpg";
import g5 from "../assets/galeri/foti8.jpg";

const paragraphs = [
  `Edirne Kırmızısı, unutulmuş bir rengi yeniden canlandırma isteğiyle doğdu. Köklerini Edirne’nin yüzyıllar öncesinden taşıdığı bu özel tondan alan markamız, geçmişin inceliğini bugünün dünyasında yeniden var etme arzusuyla yola çıktı. Bizim için bu renk yalnızca bir pigment değil; bir kültürün, bir emeğin ve bir zarafet anlayışının sembolüdür.`,
  `Her bir ürünümüzde, tarihsel bir dokunuşun modern bir yoruma dönüşmesini hedefliyoruz. Eşarp, fular, bandana ve tokalarımız; sade formları, sürdürülebilir kumaşları ve yerel üretim anlayışıyla zamansız bir şıklığı temsil eder. Üretim sürecimiz yerel atölyelerde, el işçiliğiyle harmanlanarak şekillenir. Bu sayede her parça, hem bir zanaatkârın emeğini hem de yaşadığı toprakların ruhunu taşır.`,
  `Edirne Kırmızısı, geçmişi bugüne taşırken nostaljiye değil, sürekliliğe inanır. Çünkü biz, kültürün yaşatılarak var olabileceğini biliyoruz. Bu yüzden üretimimizin her aşamasında doğaya saygıyı, emeğe değeri ve yerel dayanışmayı önceliklendiriyoruz. Sürdürülebilirlik bizim için bir tercih değil, bir sorumluluktur.`,
  `Markamızın kalbinde “köklerden gelen zarafet” fikri yer alır. Renklerin, dokuların ve hikâyelerin bir araya geldiği her parça; hem bir kültürel mirası hem de modern bir yaşam biçimini yansıtır. Edirne Kırmızısı, yalnızca bir aksesuar markası değil; yerelden doğan, kültürü tasarımla buluşturan bir yaşam anlayışıdır.`,
  `Bugün olduğu gibi gelecekte de, attığımız her ilmekte, seçtiğimiz her tonda, dokunduğumuz her detayda aynı inançla ilerleyeceğiz: Zamanın ötesinde bir zarafet mümkün — ve biz onu Edirne’den ilhamla yeniden yaşatıyoruz.`
];

const images = [g1,g2,g3,g4,g5];

export default function Story(){
  return (
    <>
      <Helmet><title>Hikâye | Edirne Kırmızısı</title></Helmet>
      <motion.section className="section" initial={{opacity:0}} animate={{opacity:1}}>
        <div className="container reveal">
          <h2 style={{fontFamily:"var(--font-serif)", color:"var(--edirne)"}}>Marka Hikâyemiz</h2>

          <div style={{marginTop:"1rem"}}>
            {paragraphs.map((txt, i) => (
              <motion.div key={i} className="story-pair" initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{delay:0.06*i}}>
                <div className="story-media">
                  <img src={images[i % images.length]} alt={`Galeri ${i+1}`} />
                </div>
                <div className="story-body">
                  <p style={{color:"var(--muted)", marginBottom:12}}>{txt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
