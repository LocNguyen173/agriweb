<template>
  <div class="admin-blog">
    <h1>Quản lý bài viết</h1>
    
    <!-- Form thêm/sửa bài viết -->
    <div class="blog-form">
      <h2>{{ isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới' }}</h2>
      <form @submit.prevent="isEdit ? updateBlog() : createBlog()">
        <div class="form-row">
          <input v-model="form.title" placeholder="Tiêu đề bài viết" required class="input" />
          <input v-model="form.image" placeholder="Link ảnh (hoặc upload)" class="input" />
        </div>
        <div class="form-row">
          <textarea v-model="form.description" placeholder="Mô tả ngắn" required class="input textarea"></textarea>
          <select v-model="form.category" required class="input">
            <option disabled value="">Chọn danh mục</option>
            <!-- Render danh sách category (loại blog) -->
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <div class="form-row">
          <textarea v-model="form.content" placeholder="Nội dung bài viết" required class="input textarea"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn primary">
            <span v-if="isEdit">💾</span>
            <span v-else>➕</span>
            {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
          </button>
          <button v-if="isEdit" type="button" @click="cancelEdit" class="btn danger">Hủy</button>
        </div>
      </form>
    </div>

    <!-- Danh sách bài viết -->
    <div class="blog-list">
      <h2>Danh sách bài viết</h2>
      <table class="modern-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Ảnh</th>
            <th>Danh mục</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <!-- Render danh sách bài viết -->
          <tr v-for="blog in blogs" :key="blog._id" class="table-row">
            <td>{{ blog.title }}</td>
            <td>
              <div class="img-thumb">
                <img :src="blog.image" alt="" />
              </div>
            </td>
            <td>
              <span class="category-badge">{{ getCategoryName(blog.category) }}</span>
            </td>
            <td>{{ blog.description }}</td>
            <td>{{ formatDate(blog.created_at) }}</td>
            <td>
              <button @click="editBlog(blog)" class="btn icon edit" title="Sửa">
                ✏️
              </button>
              <button @click="deleteBlog(blog._id)" class="btn icon delete" title="Xóa">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Import ref để khai báo reactive state
import { ref } from 'vue'

// Dữ liệu giả cho danh mục bài viết (FAKE DATA)
const categories = ref([
  { _id: 'cat1', name: 'Kỹ thuật trồng trọt' },
  { _id: 'cat2', name: 'Chia sẻ kinh nghiệm' },
  { _id: 'cat3', name: 'Tin tức nông nghiệp' }
])

// Dữ liệu giả cho danh sách bài viết (FAKE DATA)
const blogs = ref([
  {
    _id: 'b1',
    title: 'Cách trồng rau sạch tại nhà',
    image: 'https://via.placeholder.com/50x50?text=Blog1',
    description: 'Hướng dẫn chi tiết các bước trồng rau sạch tại nhà.',
    content: 'Nội dung chi tiết về cách trồng rau sạch...',
    category: 'cat1',
    created_at: '2024-06-01T10:00:00Z'
  },
  {
    _id: 'b2',
    title: 'Bí quyết chăm sóc cây ăn quả',
    image: 'https://via.placeholder.com/50x50?text=Blog2',
    description: 'Những lưu ý quan trọng khi chăm sóc cây ăn quả.',
    content: 'Nội dung chi tiết về chăm sóc cây ăn quả...',
    category: 'cat2',
    created_at: '2024-06-10T14:30:00Z'
  },
  {
    _id: 'b3',
    title: 'Xu hướng nông nghiệp 2025',
    image: 'https://via.placeholder.com/50x50?text=Blog3',
    description: 'Cập nhật các xu hướng mới nhất trong lĩnh vực nông nghiệp.',
    content: 'Nội dung chi tiết về xu hướng nông nghiệp...',
    category: 'cat3',
    created_at: '2024-06-15T08:15:00Z'
  }
])
// Kết thúc FAKE DATA

// State cho form và chế độ sửa
const form = ref({
  title: '',
  image: '',
  description: '',
  content: '',
  category: ''
})
const isEdit = ref(false)
let editingId = null

// Lấy tên danh mục từ id (cho fake data)
function getCategoryName(catId) {
  const cat = categories.value.find(c => c._id === catId)
  return cat ? cat.name : ''
}

// Hàm định dạng ngày cho bảng
function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// Tạo bài viết mới (FAKE)
function createBlog() {
  const newBlog = {
    ...form.value,
    _id: Date.now().toString(),
    created_at: new Date().toISOString()
  }
  blogs.value.push(newBlog)
  resetForm()
}

// Cập nhật bài viết (FAKE)
function updateBlog() {
  const idx = blogs.value.findIndex(b => b._id === editingId)
  if (idx !== -1) {
    blogs.value[idx] = { ...form.value, _id: editingId, created_at: blogs.value[idx].created_at }
  }
  resetForm()
  isEdit.value = false
  editingId = null
}

// Xóa bài viết (FAKE)
function deleteBlog(id) {
  blogs.value = blogs.value.filter(b => b._id !== id)
  if (isEdit.value && editingId === id) {
    cancelEdit()
  }
}

// Đổ dữ liệu vào form để sửa
function editBlog(blog) {
  form.value = { ...blog }
  isEdit.value = true
  editingId = blog._id
}

// Hủy chế độ sửa
function cancelEdit() {
  resetForm()
  isEdit.value = false
  editingId = null
}

// Reset form
function resetForm() {
  form.value = {
    title: '',
    image: '',
    description: '',
    content: '',
    category: ''
  }
}
</script>

<style scoped>
.admin-blog {
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  padding: 32px 0;
  background: #f8fafc;
  min-height: 100vh;
}
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 32px;
  letter-spacing: 1px;
  color: #22223b;
  text-shadow: 0 2px 8px #e0e0e0;
}
.blog-form {
  margin-bottom: 40px;
  padding: 24px 32px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(60,72,88,0.08);
  transition: box-shadow 0.3s;
  border: none;
  animation: fadeInDown 0.7s;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
.blog-form h2 {
  font-size: 1.3rem;
  margin-bottom: 18px;
  color: #3a3a3a;
  font-weight: 600;
}
.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 14px;
}
.input {
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: #f6f7fb;
  transition: border 0.2s, box-shadow 0.2s;
  outline: none;
}
.input:focus {
  border: 1.5px solid #4f8cff;
  box-shadow: 0 0 0 2px #e3f0ff;
  background: #fff;
}
.textarea {
  min-height: 44px;
  resize: vertical;
}
.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.btn {
  padding: 8px 18px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  box-shadow: 0 2px 8px 0 rgba(60,72,88,0.06);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn.primary {
  background: linear-gradient(90deg, #4f8cff 60%, #38b6ff 100%);
  color: #fff;
}
.btn.primary:hover {
  background: linear-gradient(90deg, #38b6ff 60%, #4f8cff 100%);
  transform: translateY(-2px) scale(1.04);
}
.btn.danger {
  background: #fff0f0;
  color: #e74c3c;
  border: 1px solid #ffd6d6;
}
.btn.danger:hover {
  background: #ffeaea;
  transform: scale(1.03);
}
.btn.icon {
  padding: 7px 12px;
  font-size: 1.1rem;
  background: #f6f7fb;
  border: 1px solid #e0e0e0;
  color: #4f8cff;
  margin-right: 4px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.btn.icon.edit:hover {
  background: #e3f0ff;
  color: #2563eb;
  box-shadow: 0 2px 8px #e3f0ff;
}
.btn.icon.delete {
  color: #e74c3c;
}
.btn.icon.delete:hover {
  background: #ffeaea;
  color: #c0392b;
  box-shadow: 0 2px 8px #ffeaea;
}
.blog-list {
  animation: fadeInUp 0.7s;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.blog-list h2 {
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #3a3a3a;
  font-weight: 600;
}
.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 24px 0 rgba(60,72,88,0.08);
}
.modern-table th, .modern-table td {
  padding: 14px 12px;
  text-align: left;
  font-size: 1rem;
}
.modern-table th {
  background: #f6f7fb;
  color: #4f8cff;
  font-weight: 700;
  border-bottom: 2px solid #e0e0e0;
}
.modern-table tr.table-row {
  transition: background 0.18s;
}
.modern-table tr.table-row:hover {
  background: #e3f0ff;
  box-shadow: 0 2px 12px #e3f0ff;
}
.modern-table td {
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}
.img-thumb {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px #e3f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f7fb;
  transition: transform 0.2s;
}
.img-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.img-thumb:hover img {
  transform: scale(1.15) rotate(-3deg);
}
.category-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  background: linear-gradient(90deg, #e3f0ff 60%, #f6f7fb 100%);
  color: #2563eb;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 1px 4px #e3f0ff;
  transition: background 0.2s, color 0.2s;
}
@media (max-width: 900px) {
  .admin-blog {
    padding: 12px 0;
  }
  .blog-form, .modern-table {
    padding: 12px;
  }
  .form-row {
    flex-direction: column;
    gap: 8px;
  }
  .modern-table th, .modern-table td {
    padding: 8px 6px;
    font-size: 0.95rem;
  }
}
</style>