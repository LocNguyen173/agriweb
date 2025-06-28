<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="admin-dashboard">
    <h1>Dashboard Admin</h1>
    <div class="stat-cards">
      <div class="stat-card product">
        <span class="icon">📦</span>
        <div>
          <div class="stat-title">Sản phẩm</div>
          <div class="stat-value">{{ totalProducts }}</div>
        </div>
      </div>
      <div class="stat-card blog">
        <span class="icon">📝</span>
        <div>
          <div class="stat-title">Bài viết</div>
          <div class="stat-value">{{ totalBlogs }}</div>
        </div>
      </div>
      <div class="stat-card cate">
        <span class="icon">📂</span>
        <div>
          <div class="stat-title">Danh mục SP</div>
          <div class="stat-value">{{ totalProductCategories }}</div>
        </div>
      </div>
      <div class="stat-card cate">
        <span class="icon">📁</span>
        <div>
          <div class="stat-title">Danh mục Blog</div>
          <div class="stat-value">{{ totalBlogCategories }}</div>
        </div>
      </div>
    </div>

    <div class="dashboard-section">
      <h2>Biểu đồ sản phẩm theo giá</h2>
      <canvas id="productChart"></canvas>
    </div>

    <div class="dashboard-section">
      <h2>Sản phẩm mới nhất</h2>
      <div v-if="newestProducts.length && newestProducts[0]" class="latest-product-card">
        <img
          v-if="newestProducts[0].image"
          :src="newestProducts[0].image"
          alt="Ảnh sản phẩm"
          class="latest-product-img"
        />
        <img
          v-else
          src="https://via.placeholder.com/120x80?text=No+Image"
          alt="Không có ảnh"
          class="latest-product-img"
        />
        <div class="latest-product-info">
          <div class="latest-product-title">
            <span class="product-icon">📦</span>
            {{ newestProducts[0].name }}
          </div>
          <div class="latest-product-desc">{{ newestProducts[0].description }}</div>
          <div class="latest-product-meta">
            <span class="latest-product-price">{{ newestProducts[0].price?.toLocaleString() }}đ</span>
            <span v-if="newestProducts[0].category && newestProducts[0].category.name" class="latest-product-category">
              • {{ newestProducts[0].category.name }}
            </span>
          </div>
          <button class="latest-product-btn" @click="goToProduct(newestProducts[0]._id)">Xem chi tiết</button>
        </div>
      </div>
      <div v-else class="latest-product-card placeholder">
        <img src="https://via.placeholder.com/120x80?text=No+Image" class="latest-product-img" />
        <div class="latest-product-info">
          <div class="latest-product-title">Chưa có sản phẩm</div>
          <div class="latest-product-desc">Hãy thêm sản phẩm mới để hiển thị tại đây.</div>
        </div>
      </div>
      
      <div class="product-list-section">
        <h3>Sản phẩm khác</h3>
        <ul class="product-list">
          <li v-for="(p, index) in newestProducts.slice(1)" :key="p._id" class="product-list-item">
            <span class="product-list-number">{{ index + 2 }}</span>
            <div class="product-list-content">
              <div class="product-list-name">{{ p.name }}</div>
              <div class="product-list-price">{{ p.price?.toLocaleString() }}đ</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="dashboard-section">
      <h2>Bài viết mới nhất</h2>
      <div v-if="newestBlogs.length && newestBlogs[0]" class="latest-blog-card">
        <img
          v-if="newestBlogs[0].image"
          :src="newestBlogs[0].image"
          alt="Ảnh bài viết"
          class="latest-blog-img"
        />
        <div class="latest-blog-info">
          <div class="latest-blog-title">
            <span class="blog-icon">📰</span>
            {{ newestBlogs[0].title }}
          </div>
          <div class="latest-blog-desc">{{ newestBlogs[0].description }}</div>
          <div class="latest-blog-meta">
            <span class="latest-blog-date">
              {{ new Date(newestBlogs[0].created_at).toLocaleDateString('vi-VN') }}
            </span>
            <span v-if="newestBlogs[0].category && newestBlogs[0].category.name" class="latest-blog-category">
              • {{ newestBlogs[0].category.name }}
            </span>
          </div>
          <button class="latest-blog-btn" @click="showBlogDetail(newestBlogs[0])">Xem chi tiết</button>
        </div>
      </div>
      <div v-else class="latest-blog-card placeholder">
        <img src="https://via.placeholder.com/120x80?text=No+Image" class="latest-blog-img" />
        <div class="latest-blog-info">
          <div class="latest-blog-title">Chưa có bài viết</div>
          <div class="latest-blog-desc">Hãy thêm bài viết mới để hiển thị tại đây.</div>
        </div>
      </div>
    </div>

    <!-- Blog Detail Modal -->
    <BlogDetail 
      v-if="selectedBlog" 
      :blog="selectedBlog" 
      @close="selectedBlog = null" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import productApi from '@/shared/api/productApi'
import blogApi from '@/shared/api/blogApi'
import productCategoryApi from '@/shared/api/productCategoryApi'
import blogCategoryApi from '@/shared/api/blogCategoryApi'
import BlogDetail from '@/components/blogs/BlogDetail.vue'
import Chart from 'chart.js/auto'

const totalProducts = ref(0)
const totalBlogs = ref(0)
const totalProductCategories = ref(0)
const totalBlogCategories = ref(0)
const newestProducts = ref([])
const newestBlogs = ref([])
const selectedBlog = ref(null)

function showBlogDetail(blog) {
  selectedBlog.value = blog
}

function goToProduct(id) {
  // Thay bằng router push nếu dùng vue-router
  window.open(`/product/${id}`, '_blank')
}

onMounted(async () => {
  // Sản phẩm
  const products = await productApi.getAllProducts()
  totalProducts.value = Array.isArray(products) ? products.length : 0
  newestProducts.value = Array.isArray(products) ? products.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5) : []

  // Bài viết
  const blogs = await blogApi.getAllBlogs()
  totalBlogs.value = Array.isArray(blogs) ? blogs.length : 0
  newestBlogs.value = Array.isArray(blogs) ? blogs.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5) : []

  // Danh mục sản phẩm
  const productCategories = await productCategoryApi.getAllCategories()
  totalProductCategories.value = Array.isArray(productCategories) ? productCategories.length : 0

  // Danh mục blog
  const blogCategories = await blogCategoryApi.getAllCategories()
  totalBlogCategories.value = Array.isArray(blogCategories) ? blogCategories.length : 0

  // Vẽ biểu đồ sản phẩm theo giá
  await nextTick()
  if (products && products.length > 0) {
    const ctx = document.getElementById('productChart')
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: products.slice(0, 5).map(p => p.name),
        datasets: [{
          label: 'Giá sản phẩm',
          data: products.slice(0, 5).map(p => p.price),
          backgroundColor: '#2ecc40'
        }]
      }
    })
  }
})
</script>

<style scoped>
.admin-dashboard {
  padding: 24px;
  background: #fafafa;
  min-height: 100vh;
}
.stat-cards {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}
.stat-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  min-width: 180px;
}
.stat-card .icon {
  font-size: 2rem;
  margin-right: 16px;
}
.stat-title {
  font-size: 16px;
  color: #888;
}
.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #2ecc40;
}
.dashboard-section {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  margin-bottom: 32px;
  padding: 24px;
}
.dashboard-section h2 {
  margin-top: 0;
  color: #2ecc40;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 12px;
  font-size: 18px;
}
.latest-blog-card {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
.latest-blog-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}
.latest-blog-info {
  flex: 1;
}
.latest-blog-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
}
.latest-blog-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}
.latest-blog-date {
  font-size: 12px;
  color: #999;
}
.latest-blog-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 8px 0;
}
.latest-blog-category {
  background: #e1f5fe;
  color: #01579b;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
}
.latest-blog-btn {
  background: #2ecc40;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}
.latest-blog-btn:hover {
  background: #27ae60;
}
.placeholder {
  opacity: 0.6;
}
.latest-product-card {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
.latest-product-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}
.latest-product-info {
  flex: 1;
}
.latest-product-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
}
.latest-product-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}
.latest-product-price {
  font-size: 16px;
  font-weight: bold;
  color: #2ecc40;
}
.latest-product-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 8px 0;
}
.latest-product-category {
  background: #e1f5fe;
  color: #01579b;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
}
.latest-product-btn {
  background: #2ecc40;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}
.latest-product-btn:hover {
  background: #27ae60;
}
.product-list-section {
  margin-top: 24px;
}
.product-list {
  list-style: none;
  padding: 0;
}
.product-list-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.product-list-number {
  font-size: 16px;
  font-weight: bold;
  color: #2ecc40;
  width: 24px;
  text-align: center;
}
.product-list-content {
  flex: 1;
}
.product-list-name {
  font-size: 16px;
  color: #333;
}
.product-list-price {
  font-size: 16px;
  color: #2ecc40;
  font-weight: bold;
}
</style>