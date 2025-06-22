const { Blog } = require('../../config/model');
const { blogImageToFirebase, deleteBlogImageByUrl } = require('../../utils/blogs/image.blogs');
const { saveBlogTextToFirebase, deleteBlogTextFromFirebase } = require('../../utils/blogs/text.blogs');

// Hàm tạo blog mới, truyền thêm categoryId
const createAndSaveBlog = async (blogData, done) => {
  try {
    console.log("Received category:", blogData.category);

    const textUrl = await saveBlogTextToFirebase(blogData.blogId, blogData.content);

    const imageBase64 = blogData.imageBase64;
    const imageName = blogData.imageName;
    // Nếu có ảnh, lưu ảnh
    let imageUrl = null;
    if (imageBase64 && imageName) {
      const buffer = Buffer.from(imageBase64, 'base64');
      imageUrl = await blogImageToFirebase({ 
        originalname: imageName, 
        buffer 
      });
    }
    // blogData phải chứa category (ObjectId của Category)
    const blog = new Blog({
      blogId: blogData.blogId,
      title: blogData.title,
      description: blogData.description,
      content: textUrl,
      // // type: blogData.type,
      image: imageUrl,
      // video: blogData.video,
      category: blogData.category, // ObjectId
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
const findBlogsByDate = async (dateString, done) => {
  try {
    // Tạo đối tượng Date từ chuỗi ngày (VD: "2025-06-10")
    const date = new Date(dateString);
    
    // Kiểm tra xem ngày hợp lệ không
    if (isNaN(date.getTime())) {
      return done(new Error("Invalid date format. Use YYYY-MM-DD"));
    }
    
    // Tạo khoảng thời gian cho toàn bộ ngày (từ 00:00:00 đến 23:59:59)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Tìm tất cả blog có created_at trong khoảng thời gian này
    const data = await Blog.find({
      created_at: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });
    
    console.log(`Blogs found for date ${dateString}:`, data);
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
    const oldImageUrl = blog.image; // Lưu URL ảnh cũ để thay thế nếu cần
    await deleteBlogImageByUrl(oldImageUrl); // Xóa ảnh cũ nếu có

    const imageBase64 = updateData.imageBase64;
    const imageName = updateData.imageName;
    // Nếu có ảnh, lưu ảnh
    let imageUrl = null;
    if (imageBase64 && imageName) {
      const buffer = Buffer.from(imageBase64, 'base64');
      imageUrl = await blogImageToFirebase({ 
        originalname: imageName, 
        buffer 
      });
    }

    await deleteBlogTextFromFirebase(blogId); // Xóa văn bản cũ
    const textUrl = await saveBlogTextToFirebase(blogId, updateData.content);

    if (!blog) return done(new Error("Blog not found"));

    // Cập nhật các trường cần thiết
    if (updateData.description) blog.description = updateData.description;
    if (updateData.title) blog.title = updateData.title;
    if (updateData.content) blog.content = textUrl;
    // if (updateData.type) blog.type = updateData.type;
    if (updateData.image) blog.image = imageUrl;
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
const findCategoryAndUpdate = async (title, data, done) => {
  try {
    // Kiểm tra xem data có chứa category không
    if (!data.category) {
      return done(new Error("Category ID is required"));
    }
    
    // Tìm và cập nhật blog theo title
    const updatedBlog = await Blog.findOneAndUpdate(
      { title }, 
      { 
        category: data.category,
        updated_at: new Date() 
      }, 
      { new: true }
    );
    
    // Kiểm tra xem blog có tồn tại không
    if (!updatedBlog) {
      return done(new Error(`Blog with title '${title}' not found`));
    }
    
    console.log("Blog updated category:", updatedBlog); // Sửa log trả về blog đã cập nhật
    done(null, updatedBlog);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm xóa blog theo ID
const removeBlogById = async (blogId, done) => {
  try {
    // Thay findByIdAndRemove bằng findByIdAndDelete
    const data = await Blog.findByIdAndDelete(blogId);
    await deleteBlogTextFromFirebase(blogId); // Xóa văn bản blog khỏi Firestore

    if (data && data.image) {
      await deleteBlogImageByUrl(data.image); // Xóa ảnh blog khỏi Firebase nếu có
    }
    
    if (!data) {
      return done(new Error("Blog not found"));
    }
    
    console.log("Blog removed:", data);
    done(null, data);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm xóa nhiều blog theo tiêu đề
const removeManyBlogs = async (data, done) => {
  try {
    const removedTitle = await Blog.deleteMany({ title: data.titleToRemove });
    console.log("Blogs removed:", removedTitle);
    done(null, removedTitle);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

// Hàm truy vấn chuỗi blog
const queryChainBlog = async (data, done) => {
  try {
    const queryBlogs = await Blog.find({ type: data.type })
      .sort({ title: 1 })
      .limit(2)
      .select({ description: 0, content: 0, image: 0, video: 0 });

    console.log("Query chain result:", queryBlogs);
    done(null, queryBlogs); // Sửa data → queryBlogs
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
  findCategoryAndUpdate,
  removeBlogById,
  removeManyBlogs,
  queryChainBlog
};
