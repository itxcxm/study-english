"use client";

import { BookOpen, Brain, BarChart3, Users, Award, Headphones, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/views/Header";
import { Footer } from "@/components/views/Footer";

export default function IntroducePage() {
  const features = [
    {
      icon: Brain,
      title: "Chấm Điểm Tự Động Bằng AI",
      description: "AI giúp chấm bài Writing và Speaking chính xác, phản hồi chi tiết ngay lập tức",
      color: "text-blue-600"
    },
    {
      icon: Headphones,
      title: "Luyện Nghe Hiệu Quả",
      description: "Hàng nghìn bài nghe từ dễ đến khó với phụ đề và giải thích chi tiết từ vựng",
      color: "text-green-600"
    },
    {
      icon: Sparkles,
      title: "Lộ Trình Học Cá Nhân Hóa",
      description: "Hệ thống tự động tạo lộ trình học tập phù hợp với trình độ và mục tiêu của bạn",
      color: "text-purple-600"
    },
    {
      icon: BarChart3,
      title: "Theo Dõi Tiến Độ",
      description: "Dashboard trực quan giúp bạn theo dõi điểm số và tiến độ học tập",
      color: "text-orange-600"
    },
    {
      icon: Users,
      title: "Cộng Đồng Học Tập",
      description: "Tham gia nhóm học, thảo luận đề bài và chia sẻ kinh nghiệm",
      color: "text-pink-600"
    },
    {
      icon: Award,
      title: "Chứng Chỉ Hoàn Thành",
      description: "Nhận chứng chỉ sau khi hoàn thành khóa học để chứng minh năng lực",
      color: "text-yellow-600"
    }
  ];

  const stats = [
    { value: "50K+", label: "Học Viên" },
    { value: "1000+", label: "Đề Thi" },
    { value: "4.8/5", label: "Đánh Giá" },
    { value: "24/7", label: "Hỗ Trợ" }
  ];

  const benefits = [
    "Học theo tốc độ riêng với lịch trình linh hoạt",
    "Truy cập vào đề thi IELTS và TOEIC thật",
    "Chương trình giảng dạy từ cơ bản đến nâng cao do chuyên gia thiết kế",
    "Bài tập tương tác với phản hồi ngay lập tức",
    "Nền tảng thân thiện với thiết bị di động, học mọi lúc mọi nơi",
    "Cập nhật thường xuyên với nội dung và tính năng mới"
  ];

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            Nền Tảng Học Tiếng Anh #1 Việt Nam
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Chinh Phục Tiếng Anh Với
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Thông Minh</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Nâng cao kỹ năng tiếng Anh với nền tảng toàn diện được thiết kế cho IELTS và TOEIC.
            Học hiệu quả với hàng nghìn đề thi thật và phương pháp học thông minh.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Bắt Đầu Học Ngay
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2 hover:border-blue-600 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Tính Năng Mạnh Mẽ Cho Học Tập Hiệu Quả
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Mọi thứ bạn cần để đạt được mục tiêu học tiếng Anh trong một nền tảng toàn diện
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-blue-600 transition-all hover:shadow-xl group">
                  <CardContent className="pt-6">
                    <div className={`${feature.color} mb-4 inline-flex p-3 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Tại Sao Chọn Nền Tảng Của Chúng Tôi?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center bg-slate-900 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn Sàng Bắt Đầu Hành Trình Học Tập?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn học viên thành công đã đạt được mục tiêu học tiếng Anh với nền tảng của chúng tôi
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8">
              Bắt Đầu Miễn Phí
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100 px-8">
              Xem Bảng Giá
            </Button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
