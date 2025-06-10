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
            <li @click="filterCategory('farming')" :class="{ active: selectedCategory === 'farming' }">Canh tác</li>
            <li @click="filterCategory('livestock')" :class="{ active: selectedCategory === 'livestock' }">Chăn nuôi</li>
            <li @click="filterCategory('tech')" :class="{ active: selectedCategory === 'tech' }">Công nghệ</li>
          </ul>
        </div>
        
        <!-- Thêm lịch -->
        <div class="calendar-box">
          <h3>Lịch</h3>
          <div class="calendar-header">
            <div class="calendar-nav">
              <button class="calendar-btn"><i class="fas fa-chevron-left"></i></button>
              <span>Tháng 3, 2025</span>
              <button class="calendar-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>
          <div class="calendar-days">
            <div class="weekday">CN</div>
            <div class="weekday">T2</div>
            <div class="weekday">T3</div>
            <div class="weekday">T4</div>
            <div class="weekday">T5</div>
            <div class="weekday">T6</div>
            <div class="weekday">T7</div>
            
            <div class="day empty"></div>
            <div class="day empty"></div>
            <div class="day empty"></div>
            <div class="day empty"></div>
            <div class="day empty"></div>
            <div class="day">1</div>
            <div class="day">2</div>
            
            <div class="day">3</div>
            <div class="day">4</div>
            <div class="day">5</div>
            <div class="day">6</div>
            <div class="day">7</div>
            <div class="day">8</div>
            <div class="day">9</div>
            
            <div class="day">10</div>
            <div class="day">11</div>
            <div class="day">12</div>
            <div class="day">13</div>
            <div class="day">14</div>
            <div class="day">15</div>
            <div class="day">16</div>
            
            <div class="day">17</div>
            <div class="day">18</div>
            <div class="day">19</div>
            <div class="day">20</div>
            <div class="day">21</div>
            <div class="day">22</div>
            <div class="day has-blog">23</div>
            
            <div class="day has-blog">24</div>
            <div class="day has-blog">25</div>
            <div class="day has-blog current">26</div>
            <div class="day">27</div>
            <div class="day">28</div>
            <div class="day">29</div>
            <div class="day">30</div>
            
            <div class="day">31</div>
          </div>
        </div>
        
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
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import BlogCard from '@/components/blogs/BlogCard.vue'
import BlogDetail from '@/components/blogs/BlogDetail.vue'

export default {
  name: 'BlogPage',
  components: {
    Hero,
    BlogCard,
    BlogDetail
  },
  data() {
    return {
      selectedCategory: 'all',
      selectedBlog: null,
      searchQuery: '',
      blogs: [
        {
          id: 1,
          title: 'Kỹ thuật trồng rau sạch tại nhà',
          category: 'farming',
          image: require('@/assets/images/blog1.jpg'),
          preview: 'Học cách trồng rau sạch tại nhà với những kỹ thuật đơn giản và hiệu quả...',
          content: 'Chi tiết về cách trồng rau sạch tại nhà với những kỹ thuật đơn giản và hiệu quả. Bài viết sẽ hướng dẫn từng bước từ việc chuẩn bị đất, chọn giống, cách trồng và chăm sóc để có được rau sạch tại nhà.',
          date: '26/03/2025',
          author: 'Nguyễn Văn A'
        },
        {
          id: 2,
          title: 'Ứng dụng IoT trong nông nghiệp hiện đại',
          category: 'tech',
          image: require('@/assets/images/blog2.jpg'),
          preview: 'Internet of Things đang cách mạng hóa ngành nông nghiệp...',
          content: 'Internet of Things (IoT) đang cách mạng hóa ngành nông nghiệp bằng cách cho phép nông dân theo dõi và kiểm soát từ xa nhiều khía cạnh của hoạt động nông nghiệp. Từ hệ thống tưới tiêu thông minh đến giám sát điều kiện thời tiết và sức khỏe cây trồng.',
          date: '25/03/2025',
          author: 'Trần Văn B'
        },
        {
          id: 3,
          title: 'Phương pháp nuôi gà thả vườn hiệu quả',
          category: 'livestock',
          image: require('@/assets/images/blog3.jpg'),
          preview: 'Cách nuôi gà thả vườn mang lại hiệu quả kinh tế cao...',
          content: 'Phương pháp nuôi gà thả vườn đang ngày càng được ưa chuộng vì tính bền vững và chất lượng thịt gà cao. Bài viết này trình bày các kỹ thuật nuôi gà thả vườn hiệu quả, từ việc chọn giống, thiết kế chuồng trại đến chế độ dinh dưỡng và phòng bệnh.',
          date: '24/03/2025',
          author: 'Lê Thị C'
        },
        {
          id: 4,
          title: 'Kỹ thuật trồng cây ăn quả trong chậu',
          category: 'farming',
          image: require('@/assets/images/blog4.jpg'),
          preview: 'Hướng dẫn cách trồng các loại cây ăn quả trong chậu tại nhà...',
          content: 'Trồng cây ăn quả trong chậu là giải pháp tuyệt vời cho những người sống trong không gian hạn chế như căn hộ chung cư. Bài viết này sẽ hướng dẫn bạn cách chọn loại cây phù hợp, kích thước chậu, loại đất và cách chăm sóc để cây phát triển tốt và cho quả.',
          date: '23/03/2025',
          author: 'Phạm Văn D'
        }
      ]
    }
  },
  computed: {
    filteredAndSearchedBlogs() {
      let result = this.blogs;
      
      // Lọc theo danh mục
      if (this.selectedCategory !== 'all') {
        result = result.filter(blog => blog.category === this.selectedCategory);
      }
      
      // Lọc theo từ khóa tìm kiếm
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase().trim();
        result = result.filter(blog => 
          blog.title.toLowerCase().includes(query) || 
          blog.preview.toLowerCase().includes(query) || 
          blog.content.toLowerCase().includes(query)
        );
      }
      
      return result;
    }
  },
  methods: {
    filterCategory(category) {
      this.selectedCategory = category;
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
.category-box, .calendar-box, .recent-posts {
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

/* Calendar styles */
.calendar-header {
  margin-bottom: 15px;
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.weekday {
  text-align: center;
  font-weight: bold;
  padding: 5px 0;
  font-size: 0.8rem;
}

.day {
  text-align: center;
  padding: 7px 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.day:hover {
  background-color: #e0e0e0;
}

.day.empty {
  background: none;
  cursor: default;
}

.day.has-blog {
  color: #4CAF50;
  font-weight: bold;
}

.day.current {
  background-color: #4CAF50;
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