import { storage } from "../../config/firebaseConfig.js";
import multer from "multer";

// Hàm để tải ảnh lên Firebase Storage
async function blogImageToFirebase(file) {
  const filename = `blogs/${Date.now()}_${file.originalname}`;
  const fileUpload = storage.file(filename);

  await fileUpload.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  // Lấy URL công khai (nếu bucket đã public)
  return `https://storage.googleapis.com/${storage.name}/${filename}`;
}

async function deleteBlogImageFromFirebase(filename) {
  const fileRef = storage.file(`blogs/${filename}`);
  try {
    await fileRef.delete();
    return true;
  } catch (error) {
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