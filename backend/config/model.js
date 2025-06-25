const mongoose = require('mongoose');

// ===== Schema cho Category dùng chung (Blog/Product) =====
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['blog', 'product'], required: true }, // Phân biệt loại danh mục
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

// ===== Blog Schema =====
const blogSchema = new mongoose.Schema({
    blogId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    // type: { type: String, required: true }, // ví dụ: 'news', 'review', v.v.
    image: { type: String },
    // video: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // liên kết danh mục
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

// ===== Product Schema =====
const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // liên kết danh mục
    isFavorite: { type: Boolean, default: false }, // đánh dấu sản phẩm yêu thích
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


// ===== Service Schema =====
// const serviceSchema = new mongoose.Schema({
//     serviceId: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     image: { type: String },
//     created_at: { type: Date, default: Date.now },
//     updated_at: { type: Date, default: Date.now },
// });

// ===== Tạo Model =====
const Category = mongoose.model('Category', categorySchema);
const Blog = mongoose.model('Blog', blogSchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
// const Service = mongoose.model('Service', serviceSchema);

// ===== Xuất các Model =====
module.exports = {
    Category,
    Blog,
    Product,
    User
    // Service
};
