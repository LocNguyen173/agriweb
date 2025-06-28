<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import userApi from '@/shared/api/userApi';

const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

onMounted(() => {
  userApi.logout();
});

const onSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    const result = await userApi.login({
      username: username.value,
      password: password.value
    });
    // Lưu thông tin người dùng nếu cần
    if (rememberMe.value) {
      localStorage.setItem('rememberedUser', username.value);
    }
    successMessage.value = 'Đăng nhập thành công!';
    console.log('Login successful:', result);
    setTimeout(() => {
      router.push('/admin/');
    }, 1000);
  } catch (error) {
    errorMessage.value = error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  errorMessage.value = '';
  successMessage.value = '';
};

// Kiểm tra nếu có thông tin đăng nhập được lưu trước đó
if (localStorage.getItem('rememberedUser')) {
  username.value = localStorage.getItem('rememberedUser');
  rememberMe.value = true;
}
</script>

<template>
  <div class="login-container">
    <div class="login-left">
      <div class="logo"> 
        <img src="@\assets\images\logo.png" alt="Logo" class="logo-img" />
        <span class="logo-text">BVTV NAM MEKONG</span>
      </div>
      <h2>Đăng Nhập</h2>
      <p class="small-text">
        Khu vực dành cho quản trị viên hệ thống
      </p>
      <form @submit.prevent="onSubmit">
        <label for="name">Tên đăng nhập</label>
        <input type="name" id="name" v-model="username" placeholder="Nhập tên đăng nhập" required />

        <label for="password">Mật khẩu</label>
        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Nhập mật khẩu" required />
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            <span v-if="showPassword">🙈</span>
            <span v-else>👁️</span>
          </button>
        </div>

        <div class="options">
          <label>
            <input type="checkbox" v-model="rememberMe" />
            Ghi nhớ đăng nhập
          </label>
        </div>

        <button class="sign-in-btn" type="submit" :disabled="isLoading">
          <span v-if="isLoading">Đang đăng nhập...</span>
          <span v-else>Đăng Nhập</span>
        </button>
      </form>
      <!-- Modal thông báo lỗi -->
      <div v-if="errorMessage" class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
          <div class="modal-header error">
            <span>Thông báo</span>
            <button class="close-btn" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <p>{{ errorMessage }}</p>
          </div>
          <div class="modal-footer">
            <button class="modal-ok-btn" @click="closeModal">OK</button>
          </div>
        </div>
      </div>
      <!-- Modal thông báo thành công -->
      <div v-if="successMessage" class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
          <div class="modal-header success">
            <span>Thành công</span>
            <button class="close-btn" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <p>{{ successMessage }}</p>
          </div>
          <div class="modal-footer">
            <button class="modal-ok-btn" @click="closeModal">OK</button>
          </div>
        </div>
      </div>
    </div>
    <div class="login-right">
      <div class="support">
        <span>🌱</span> Hỗ trợ
      </div>
      <div class="ad-card">
        <h3>Giải pháp bảo vệ thực vật toàn diện</h3>
        <p>BVTV Nam Mekong cung cấp các sản phẩm và dịch vụ chất lượng cao cho nông nghiệp bền vững và hiệu quả.</p>
        <a href="/" class="learn-more">Tìm hiểu thêm</a>
        <!-- <div class="admin-notice">
          <span>⚠️ Thông báo</span>
          <strong>Chỉ dành cho quản trị viên</strong>
        </div> -->
      </div>
      <div class="features">
        <h3>Cam kết chất lượng</h3>
        <p>
          Với nhiều năm kinh nghiệm trong lĩnh vực bảo vệ thực vật, chúng tôi luôn đặt chất lượng sản phẩm và sự hài lòng của khách hàng lên hàng đầu...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  max-width: 100vw;
  margin: 0;
  background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 50%, #d4edda 100%);
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
}
.login-left {
  flex: 2;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 40px 20px 40px 40px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}
.logo {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
.logo-img {
  width: 70px;
  height: 70px;
  margin-right: 8px;
}
.logo-text {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1a3c34;
}
h2 {
  margin-bottom: 8px;
  font-size: 2rem;
  font-weight: 700;
  color: #1a3c34;
}
.small-text {
  color: #666;
  margin-bottom: 24px;
  font-size: 0.95rem;
  background: #f0f8f0;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 4px solid #1a3c34;
}
a {
  color: #1a3c34;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}
a:hover {
  color: #2e5d4f;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 12px;
  margin-bottom: 4px;
  font-size: 0.98rem;
  color: #333;
}
input[type="email"],
input[type="password"],
input[type="text"],
input[type="name"] {
  padding: 12px 16px;
  border: 2px solid #e0e5ea;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 8px;
  background: #fff;
  transition: border-color 0.3s ease;
}
input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus,
input[type="name"]:focus {
  outline: none;
  border-color: #1a3c34;
  box-shadow: 0 0 0 3px rgba(26, 60, 52, 0.1);
}
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.toggle-password {
  background: none;
  border: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.1rem;
}
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 16px 0;
  font-size: 0.97rem;
}
.forgot {
  color: #1a3c34;
  text-decoration: underline;
  font-size: 0.97rem;
}
.sign-in-btn {
  background: linear-gradient(135deg, #1a3c34 0%, #2e5d4f 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(26, 60, 52, 0.3);
}
.sign-in-btn:hover {
  background: linear-gradient(135deg, #215c4b 0%, #3a7462 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 60, 52, 0.4);
}
.sign-in-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
.divider {
  text-align: center;
  margin: 18px 0;
  color: #bbb;
  position: relative;
}
.divider span {
  background: #f8fafb;
  padding: 0 12px;
  position: relative;
  z-index: 1;
}
.divider:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: #e0e5ea;
  z-index: 0;
}
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f3f6;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  margin-bottom: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.social-btn img {
  width: 22px;
  height: 22px;
  margin-right: 10px;
}
.social-btn.google:hover {
  background: #e8f0fe;
}
.social-btn.facebook:hover {
  background: #e7f3ff;
}
.login-right {
  flex: 0.8;
  background: linear-gradient(135deg, #1a3c34 0%, #2e5d4f 70%, #4a8066 100%);
  color: #fff;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin: 40px 40px 40px 20px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  min-width: 300px;
}
.support {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 1rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ad-card {
  background: rgba(255, 255, 255, 0.95);
  color: #1a3c34;
  border-radius: 12px;
  padding: 20px 18px 16px 18px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}
.ad-card h3 {
  font-size: 1.1rem;
  margin-bottom: 6px;
  font-weight: 700;
}
.ad-card p {
  font-size: 0.9rem;
  margin-bottom: 12px;
  line-height: 1.4;
}
.learn-more {
  background: #1a3c34;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 0.9rem;
  margin-bottom: 12px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}
.learn-more:hover {
  background: #2e5d4f;
  transform: translateY(-1px);
  color: #fff;
}
.admin-notice {
  margin-top: 8px;
  font-size: 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff3cd;
  padding: 6px 10px;
  border-radius: 6px;
  border-left: 4px solid #ffc107;
}
.admin-notice strong {
  font-size: 0.8rem;
  color: #856404;
}
.features {
  margin-top: 16px;
}
.features h3 {
  font-size: 1rem;
  margin-bottom: 6px;
  font-weight: 700;
}
.features p {
  font-size: 1rem;
  color: #e0e5ea;
  line-height: 1.4;
}
.modal-overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  border-radius: 10px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  animation: modalFadeIn 0.2s;
}
@keyframes modalFadeIn {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px 10px 20px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  font-size: 1.1rem;
}
.modal-header.error {
  color: #c0392b;
}
.modal-header.success {
  color: #218838;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #888;
}
.modal-body {
  padding: 18px 20px 10px 20px;
  font-size: 1rem;
  color: #333;
}
.modal-footer {
  padding: 10px 20px 16px 20px;
  display: flex;
  justify-content: flex-end;
}
.modal-ok-btn {
  background: #1a3c34;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 22px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-ok-btn:hover {
  background: #215c4b;
}
@media (max-width: 900px) {
  .login-container {
    flex-direction: column;
    max-width: 100vw;
    min-height: 100vh;
  }
  .login-left {
    margin: 20px;
    padding: 32px 20px;
  }
  .login-right {
    margin: 0 20px 20px 20px;
    min-height: 320px;
    padding: 32px 20px;
  }
}
</style>