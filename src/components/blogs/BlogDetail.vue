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
          <span class="date"><i class="fas fa-calendar"></i> {{ blog.date }}</span>
          <span class="author"><i class="fas fa-user"></i> {{ blog.author }}</span>
        </div>
        
        <h1>{{ blog.title }}</h1>
        
        <div class="blog-content">
          <p>{{ blog.content }}</p>
        </div>
        
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
  </div>
</template>

<script>
export default {
  name: 'BlogDetail',
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCategoryName(category) {
      const categories = {
        'farming': 'Canh tác',
        'livestock': 'Chăn nuôi',
        'tech': 'Công nghệ'
      }
      return categories[category] || category
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

.blog-content {
  line-height: 1.8;
  color: #444;
  margin-bottom: 30px;
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