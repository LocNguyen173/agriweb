<template>
  <div class="category-card" @click="navigateToCategory">
    <div class="category-icon">
      <img :src="icon" :alt="name">
    </div>
    <h3>{{ name }}</h3>
    <p>{{ description }}</p>
    <div class="category-link">
      {{ linkText }} <i class="fas fa-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCategoryCard',
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      default: 'Xem sản phẩm'
    },
    categoryId: {
      type: [String, Number],
      default: null
    }
  },
  methods: {
    navigateToCategory() {
      this.$emit('navigate', this.categoryId || this.name.toLowerCase())
    }
  }
}
</script>

<style scoped>
.category-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.category-card:hover {
  transform: translateY(-10px);
  background-color: #2F5435;
  color: white;
}

.category-icon {
  width: 70px;
  height: 70px;
  background-color: #e9f5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  transition: background-color 0.3s ease;
}

.category-card:hover .category-icon {
  background-color: white;
}

.category-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.category-card h3 {
  color: #2F5435;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.category-card:hover h3 {
  color: white;
}

.category-card p {
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
  transition: color 0.3s ease;
  flex-grow: 1;
}

.category-card:hover p {
  color: rgba(255, 255, 255, 0.8);
}

.category-link {
  color: #8CC63F;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.category-link i {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.category-card:hover .category-link {
  color: #8CC63F;
}

.category-card:hover .category-link i {
  transform: translateX(5px);
}
</style> 