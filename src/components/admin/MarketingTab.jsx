import React, { useState } from 'react';
import { 
  MdLocalOffer, 
  MdEmail, 
  MdCampaign,
  MdAdd,
  MdEdit,
  MdDelete,
  MdContentCopy
} from 'react-icons/md';

export default function MarketingTab() {
  const [activeSection, setActiveSection] = useState('coupons');

  // Coupons/Discounts
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: 'YENI2024',
      discount: 15,
      type: 'percentage',
      active: true,
      usageCount: 23,
      maxUsage: 100,
      expiryDate: '2024-03-31'
    },
    {
      id: 2,
      code: 'ILKBAHAR',
      discount: 50,
      type: 'fixed',
      active: true,
      usageCount: 45,
      maxUsage: null,
      expiryDate: '2024-04-15'
    }
  ]);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    type: 'percentage',
    maxUsage: ''
  });

  // Email Campaigns
  // eslint-disable-next-line no-unused-vars
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Yeni Koleksiyon Duyurusu',
      subject: 'Yeni Bahar Koleksiyonumuz Çıktı!',
      status: 'sent',
      sentDate: '2024-01-15',
      recipients: 245,
      openRate: 68
    },
    {
      id: 2,
      name: 'Özel İndirim Kampanyası',
      subject: '%15 İndirim Fırsatını Kaçırmayın',
      status: 'draft',
      sentDate: null,
      recipients: 0,
      openRate: 0
    }
  ]);

  const handleCreateCoupon = () => {
    if (!newCoupon.code || !newCoupon.discount) {
      alert('Lütfen kod ve indirim miktarı giriniz!');
      return;
    }

    setCoupons([...coupons, {
      ...newCoupon,
      id: Date.now(),
      active: true,
      usageCount: 0,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }]);

    setNewCoupon({
      code: '',
      discount: '',
      type: 'percentage',
      maxUsage: ''
    });

    alert('İndirim kodu oluşturuldu! ✅');
  };

  const handleToggleCoupon = (id) => {
    setCoupons(coupons.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    ));
  };

  const handleDeleteCoupon = (id) => {
    if (confirm('Bu kodu silmek istediğinizden emin misiniz?')) {
      setCoupons(coupons.filter(c => c.id !== id));
      alert('Kod silindi! ✅');
    }
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Kod kopyalandı: ${code}`);
  };

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
          onClick={() => setActiveSection('email')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: activeSection === 'email' ? 'var(--edirne)' : '#6c757d',
            border: 'none',
            borderBottom: activeSection === 'email' ? '3px solid var(--edirne)' : 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          <MdEmail style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          E-posta Kampanyaları
        </button>
        <button
          onClick={() => setActiveSection('promotions')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: activeSection === 'promotions' ? 'var(--edirne)' : '#6c757d',
            border: 'none',
            borderBottom: activeSection === 'promotions' ? '3px solid var(--edirne)' : 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          <MdCampaign style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Promosyonlar
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
                      value={newCoupon.discount}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
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
                      value={newCoupon.type}
                      onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">₺</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Maksimum Kullanım (Opsiyonel)
                </label>
                <input
                  type="number"
                  value={newCoupon.maxUsage}
                  onChange={(e) => setNewCoupon({ ...newCoupon, maxUsage: e.target.value })}
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
                        <strong>İndirim:</strong> {coupon.discount}{coupon.type === 'percentage' ? '%' : '₺'}
                      </span>
                      <span>
                        <strong>Kullanım:</strong> {coupon.usageCount}{coupon.maxUsage ? `/${coupon.maxUsage}` : ''}
                      </span>
                      <span>
                        <strong>Son Tarih:</strong> {new Date(coupon.expiryDate).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleToggleCoupon(coupon.id)}
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
        </div>
      )}

      {/* Email Campaigns Section */}
      {activeSection === 'email' && (
        <div>
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Yeni E-posta Kampanyası</h3>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Kampanya Adı
                </label>
                <input
                  type="text"
                  placeholder="Örn: Yaz İndirimi 2024"
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
                  E-posta Konusu
                </label>
                <input
                  type="text"
                  placeholder="Müşterilerinizin göreceği konu"
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
                  İçerik
                </label>
                <textarea
                  rows={6}
                  placeholder="E-posta içeriği..."
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
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    background: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  Taslak Olarak Kaydet
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    background: 'var(--edirne)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  <MdEmail style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                  Gönder
                </button>
              </div>
            </div>
          </div>

          {/* Campaign History */}
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Kampanya Geçmişi</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {campaigns.map(campaign => (
              <div
                key={campaign.id}
                style={{
                  background: '#fff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                      {campaign.name}
                    </h4>
                    <p style={{ margin: '0 0 0.75rem 0', color: '#6c757d' }}>
                      {campaign.subject}
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#6c757d' }}>
                      <span>
                        <strong>Durum:</strong>{' '}
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: campaign.status === 'sent' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(108, 117, 125, 0.1)',
                          color: campaign.status === 'sent' ? '#28a745' : '#6c757d',
                          borderRadius: '20px',
                          fontSize: '0.85rem'
                        }}>
                          {campaign.status === 'sent' ? 'Gönderildi' : 'Taslak'}
                        </span>
                      </span>
                      {campaign.status === 'sent' && (
                        <>
                          <span><strong>Alıcı:</strong> {campaign.recipients}</span>
                          <span><strong>Açılma:</strong> %{campaign.openRate}</span>
                          <span><strong>Tarih:</strong> {new Date(campaign.sentDate).toLocaleDateString('tr-TR')}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--edirne)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    <MdEdit style={{ verticalAlign: 'middle' }} /> Düzenle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promotions Section */}
      {activeSection === 'promotions' && (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <MdCampaign size={64} color="#6c757d" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>Promosyon Yönetimi</h3>
          <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>
            Özel kampanyalar, bundle teklifleri ve sezonluk promosyonlar oluşturun.
          </p>
          <button
            style={{
              padding: '0.875rem 2rem',
              background: '#7a1419',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            <MdAdd style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Yeni Promosyon Oluştur
          </button>
        </div>
      )}
    </div>
  );
}
