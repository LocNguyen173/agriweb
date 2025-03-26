<template>
  <div class="section-title">
    <h6 v-if="subtitle">{{ subtitle }}</h6>
    <h2>{{ title }}</h2>
    <div class="divider"></div>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.section-title {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
}

.section-title h6 {
  color: #8CC63F;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  font-weight: 600;
}

.section-title h2 {
  color: #2F5435;
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: 700;
  line-height: 1.2;
}

.divider {
  width: 80px;
  height: 3px;
  background-color: #8CC63F;
  margin: 0 auto 20px;
}

.section-title p {
  color: #666;
  font-size: 16px;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .section-title h2 {
    font-size: 30px;
  }
  
  .section-title p {
    font-size: 15px;
  }
}
</style> 