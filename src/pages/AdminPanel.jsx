import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import products from "../data/products";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [editedProducts, setEditedProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Admin kontrolü
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }

    // localStorage'dan güncellenmiş ürünleri al
    const saved = localStorage.getItem("productUpdates");
    if (saved) {
      const updates = JSON.parse(saved);
      const merged = products.map(p => ({
        ...p,
        ...(updates[p.id] || {})
      }));
      setEditedProducts(merged);
    } else {
      setEditedProducts(products);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/");
  };

  const handleEdit = (productId) => {
    setEditingId(productId);
  };

  const handleSave = (productId) => {
    // localStorage'a kaydet
    const updates = JSON.parse(localStorage.getItem("productUpdates") || "{}");
    const product = editedProducts.find(p => p.id === productId);
    updates[productId] = {
      title: product.title,
      description: product.description,
      price: product.price,
      url: product.url
    };
    localStorage.setItem("productUpdates", JSON.stringify(updates));
    setEditingId(null);
    alert("Ürün güncellendi! ✅");
  };

  const handleChange = (productId, field, value) => {
    setEditedProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, [field]: value } : p)
    );
  };

  return (
    <>
      <Helmet><title>Admin Panel | Edirne Kırmızısı</title></Helmet>
      <section className="section">
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--edirne)',
              margin: 0
            }}>
              Ürün Yönetimi
            </h1>
            <button
              onClick={handleLogout}
              className="primary"
              style={{
                background: 'transparent',
                color: 'var(--edirne)',
                border: '2px solid var(--edirne)'
              }}
            >
              Çıkış Yap
            </button>
          </div>

          <div style={{
            background: 'rgba(156, 30, 36, 0.05)',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '2rem',
            border: '1px solid rgba(156, 30, 36, 0.1)'
          }}>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
              ℹ️ Değişiklikler tarayıcınızda saklanır. Gerçek dosyalar değişmez.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {editedProducts.map(product => (
              <div
                key={product.id}
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, rgba(250, 248, 243, 0.6) 100%)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(156, 30, 36, 0.08)',
                  boxShadow: '0 4px 12px rgba(156, 30, 36, 0.06)'
                }}
              >
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flex: 1, minWidth: '300px' }}>
                    {editingId === product.id ? (
                      <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                            Ürün Adı
                          </label>
                          <input
                            type="text"
                            value={product.title}
                            onChange={(e) => handleChange(product.id, 'title', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid rgba(156, 30, 36, 0.2)',
                              borderRadius: '8px',
                              fontSize: '1rem'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                            Açıklama
                          </label>
                          <textarea
                            value={product.description}
                            onChange={(e) => handleChange(product.id, 'description', e.target.value)}
                            rows={3}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid rgba(156, 30, 36, 0.2)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              resize: 'vertical'
                            }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                              Fiyat
                            </label>
                            <input
                              type="text"
                              value={product.price}
                              onChange={(e) => handleChange(product.id, 'price', e.target.value)}
                              placeholder="₺450"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(156, 30, 36, 0.2)',
                                borderRadius: '8px',
                                fontSize: '1rem'
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                              Trendyol URL
                            </label>
                            <input
                              type="text"
                              value={product.url}
                              onChange={(e) => handleChange(product.id, 'url', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(156, 30, 36, 0.2)',
                                borderRadius: '8px',
                                fontSize: '0.9rem'
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button
                            onClick={() => handleSave(product.id)}
                            className="primary"
                            style={{ fontSize: '0.95rem' }}
                          >
                            💾 Kaydet
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="primary"
                            style={{
                              background: 'transparent',
                              color: 'var(--edirne)',
                              border: '2px solid var(--edirne)',
                              fontSize: '0.95rem'
                            }}
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 style={{
                          margin: '0 0 0.5rem 0',
                          fontSize: '1.25rem',
                          color: 'var(--dark)'
                        }}>
                          {product.title}
                        </h3>
                        <p style={{
                          color: 'var(--edirne)',
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          margin: '0 0 0.75rem 0'
                        }}>
                          {product.price}
                        </p>
                        <p style={{
                          color: 'var(--muted)',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          marginBottom: '1rem'
                        }}>
                          {product.description}
                        </p>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="primary"
                          style={{ fontSize: '0.95rem' }}
                        >
                          ✏️ Düzenle
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
