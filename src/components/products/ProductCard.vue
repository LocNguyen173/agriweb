<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="image" :alt="name">
      <div class="product-overlay">
        <div class="product-description">{{ description }}</div>
      </div>
    </div>
    <div class="product-info">
      <div class="product-category">{{ category }}</div>
      <h3 class="product-name">{{ name }}</h3>
      <span class="product-price">{{ price }}</span>
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
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: 'Sản phẩm nông nghiệp chất lượng cao, thân thiện với môi trường.'
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
  position: relative;
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

/* Overlay styles */
.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(47, 84, 53, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.product-card:hover .product-overlay {
  opacity: 1;
  pointer-events: auto;
}

.product-description {
  color: #fff;
  font-size: 15px;
  line-height: 1.6;
  text-align: center;
  padding: 20px;
  max-height: 100%;
  overflow-y: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  font-weight: 400;
  scrollbar-width: thin;
  scrollbar-color: #8CC63F rgba(255, 255, 255, 0.2);
}

.product-description::-webkit-scrollbar {
  width: 5px;
}

.product-description::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.product-description::-webkit-scrollbar-thumb {
  background-color: #8CC63F;
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
  font-size: 16px;
  margin-bottom: 4px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
}

.product-name {
  color: #2F5435;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  transition: color 0.3s ease;
  align-items: center;
  justify-content: center;
  display: flex;
}

.product-card:hover .product-name {
  color: #8CC63F;
}

.product-price {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: #2F5435;
  font-size: 18px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .product-image {
    height: 200px;
  }
  
  .product-name {
    font-size: 16px;
  }
  
  .product-price {
    font-size: 16px;
  }
  
  .product-description {
    font-size: 14px;
    padding: 15px;
  }
}
</style>