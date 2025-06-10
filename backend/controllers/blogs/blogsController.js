const mongoose = require('mongoose');
const { Blog } = require('../../config/model');

// Hàm tạo blog mới, truyền thêm categoryId
const createAndSaveBlog = async (blogData, done) => {
  try {
    console.log("Received category:", blogData.category);

    const categoryId = new mongoose.Types.ObjectId(blogData.category);

    // blogData phải chứa category (ObjectId của Category)
    const blog = new Blog({
      blogId: blogData.blogId,
      title: blogData.title,
      description: blogData.description,
      content: blogData.content,
      type: blogData.type,
      image: blogData.image,
      video: blogData.video,
      category: categoryId, // ObjectId
      created_at: new Date(),
      updated_at: new Date()
    });

    const data = await blog.save();
    console.log("Blog saved:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm tạo nhiều blogs, mỗi blog phải có category
const createManyBlogs = async (arrayOfBlogs, done) => {
  try {
    // arrayOfBlogs: mỗi phần tử phải có trường category (ObjectId)
    const data = await Blog.create(arrayOfBlogs);
    console.log("Many Blogs saved:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm tìm blog theo ngày tạo
const findBlogsByDate = async (date, done) => {
  try {
    const data = await Blog.find({ created_at: date });
    console.log("Blogs found by date:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm tìm blog theo tiêu đề
const findOneByTitle = async (title, done) => {
  try {
    const data = await Blog.findOne({ title });
    console.log("Blog found by title:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm tìm blog theo ID
const findBlogById = async (blogId, done) => {
  try {
    const data = await Blog.findById(blogId);
    console.log("Blog found by ID:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm cập nhật blog, truyền thêm category nếu muốn cập nhật
const findBlogAndEdit = async (blogId, updateData, done) => {
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return done(new Error("Blog not found"));

    // Cập nhật các trường cần thiết
    if (updateData.description) blog.description = updateData.description;
    if (updateData.title) blog.title = updateData.title;
    if (updateData.content) blog.content = updateData.content;
    if (updateData.type) blog.type = updateData.type;
    if (updateData.image) blog.image = updateData.image;
    if (updateData.video) blog.video = updateData.video;
    if (updateData.category) blog.category = updateData.category; // cập nhật category nếu có
    blog.updated_at = new Date();

    const data = await blog.save();
    console.log("Blog updated:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm tìm và cập nhật loại blog theo tiêu đề
const findTypeAndUpdate = async (title, done) => {
  try {
    const typeToSet = "Vegetable";
    const data = await Blog.findOneAndUpdate({ title }, { type: typeToSet }, { new: true });
    console.log("Blog updated type:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm xóa blog theo ID
const removeBlogById = async (blogId, done) => {
  try {
    const data = await Blog.findByIdAndRemove(blogId);
    console.log("Blog removed:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm xóa nhiều blog theo tiêu đề
const removeManyBlogs = async (done) => {
  try {
    const titleToRemove = "New Blog";
    const data = await Blog.deleteMany({ title: titleToRemove });
    console.log("Blogs removed:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm truy vấn chuỗi blog
const queryChainBlog = async (done) => {
  try {
    const typeToSearch = "Vegetable";
    const data = await Blog.find({ type: typeToSearch })
      .sort({ title: 1 })
      .limit(2)
      .select({ description: 0, content: 0, image: 0, video: 0 });

    console.log("Query chain result:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

module.exports = {
  createAndSaveBlog,
  createManyBlogs,
  findBlogsByDate,
  findOneByTitle,
  findBlogById,
  findBlogAndEdit,
  findTypeAndUpdate,
  removeBlogById,
  removeManyBlogs,
  queryChainBlog
};
