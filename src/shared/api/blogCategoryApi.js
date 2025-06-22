import axiosInstance from "../utils/axios";

const blogCategoryApi = {
  /**
   * Get all blog categories
   * @returns {Promise} Promise object with blog categories data
   */
  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get('/api/blog-categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      throw error;
    }
  },

  /**
   * Get a blog category by ID
   * @param {string} id - The blog category ID
   * @returns {Promise} Promise object with blog category data
   */
  getCategoryById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/blog-categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog category with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new blog category
   * @param {Object} categoryData - The blog category data (name, description)
   * @returns {Promise} Promise object with created blog category data
   */
  createCategory: async (categoryData) => {
    try {
      const response = await axiosInstance.post('/api/blog-categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating blog category:', error);
      throw error;
    }
  },

  /**
   * Update an existing blog category
   * @param {string} id - The blog category ID
   * @param {Object} categoryData - The updated blog category data
   * @returns {Promise} Promise object with updated blog category data
   */
  updateCategory: async (id, categoryData) => {
    try {
      const response = await axiosInstance.put(`/api/blog-categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating blog category with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a blog category
   * @param {string} id - The blog category ID
   * @returns {Promise} Promise object with deleted blog category data
   */
  deleteCategory: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/blog-categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting blog category with ID ${id}:`, error);
      throw error;
    }
  }
};

export default blogCategoryApi;