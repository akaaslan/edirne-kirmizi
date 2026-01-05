/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import g1 from '../assets/galeri/foti2.jpg';
import g2 from '../assets/galeri/foti24.jpg';
import g3 from '../assets/galeri/foti3.jpg';
import g4 from '../assets/galeri/foti4.jpg';
import g5 from '../assets/galeri/foti6.jpg';
import g6 from '../assets/galeri/foti8.jpg';

const images = [g1,g2,g3,g4,g6];

export default function HeroCarousel({ interval = 4000 }){
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i+1) % images.length), interval);
    return () => clearInterval(t);
  }, [interval]);

  return (
    <div className="hero-carousel" aria-hidden="true">
  <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={index}
                className="hero-slide"
                initial={{opacity:0.6, x: '100%'}}
                animate={{opacity:0.6, x: '0%'}}
                exit={{opacity:0.6, x: '-100%'}}
          transition={{duration:0.9}}
          style={{backgroundImage:`url(${images[index]})`}}
        />
      </AnimatePresence>
      <div className="hero-overlay" />
    </div>
  );
}
