<template>
  <div class="product-category-details">

    <!-- Category Info Section -->
    <section class="category-info" v-if="category">
      <div class="container">
        <div class="category-header">
          <div class="category-icon">
            <img :src="category.icon" :alt="category.name" v-if="category.icon">
            <i class="fas fa-box" v-else></i>
          </div>
          <div class="category-content">
            <h1 class="category-title">{{ category.name }}</h1>
            <p class="category-description">{{ category.description }}</p>
            <div class="category-stats">
              <span class="product-count">{{ totalProducts }} sản phẩm</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter and Sort Section -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-controls">
          <div class="filter-left">
            <div class="sort-dropdown">
              <label for="sort">Sắp xếp theo:</label>
              <select id="sort" v-model="sortBy" @change="handleSortChange">
                <option value="name">Tên sản phẩm</option>
                <option value="price_asc">Giá: Thấp đến cao</option>
                <option value="price_desc">Giá: Cao đến thấp</option>
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>
            
            <div class="price-filter">
              <label>Khoảng giá:</label>
              <div class="price-inputs">
                <input 
                  type="number" 
                  v-model="priceFilter.min" 
                  placeholder="Từ"
                  @input="handlePriceFilter"
                >
                <span>-</span>
                <input 
                  type="number" 
                  v-model="priceFilter.max" 
                  placeholder="Đến"
                  @input="handlePriceFilter"
                >
                <button @click="applyPriceFilter" class="apply-filter-btn">
                  Áp dụng
                </button>
              </div>
            </div>
          </div>

          <div class="filter-right">
            <div class="view-toggle">
              <button 
                :class="['view-btn', { active: viewMode === 'grid' }]"
                @click="viewMode = 'grid'"
              >
                <i class="fas fa-th"></i>
              </button>
              <button 
                :class="['view-btn', { active: viewMode === 'list' }]"
                @click="viewMode = 'list'"
              >
                <i class="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products-section">
      <div class="container">
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-indicator">
          <div class="spinner"></div>
          <p>Đang tải sản phẩm...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredProducts.length === 0" class="empty-state">
          <i class="fas fa-box-open"></i>
          <h3>Không có sản phẩm nào</h3>
          <p>Hiện tại chưa có sản phẩm nào trong danh mục này.</p>
          <button @click="$router.push('/products')" class="back-btn">
            Xem tất cả sản phẩm
          </button>
        </div>

        <!-- Products Grid/List -->
        <div v-else>
          <div class="products-header">
            <p class="results-count">
              Hiển thị {{ startIndex + 1 }}-{{ endIndex }} của {{ totalProducts }} sản phẩm
            </p>
          </div>

          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" class="products-grid">
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product._id"
              :name="product.name"
              :category="product.category?.name || categoryName"
              :price="formatPrice(product.price)"
              :image="product.image"
              :description="product.description"
              @click="navigateToProduct(product._id)"
            />
          </div>

          <!-- List View -->
          <div v-else class="products-list">
            <div 
              v-for="product in paginatedProducts"
              :key="product._id"
              class="product-list-item"
              @click="navigateToProduct(product._id)"
            >
              <div class="product-image">
                <img :src="product.image" :alt="product.name">
              </div>
              <div class="product-details">
                <div class="product-info">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-description">{{ product.description }}</p>
                  <div class="product-category">{{ product.category?.name || categoryName }}</div>
                </div>
                <div class="product-price">
                  <span class="price">{{ formatPrice(product.price) }}</span>
                  <!-- <button class="add-to-cart-btn" @click.stop="handleAddToCart(product)">
                    <i class="fas fa-shopping-cart"></i>
                    Thêm vào giỏ
                  </button> -->
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="pagination" v-if="totalPages > 1">
            <button 
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
              class="pagination-btn"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <button
              v-for="page in visiblePages"
              :key="page"
              :class="['pagination-btn', { active: page === currentPage }]"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            
            <button 
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
              class="pagination-btn"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Categories -->
    <section class="related-categories" v-if="relatedCategories.length > 0">
      <div class="container">
        <SectionTitle
          title="Danh mục liên quan"
          description="Khám phá thêm các danh mục sản phẩm khác"
        />
        <CategoryGrid 
          :categories="relatedCategories" 
          @navigate="navigateToCategory"
        />
      </div>
    </section>

    <!-- Call To Action -->
    <!-- <CallToAction
      title="Cần tư vấn về sản phẩm?"
      description="Chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn lựa chọn sản phẩm phù hợp nhất."
      primaryButtonText="Liên hệ ngay"
      primaryButtonLink="/contact"
      secondaryButtonText="Xem thêm danh mục"
      secondaryButtonLink="/products"
      :backgroundImage="require('@/assets/images/cta-bg.jpg')"
    /> -->
    
    <!-- Modal Error -->
    <Error 
      :visible="showError" 
      :message="errorMessage" 
      @close="closeError" 
    />
  </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import CategoryGrid from '@/components/products/CategoryGrid.vue'
import Error from '@/components/modal/Error.vue'
import productApi from '@/shared/api/productApi'
import productCategoryApi from '@/shared/api/productCategoryApi'
import { getCategoryIcon } from '@/shared/constants/categoryIcons'

export default {
  name: 'ProductCategoryDetails',
  components: {
    SectionTitle,
    ProductCard,
    CategoryGrid,
    Error
  },
  data() {
    return {
      // Category data
      category: null,
      categoryName: '',
      isCategoryLoading: false,
      
      // Products data
      products: [],
      filteredProducts: [],
      isLoading: false,
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 12,
      
      // Filters and sorting
      sortBy: 'name',
      
      // Error handling
      showError: false,
      errorMessage: '',
      viewMode: 'grid', // 'grid' or 'list'
      priceFilter: {
        min: null,
        max: null
      },
      
      // Related categories
      relatedCategories: [],
      
      // Sample data (will be replaced with API calls)
      sampleProducts: [
        {
          _id: '1',
          name: 'Hạt giống lúa cao sản',
          description: 'Hạt giống lúa chất lượng cao, cho năng suất vượt trội',
          price: 150000,
          image: require('@/assets/images/about-img.jpg'),
          category: { name: 'Hạt giống' }
        },
        {
          _id: '2',
          name: 'Phân bón hữu cơ NPK',
          description: 'Phân bón hữu cơ giúp cây phát triển khỏe mạnh',
          price: 250000,
          image: require('@/assets/images/feature-img.jpg'),
          category: { name: 'Phân bón' }
        },
        {
          _id: '3',
          name: 'Thuốc trừ sâu sinh học',
          description: 'Thuốc bảo vệ thực vật an toàn, thân thiện môi trường',
          price: 180000,
          image: require('@/assets/images/about-img.jpg'),
          category: { name: 'Thuốc BVTV' }
        },
        {
          _id: '4',
          name: 'Máy phun thuốc cầm tay',
          description: 'Máy phun thuốc tiện lợi, dễ sử dụng cho nông dân',
          price: 850000,
          image: require('@/assets/images/feature-img.jpg'),
          category: { name: 'Dụng cụ' }
        }
        // Add more sample products as needed
      ]
    }
  },
  computed: {
    categoryId() {
      return this.$route.params.id
    },
    breadcrumbs() {
      return [
        { text: 'Trang chủ', to: '/' },
        { text: 'Sản phẩm', to: '/products' },
        { text: this.categoryName || 'Danh mục', to: null }
      ]
    },
    totalProducts() {
      return this.filteredProducts.length
    },
    totalPages() {
      return Math.ceil(this.totalProducts / this.itemsPerPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage
    },
    endIndex() {
      return Math.min(this.startIndex + this.itemsPerPage, this.totalProducts)
    },
    paginatedProducts() {
      return this.filteredProducts.slice(this.startIndex, this.endIndex)
    },
    visiblePages() {
      const delta = 2
      const range = []
      const rangeWithDots = []

      for (let i = Math.max(2, this.currentPage - delta);
           i <= Math.min(this.totalPages - 1, this.currentPage + delta);
           i++) {
        range.push(i)
      }

      if (this.currentPage - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (this.currentPage + delta < this.totalPages - 1) {
        rangeWithDots.push('...', this.totalPages)
      } else {
        rangeWithDots.push(this.totalPages)
      }

      return rangeWithDots
    },
    mappedCategory() {
      return {
        ...this.category,
        icon: getCategoryIcon(this.categoryId),
      };
    },
  },
  methods: {
    formatPrice(price) {
      if (typeof price === 'number') {
        return price.toLocaleString('vi-VN') + '₫'
      }
      return price
    },
    
    async fetchCategory() {
      try {
        // Gọi API thực tế để lấy category theo ID
        const category = await productCategoryApi.getCategoryById(this.categoryId)
        
        if (category) {
          this.category = {
            _id: category._id,
            name: category.name,
            description: category.description || 'Sản phẩm chất lượng cao từ AgriWeb',
            icon: getCategoryIcon(category._id || category.id)
          }
          this.categoryName = this.category.name
        } else {
          // Nếu không tìm thấy category, redirect về trang products
          this.showErrorModal('Danh mục không tồn tại')
          this.$router.push('/products')
        }
      } catch (error) {
        this.showErrorModal('Lỗi khi tải thông tin danh mục. Vui lòng thử lại sau.')
        
        // Fallback: hiển thị thông tin mặc định hoặc redirect
        if (error.response && error.response.status === 404) {
          // Category không tồn tại
          this.$router.push('/products')
        } else {
          // Lỗi khác, hiển thị category mặc định
          this.category = {
            _id: this.categoryId,
            name: 'Danh mục sản phẩm',
            description: 'Không thể tải thông tin danh mục. Vui lòng thử lại sau.',
            icon: require('@/assets/images/icons/agriculture/plant.png')
          }
          this.categoryName = this.category.name
        }
      }
    },
    
    async fetchProducts() {
      try {
        this.isLoading = true
        
        // Gọi API thực tế để lấy sản phẩm theo danh mục
        const products = await productApi.getProductsByCategory(this.categoryId)
        
        if (products && products.length > 0) {
          this.products = products.map(product => ({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image || require('@/assets/images/about-img.jpg'), // fallback image
            category: product.category,
            isFavorite: product.isFavorite,
            createdAt: product.created_at,
            updatedAt: product.updated_at
          }))
        } else {
          // Nếu không có sản phẩm nào trong danh mục
          this.products = []
        }
        
        this.filteredProducts = [...this.products]
        this.applySorting()
      } catch (error) {
        this.showErrorModal('Lỗi khi tải danh sách sản phẩm. Vui lòng thử lại sau.')
        
        // Fallback: sử dụng sample data nếu API lỗi
        if (error.response && error.response.status === 404) {
          // Danh mục không có sản phẩm
          this.products = []
          this.filteredProducts = []
        } else {
          // Lỗi khác, sử dụng sample data
          console.warn('Using sample data due to API error')
          this.products = this.sampleProducts
          this.filteredProducts = [...this.products]
          this.applySorting()
        }
      } finally {
        this.isLoading = false
      }
    },
    
    async fetchRelatedCategories() {
      try {
        // Lấy tất cả categories và loại trừ category hiện tại
        const allCategories = await productCategoryApi.getAllCategories()
        
        // Lọc ra các category khác (không phải category hiện tại)
        const filteredCategories = allCategories.filter(cat => cat._id !== this.categoryId)
        
        // Chọn tối đa 4 categories để hiển thị và gán icon nhất quán
        this.relatedCategories = filteredCategories.slice(0, 4).map(category => ({
          _id: category._id,
          name: category.name,
          description: category.description || 'Sản phẩm chất lượng cao từ AgriWeb',
          icon: getCategoryIcon(category._id || category.id)
        }))
      } catch (error) {
        this.showErrorModal('Lỗi khi tải danh mục liên quan. Vui lòng thử lại sau.')
        // Fallback: hiển thị categories mặc định
        this.relatedCategories = [
          {
            _id: '2',
            name: 'Phân bón',
            description: 'Phân bón hữu cơ và vô cơ chất lượng cao',
            icon: require('@/assets/images/icons/agriculture/harvest.png')
          },
          {
            _id: '3',
            name: 'Thuốc bảo vệ thực vật',
            description: 'Các sản phẩm bảo vệ cây trồng an toàn',
            icon: require('@/assets/images/icons/agriculture/insect.png')
          }
        ]
      }
    },
    
    handleSortChange() {
      this.applySorting()
      this.currentPage = 1
    },
    
    applySorting() {
      switch (this.sortBy) {
        case 'name':
          this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'price_asc':
          this.filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          this.filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'newest':
          this.filteredProducts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
          break
        case 'oldest':
          this.filteredProducts.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
          break
      }
    },
    
    handlePriceFilter() {
      // Real-time filtering as user types
      this.applyPriceFilter()
    },
    
    applyPriceFilter() {
      this.filteredProducts = this.products.filter(product => {
        const price = product.price
        const min = this.priceFilter.min ? parseFloat(this.priceFilter.min) : 0
        const max = this.priceFilter.max ? parseFloat(this.priceFilter.max) : Infinity
        
        return price >= min && price <= max
      })
      
      this.applySorting()
      this.currentPage = 1
    },
    
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.scrollToTop()
      }
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    
    navigateToProduct(productId) {
      // TODO: Navigate to product detail page
      console.log('Navigate to product:', productId)
      // this.$router.push(`/products/${productId}`)
    },
    
    navigateToCategory(categoryId) {
      this.$router.push(`/products/category/${categoryId}`)
    },
    
    handleAddToCart(product) {
      // TODO: Implement add to cart functionality
      console.log('Adding to cart:', product)
    },
    
    showErrorModal(message) {
      this.errorMessage = message
      this.showError = true
    },
    
    closeError() {
      this.showError = false
      this.errorMessage = ''
    },
  },
  
  async created() {
    await this.fetchCategory()
    await this.fetchProducts()
    await this.fetchRelatedCategories()
  },
  
  watch: {
    '$route'() {
      // Reset states when route changes
      this.category = null
      this.categoryName = ''
      this.products = []
      this.filteredProducts = []
      this.currentPage = 1
      
      // Reload data when route changes
      this.fetchCategory()
      this.fetchProducts()
      this.fetchRelatedCategories()
    }
  }
}
</script>

<style scoped>
/* Global Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Category Info Section */
.category-info {
  padding: 40px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  margin-bottom: 20px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 25px;
  max-width: 800px;
  margin: 100px auto 0;
}

.category-icon {
  width: 80px;
  height: 80px;
  background: #8CC63F;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(140, 198, 63, 0.3);
  flex-shrink: 0;
}

.category-icon img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.category-icon i {
  font-size: 50px;
  color: white;
}

.category-content {
  flex: 1;
}

.category-title {
  font-size: 28px;
  color: #2F5435;
  margin-bottom: 12px;
  font-weight: 700;
}

.category-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.category-stats {
  display: flex;
  gap: 15px;
}

.product-count {
  background: #8CC63F;
  color: white;
  padding: 6px 14px;
  border-radius: 15px;
  font-weight: 600;
  font-size: 14px;
}

/* Filter Section */
.filter-section {
  padding: 20px 0;
  background: white;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 25px;
  flex-wrap: wrap;
}

.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-dropdown label {
  font-weight: 600;
  color: #2F5435;
}

.sort-dropdown select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.price-filter {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-filter label {
  font-weight: 600;
  color: #2F5435;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-inputs input {
  width: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  text-align: center;
}

.apply-filter-btn {
  background: #8CC63F;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.3s ease;
}

.apply-filter-btn:hover {
  background: #6fae2b;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.view-toggle {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.view-btn {
  background: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn.active {
  background: #8CC63F;
  color: white;
}

.view-btn:hover:not(.active) {
  background: #f8f9fa;
}

/* Products Section */
.products-section {
  padding: 30px 0 50px 0;
}

.loading-indicator {
  text-align: center;
  padding: 40px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #8CC63F;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 50px 0;
}

.empty-state i {
  font-size: 60px;
  color: #ddd;
  margin-bottom: 15px;
}

.empty-state h3 {
  font-size: 20px;
  color: #2F5435;
  margin-bottom: 12px;
}

.empty-state p {
  color: #666;
  margin-bottom: 25px;
}

.back-btn {
  background: #8CC63F;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #6fae2b;
}

.products-header {
  margin-bottom: 30px;
}

.results-count {
  color: #666;
  font-size: 14px;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
}

/* Products List */
.products-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-list-item {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.product-list-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.product-list-item .product-image {
  width: 180px;
  height: 130px;
  flex-shrink: 0;
}

.product-list-item .product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex: 1;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-info {
  flex: 1;
}

.product-info .product-name {
  font-size: 16px;
  color: #2F5435;
  margin-bottom: 8px;
  font-weight: 600;
}

.product-info .product-description {
  color: #666;
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 8px;
}

.product-info .product-category {
  color: #8CC63F;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.product-price {
  text-align: right;
}

.product-price .price {
  font-size: 18px;
  color: #2F5435;
  font-weight: 700;
  display: block;
  margin-bottom: 12px;
}

.add-to-cart-btn {
  background: #8CC63F;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.add-to-cart-btn:hover {
  background: #6fae2b;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 40px;
}

.pagination-btn {
  background: white;
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #8CC63F;
}

.pagination-btn.active {
  background: #8CC63F;
  color: white;
  border-color: #8CC63F;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Related Categories */
.related-categories {
  padding: 50px 0;
  background: #f8f9fa;
  margin-top: 30px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  
  .container {
    padding: 0 15px;
  }
}

@media (max-width: 992px) {
  .category-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .category-title {
    font-size: 24px;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .filter-left {
    justify-content: center;
    gap: 20px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .product-list-item {
    flex-direction: column;
  }
  
  .product-list-item .product-image {
    width: 100%;
    height: 180px;
  }
  
  .product-details {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    padding: 15px;
  }
  
  .product-price {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .category-info {
    padding: 30px 0;
  }
  
  .category-icon {
    width: 70px;
    height: 70px;
  }
  
  .category-icon img,
  .category-icon i {
    width: 40px;
    height: 40px;
    font-size: 40px;
  }
  
  .category-title {
    font-size: 22px;
  }
  
  .filter-left {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .price-inputs {
    justify-content: center;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }
  
  .products-section {
    padding: 25px 0 40px 0;
  }
  
  .filter-section {
    padding: 15px 0;
  }
  
  .container {
    padding: 0 12px;
  }
}

@media (max-width: 576px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination-btn {
    padding: 8px 12px;
    min-width: 40px;
  }
  
  .category-header {
    gap: 15px;
  }
  
  .category-title {
    font-size: 20px;
  }
  
  .category-description {
    font-size: 14px;
  }
  
  .filter-controls {
    gap: 12px;
  }
}
</style>
