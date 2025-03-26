<template>
  <div class="categories-grid">
    <ProductCategoryCard
      v-for="(category, index) in categories"
      :key="index"
      :name="category.name"
      :description="category.description"
      :icon="category.icon"
      :linkText="category.linkText || 'Xem sản phẩm'"
      :categoryId="category.id"
      @navigate="onNavigate"
    />
  </div>
</template>

<script>
import ProductCategoryCard from './ProductCategoryCard.vue'

export default {
  name: 'CategoryGrid',
  components: {
    ProductCategoryCard
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    onNavigate(categoryId) {
      this.$emit('navigate', categoryId)
    }
  }
}
</script>

<style scoped>
.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 50px;
}

@media (max-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style> 