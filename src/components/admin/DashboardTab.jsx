import React, { useState, useEffect } from 'react';
import { MdAttachMoney, MdInventory, MdShoppingCart, MdPeople, MdWarning } from 'react-icons/md';
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
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [dashboardData, orderStats, orders] = await Promise.all([
        api.getDashboardStats(),
        api.getOrderStatistics(),
        api.getAllOrders().catch(() => [])
      ]);
      
      setStats({
        ...dashboardData,
        totalOrders: orderStats.totalOrders || 0,
        totalRevenue: orderStats.totalRevenue || 0,
        pendingOrders: orderStats.statusCounts?.pending || 0
      });
      // Take the 5 most recent orders
      const sorted = Array.isArray(orders) ? orders.sort((a, b) => new Date(b.createdAt || b.orderDate || 0) - new Date(a.createdAt || a.orderDate || 0)).slice(0, 5) : [];
      setRecentOrders(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Toplam Ürün', value: stats.totalProducts, icon: MdInventory, color: '#2196F3' },
    { label: 'Toplam Sipariş', value: stats.totalOrders, icon: MdShoppingCart, color: '#4CAF50' },
    { label: 'Toplam Gelir', value: `₺${stats.totalRevenue.toLocaleString()}`, icon: MdAttachMoney, color: '#FF9800' },
    { label: 'Müşteri Sayısı', value: stats.totalCustomers, icon: MdPeople, color: '#9C51B6' },
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

      {/* Recent Orders */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
          Son Siparişler
        </h3>
        {recentOrders.length > 0 ? (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {recentOrders.map((order, idx) => (
              <div key={order.id || idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>#{order.id || order.orderNumber || '-'}</strong>
                  <span style={{ marginLeft: '0.75rem', color: '#6c757d', fontSize: '0.9rem' }}>
                    {order.customerName || order.userName || '-'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    background: order.status === 'DELIVERED' ? 'rgba(40,167,69,0.1)' :
                                order.status === 'PENDING' ? 'rgba(255,193,7,0.1)' :
                                order.status === 'CANCELLED' ? 'rgba(220,53,69,0.1)' : 'rgba(0,123,255,0.1)',
                    color: order.status === 'DELIVERED' ? '#28a745' :
                           order.status === 'PENDING' ? '#ffc107' :
                           order.status === 'CANCELLED' ? '#dc3545' : '#007bff'
                  }}>
                    {order.status || '-'}
                  </span>
                  <strong style={{ color: 'var(--edirne)' }}>
                    ₺{(order.totalAmount || order.total || 0).toLocaleString('tr-TR')}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#6c757d', margin: 0 }}>Henüz sipariş bulunmuyor.</p>
        )}
      </div>
    </div>
  );
}
