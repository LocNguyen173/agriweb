import axiosInstance from "../utils/axios";

const productApi = {
  /**
   * Get all products with optional query parameters
   * @param {Object} queryParams - Query parameters for filtering products
   * @returns {Promise} Promise object with products data
   */
  getAllProducts: async (queryParams = {}) => {
    try {
      const response = await axiosInstance.get('/api/products/all', queryParams);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Get product by ID
   * @param {string} id - The product ID
   * @returns {Promise} Promise object with product data
   */
  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Find product by name
   * @param {string} name - The product name
   * @returns {Promise} Promise object with product data
   */
  getProductByName: async (name) => {
    try {
      const response = await axiosInstance.get(`/api/products/name/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with name ${name}:`, error);
      throw error;
    }
  },

  /**
   * Find products by date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise} Promise object with products data
   */
  getProductsByDate: async (date) => {
    try {
      const response = await axiosInstance.get(`/api/products/date/${date}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for date ${date}:`, error);
      throw error;
    }
  },

  /**
   * Create a new product
   * @param {Object} productData - The product data (name, description, price, category, etc.)
   * @returns {Promise} Promise object with created product data
   */
  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post('/api/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  /**
   * Create multiple products
   * @param {Array} productsArray - Array of product objects
   * @returns {Promise} Promise object with created products data
   */
  createManyProducts: async (productsArray) => {
    try {
      const response = await axiosInstance.post('/api/products/many', productsArray);
      return response.data;
    } catch (error) {
      console.error('Error creating multiple products:', error);
      throw error;
    }
  },

  /**
   * Update an existing product
   * @param {string} id - The product ID
   * @param {Object} productData - The updated product data
   * @returns {Promise} Promise object with updated product data
   */
  updateProduct: async (id, productData) => {
    try {
      const response = await axiosInstance.put(`/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Update product price by name
   * @param {string} name - The product name
   * @param {Object} priceData - The price data {price: number}
   * @returns {Promise} Promise object with updated product data
   */
  updateProductPrice: async (name, priceData) => {
    try {
      const response = await axiosInstance.put(`/api/products/price/${name}`, priceData);
      return response.data;
    } catch (error) {
      console.error(`Error updating price for product ${name}:`, error);
      throw error;
    }
  },

  /**
   * Delete a product by ID
   * @param {string} id - The product ID
   * @returns {Promise} Promise object with deleted product data
   */
  deleteProduct: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete multiple products by name
   * @param {Object} data - Object containing {nameToRemove: string}
   * @returns {Promise} Promise object with deletion result
   */
  deleteManyProducts: async (data) => {
    try {
      const response = await axiosInstance.delete('/api/products', { data });
      return response.data;
    } catch (error) {
      console.error('Error deleting multiple products:', error);
      throw error;
    }
  },

  /**
   * Query products with filters
   * @param {Object} queryParams - Query parameters (price, etc.)
   * @returns {Promise} Promise object with query results
   */
  queryProducts: async (queryParams = {}) => {
    try {
      const response = await axiosInstance.get('/api/products', { 
        params: queryParams 
      });
      return response.data;
    } catch (error) {
      console.error('Error querying products:', error);
      throw error;
    }
  }
};

export default productApi;