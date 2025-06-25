<template>
  <div class="products-grid">
    <ProductCard 
      v-for="(product, index) in products" 
      :key="index"
      :name="product.name"
      :category="product.category"
      :price="product.price"
      :image="product.image"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductGrid',
  components: { ProductCard },
  props: {
    products: { type: Array, required: true }
  }
}
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 50px;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>