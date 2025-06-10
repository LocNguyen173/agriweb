const { Category } = require('../../config/model');

// Tạo mới một danh mục sản phẩm
const createProductCategory = async (data, done) => {
  try {
    const category = new Category({
      name: data.name,
      description: data.description,
      type: 'product',
      created_at: new Date(),
      updated_at: new Date(),
    });
    const result = await category.save();
    done(null, result);
  } catch (err) {
    done(err);
  }
};

// Lấy tất cả danh mục sản phẩm
const getAllProductCategories = async (done) => {
  try {
    const categories = await Category.find({ type: 'product' });
    done(null, categories);
  } catch (err) {
    done(err);
  }
};

// Tìm danh mục sản phẩm theo ID
const getProductCategoryById = async (id, done) => {
  try {
    const category = await Category.findById(id);
    done(null, category);
  } catch (err) {
    done(err);
  }
};

// Cập nhật danh mục sản phẩm
const updateProductCategory = async (id, data, done) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          description: data.description,
          updated_at: new Date(),
        },
      },
      { new: true }
    );
    done(null, category);
  } catch (err) {
    done(err);
  }
};

// Xóa danh mục sản phẩm
const deleteProductCategory = async (id, done) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    done(null, category);
  } catch (err) {
    done(err);
  }
};

module.exports = {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};