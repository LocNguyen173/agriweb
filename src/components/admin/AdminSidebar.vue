<template>
  <div class="admin-sidebar">
    <div class="sidebar-logo">
      <img src="@/assets/images/logo.png" alt="Logo" />
      <h2>Admin Panel</h2>
    </div>
    
    <div class="sidebar-user">
      <div class="user-avatar">
        <span>{{ userInitial }}</span>
      </div>
      <div class="user-info">
        <span class="user-name">{{ userName }}</span>
        <span class="user-role">Administrator</span>
        <!-- Sẽ dùng hàm findUserById để lấy tên user và vai trò -->
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <router-link to="/admin">
        <i class="fas fa-tachometer-alt"></i>
        Dashboard
      </router-link>
      <router-link to="/admin/products">
        <i class="fas fa-box"></i>
        Quản lý sản phẩm
      </router-link>
      <router-link to="/admin/posts">
        <i class="fas fa-newspaper"></i>
        Quản lý bài viết
      </router-link>
      <router-link to="/admin/categories">
        <i class="fas fa-tags"></i>
        Danh mục
      </router-link>
    </nav>
    
    <div class="sidebar-footer">
      <button @click="logout" class="logout-button">
        <i class="fas fa-sign-out-alt"></i>
        Đăng xuất
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import userApi from '@/shared/api/userApi'

const router = useRouter()

const userName = ref('')
const userInitial = ref('')

onMounted(() => {
  const user = userApi.getCurrentUserFromToken()
  if (user) {
    userName.value = user.username
    userInitial.value = user.username.charAt(0).toUpperCase()
  } else {
    // Nếu không có user, chuyển về trang login
    router.push('/login')
  }
})

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.admin-sidebar {
  width: 240px;
  height: 100vh; /* Chiều cao bằng viewport */
  background: linear-gradient(to bottom, #2ecc40, #27ae60);
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed; /* Cố định sidebar */
  top: 0;
  left: 0;
  overflow-y: auto; /* Cho phép cuộn nếu nội dung sidebar dài */
}

.sidebar-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-logo img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.sidebar-logo h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  margin: 10px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #27ae60;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 16px;
}

.user-role {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 2px;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 0 15px;
}

.sidebar-nav a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.sidebar-nav a i {
  margin-right: 10px;
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.sidebar-nav a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.sidebar-nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.sidebar-footer {
  padding: 10px 15px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.logout-button i {
  margin-right: 8px;
}
</style>