/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaFire, FaHeart, FaArrowRight } from 'react-icons/fa';
import '../styles/ProductRecommendations.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const ProductRecommendations = ({ type = 'trending', productId = null, userId = null, limit = 4, title = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = useCallback(async () => {
    try {
      let endpoint = '';
      
      switch (type) {
        case 'trending':
          endpoint = `/products/recommendations/trending?limit=${limit}`;
          break;
        case 'related':
          endpoint = `/products/${productId}/related?limit=${limit}`;
          break;
        case 'frequently-bought':
          endpoint = `/products/${productId}/frequently-bought-together?limit=${limit}`;
          break;
        case 'new-arrivals':
          endpoint = `/products/recommendations/new-arrivals?limit=${limit}`;
          break;
        case 'featured':
          endpoint = `/products/recommendations/featured?limit=${limit}`;
          break;
        case 'personalized':
          endpoint = `/products/recommendations/personalized/${userId}?limit=${limit}`;
          break;
        default:
          endpoint = `/products/recommendations/trending?limit=${limit}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, [type, productId, userId, limit]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const getTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'trending':
        return 'Popüler Ürünler';
      case 'related':
        return 'Benzer Ürünler';
      case 'frequently-bought':
        return 'Birlikte Alınanlar';
      case 'new-arrivals':
        return 'Yeni Gelenler';
      case 'featured':
        return 'Öne Çıkanlar';
      case 'personalized':
        return 'Size Özel Öneriler';
      default:
        return 'Önerilen Ürünler';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'trending':
        return <FaFire />;
      case 'new-arrivals':
        return <FaStar />;
      case 'personalized':
        return <FaHeart />;
      default:
        return <FaStar />;
    }
  };

  if (loading) {
    return (
      <div className="recommendations-section">
        <div className="loading">Yükleniyor...</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="recommendations-section">
      <div className="recommendations-header">
        <h2>
          {getIcon()} {getTitle()}
        </h2>
      </div>

      <div className="recommendations-grid">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="recommendation-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/urunler/${product.id}`} className="product-link">
              <div className="product-image">
                <img 
                  src={product.imageUrl || '/placeholder.jpg'} 
                  alt={product.title}
                  loading="lazy"
                />
                {!product.inStock && (
                  <div className="out-of-stock-badge">Stokta Yok</div>
                )}
              </div>

              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price} ₺</span>
                  <span className="view-details">
                    Detaylar <FaArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductRecommendations;
