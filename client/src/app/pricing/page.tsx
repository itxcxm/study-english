"use client";

import { Check, X, Zap, Crown, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/views/Footer";
import { Header } from "@/components/views/Header";

const packages = [
  {
    id: "free",
    name: "Miễn Phí",
    price: "0đ",
    period: "mãi mãi",
    description: "Phù hợp cho người mới bắt đầu",
    icon: Gift,
    color: "from-gray-500 to-gray-600",
    features: [
      { text: "5 đề thi IELTS thử nghiệm", included: true },
      { text: "3 đề thi TOEIC thử nghiệm", included: true },
      { text: "Chấm điểm tự động cơ bản", included: true },
      { text: "Xem đáp án sau khi làm bài", included: true },
      { text: "Từ vựng cơ bản", included: true },
      { text: "Giải thích chi tiết", included: false },
      { text: "Luyện tập Speaking & Writing", included: false },
      { text: "Phân tích điểm yếu cá nhân", included: false },
      { text: "Hỗ trợ từ giáo viên", included: false },
    ],
    cta: "Bắt đầu miễn phí",
    popular: false,
  },
  {
    id: "vip",
    name: "VIP",
    price: "299,000đ",
    period: "tháng",
    description: "Lựa chọn phổ biến nhất",
    icon: Zap,
    color: "from-blue-500 to-blue-600",
    features: [
      { text: "50 đề thi IELTS đầy đủ", included: true },
      { text: "50 đề thi TOEIC đầy đủ", included: true },
      { text: "Chấm điểm tự động nâng cao", included: true },
      { text: "Giải thích chi tiết từng câu hỏi", included: true },
      { text: "Luyện tập Speaking với AI", included: true },
      { text: "Chấm Writing tự động", included: true },
      { text: "Phân tích điểm yếu cá nhân", included: true },
      { text: "Kho từ vựng theo chủ đề", included: true },
      { text: "Hỗ trợ từ giáo viên", included: false },
    ],
    cta: "Chọn gói VIP",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "799,000đ",
    period: "tháng",
    description: "Chuẩn bị chuyên nghiệp nhất",
    icon: Crown,
    color: "from-amber-500 to-amber-600",
    features: [
      { text: "Không giới hạn đề thi IELTS & TOEIC", included: true },
      { text: "Chấm điểm chi tiết theo tiêu chí", included: true },
      { text: "Luyện Speaking 1-1 với AI nâng cao", included: true },
      { text: "Chấm Writing chi tiết theo tiêu chí", included: true },
      { text: "Lộ trình học cá nhân hóa", included: true },
      { text: "Phân tích điểm yếu chuyên sâu", included: true },
      { text: "Kho tài liệu Premium độc quyền", included: true },
      { text: "Hỗ trợ trực tiếp từ giáo viên", included: true },
      { text: "Đảm bảo tăng 1.0 điểm IELTS", included: true },
    ],
    cta: "Chọn gói Premium",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Chọn gói học phù hợp với bạn
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Luyện thi IELTS & TOEIC hiệu quả với các gói học linh hoạt.
            Bắt đầu miễn phí hoặc nâng cấp để truy cập đầy đủ tính năng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Card
                key={pkg.id}
                className={`relative flex flex-col ${
                  pkg.popular
                    ? "border-blue-500 border-2 shadow-xl scale-105"
                    : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      Phổ biến nhất
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-base">
                    {pkg.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {pkg.price}
                    </span>
                    <span className="text-gray-600">/{pkg.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-gray-700"
                              : "text-gray-400"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    size="lg"
                  >
                    {pkg.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Mọi gói đều bao gồm: Cập nhật đề thi mới liên tục • Luyện tập trên mọi thiết bị • Bảo mật dữ liệu tuyệt đối
          </p>
          <p className="text-sm text-gray-500">
            Bạn cần tư vấn?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
    <Footer />      
    </div>
  );
}
