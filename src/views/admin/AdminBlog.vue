<template>
  <div class="admin-blog">
    <Warning 
      :visible="showWarning" 
      :message="warningMessage" 
      @close="showWarning = false" 
    />
    <h1>Quản lý bài viết</h1>
    
    <!-- Form thêm/sửa bài viết -->
    <div class="blog-form">
      <h2>{{ isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới' }}</h2>
      <form @submit.prevent="isEdit ? updateBlog() : createBlog()">
        <div class="form-row">
          <input v-model="form.title" placeholder="Tiêu đề bài viết" required class="input" />
          <div style="flex:1">
            <!-- <input 
              v-model="form.image" 
              placeholder="Link ảnh" 
              class="input" 
              style="margin-bottom:6px"
            /> -->
            <input 
              
              type="file" 
              accept="image/*" 
              @change="handleImageUpload" 
              class="input" 
            />
            <div v-if="previewImage" style="margin-top:8px">
              <img :src="previewImage" alt="preview" style="max-width:80px;max-height:80px;border-radius:6px"/>
            </div>
          </div>
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
        <!-- Thay thế textarea content cũ bằng TinyMCE -->
        <div class="form-row">
          <div class="editor-wrapper">
            <Editor
              v-model="form.content"
              :api-key="tinymceApiKey"
              :init="{
                height: 300,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | link image | help',
                images_upload_handler: handleEditorImageUpload
              }"
            />
          </div>
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
import { ref, onMounted } from 'vue'
import blogApi from '@/shared/api/blogApi'
import blogCategoryApi from '@/shared/api/blogCategoryApi'
import Warning from '@/components/modal/Warning.vue'
import Editor from '@tinymce/tinymce-vue'

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

// State cho danh mục và danh sách bài viết
const categories = ref([])
const blogs = ref([])

// State cho preview ảnh
const previewImage = ref(null)

// State cho cảnh báo
const showWarning = ref(false)
const warningMessage = ref('')

const tinymceApiKey = process.env.VUE_APP_TINYMCE_API_KEY

// Lấy danh sách blogs và categories từ API
const fetchBlogs = async () => {
  try {
    const data = await blogApi.getAllBlogs()
    blogs.value = Array.isArray(data) ? data : (data.blogs || [])
  } catch (err) {
    blogs.value = []
  }
}

// Lấy danh sách category từ API
const fetchCategories = async () => {
  try {
    const data = await blogCategoryApi.getAllCategories()
    // Nếu API trả về mảng trực tiếp
    categories.value = Array.isArray(data) ? data : (data.categories || [])
  } catch (err) {
    categories.value = []
  }
}

// Lấy tên danh mục từ id
function getCategoryName(cat) {
  // Nếu là object
  if (typeof cat === 'object' && cat !== null) return cat.name || ''
  // Nếu là id
  const found = categories.value.find(c => c._id === cat)
  return found ? found.name : ''
}

// Hàm định dạng ngày cho bảng
function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// Thêm hàm xử lý upload ảnh trong trình soạn thảo
function handleEditorImageUpload(blobInfo, progress) {
  return new Promise((resolve, reject) => {
    // Kiểm tra mime type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg']
    if (!allowedTypes.includes(blobInfo.blob().type)) {
      reject({ message: 'Định dạng ảnh không hỗ trợ', remove: true })
      return
    }
    
    // Kiểm tra kích thước (5MB)
    if (blobInfo.blob().size > 5 * 1024 * 1024) {
      reject({ message: 'Ảnh quá lớn (tối đa 5MB)', remove: true })
      return
    }
    
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
       // Cập nhật tiến trình đọc file - 50%
      progress(50)
      
      // Gọi API để upload ảnh lên Firebase Storage
      blogApi.uploadEditorImage({
        imageBase64: base64,
        imageName: blobInfo.filename(),
        imageMimetype: blobInfo.blob().type
      })
      .then(response => {
        // Cập nhật tiến trình hoàn thành - 100%
        progress(100)
        console.log('Editor image uploaded successfully:', response.imageUrl)
        // Trả về URL của ảnh đã upload
        resolve(response.imageUrl)
      })
      .catch(error => {
        console.error('Lỗi upload ảnh chi tiết:', error)
        console.error('Error response:', error.response?.data)
        reject({ message: `Lỗi upload ảnh: ${error.message}`, remove: true })
      })
    }
    // Cập nhật tiến trình bắt đầu đọc file - 20%
    progress(20)
    reader.readAsDataURL(blobInfo.blob())
  })
}

// Cập nhật hàm createBlog để xử lý nội dung rich text
async function createBlog() {
  try {
    const payload = { ...form.value }
    payload.blogId = Date.now().toString()
    
    // Lưu nội dung HTML vào Firestore
    const newBlog = await blogApi.createBlog(payload)
    
    // Thêm blog mới vào danh sách
    const category = categories.value.find(c => c._id === newBlog.category)
    newBlog.categoryName = category ? category.name : ''
    blogs.value.push(newBlog)
    resetForm()
    previewImage.value = null
  } catch (err) {
    console.error('Tạo bài viết thất bại:', err)
    warningMessage.value = 'Tạo bài viết thất bại. Vui lòng thử lại.'
    showWarning.value = true
  }
}

// Cập nhật bài viết
async function updateBlog() {
  try {
    const payload = { ...form.value }
    await blogApi.updateBlog(editingId, payload)
    await fetchBlogs() // Refresh danh sách sau khi cập nhật thành công
    resetForm()
    isEdit.value = false
    editingId = null
    previewImage.value = null // Reset preview ảnh
  } catch (err) {
    console.error('Cập nhật bài viết thất bại:', err)
    warningMessage.value = 'Cập nhật bài viết thất bại. Vui lòng thử lại.'
    showWarning.value = true
  }
}

// Xóa bài viết
async function deleteBlog(id) {
  try {
    await blogApi.deleteBlog(id)
    await fetchBlogs()
    if (isEdit.value && editingId === id) {
      cancelEdit()
    }
  } catch (err) {
    console.error('Xóa bài viết thất bại:', err)
  }
}

// Đổ dữ liệu vào form để sửa
async function editBlog(blog) {
  form.value = { ...blog }
  isEdit.value = true
  editingId = blog._id
  previewImage.value = blog.image || null

  // Nếu content là URL Firestore thì fetch nội dung thực
  if (blog.content && blog.content.startsWith('https://console.firebase.google.com/')) {
    form.value.content = '' // Ẩn url firestore trong lúc chờ fetch
    try {
      // Gọi API backend để lấy nội dung thực
      const res = await blogApi.getBlogContent(blog._id)
      form.value.content = res.text || ''
    } catch (err) {
      form.value.content = ''
    }
  }
}

// Hủy chế độ sửa
function cancelEdit() {
  resetForm()
  isEdit.value = false
  editingId = null
  previewImage.value = null
}

// Reset form
function resetForm() {
  form.value = {
    title: '',
    image: '',
    description: '',
    content: '',
    category: '',
    // Thêm các trường liên quan đến ảnh để reset
    imageBase64: null,
    imageName: null,
    imageMimetype: null
  }
}

// Fetch dữ liệu khi component mount
onMounted(() => {
  fetchBlogs()
  fetchCategories()
})
</script>

<style scoped>
.admin-blog {
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  padding: 0 0 25px;
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
.input[type="file"] {
  padding: 10px 0px 0px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: #f6f7fb;
  height: 42px;
  line-height: 20px;
  cursor: pointer;
  color: #222;
}
.input[type="file"]:focus {
  border: 1.5px solid #4f8cff;
  box-shadow: 0 0 0 2px #e3f0ff;
  background: #fff;
}
.input[type="file"]::-webkit-file-upload-button {
  background: #e3f0ff;
  border: none;
  border-radius: 6px;
  padding: 7px 16px;
  color: #2563eb;
  font-weight: 500;
  cursor: pointer;
  margin-right: 10px;
  font-size: 1rem;
  transition: background 0.2s;
}
.input[type="file"]:hover::-webkit-file-upload-button {
  background: #4f8cff;
  color: #fff;
}
.input[type="file"]::file-selector-button {
  background: #e3f0ff;
  border: none;
  border-radius: 6px;
  padding: 7px 16px;
  color: #2563eb;
  font-weight: 500;
  cursor: pointer;
  margin-right: 10px;
  font-size: 1rem;
  transition: background 0.2s;
}
.input[type="file"]:hover::file-selector-button {
  background: #4f8cff;
  color: #fff;
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

/* Thêm CSS cho editor */
.editor-wrapper {
  width: 100%;
}
:deep(.tox-tinymce) {
  border-radius: 8px;
  border: 1.5px solid #e0e0e0;
}
:deep(.tox-editor-container) {
  background-color: #fff;
}
:deep(.tox-statusbar) {
  border-top: 1px solid #e0e0e0 !important;
}
:deep(.tox-statusbar__wordcount) {
  color: #666;
}
:deep(.tox-statusbar__path) {
  color: #666;
}
</style>