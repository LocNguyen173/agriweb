import axiosInstance from "../utils/axios";

const productCategoryApi = {
  /**
   * Get all product categories
   * @returns {Promise} Promise object with product categories data
   */
  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get('/api/product-categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching product categories:', error);
      throw error;
    }
  },

  /**
   * Get a product category by ID
   * @param {string} id - The product category ID
   * @returns {Promise} Promise object with product category data
   */
  getCategoryById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/product-categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product category with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new product category
   * @param {Object} categoryData - The product category data (name, description)
   * @returns {Promise} Promise object with created product category data
   */
  createCategory: async (categoryData) => {
    try {
      const response = await axiosInstance.post('/api/product-categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating product category:', error);
      throw error;
    }
  },

  /**
   * Update an existing product category
   * @param {string} id - The product category ID
   * @param {Object} categoryData - The updated product category data
   * @returns {Promise} Promise object with updated product category data
   */
  updateCategory: async (id, categoryData) => {
    try {
      const response = await axiosInstance.put(`/api/product-categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product category with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a product category
   * @param {string} id - The product category ID
   * @returns {Promise} Promise object with deleted product category data
   */
  deleteCategory: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/product-categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product category with ID ${id}:`, error);
      throw error;
    }
  }
};

export default productCategoryApi;