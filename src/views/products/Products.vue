<template>
  <div class="products-page">
    <!-- Hero Section -->
    <Hero
      title="Sản Phẩm Nông Nghiệp"
      subtitle="Các sản phẩm chất lượng cao, an toàn và thân thiện với môi trường"
      :backgroundImage="require('@/assets/images/services-banner.jpg')"
      showBreadcrumb
      currentPage="Sản Phẩm"
    />

    <!-- Featured Products Section -->
    <section class="featured-products">
      <div class="container">
        <SectionTitle
          title="Sản Phẩm Mới Nhất"
          subtitle="SẢN PHẨM CHẤT LƯỢNG"
          description="Chúng tôi cung cấp các sản phẩm nông nghiệp chất lượng cao, được chứng nhận và thân thiện với môi trường."
        />
        <ProductSlider :products="featuredProducts" :itemsPerPage="featuredPerPage" />
      </div>
    </section>

    <!-- Categories Section -->
    <section class="product-categories">
      <div class="container">
        <SectionTitle
          title="Danh Mục Sản Phẩm"
          subtitle="KHÁM PHÁ"
          description="Tìm hiểu về các danh mục sản phẩm đa dạng của chúng tôi, phục vụ mọi nhu cầu nông nghiệp của bạn."
        />
        
        <div v-if="isLoadingCategories" class="loading-indicator">
          <p>Đang tải danh mục sản phẩm...</p>
        </div>
        <div v-else-if="productCategories.length === 0" class="no-products">
          <p>Không có danh mục sản phẩm nào.</p>
        </div>
        <div v-else>
          <CategoryGrid 
            :categories="productCategories"
            @navigate="navigateToCategory"
          />
        </div>
      </div>
    </section>

    <!-- Best Selling Products -->
    <section class="best-selling">
      <div class="container">
        <SectionTitle
          title="Sản Phẩm Bán Chạy"
          subtitle="ĐƯỢC YÊU THÍCH"
          description="Những sản phẩm được người dùng tin tưởng và lựa chọn nhiều nhất."
        />
        
        <div v-if="isLoading" class="loading-indicator">
          <p>Đang tải sản phẩm...</p>
        </div>
        <div v-else-if="bestSellingProducts.length === 0" class="no-products">
          <p>Không có sản phẩm bán chạy.</p>
        </div>
        <div v-else>
          <ProductSlider 
            :products="bestSellingProducts" 
            :itemsPerPage="bestSellingPerPage" 
          />
        </div>
      </div>
    </section>

    <!-- Benefit Section -->
    <section class="product-benefits">
      <div class="container">
        <div class="benefits-grid">
          <div v-for="(benefit, index) in productBenefits" :key="index" class="benefit-item">
            <div class="benefit-icon">
              <i :class="benefit.icon"></i>
            </div>
            <div class="benefit-content">
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call To Action -->
    <CallToAction
      title="Cần tư vấn về sản phẩm nông nghiệp?"
      description="Chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn lựa chọn sản phẩm phù hợp. Hãy liên hệ ngay hôm nay."
      primaryButtonText="Liên hệ ngay"
      primaryButtonLink="/contact"
      secondaryButtonText="Xem thêm sản phẩm"
      secondaryButtonLink="/products"
      :backgroundImage="require('@/assets/images/cta-bg.jpg')"
    />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CallToAction from '@/components/CallToAction.vue'
import ProductSlider from '@/components/products/ProductSlider.vue'
import CategoryGrid from '@/components/products/CategoryGrid.vue'
import productApi from '@/shared/api/productApi'
import productCategoryApi from '@/shared/api/productCategoryApi'

export default {
  name: 'ProductsPage',
  components: {
    Hero,
    SectionTitle,
    CallToAction,
    ProductSlider,
    CategoryGrid
  },
  data() {
    return {
      featuredProducts: [],
      featuredPerPage: 4,
      bestSellingProducts: [],
      bestSellingPerPage: 5,
      isLoading: false,
      isLoadingCategories: false,
      productCategories: [],  // Thay đổi từ mảng dữ liệu cứng sang mảng rỗng
      productBenefits: [
        {
          title: 'Giao nhận linh hoạt',
          description: 'Giao nhận sản phẩm tại cửa hàng hoặc theo thỏa thuận với khách hàng',
          icon: 'fas fa-handshake'
        },
        {
          title: 'Hỗ trợ 24/7',
          description: 'Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ',
          icon: 'fas fa-headset'
        },
        {
          title: 'Cam kết chất lượng',
          description: 'Sản phẩm được kiểm định và đảm bảo nguồn gốc rõ ràng',
          icon: 'fas fa-certificate'
        },
        {
          title: 'Tư vấn miễn phí',
          description: 'Hỗ trợ tư vấn kỹ thuật và lựa chọn sản phẩm phù hợp',
          icon: 'fas fa-comments'
        }
      ]
    }
  },
  methods: {
    formatPrice(price) {
      if (typeof price === 'number') {
        return price.toLocaleString('vi-VN') + '₫'
      }
      return price
    },
    navigateToCategory(categoryId) {
      console.log('Navigate to category:', categoryId)
      // Trong thực tế, bạn có thể chuyển hướng đến trang danh mục sản phẩm
      this.$router.push(`/products/category/${categoryId}`)
    },
    handleQuickAddToCart(product) {
      // Xử lý thêm sản phẩm vào giỏ hàng
      console.log('Adding to cart:', product)
      // Hiển thị thông báo hoặc cập nhật số lượng giỏ hàng
    },
    async fetchFavoriteProducts() {
      try {
        this.isLoading = true
        const response = await productApi.getAllProducts({ isFavorite: true });
        if (response && response.length > 0) {
          // Đảm bảo mỗi sản phẩm đều có badge "Bán chạy"
          this.bestSellingProducts = response.map(product => ({
            ...product,
            isFavorite: true // Đảm bảo đã đánh dấu là bán chạy
          }));
        } else {
          this.bestSellingProducts = [];
        }
      } catch (error) {
        console.error('Failed to fetch favorite products:', error)
        this.bestSellingProducts = []
      } finally {
        this.isLoading = false
      }
    },
    async fetchCategories() {
      try {
        this.isLoadingCategories = true
        const categories = await productCategoryApi.getAllCategories()
        
        // Mảng các icon đa dạng cho danh mục
        const categoryIcons = [
          require('@/assets/images/icons/plant.png'),
          require('@/assets/images/icons/harvest.png'),
          require('@/assets/images/icons/water.png'),
          require('@/assets/images/icons/tractor.png'),
        ]
        
        // Gán icon thủ công theo index
        this.productCategories = categories.map((category, index) => {
          // Chọn icon theo thứ tự hoặc lặp lại nếu hết icon
          const iconIndex = index % categoryIcons.length
          
          return {
            _id: category._id,
            name: category.name,
            description: category.description || 'Sản phẩm chất lượng cao từ AgriWeb',
            icon: categoryIcons[iconIndex]
          }
        })
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        // Dữ liệu fallback nếu có lỗi
        this.productCategories = [
          {
            name: 'Hạt giống',
            description: 'Hạt giống chất lượng cao, đảm bảo năng suất và chất lượng',
            icon: require('@/assets/images/icons/plant.png')
          },
          {
            name: 'Phân bón',
            description: 'Phân bón hữu cơ và vô cơ chất lượng cao',
            icon: require('@/assets/images/icons/harvest.png')
          }
        ]
      } finally {
        this.isLoadingCategories = false
      }
    }
  },
  async created() {
    // Lấy sản phẩm mới nhất từ backend
    try {
      const products = await productApi.getAllProducts({ params: { sort: 'created_at' } })
      this.featuredProducts = products.slice(-6).reverse()
    } catch (e) {
      this.featuredProducts = []
    }
    
    // Lấy sản phẩm bán chạy (isFavorite = true)
    await this.fetchFavoriteProducts()
    
    // Lấy danh mục sản phẩm từ backend
    await this.fetchCategories()
  }
}
</script>

<style scoped>
/* Giữ lại phần này */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5px;
}

/* Featured Products Section */
.featured-products {
  padding: 80px 0;
  background-color: #f8f9fa;
}

/* Categories Section */
.product-categories {
  padding: 80px 0;
  background-color: #fff;
}

.product-categories .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Đảm bảo CategoryGrid sẽ chiếm toàn bộ chiều rộng có sẵn */
.product-categories .container > div:not(.loading-indicator):not(.no-products) {
  width: 100%;
}

/* Best Selling Products */
.best-selling {
  padding: 80px 0;
  background-color: #f8f9fa;
}

/* Product Benefits */
.product-benefits {
  padding: 60px 0;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.benefit-icon {
  width: 60px;
  height: 60px;
  background-color: #e9f5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-icon i {
  font-size: 24px;
  color: #8CC63F;
}

.benefit-content h3 {
  color: #2F5435;
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 600;
}

.benefit-content p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

@media (max-width: 992px) {
  .slider-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .slider-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .featured-products,
  .product-categories,
  .best-selling {
    padding: 60px 0;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

/* Thêm loading indicator */
.loading-indicator, .no-products {
  text-align: center;
  padding: 30px 0;
  width: 100%;
  font-size: 18px;
  color: #666;
}

.loading-indicator p, .no-products p {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  display: inline-block;
}
</style>