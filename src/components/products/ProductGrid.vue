<template>
  <div class="products-grid">
    <ProductCard 
      v-for="(product, index) in products" 
      :key="index"
      :name="product.name"
      :category="product.category"
      :price="product.price"
      :oldPrice="product.oldPrice"
      :rating="product.rating"
      :reviewCount="product.reviewCount"
      :image="product.image"
      :discount="product.discount"
      @view-product="onViewProduct(product)"
      @add-to-wishlist="onAddToWishlist(product)"
      @add-to-cart="onAddToCart(product)"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductGrid',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    onViewProduct(product) {
      this.$emit('view-product', product)
    },
    onAddToWishlist(product) {
      this.$emit('add-to-wishlist', product)
    },
    onAddToCart(product) {
      this.$emit('add-to-cart', product)
    }
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