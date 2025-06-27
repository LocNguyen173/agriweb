<template>
  <div class="admin-product">
    <h1>Quản lý sản phẩm</h1>
    <Warning 
      :visible="showWarning" 
      :message="warningMessage" 
      @close="showWarning = false" 
    />

    <!-- Form thêm/sửa sản phẩm -->
    <div class="product-form">
      <h2>{{ isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}</h2>
      <form @submit.prevent="isEdit ? updateProduct() : createProduct()">
        <div class="form-row">
          <input v-model="form.name" placeholder="Tên sản phẩm" required class="input" />
          <input v-model="form.price" type="number" placeholder="Giá" class="input" />
        </div>
        <div class="form-row">
          <div style="flex:1">
            <input 
              type="file" 
              accept="image/*" 
              @change="handleImageUpload" 
              class="input" 
              ref="fileInputRef"
            />
            <div v-if="previewImage" style="margin-top:8px">
              <img :src="previewImage" alt="preview" style="max-width:80px;max-height:80px;border-radius:6px"/>
            </div>
          </div>
          <select v-model="form.category" required class="input">
            <option disabled value="">Chọn danh mục</option>
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <div class="form-row">
          <textarea v-model="form.description" placeholder="Mô tả" class="input textarea"></textarea>
        </div>
        <div class="form-row favorite-row">
          <label class="favorite-checkbox">
            <input type="checkbox" v-model="form.isFavorite" />
            <span class="star">⭐</span> Bán chạy
          </label>
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

    <!-- Danh sách sản phẩm -->
    <div class="product-list">
      <h2>Danh sách sản phẩm</h2>
      <table class="modern-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Ảnh</th>
            <th>Danh mục</th>
            <th>Mô tả</th>
            <th>Bán chạy</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <!-- TODO: Render danh sách sản phẩm -->
          <tr v-for="product in products" :key="product._id" class="table-row">
            <td>
              {{ product.name }}
              <!-- <span v-if="product.isFavorite" class="star-badge" title="Bán chạy">⭐</span> -->
            </td>
            <td>{{ product.price.toLocaleString() }}₫</td>
            <td>
              <div class="img-thumb" @click="openImageModal(product.image)">
                <img :src="product.image" alt="" />
              </div>
            </td>
            <td>
              <span class="category-badge">
                {{ product.categoryName }}
              </span>
            </td> 
            <td>{{ product.description }}</td>
            <td>
              <span v-if="product.isFavorite" class="star-badge" title="Bán chạy">⭐</span>
            </td>
            <td>
              <button @click="editProduct(product)" class="btn icon edit" title="Sửa">
                ✏️
              </button>
              <button @click="deleteProduct(product._id)" class="btn icon delete" title="Xóa">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal xem ảnh lớn -->
    <ImageModal 
      :visible="showImageModal"
      :imageUrl="modalImageUrl" 
      @close="closeImageModal" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import productApi from '@/shared/api/productApi'
import productCategoryApi from '@/shared/api/productCategoryApi'
import Warning from '@/components/modal/Warning.vue'
import ImageModal from '@/components/modal/ImageModal.vue'

const fileInputRef = ref(null)

// State
const categories = ref([])
const products = ref([])

const form = ref({
  name: '',
  price: '',
  image: '',
  description: '',
  category: '',
  isFavorite: false
})
const isEdit = ref(false)
let editingId = null

// Modal xem ảnh lớn
const showImageModal = ref(false)
const modalImageUrl = ref('')

// Load categories và products từ API khi component mount
onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})

async function fetchCategories() {
  try {
    // Lấy tất cả danh mục sản phẩm từ API chuẩn
    const data = await productCategoryApi.getAllCategories()
    categories.value = data
  } catch (err) {
    categories.value = []
  }
}

async function fetchProducts() {
  try {
    const data = await productApi.getAllProducts()
    // Map tên danh mục vào từng sản phẩm (nếu category là object)
    products.value = data.map(product => ({
      ...product,
      categoryName: product.category && product.category.name ? product.category.name : ''
    }))
  } catch (err) {
    products.value = []
  }
}

// Cảnh báo khi ảnh vượt quá kích thước
const showWarning = ref(false)
const warningMessage = ref('')
const previewImage = ref('')

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  // Kiểm tra mime type hợp lệ
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    warningMessage.value = 'Định dạng ảnh không hợp lệ. Chỉ chấp nhận JPG, PNG, GIF, WEBP.'
    showWarning.value = true
    e.target.value = ''
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    warningMessage.value = 'Ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.'
    showWarning.value = true
    e.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    // Tách phần base64 (bỏ tiền tố data:image/...)
    const result = ev.target.result
    const base64 = result.split(',')[1]
    form.value.imageBase64 = base64
    form.value.imageName = file.name
    form.value.imageMimetype = file.type
    previewImage.value = result
  }
  reader.readAsDataURL(file)
}

// Tạo sản phẩm mới
async function createProduct() {
  try {
    const payload = { ...form.value }
    payload.productId = Date.now().toString()
    const newProduct = await productApi.createProduct(payload)
    const category = categories.value.find(cat => cat._id === newProduct.category?._id || cat._id === newProduct.category)
    newProduct.categoryName = category ? category.name : ''
    products.value.push(newProduct)
    resetForm()
  } catch (err) {
    alert('Không thể tạo sản phẩm!')
  }
}

// Cập nhật sản phẩm
async function updateProduct() {
  try {
    const updated = await productApi.updateProduct(editingId, form.value)
    const category = categories.value.find(cat => cat._id === updated.category?._id || cat._id === updated.category)
    updated.categoryName = category ? category.name : ''
    const idx = products.value.findIndex(p => p._id === editingId)
    if (idx !== -1) products.value[idx] = updated
    resetForm()
    isEdit.value = false
    editingId = null
  } catch (err) {
    alert('Không thể cập nhật sản phẩm!')
  }
}

// Xóa sản phẩm
async function deleteProduct(id) {
  try {
    await productApi.deleteProduct(id)
    products.value = products.value.filter(p => p._id !== id)
    if (isEdit.value && editingId === id) cancelEdit()
  } catch (err) {
    alert('Không thể xóa sản phẩm!')
  }
}

// Sửa sản phẩm
function editProduct(product) {
  form.value = {
    ...product,
    isFavorite: !!product.isFavorite,
    category: product.category?._id || product.category // Gán sẵn category vào dropdown
  }
  isEdit.value = true
  editingId = product._id
}

// Hủy sửa
function cancelEdit() {
  resetForm()
  isEdit.value = false
  editingId = null
}

function resetForm() {
  form.value = {
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    isFavorite: false
  }
  previewImage.value = ''
  if (fileInputRef.value) fileInputRef.value.value = ''
}

// Mở modal xem ảnh lớn
function openImageModal(url) {
  try {
    console.log('Mở modal ảnh với url:', url)
    modalImageUrl.value = url
    showImageModal.value = true
  } catch (err) {
    console.error('Lỗi khi mở modal ảnh:', err)
  }
}

function closeImageModal() {
  try {
    showImageModal.value = false
    modalImageUrl.value = ''
    console.log('Đã đóng modal ảnh')
  } catch (err) {
    console.error('Lỗi khi đóng modal ảnh:', err)
  }
}
</script>

<style scoped>
.admin-product {
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
.product-form {
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
.product-form h2 {
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
.product-list {
  animation: fadeInUp 0.7s;
}
.favorite-row {
  margin-bottom: 10px;
}
.favorite-checkbox {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.05rem;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.favorite-checkbox input[type="checkbox"] {
  accent-color: #ffd600;
  width: 18px;
  height: 18px;
  margin-right: 4px;
}
.favorite-checkbox .star {
  color: #ffd600;
  font-size: 1.3em;
  margin-right: 2px;
}
.star-badge {
  color: #ffd600;
  font-size: 1.2em;
  margin-left: 4px;
  vertical-align: middle;
  filter: drop-shadow(0 1px 2px #fff59d);
  animation: star-pop 0.5s;
}
@keyframes star-pop {
  0% { transform: scale(0.7) rotate(-10deg);}
  60% { transform: scale(1.2) rotate(10deg);}
  100% { transform: scale(1) rotate(0);}
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.product-list h2 {
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
  .admin-product {
    padding: 12px 0;
  }
  .product-form, .modern-table {
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