const { Category } = require('../../config/model');

// Tạo mới một danh mục sản phẩm
const createProductCategory = (data, done) => {
  const category = new Category({
    name: data.name,
    description: data.description,
    type: 'product',
    created_at: new Date(),
    updated_at: new Date(),
  });
  category.save((err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

// Lấy tất cả danh mục sản phẩm
const getAllProductCategories = (done) => {
  Category.find({ type: 'product' }, (err, categories) => {
    if (err) return done(err);
    done(null, categories);
  });
};

// Tìm danh mục sản phẩm theo ID
const getProductCategoryById = (id, done) => {
  Category.findById(id, (err, category) => {
    if (err) return done(err);
    done(null, category);
  });
};

// Cập nhật danh mục sản phẩm
const updateProductCategory = (id, data, done) => {
  Category.findByIdAndUpdate(
    id,
    {
      $set: {
        name: data.name,
        description: data.description,
        updated_at: new Date(),
      },
    },
    { new: true },
    (err, category) => {
      if (err) return done(err);
      done(null, category);
    }
  );
};

// Xóa danh mục sản phẩm
const deleteProductCategory = (id, done) => {
  Category.findByIdAndRemove(id, (err, category) => {
    if (err) return done(err);
    done(null, category);
  });
};

module.exports = {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};