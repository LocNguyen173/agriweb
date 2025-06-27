<template>
  <div class="blog-card" @click="$emit('click')">
    <div class="blog-image">
      <img :src="blog.image" :alt="blog.title">
      <div class="category-badge">{{ getCategoryName(blog.category) }}</div>
    </div>
    <div class="blog-content">
      <h3>{{ blog.title }}</h3>
      <p class="blog-meta">
        <span><i class="fas fa-calendar"></i> {{ blog.date }}</span>
      </p>
      <p class="blog-preview">{{ blog.description }}</p>
      <div class="read-more">Đọc thêm <i class="fas fa-arrow-right"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogCard',
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCategoryName(category) {
      // Nếu category là object (populate từ backend), lấy name
      if (category && typeof category === 'object' && category.name) {
        return category.name
      }
      // Nếu là string (trường hợp cũ)
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
.blog-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.blog-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.blog-card:hover .blog-image img {
  transform: scale(1.1);
}

.category-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.blog-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-content h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
  color: #333;
}

.blog-meta {
  display: flex;
  gap: 15px;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 15px;
}

.blog-preview {
  color: #555;
  margin-bottom: 15px;
  flex: 1;
}

.read-more {
  color: #4CAF50;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: gap 0.3s;
}

.blog-card:hover .read-more {
  gap: 10px;
}
</style>