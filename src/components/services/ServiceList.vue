<template>
  <div class="service-list">
    <div class="container">
      <SectionTitle 
        :title="sectionTitle" 
        :subtitle="sectionSubtitle" 
        :description="sectionDescription" 
      />
      
      <div class="services-grid">
        <div v-for="(service, index) in services" :key="index" class="service-item">
          <ServiceCard 
            :icon="service.icon" 
            :title="service.title" 
            :description="service.description"
            :link="service.link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '../SectionTitle.vue'
import ServiceCard from './ServiceCard.vue'

export default {
  name: 'ServiceList',
  components: {
    SectionTitle,
    ServiceCard
  },
  props: {
    sectionTitle: {
      type: String,
      default: 'Dịch Vụ Của Chúng Tôi'
    },
    sectionSubtitle: {
      type: String,
      default: 'DỊCH VỤ'
    },
    sectionDescription: {
      type: String,
      default: 'Chúng tôi cung cấp các dịch vụ nông nghiệp chất lượng cao để đáp ứng mọi nhu cầu của bạn'
    },
    services: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.service-list {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

@media (max-width: 992px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .service-list {
    padding: 60px 0;
  }
}
</style> 