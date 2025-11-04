# ⚡ Hướng Dẫn Deploy Nhanh Toàn Bộ Dự Án

## 🚀 5 Bước Deploy Toàn Bộ Dự Án

### Bước 1: Chuẩn Bị MongoDB Atlas (5 phút)

1. Tạo tài khoản: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster miễn phí
3. Tạo database user
4. Network Access: Cho phép tất cả IPs (0.0.0.0/0)
5. Lấy connection string

### Bước 2: Deploy Server (10 phút)

#### Qua Vercel Dashboard:

1. **Vào [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Add New Project** → Import từ GitHub
3. **Cấu hình**:
   - Root Directory: `server`
   - Framework: Other
4. **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret_32_chars_min
   REFRESH_SECRET=your_refresh_secret_32_chars_min
   CLIENT_URL=https://your-client-domain.vercel.app (cập nhật sau)
   NODE_ENV=production
   ```
5. **Deploy**
6. **Lấy Server URL**: `https://your-server.vercel.app`

### Bước 3: Deploy Client (10 phút)

1. **Add New Project** → Import từ GitHub
2. **Cấu hình**:
   - Root Directory: `client`
   - Framework: Next.js (tự động)
3. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-server.vercel.app/api
   ```
4. **Deploy**
5. **Lấy Client URL**: `https://your-client.vercel.app`

### Bước 4: Cập Nhật CORS (2 phút)

1. **Vào Server Project** → Settings → Environment Variables
2. **Cập nhật**:
   ```
   CLIENT_URL=https://your-client.vercel.app
   ```
3. **Redeploy** server

### Bước 5: Test (3 phút)

1. Mở client URL
2. Test đăng nhập/đăng ký
3. Kiểm tra console (F12) xem có lỗi không

---

## ✅ Hoàn Thành!

Bạn sẽ có:

- **Frontend**: `https://your-client.vercel.app`
- **Backend**: `https://your-server.vercel.app/api`

---

**Chi tiết đầy đủ**: Xem `DEPLOY_FULL_PROJECT.md`
