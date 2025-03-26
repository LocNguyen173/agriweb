<template>
  <div class="hero" :style="backgroundStyle">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
      <div v-if="showBreadcrumb" class="breadcrumb">
        <router-link to="/">Trang chủ</router-link>
        <span class="separator">/</span>
        <span class="current">{{ currentPage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroApp',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    showBreadcrumb: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: String,
      default: ''
    }
  },
  computed: {
    backgroundStyle() {
      return this.backgroundImage 
        ? { backgroundImage: `url(${this.backgroundImage})` }
        : { backgroundColor: '#2F5435' };
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-top: 80px; /* Adjust for fixed header */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 20px;
  max-width: 800px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.hero p {
  font-size: 18px;
  margin-bottom: 25px;
  opacity: 0.9;
}

.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.breadcrumb a {
  color: #8CC63F;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb a:hover {
  color: white;
  text-decoration: underline;
}

.separator {
  margin: 0 10px;
  opacity: 0.7;
}

.current {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .hero {
    height: 300px;
  }
  
  .hero h1 {
    font-size: 36px;
  }
  
  .hero p {
    font-size: 16px;
  }
}
</style> 