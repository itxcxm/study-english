"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/lib/api";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập qua API
    const checkAuth = async () => {
      try {
        const response = await api.get("/api/auth/check");
        setIsAuthenticated(response.data.authenticated || false);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    // Kiểm tra định kỳ trạng thái đăng nhập
    const interval = setInterval(checkAuth, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EnglishPro</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Khóa học
            </Link>
            <Link href="/practiceTest" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Ôn Tập
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Gói Luyện Thi
            </Link>
            <Link href="/introduce" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Tính năng
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Về Chúng tôi
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">My Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Đăng nhập</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <Link
              href="/courses"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Khóa học
            </Link>
            <Link
              href="/practiceTest"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ôn Tập
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gói Luyện Thi
            </Link>
            <Link
              href="/introduce"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tính năng
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Về chúng tôi
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">My Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="w-full">Đăng nhập</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
