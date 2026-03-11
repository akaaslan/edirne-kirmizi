import React, { useState, useEffect } from 'react';
import { MdTrendingUp, MdAttachMoney, MdInventory, MdShoppingCart, MdPeople, MdWarning } from 'react-icons/md';
import { api } from '../../services/api';

export default function DashboardTab() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    lowStockItems: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [dashboardData, orderStats] = await Promise.all([
        api.getDashboardStats(),
        api.getOrderStatistics()
      ]);
      
      setStats({
        ...dashboardData,
        totalOrders: orderStats.totalOrders || 0,
        totalRevenue: orderStats.totalRevenue || 0,
        pendingOrders: orderStats.statusCounts?.pending || 0
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Toplam Ürün', value: stats.totalProducts, icon: MdInventory, color: '#2196F3', change: '+5%' },
    { label: 'Toplam Sipariş', value: stats.totalOrders, icon: MdShoppingCart, color: '#4CAF50', change: '+12%' },
    { label: 'Toplam Gelir', value: `₺${stats.totalRevenue.toLocaleString()}`, icon: MdAttachMoney, color: '#FF9800', change: '+18%' },
    { label: 'Müşteri Sayısı', value: stats.totalCustomers, icon: MdPeople, color: '#9C51B6', change: '+7%' },
    { label: 'Düşük Stok', value: stats.lowStockItems, icon: MdWarning, color: '#F44336', alert: true },
    { label: 'Bekleyen Sipariş', value: stats.pendingOrders, icon: MdShoppingCart, color: '#FF5722' }
  ];

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{
        margin: '0 0 2rem 0',
        fontSize: '2rem',
        fontWeight: 700,
        color: 'var(--dark)'
      }}>
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              style={{
                background: 'white',
                padding: '1.75rem',
                borderRadius: '16px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
                border: stat.alert ? '2px solid #F44336' : '1px solid rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={28} style={{ color: stat.color }} />
                </div>
                {stat.change && (
                  <span style={{
                    fontSize: '0.85rem',
                    color: stat.change.includes('+') ? '#4CAF50' : '#F44336',
                    fontWeight: 600
                  }}>
                    {stat.change}
                  </span>
                )}
              </div>
              <div>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem', fontWeight: 500 }}>
                  {stat.label}
                </p>
                <h3 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: 'var(--dark)' }}>
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
          Son Aktiviteler
        </h3>
        <div style={{ color: '#666' }}>
          <p>• Yeni sipariş: #EK2026-0127 - ₺850</p>
          <p>• Stok güncellendi: Edirne Kırmızısı Fular</p>
          <p>• Yeni müşteri kaydı: ahmet@email.com</p>
          <p>• Sipariş teslim edildi: #EK2026-0125</p>
        </div>
      </div>
    </div>
  );
}
