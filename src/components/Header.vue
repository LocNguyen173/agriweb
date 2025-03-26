<template>
  <header :class="['header', { 'scrolled': isScrolled, 'mobile-menu-open': isMobileMenuOpen }]">
    <div class="header-container">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="Agrofarm Logo" />
      </div>
      
      <!-- Desktop Menu -->
      <nav class="desktop-menu">
        <ul>
          <li><router-link to="/" class="nav-link">TRANG CHỦ</router-link></li>
          <!-- <li><router-link to="/about" class="nav-link">GIỚI THIỆU</router-link></li> -->
          <li><router-link to="/services" class="nav-link">DỊCH VỤ</router-link></li>
          <li><router-link to="/products" class="nav-link">SẢN PHẨM</router-link></li>
          <li><router-link to="/blogs" class="nav-link">BÀI VIẾT</router-link></li>
          <li><router-link to="/contact" class="nav-link">LIÊN HỆ</router-link></li>
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
          <li><router-link to="/" @click="closeMobileMenu">TRANG CHỦ</router-link></li>
          <li><router-link to="/services" @click="closeMobileMenu">DỊCH VỤ</router-link></li>
          <li><router-link to="/products" @click="closeMobileMenu">SẢN PHẨM</router-link></li>
          <li><router-link to="/blogs" @click="closeMobileMenu">BÀI VIẾT</router-link></li>
          <li><router-link to="/contact" @click="closeMobileMenu">LIÊN HỆ</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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

.logo img {
  height: 50px;
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
