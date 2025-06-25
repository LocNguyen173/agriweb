<template>
  <div class="product-slider">
    <button 
      v-if="canSlidePrev" 
      class="slider-arrow left" 
      @click="slidePrev"
      aria-label="Trước"
    >
      &#8592;
    </button>
    <div class="slider-container">
      <transition-group 
        name="slide-fade" 
        tag="div" 
        class="slider-list"
      >
        <ProductCard
          v-for="(product, idx) in visibleProducts"
          :key="product._id || 'product-' + idx"
          :name="product.name"
          :category="product.category?.name || ''"
          :price="formatPrice(product.price)"
          :image="product.image"
          :description="product.description"
        />
      </transition-group>
    </div>
    <button 
      v-if="canSlideNext" 
      class="slider-arrow right" 
      @click="slideNext"
      aria-label="Sau"
    >
      &#8594;
    </button>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductSlider',
  components: { ProductCard },
  props: {
    products: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      currentIndex: 0,
      isAnimating: false
    }
  },
  computed: {
    visibleProducts() {
      return this.products.slice(this.currentIndex, this.currentIndex + this.itemsPerPage)
    },
    canSlidePrev() {
      return this.currentIndex > 0
    },
    canSlideNext() {
      return this.currentIndex + this.itemsPerPage < this.products.length
    }
  },
  methods: {
    slidePrev() {
      if (this.canSlidePrev && !this.isAnimating) {
        this.isAnimating = true
        this.currentIndex -= this.itemsPerPage
        setTimeout(() => {
          this.isAnimating = false
        }, 500) // Match this with the CSS animation duration
      }
    },
    slideNext() {
      if (this.canSlideNext && !this.isAnimating) {
        this.isAnimating = true
        this.currentIndex += this.itemsPerPage
        setTimeout(() => {
          this.isAnimating = false
        }, 500) // Match this with the CSS animation duration
      }
    },
    formatPrice(price) {
      if (typeof price === 'number') {
        return price.toLocaleString('vi-VN') + '₫'
      }
      return price
    }
  }
}
</script>

<style scoped>
.product-slider {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.slider-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.slider-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 100%;
}

.slider-arrow {
  background: #8CC63F;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.slider-arrow:hover {
  background: #6fae2b;
  transform: scale(1.2);
}

.slider-arrow.left {
  margin-right: 15px;
}

.slider-arrow.right {
  margin-left: 15px;
}

.slider-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Transition effects */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
  position: absolute;
}

/* Additional styling for smoother animations */
.product-card {
  transition: all 0.5s ease;
}

@media (max-width: 992px) {
  .slider-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .slider-list {
    grid-template-columns: 1fr;
  }
  
  .slider-arrow {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
  
  .slider-arrow.left {
    margin-right: 10px;
  }
  
  .slider-arrow.right {
    margin-left: 10px;
  }
}

/* Pagination indicators (optional) */
.slider-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-dot.active {
  background-color: #8CC63F;
  transform: scale(1.2);
}
</style>