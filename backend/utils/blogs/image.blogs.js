import { storage } from "../../config/firebaseConfig.js";
import multer from "multer";

// Hàm để tải ảnh lên Firebase Storage
async function blogImageToFirebase(file) {
  // Kiểm tra mimetype hợp lệ
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
  const mimetype = file.imageMimetype || file.mimetype || '';
  console.log("Mimetype of uploaded file:", mimetype);
  if (!allowedTypes.includes(mimetype)) {
    console.error(`Invalid image type: ${mimetype}`);
    throw new Error("Chỉ cho phép các định dạng ảnh: jpeg, png, webp, gif");
  }

  const filename = `blogs/${Date.now()}_${file.originalname}`;
  const fileUpload = storage.file(filename);

  await fileUpload.save(file.buffer, {
    metadata: { contentType: mimetype },
  });
  await fileUpload.makePublic();

  // Lấy URL công khai (nếu bucket đã public)
  return `https://storage.googleapis.com/${storage.name}/${filename}`;
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

export {
  blogImageToFirebase,
  deleteBlogImageFromFirebase,
  deleteBlogImageByUrl,
};

export const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});