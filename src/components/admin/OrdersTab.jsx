import React, { useState, useEffect } from 'react';
import { 
  MdCheckCircle, 
  MdLocalShipping, 
  MdSchedule, 
  MdCancel,
  MdVisibility,
  MdEdit
} from 'react-icons/md';
import { api } from '../../services/api';

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await api.getAllOrdersAdmin();
      // Transform backend data to match display format
      const transformedOrders = data.map(order => {
        // Map backend status to frontend key
        let statusKey = order.status?.toLowerCase() || 'pending';
        if (statusKey === 'shipped') statusKey = 'shipped';
        
        return {
          id: order.id,
          orderNumber: `ORD-${order.id}`,
          customer: order.customerName,
          email: order.customerEmail,
          date: order.createdAt,
          status: statusKey,
          total: `₺${order.totalAmount?.toFixed(2) || '0.00'}`,
          items: order.items?.length || 0,
          shippingAddress: `${order.shippingAddress}, ${order.city}${order.postalCode ? ' ' + order.postalCode : ''}`,
          phone: order.customerPhone,
          notes: order.notes,
          paymentMethod: order.paymentMethod
        };
      });
      setOrders(transformedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const displayOrders = orders;

  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusConfig = {
    pending: { label: 'Beklemede', color: '#ffc107', icon: MdSchedule, value: 'PENDING' },
    processing: { label: 'Hazırlanıyor', color: '#17a2b8', icon: MdSchedule, value: 'PROCESSING' },
    shipped: { label: 'Kargoda', color: '#007bff', icon: MdLocalShipping, value: 'SHIPPED' },
    delivered: { label: 'Teslim Edildi', color: '#28a745', icon: MdCheckCircle, value: 'DELIVERED' },
    cancelled: { label: 'İptal Edildi', color: '#dc3545', icon: MdCancel, value: 'CANCELLED' }
  };

  const filteredOrders = filter === 'all' 
    ? displayOrders 
    : displayOrders.filter(order => order.status === filter);

  const handleStatusChange = async (orderId, newStatusKey) => {
    try {
      // Get the backend enum value from config
      const backendStatus = statusConfig[newStatusKey]?.value || newStatusKey.toUpperCase();
      await api.updateOrderStatus(orderId, backendStatus);
      // Update local state with lowercase key
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatusKey } : order
      ));
      // Update selected order if it's the one being changed
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatusKey });
      }
      alert('Sipariş durumu güncellendi! ✅');
      // Refresh orders to get latest data
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Durum güncellenemedi! ❌');
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
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          margin: 0,
          color: 'var(--dark)'
        }}>
          Sipariş Yönetimi
        </h2>

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.5rem 1rem',
              background: filter === 'all' ? 'var(--edirne)' : '#fff',
              color: filter === 'all' ? '#fff' : 'var(--dark)',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Tümü ({displayOrders.length})
          </button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: '0.5rem 1rem',
                background: filter === key ? config.color : '#fff',
                color: filter === key ? '#fff' : 'var(--dark)',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {config.label} ({displayOrders.filter(o => o.status === key).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
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
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Sipariş No</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Müşteri</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Tarih</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Durum</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Tutar</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <tr key={order.id} style={{ borderTop: '1px solid #e9ecef' }}>
                  <td style={{ padding: '1rem' }}>
                    <strong>{order.orderNumber}</strong>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{order.customer}</div>
                      <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>{order.email}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#6c757d' }}>
                    {new Date(order.date).toLocaleDateString('tr-TR')}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.75rem',
                      background: `${statusConfig[order.status].color}20`,
                      color: statusConfig[order.status].color,
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}>
                      <StatusIcon size={16} />
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--edirne)' }}>
                    {order.total}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.5rem 0.75rem',
                        background: '#7a1419',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        <MdVisibility size={16} /> Detay
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '2rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '1.5rem'
            }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
                  {selectedOrder.orderNumber}
                </h3>
                <p style={{ margin: 0, color: '#6c757d' }}>
                  {new Date(selectedOrder.date).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                ×
              </button>
            </div>

            {/* Customer Info */}
            <div style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem' }}>Müşteri Bilgileri</h4>
              <p style={{ margin: '0.25rem 0' }}><strong>Ad:</strong> {selectedOrder.customer}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>E-posta:</strong> {selectedOrder.email}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Telefon:</strong> {selectedOrder.phone || 'Belirtilmemiş'}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Adres:</strong> {selectedOrder.shippingAddress}</p>
              {selectedOrder.paymentMethod && (
                <p style={{ margin: '0.25rem 0' }}><strong>Ödeme:</strong> {selectedOrder.paymentMethod}</p>
              )}
              {selectedOrder.notes && (
                <p style={{ margin: '0.25rem 0' }}><strong>Not:</strong> {selectedOrder.notes}</p>
              )}
            </div>

            {/* Order Items */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem' }}>Sipariş Ürünleri</h4>
              <p style={{ color: '#6c757d' }}>{selectedOrder.items} ürün</p>
            </div>

            {/* Status Update */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem' }}>Durum Güncelle</h4>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            {/* Total */}
            <div style={{
              borderTop: '2px solid #e9ecef',
              paddingTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <strong style={{ fontSize: '1.25rem' }}>Toplam:</strong>
              <strong style={{ fontSize: '1.5rem', color: 'var(--edirne)' }}>
                {selectedOrder.total}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
