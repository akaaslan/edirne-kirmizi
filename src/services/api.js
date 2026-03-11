/* eslint-disable no-unused-vars */
// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function for fetch with error handling
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      // Handle 403 Forbidden (expired or invalid token)
      if (response.status === 403 || response.status === 401) {
        console.warn('Token expired or invalid. Logging out...');
        // Clear all auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        // Redirect to login
        if (window.location.pathname.includes('/admin')) {
          window.location.href = '/admin/login';
        } else {
          window.location.href = '/giris';
        }
        throw new Error('Session expired. Please login again.');
      }
      
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }
    
    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const api = {
  // Authentication
  // Authentication — uses raw fetch to avoid auto-logout on 401
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorData;
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = { error: await response.text() };
      }
      throw new Error(errorData.error || errorData.message || 'Giriş başarısız');
    }
    
    return await response.json();
  },

  register: async (userData) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  },

  // User Profile
  getUserProfile: async (userId) => {
    const token = getAuthToken() || localStorage.getItem('userToken');
    return fetchWithErrorHandling(`${API_BASE_URL}/users/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  updateUserProfile: async (userId, profileData) => {
    const token = getAuthToken() || localStorage.getItem('userToken');
    return fetchWithErrorHandling(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  },

  // Password Reset
  forgotPassword: async (email) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  },

  // Newsletter
  subscribeNewsletter: async (email, name) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
  },

  // Products
  getAllProducts: async () => {
    return fetchWithErrorHandling(`${API_BASE_URL}/products`);
  },

  getProductById: async (id) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/products/${id}`);
  },

  getCategories: async () => {
    return fetchWithErrorHandling(`${API_BASE_URL}/products/categories`);
  },

  getProductsByCategory: async (category) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
  },

  createProduct: async (productData) => {
    const token = getAuthToken();
    return fetchWithErrorHandling(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id, productData) => {
    const token = getAuthToken();
    return fetchWithErrorHandling(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id) => {
    const token = getAuthToken();
    return fetchWithErrorHandling(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Stock Management
  updateStock: async (id, stockCount) => {
    const token = getAuthToken();
    return fetchWithErrorHandling(`${API_BASE_URL}/products/${id}/stock?stockCount=${stockCount}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  decreaseStock: async (id, quantity) => {
    const token = getAuthToken();
    return fetchWithErrorHandling(`${API_BASE_URL}/products/${id}/stock/decrease?quantity=${quantity}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  increaseStock: async (id, quantity) => {
    const token = getAuthToken();
    return fetchWithErrorHandling(`${API_BASE_URL}/products/${id}/stock/increase?quantity=${quantity}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Contact
  sendContactMessage: async (name, email, message) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/contact/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });
  },

  // File Upload
  uploadImage: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url || data.imageUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  },

  uploadMultipleImages: async (files) => {
    const token = getAuthToken();
    const formData = new FormData();
    
    // Append all files
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/upload/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.urls || data.imageUrls || [];
    } catch (error) {
      console.error('Multiple images upload error:', error);
      throw error;
    }
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      const [products, customerCountResponse] = await Promise.all([
        // GET /api/products is public - no token needed
        fetchWithErrorHandling(`${API_BASE_URL}/products`),
        fetchWithErrorHandling(`${API_BASE_URL}/users/customers/count`, {
          headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        }).catch(() => 0)
      ]);
      
      // Calculate stats from products
      const totalProducts = products.length;
      const lowStockItems = products.filter(p => (p.stockCount || 0) < 10).length;
      const totalStockValue = products.reduce((sum, p) => {
        const price = parseFloat(p.price.replace(/[₺,]/g, '')) || 0;
        const stock = p.stockCount || 0;
        return sum + (price * stock);
      }, 0);

      return {
        totalProducts,
        totalOrders: 0, // Will come from order system
        totalRevenue: 0, // Will come from order system
        totalCustomers: customerCountResponse || 0,
        lowStockItems,
        pendingOrders: 0, // Will come from order system
        totalStockValue
      };
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw error;
    }
  },

  // Orders (placeholder - backend order creation is disabled)
  getAllOrders: async () => {
    const token = getAuthToken();
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  // Customers (placeholder - backend needs User query endpoints)
  getAllCustomers: async () => {
    const token = getAuthToken();
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/users/customers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  },

  // Analytics
  getSalesAnalytics: async (startDate, endDate) => {
    const token = getAuthToken();
    // TODO: Implement backend endpoint
    // return fetchWithErrorHandling(
    //   `${API_BASE_URL}/analytics/sales?start=${startDate}&end=${endDate}`,
    //   { headers: { 'Authorization': `Bearer ${token}` } }
    // );
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      topProducts: [],
      dailySales: []
    };
  },

  // Orders
  createOrder: async (orderData) => {
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getAllOrdersAdmin: async () => {
    const token = getAuthToken();
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  getOrderById: async (orderId) => {
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/orders/${orderId}`);
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  getOrdersByUser: async (userId) => {
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/orders/user/${userId}`);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }
  },

  updateOrderStatus: async (orderId, status) => {
    const token = getAuthToken();
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  getOrderStatistics: async () => {
    const token = getAuthToken();
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/orders/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error fetching order statistics:', error);
      return {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        statusCounts: {}
      };
    }
  },

  cancelOrder: async (orderId) => {
    const token = getAuthToken();
    try {
      return await fetchWithErrorHandling(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  },
};

