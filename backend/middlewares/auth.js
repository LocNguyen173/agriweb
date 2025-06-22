const jwt = require("jsonwebtoken");
require("dotenv").config();
/**
 * Middleware để xác thực người dùng bằng JWT
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Callback function để tiếp tục middleware chain
 */

const authMiddleware = (req, res, next) => {
  try {
    console.log("Checking auth middleware...");

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Không tìm thấy token xác thực" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    console.log("Token received:", token);

    // Lấy JWT_SECRET từ env
    const JWT_SECRET = process.env.JWT_SECRET || "01072003";
    console.log("Using JWT_SECRET:", JWT_SECRET);

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Gán toàn bộ thông tin từ decoded token vào req.user
    req.user = decoded;

    console.log("Set user in request:", req.user);

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token đã hết hạn" });
    }

    res.status(401).json({
      message: "Xác thực thất bại",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;