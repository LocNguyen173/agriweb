const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact/contactController');

// Route gửi email liên hệ
router.post('/send-email', contactController.sendContactEmail);

module.exports = router;
