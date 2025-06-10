const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services/servicesController');

// Tạo dịch vụ mới
router.post('/', (req, res) => {
  servicesController.createAndSaveService((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

// Tạo nhiều dịch vụ
router.post('/many', (req, res) => {
  servicesController.createManyServices(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

// Tìm dịch vụ theo ngày tạo
router.get('/date/:date', (req, res) => {
  servicesController.findServicesByDate(req.params.date, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Tìm dịch vụ theo tên
router.get('/name/:name', (req, res) => {
  servicesController.findOneByName(req.params.name, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Tìm dịch vụ theo ID
router.get('/:id', (req, res) => {
  servicesController.findServiceById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Sửa dịch vụ theo ID
router.put('/:id', (req, res) => {
  servicesController.findServiceAndEdit(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Sửa image dịch vụ theo tên
router.put('/image/:name', (req, res) => {
  servicesController.findImageAndUpdate(req.params.name, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Xóa dịch vụ theo ID
router.delete('/:id', (req, res) => {
  servicesController.removeServiceById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Xóa nhiều dịch vụ theo tên mặc định
router.delete('/', (req, res) => {
  servicesController.removeManyServices((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Query chain
router.get('/', (req, res) => {
  servicesController.queryChainService((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

module.exports = router;