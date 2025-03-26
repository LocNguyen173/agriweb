<template>
  <div class="faq-container">
    <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
      <div 
        class="faq-question" 
        :class="{ 'active': activeIndex === index }"
        @click="toggleAccordion(index)"
      >
        {{ faq.question }}
        <span class="faq-icon"></span>
      </div>
      <div class="faq-answer" :style="{ height: activeIndex === index ? faq.answerHeight : '0px' }">
        <div class="faq-answer-content" ref="answerContents">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqAccordion',
  data() {
    return {
      activeIndex: 0,
      faqs: [
        {
          question: "Làm thế nào để đặt hàng?",
          answer: "Bạn có thể dễ dàng đặt hàng thông qua website hoặc liên hệ trực tiếp với chúng tôi qua hotline.",
          answerHeight: 'auto'
        },
        {
          question: "Thời gian giao hàng là bao lâu?",
          answer: "Thông thường chúng tôi giao hàng trong vòng 2-3 ngày làm việc tùy theo khu vực.",
          answerHeight: 'auto'
        },
        {
          question: "Chính sách đổi trả như thế nào?",
          answer: "Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên vẹn.",
          answerHeight: 'auto'
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateHeights();
    });
  },
  methods: {
    toggleAccordion(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    calculateHeights() {
      if (this.$refs.answerContents) {
        this.$refs.answerContents.forEach((el, index) => {
          this.faqs[index].answerHeight = el.scrollHeight + 'px';
        });
      }
    }
  }
}
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.faq-question {
  padding: 15px 20px;
  background-color: white;
  color: #2c4f3c;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
}

.faq-question:hover {
  background-color: #f9f9f9;
}

.faq-question.active {
  color: #8bc34a;
}

.faq-icon {
  position: relative;
  width: 20px;
  height: 20px;
}

.faq-icon:before, 
.faq-icon:after {
  content: '';
  position: absolute;
  background-color: #8bc34a;
  transition: all 0.3s;
}

.faq-icon:before {
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
}

.faq-icon:after {
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.faq-question.active .faq-icon:after {
  transform: translateX(-50%) rotate(90deg);
}

.faq-answer {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.faq-answer-content {
  padding: 15px 20px;
  color: #666;
  line-height: 1.6;
  border-top: 1px solid #e0e0e0;
  background-color: #f9f9f9;
}

@media (max-width: 768px) {
  .faq-question {
    padding: 12px 15px;
    font-size: 15px;
  }
  
  .faq-answer-content {
    padding: 12px 15px;
    font-size: 14px;
  }
}
</style>