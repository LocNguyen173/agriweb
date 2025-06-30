<template>
  <div class="blog-page">
    <Hero
      title="Bài Viết Nông Nghiệp"
      subtitle="Chia sẻ kiến thức và kinh nghiệm về nông nghiệp"
      :backgroundImage="require('@/assets/images/blog-hero.jpg')"
      showBreadcrumb
      currentPage="Bài viết"
    />
    
    <div class="blog-container">
      <div class="blog-sidebar">
        <!-- Thanh tìm kiếm -->
        <div class="search-box">
          <input type="text" placeholder="Tìm kiếm..." v-model="searchQuery">
          <button><i class="fas fa-search"></i></button>
        </div>
        
        <!-- Danh mục ngắn gọn hơn -->
        <div class="category-box">
          <h3>Danh mục</h3>
          <ul class="category-list">
            <li @click="filterCategory('all')" :class="{ active: selectedCategory === 'all' }">Tất cả</li>
            <li v-for="category in categories" :key="category._id" @click="filterCategory(category._id)" :class="{ active: selectedCategory === category._id }">
              {{ category.name }}
            </li>
          </ul>
        </div>
        
        <!-- Calendar component -->
        <Calendar v-model:selectedDate="selectedDate" />
        
        <!-- Bài viết gần đây -->
        <div class="recent-posts">
          <h3>Bài viết gần đây</h3>
          <ul>
            <li v-for="blog in blogs.slice(0, 3)" :key="`recent-${blog.id}`" @click="openBlog(blog)">
              <div class="recent-post-image">
                <img :src="blog.image" :alt="blog.title">
              </div>
              <div class="recent-post-info">
                <h4>{{ blog.title }}</h4>
                <span>{{ blog.date }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="blog-list">
        <transition-group name="blog-animation" tag="div" class="blog-grid">
          <BlogCard 
            v-for="blog in filteredAndSearchedBlogs" 
            :key="blog.id" 
            :blog="blog"
            @click="openBlog(blog)"
          />
        </transition-group>
      </div>
    </div>
    
    <BlogDetail 
      v-if="selectedBlog" 
      :blog="selectedBlog" 
      @close="selectedBlog = null"
    />
    
    <!-- Modal Error -->
    <Error 
      :visible="showError" 
      :message="errorMessage" 
      @close="closeError" 
    />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import BlogCard from '@/components/blogs/BlogCard.vue'
import BlogDetail from '@/components/blogs/BlogDetail.vue'
import Calendar from '@/components/Calendar.vue'
import Error from '@/components/modal/Error.vue'
import blogApi from '@/shared/api/blogApi'
import blogCategoryApi from '@/shared/api/blogCategoryApi'

export default {
  name: 'BlogPage',
  components: {
    Hero,
    BlogCard,
    BlogDetail,
    Calendar,
    Error
  },
  data() {
    return {
      selectedCategory: 'all',
      selectedBlog: null,
      searchQuery: '',
      blogs: [],
      categories: [],
      selectedDate: null, // Ngày được chọn từ calendar
      showError: false,
      errorMessage: ''
    }
  },
  mounted() {
    this.fetchBlogs()
    this.fetchCategories()
  },
  computed: {
    filteredAndSearchedBlogs() {
      let result = this.blogs;
      
      // Lọc theo danh mục
      if (this.selectedCategory !== 'all') {
        result = result.filter(blog => {
          // Nếu category là object, so sánh _id
          if (blog.category && typeof blog.category === 'object') {
            return blog.category._id === this.selectedCategory
          }
          // Nếu category là id
          return blog.category === this.selectedCategory
        })
      }
      
      // Lọc theo từ khóa tìm kiếm
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase().trim();
        result = result.filter(blog => 
          blog.title.toLowerCase().includes(query) || 
          blog.description.toLowerCase().includes(query) || 
          blog.content.toLowerCase().includes(query)
        );
      }
      
      return result;
    }
  },
  watch: {
    selectedDate(newDate) {
      // Lọc blog theo ngày được chọn
      if (newDate) {
        this.fetchBlogsByDate(newDate);
      } else {
        // Không có ngày được chọn, hiển thị tất cả blog
        this.fetchBlogs();
      }
    }
  },
  methods: {
    async fetchBlogs() {
      try {
        const blogs = await blogApi.getAllBlogs()
        this.blogs = blogs.map(blog => ({
          ...blog,
          date: blog.created_at ? new Date(blog.created_at).toLocaleDateString('vi-VN') : '',
        }))
      } catch (error) {
        this.blogs = []
      }
    },
    async fetchBlogsByDate(date) {
      try {
        const blogs = await blogApi.getBlogsByDate(date)
        this.blogs = blogs.map(blog => ({
          ...blog,
          date: blog.created_at ? new Date(blog.created_at).toLocaleDateString('vi-VN') : '',
        }))
      } catch (error) {
        this.showErrorModal('Lỗi khi tải bài viết theo ngày. Vui lòng thử lại sau.')
        this.blogs = []
      }
    },
    showErrorModal(message) {
      this.errorMessage = message
      this.showError = true
    },
    closeError() {
      this.showError = false
      this.errorMessage = ''
    },
    async fetchCategories() {
      try {
        const categories = await blogCategoryApi.getAllCategories()
        this.categories = categories
      } catch (error) {
        this.categories = []
      }
    },
    filterCategory(categoryId) {
      this.selectedCategory = categoryId
    },
    openBlog(blog) {
      this.selectedBlog = blog;
    }
  }
}
</script>

<style scoped>
.blog-page {
  position: relative;
}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  gap: 30px;
}

.blog-sidebar {
  width: 300px;
}

/* Search box styles */
.search-box {
  display: flex;
  margin-bottom: 25px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.search-box input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  background: #f5f5f5;
  font-size: 1rem;
}

.search-box button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0 15px;
  cursor: pointer;
}

/* Category styles */
.category-box, .recent-posts {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
}

h3 {
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.category-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-list li {
  background: #e8e8e8;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.category-list li:hover, .category-list li.active {
  background: #4CAF50;
  color: white;
}

/* Recent posts */
.recent-posts ul {
  list-style: none;
  padding: 0;
}

.recent-posts li {
  display: flex;
  margin-bottom: 15px;
  cursor: pointer;
}

.recent-post-image {
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 10px;
}

.recent-post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recent-post-info {
  flex: 1;
}

.recent-post-info h4 {
  margin: 0 0 5px 0;
  font-size: 0.95rem;
}

.recent-post-info span {
  font-size: 0.8rem;
  color: #666;
}

/* Blog list */
.blog-list {
  flex: 1;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

/* Animation for blog cards */
.blog-animation-enter-active, .blog-animation-leave-active {
  transition: all 0.5s;
}

.blog-animation-enter, .blog-animation-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 992px) {
  .blog-container {
    flex-direction: column;
  }
  
  .blog-sidebar {
    width: 100%;
    margin-bottom: 30px;
  }
  
  .category-list {
    display: flex;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>