import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for unified error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An error occurred while fetching data.',
      status: error.response?.status,
    };
    return Promise.reject(customError);
  }
);

export const apiService = {
  // Fetch paginated products
  getProducts: async ({ limit = 16, skip = 0, sortBy, order } = {}) => {
    let url = `/products?limit=${limit}&skip=${skip}`;
    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${order || 'asc'}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  },

  // Fetch all products up to a specified limit
  getAllProducts: async (limit = 100) => {
    const response = await apiClient.get(`/products?limit=${limit}`);
    return response.data;
  },

  // Fetch single product by ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query, { limit = 16, skip = 0 } = {}) => {
    const response = await apiClient.get(
      `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category, { limit = 16, skip = 0 } = {}) => {
    const response = await apiClient.get(
      `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    const response = await apiClient.get(`/products?limit=${limit}&skip=0`);
    return response.data;
  },

  // Get popular/top rated products
  getPopularProducts: async (limit = 8) => {
    const response = await apiClient.get(`/products?limit=${limit}&skip=10&sortBy=rating&order=desc`);
    return response.data;
  },
};

export default apiService;
