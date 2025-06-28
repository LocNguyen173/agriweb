<template>
  <div class="contact-form-container">
    <div class="success-alert" v-if="showSuccess">
      <i class="bi bi-check-circle"></i>
      Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
      <button type="button" class="close-alert" @click="showSuccess = false">×</button>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-header">
        <h3>Gửi Thông Tin</h3>
        <div class="form-line"></div>
      </div>
      
      <div class="form-row">
        <div class="form-field">
          <label for="name">Họ và tên</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name"
            :class="{ 'error': errors.name }"
            placeholder="Nhập họ và tên của bạn"
          >
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>
        
        <div class="form-field">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            :class="{ 'error': errors.email }"
            placeholder="Nhập email của bạn"
          >
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>
      </div>
      
      <div class="form-field">
        <label for="subject">Chủ đề</label>
        <input 
          type="text" 
          id="subject" 
          v-model="formData.subject"
          :class="{ 'error': errors.subject }"
          placeholder="Nhập chủ đề liên hệ"
        >
        <span class="error-message" v-if="errors.subject">{{ errors.subject }}</span>
      </div>
      
      <div class="form-field">
        <label for="message">Nội dung</label>
        <textarea 
          id="message" 
          v-model="formData.message"
          :class="{ 'error': errors.message }"
          placeholder="Nhập nội dung tin nhắn"
          rows="5"
        ></textarea>
        <span class="error-message" v-if="errors.message">{{ errors.message }}</span>
      </div>
      
      <button type="submit" class="submit-button" :disabled="isSubmitting">
        <span class="spinner" v-if="isSubmitting"></span>
        {{ isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn' }}
      </button>
    </form>
  </div>
</template>

<script>
import contactApi from '@/shared/api/contactApi'

export default {
  name: 'ContactForm',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      showSuccess: false
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.formData.name) {
        this.errors.name = 'Vui lòng nhập họ tên';
      }
      if (!this.formData.email) {
        this.errors.email = 'Vui lòng nhập email';
      } else if (!this.validateEmail(this.formData.email)) {
        this.errors.email = 'Email không hợp lệ';
      }
      if (!this.formData.subject) {
        this.errors.subject = 'Vui lòng nhập chủ đề';
      }
      if (!this.formData.message) {
        this.errors.message = 'Vui lòng nhập nội dung';
      }
      return Object.keys(this.errors).length === 0;
    },
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    async handleSubmit() {
      if (!this.validateForm()) return;
      
      this.isSubmitting = true;
      try {
        // Gửi email thông qua API
        await contactApi.sendContactEmail(this.formData);
        this.showSuccess = true;
        this.resetForm();
      } catch (error) {
        console.error('Lỗi gửi email:', error);
        // Hiển thị thông báo lỗi cho người dùng
        alert('Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.');
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    }
  }
}
</script>

<style scoped>
.contact-form-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.form-header {
  margin-bottom: 30px;
  text-align: center;
}

.form-header h3 {
  color: #2c4f3c;
  font-size: 24px;
  margin-bottom: 10px;
}

.form-line {
  background: linear-gradient(90deg, #8bc34a, #689f38);
  height: 4px;
  width: 70px;
  margin: 0 auto;
  border-radius: 2px;
}

.form-row {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}

.form-field {
  margin-bottom: 24px;
  width: 100%;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c4f3c;
  font-size: 14px;
}

input, textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  border-color: #8bc34a;
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 195, 74, 0.1);
}

input.error, textarea.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.submit-button {
  background-color: #8bc34a;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #7cb342;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 195, 74, 0.3);
}

.submit-button:disabled {
  background-color: #b0b0b0;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid #fff;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  animation: spin 1s linear infinite;
}

.success-alert {
  background-color: #dff2bf;
  color: #4f8a10;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
}

.success-alert i {
  margin-right: 10px;
  font-size: 18px;
}

.close-alert {
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: #4f8a10;
  cursor: pointer;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .contact-form-container {
    padding: 30px 20px;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 10px;
  }
  
  .form-header h3 {
    font-size: 20px;
  }
  
  input, textarea {
    padding: 12px 15px;
    font-size: 14px;
  }
  
  .form-field {
    margin-bottom: 20px;
  }
  
  .submit-button {
    padding: 12px 15px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .contact-form-container {
    padding: 25px 15px;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
  }
  
  .form-header h3 {
    font-size: 18px;
  }
  
  .form-line {
    width: 50px;
    height: 3px;
  }
  
  label {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  input, textarea {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .form-field {
    margin-bottom: 18px;
  }
  
  .error-message {
    font-size: 11px;
  }
  
  .success-alert {
    padding: 12px;
    font-size: 13px;
  }
  
  .success-alert i {
    font-size: 16px;
  }
  
  .submit-button {
    padding: 12px 15px;
    font-size: 14px;
  }
}

/* Thêm responsive cho màn hình lớn */
@media (min-width: 992px) {
  .contact-form-container {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>