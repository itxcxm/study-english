"use client"

/**
 * 🇻🇳 Trang chủ - Home Page
 * 🇻🇳 Trang landing page chính của website, hiển thị các section:
 * - Header: Menu điều hướng
 * - Hero: Banner giới thiệu chính
 * - Courses: Danh sách khóa học
 * - Features: Các tính năng nổi bật
 * - Pricing: Bảng giá
 * - Footer: Chân trang
 */
import { Header } from "@/components/views/Header";
import { Hero } from "@/components/views/Hero";
import { Courses } from "@/components/views/Courses";
import { Features } from "@/components/views/Features";
import { Pricing } from "@/components/views/Pricing";
import { Footer } from "@/components/views/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Courses />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
