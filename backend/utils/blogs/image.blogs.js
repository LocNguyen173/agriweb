const { storage } = require("../../config/firebaseConfig.js");
const multer = require("multer");

// Helper function để lấy file extension
function getFileExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

// Hàm để tải ảnh lên Firebase Storage
async function blogImageToFirebase(file, blogId = null, imageType = 'content') {
  try {
    console.log("Starting image upload to Firebase...", { 
      originalname: file.originalname, 
      bufferSize: file.buffer?.length,
      mimetype: file.imageMimetype || file.mimetype,
      blogId,
      imageType
    });
    
    // Kiểm tra buffer
    if (!file.buffer || file.buffer.length === 0) {
      throw new Error("File buffer is empty or invalid");
    }
    
    // Kiểm tra mimetype hợp lệ
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    const mimetype = file.imageMimetype || file.mimetype || '';
    console.log("Mimetype of uploaded file:", mimetype);
    if (!allowedTypes.includes(mimetype)) {
      console.error(`Invalid image type: ${mimetype}`);
      throw new Error("Chỉ cho phép các định dạng ảnh: jpeg, png, webp, gif");
    }

    // Tạo tên file theo quy tắc mới có chứa blogId và loại ảnh
    let filename;
    if (blogId) {
      if (imageType === 'thumbnail') {
        filename = `blogs/${blogId}_thumbnail_${Date.now()}.${getFileExtension(file.originalname)}`;
      } else {
        // Ảnh trong editor
        const randomString = Math.random().toString(36).substr(2, 6);
        filename = `blogs/${blogId}_editor_${Date.now()}_${randomString}.${getFileExtension(file.originalname)}`;
      }
    } else {
      // Fallback cho trường hợp không có blogId
      filename = `blogs/${Date.now()}_${file.originalname}`;
    }
    
    console.log("Generated filename:", filename);
    const fileUpload = storage.file(filename);

    await fileUpload.save(file.buffer, {
      metadata: { contentType: mimetype },
    });
    console.log("File saved to Firebase Storage");
    
    await fileUpload.makePublic();
    console.log("File made public");

    // Lấy URL công khai trực tiếp
    const publicUrl = `https://storage.googleapis.com/${storage.name}/${filename}`;
    console.log("Generated public URL:", publicUrl);
    
    return publicUrl;
  } catch (error) {
    console.error("Firebase upload error:", error);
    throw error;
  }
}

// Hàm xóa ảnh khỏi Firebase Storage
async function deleteBlogImageFromFirebase(filename) {
  const fileRef = storage.file(`blogs/${filename}`);
  try {
    await fileRef.delete();
    return true;
  } catch (error) {
    // Nếu file không tồn tại thì bỏ qua lỗi này
    if (
      error.code === 404 ||
      error.message.includes('No such object') ||
      error.message.includes('not found')
    ) {
      console.warn(`Image not found on Firebase, skip deleting: ${filename}`);
      return false;
    }
    throw new Error("Error deleting image from Firebase: " + error.message);
  }
}

// Hàm tách filename từ URL Firebase Storage
function getFilenameFromUrl(url) {
  const match = url.match(/\/blogs\/(.+)$/);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error("Invalid Firebase Storage URL");
}

// Xóa ảnh bằng URL Firebase Storage
async function deleteBlogImageByUrl(imageUrl) {
  // Nếu không có URL hoặc không phải ảnh Firebase thì bỏ qua
  if (
    !imageUrl ||
    typeof imageUrl !== 'string' ||
    !imageUrl.includes('/blogs/')
  ) {
    console.warn('Skip deleting image: Not a valid Firebase Storage URL:', imageUrl);
    return false;
  }
  const filename = getFilenameFromUrl(imageUrl);
  return deleteBlogImageFromFirebase(filename);
}

// Xóa tất cả ảnh của một blog theo blogId
async function deleteAllBlogImages(blogId) {
  try {
    console.log(`Deleting all images for blog: ${blogId}`);
    
    // Lấy danh sách tất cả file có prefix blogs/{blogId}_
    const [files] = await storage.getFiles({
      prefix: `blogs/${blogId}_`
    });
    
    if (files.length === 0) {
      console.log(`No images found for blog: ${blogId}`);
      return { deleted: 0, errors: [] };
    }
    
    const deletePromises = files.map(async (file) => {
      try {
        await file.delete();
        console.log(`Deleted: ${file.name}`);
        return { success: true, filename: file.name };
      } catch (error) {
        console.error(`Error deleting ${file.name}:`, error);
        return { success: false, filename: file.name, error: error.message };
      }
    });
    
    const results = await Promise.all(deletePromises);
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`Deleted ${successful.length} images for blog ${blogId}`);
    if (failed.length > 0) {
      console.warn(`Failed to delete ${failed.length} images:`, failed);
    }
    
    return {
      deleted: successful.length,
      errors: failed,
      total: files.length
    };
  } catch (error) {
    console.error(`Error deleting images for blog ${blogId}:`, error);
    throw error;
  }
}

module.exports = {
  blogImageToFirebase,
  deleteBlogImageFromFirebase,
  deleteBlogImageByUrl,
  deleteAllBlogImages,
  getFileExtension,
  multerMiddleware: multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed!"), false);
      }
      cb(null, true);
    },
  })
};