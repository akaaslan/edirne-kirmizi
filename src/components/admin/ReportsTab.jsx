import React, { useState, useEffect } from 'react';
import { MdAttachMoney, MdShoppingCart, MdFileDownload, MdDateRange } from 'react-icons/md';
import { api } from '../../services/api';

export default function ReportsTab() {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    dailySales: []
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const products = await api.getAllProducts();
      setProducts(products);
      
      const analytics = await api.getSalesAnalytics(dateRange.start, dateRange.end);
      setSalesData(analytics);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    alert('PDF raporu hazırlanıyor... Bu özellik yakında eklenecek!');
  };

  const handleExportExcel = () => {
    // Simple CSV export
    const csvContent = [
      ['Tarih', 'Sipariş Sayısı', 'Gelir'],
      ...salesData.dailySales.map(d => [d.date, d.orders, `₺${d.revenue}`])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'satis-raporu.csv';
    link.click();
    
    alert('Rapor Excel dosyası olarak indirildi! ✅');
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
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          margin: 0,
          color: 'var(--dark)'
        }}>
          Raporlar & Analizler
        </h2>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleExportPDF}
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
            <MdFileDownload size={20} /> PDF
          </button>
          <button
            onClick={handleExportExcel}
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
            <MdFileDownload size={20} /> Excel
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div style={{
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <MdDateRange size={24} color="var(--edirne)" />
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#6c757d' }}>
                Başlangıç
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#6c757d' }}>
                Bitiş
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            <button
              style={{
                padding: '0.5rem 1.5rem',
                background: 'var(--edirne)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                marginTop: '1.25rem'
              }}
            >
              Filtrele
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
                Toplam Gelir
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--edirne)' }}>
                ₺{salesData.totalRevenue.toLocaleString('tr-TR')}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(156, 30, 36, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdAttachMoney size={32} color="var(--edirne)" />
            </div>
          </div>
        </div>

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
                Toplam Sipariş
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--dark)' }}>
                {salesData.totalOrders}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(0, 123, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdShoppingCart size={32} color="#007bff" />
            </div>
          </div>
        </div>

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
                Ortalama Sipariş
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--dark)' }}>
                ₺{salesData.averageOrderValue}
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
              <MdAttachMoney size={32} color="#ffc107" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem' }}>En Çok Satan Ürünler</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {salesData.topProducts.map((product, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--edirne) 0%, #c91f27 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.25rem'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <strong style={{ display: 'block' }}>{product.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                    {product.sales} adet satıldı
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--edirne)' }}>
                  ₺{product.revenue.toLocaleString('tr-TR')}
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                  Gelir
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Sales */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem' }}>Günlük Satış Raporu</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Tarih</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Sipariş</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Gelir</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Ort. Sipariş</th>
            </tr>
          </thead>
          <tbody>
            {salesData.dailySales.map((day, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid #e9ecef' }}>
                <td style={{ padding: '1rem' }}>
                  {new Date(day.date).toLocaleDateString('tr-TR')}
                </td>
                <td style={{ padding: '1rem' }}>{day.orders}</td>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--edirne)' }}>
                  ₺{day.revenue.toLocaleString('tr-TR')}
                </td>
                <td style={{ padding: '1rem' }}>
                  ₺{Math.round(day.revenue / day.orders)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
