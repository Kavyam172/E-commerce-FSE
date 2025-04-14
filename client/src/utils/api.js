import axios from 'axios';

// Base API configuration - replace with your actual backend URL when available
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API endpoints
export const authAPI = {
  login: async (credentials) => {
    // For now, mock the login response
    if (credentials.email === 'user@example.com' && credentials.password === 'password') {
      const mockResponse = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
        token: 'mock-jwt-token',
      };
      localStorage.setItem('token', 'mock-jwt-token');
      return mockResponse;
    }
    throw new Error('Invalid credentials');
    
    // When integrating with a real backend, replace with:
    // const response = await api.post('/auth/login', credentials);
    // localStorage.setItem('token', response.data.token);
    // return response.data;
  },
  
  register: async (userData) => {
    // Mock registration
    const mockResponse = {
      id: 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      token: 'mock-jwt-token',
    };
    localStorage.setItem('token', 'mock-jwt-token');
    return mockResponse;
    
    // When integrating with a real backend, replace with:
    // const response = await api.post('/auth/register', userData);
    // localStorage.setItem('token', response.data.token);
    // return response.data;
  },
  
  logout: async () => {
    localStorage.removeItem('token');
    
    // When integrating with a real backend, you might want to:
    // return api.post('/auth/logout');
  }
};

// Products API endpoints
export const productsAPI = {
  getAll: async (filters = {}) => {
    // When integrating with a real backend, replace with:
    // const response = await api.get('/products', { params: filters });
    // return response.data;
    
    // For now we're using local dummy data
    // This will be replaced when integrating with a real backend
    return Promise.resolve([]);
  },
  
  getById: async (id) => {
    // When integrating with a real backend, replace with:
    // const response = await api.get(`/products/${id}`);
    // return response.data;
    
    return Promise.resolve(null);
  },
  
  getCategories: async () => {
    // When integrating with a real backend, replace with:
    // const response = await api.get('/products/categories');
    // return response.data;
    
    return Promise.resolve([]);
  }
};

// Orders API endpoints
export const ordersAPI = {
  create: async (orderData) => {
    // When integrating with a real backend, replace with:
    // const response = await api.post('/orders', orderData);
    // return response.data;
    
    // Mock order creation
    return Promise.resolve({
      id: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
      ...orderData,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    });
  },
  
  getAll: async () => {
    // When integrating with a real backend, replace with:
    // const response = await api.get('/orders');
    // return response.data;
    
    return Promise.resolve([]);
  },
  
  getById: async (id) => {
    // When integrating with a real backend, replace with:
    // const response = await api.get(`/orders/${id}`);
    // return response.data;
    
    return Promise.resolve(null);
  }
};

export default api;
