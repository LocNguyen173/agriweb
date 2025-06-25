<template>
  <div v-if="visible" class="image-modal" @click.self="$emit('close')">
    <img :src="imageUrl" class="modal-img" />
    <button class="close-btn" @click="$emit('close')">×</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  visible: Boolean,
  imageUrl: String
})
defineEmits(['close'])
</script>

<style scoped>
.image-modal {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background: rgba(30, 34, 50, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.modal-img {
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 14px;
  box-shadow: 0 8px 32px #0008;
  background: #fff;
  animation: popIn 0.2s;
}
@keyframes popIn {
  from { transform: scale(0.8);}
  to { transform: scale(1);}
}
.close-btn {
  position: absolute;
  top: 32px;
  right: 48px;
  font-size: 2.5rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10001;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #ffd600;
}
</style>