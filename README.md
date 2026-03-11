# ĐỒ ÁN CƠ SỞ CÔNG NGHỆ THÔNG TIN - CSE702131-1-2-25(N01)

## Đề tài: Liona Jewelry - Thiết kế và phá triển nền tảng mua sắm trang sức trực tuyến 

### Giảng viên hướng dẫn: TS. Nguyễn Thị Thùy Liên

Nhóm 08:
#### Thành viên nhóm

| STT | Họ và tên | Mã sinh viên | Email |
|-----|-----------|--------------|-------|
| 1 | Nguyễn Kiêm Mạnh | 23010909 | 23010909@st.phenikaa-uni.edu.vn |
| 2 | Phan Minh Trúc | 23010818 | 23010909@st.phenikaa-uni.edu.vn |
| 3 | Lê Đức Duy | 23010772 | 23010772@st.phenikaa-uni.edu.vn |
| 4 | Nguyễn Văn Mạnh | 23010559 | 23010559@st.phenikaa-uni.edu.vn |

## Hướng Dẫn Cài Đặt

### 1. Clone Repository

```bash
git clone https://github.com/lionelmahn/WEB-JEWELRY.git
cd WEB-JEWELRY
```

### 2. Cài Đặt Dependencies

#### Cài đặt Server Dependencies

```bash
cd server
npm install
```

#### Cài đặt Client Dependencies

```bash
cd ../client
npm install
```

### 3. Cấu Hình Environment Variables

#### Server Configuration

Tạo file `.env` trong thư mục `server/` dựa trên file `.env.example`:

```bash
cd server
cp .env.example .env
```

Sau đó, mở file `.env` và cấu hình các biến sau:

```env
# MongoDB Connection String
MONGO_URL=mongodb://localhost:27017/jewelry
# Hoặc sử dụng MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/jewelry?retryWrites=true&w=majority

# Cloudinary (Lưu trữ ảnh)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

# JWT Secret (Tạo chuỗi random cho JWT)
JWT_SECRET=your_secret_key_here

# OpenAI API Key (Cho chatbot - Optional)
OPENAI_API_KEY=your_openai_api_key

# PayOS API (Cho thanh toán)
PAYOS_CLIENT_ID=your_payos_client_id
PAYOS_API_KEY=your_payos_api_key
PAYOS_CHECKSUM_KEY=your_payos_checksum_key
```

**Hướng dẫn lấy các key:**

- **MongoDB**: 
  - Local: Cài MongoDB Community Edition
  - Cloud: Tạo account tại https://www.mongodb.com/cloud/atlas

- **Cloudinary**: 
  - Đăng ký tại https://cloudinary.com
  - Lấy credentials từ Dashboard

- **PayOS**: 
  - Đăng ký tại https://payos.vn
  - Lấy API keys từ Developer Settings

- **OpenAI** (Optional):
  - Đăng ký tại https://platform.openai.com
  - Lấy API key từ Account Settings

#### Client Configuration

Client không cần file `.env`, nhưng bạn có thể tạo file `.env.local` nếu cần custom API URL:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Chạy Ứng Dụng

#### Chạy Server (Terminal 1)

```bash
cd server
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

#### Chạy Client (Terminal 2)

```bash
cd client
npm run dev
```

Client sẽ chạy tại: `http://localhost:5173`

### 5. Mở Ứng Dụng

Truy cập vào http://localhost:5173 trên trình duyệt

### Lỗi: "Cannot connect to MongoDB"
- Kiểm tra MongoDB connection string trong `.env`
- Nếu dùng MongoDB Atlas, thêm IP của máy vào whitelist
- Kiểm tra MongoDB service đang chạy (nếu local)

### Lỗi: "CORS error"
- Kiểm tra `origin` trong `server.js` khớp với client URL
- Mặc định: `http://localhost:5173`

### Lỗi: "Cloudinary error"
- Kiểm tra credentials Cloudinary đúng trong `.env`
- Kiểm tra folder mặc định tồn tại trên Cloudinary

### Lỗi: "Port 3000 hoặc 5173 đã được sử dụng"
- Đóng các ứng dụng khác đang dùng port này
- Hoặc thay đổi port trong server.js/vite.config.js

### Lỗi: "npm install fail"
```bash
# Xóa node_modules và package-lock.json, rồi cài lại
rm -rf node_modules package-lock.json
npm install
```

## Development

### Chạy Development Mode

Đã hướng dẫn ở trên:
```bash
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm run dev
```

### Build Production

```bash
# Build Client
cd client
npm run build
# Output: client/dist/
```

### Linting

```bash
cd client
npm run lint
```
