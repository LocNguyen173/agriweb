const { Category } = require('../../config/model');

// Tạo mới một danh mục blog
const createBlogCategory = async (data, callback) => {
  try {
    const newCategory = new Category({
      name: data.name,
      description: data.description,
      type: 'blog',
      created_at: new Date(),
      updated_at: new Date(),
    });
    const savedCategory = await newCategory.save();
    callback(null, savedCategory);
  } catch (err) {
    callback(err);
  }
};

// Lấy tất cả danh mục blog
const getAllBlogCategories = async (callback) => {
  try {
    const categories = await Category.find({ type: 'blog' });
    callback(null, categories);
  } catch (err) {
    callback(err);
  }
};

// Tìm danh mục blog theo ID
const getBlogCategoryById = async (id, callback) => {
  try {
    const category = await Category.findById(id);
    callback(null, category);
  } catch (err) {
    callback(err);
  }
};

// Cập nhật danh mục blog
const updateBlogCategory = async (id, data, callback) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          description: data.description,
          updated_at: new Date(),
        }
      },
      { new: true }
    );
    callback(null, category);
  } catch (err) {
    callback(err);
  }
};

// Xóa danh mục blog
const deleteBlogCategory = async (id, callback) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    callback(null, category);
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
};
