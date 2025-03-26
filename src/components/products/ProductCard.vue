<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="image" :alt="name">
      <div class="product-overlay">
        <div class="product-actions">
          <button class="action-btn" @click="viewProduct"><i class="fas fa-eye"></i></button>
          <button class="action-btn" @click="addToWishlist"><i class="fas fa-heart"></i></button>
          <button class="action-btn" @click="addToCart"><i class="fas fa-shopping-cart"></i></button>
        </div>
      </div>
      <div v-if="discount" class="product-discount">-{{ discount }}%</div>
    </div>
    <div class="product-info">
      <div class="product-category">{{ category }}</div>
      <h3 class="product-name">{{ name }}</h3>
      <div class="product-price">
        <span class="current-price">{{ price }}</span>
        <span v-if="oldPrice" class="old-price">{{ oldPrice }}</span>
      </div>
      <div class="product-rating">
        <i v-for="star in 5" :key="star" class="fas fa-star" 
           :class="{ 'active': star <= rating }"></i>
        <span v-if="reviewCount" class="review-count">({{ reviewCount }})</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    oldPrice: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    viewProduct() {
      this.$emit('view-product')
    },
    addToWishlist() {
      this.$emit('add-to-wishlist')
    },
    addToCart() {
      this.$emit('add-to-cart')
    }
  }
}
</script>

<style scoped>
.product-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2F5435;
  border: none;
  cursor: pointer;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;
}

.product-card:hover .action-btn {
  transform: translateY(0);
  opacity: 1;
}

.product-card:hover .action-btn:nth-child(1) {
  transition-delay: 0.1s;
}

.product-card:hover .action-btn:nth-child(2) {
  transition-delay: 0.2s;
}

.product-card:hover .action-btn:nth-child(3) {
  transition-delay: 0.3s;
}

.action-btn:hover {
  background-color: #8CC63F;
  color: white;
}

.product-discount {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e74c3c;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 3px;
}

.product-info {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  color: #8CC63F;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 600;
}

.product-name {
  color: #2F5435;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.product-card:hover .product-name {
  color: #8CC63F;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.current-price {
  color: #2F5435;
  font-size: 18px;
  font-weight: 700;
}

.old-price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.product-rating i {
  color: #ddd;
  font-size: 14px;
}

.product-rating i.active {
  color: #FFD700;
}

.review-count {
  color: #777;
  font-size: 12px;
  margin-left: 5px;
}

@media (max-width: 768px) {
  .product-image {
    height: 200px;
  }
  
  .product-name {
    font-size: 16px;
  }
  
  .current-price {
    font-size: 16px;
  }
}
</style> 