const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const blogCateRoutes = require('./routes/blogCateRoutes');
const productRoutes = require('./routes/productRoutes');
const productCateRoutes = require('./routes/productCateRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const enableCORS = require("./middlewares/enableCORS");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(enableCORS);
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// Routes
app.use('/api/users', userRoutes);

app.use('/api/blogs', blogRoutes);

app.use('/api/blog-categories', blogCateRoutes);

app.use('/api/products', productRoutes);

app.use('/api/product-categories', productCateRoutes);

app.use('/api/services', serviceRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/home/Home.vue'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});


