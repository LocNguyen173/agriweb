<template>
  <div class="google-map-wrapper">
    <div class="google-map">
      <div class="loading-overlay" v-if="!mapLoaded">
        <div class="loading-content">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
          <p>Đang tải bản đồ...</p>
        </div>
      </div>
      
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3193918406867!2d106.69976937469847!3d10.786583489360743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5c734358b2!2zUGjhu5EgxJDhu5NuZyBLaOG7mSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711459367133!5m2!1svi!2s" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        @load="mapLoaded = true"
      ></iframe>
      
      <div class="contact-card">
        <h3>Trụ sở chính</h3>
        <div class="contact-info">
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <p>123 Đường Nông Nghiệp, Quận 1, TP HCM</p>
          </div>
        </div>
        <a href="https://goo.gl/maps/123" target="_blank" class="btn btn-success">
          <i class="fas fa-directions"></i> Chỉ đường
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      mapLoaded: false
    }
  }
}
</script>

<style scoped>
.google-map-wrapper {
  padding: 2rem 0;
  position: relative;
}

.google-map {
  position: relative;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.google-map iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content {
  text-align: center;
}

.contact-card {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  border-left: 4px solid #198754;
}

.contact-card h3 {
  color: #198754;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.info-item {
  display: flex;
  align-items: start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-item i {
  color: #198754;
  background: #e9f7ef;
  padding: 0.5rem;
  border-radius: 50%;
}

.btn-success {
  width: 100%;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .contact-card {
    position: relative;
    top: 0;
    right: 0;
    max-width: 100%;
    margin-top: 1rem;
  }
  
  .google-map {
    height: 400px;
  }
}
</style>