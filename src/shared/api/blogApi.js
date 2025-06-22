import axiosInstance from "../utils/axios";

const blogApi = {
  /**
   * Get all blogs with optional query parameters
   * @param {Object} queryParams - Query parameters for filtering blogs
   * @returns {Promise} Promise object with blogs data
   */
  getAllBlogs: async (queryParams = {}) => {
    try {
      const response = await axiosInstance.get('/api/blogs/all', queryParams);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  /**
   * Get blog by ID
   * @param {string} id - The blog ID
   * @returns {Promise} Promise object with blog data
   */
  getBlogById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Find blog by title
   * @param {string} title - The blog title
   * @returns {Promise} Promise object with blog data
   */
  getBlogByTitle: async (title) => {
    try {
      const response = await axiosInstance.get(`/api/blogs/title/${title}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog with title ${title}:`, error);
      throw error;
    }
  },

  /**
   * Find blogs by date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise} Promise object with blogs data
   */
  getBlogsByDate: async (date) => {
    try {
      const response = await axiosInstance.get(`/api/blogs/date/${date}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blogs for date ${date}:`, error);
      throw error;
    }
  },

  /**
   * Create a new blog
   * @param {Object} blogData - The blog data (title, description, content, category, etc.)
   * @returns {Promise} Promise object with created blog data
   */
  createBlog: async (blogData) => {
    try {
      const response = await axiosInstance.post('/api/blogs', blogData);
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  /**
   * Create multiple blogs
   * @param {Array} blogsArray - Array of blog objects
   * @returns {Promise} Promise object with created blogs data
   */
  createManyBlogs: async (blogsArray) => {
    try {
      const response = await axiosInstance.post('/api/blogs/many', blogsArray);
      return response.data;
    } catch (error) {
      console.error('Error creating multiple blogs:', error);
      throw error;
    }
  },

  /**
   * Update an existing blog
   * @param {string} id - The blog ID
   * @param {Object} blogData - The updated blog data
   * @returns {Promise} Promise object with updated blog data
   */
  updateBlog: async (id, blogData) => {
    try {
      const response = await axiosInstance.put(`/api/blogs/${id}`, blogData);
      return response.data;
    } catch (error) {
      console.error(`Error updating blog with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Update blog category by title
   * @param {string} title - The blog title
   * @param {Object} categoryData - The category data {category: categoryId}
   * @returns {Promise} Promise object with updated blog data
   */
  updateBlogCategory: async (title, categoryData) => {
    try {
      const response = await axiosInstance.put(`/api/blogs/category/${title}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating category for blog ${title}:`, error);
      throw error;
    }
  },

  /**
   * Delete a blog by ID
   * @param {string} id - The blog ID
   * @returns {Promise} Promise object with deleted blog data
   */
  deleteBlog: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting blog with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete multiple blogs by title
   * @param {Object} data - Object containing {titleToRemove: string}
   * @returns {Promise} Promise object with deletion result
   */
  deleteManyBlogs: async (data) => {
    try {
      const response = await axiosInstance.delete('/api/blogs', { data });
      return response.data;
    } catch (error) {
      console.error('Error deleting multiple blogs:', error);
      throw error;
    }
  }
}

export default blogApi;