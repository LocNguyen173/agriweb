# Deploy Checklist

## MongoDB Atlas ✅
- [ ] Database đã được tạo và cấu hình
- [ ] Network Access: Allow all IPs (0.0.0.0/0) hoặc specific IPs
- [ ] Database User có quyền readWrite
- [ ] Connection string đã được test

## Firebase ✅
- [ ] Project đã được setup
- [ ] Storage bucket đã được tạo
- [ ] Service Account Key đã được download
- [ ] Firebase Security Rules đã được cấu hình

## Backend Preparation
- [ ] File .env đã được tạo với đầy đủ biến môi trường
- [ ] Firebase config đã hỗ trợ environment variables
- [ ] CORS đã được cấu hình cho production domain
- [ ] Package.json backend đã được tạo riêng

## Frontend Preparation  
- [ ] Axios baseURL đã được cấu hình dynamic
- [ ] Build script đã được test local
- [ ] vercel.json đã được tạo cho SPA routing

## Deploy Steps
1. [ ] Deploy backend lên Railway/Render trước
2. [ ] Test API endpoints hoạt động
3. [ ] Cập nhật frontend với backend URL thực tế
4. [ ] Deploy frontend lên Vercel
5. [ ] Test toàn bộ ứng dụng

## Post-Deploy Testing
- [ ] Authentication hoạt động
- [ ] File upload hoạt động (Firebase Storage)
- [ ] Database operations hoạt động
- [ ] Email sending hoạt động (nếu có)
- [ ] All routes accessible
- [ ] Mobile responsive
- [ ] Performance check

## Domain Setup (Optional)
- [ ] Custom domain cho frontend
- [ ] SSL certificate
- [ ] Update CORS với domain mới
