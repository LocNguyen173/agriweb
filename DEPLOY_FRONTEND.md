# Frontend Deploy Instructions - Vercel

## 1. Chuẩn bị
- Tạo account tại vercel.com
- Connect với GitHub repository

## 2. Cấu hình Build Settings
```
Framework Preset: Vue.js
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## 3. Environment Variables (nếu cần)
```
NODE_ENV=production
VUE_APP_API_URL=https://your-backend-url.railway.app
```

## 4. Domain Settings
- Vercel sẽ cung cấp domain miễn phí: your-app.vercel.app
- Có thể custom domain sau

## 5. Deploy
- Push code lên GitHub
- Vercel sẽ tự động deploy khi có commit mới
