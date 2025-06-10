const { Blog } = require('../../config/model');

const createAndSaveBlog = async (done) => {
  try {
    const blog = new Blog({
      blogId: "blog123",
      title: "New Blog",
      description: "This is a description of my first blog.",
      content: "Here is the content of my first blog post.",
      type: "personal",
      image: "https://example.com/image.jpg",
      video: "https://example.com/video.mp4",
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

const createManyBlogs = async (arrayOfBlogs, done) => {
  try {
    const data = await Blog.create(arrayOfBlogs);
    console.log("Many Blogs saved:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

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

const findBlogAndEdit = async (blogId, done) => {
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return done(new Error("Blog not found"));

    blog.description = "testing update of blog description";
    const data = await blog.save();
    console.log("Blog updated:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

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
