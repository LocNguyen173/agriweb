<template>
  <header :class="['header', { 'scrolled': isScrolled, 'mobile-menu-open': isMobileMenuOpen }]">
    <div class="header-container">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="Agrofarm Logo" />
      </div>
      
      <!-- Desktop Menu -->
      <nav class="desktop-menu">
        <ul>
          <li><a href="/" class="nav-link">TRANG CHỦ</a></li>
          <!-- <li><router-link to="/about" class="nav-link">GIỚI THIỆU</router-link></li> -->
          <li><a href="/services" class="nav-link">DỊCH VỤ</a></li>
          <li><a href="/products" class="nav-link">SẢN PHẨM</a></li>
          <li><a href="/blogs" class="nav-link">BÀI VIẾT</a></li>
          <li><a href="/contact" class="nav-link">LIÊN HỆ</a></li>
          <li v-if="isLoggedIn">
            <a href="/admin" class="nav-link">QUẢN TRỊ</a>
          </li>
          <li v-else>
            <a href="/login" class="nav-link">ĐĂNG NHẬP</a>
          </li>
        </ul>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-button" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Mobile Menu -->
      <nav class="mobile-menu" v-show="isMobileMenuOpen">
        <ul>
          <li><a href="/" @click="closeMobileMenu">TRANG CHỦ</a></li>
          <li><a href="/services" @click="closeMobileMenu">DỊCH VỤ</a></li>
          <li><a href="/products" @click="closeMobileMenu">SẢN PHẨM</a></li>
          <li><a href="/blogs" @click="closeMobileMenu">BÀI VIẾT</a></li>
          <li><a href="/contact" @click="closeMobileMenu">LIÊN HỆ</a></li>
          <li v-if="isLoggedIn">
            <a href="/admin" class="nav-link" @click="closeMobileMenu">QUẢN TRỊ</a>
          </li>
          <li v-else>
            <a href="/login" class="nav-link" @click="closeMobileMenu">ĐĂNG NHẬP</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import userApi from '@/shared/api/userApi'

export default {
  name: 'AppHeader',
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      isLoggedIn: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.checkLoginStatus()
    // Kiểm tra trạng thái đăng nhập định kỳ mỗi 3 giây
    this.loginCheckInterval = setInterval(this.checkLoginStatus, 3000)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.loginCheckInterval) {
      clearInterval(this.loginCheckInterval)
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
    checkLoginStatus() {
      this.isLoggedIn = userApi.isAuthenticated()
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: white;
  padding: 15px 0;
}

.header.scrolled {
  background-color: #2F5435;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.15);
  padding: 5px 6px;
  display: inline-block;
  /* margin-bottom: 20px; */
}

.logo img {
  height: 60px;
}

.desktop-menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.desktop-menu .nav-link {
  color: #333;
  text-decoration: none;
  padding: 10px 20px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.scrolled .desktop-menu .nav-link {
  color: white;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.mobile-menu-button span {
  display: block;
  width: 25px;
  height: 2px;
  background-color: #333;
  margin: 5px 0;
  transition: all 0.3s ease;
}

.scrolled .mobile-menu-button span {
  background-color: white;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.mobile-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-menu li {
  margin: 15px 0;
}

.mobile-menu a {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  display: block;
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-menu {
    display: block;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }

  .mobile-menu-open .mobile-menu {
    transform: translateY(0);
  }
}
</style>
