<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo & Description Section -->
      <div class="footer-section">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="BVTV Nam Mekong Logo" />
        </div>
        <p class="description">
          BVTV Nam Mekong - Nhà cung cấp giải pháp bảo vệ thực vật hàng đầu, cam kết mang đến sản phẩm chất lượng cao cho nông nghiệp bền vững.
        </p>
        <div class="social-links">
          <h3>Theo dõi chúng tôi:</h3>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <!-- Quick Links Section -->
      <div class="footer-section">
        <h3>Liên kết nhanh:</h3>
        <ul class="footer-links">
          <li><a href="/">Trang chủ</a></li>
          <li><a href="/products">Sản phẩm</a></li>
          <li><a href="/services">Dịch vụ</a></li>
          <li><a href="/blogs">Bài viết</a></li>
          <li><a href="/contact">Liên hệ</a></li>
        </ul>
      </div>

      <!-- Contact Info Section -->
      <div class="footer-section">
        <h3>Thông tin liên hệ:</h3>
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <p>E96 đường 56, KDC 586, Phường Phú Thứ, Quận Cái Răng, TP. Cần Thơ</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <div>
              <p>(922) 3354 2252</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <div>
              <p>info@bvtvnammekong.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="copyright">
      <div class="copyright-container">
        <p>© 2025 BVTV Nam Mekong. Tất cả quyền được bảo lưu.</p>
        <div class="footer-bottom-links">
          <a href="/contact">Liên hệ</a>
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản sử dụng</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background-color: #2F5435;
  color: white;
  padding-top: 60px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px 20px;
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 40px;
  align-items: start;
}

.footer-section {
  margin-bottom: 0;
}

.logo {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.15);
  padding: 20px 24px;
  display: inline-block;
  margin-bottom: 20px;
}

.logo img {
  height: 100px;
}

.footer-section h3 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #8CC63F;
}



.social-links h3 {
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.social-icon:hover {
  background-color: #8CC63F;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s;
  font-size: 16px;
  line-height: 1.4;
}

.footer-links a::before {
  content: "✓";
  margin-right: 10px;
  color: #8CC63F;
}

.footer-links a:hover {
  color: #8CC63F;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-item i {
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  background-color: #8CC63F;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  color: white;
}

.contact-item h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  color: #8CC63F;
}

.contact-item p {
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
}



.copyright {
  margin-top: 0;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom-links {
  display: flex;
  gap: 20px;
}

.footer-bottom-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-bottom-links a:hover {
  color: #8CC63F;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 20px 30px 20px;
  }

  .footer {
    padding-top: 40px;
  }

  .copyright-container {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .footer-bottom-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding-top: 30px;
  }

  .footer-container {
    gap: 25px;
    padding: 0 20px 25px 20px;
  }

  .social-icons {
    justify-content: flex-start;
  }

  .footer-bottom-links {
    flex-direction: column;
    gap: 10px;
  }

  .logo {
    padding: 15px 20px;
  }

  .logo img {
    height: 80px;
  }
}

.description {
  margin-bottom: 25px;
  line-height: 1.6;
  font-size: 14px;
}
</style>
