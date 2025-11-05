/**
 * 🇻🇳 Root Layout - Layout gốc của ứng dụng Next.js
 * 🇻🇳 Định nghĩa cấu trúc HTML và metadata cho toàn bộ ứng dụng
 */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// 🇻🇳 Cấu hình font Inter từ Google Fonts
const inter = Inter({ subsets: ['latin'] });

// 🇻🇳 Metadata cho SEO - thông tin hiển thị trên trình duyệt và công cụ tìm kiếm
export const metadata: Metadata = {
  title: 'EnglishPro - Luyện thi IELTS & TOEIC',
  description: 'Nền tảng luyện thi IELTS và TOEIC hàng đầu Việt Nam. Học tiếng Anh hiệu quả với AI chấm bài, đề thi thực tế và cộng đồng học viên sôi động.',
};

/**
 * 🇻🇳 RootLayout Component
 * 🇻🇳 Component layout gốc bao bọc toàn bộ ứng dụng
 * @param children - Nội dung các page sẽ được render
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
