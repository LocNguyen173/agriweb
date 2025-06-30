<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section">
      <!-- <video autoplay muted loop class="hero-video">
        <source :src="require('@/assets/videos/Live Demo for Html Theme #240616 - Google Chrome 2025-03-26 11-43-47.mp4')" type="video/mp4">
      </video> -->
      <div class="hero-placeholder"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Nông Nghiệp Xanh & Bền Vững</h1>
        <p>Cùng chúng tôi xây dựng tương lai nông nghiệp bền vững và hiện đại</p>
        <div class="hero-buttons">
          <router-link to="/services" class="primary-button">Khám phá dịch vụ</router-link>
          <router-link to="/contact" class="secondary-button">Liên hệ với chúng tôi</router-link>
        </div>
      </div>
    </div>
    
    <!-- Services Section -->
    <ServiceList :services="highlightedServices" />
    
    <!-- Feature Section -->
    <FeatureSection
      title="Nông Nghiệp Công Nghệ Cao"
      subtitle="VỀ CHÚNG TÔI"
      description="Chúng tôi áp dụng các phương pháp canh tác hiện đại, kết hợp công nghệ tiên tiến để tạo ra các sản phẩm nông nghiệp chất lượng cao, an toàn và thân thiện với môi trường."
      :image="require('@/assets/images/high-tech.jpg')"
      :features="aboutFeatures"
      buttonText="Tìm hiểu thêm"
      buttonLink="/about"
    />
    
    <!-- Call To Action -->
    <!-- <CallToAction
      title="Bạn cần tư vấn về dịch vụ nông nghiệp?"
      description="Chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn. Hãy liên hệ ngay hôm nay để được tư vấn miễn phí."
      primaryButtonText="Liên hệ ngay"
      primaryButtonLink="/contact"
      :backgroundImage="require('@/assets/images/cta-bg.jpg')"
    /> -->
  </div>
</template>

<script>
import ServiceList from '@/components/services/ServiceList.vue'
import FeatureSection from '@/components/FeatureSection.vue'
// import CallToAction from '@/components/CallToAction.vue'

export default {
  name: 'HomePage',
  components: {
    ServiceList,
    FeatureSection,
    // CallToAction
  },
  data() {
    return {
      highlightedServices: [
        {
          icon: require('@/assets/images/icons/tractor.png'),
          title: 'Dịch vụ làm đất',
          description: 'Dịch vụ làm đất chuyên nghiệp với máy móc hiện đại đảm bảo mặt ruộng phẳng và tơi xốp.',
          link: '/services/soil-preparation'
        },
        {
          icon: require('@/assets/images/icons/consultant.png'),
          title: 'Tư vấn canh tác',
          description: 'Cung cấp dịch vụ tư vấn về kỹ thuật canh tác, loại cây trồng phù hợp và phương pháp tăng năng suất.',
          link: '/services/farming-advisory'
        },
        {
          icon: require('@/assets/images/icons/drone.png'),
          title: 'Nông nghiệp 4.0',
          description: 'Tư vấn ứng dụng công nghệ cao trong nông nghiệp: IoT, tự động hóa và phân tích dữ liệu.',
          link: '/services/agriculture-consulting'
        }
      ],
      aboutFeatures: [
        'Sử dụng công nghệ IoT trong canh tác và giám sát',
        'Hệ thống tưới nhỏ giọt tiết kiệm nước',
        'Sử dụng năng lượng mặt trời trong các hoạt động nông nghiệp',
        'Ứng dụng AI và dữ liệu lớn trong quản lý nông trại'
      ]
    }
  }
}
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 0;
  overflow: hidden;
}

.hero-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2F5435;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 54px;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-content p {
  font-size: 20px;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.primary-button {
  display: inline-block;
  background-color: #8CC63F;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 16px;
}

.primary-button:hover {
  background-color: #2F5435;
  transform: translateY(-3px);
}

.secondary-button {
  display: inline-block;
  background-color: transparent;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid white;
  font-size: 16px;
}

.secondary-button:hover {
  background-color: white;
  color: #2F5435;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 36px;
  }
  
  .hero-content p {
    font-size: 16px;
  }
  
  .hero-section {
    height: 80vh;
  }
}
</style>
