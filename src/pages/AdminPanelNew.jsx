/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  MdDashboard, MdInventory, MdShoppingCart, MdPeople, 
  MdSettings, MdBarChart, MdCampaign, MdLogout, MdEdit,
  MdArticle, MdTrendingUp, MdAttachMoney, MdLocalShipping
} from "react-icons/md";
import { api } from "../services/api";

// Import sub-components
import DashboardTab from "../components/admin/DashboardTab";
import ProductsTab from "../components/admin/ProductsTab";
import OrdersTab from "../components/admin/OrdersTab";
import CustomersTab from "../components/admin/CustomersTab";
import InventoryTab from "../components/admin/InventoryTab";
import ContentTab from "../components/admin/ContentTab";
import ReportsTab from "../components/admin/ReportsTab";
import MarketingTab from "../components/admin/MarketingTab";
import AnalyticsDashboard from "../components/admin/AnalyticsDashboard";

export default function AdminPanelNew() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("adminUsername");
    
    if (!isAdmin || !token) {
      navigate("/admin/login");
      return;
    }
    
    setAdminName(name || 'Admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminUsername");
    navigate("/");
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { id: 'analytics', label: 'Analitik', icon: MdTrendingUp },
    { id: 'products', label: 'Ürünler', icon: MdInventory },
    { id: 'orders', label: 'Siparişler', icon: MdShoppingCart },
    { id: 'customers', label: 'Müşteriler', icon: MdPeople },
    { id: 'inventory', label: 'Envanter', icon: MdSettings },
    { id: 'content', label: 'İçerik', icon: MdArticle },
    { id: 'reports', label: 'Raporlar', icon: MdBarChart },
    { id: 'marketing', label: 'Pazarlama', icon: MdCampaign }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'analytics': return <AnalyticsDashboard />;
      case 'products': return <ProductsTab />;
      case 'orders': return <OrdersTab />;
      case 'customers': return <CustomersTab />;
      case 'inventory': return <InventoryTab />;
      case 'content': return <ContentTab />;
      case 'reports': return <ReportsTab />;
      case 'marketing': return <MarketingTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <>
      <Helmet><title>Admin Panel | Edirne Kırmızısı</title></Helmet>
      
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f5f5f5'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '260px',
          background: 'linear-gradient(180deg, #7a1419 0%, #5d0f13 100%)',
          color: 'white',
          padding: '2rem 0',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none' /* IE and Edge */
        }}
        className="admin-sidebar"
        >
          <style>{`
            .admin-sidebar::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>
          
          <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)'
            }}>
              Admin Panel
            </h2>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Hoş geldiniz, {adminName}
            </p>
          </div>

          <nav>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    border: 'none',
                    borderLeft: activeTab === tab.id ? '4px solid white' : '4px solid transparent',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Icon size={22} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div style={{ padding: '1.5rem', marginTop: 'auto', paddingTop: '1rem', paddingBottom: '3rem' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '0.875rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <MdLogout size={20} />
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          marginLeft: '260px',
          flex: 1,
          padding: '2rem',
          minHeight: '100vh'
        }}>
          {renderTabContent()}
        </div>
      </div>
    </>
  );
}
