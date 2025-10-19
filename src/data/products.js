// Product data used by the Products page
// Update 'url' fields with real Trendyol product links when available
import p1 from "../assets/urunler/foti1.jpg";
import p5 from "../assets/urunler/foti5.jpg";
import p7 from "../assets/urunler/foti7.jpg";
import p9 from "../assets/urunler/foti9.jpg";
import p10 from "../assets/urunler/foti10.jpg";
import p11 from "../assets/urunler/foti11.jpg";
import p12 from "../assets/urunler/foti12.jpg";
import p13 from "../assets/urunler/foti13.jpg";
import p14 from "../assets/urunler/foti14.jpg";
import p15 from "../assets/urunler/foti15.jpg";
import p16 from "../assets/urunler/foti16.jpg";
import p17 from "../assets/urunler/foti17.jpg";
import p18 from "../assets/urunler/foti18.jpg";
import p19 from "../assets/urunler/foti19.jpg";
import p20 from "../assets/urunler/foti20.jpg";
import p21 from "../assets/urunler/foti21.jpg";
import p22 from "../assets/urunler/foti22.jpg";
import p23 from "../assets/urunler/foti23.jpg";

const imgs = [p1,p5,p7,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23];

// mapping of product id -> Trendyol URL (provided)
const urunLinkleri = {
  1: { id: 16, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  2: { id: 17, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  3: { id: 18, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  4: { id: 19, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  5: { id: 20, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  6: { id: 21, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  7: { id: 22, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  8: { id: 23, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  9: { id: 16, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  10: { id: 17, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  11: { id: 18, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  12: { id: 19, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  13: { id: 20, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  14: { id: 21, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  15: { id: 22, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  16: { id: 16, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  17: { id: 17, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  18: { id: 18, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  19: { id: 19, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  20: { id: 20, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  21: { id: 21, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  22: { id: 22, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
  23: { id: 23, url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0' },
};

const products = imgs.map((img, i) => {
  const num = i + 1;
  return {
    id: `urun-${num}`,
    title: `Ürün ${num}`,
    price: `₺${(120 + (num-1) * 15)}`,
    img,
    url: (urunLinkleri[num] && urunLinkleri[num].url) ? urunLinkleri[num].url : 'https://www.trendyol.com/'
  };
});

export default products;
