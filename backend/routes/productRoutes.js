const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products/productsController');

// Tạo sản phẩm mới
router.post('/', (req, res) => {
  productsController.createAndSaveProduct(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

// Tạo nhiều sản phẩm
router.post('/many', (req, res) => {
  productsController.createManyProducts(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

// Tìm sản phẩm theo ngày tạo
router.get('/date/:date', (req, res) => {
  productsController.findProductsByDate(req.params.date, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Tìm sản phẩm theo tên
router.get('/name/:name', (req, res) => {
  productsController.findOneByName(req.params.name, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Tìm sản phẩm theo ID
router.get('/:id', (req, res) => {
  productsController.findProductById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Sửa sản phẩm theo ID
router.put('/:id', (req, res) => {
  productsController.findProductAndEdit(req.params.id, req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Sửa giá sản phẩm theo tên
router.put('/price/:name', (req, res) => {
  productsController.findPriceAndUpdate(req.params.name, req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Xóa sản phẩm theo ID
router.delete('/:id', (req, res) => {
  productsController.removeProductById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Xóa nhiều sản phẩm theo tên mặc định
router.delete('/', (req, res) => {
  productsController.removeManyProducts(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Query chain
router.get('/', (req, res) => {
  productsController.queryChainProduct(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

module.exports = router;