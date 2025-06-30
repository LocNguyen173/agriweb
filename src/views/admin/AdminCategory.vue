<template>
  <div class="admin-category">
    <h1>Quản lý danh mục</h1>
    
    <!-- Form thêm/sửa danh mục -->
    <div class="category-form">
      <h2>{{ isEdit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới' }}</h2>
      <form @submit.prevent="isEdit ? updateCategory() : createCategory()">
        <div class="form-row">
          <input v-model="form.name" placeholder="Tên danh mục" required class="input" />
          <input v-model="form.description" placeholder="Mô tả" class="input" />
          <select v-model="form.type" required class="input" :disabled="isEdit">
            <option disabled value="">Chọn loại danh mục</option>
            <option value="product">Sản phẩm</option>
            <option value="blog">Bài viết</option>
          </select>
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

    <!-- Danh sách danh mục -->
    <div class="category-list">
      <h2>Danh sách danh mục</h2>
      <table class="modern-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Loại</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <!-- TODO: Render danh sách danh mục -->
          <tr v-for="category in categories" :key="category._id" class="table-row">
            <td>{{ category.name }}</td>
            <td>{{ category.description }}</td>
            <td>
              <span class="category-badge">
                {{ category.type === 'product' ? 'Sản phẩm' : 'Bài viết' }}
              </span>
            </td>
            <td>{{ formatDate(category.created_at) }}</td>
            <td>
              <button @click="editCategory(category)" class="btn icon edit" title="Sửa">
                ✏️
              </button>
              <button @click="deleteCategory(category._id)" class="btn icon delete" title="Xóa">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal cảnh báo khi xóa -->
    <Warning
      :visible="showDeleteModal"
      :message="deleteMessage"
      :showOk="false"
      @close="showDeleteModal = false"
    >
      <template #default>
        <div>
          <p>
            <b>Lưu ý:</b> Sau khi xóa danh mục, bạn cần tự điều chỉnh lại danh mục cho các sản phẩm hoặc bài viết liên quan.<br>
            Bạn có chắc chắn muốn xóa danh mục này không?
          </p>
          <div style="margin-top: 18px; text-align: right;">
            <button class="btn danger" @click="showDeleteModal = false">Hủy</button>
            <button class="btn primary" style="margin-left: 10px;" @click="confirmDeleteCategory">Xóa</button>
          </div>
        </div>
      </template>
    </Warning>

    <!-- Modal Error -->
    <Error 
      :visible="showError" 
      :message="errorMessage" 
      @close="closeError" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import blogCategoryApi from '@/shared/api/blogCategoryApi'
import productCategoryApi from '@/shared/api/productCategoryApi'
import Warning from '@/components/modal/Warning.vue'
import Error from '@/components/modal/Error.vue'

const categories = ref([])
const form = ref({
  name: '',
  description: '',
  type: ''
})
const isEdit = ref(false)
const editId = ref(null)

// Modal xóa
const showDeleteModal = ref(false)
const deleteId = ref(null)
const deleteMessage = ref('')

// State cho modal error
const showError = ref(false)
const errorMessage = ref('')

// Helper functions cho modal error
function showErrorModal(message) {
  errorMessage.value = message
  showError.value = true
}

function closeError() {
  showError.value = false
  errorMessage.value = ''
}

// Load tất cả danh mục (blog + product)
const loadCategories = async () => {
  try {
    const [blogRes, productRes] = await Promise.all([
      blogCategoryApi.getAllCategories(),
      productCategoryApi.getAllCategories()
    ])
    // Gộp 2 loại danh mục
    categories.value = [
      ...productRes,
      ...blogRes
    ]
  } catch (err) {
    showErrorModal('Lỗi khi tải danh mục. Vui lòng thử lại sau.')
  }
}

onMounted(() => {
  loadCategories()
})

// Tạo mới danh mục
const createCategory = async () => {
  try {
    if (form.value.type === 'product') {
      await productCategoryApi.createCategory({
        name: form.value.name,
        description: form.value.description
      })
    } else if (form.value.type === 'blog') {
      await blogCategoryApi.createCategory({
        name: form.value.name,
        description: form.value.description
      })
    }
    await loadCategories()
    form.value = { name: '', description: '', type: '' }
  } catch (err) {
    showErrorModal('Lỗi khi tạo danh mục. Vui lòng thử lại sau.')
  }
}

// Sửa danh mục
const editCategory = (category) => {
  isEdit.value = true
  editId.value = category._id
  form.value = {
    name: category.name,
    description: category.description,
    type: category.type
  }
}

// Cập nhật danh mục
const updateCategory = async () => {
  try {
    if (!editId.value) return
    if (form.value.type === 'product') {
      await productCategoryApi.updateCategory(editId.value, {
        name: form.value.name,
        description: form.value.description
      })
    } else if (form.value.type === 'blog') {
      await blogCategoryApi.updateCategory(editId.value, {
        name: form.value.name,
        description: form.value.description
      })
    }
    await loadCategories()
    cancelEdit()
  } catch (err) {
    showErrorModal('Lỗi khi cập nhật danh mục. Vui lòng thử lại sau.')
  }
}

// Xóa danh mục (hiển thị modal xác nhận)
const deleteCategory = (id) => {
  deleteId.value = id
  showDeleteModal.value = true
}

// Xác nhận xóa danh mục
const confirmDeleteCategory = async () => {
  try {
    const cate = categories.value.find(c => c._id === deleteId.value)
    if (!cate) {
      showDeleteModal.value = false
      return
    }
    if (cate.type === 'product') {
      await productCategoryApi.deleteCategory(deleteId.value)
    } else if (cate.type === 'blog') {
      await blogCategoryApi.deleteCategory(deleteId.value)
    }
    await loadCategories()
  } catch (err) {
    showErrorModal('Lỗi khi xóa danh mục. Vui lòng thử lại sau.')
  } finally {
    showDeleteModal.value = false
    deleteId.value = null
  }
}

// Hủy chế độ sửa
const cancelEdit = () => {
  isEdit.value = false
  editId.value = null
  form.value = { name: '', description: '', type: '' }
}

// Hàm định dạng ngày cho bảng
function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
</script>

<style scoped>
.admin-category {
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  padding: 0 0 15px;
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
.category-form {
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
.category-form h2 {
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
.category-list {
  animation: fadeInUp 0.7s;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.category-list h2 {
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
  .admin-category {
    padding: 12px 0;
  }
  .category-form, .modern-table {
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