import React, { useState, useEffect } from 'react';
import { MdPerson, MdEmail, MdPhone, MdShoppingCart, MdBlock, MdCheckCircle } from 'react-icons/md';
import { api } from '../../services/api';

export default function CustomersTab() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await api.getAllCustomers();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  // Sample customers data as fallback
  const sampleCustomers = [
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      email: 'ayse@example.com',
      phone: '+90 532 123 4567',
      totalOrders: 5,
      totalSpent: '₺3,250',
      joinDate: '2023-06-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      phone: '+90 533 234 5678',
      totalOrders: 8,
      totalSpent: '₺5,800',
      joinDate: '2023-03-22',
      status: 'active'
    },
    {
      id: 3,
      name: 'Zeynep Kaya',
      email: 'zeynep@example.com',
      phone: '+90 534 345 6789',
      totalOrders: 12,
      totalSpent: '₺8,450',
      joinDate: '2023-01-10',
      status: 'active'
    }
  ];

  // Use real customers if available, otherwise use sample data
  const displayCustomers = customers.length > 0 ? customers : sampleCustomers;

  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = displayCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (customerId) => {
    setCustomers(displayCustomers.map(customer => 
      customer.id === customerId 
        ? { ...customer, status: customer.status === 'active' ? 'blocked' : 'active' }
        : customer
    ));
    alert('Müşteri durumu güncellendi!');
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
          Müşteri Yönetimi
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Müşteri ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '1rem',
            width: '300px'
          }}
        />
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
                Toplam Müşteri
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--dark)' }}>
                {displayCustomers.length}
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
              <MdPerson size={32} color="#17a2b8" />
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
                Aktif Müşteri
              </p>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--dark)' }}>
                {displayCustomers.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(40, 167, 69, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdCheckCircle size={32} color="#28a745" />
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
                {displayCustomers.reduce((sum, c) => sum + c.totalOrders, 0)}
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
              <MdShoppingCart size={32} color="var(--edirne)" />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
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
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Müşteri</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>İletişim</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Sipariş</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Toplam Harcama</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Kayıt Tarihi</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Durum</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id} style={{ borderTop: '1px solid #e9ecef' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--edirne) 0%, #c91f27 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 600
                    }}>
                      {customer.name.charAt(0)}
                    </div>
                    <strong>{customer.name}</strong>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <MdEmail size={14} color="#6c757d" />
                      <span style={{ color: '#6c757d' }}>{customer.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MdPhone size={14} color="#6c757d" />
                      <span style={{ color: '#6c757d' }}>{customer.phone}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <strong>{customer.totalOrders}</strong>
                </td>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--edirne)' }}>
                  {customer.totalSpent}
                </td>
                <td style={{ padding: '1rem', color: '#6c757d' }}>
                  {new Date(customer.joinDate).toLocaleDateString('tr-TR')}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.75rem',
                    background: customer.status === 'active' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                    color: customer.status === 'active' ? '#28a745' : '#dc3545',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {customer.status === 'active' ? <MdCheckCircle size={16} /> : <MdBlock size={16} />}
                    {customer.status === 'active' ? 'Aktif' : 'Engelli'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => handleToggleStatus(customer.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: customer.status === 'active' ? '#dc3545' : '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    {customer.status === 'active' ? 'Engelle' : 'Aktif Et'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
