const express = require('express');
const router = express.Router();
const productsCateController = require('../controllers/products/productsCateController');

// Tạo mới danh mục sản phẩm
router.post('/', (req, res) => {
  productsCateController.createProductCategory(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

// Lấy tất cả danh mục sản phẩm
router.get('/', (req, res) => {
  productsCateController.getAllProductCategories((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Lấy danh mục sản phẩm theo ID
router.get('/:id', (req, res) => {
  productsCateController.getProductCategoryById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ error: 'Category not found' });
    res.json(data);
  });
});

// Cập nhật danh mục sản phẩm theo ID
router.put('/:id', (req, res) => {
  productsCateController.updateProductCategory(req.params.id, req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ error: 'Category not found' });
    res.json(data);
  });
});

// Xóa danh mục sản phẩm theo ID
router.delete('/:id', (req, res) => {
  productsCateController.deleteProductCategory(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted', data });
  });
});

module.exports = router;