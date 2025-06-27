const { storage } = require("../../config/firebaseConfig.js");
const multer = require("multer");

// Hàm để tải ảnh lên Firebase Storage
async function blogImageToFirebase(file) {
  try {
    console.log("Starting image upload to Firebase...", { 
      originalname: file.originalname, 
      bufferSize: file.buffer?.length,
      mimetype: file.imageMimetype || file.mimetype 
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

    const filename = `blogs/${Date.now()}_${file.originalname}`;
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

module.exports = {
  blogImageToFirebase,
  deleteBlogImageFromFirebase,
  deleteBlogImageByUrl,
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