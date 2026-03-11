/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "../services/api";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaShare } from "react-icons/fa";
import ProductRecommendations from "../components/ProductRecommendations";

export default function ProductDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const shareProduct = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(product.title);
    const text = encodeURIComponent(`${product.title} - ${product.price}`);
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Ürün bulunamadı');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <p style={{textAlign: 'center'}}>Yükleniyor...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="section">
        <div className="container">
          <h2>Ürün bulunamadı</h2>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section">
        <Helmet>
          <title>{product.title} | Edirne Kırmızısı</title>
          <meta name="description" content={product.description ? product.description.substring(0, 160) : 'Edirne Kırmızısı - ' + product.title} />
          <meta property="og:title" content={product.title + ' | Edirne Kırmızısı'} />
          <meta property="og:description" content={product.description ? product.description.substring(0, 160) : ''} />
          {product.imageUrl && <meta property="og:image" content={product.imageUrl} />}
        </Helmet>
      <div className="container">
        <div style={{display:'flex', gap:32, alignItems:'flex-start', flexWrap:'wrap'}}>
          <div style={{flex:'0 0 400px', maxWidth:'100%'}}>
            {/* Main Image Display */}
            <div style={{position: 'relative', marginBottom: '1rem'}}>
              <img 
                src={(product.images && product.images[currentImageIndex]) || product.imageUrl || product.img} 
                alt={product.title} 
                style={{
                  width:'100%', 
                  borderRadius:16, 
                  boxShadow:'0 12px 40px rgba(156, 30, 36, 0.12)',
                  border: '1px solid rgba(156, 30, 36, 0.08)',
                  height: '400px',
                  objectFit: 'cover'
                }} 
              />
              
              {/* Navigation Arrows - Only show if multiple images */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      fontSize: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      color: 'var(--edirne)'
                    }}
                  >‹</button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      fontSize: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      color: 'var(--edirne)'
                    }}
                  >›</button>
                  
                  {/* Image Counter */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
                gap: '0.5rem'
              }}>
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: '100%',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: currentImageIndex === idx ? '3px solid var(--edirne)' : '1px solid #ddd',
                      opacity: currentImageIndex === idx ? 1 : 0.6,
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div style={{flex:1, minWidth:'300px'}}>
            <h1 style={{
              fontFamily:'var(--font-serif)', 
              color:'var(--edirne)',
              fontSize: '2rem',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              {product.title}
            </h1>
            <p style={{
              color:'var(--edirne)', 
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem'
            }}>
              {product.price}
            </p>
            
            {product.description && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(250, 248, 243, 0.8) 0%, rgba(231, 216, 201, 0.2) 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(156, 30, 36, 0.08)',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--dark)',
                  marginTop: 0,
                  marginBottom: '0.75rem'
                }}>
                  Ürün Açıklaması
                </h3>
                <p style={{
                  color:'var(--muted)', 
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {product.description}
                </p>
              </div>
            )}
            
            {/* Social Sharing */}
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                <FaShare style={{ color: 'var(--edirne)' }} />
                <span style={{ fontWeight: 600, color: 'var(--dark)' }}>Paylaş</span>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.75rem'
              }}>
                <button
                  onClick={() => shareProduct('facebook')}
                  style={{
                    background: '#1877f2',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <FaFacebook /> Facebook
                </button>
                <button
                  onClick={() => shareProduct('twitter')}
                  style={{
                    background: '#1da1f2',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <FaTwitter /> Twitter
                </button>
                <button
                  onClick={() => shareProduct('whatsapp')}
                  style={{
                    background: '#25d366',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <FaWhatsapp /> WhatsApp
                </button>
                <button
                  onClick={() => shareProduct('linkedin')}
                  style={{
                    background: '#0077b5',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <FaLinkedin /> LinkedIn
                </button>
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div style={{
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <label style={{
                fontWeight: 600,
                color: 'var(--dark)',
                fontSize: '1.05rem'
              }}>
                Adet:
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid var(--edirne)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: 'var(--edirne)',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  -
                </button>
                <span style={{
                  padding: '8px 24px',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  borderLeft: '1px solid #ddd',
                  borderRight: '1px solid #ddd'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stockCount && quantity >= product.stockCount}
                  style={{
                    background: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    cursor: product.stockCount && quantity >= product.stockCount ? 'not-allowed' : 'pointer',
                    fontSize: '1.2rem',
                    color: 'var(--edirne)',
                    opacity: product.stockCount && quantity >= product.stockCount ? 0.5 : 1,
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!(product.stockCount && quantity >= product.stockCount)) {
                      e.target.style.background = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  +
                </button>
              </div>
              {product.stockCount && (
                <span style={{
                  color: product.stockCount < 10 ? '#dc3545' : '#666',
                  fontSize: '0.9rem'
                }}>
                  {product.stockCount} adet stokta
                </span>
              )}
            </div>
            
            {/* ADD TO CART DISABLED */}
            {/* <div style={{display:'flex', gap:12, marginTop:20, flexWrap:'wrap'}}>
              <button className="primary buy">Sepete Ekle</button>
              <button className="primary">Sepete Git</button>
            </div> */}
              <button className="primary" onClick={() => navigate('/urunler')} style={{
                background: 'var(--edirne)',
                color: 'white',
                border: '2px solid var(--edirne)',
                fontSize: '1.05rem',
                marginTop: 20
              }}>
                ← Geri Dön
              </button>
          </div>
        </div>
      </div>
    </section>

    <div className="container">
      <ProductRecommendations type="related" productId={id} limit={4} />
      <ProductRecommendations type="frequently-bought" productId={id} limit={4} />
    </div>
    </>
  );
}
