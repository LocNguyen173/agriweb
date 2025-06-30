<template>
  <div class="services-page">
    <HeroApp 
      title="Dịch Vụ Của Chúng Tôi" 
      subtitle="Cung cấp các dịch vụ nông nghiệp hàng đầu Việt Nam"
      :backgroundImage="require('@/assets/images/services-banner.jpg')"
      showBreadcrumb
      currentPage="Dịch vụ"
    />
    
    <ServiceList :services="mainServices" />
    
    <FeatureSection
      title="Tại Sao Chọn Dịch Vụ Của Chúng Tôi"
      subtitle="LỢI ÍCH"
      description="Chúng tôi cung cấp các dịch vụ nông nghiệp chất lượng cao được thiết kế để tối ưu hóa năng suất và tính bền vững cho nông trại của bạn. Đội ngũ chuyên gia của chúng tôi làm việc cùng bạn để đảm bảo thành công dài hạn."
      :image="require('@/assets/images/services.jpg')"
      :features="featuresList"
    />
    
    <div class="specialized-services">
      <div class="container">
        <SectionTitle 
          title="Dịch Vụ Chuyên Biệt" 
          subtitle="CHUYÊN NGHIỆP"
          description="Các dịch vụ đặc biệt được thiết kế để đáp ứng nhu cầu cụ thể của từng khách hàng"
        />
        
        <div class="specialized-grid">
          <div v-for="(service, index) in specializedServices" :key="index" class="specialized-item">
            <div class="specialized-icon">
              <img :src="service.icon" :alt="service.title" />
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <CallToAction
      title="Sẵn sàng nâng cao năng suất nông nghiệp của bạn?"
      description="Hãy liên hệ với chúng tôi ngay hôm nay để tận dụng các dịch vụ nông nghiệp hiện đại và chuyên nghiệp."
      primaryButtonText="Liên hệ ngay"
      primaryButtonLink="/contact"
      secondaryButtonText="Xem thêm sản phẩm"
      secondaryButtonLink="/products"
      :backgroundImage="require('@/assets/images/handshake.jpg')"
    />
  </div>
</template>

<script>
import HeroApp from '@/components/Hero.vue'
import ServiceList from '@/components/services/ServiceList.vue'
import FeatureSection from '@/components/FeatureSection.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CallToAction from '@/components/CallToAction.vue'

export default {
  name: 'ServicesPage',
  components: {
    HeroApp,
    ServiceList,
    FeatureSection,
    SectionTitle,
    CallToAction
  },
  data() {
    return {
      mainServices: [
        {
          icon: require('@/assets/images/icons/tractor.png'),
          title: 'Dịch vụ làm đất',
          description: 'Dịch vụ làm đất chuyên nghiệp với máy móc hiện đại đảm bảo mặt ruộng phẳng và tơi xốp, giúp cây trồng phát triển tốt.',
          link: '/services/soil-preparation'
        },
        {
          icon: require('@/assets/images/icons/consultant.png'),
          title: 'Tư vấn canh tác',
          description: 'Cung cấp dịch vụ tư vấn về kỹ thuật canh tác, loại cây trồng phù hợp, thời vụ và phương pháp tăng năng suất.',
          link: '/services/farming-advisory'
        },
        {
          icon: require('@/assets/images/icons/irrigation.png'),
          title: 'Hệ thống tưới tiêu',
          description: 'Thiết kế và lắp đặt hệ thống tưới tiêu tự động hiện đại, tiết kiệm nước và tối ưu cho từng loại cây trồng.',
          link: '/services/irrigation-system'
        },
        {
          icon: require('@/assets/images/icons/potted-plant.png'),
          title: 'Bảo vệ thực vật',
          description: 'Dịch vụ phòng trừ sâu bệnh, cỏ dại bằng các phương pháp hiện đại, an toàn và thân thiện với môi trường.',
          link: '/services/plant-protection'
        },
        {
          icon: require('@/assets/images/icons/drone.png'),
          title: 'Thu hoạch cơ giới',
          description: 'Dịch vụ thu hoạch bằng máy móc hiện đại, giúp tiết kiệm thời gian, nhân công và giảm tỷ lệ hao hụt.',
          link: '/services/mechanical-harvesting'
        },
        {
          icon: require('@/assets/images/icons/technology.png'),
          title: 'Tư vấn nông nghiệp 4.0',
          description: 'Tư vấn ứng dụng công nghệ cao trong nông nghiệp: IoT, tự động hóa, giám sát từ xa và phân tích dữ liệu.',
          link: '/services/agriculture-consulting'
        }
      ],
      featuresList: [
        'Đội ngũ chuyên gia có nhiều năm kinh nghiệm',
        'Áp dụng công nghệ hiện đại trong canh tác',
        'Giải pháp bền vững và thân thiện với môi trường',
        'Hỗ trợ kỹ thuật 24/7 cho khách hàng',
        'Cam kết chất lượng với chi phí hợp lý'
      ],
      specializedServices: [
        {
          icon: require('@/assets/images/icons/analysis.png'),
          title: 'Phân tích đất và nước',
          description: 'Dịch vụ kiểm tra và phân tích chất lượng đất, nước để đưa ra khuyến nghị về dinh dưỡng và cải tạo.'
        },
        {
          icon: require('@/assets/images/icons/drone.png'),
          title: 'Giám sát bằng drone',
          description: 'Sử dụng drone để giám sát cây trồng, phát hiện sớm bệnh hại và đánh giá tình trạng sinh trưởng.'
        },
        {
          icon: require('@/assets/images/icons/certification.png'),
          title: 'Chứng nhận nông sản',
          description: 'Hỗ trợ quy trình xin chứng nhận VietGAP, GlobalGAP, hữu cơ và các tiêu chuẩn chất lượng khác.'
        },
        {
          icon: require('@/assets/images/icons/supply.png'),
          title: 'Kết nối chuỗi cung ứng',
          description: 'Giúp nông dân kết nối với nhà máy chế biến, kênh phân phối và thị trường xuất khẩu.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.services-page {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.specialized-services {
  padding: 80px 0;
  background-color: #f5f8f0;
}

.specialized-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 50px;
}

.specialized-item {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.specialized-item:hover {
  transform: translateY(-10px);
}

.specialized-icon {
  width: 80px;
  height: 80px;
  background-color: #e9f5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.specialized-icon img {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.specialized-item h3 {
  color: #2F5435;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

.specialized-item p {
  color: #666;
  font-size: 15px;
  line-height: 1.6;
}

@media (max-width: 992px) {
  .specialized-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .specialized-grid {
    grid-template-columns: 1fr;
  }
  
  .specialized-services {
    padding: 60px 0;
  }
}
</style> 