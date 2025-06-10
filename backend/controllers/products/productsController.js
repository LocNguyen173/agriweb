const { Product } = require('../../config/model');

const createAndSaveProduct = async (productData, done) => {
  try {
    console.log("Received category:", productData.category);
    
    if (!productData.category) {
      return done(new Error("Category ID is required"));
    }
    
    const product = new Product({
      productId: productData.productId || "prod123",
      name: productData.name || "New Product",
      description: productData.description || "This is a description of my first product.",
      price: productData.price || 100,
      image: productData.image || "https://example.com/product.jpg",
      category: productData.category, // ObjectId reference to Category
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

const findProductAndEdit = async (productId, updateData, done) => {
  try {
    const product = await Product.findById(productId);
    if (!product) return done(new Error("Product not found"));

    // Update fields if provided
    if (updateData.description) product.description = updateData.description;
    if (updateData.name) product.name = updateData.name;
    if (updateData.price) product.price = updateData.price;
    if (updateData.image) product.image = updateData.image;
    if (updateData.category) product.category = updateData.category; // Update category if provided
    product.updated_at = new Date();

    const data = await product.save();
    console.log("Product updated:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const findCategoryAndUpdate = async (name, categoryData, done) => {
  try {
    // Check if category is provided
    if (!categoryData || !categoryData.category) {
      return done(new Error("Category ID is required"));
    }
    
    const data = await Product.findOneAndUpdate(
      { name }, 
      { 
        category: categoryData.category,
        updated_at: new Date() 
      }, 
      { new: true }
    );
    
    if (!data) {
      return done(new Error(`Product with name '${name}' not found`));
    }
    
    console.log("Product updated category:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const findPriceAndUpdate = async (name, priceData, done) => {
  try {
    if (!priceData || !priceData.price) {
      return done(new Error("Price is required"));
    }
    
    const data = await Product.findOneAndUpdate(
      { name }, 
      { 
        price: priceData.price,
        updated_at: new Date() 
      }, 
      { new: true }
    );
    
    if (!data) {
      return done(new Error(`Product with name '${name}' not found`));
    }
    
    console.log("Product updated price:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const removeProductById = async (productId, done) => {
  try {
    const data = await Product.findByIdAndDelete(productId);
    
    if (!data) {
      return done(new Error("Product not found"));
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
  findCategoryAndUpdate,
  findPriceAndUpdate,
  removeProductById,
  removeManyProducts,
  queryChainProduct,
  findProductsByCategory
};