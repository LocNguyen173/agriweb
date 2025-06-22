<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="admin-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from './AdminSidebar.vue'
</script>

<style scoped>
.admin-layout {
  display: flex;
}

.admin-content {
  flex: 1;
  background: #f8f8f8;
  padding: 32px;
  margin-left: 240px; /* Phải bằng chiều rộng của sidebar */
  min-height: 100vh;
}
</style>