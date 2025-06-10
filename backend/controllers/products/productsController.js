const { Product } = require('../../config/model');

const createAndSaveProduct = (done) => {
  const product = new Product({
    productId: "prod123",
    name: "New Product",
    description: "This is a description of my first product.",
    price: 100,
    image: "https://example.com/product.jpg",
    created_at: new Date(),
    updated_at: new Date()
  });
  product.save((err, data) => {
    if (err) return console.error(err);
    console.log("Product saved:", data);
    done(null, data);
  });
};

const createManyProducts = (arrayOfProducts, done) => {
  Product.create(arrayOfProducts, (err, data) => {
    if (err) return console.error(err);
    console.log("Many Products saved:", data);
    done(null, data);
  });
};

const findProductsByDate = (date, done) => {
  Product.find({ created_at: date }, (err, data) => {
    if (err) return console.error(err);
    console.log("Products found by date:", data);
    done(null, data);
  });
};

const findOneByName = (name, done) => {
  Product.findOne({ name: name }, (err, data) => {
    if (err) return console.error(err);
    console.log("Product found by name:", data);
    done(null, data);
  });
};

const findProductById = (productId, done) => {
  Product.findById(productId, (err, data) => {
    if (err) return console.error(err);
    console.log("Product found by ID:", data);
    done(null, data);
  });
};

const findProductAndEdit = (productId, done) => {
  const description = "testing update of product description";
  Product.findById(productId, (err, product) => {
    if (err) return done(err);
    if (!product) return done(new Error("Product not found"));
    product.description = description;
    product.save((err, data) => {
      if (err) return done(err);
      console.log("Product updated:", data);
      done(null, data);
    });
  });
};

const findPriceAndUpdate = (name, done) => {
  const priceToSet = 200;
  Product.findOneAndUpdate({ name: name }, { price: priceToSet }, { new: true }, (err, data) => {
    if (err) return console.error(err);
    console.log("Product updated price:", data);
    done(null, data);
  });
};

const removeProductById = (productId, done) => {
  Product.findByIdAndRemove(productId, (err, data) => {
    if (err) return console.error(err);
    console.log("Product removed:", data);
    done(null, data);
  });
};

const removeManyProducts = (done) => {
  const nameToRemove = "New Product";
  Product.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    console.log("Products removed:", data);
    done(null, data);
  });
};

const queryChainProduct = (done) => {
  const priceToSearch = 200;
  Product.find({ price: priceToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ description: 0, image: 0 })
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log("Query chain result:", data);
      done(null, data);
    });
};

exports.createAndSaveProduct = createAndSaveProduct;
exports.createManyProducts = createManyProducts;
exports.findProductsByDate = findProductsByDate;
exports.findOneByName = findOneByName;
exports.findProductById = findProductById;
exports.findProductAndEdit = findProductAndEdit;
exports.findPriceAndUpdate = findPriceAndUpdate;
exports.removeProductById = removeProductById;
exports.removeManyProducts = removeManyProducts;
exports.queryChainProduct = queryChainProduct;