<template>
  <div class="blog-detail-overlay" @click.self="$emit('close')">
    <div class="blog-detail-container">
      <button class="close-btn" @click="$emit('close')">×</button>
      
      <div class="blog-detail-image">
        <img :src="blog.image" :alt="blog.title">
      </div>
      
      <div class="blog-detail-content">
        <div class="blog-meta">
          <span class="category">{{ getCategoryName(blog.category) }}</span>
          <span class="date"><i class="fas fa-calendar"></i> {{ formatDate(blog.created_at) }}</span>
        </div>
        
        <h1>{{ blog.title }}</h1>
        <!-- Thêm mô tả blog dưới title -->
        <div class="blog-description" v-if="blog.description">
          {{ blog.description }}
        </div>
        <!-- Nội dung bài viết -->
        <div class="blog-content" v-html="sanitizedContent"></div>
        <div class="blog-actions">
          <div class="blog-share">
            <span>Chia sẻ:</span>
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Error -->
    <Error 
      :visible="showError" 
      :message="errorMessage" 
      @close="closeError" 
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import blogApi from '@/shared/api/blogApi'
import DOMPurify from 'dompurify' // Bạn cần cài đặt thư viện này: npm install dompurify
import Error from '@/components/modal/Error.vue'

export default {
  name: 'BlogDetail',
  components: {
    Error
  },
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const content = ref('')
    const showError = ref(false)
    const errorMessage = ref('')
    
    // Lọc nội dung HTML để tránh XSS attacks
    const sanitizedContent = computed(() => {
      return DOMPurify.sanitize(content.value || props.blog.content || '')
    })
    
    function showErrorModal(message) {
      errorMessage.value = message
      showError.value = true
    }
    
    function closeError() {
      showError.value = false
      errorMessage.value = ''
    }
    
    onMounted(async () => {
      // Nếu content là URL Firestore thì fetch nội dung thực
      if (props.blog.content && props.blog.content.startsWith('https://console.firebase.google.com/')) {
        try {
          const response = await blogApi.getBlogContent(props.blog._id)
          content.value = response.text || ''
        } catch (err) {
          showErrorModal('Không thể tải nội dung bài viết. Vui lòng thử lại sau.')
        }
      } else {
        content.value = props.blog.content || ''
      }
    })
    
    function formatDate(date) {
      const d = new Date(date)
      return d.toLocaleDateString('vi-VN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    
    function getCategoryName(category) {
      // Nếu category là object
      if (typeof category === 'object' && category !== null) {
        return category.name || ''
      }
      
      // Nếu là string hoặc id, trả về nguyên giá trị
      return category || ''
    }
    
    return {
      content,
      sanitizedContent,
      showError,
      errorMessage,
      showErrorModal,
      closeError,
      formatDate,
      getCategoryName
    }
  }
}
</script>

<style scoped>
.blog-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.blog-detail-container {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.4s ease;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: none;
  font-size: 24px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.blog-detail-image {
  height: 400px;
  overflow: hidden;
}

.blog-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-detail-content {
  padding: 30px;
}

.blog-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.category {
  background-color: #4CAF50;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.date, .author {
  color: #666;
  font-size: 0.9rem;
}

.blog-detail-content h1 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.blog-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
  font-style: italic;
}

.blog-content {
  line-height: 1.8;
  color: #444;
  margin-bottom: 30px;
}

.blog-content :deep(h1) {
  font-size: 2rem;
  margin: 1.5rem 0 1rem;
  color: #333;
}

.blog-content :deep(h2) {
  font-size: 1.7rem;
  margin: 1.3rem 0 0.8rem;
  color: #444;
}

.blog-content :deep(h3) {
  font-size: 1.4rem;
  margin: 1.2rem 0 0.7rem;
  color: #555;
}

.blog-content :deep(p) {
  margin: 1rem 0;
}

.blog-content :deep(ul), .blog-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.blog-content :deep(li) {
  margin: 0.5rem 0;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #4CAF50;
  margin: 1.5rem 0;
  padding: 0.8rem 1.5rem;
  background: #f9f9f9;
  font-style: italic;
}

.blog-content :deep(a) {
  color: #4CAF50;
  text-decoration: none;
}

.blog-content :deep(a:hover) {
  text-decoration: underline;
}

.blog-content :deep(pre) {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  overflow: auto;
  font-family: monospace;
}

.blog-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.blog-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

.blog-content :deep(th), .blog-content :deep(td) {
  border: 1px solid #ddd;
  padding: 0.6rem;
}

.blog-content :deep(th) {
  background-color: #f2f2f2;
}

.blog-actions {
  border-top: 1px solid #eee;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-share {
  display: flex;
  align-items: center;
  gap: 10px;
}

.social-icon {
  width: 35px;
  height: 35px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
}

.social-icon:hover {
  background-color: #4CAF50;
  color: white;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .blog-detail-image {
    height: 250px;
  }
  
  .blog-detail-content {
    padding: 20px;
  }
  
  .blog-detail-content h1 {
    font-size: 1.5rem;
  }
}
</style>