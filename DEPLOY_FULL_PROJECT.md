# 🚀 Hướng Dẫn Deploy Toàn Bộ Dự Án Lên Vercel

## 📋 Tổng Quan

Dự án bao gồm:

- **Client** (`client/`): Next.js Frontend
- **Server** (`server/`): Express.js Backend API

Có 2 cách deploy:

1. **Deploy riêng biệt** (Khuyến nghị): Client và Server là 2 projects riêng
2. **Monorepo**: Cả hai trong cùng một project

## 🎯 Cách 1: Deploy Riêng Biệt (Khuyến Nghị)

### ✅ Ưu Điểm

- Dễ quản lý và theo dõi
- Deploy độc lập, không ảnh hưởng lẫn nhau
- Mỗi project có domain riêng
- Dễ scale riêng biệt

---

## 📦 Bước 1: Chuẩn Bị MongoDB Atlas

### 1.1. Tạo MongoDB Atlas Cluster

1. Truy cập [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Đăng ký/Đăng nhập
3. Tạo cluster miễn phí
4. Chọn region gần nhất (ví dụ: Singapore)

### 1.2. Cấu Hình Database

1. **Database Access** → Tạo user mới

   - Username: `study-english-user`
   - Password: (tạo mạnh, lưu lại)
   - Quyền: Read and write to any database

2. **Network Access** → Add IP Address

   - Chọn: **Allow Access from Anywhere** (0.0.0.0/0)

3. **Connect** → Connect your application
   - Copy connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/study-english?retryWrites=true&w=majority
   ```

---

## 🔧 Bước 2: Deploy Server (Backend API)

### 2.1. Chuẩn Bị Code

Server đã có sẵn:

- ✅ `vercel.json` - Cấu hình Vercel
- ✅ `api/index.js` - Serverless entry point
- ✅ CORS đã được cấu hình

### 2.2. Deploy Server Lên Vercel

#### Cách A: Qua Vercel CLI

```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm install -g vercel

# Đăng nhập
vercel login

# Di chuyển vào thư mục server
cd server

# Deploy
vercel

# Làm theo hướng dẫn:
# - Set up and deploy? → Y
# - Link to existing project? → N
# - Project name? → study-english-server
# - Directory? → ./

# Deploy production
vercel --prod
```

#### Cách B: Qua GitHub (Khuyến nghị)

1. **Push code lên GitHub**:

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Vào Vercel Dashboard**:

   - Truy cập [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **Add New Project**

3. **Import Repository**:

   - Chọn repository từ GitHub
   - Click **Import**

4. **Cấu Hình Project**:

   - **Project Name**: `study-english-server`
   - **Root Directory**: Chọn `server`
   - **Framework Preset**: Other
   - **Build Command**: (để trống)
   - **Output Directory**: (để trống)
   - **Install Command**: `npm install`

5. **Click Deploy**

### 2.3. Cấu Hình Environment Variables cho Server

Vào **Settings** → **Environment Variables**, thêm:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/study-english?retryWrites=true&w=majority

# JWT Secrets (tạo chuỗi ngẫu nhiên mạnh, tối thiểu 32 ký tự)
JWT_SECRET=your_very_strong_jwt_secret_key_min_32_chars_random
REFRESH_SECRET=your_very_strong_refresh_secret_key_min_32_chars_random

# CORS - Sẽ cập nhật sau khi deploy client
CLIENT_URL=https://your-client-domain.vercel.app

# Environment
NODE_ENV=production
```

**Lưu ý**:

- Chọn environment: **Production**, **Preview**, **Development** (hoặc tất cả)
- Sau khi thêm environment variables, cần **Redeploy**

### 2.4. Lấy Server URL

Sau khi deploy thành công, bạn sẽ có URL:

```
https://study-english-server.vercel.app
```

**Lưu lại URL này** để cấu hình cho client.

---

## 🎨 Bước 3: Deploy Client (Frontend)

### 3.1. Chuẩn Bị Code

Client cần cấu hình environment variable để kết nối với server.

### 3.2. Deploy Client Lên Vercel

#### Cách A: Qua Vercel CLI

```bash
# Di chuyển vào thư mục client
cd client

# Deploy
vercel

# Làm theo hướng dẫn:
# - Set up and deploy? → Y
# - Link to existing project? → N
# - Project name? → study-english-client
# - Directory? → ./

# Deploy production
vercel --prod
```

#### Cách B: Qua GitHub (Khuyến nghị)

1. **Vào Vercel Dashboard**:

   - Click **Add New Project**

2. **Import Repository**:

   - Chọn cùng repository (hoặc repository riêng nếu có)
   - Click **Import**

3. **Cấu Hình Project**:

   - **Project Name**: `study-english-client`
   - **Root Directory**: Chọn `client`
   - **Framework Preset**: Next.js (tự động detect)
   - **Build Command**: `npm run build` (tự động)
   - **Output Directory**: `.next` (tự động)
   - **Install Command**: `npm install --legacy-peer-deps` (hoặc để mặc định nếu đã có `.npmrc`)

4. **Click Deploy**

### 3.3. Cấu Hình Environment Variables cho Client

Vào **Settings** → **Environment Variables**, thêm:

```env
# API URL - URL của server đã deploy
NEXT_PUBLIC_API_URL=https://study-english-server.vercel.app/api
```

**Lưu ý**:

- `NEXT_PUBLIC_` prefix là bắt buộc cho Next.js
- Sau khi thêm, cần **Redeploy**

### 3.4. Lấy Client URL

Sau khi deploy thành công, bạn sẽ có URL:

```
https://study-english-client.vercel.app
```

---

## 🔄 Bước 4: Cập Nhật Cấu Hình

### 4.1. Cập Nhật Server CORS

Sau khi deploy client, cần cập nhật `CLIENT_URL` trong server:

1. Vào **Server Project** trên Vercel
2. **Settings** → **Environment Variables**
3. Cập nhật `CLIENT_URL`:
   ```
   CLIENT_URL=https://study-english-client.vercel.app
   ```
4. **Redeploy** server

### 4.2. Kiểm Tra Kết Nối

1. Mở client: `https://study-english-client.vercel.app`
2. Kiểm tra console (F12) xem có lỗi CORS không
3. Test đăng nhập/đăng ký

---

## 📊 Bước 5: Kiểm Tra & Test

### 5.1. Test Server API

```bash
# Test health check
curl https://study-english-server.vercel.app/api/auth/check

# Test endpoint khác
curl https://study-english-server.vercel.app/api/review?topic=Adjectives
```

### 5.2. Test Client

1. Mở browser: `https://study-english-client.vercel.app`
2. Test các tính năng:
   - ✅ Đăng ký
   - ✅ Đăng nhập
   - ✅ Xem danh sách courses
   - ✅ Làm bài practice
   - ✅ Xem kết quả

### 5.3. Kiểm Tra Logs

**Server Logs**:

1. Vào Server Project → Deployments
2. Click vào deployment → Tab **Logs**

**Client Logs**:

1. Vào Client Project → Deployments
2. Click vào deployment → Tab **Logs**

---

## 🎯 Cách 2: Deploy Monorepo (Cùng Project)

Nếu muốn deploy cả hai trong cùng một project:

### Cấu Hình Monorepo

1. **Tạo `vercel.json` ở root**:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "server/api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/$1"
    }
  ]
}
```

2. **Cấu hình Root Directory**:
   - Root Directory: `./` (root)
   - Client Build: `client`
   - Server Build: `server`

⚠️ **Lưu ý**: Cách này phức tạp hơn và khó quản lý hơn. Khuyến nghị dùng **Cách 1**.

---

## 🔧 Cấu Hình Nâng Cao

### Custom Domains

1. **Vào Project Settings** → **Domains**
2. Thêm domain của bạn
3. Cấu hình DNS theo hướng dẫn

### Environment Variables theo Environment

- **Production**: Dùng cho production deployments
- **Preview**: Dùng cho preview deployments (PR)
- **Development**: Dùng cho local development

### Continuous Deployment

Vercel tự động deploy khi:

- Push code lên branch `main` → Production
- Tạo Pull Request → Preview deployment

---

## 🐛 Xử Lý Lỗi

### Lỗi 1: CORS Error

**Lỗi**: `Access-Control-Allow-Origin` error

**Giải pháp**:

- Kiểm tra `CLIENT_URL` trong server environment variables
- Đảm bảo URL đúng format (không có trailing slash)
- Redeploy server sau khi cập nhật

### Lỗi 2: API Connection Error

**Lỗi**: `Network Error` hoặc `Failed to fetch`

**Giải pháp**:

- Kiểm tra `NEXT_PUBLIC_API_URL` trong client environment variables
- Đảm bảo URL đúng format: `https://domain.com/api`
- Kiểm tra server đã deploy thành công

### Lỗi 3: MongoDB Connection Error

**Lỗi**: `MongoServerError: Authentication failed`

**Giải pháp**:

- Kiểm tra `MONGODB_URI` trong server environment variables
- Đảm bảo username/password đúng
- Kiểm tra Network Access trong MongoDB Atlas

### Lỗi 4: Build Error / ERESOLVE Error

**Lỗi**:

```
npm error ERESOLVE could not resolve
npm error While resolving: vaul@0.9.9
npm error Found: react@19.2.0
```

**Giải pháp**:

✅ **Đã được fix tự động**:

- File `.npmrc` đã được tạo với `legacy-peer-deps=true`
- File `package.json` đã có `overrides` cho React 19.2.0

**Nếu vẫn gặp lỗi**:

1. **Cập nhật Install Command trên Vercel**:

   - Vào **Settings** → **General** → **Build & Development Settings**
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Save** và **Redeploy**

2. **Hoặc kiểm tra**:

   - File `.npmrc` đã được commit
   - File `package.json` có `overrides` section
   - Kiểm tra logs trên Vercel Dashboard

3. **Xem chi tiết**: Xem file `DEPLOY_FIX_CLIENT.md`

**Lưu ý**:

- Lỗi này xảy ra do React 19.2.0 và một số packages chưa tương thích hoàn toàn
- `legacy-peer-deps` là giải pháp tạm thời, nên cập nhật packages khi có version tương thích

---

## 📋 Checklist Deployment

### Server

- [ ] Deploy server lên Vercel
- [ ] Thêm environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `REFRESH_SECRET`
  - [ ] `CLIENT_URL` (tạm thời để trống hoặc localhost)
  - [ ] `NODE_ENV=production`
- [ ] Redeploy sau khi thêm environment variables
- [ ] Lấy server URL
- [ ] Test API endpoints

### Client

- [ ] Deploy client lên Vercel
- [ ] Thêm environment variables:
  - [ ] `NEXT_PUBLIC_API_URL` (URL của server)
- [ ] Redeploy sau khi thêm environment variables
- [ ] Lấy client URL

### Cập Nhật

- [ ] Cập nhật `CLIENT_URL` trong server
- [ ] Redeploy server
- [ ] Test toàn bộ ứng dụng

---

## ✅ Hoàn Thành!

Sau khi hoàn tất, bạn sẽ có:

- **Frontend**: `https://study-english-client.vercel.app`
- **Backend API**: `https://study-english-server.vercel.app`

### URLs

- **Client**: `https://your-client-domain.vercel.app`
- **Server API**: `https://your-server-domain.vercel.app/api`

---

## 📚 Tài Liệu Tham Khảo

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/concepts/get-started/nextjs)
- [Serverless Functions](https://vercel.com/docs/concepts/functions)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Chúc bạn deploy thành công! 🎉**
