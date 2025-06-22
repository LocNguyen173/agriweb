<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content warning">
      <div class="modal-header">
        <span class="modal-title">Cảnh báo</span>
        <button class="modal-close" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <slot :message="message">
          {{ message }}
        </slot>
      </div>
      <div class="modal-footer">
        <button
          v-if="showOk"
          class="modal-ok"
          @click="close"
        >OK</button>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  visible: { type: Boolean, default: false },
  message: { type: String, default: 'Có điều gì đó cần chú ý!' },
  showOk: { type: Boolean, default: true } // Thêm prop này
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 8px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  overflow: hidden;
}
.modal-content.warning {
  border-left: 6px solid #ff9800;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fffbe6;
}
.modal-title {
  font-size: 1.2em;
  color: #ff9800;
}
.modal-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
.modal-body {
  padding: 16px;
  color: #333;
}
.modal-footer {
  padding: 12px 16px;
  text-align: right;
  background: #fffbe6;
}
.modal-ok {
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.modal-ok:hover {
  background: #e68900;
}
</style>