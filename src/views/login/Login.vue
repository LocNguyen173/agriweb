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
      <h2>Sign in</h2>
      <!-- <p class="small-text">
        Don’t have an account? <a href="#">Create now</a>
      </p> -->
      <form @submit.prevent="onSubmit">
        <label for="name">Username</label>
        <input type="name" id="name" v-model="username" required />

        <label for="password">Password</label>
        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="••••••••" required />
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            <span v-if="showPassword">🙈</span>
            <span v-else>👁️</span>
          </button>
        </div>

        <div class="options">
          <label>
            <input type="checkbox" v-model="rememberMe" />
            Remember me
          </label>
        </div>

        <button class="sign-in-btn" type="submit" :disabled="isLoading">
          <span v-if="isLoading">Đang đăng nhập...</span>
          <span v-else>Sign in</span>
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
      <!-- Bạn có thể thay đổi nội dung panel này để quảng cáo công ty thuốc BVTV -->
      <div class="support">
        <span>🛟</span> Support
      </div>
      <div class="ad-card">
        <h3>Reach financial goals faster</h3>
        <p>Use your Venus card around the world with no hidden fees. Hold, transfer and spend money.</p>
        <button class="learn-more">Learn more</button>
        <div class="earnings">
          <span>Earnings</span>
          <strong>$350.40</strong>
        </div>
      </div>
      <div class="features">
        <h3>Introducing new features</h3>
        <p>
          Analyzing previous trends ensures that businesses always make the right decision. And as the scale of the decision and its impact magnifies...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  min-height: 600px;
  max-width: 900px;
  margin: 40px auto;
  background: #e3e3e3;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  overflow: hidden;
}
.login-left {
  flex: 1;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f8fafb;
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
}
.small-text {
  color: #888;
  margin-bottom: 24px;
  font-size: 0.95rem;
}
a {
  color: #1a3c34;
  text-decoration: underline;
  font-weight: 500;
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
input[type="text"] {
  padding: 10px 12px;
  border: 1px solid #dbe2e8;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 8px;
  background: #fff;
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
  background: #1a3c34;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.sign-in-btn:hover {
  background: #215c4b;
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
  flex: 1;
  background: linear-gradient(135deg, #1a3c34 70%, #2e5d4f 100%);
  color: #fff;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.support {
  position: absolute;
  top: 32px;
  right: 40px;
  font-size: 1.1rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ad-card {
  background: #fff;
  color: #1a3c34;
  border-radius: 14px;
  padding: 28px 24px 20px 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  max-width: 340px;
}
.ad-card h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 700;
}
.ad-card p {
  font-size: 0.98rem;
  margin-bottom: 14px;
}
.learn-more {
  background: #1a3c34;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  font-size: 0.97rem;
  margin-bottom: 14px;
  cursor: pointer;
}
.earnings {
  margin-top: 10px;
  font-size: 0.98rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.earnings strong {
  font-size: 1.15rem;
  color: #1a3c34;
}
.features {
  margin-top: 24px;
  max-width: 340px;
}
.features h3 {
  font-size: 1.15rem;
  margin-bottom: 8px;
  font-weight: 700;
}
.features p {
  font-size: 0.97rem;
  color: #e0e5ea;
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
    max-width: 98vw;
  }
  .login-left, .login-right {
    padding: 32px 20px;
  }
  .login-right {
    min-height: 320px;
  }
}
</style>