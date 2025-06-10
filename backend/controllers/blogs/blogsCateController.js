const { Category } = require('../../config/model');

// Tạo mới một danh mục blog
const createBlogCategory = async (data) => {
  try {
    const category = new Category({
      name: data.name,
      description: data.description,
      type: 'blog',
      created_at: new Date(),
      updated_at: new Date(),
    });
    const result = await category.save();
    return result;
  } catch (err) {
    console.error('Lỗi tạo category:', err);
    throw err;
  }
};

// Lấy tất cả danh mục blog
const getAllBlogCategories = async () => {
  try {
    const categories = await Category.find({ type: 'blog' });
    return categories;
  } catch (err) {
    console.error('Lỗi lấy tất cả danh mục blog:', err);
    throw err;
  }
};

// Tìm danh mục blog theo ID
const getBlogCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    return category;
  } catch (err) {
    console.error('Lỗi tìm danh mục blog theo ID:', err);
    throw err;
  }
};

// Cập nhật danh mục blog
const updateBlogCategory = async (id, data) => {
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
    return category;
  } catch (err) {
    console.error('Lỗi cập nhật danh mục blog:', err);
    throw err;
  }
};

// Xóa danh mục blog
const deleteBlogCategory = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    return category;
  } catch (err) {
    console.error('Lỗi xóa danh mục blog:', err);
    throw err;
  }
};

module.exports = {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
};
