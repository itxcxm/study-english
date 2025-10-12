import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EnglishPro - Luyện thi IELTS & TOEIC',
  description: 'Nền tảng luyện thi IELTS và TOEIC hàng đầu Việt Nam. Học tiếng Anh hiệu quả với AI chấm bài, đề thi thực tế và cộng đồng học viên sôi động.',
};

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
