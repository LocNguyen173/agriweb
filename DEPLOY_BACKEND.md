# Railway Deploy Instructions

## 1. Chuẩn bị
- Tạo account tại railway.app
- Connect với GitHub account

## 2. Cấu hình Environment Variables trên Railway
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/agriweb
JWT_SECRET=your-super-secret-jwt-key
FIREBASE_PROJECT_ID=agriweb-b3d1f
PORT=3000
NODE_ENV=production
```

## 3. Upload Firebase Service Account Key
- Tạo biến môi trường FIREBASE_SERVICE_ACCOUNT
- Copy toàn bộ nội dung file serviceAccountKey.json vào đây

## 4. Deploy Commands
- Build Command: npm install
- Start Command: npm start
- Port: 3000 (Railway sẽ tự động map)
