/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign, FaBox, FaTrophy } from 'react-icons/fa';
import axios from 'axios';
import '../../styles/AnalyticsDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const COLORS = ['#8B0000', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [salesTrend, setSalesTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [customerAnalytics, setCustomerAnalytics] = useState({});
  const [revenueByCategory, setRevenueByCategory] = useState([]);
  const [orderStatusDistribution, setOrderStatusDistribution] = useState([]);
  const [monthlyComparison, setMonthlyComparison] = useState({});
  const [dateRange, setDateRange] = useState(30);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      
      const [trend, products, customers, revenue, status, comparison] = await Promise.all([
        axios.get(`${API_URL}/orders/analytics/sales-trend?days=${dateRange}`),
        axios.get(`${API_URL}/orders/analytics/top-products?limit=5`),
        axios.get(`${API_URL}/orders/analytics/customer-analytics`),
        axios.get(`${API_URL}/orders/analytics/revenue-by-category`),
        axios.get(`${API_URL}/orders/analytics/order-status`),
        axios.get(`${API_URL}/orders/analytics/monthly-comparison`)
      ]);

      setSalesTrend(trend.data);
      setTopProducts(products.data);
      setCustomerAnalytics(customers.data);
      setRevenueByCategory(revenue.data);
      setOrderStatusDistribution(status.data);
      setMonthlyComparison(comparison.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const formatCurrency = (value) => {
    return `${value.toLocaleString('tr-TR')} ₺`;
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="spinner"></div>
        <p>Analiz verileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h1><FaChartLine /> Satış Analitiği</h1>
        <div className="date-range-selector">
          <label>Dönem:</label>
          <select value={dateRange} onChange={(e) => setDateRange(Number(e.target.value))}>
            <option value={7}>Son 7 Gün</option>
            <option value={30}>Son 30 Gün</option>
            <option value={90}>Son 90 Gün</option>
            <option value={365}>Son 1 Yıl</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <motion.div 
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="kpi-icon" style={{ background: '#8B0000' }}>
            <FaDollarSign />
          </div>
          <div className="kpi-content">
            <h3>Toplam Gelir</h3>
            <p className="kpi-value">{formatCurrency(customerAnalytics.totalRevenue || 0)}</p>
            <span className="kpi-growth positive">
              +{monthlyComparison.revenueGrowthPercentage || 0}% (Bu Ay)
            </span>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="kpi-icon" style={{ background: '#0088FE' }}>
            <FaShoppingCart />
          </div>
          <div className="kpi-content">
            <h3>Toplam Sipariş</h3>
            <p className="kpi-value">{customerAnalytics.totalOrders || 0}</p>
            <span className="kpi-growth positive">
              +{monthlyComparison.orderGrowthPercentage || 0}% (Bu Ay)
            </span>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="kpi-icon" style={{ background: '#00C49F' }}>
            <FaUsers />
          </div>
          <div className="kpi-content">
            <h3>Toplam Müşteri</h3>
            <p className="kpi-value">{customerAnalytics.totalCustomers || 0}</p>
            <span className="kpi-subtitle">
              {customerAnalytics.repeatCustomerRate || 0}% Tekrar Müşteri
            </span>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="kpi-icon" style={{ background: '#FFBB28' }}>
            <FaBox />
          </div>
          <div className="kpi-content">
            <h3>Ortalama Sipariş</h3>
            <p className="kpi-value">{formatCurrency(customerAnalytics.averageOrderValue || 0)}</p>
            <span className="kpi-subtitle">Sepet Tutarı</span>
          </div>
        </motion.div>
      </div>

      {/* Sales Trend Chart */}
      <motion.div 
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2>Satış Trendi</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8B0000" strokeWidth={2} name="Gelir" />
            <Line type="monotone" dataKey="orderCount" stroke="#0088FE" strokeWidth={2} name="Sipariş Sayısı" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="charts-row">
        {/* Top Products Chart */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2><FaTrophy /> En Çok Satan Ürünler</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productName" angle={-15} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSold" fill="#8B0000" name="Satış Adedi" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue by Category */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2>Kategoriye Göre Gelir</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueByCategory}
                dataKey="revenue"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.category}: ${formatCurrency(entry.revenue)}`}
              >
                {revenueByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Order Status Distribution */}
      <motion.div 
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2>Sipariş Durumu Dağılımı</h2>
        <div className="status-grid">
          {orderStatusDistribution.map((status, index) => (
            <div key={status.status} className="status-item">
              <div 
                className="status-color" 
                style={{ background: COLORS[index % COLORS.length] }}
              ></div>
              <div className="status-info">
                <h3>{status.status}</h3>
                <p className="status-count">{status.count} Sipariş</p>
                <p className="status-percentage">
                  {((status.count / customerAnalytics.totalOrders) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
