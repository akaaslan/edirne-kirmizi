import React, { useState, useEffect } from 'react';
import { 
  MdLocalOffer, 
  MdEmail, 
  MdAdd,
  MdDelete,
  MdContentCopy,
  MdPeople
} from 'react-icons/md';
import { api } from '../../services/api';

export default function MarketingTab() {
  const [activeSection, setActiveSection] = useState('coupons');
  const [loading, setLoading] = useState(true);

  // Coupons from backend
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountValue: '',
    discountType: 'PERCENTAGE',
    usageLimit: '',
    minimumOrderAmount: '',
    expiresAt: ''
  });

  // Newsletter subscribers
  const [subscribers, setSubscribers] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [couponsData, subsData, countData] = await Promise.all([
        api.getAllCoupons().catch(() => []),
        api.getNewsletterSubscribers().catch(() => []),
        api.getNewsletterCount().catch(() => 0)
      ]);
      setCoupons(Array.isArray(couponsData) ? couponsData : []);
      setSubscribers(Array.isArray(subsData) ? subsData : []);
      setSubscriberCount(typeof countData === 'number' ? countData : (countData?.count || 0));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching marketing data:', err);
      setLoading(false);
    }
  };

  const handleCreateCoupon = async () => {
    if (!newCoupon.code || !newCoupon.discountValue) {
      alert('Lütfen kod ve indirim miktarı giriniz!');
      return;
    }

    try {
      const couponData = {
        code: newCoupon.code.toUpperCase(),
        discountValue: parseFloat(newCoupon.discountValue),
        discountType: newCoupon.discountType,
        usageLimit: newCoupon.usageLimit ? parseInt(newCoupon.usageLimit) : null,
        minimumOrderAmount: newCoupon.minimumOrderAmount ? parseFloat(newCoupon.minimumOrderAmount) : null,
        expiresAt: newCoupon.expiresAt || null,
        active: true
      };

      const created = await api.createCoupon(couponData);
      setCoupons([...coupons, created]);
      setNewCoupon({
        code: '',
        discountValue: '',
        discountType: 'PERCENTAGE',
        usageLimit: '',
        minimumOrderAmount: '',
        expiresAt: ''
      });
      alert('İndirim kodu oluşturuldu! ✅');
    } catch (err) {
      console.error('Error creating coupon:', err);
      alert('Kupon oluşturulurken hata oluştu!');
    }
  };

  const handleToggleCoupon = async (coupon) => {
    try {
      const updated = await api.updateCoupon(coupon.id, { ...coupon, active: !coupon.active });
      setCoupons(coupons.map(c => c.id === coupon.id ? (updated || { ...c, active: !c.active }) : c));
    } catch (err) {
      console.error('Error toggling coupon:', err);
      alert('Kupon güncellenirken hata oluştu!');
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!confirm('Bu kodu silmek istediğinizden emin misiniz?')) return;
    try {
      await api.deleteCoupon(id);
      setCoupons(coupons.filter(c => c.id !== id));
      alert('Kod silindi! ✅');
    } catch (err) {
      console.error('Error deleting coupon:', err);
      alert('Silme işlemi başarısız!');
    }
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Kod kopyalandı: ${code}`);
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
      <h2 style={{
        fontSize: '1.75rem',
        margin: '0 0 2rem 0',
        color: 'var(--dark)'
      }}>
        Pazarlama & Kampanyalar
      </h2>

      {/* Section Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #e9ecef',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveSection('coupons')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: activeSection === 'coupons' ? 'var(--edirne)' : '#6c757d',
            border: 'none',
            borderBottom: activeSection === 'coupons' ? '3px solid var(--edirne)' : 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          <MdLocalOffer style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          İndirim Kodları
        </button>
        <button
          onClick={() => setActiveSection('subscribers')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: activeSection === 'subscribers' ? 'var(--edirne)' : '#6c757d',
            border: 'none',
            borderBottom: activeSection === 'subscribers' ? '3px solid var(--edirne)' : 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          <MdEmail style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Bülten Aboneleri
        </button>
      </div>

      {/* Coupons Section */}
      {activeSection === 'coupons' && (
        <div>
          {/* Create Coupon Form */}
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Yeni İndirim Kodu</h3>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Kod
                  </label>
                  <input
                    type="text"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    placeholder="ÖRNEK2024"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      textTransform: 'uppercase'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                    İndirim Miktarı
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="number"
                      value={newCoupon.discountValue}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                      placeholder="15"
                      min="0"
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                    <select
                      value={newCoupon.discountType}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="PERCENTAGE">%</option>
                      <option value="FIXED_AMOUNT">₺</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Maksimum Kullanım
                  </label>
                  <input
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                    placeholder="Sınırsız"
                    min="1"
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
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Min. Sipariş Tutarı (₺)
                  </label>
                  <input
                    type="number"
                    value={newCoupon.minimumOrderAmount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minimumOrderAmount: e.target.value })}
                    placeholder="0"
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
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Son Kullanma Tarihi
                  </label>
                  <input
                    type="date"
                    value={newCoupon.expiresAt}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
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
              <button
                onClick={handleCreateCoupon}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem',
                  background: '#7a1419',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                <MdAdd size={20} /> Kodu Oluştur
              </button>
            </div>
          </div>

          {/* Existing Coupons */}
          {coupons.length === 0 ? (
            <div style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <MdLocalOffer size={48} color="#6c757d" style={{ marginBottom: '1rem' }} />
              <p style={{ color: '#6c757d' }}>Henüz indirim kodu bulunmuyor.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {coupons.map(coupon => (
                <div
                  key={coupon.id}
                  style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    opacity: coupon.active ? 1 : 0.6
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                        <h4 style={{
                          margin: 0,
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #7a1419 0%, #5d0f13 100%)',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '1.25rem',
                          fontFamily: 'monospace',
                          letterSpacing: '2px'
                        }}>
                          {coupon.code}
                        </h4>
                        <button
                          onClick={() => handleCopyCoupon(coupon.code)}
                          style={{
                            padding: '0.5rem',
                            background: '#f8f9fa',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                          title="Kodu Kopyala"
                        >
                          <MdContentCopy size={18} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.95rem', color: '#6c757d' }}>
                        <span>
                          <strong>İndirim:</strong> {coupon.discountValue}{coupon.discountType === 'PERCENTAGE' ? '%' : '₺'}
                        </span>
                        <span>
                          <strong>Kullanım:</strong> {coupon.usedCount || 0}{coupon.usageLimit ? `/${coupon.usageLimit}` : ''}
                        </span>
                        {coupon.minimumOrderAmount > 0 && (
                          <span>
                            <strong>Min. Tutar:</strong> ₺{coupon.minimumOrderAmount}
                          </span>
                        )}
                        {coupon.expiresAt && (
                          <span>
                            <strong>Son Tarih:</strong> {new Date(coupon.expiresAt).toLocaleDateString('tr-TR')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleToggleCoupon(coupon)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: coupon.active ? '#ffc107' : '#28a745',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}
                      >
                        {coupon.active ? 'Devre Dışı' : 'Aktif Et'}
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        style={{
                          padding: '0.5rem',
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Newsletter Subscribers Section */}
      {activeSection === 'subscribers' && (
        <div>
          {/* Stats */}
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
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'rgba(156, 30, 36, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MdPeople size={28} color="var(--edirne)" />
              </div>
              <div>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Toplam Abone</p>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{subscriberCount || subscribers.length}</p>
              </div>
            </div>
          </div>

          {/* Subscribers Table */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {subscribers.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <MdEmail size={48} color="#6c757d" style={{ marginBottom: '1rem' }} />
                <p style={{ color: '#6c757d' }}>Henüz abone bulunmuyor.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>E-posta</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>İsim</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Kayıt Tarihi</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, idx) => (
                    <tr key={sub.id || idx} style={{ borderTop: '1px solid #e9ecef' }}>
                      <td style={{ padding: '1rem' }}>{sub.email}</td>
                      <td style={{ padding: '1rem' }}>{sub.name || '-'}</td>
                      <td style={{ padding: '1rem' }}>
                        {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString('tr-TR') : '-'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: sub.active !== false ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                          color: sub.active !== false ? '#28a745' : '#dc3545',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 500
                        }}>
                          {sub.active !== false ? 'Aktif' : 'İptal'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
