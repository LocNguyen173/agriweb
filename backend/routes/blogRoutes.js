const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogs/blogsController');
const { Blog } = require('../config/model');

// Tạo blog mới
router.post('/', (req, res) => {
  blogsController.createAndSaveBlog(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

// Tạo nhiều blog
router.post('/many', (req, res) => {
  blogsController.createManyBlogs(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
});

router.get('/content/:blogId', blogsController.getBlogContent);

// Route để upload ảnh từ trình soạn thảo rich text
router.post('/upload-editor-image', (req, res) => {
  blogsController.uploadEditorImage(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    return res.status(200).json(result)
  })
})

// Tìm blog theo ngày tạo
router.get('/date/:date', (req, res) => {
  blogsController.findBlogsByDate(req.params.date, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Tìm blog theo tiêu đề
router.get('/title/:title', (req, res) => {
  blogsController.findOneByTitle(req.params.title, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

router.get('/all', (req, res) => {
  Blog.find({})
    .populate('category')
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Tìm blog theo ID
router.get('/:id', (req, res) => {
  blogsController.findBlogById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Sửa cateogry blog theo title
router.put('/category/:title', (req, res) => {
  blogsController.findCategoryAndUpdate(req.params.title, req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Sửa blog theo ID
router.put('/:id', (req, res) => {
  blogsController.findBlogAndEdit(req.params.id, req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});



// Xóa blog theo ID
router.delete('/:id', (req, res) => {
  blogsController.removeBlogById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Xóa nhiều blog theo title mặc định
router.delete('/', (req, res) => {
  blogsController.removeManyBlogs(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Query chain
router.get('/', (req, res) => {
  blogsController.queryChainBlog(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

module.exports = router;