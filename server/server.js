import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

// Lấy port từ biến môi trường hoặc sử dụng port 4000 mặc định
const PORT = process.env.PORT || 4000;

// Khởi động server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 API available at http://localhost:${PORT}`);
});

export default server;
