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
          title="Sản Phẩm Nổi Bật"
          subtitle="SẢN PHẨM CHẤT LƯỢNG"
          description="Chúng tôi cung cấp các sản phẩm nông nghiệp chất lượng cao, được chứng nhận và thân thiện với môi trường."
        />
        
        <ProductGrid 
          :products="featuredProducts"
          @view-product="handleViewProduct"
          @add-to-wishlist="handleAddToWishlist"
          @add-to-cart="handleAddToCart"
        />
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
        
        <CategoryGrid 
          :categories="productCategories"
          @navigate="navigateToCategory"
        />
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
        
        <div class="bestseller-slider">
          <div v-for="(product, index) in bestSellingProducts" :key="index" class="bestseller-item">
            <div class="bestseller-image">
              <img :src="product.image" :alt="product.name">
              <div class="bestseller-badge">Bán chạy</div>
            </div>
            <div class="bestseller-info">
              <h3>{{ product.name }}</h3>
              <div class="bestseller-price">
                <span class="current-price">{{ product.price }}</span>
                <span v-if="product.oldPrice" class="old-price">{{ product.oldPrice }}</span>
              </div>
              <button class="add-to-cart-btn" @click="handleQuickAddToCart(product)">Thêm vào giỏ hàng</button>
            </div>
          </div>
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
import ProductGrid from '@/components/products/ProductGrid.vue'
import CategoryGrid from '@/components/products/CategoryGrid.vue'

export default {
  name: 'ProductsPage',
  components: {
    Hero,
    SectionTitle,
    CallToAction,
    ProductGrid,
    CategoryGrid
  },
  data() {
    return {
      featuredProducts: [
        {
          name: 'MK54',
          category: 'Thuốc trừ sâu',
          price: '250.000₫',
          rating: 5,
          reviewCount: 18,
          image: require('@/assets/images/products/product1.jpg'),
          discount: 15
        },
        {
          name: 'MK-BEAMUSA',
          category: 'Thuốc trừ bệnh',
          price: '180.000₫',
          oldPrice: '200.000₫',
          rating: 4,
          reviewCount: 12,
          image: require('@/assets/images/products/product2.jpg')
        },
        {
          name: 'VUA SÂU LÔNG',
          category: 'Thuốc trừ sâu',
          price: '320.000₫',
          rating: 4,
          reviewCount: 7,
          image: require('@/assets/images/products/product3.jpg')
        },
        {
          name: 'CỎ XETANK',
          category: 'Thuốc diệt cỏ',
          price: '450.000₫',
          oldPrice: '520.000₫',
          rating: 5,
          reviewCount: 15,
          image: require('@/assets/images/products/product4.jpg'),
          discount: 10
        }
      ],
      productCategories: [
        {
          name: 'Hạt giống',
          description: 'Hạt giống chất lượng cao, đảm bảo năng suất và chất lượng',
          icon: require('@/assets/images/icons/plant.png')
        },
        {
          name: 'Phân bón',
          description: 'Phân bón hữu cơ và vô cơ chất lượng cao',
          icon: require('@/assets/images/icons/harvest.png')
        },
        {
          name: 'Thuốc BVTV',
          description: 'Thuốc bảo vệ thực vật an toàn và hiệu quả',
          icon: require('@/assets/images/icons/insect.png')
        },
        {
          name: 'Dụng cụ nông nghiệp',
          description: 'Dụng cụ và thiết bị nông nghiệp chất lượng cao',
          icon: require('@/assets/images/icons/tractor.png')
        }
      ],
      bestSellingProducts: [ 
        {
          name: 'SIÊU TO CỦ',
          price: '45.000₫',
          oldPrice: '60.000₫',
          image: require('@/assets/images/products/product5.jpg')
        },
        {
          name: 'CYRUS 250EC',
          price: '120.000₫',
          oldPrice: '150.000₫',
          image: require('@/assets/images/products/product9.jpg')
        },
        {
          name: 'PHÂN BÓN HỮU CƠ WADA',
          price: '85.000₫',
          oldPrice: null,
          image: require('@/assets/images/products/product6.jpg')
        },
        {
          name: 'KASU NHẬT',
          price: '220.000₫',
          oldPrice: '280.000₫',
          image: require('@/assets/images/products/product7.jpg')
        },
        {
          name: 'MISTOP EXTRA 390',
          price: '350.000₫',
          oldPrice: null,
          image: require('@/assets/images/products/product8.jpg')
        }
      ],
      productBenefits: [
        {
          title: 'Miễn phí vận chuyển',
          description: 'Miễn phí vận chuyển cho đơn hàng trên 500.000₫',
          icon: 'fas fa-truck'
        },
        {
          title: 'Hỗ trợ 24/7',
          description: 'Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ',
          icon: 'fas fa-headset'
        },
        {
          title: 'Đổi trả dễ dàng',
          description: 'Chính sách đổi trả trong vòng 15 ngày',
          icon: 'fas fa-sync-alt'
        },
        {
          title: 'Thanh toán an toàn',
          description: 'Nhiều phương thức thanh toán an toàn và bảo mật',
          icon: 'fas fa-shield-alt'
        }
      ]
    }
  },
  methods: {
    handleViewProduct(product) {
      console.log('View product:', product.name)
      // Trong thực tế, bạn có thể chuyển hướng đến trang chi tiết sản phẩm
      // this.$router.push(`/products/${product.id}`)
    },
    handleAddToWishlist(product) {
      console.log('Add to wishlist:', product.name)
      // Trong thực tế, bạn sẽ thêm sản phẩm vào danh sách yêu thích
    },
    handleAddToCart(product) {
      console.log('Add to cart:', product.name)
      // Trong thực tế, bạn sẽ thêm sản phẩm vào giỏ hàng
    },
    handleQuickAddToCart(product) {
      console.log('Quick add to cart:', product.name)
      // Trong thực tế, bạn sẽ thêm sản phẩm vào giỏ hàng
    },
    navigateToCategory(categoryId) {
      console.log('Navigate to category:', categoryId)
      // Trong thực tế, bạn có thể chuyển hướng đến trang danh mục sản phẩm
      // this.$router.push(`/products/category/${categoryId}`)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
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

/* Best Selling Products */
.best-selling {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.bestseller-slider {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 50px;
  overflow-x: auto;
  padding-bottom: 20px;
  scrollbar-width: thin;
  scrollbar-color: #8CC63F #f0f0f0;
}

.bestseller-slider::-webkit-scrollbar {
  height: 8px;
}

.bestseller-slider::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.bestseller-slider::-webkit-scrollbar-thumb {
  background-color: #8CC63F;
  border-radius: 4px;
}

.bestseller-item {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.bestseller-item:hover {
  transform: translateY(-10px);
}

.bestseller-image {
  position: relative;
  height: 200px;
}

.bestseller-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bestseller-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #8CC63F;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
}

.bestseller-info {
  padding: 20px;
}

.bestseller-info h3 {
  color: #2F5435;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.bestseller-item:hover h3 {
  color: #8CC63F;
}

.bestseller-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.current-price {
  color: #2F5435;
  font-size: 18px;
  font-weight: 700;
}

.old-price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
}

.add-to-cart-btn {
  width: 100%;
  background-color: #2F5435;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #8CC63F;
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
</style> 