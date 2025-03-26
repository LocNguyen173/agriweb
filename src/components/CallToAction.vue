<template>
  <div class="cta-section" :style="backgroundStyle">
    <div class="overlay"></div>
    <div class="container">
      <div class="cta-content">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <div class="cta-buttons">
          <router-link v-if="primaryButtonLink" :to="primaryButtonLink" class="primary-button">
            {{ primaryButtonText }}
          </router-link>
          <router-link v-if="secondaryButtonLink" :to="secondaryButtonLink" class="secondary-button">
            {{ secondaryButtonText }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallToAction',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    primaryButtonText: {
      type: String,
      default: 'Liên hệ ngay'
    },
    primaryButtonLink: {
      type: String,
      default: '/contact'
    },
    secondaryButtonText: {
      type: String,
      default: ''
    },
    secondaryButtonLink: {
      type: String,
      default: ''
    },
    backgroundImage: {
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
.cta-section {
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 80px 0;
  color: white;
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  z-index: 1;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: 700;
}

.cta-content p {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.primary-button {
  display: inline-block;
  background-color: #8CC63F;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 16px;
}

.primary-button:hover {
  background-color: white;
  color: #2F5435;
  transform: translateY(-3px);
}

.secondary-button {
  display: inline-block;
  background-color: transparent;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid white;
  font-size: 16px;
}

.secondary-button:hover {
  background-color: white;
  color: #2F5435;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .cta-section {
    padding: 60px 0;
  }
  
  .cta-content h2 {
    font-size: 30px;
  }
  
  .cta-content p {
    font-size: 16px;
  }
}
</style> 