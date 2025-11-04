# 🔧 Fix Lỗi Deploy Client - Dependency Resolution

## ❌ Lỗi

```
npm error ERESOLVE could not resolve
npm error While resolving: vaul@0.9.9
npm error Found: react@19.2.0
```

## 🔍 Nguyên Nhân

- React 19.2.0 là version mới
- Một số packages như `vaul` và Radix UI chưa tương thích hoàn toàn với React 19
- npm không thể resolve peer dependencies

## ✅ Giải Pháp Đã Áp Dụng

### 1. Thêm `overrides` vào `package.json`

Đã thêm `overrides` để force React 19.2.0:

```json
"overrides": {
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

### 2. Tạo file `.npmrc`

Đã tạo file `.npmrc` với `legacy-peer-deps= conflicts.
true` để npm bỏ qua peer dependency

### 3. Cấu Hình Vercel (Nếu Cần)

Nếu vẫn gặp lỗi, cấu hình Vercel như sau:

1. **Vào Vercel Dashboard** → Project Settings
2. **General** → **Build & Development Settings**
3. **Install Command**: Thay đổi thành:
   ```
   npm install --legacy-peer-deps
   ```
4. **Save** và **Redeploy**

## 🚀 Các Bước Tiếp Theo

### Bước 1: Commit và Push Code

```bash
cd client
git add package.json .npmrc
git commit -m "Fix dependency resolution for React 19"
git push origin main
```

### Bước 2: Redeploy trên Vercel

1. Vercel sẽ tự động deploy khi có push mới
2. Hoặc vào Vercel Dashboard → **Deployments** → **Redeploy**

### Bước 3: Kiểm Tra Logs

Nếu vẫn gặp lỗi, kiểm tra logs trên Vercel Dashboard.

## 🔄 Giải Pháp Thay Thế (Nếu Vẫn Lỗi)

### Option 1: Downgrade React về 18.x

Nếu vẫn gặp vấn đề, có thể downgrade React:

```json
"react": "^18.3.1",
"react-dom": "^18.3.1"
```

Và cập nhật `@types/react`:

```json
"@types/react": "^18.3.12",
"@types/react-dom": "^18.3.1"
```

### Option 2: Cập Nhật Packages

Cập nhật tất cả packages lên version mới nhất:

```bash
cd client
npm update
```

### Option 3: Xóa node_modules và Reinstall

```bash
cd client
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## ✅ Kiểm Tra

Sau khi deploy thành công:

1. ✅ Build thành công không có lỗi
2. ✅ Application chạy được
3. ✅ Không có warnings về peer dependencies

## 📝 Lưu Ý

- File `.npmrc` đã được thêm vào `.gitignore` (nếu có)
- Nếu muốn commit `.npmrc`, đảm bảo nó không chứa thông tin nhạy cảm
- `legacy-peer-deps` là giải pháp tạm thời, nên cập nhật packages khi có version tương thích

---

**Nếu vẫn gặp vấn đề, hãy kiểm tra logs trên Vercel Dashboard để xem lỗi chi tiết.**
