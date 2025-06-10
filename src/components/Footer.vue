<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo & Description Section -->
      <div class="footer-section">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="Agrofarm Logo" />
        </div>
        <p class="description">
          There are many variation of passa Morem Ipsum available, but the in majority have suffered.
        </p>
        <div class="social-links">
          <h3>Theo dõi tại:</h3>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-behance"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <!-- Quick Links Section -->
      <div class="footer-section">
        <h3>Có thể bạn quan tâm:</h3>
        <ul class="footer-links">
          <li><a href="/products">Sản phẩm của công ty</a></li>
          <li><a href="/contact">Về chúng tôi</a></li>
          <li><a href="/blogs">Sự kiện sắp tới</a></li>
          <li><a href="/services">Dịch vụ hỗ trợ</a></li>
        </ul>
      </div>

      <!-- Contact Info Section -->
      <div class="footer-section">
        <h3>Thông tin công ty:</h3>
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-home"></i>
            <div>
              <h4>Địa chỉ</h4>
              <p>E96 đường 56, KDC 586, Phường Phú Thứ, Quận Cái Răng, Thành phố Cần Thơ, Việt Nam</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <div>
              <h4>Số điện thoại</h4>
              <p>(922) 3354 2252</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-globe"></i>
            <div>
              <h4>Email:</h4>
              <p>example@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="footer-section">
        <h3>Company Info:</h3>
        <p class="newsletter-text">
          There are many variation of passa Morem Ipsum available.
        </p>
        <div class="newsletter-form">
          <input type="email" placeholder="Your Email Address" />
          <button type="submit">Sign Up</button>
        </div>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="copyright">
      <div class="copyright-container">
        <p>Copyright © techno all rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Terms & Condition</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
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
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.footer-section {
  margin-bottom: 40px;
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


.description {
  margin-bottom: 25px;
  line-height: 1.6;
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
  margin-bottom: 15px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s;
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
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.contact-item i {
  min-width: 40px;
  min-height: 40px;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px; /* Đảm bảo icon đủ lớn */
  flex-shrink: 0;  /* Không co lại khi thiếu không gian */
}

.contact-item h4 {
  margin: 0 0 5px 0;
}

.contact-item p {
  margin: 0;
}

.newsletter-text {
  margin-bottom: 20px;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.newsletter-form input {
  padding: 12px;
  border: none;
  border-radius: 25px;
  outline: none;
}

.newsletter-form button {
  padding: 12px;
  border: none;
  border-radius: 25px;
  background-color: #8CC63F;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.newsletter-form button:hover {
  background-color: #7ab32f;
}

.copyright {
  margin-top: 40px;
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
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
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
  .footer-section {
    margin-bottom: 30px;
  }

  .social-icons {
    justify-content: center;
  }

  .newsletter-form {
    width: 100%;
  }

  .footer-bottom-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
