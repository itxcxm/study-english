"use client";

/**
 * 🇻🇳 Component Hero - phần banner chính của trang chủ
 * 🇻🇳 Hiển thị thông tin giới thiệu, nút kêu gọi hành động và thống kê
 */
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Users } from "lucide-react";
import { checkAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 🇻🇳 Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    // 🇻🇳 Chỉ kiểm tra trạng thái đăng nhập 1 lần khi component mount
    // 🇻🇳 Các lần sau, khi user gửi request về server, API interceptor sẽ tự động kiểm tra và refresh token
    checkAuth(setIsAuthenticated);
  }, []);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                Nền tảng luyện thi #1 Việt Nam
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Chinh phục{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                IELTS & TOEIC
              </span>{" "}
              dễ dàng
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Học tiếng Anh hiệu quả với hàng nghìn đề thi thực tế, phương pháp học thông minh và cộng đồng học viên sôi động.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-base px-8 py-6 bg-blue-600 hover:bg-blue-700" onClick={() => isAuthenticated ? router.push("/dashboard") : router.push("/login")}>
                Bắt đầu học ngay
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6" onClick={() => router.push("/courses")}>
                Thi thử miễn phí
              </Button>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Học viên</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Đề thi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">4.8★</div>
                <div className="text-sm text-gray-600">Đánh giá</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg transition-all hover:shadow-md">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Học theo lộ trình</div>
                    <div className="text-sm text-gray-600">Từ cơ bản đến nâng cao</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg transition-all hover:shadow-md">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Luyện đề thực chiến</div>
                    <div className="text-sm text-gray-600">Đề thi cập nhật liên tục</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg transition-all hover:shadow-md">
                  <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Cộng đồng học tập</div>
                    <div className="text-sm text-gray-600">Kết nối và chia sẻ kinh nghiệm</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
