import axiosInstance from '../utils/axios';

const userApi = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data (username, password)
   * @returns {Promise} - API response
   */
  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post('/api/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - User credentials (username, password)
   * @returns {Promise} - API response with user and token
   */
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/users/login', credentials);
      // Store token in localStorage for future authenticated requests
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout user (client-side)
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * Get user by ID
   * @param {string} id - User ID
   * @returns {Promise} - API response
   */
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get user by username
   * @param {string} username - Username
   * @returns {Promise} - API response
   */
  getUserByUsername: async (username) => {
    try {
      const response = await axiosInstance.get(`/api/users/username/${username}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update user information
   * @param {string} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} - API response
   */
  updateUser: async (id, userData) => {
    try {
      const response = await axiosInstance.put(`/api/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete user account
   * @param {string} id - User ID
   * @returns {Promise} - API response
   */
  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Check if user is authenticated based on token presence
   * @returns {boolean} - Authentication status
   */
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  /**
   * Get current user data from token
   * @returns {Object|null} - User data or null if not authenticated
   */
  getCurrentUserFromToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // Parse JWT payload (part between first and second dot)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      return {
        id: payload.id,
        username: payload.username
      };
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }
};

export default userApi;