<template>
  <div 
    v-show="isVisible" 
    class="scroll-to-top" 
    @click="scrollToTop"
  >
    <span class="arrow">&uarr;</span>
  </div>
</template>

<script>
export default {
  name: 'ScrollToTop',
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.toggleVisibility)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.toggleVisibility)
  },
  methods: {
    toggleVisibility() {
      this.isVisible = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #8cc63f; /* Màu xanh lá như trong hình */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.scroll-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.arrow {
  color: white;
  font-size: 24px;
  font-weight: bold;
}
</style>