<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="image" :alt="name">
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

/* .old-price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
} */

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
}
</style>