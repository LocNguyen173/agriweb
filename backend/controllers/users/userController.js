import { User } from '../../config/model.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Tạo user mới
const createUser = async (userData, done) => {
  try {
    const user = new User({
      username: userData.username,
      password: userData.password // Nên hash mật khẩu ở thực tế!
    });
    const data = await user.save();
    done(null, data);
  } catch (err) {
    done(err);
  }
};

// Tìm user theo username
const findUserByUsername = async (username, done) => {
  try {
    const user = await User.findOne({ username });
    done(null, user);
  } catch (err) {
    done(err);
  }
};

// Tìm user theo ID
const findUserById = async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
};

// Cập nhật user
const updateUser = async (userId, updateData, done) => {
  try {
    const user = await User.findById(userId);
    if (!user) return done(new Error("User not found"));
    if (updateData.username) user.username = updateData.username;
    if (updateData.password) user.password = updateData.password; // Nên hash lại!
    const data = await user.save();
    done(null, data);
  } catch (err) {
    done(err);
  }
};

// Xóa user
const removeUserById = async (userId, done) => {
  try {
    const data = await User.findByIdAndDelete(userId);
    if (!data) return done(new Error("User not found"));
    done(null, data);
  } catch (err) {
    done(err);
  }
};

// Đăng nhập user
const login = async (userData, done) => {
  try {
    const user = await User.findOne({ username: userData.username });
    if (!user) return done(new Error("User not found"));

    // So sánh mật khẩu (ở thực tế nên hash và dùng bcrypt.compare)
    if (user.password !== userData.password) {
      return done(new Error("Invalid password"));
    }

    // Tạo JWT token (ví dụ, secret nên lưu ở biến môi trường)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET, // Thay bằng biến môi trường trong thực tế
      { expiresIn: "1d" }
    );

    done(null, { user, token });
  } catch (err) {
    done(err);
  }
};

export {
  createUser,
  findUserByUsername,
  findUserById,
  updateUser,
  removeUserById,
  login // Thêm hàm login
};