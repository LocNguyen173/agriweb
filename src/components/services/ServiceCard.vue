<template>
  <div class="service-card">
    <div class="service-icon">
      <img :src="icon" :alt="title" />
    </div>
    <div class="service-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <!-- <router-link v-if="link" :to="link" class="read-more">Xem thêm <i class="fas fa-arrow-right"></i></router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.service-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 15px 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 70px;
  height: 70px;
  background-color: #e9f5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.service-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.service-content h3 {
  color: #2F5435;
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: 600;
}

.service-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.read-more {
  color: #8CC63F;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s ease;
}

.read-more i {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.read-more:hover {
  color: #2F5435;
}

.read-more:hover i {
  transform: translateX(5px);
}
</style> 