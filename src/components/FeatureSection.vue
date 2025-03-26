<template>
  <div class="feature-section">
    <div class="container">
      <div class="feature-grid">
        <div class="feature-image">
          <img :src="image" :alt="title" />
        </div>
        <div class="feature-content">
          <h5>{{ subtitle }}</h5>
          <h2>{{ title }}</h2>
          <div class="divider"></div>
          <p>{{ description }}</p>
          <ul class="feature-list">
            <li v-for="(item, index) in features" :key="index">
              <i class="fas fa-check-circle"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
          <router-link v-if="buttonLink" :to="buttonLink" class="feature-button">
            {{ buttonText }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureSection',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    features: {
      type: Array,
      default: () => []
    },
    buttonText: {
      type: String,
      default: 'Tìm hiểu thêm'
    },
    buttonLink: {
      type: String,
      default: ''
    },
    reversed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.feature-section {
  padding: 80px 0;
  background-color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.feature-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-content h5 {
  color: #8CC63F;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  font-weight: 600;
}

.feature-content h2 {
  color: #2F5435;
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: 700;
  line-height: 1.2;
}

.divider {
  width: 80px;
  height: 3px;
  background-color: #8CC63F;
  margin-bottom: 20px;
}

.feature-content p {
  color: #666;
  line-height: 1.7;
  margin-bottom: 25px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #444;
}

.feature-list li i {
  color: #8CC63F;
  margin-right: 15px;
  font-size: 18px;
}

.feature-button {
  display: inline-block;
  background-color: #8CC63F;
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.feature-button:hover {
  background-color: #2F5435;
  transform: translateY(-3px);
}

@media (max-width: 992px) {
  .feature-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .feature-content h2 {
    font-size: 30px;
  }
  
  .feature-section {
    padding: 60px 0;
  }
}
</style> 