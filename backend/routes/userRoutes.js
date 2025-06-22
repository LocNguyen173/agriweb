const express = require('express');
const router = express.Router();
const userController = require('../controllers/users/userController');
// const authMiddleware = require('../middlewares/authMiddleware');

// Tạo user mới
router.post('/', (req, res) => {
  userController.createUser(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

// Tìm user theo username
router.get('/username/:username', (req, res) => {
  userController.findUserByUsername(req.params.username, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ error: 'User not found' });
    res.json(data);
  });
});

// Tìm user theo ID
router.get('/:id', (req, res) => {
  userController.findUserById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data) return res.status(404).json({ error: 'User not found' });
    res.json(data);
  });
});

// Cập nhật user
router.put('/:id', (req, res) => {
  userController.updateUser(req.params.id, req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Xóa user
router.delete('/:id', (req, res) => {
  userController.removeUserById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Đăng nhập user
router.post('/login', (req, res) => {
  userController.login(req.body, (err, data) => {
    if (err) return res.status(401).json({ error: err.message });
    res.json(data);
  });
});

module.exports = router;