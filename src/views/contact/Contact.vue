<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <Hero 
      title="Liên Hệ Với Chúng Tôi" 
      subtitle="Hãy kết nối với chúng tôi để được hỗ trợ nhanh nhất"
      :showButton="false"
      backgroundImage="@/assets/images/contact-bg.jpg"
    />

    <!-- Contact Info & Form Section -->
    <section class="contact-section">
      <div class="container">
        <div class="section-header">
          <h2>CHÚNG TÔI LUÔN SẴN SÀNG LẮNG NGHE TỪ BẠN</h2>
          <div class="section-divider"></div>
          <h3>Gửi Thông Tin</h3>
        </div>
        
        <div class="contact-row">
          <!-- Contact Information -->
          <div class="contact-info">
            <h3>Thông Tin Liên Hệ</h3>
            
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="info-content">
                <h4>Địa Chỉ</h4>
                <p>123 Đường Nông Nghiệp, Quận 1, TP HCM</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="info-content">
                <h4>Điện Thoại</h4>
                <p>0123 456 789</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="info-content">
                <h4>Email</h4>
                <p>support@agriweb.com</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="info-content">
                <h4>Giờ Làm Việc</h4>
                <p>Thứ Hai - Thứ Sáu: 8:00 - 17:00</p>
              </div>
            </div>
            
            <div class="social-links">
              <h4>Kết Nối Với Chúng Tôi</h4>
              <div class="social-icons">
                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="contact-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <div class="section-header">
          <h2>VỊ TRÍ CỦA CHÚNG TÔI</h2>
          <div class="section-divider"></div>
          <h3>Ghé thăm trụ sở chính của chúng tôi</h3>
        </div>
        
        <GoogleMap />
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header">
          <h2>CÂU HỎI THƯỜNG GẶP</h2>
          <div class="section-divider"></div>
          <h3>Một số thông tin hữu ích cho bạn</h3>
        </div>
        
        <FaqAccordion />
      </div>
    </section>
    
    <!-- Call To Action -->
    <CallToAction 
      title="Bạn đã sẵn sàng trở thành đối tác của chúng tôi?" 
      buttonText="Đăng Ký Ngay"
      buttonLink="/register"
    />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue';
import CallToAction from '@/components/CallToAction.vue';
import ContactForm from '@/components/contact/ContactForm.vue';
import GoogleMap from '@/components/contact/GoogleMap.vue';
import FaqAccordion from '@/components/contact/FaqAccordion.vue';

export default {
  name: 'ContactPage',
  components: {
    Hero,
    CallToAction,
    ContactForm,
    GoogleMap,
    FaqAccordion,
  }
}
</script>

<style scoped>
.contact-page {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  color: #8bc34a;
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.section-divider {
  height: 3px;
  width: 60px;
  background-color: #8bc34a;
  margin: 15px auto;
}

.section-header h3 {
  color: #2c4f3c;
  font-size: 28px;
  margin-top: 10px;
}

.contact-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.contact-row {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.contact-info {
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.contact-info h3 {
  color: #2c4f3c;
  font-size: 22px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.info-item {
  display: flex;
  margin-bottom: 20px;
}

.info-icon {
  width: 50px;
  height: 50px;
  background-color: #f1f8e9;
  color: #8bc34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 15px;
}

.info-content h4 {
  color: #2c4f3c;
  margin-bottom: 5px;
  font-size: 16px;
}

.info-content p {
  color: #666;
  font-size: 15px;
}

.social-links {
  margin-top: 30px;
}

.social-links h4 {
  color: #2c4f3c;
  margin-bottom: 15px;
  font-size: 16px;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon {
  width: 40px;
  height: 40px;
  background-color: #8bc34a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.social-icon:hover {
  background-color: #2c4f3c;
}

.contact-form {
  flex: 1;
  min-width: 300px;
}

.map-section {
  padding: 80px 0;
  background-color: white;
}

.faq-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

@media (max-width: 768px) {
  .contact-row {
    flex-direction: column;
  }
  
  .section-header h3 {
    font-size: 24px;
  }
  
  .social-links {
    margin-top: 20px;
  }
}
</style>