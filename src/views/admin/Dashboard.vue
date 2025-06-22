<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="admin-dashboard">
    <h1>Dashboard Admin</h1>
    <div class="dashboard-section">
      <h2>Sản phẩm</h2>
      <ul>
        <li>
          Tổng số sản phẩm: <b>{{ totalProducts }}</b>
        </li>
        <li>
          Sản phẩm mới nhất: 
          <b v-if="newestProduct">{{ newestProduct.name }}</b>
          <b v-else>Không có dữ liệu</b>
        </li>
        <li>
          Sản phẩm giá cao nhất: 
          <b v-if="highestPriceProduct">{{ highestPriceProduct.name }} - {{ highestPriceProduct.price?.toLocaleString() }}đ</b>
          <b v-else>Không có dữ liệu</b>
        </li>
      </ul>
    </div>
    <div class="dashboard-section">
      <h2>Bài viết</h2>
      <ul>
        <li>
          Tổng số bài viết: <b>{{ totalBlogs }}</b>
        </li>
        <li>
          Bài viết mới nhất: 
          <b v-if="newestBlog">{{ newestBlog.title }}</b>
          <b v-else>Không có dữ liệu</b>
        </li>
        <!-- <li>
          Bài viết nổi bật: 
          <b v-if="featuredBlog">{{ featuredBlog.title }}</b>
          <b v-else>Không có dữ liệu</b>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import productApi from '@/shared/api/productApi'
import blogApi from '@/shared/api/blogApi'

// Sản phẩm
const totalProducts = ref(0)
const newestProduct = ref(null)
const highestPriceProduct = ref(null)

// Bài viết
const totalBlogs = ref(0)
const newestBlog = ref(null)
const featuredBlog = ref(null)


onMounted(async () => {
    // Tổng số sản phẩm
  try {
    const products = await productApi.getAllProducts()
    totalProducts.value = Array.isArray(products) ? products.length : 0

    // Sản phẩm mới nhất
    if (Array.isArray(products) && products.length > 0) {
      // Sắp xếp giảm dần theo created_at và lấy sản phẩm đầu tiên
      newestProduct.value = products.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
    }
    // Sản phẩm giá cao nhất
    if (Array.isArray(products) && products.length > 0) {
      highestPriceProduct.value = products.reduce((max, p) => p.price > (max.price || 0) ? p : max, {})
    }
  } catch {
    console.error('Không thể lấy dữ liệu sản phẩm')
  }

  // Tổng số bài viết
   try {
    const blogs = await blogApi.getAllBlogs()
    totalBlogs.value = Array.isArray(blogs) ? blogs.length : 0
    if (Array.isArray(blogs) && blogs.length > 0) {
      // Sắp xếp giảm dần theo created_at và lấy bài đầu tiên
      newestBlog.value = blogs.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
      featuredBlog.value = blogs[0]
    }
  } catch {
    console.error('Không thể lấy dữ liệu bài viết')
  }

  // Bài viết nổi bật (ví dụ: bài đầu tiên)
  // try {
  //   const blogs = await blogApi.getAllBlogs()
  //   if (Array.isArray(blogs) && blogs.length > 0) {
  //     featuredBlog.value = blogs[0]
  //   }
  // } catch {
  //   console.error('Không thể lấy dữ liệu bài viết nổi bật')
  // }
})
</script>

<style scoped>
.admin-dashboard {
  padding: 24px;
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
</style>