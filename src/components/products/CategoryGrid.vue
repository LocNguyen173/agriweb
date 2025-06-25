<template>
  <div class="category-grid">
    <div v-for="category in categories" :key="category._id" class="category-item" @click="$emit('navigate', category._id)">
      <div class="category-icon">
        <img :src="category.icon" :alt="category.name">
      </div>
      <h3 class="category-name">{{ category.name }}</h3>
      <p class="category-description">{{ category.description }}</p>
      <div class="view-more">Xem thêm</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryGrid',
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.category-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

.category-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 260px;
  min-height: 280px;
}

.category-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.category-icon {
  width: 80px;
  height: 80px;
  background-color: #e9f5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.category-icon img {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.category-name {
  color: #2F5435;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
}

.category-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.view-more {
  color: #8CC63F;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s ease;
}

.category-item:hover .view-more {
  color: #2F5435;
}

@media (max-width: 1200px) {
  .category-item {
    width: calc(33.333% - 20px);
  }
}

@media (max-width: 992px) {
  .category-item {
    width: calc(50% - 15px);
  }
}

@media (max-width: 576px) {
  .category-item {
    width: 100%;
  }
}
</style>