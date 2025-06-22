const { Product } = require('../../config/model');
const { productImageToFirebase, deleteProductImageByUrl } = require('../../utils/products/image.product');

// Tạo Product mới, upload ảnh lên Firebase nếu có
const createAndSaveProduct = async (productData, done) => {
  try {
    console.log("Received category:", productData.category);

    if (!productData.category) {
      return done(new Error("Category ID is required"));
    }

    let imageUrl = productData.image || null;
    // Nếu có imageBase64 và imageName thì upload lên Firebase
    if (productData.imageBase64 && productData.imageName) {
      const buffer = Buffer.from(productData.imageBase64, 'base64');
      imageUrl = await productImageToFirebase({
        originalname: productData.imageName,
        buffer,
        mimetype: productData.imageMimetype || 'image/jpeg'
      });
    }

    const product = new Product({
      productId: productData.productId || "prod123",
      name: productData.name || "New Product",
      description: productData.description || "This is a description of my first product.",
      price: productData.price || 100,
      image: imageUrl,
      category: productData.category,
      created_at: new Date(),
      updated_at: new Date()
    });

    const data = await product.save();
    console.log("Product saved:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const createManyProducts = async (arrayOfProducts, done) => {
  try {
    // Each product in array must have category field (ObjectId)
    const data = await Product.create(arrayOfProducts);
    console.log("Many Products saved:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const findProductsByDate = async (dateString, done) => {
  try {
    // Parse date string (e.g., "2025-06-10")
    const date = new Date(dateString);
    
    // Validate date format
    if (isNaN(date.getTime())) {
      return done(new Error("Invalid date format. Use YYYY-MM-DD"));
    }
    
    // Create time range for the entire day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const data = await Product.find({
      created_at: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).populate('category'); // Populate category information
    
    console.log(`Products found for date ${dateString}:`, data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const findOneByName = async (name, done) => {
  try {
    const data = await Product.findOne({ name }).populate('category');
    console.log("Product found by name:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const findProductById = async (productId, done) => {
  try {
    const data = await Product.findById(productId).populate('category');
    console.log("Product found by ID:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Cập nhật Product, nếu có ảnh mới thì xóa ảnh cũ trên Firebase và upload ảnh mới
const findProductAndEdit = async (productId, updateData, done) => {
  try {
    const product = await Product.findById(productId);
    if (!product) return done(new Error("Product not found"));

    // Xử lý ảnh mới
    let imageUrl = product.image;
    if (updateData.imageBase64 && updateData.imageName) {
      // Xóa ảnh cũ nếu có
      if (product.image) {
        await deleteProductImageByUrl(product.image);
      }
      const buffer = Buffer.from(updateData.imageBase64, 'base64');
      imageUrl = await productImageToFirebase({
        originalname: updateData.imageName,
        buffer,
        mimetype: updateData.imageMimetype || 'image/jpeg'
      });
    }

    // Cập nhật các trường
    if (updateData.description) product.description = updateData.description;
    if (updateData.name) product.name = updateData.name;
    if (updateData.price) product.price = updateData.price;
    if (imageUrl) product.image = imageUrl;
    if (updateData.category) product.category = updateData.category;
    product.updated_at = new Date();

    const data = await product.save();
    console.log("Product updated:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Xóa Product, đồng thời xóa ảnh khỏi Firebase nếu có
const removeProductById = async (productId, done) => {
  try {
    const data = await Product.findByIdAndDelete(productId);

    if (!data) {
      return done(new Error("Product not found"));
    }

    if (data.image) {
      await deleteProductImageByUrl(data.image);
    }

    console.log("Product removed:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const removeManyProducts = async (data, done) => {
  try {
    if (!data || !data.nameToRemove) {
      return done(new Error("nameToRemove is required"));
    }
    
    const result = await Product.deleteMany({ name: data.nameToRemove });
    console.log("Products removed:", result);
    done(null, result);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const queryChainProduct = async (data, done) => {
  try {
    if (!data || !data.price) {
      data = { price: 200 }; // Default value if not provided
    }
    
    const queryProducts = await Product.find({ price: data.price })
      .populate('category')
      .sort({ name: 1 })
      .limit(2)
      .select({ description: 0, image: 0 });

    console.log("Query chain result:", queryProducts);
    done(null, queryProducts);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Find products by category
const findProductsByCategory = async (categoryId, done) => {
  try {
    const products = await Product.find({ category: categoryId })
      .populate('category');
      
    console.log("Products found by category:", products);
    done(null, products);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

module.exports = {
  createAndSaveProduct,
  createManyProducts,
  findProductsByDate,
  findOneByName,
  findProductById,
  findProductAndEdit,
  // findCategoryAndUpdate,
  // findPriceAndUpdate,
  removeProductById,
  removeManyProducts,
  queryChainProduct,
  findProductsByCategory
};