import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { MdAdd, MdEdit, MdDelete, MdSave, MdClose, MdImage, MdInventory } from 'react-icons/md';

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    imageUrl: '',
    images: [],
    trendyolUrl: '',
    stockCount: 0
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.getAllProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    setEditingId(productId);
  };

  const handleSave = async (productId) => {
    try {
      const product = products.find(p => p.id === productId);
      await api.updateProduct(productId, product);
      setEditingId(null);
      alert("Ürün başarıyla güncellendi! ✅");
      fetchProducts();
    } catch (err) {
      alert("Ürün güncellenirken bir hata oluştu! ❌");
      console.error('Error updating product:', err);
    }
  };

  const handleChange = (productId, field, value) => {
    setProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, [field]: value } : p)
    );
  };

  const handleDelete = async (productId) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      await api.deleteProduct(productId);
      alert("Ürün başarıyla silindi! ✅");
      fetchProducts();
    } catch (err) {
      alert("Ürün silinirken bir hata oluştu! ❌");
      console.error('Error deleting product:', err);
    }
  };

  const handleImageUpload = async (file, isNewProduct = false, productId = null) => {
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const imageUrl = await api.uploadImage(file);
      
      if (isNewProduct) {
        setNewProduct(prev => ({ 
          ...prev, 
          imageUrl: imageUrl,
          images: prev.images.length > 0 ? prev.images : [imageUrl]
        }));
      } else if (productId) {
        setProducts(prev =>
          prev.map(p => p.id === productId ? { 
            ...p, 
            imageUrl: imageUrl,
            images: p.images?.length > 0 ? p.images : [imageUrl]
          } : p)
        );
      }
      
      alert("Resim başarıyla yüklendi! ✅");
    } catch (err) {
      alert("Resim yüklenirken bir hata oluştu! ❌");
      console.error('Error uploading image:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleMultipleImageUpload = async (files, isNewProduct = false, productId = null) => {
    if (!files || files.length === 0) return;
    
    setUploadingImage(true);
    try {
      const imageUrls = await api.uploadMultipleImages(files);
      
      if (isNewProduct) {
        setNewProduct(prev => ({ 
          ...prev, 
          imageUrl: prev.imageUrl || imageUrls[0],
          images: [...(prev.images || []), ...imageUrls]
        }));
      } else if (productId) {
        setProducts(prev =>
          prev.map(p => p.id === productId ? { 
            ...p, 
            imageUrl: p.imageUrl || imageUrls[0],
            images: [...(p.images || []), ...imageUrls]
          } : p)
        );
      }
      
      alert(`${imageUrls.length} resim başarıyla yüklendi! ✅`);
    } catch (err) {
      alert("Resimler yüklenirken bir hata oluştu! ❌");
      console.error('Error uploading images:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (imageUrl, isNewProduct = false, productId = null) => {
    if (isNewProduct) {
      setNewProduct(prev => {
        const newImages = prev.images.filter(img => img !== imageUrl);
        return {
          ...prev,
          images: newImages,
          imageUrl: imageUrl === prev.imageUrl ? (newImages[0] || '') : prev.imageUrl
        };
      });
    } else if (productId) {
      setProducts(prev =>
        prev.map(p => {
          if (p.id === productId) {
            const newImages = p.images.filter(img => img !== imageUrl);
            return {
              ...p,
              images: newImages,
              imageUrl: imageUrl === p.imageUrl ? (newImages[0] || '') : p.imageUrl
            };
          }
          return p;
        })
      );
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.title || !newProduct.price) {
      alert("Lütfen en az ürün adı ve fiyat giriniz!");
      return;
    }

    try {
      await api.createProduct(newProduct);
      alert("Ürün başarıyla oluşturuldu! ✅");
      setShowCreateForm(false);
      setNewProduct({
        title: '',
        category: '',
        description: '',
        price: '',
        imageUrl: '',
        images: [],
        trendyolUrl: '',
        stockCount: 0
      });
      fetchProducts();
    } catch (err) {
      alert("Ürün oluşturulurken bir hata oluştu! ❌");
      console.error('Error creating product:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          margin: 0,
          color: 'var(--dark)'
        }}>
          Ürün Yönetimi
        </h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: showCreateForm ? 'transparent' : '#7a1419',
            color: showCreateForm ? '#7a1419' : '#fff',
            border: '2px solid #7a1419',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          {showCreateForm ? <><MdClose size={20} /> İptal</> : <><MdAdd size={20} /> Yeni Ürün</>}
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            marginBottom: '1.5rem',
            color: 'var(--dark)'
          }}>
            Yeni Ürün Oluştur
          </h3>
          
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {/* Main Image */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                <MdImage size={18} /> Ana Resim
              </label>
              {newProduct.imageUrl && (
                <img 
                  src={newProduct.imageUrl} 
                  alt="Ana resim" 
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '0.75rem',
                    border: '2px solid var(--edirne)'
                  }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0], true)}
                disabled={uploadingImage}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  display: 'block',
                  width: '100%'
                }}
              />
            </div>
            
            {/* Additional Images */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                <MdImage size={18} /> Ek Resimler (Galeri)
              </label>
              
              {newProduct.images && newProduct.images.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  {newProduct.images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img 
                        src={img} 
                        alt={`Preview ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: img === newProduct.imageUrl ? '3px solid var(--edirne)' : '1px solid #ddd'
                        }}
                      />
                      {img === newProduct.imageUrl && (
                        <span style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          background: 'var(--edirne)',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}>ANA</span>
                      )}
                      <button
                        onClick={() => handleRemoveImage(img, true)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >×</button>
                    </div>
                  ))}
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleMultipleImageUpload(e.target.files, true)}
                disabled={uploadingImage}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  display: 'block',
                  width: '100%'
                }}
              />
              {uploadingImage && <p style={{ color: '#6c757d', fontSize: '0.85rem', marginTop: '0.5rem' }}>Yükleniyor...</p>}
            </div>

            {/* Product Details */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                Ürün Adı *
              </label>
              <input
                type="text"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                placeholder="Örn: Edirne Kırmızısı Fular"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                Kategori
              </label>
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                placeholder="Örn: Fular, Eşarp, Şal"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
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
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                rows={3}
                placeholder="Ürün açıklaması..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  Fiyat *
                </label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="₺850"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  <MdInventory size={18} /> Stok Sayısı
                </label>
                <input
                  type="number"
                  value={newProduct.stockCount}
                  onChange={(e) => setNewProduct({ ...newProduct, stockCount: parseInt(e.target.value) || 0 })}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                Trendyol URL
              </label>
              <input
                type="text"
                value={newProduct.trendyolUrl}
                onChange={(e) => setNewProduct({ ...newProduct, trendyolUrl: e.target.value })}
                placeholder="https://www.trendyol.com/..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <button
              onClick={handleCreateProduct}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem',
                background: 'var(--edirne)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
                marginTop: '0.5rem'
              }}
            >
              <MdAdd size={20} /> Ürünü Oluştur
            </button>
          </div>
        </div>
      )}

      {/* Products List */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <img
                src={product.imageUrl || product.img}
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
                        Ana Resim
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0], false, product.id)}
                        disabled={uploadingImage}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          width: '100%'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                        Ek Resimler
                      </label>
                      
                      {product.images && product.images.length > 0 && (
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                          gap: '0.5rem',
                          marginBottom: '0.75rem'
                        }}>
                          {product.images.map((img, idx) => (
                            <div key={idx} style={{ position: 'relative' }}>
                              <img 
                                src={img} 
                                alt={`Preview ${idx + 1}`}
                                style={{
                                  width: '100%',
                                  height: '80px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                  border: img === product.imageUrl ? '2px solid var(--edirne)' : '1px solid #ddd'
                                }}
                              />
                              {img === product.imageUrl && (
                                <span style={{
                                  position: 'absolute',
                                  top: '2px',
                                  left: '2px',
                                  background: 'var(--edirne)',
                                  color: 'white',
                                  padding: '1px 4px',
                                  borderRadius: '3px',
                                  fontSize: '0.6rem',
                                  fontWeight: 'bold'
                                }}>ANA</span>
                              )}
                              <button
                                onClick={() => handleRemoveImage(img, false, product.id)}
                                style={{
                                  position: 'absolute',
                                  top: '2px',
                                  right: '2px',
                                  background: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                  fontSize: '0.7rem'
                                }}
                              >×</button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleMultipleImageUpload(e.target.files, false, product.id)}
                        disabled={uploadingImage}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          width: '100%'
                        }}
                      />
                      {uploadingImage && <p style={{ color: '#6c757d', fontSize: '0.85rem', marginTop: '0.5rem' }}>Yükleniyor...</p>}
                    </div>
                    
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
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                        Kategori
                      </label>
                      <input
                        type="text"
                        value={product.category || ''}
                        onChange={(e) => handleChange(product.id, 'category', e.target.value)}
                        placeholder="Örn: Fular, Eşarp, Şal"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #ddd',
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
                          border: '1px solid #ddd',
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
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                          Stok Sayısı
                        </label>
                        <input
                          type="number"
                          value={product.stockCount || 0}
                          onChange={(e) => handleChange(product.id, 'stockCount', parseInt(e.target.value) || 0)}
                          min="0"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                        Trendyol URL
                      </label>
                      <input
                        type="text"
                        value={product.trendyolUrl || product.url || ''}
                        onChange={(e) => handleChange(product.id, 'trendyolUrl', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => handleSave(product.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem',
                        background: '#7a1419',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          fontWeight: 600
                        }}
                      >
                        <MdSave size={18} /> Kaydet
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem',
                          background: 'transparent',
                        color: '#7a1419',
                        border: '2px solid #7a1419',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          fontWeight: 600
                        }}
                      >
                        <MdClose size={18} /> İptal
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
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      margin: '0 0 0.75rem 0'
                    }}>
                      {product.price} • Stok: {product.stockCount || 0}
                    </p>
                    <p style={{
                      color: '#6c757d',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      marginBottom: '1rem'
                    }}>
                      {product.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => handleEdit(product.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem',
                          background: 'var(--edirne)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          fontWeight: 600
                        }}
                      >
                        <MdEdit size={18} /> Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem',
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          fontWeight: 600
                        }}
                      >
                        <MdDelete size={18} /> Sil
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
