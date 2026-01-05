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

// Her ürün için özel bilgiler - title, description, price ve Trendyol URL'lerini buradan yönet
const products = [
  {
    id: 'urun-1',
    title: 'Edirne Kırmızısı Fular', // Ürün adını buraya yaz
    description: 'El yapımı, boyanmış premium fular. Yumuşak dokusu ve zamansız tasarımı ile her kombinle uyumlu.', // Ürün açıklaması
    price: '₺750', // Ürün fiyatı
    img: p1,
    images: [p1,p5], // Carousel için birden fazla fotoğraf ekleyebilirsiniz: [p1, p1_2, p1_3]
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-2',
    title: 'Klasik Bandana',
    description: 'Geleneksel motiflerle süslenmiş ipek şal. Özel günler ve günlük kullanım için ideal.',
    price: '₺450',
    img: p5,
    images: [p5],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-3',
    title: 'Baskılı Saten Saç Tokası',
    description: 'Klasik kare kesim fular. Farklı bağlama teknikleriyle çok yönlü kullanım.',
    price: '₺200',
    img: p7,
    images: [p7],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-4',
    title: 'Baskılı Fiyonk Toka',
    description: 'Sıcak tutan, şık görünüm sağlayan uzun boy fular.',
    price: '₺249',
    img: p9,
    images: [p9],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-5',
    title: 'Eşarp',
    description: 'Günlük kullanım için pratik ve şık bandana. Çeşitli renk seçenekleri.',
    price: 'Stokta Yok',
    img: p10,
    images: [p10],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-6',
    title: 'Fular',
    description: 'Lüks dokuma tekniği ile üretilmiş premium eşarp. Özel günler için.',
    price: 'Stokta Yok',
    img: p11,
    images: [p11],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-7',
    title: 'Desenli Eşarp',
    description: 'Geleneksel Türk motifleriyle süslenmiş özel tasarım fular.',
    price: 'Stokta Yok',
    img: p12,
    images: [p12],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-8',
    title: 'Eşarp',
    description: 'Parlak saten kumaştan üretilmiş zarif şal. Akşam kombinleri için mükemmel.',
    price: 'Stokta Yok',
    img: p13,
    images: [p13],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-9',
    title: 'Eşarp',
    description: 'Kalın dokulu, sıcak tutan kışlık fular. Soğuk havalarda stil ve konfor.',
    price: 'Stokta Yok',
    img: p14,
    images: [p14],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-10',
    title: 'Fular',
    description: 'Kompakt boyutu ile çanta askısı veya saç bandı olarak kullanılabilir.',
    price: 'Stokta Yok',
    img: p15,
    images: [p15],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-11',
    title: 'Muradiye Eşarp',
    description: 'Hafif ve havadar dokuma. Yaz ayları için ideal.',
    price: '₺800',
    img: p16,
    images: [p16],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-12',
    title: 'Muradiye Eşarp',
    description: 'Zamansız tasarımı ile her dolaba uyum sağlayan klasik eşarp.',
    price: '₺800',
    img: p17,
    images: [p17],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-13',
    title: 'Eşarp',
    description: 'El işi çiçek desenleriyle bezeli özel tasarım şal.',
    price: 'Stokta Yok',
    img: p18,
    images: [p18],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-14',
    title: 'Fular',
    description: 'Spor ve günlük aktiviteler için tasarlanmış pratik bandana.',
    price: 'Stokta Yok',
    img: p19,
    images: [p19],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-15',
    title: 'Mavi Çinili Fular',
    description: 'Modern geometrik desenlerle dekore edilmiş çağdaş fular.',
    price: 'Stokta Yok',
    img: p20,
    images: [p20],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-16',
    title: 'Klasik Fular',
    description: 'Nostaljik tasarımı ile dikkat çeken vintage tarzı şal.',
    price: 'Stokta Yok',
    img: p21,
    images: [p21],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-17',
    title: 'Mavi Çinili Fular',
    description: 'El işlemeli detaylarla zenginleştirilmiş özel koleksiyon fular.',
    price: '₺750',
    img: p22,
    images: [p22],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  },
  {
    id: 'urun-18',
    title: 'Klasik Desen Fular',
    description: 'Günlük şıklık için tasarlanmış rahat kullanımlı eşarp.',
    price: '₺750',
    img: p23,
    images: [p23],
    url: 'https://www.trendyol.com/magaza/edirne-kirmizisi-m-941682?channelId=1&sst=0'
  }
];

export default products;
