# 🚀 HƯỚNG DẪN DEPLOY AGRIWEB

## ✅ TRẠNG THÁI HIỆN TẠI
- [x] Backend đã chạy thành công trên localhost:3000
- [x] Frontend đã chạy thành công trên localhost:8080  
- [x] MongoDB Atlas đã kết nối thành công
- [x] Firebase đã cấu hình xong
- [x] File .env đã được setup

## 🎯 BƯỚC TIẾP THEO: DEPLOY BACKEND TRƯỚC

### 1. Deploy Backend lên Railway

#### A. Tạo account Railway
1. Vào https://railway.app
2. Sign up với GitHub account
3. Connect với repository GitHub của bạn

#### B. Setup Environment Variables trên Railway
Khi deploy, bạn cần thêm các biến môi trường sau:

```
MONGO_URI=mongodb+srv://SuperUser:gqbxrLUoozFhPt9d@cluster0.3gwlngp.mongodb.net/agriweb
JWT_SECRET=01072003
NODE_ENV=production
PORT=3000
EMAIL_USER=nguyentanloc010703@gmail.com
EMAIL_PASS=ommr flsm xnal dzrr
FIREBASE_PROJECT_ID=agriweb-b3d1f
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"agriweb-b3d1f","private_key_id":"0e2f261c6296b9365ef6cfa4c1432fa8c40bd9da","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDGMUMOTB/DKbGh\nhmm+pUE1yRyyawWosb1XAi0SiGYFepMwbRrvbNzNRsgOStbWlYX+ZCkMyhA0MXI/\n/PmB15osDFYbdIxLBb+tiog4c/qGi7RCvCnYRxRsozZmdVl/VBn/EcbIumIFzYtJ\n3tYS7oXiTpIBDY6gWeTPJUeJq7MYqQ2xnwJDziJXI24hT0Lh1rqGXzeyh/EA3kPu\n8IseqgXrIRS4tJb5nd77zNWQGCtGoNMcdfxvdBjPO/2ja9uLxW0FK0q320SZWCF9\nNv8Ls20pWArTl2/0sNGInj+e6uZfU4k3guu2g63Dbu1QXDrO2F2i6kE7kvWK3J2T\naJpr/GuvAgMBAAECggEARfPiOpwkw9ImB6B1F1yloRHMZq7+jtW5QgobFYT+GWXz\nqK6ByMsQPgYDG4RPwuqAolMA6CozwPBI5ovoFuud13k9NTCUSfCMAHk6bk6FONL7\ne2iFjng8HcIXs98siRQKnuxL0NJ0QZ8UUCzuOz1kFQXtY6DA3BkOeQyr7MwlCQkW\n5hYsiI5CrIE5S9aDcKNrfknMjpuUYzgyTzUpBKliL6K/SODGWH0CYSlAGm9J9Jm/\npTL8ilqCNfGGR4q5lLrxf2NAmJLDonOAj9Exv1ZIQwMFE1+8jUl/Ltf8XeYzN1gG\nAg4Xo6LqAoshPqCjZlGzLDmuYYWVBrcQ8BUQibw+yQKBgQDvawg8BeFhGT747r9N\nGt/y4yJssGCucJoEY/XG22jYJz0QOHUfqDt0Oa5M601bVprFsfwUCBWNmRZVD3Vc\nBc17T1bm+VrpAd9Iy2LI9K1qm8SjoKKSpcJMHeki40eowUNPHsnzHcrtAsiXR7mR\ni7odiWwwZpWRyVlaNHdQsvM6VwKBgQDT60i6OdfkBd21g3zOJkl3dv+xY5N4Hqfe\ncjvVYUq+E0EIS62hs8R+4zbUK2RotyWyO/LKsLMj9Jf9qVx2zB98EA1JPBT+MvbR\nea6yzMSeWm5r1l19G1YJxU/71kw2eoeVFZhPS05rBXERD3LStYvD+3JcbfR4EP7+\nCJGgrf+yaQKBgCp/VDHbVVs38P6c2mYkXBYwDR8/25l7MUuQNsM6lQyxQlyLuPaK\nlSsXRgIvTkblQ4nOAxHHMZQ11Un5+XoBKa02sxVCs8liZLD2MS28iL/AsJHe5Jyl\nQazjLkvcDg89ZuY3b99wrWGOue5oc98K71lo2ERrISeElxC0+Wzgpt33AoGAWXd3\nmMda0bV4SG1ef1nComDmyekUFR48GLl5cThF6cEPL4VjpGTUjA041JINLfhEPd75\nPYEj4AYfNMQPeUfr8uCD+2sWIcs6UG1ix7GTQJdFDtnNVkf4Jt/aSKPMQSOxocsg\nJjnQvXXqqh0viK2EeBTrzwHMt/PU80KC2Kcc0CECgYAg0r+jd4GoVAgKpu21t3tc\n6KdytlAn0GIzhW2+6j830dps/Yv6RemxmHQmcAFQJKkdc/NfETxofREAE88rz5M/\nlVElC9faIyJQUrgzno+t50L16cNHYbrkDCLLT4xxXI4a3TSB4Db6AK8iF/EKuOtd\n8lLnGY8WFStxYQAXPV4+HQ==\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-fbsvc@agriweb-b3d1f.iam.gserviceaccount.com","client_id":"109558464660602816985","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40agriweb-b3d1f.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

#### C. Cấu hình Deploy
- Root Directory: `/backend`
- Build Command: `npm install`
- Start Command: `npm start`

### 2. Sau khi Backend deploy xong
1. Railway sẽ cung cấp URL như: `https://your-app-name.railway.app`
2. Test API: `https://your-app-name.railway.app/api/users`
3. Cập nhật CORS trong backend với domain này

### 3. Deploy Frontend lên Vercel
1. Cập nhật `src/shared/utils/axios.js` với URL backend từ Railway
2. Deploy lên Vercel
3. Test toàn bộ ứng dụng

## 🔧 CẦN LÀM NGAY BÂY GIỜ
1. Push code lên GitHub (nếu chưa có)
2. Deploy backend lên Railway trước
3. Test API endpoints
4. Sau đó mới deploy frontend

## ⚠️ LƯU Ý QUAN TRỌNG
- Không commit file .env lên GitHub
- serviceAccountKey.json đã được gitignore
- Sử dụng environment variables cho production
