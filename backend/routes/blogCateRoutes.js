const express = require('express');
const router = express.Router();
const blogsCateController = require('../controllers/blogs/blogsCateController');

// Tạo mới danh mục blog
router.post('/', (req, res) => {
  blogsCateController.createBlogCategory(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

// Lấy tất cả danh mục blog
router.get('/', (req, res) => {
  blogsCateController.getAllBlogCategories((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Lấy danh mục blog theo ID
router.get('/:id', (req, res) => {
  blogsCateController.getBlogCategoryById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ error: 'Category not found' });
    res.json(data);
  });
});

// Cập nhật danh mục blog theo ID
router.put('/:id', (req, res) => {
  blogsCateController.updateBlogCategory(req.params.id, req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ error: 'Category not found' });
    res.json(data);
  });
});

// Xóa danh mục blog theo ID
router.delete('/:id', (req, res) => {
  blogsCateController.deleteBlogCategory(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted', data });
  });
});

module.exports = router;