import React, { useState, useEffect } from 'react';
import { MdWarning, MdTrendingDown, MdInventory, MdFileDownload, MdFileUpload } from 'react-icons/md';
import { api } from '../../services/api';

export default function InventoryTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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

  const handleStockUpdate = async (productId, newStock) => {
    try {
      const product = products.find(p => p.id === productId);
      await api.updateProduct(productId, { ...product, stockCount: newStock });
      setProducts(products.map(p => 
        p.id === productId ? { ...p, stockCount: newStock } : p
      ));
      alert('Stok güncellendi! ✅');
    } catch (err) {
      alert('Stok güncellenirken hata oluştu! ❌');
      console.error(err);
    }
  };

  const lowStockProducts = products.filter(p => (p.stockCount || 0) < 10);
  const outOfStockProducts = products.filter(p => (p.stockCount || 0) === 0);

  const filteredProducts = 
    filter === 'low' ? lowStockProducts :
    filter === 'out' ? outOfStockProducts :
    products;

  const exportToCSV = () => {
    const csvContent = [
      ['Ürün Adı', 'Kategori', 'Stok', 'Fiyat'],
      ...products.map(p => [p.title, p.category || '', p.stockCount || 0, p.price])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'envanter.csv';
    link.click();
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          margin: 0,
          color: 'var(--dark)'
        }}>
          Envanter Yönetimi
        </h2>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={exportToCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 600
            }}
          >
            <MdFileDownload size={20} /> CSV İndir
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: '#6c757d', fontSize: '0.9rem' }}>
                Toplam Ürün
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--dark)' }}>
                {products.length}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(23, 162, 184, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdInventory size={32} color="#17a2b8" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setFilter('low')}
          style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            border: filter === 'low' ? '2px solid #ffc107' : '2px solid transparent'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: '#6c757d', fontSize: '0.9rem' }}>
                Düşük Stok
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#ffc107' }}>
                {lowStockProducts.length}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(255, 193, 7, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdWarning size={32} color="#ffc107" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setFilter('out')}
          style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            border: filter === 'out' ? '2px solid #dc3545' : '2px solid transparent'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: '#6c757d', fontSize: '0.9rem' }}>
                Tükenen Stok
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#dc3545' }}>
                {outOfStockProducts.length}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(220, 53, 69, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdTrendingDown size={32} color="#dc3545" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setFilter('all')}
          style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            border: filter === 'all' ? '2px solid var(--edirne)' : '2px solid transparent'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: '#6c757d', fontSize: '0.9rem' }}>
                Toplam Stok Değeri
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--edirne)' }}>
                ₺{products.reduce((sum, p) => {
                  const price = parseFloat(p.price.replace(/[₺,]/g, '')) || 0;
                  const stock = p.stockCount || 0;
                  return sum + (price * stock);
                }, 0).toLocaleString('tr-TR')}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(122, 20, 25, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdInventory size={32} color="#7a1419" />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Ürün</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Kategori</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Stok</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Fiyat</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Durum</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => {
              const stock = product.stockCount || 0;
              const status = stock === 0 ? 'out' : stock < 10 ? 'low' : 'ok';
              
              return (
                <tr key={product.id} style={{ borderTop: '1px solid #e9ecef' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      <strong>{product.title}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#6c757d' }}>
                    {product.category || '-'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value) || 0)}
                      min="0"
                      style={{
                        width: '80px',
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                    />
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--edirne)' }}>
                    {product.price}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.75rem',
                      background: 
                        status === 'out' ? 'rgba(220, 53, 69, 0.1)' :
                        status === 'low' ? 'rgba(255, 193, 7, 0.1)' :
                        'rgba(40, 167, 69, 0.1)',
                      color: 
                        status === 'out' ? '#dc3545' :
                        status === 'low' ? '#ffc107' :
                        '#28a745',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}>
                      {status === 'out' ? (
                        <><MdTrendingDown size={16} /> Tükendi</>
                      ) : status === 'low' ? (
                        <><MdWarning size={16} /> Düşük</>
                      ) : (
                        <><MdInventory size={16} /> Normal</>
                      )}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => {
                        const newStock = prompt(`${product.title} için yeni stok miktarı:`, stock);
                        if (newStock !== null) {
                          handleStockUpdate(product.id, parseInt(newStock) || 0);
                        }
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                      background: '#7a1419',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      Güncelle
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
