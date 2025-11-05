/**
 * 🇻🇳 Component hiển thị bảng giá các gói dịch vụ
 * 🇻🇳 Hiển thị các gói: Miễn phí, Premium, VIP với các tính năng và giá cả
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

// 🇻🇳 Danh sách các gói dịch vụ (trong thực tế sẽ lấy từ API)
const plans = [
  {
    name: "Miễn phí",
    price: "0đ",
    period: "/ tháng",
    description: "Dành cho người mới bắt đầu",
    features: [
      "50 đề thi thử",
      "Bài giảng cơ bản",
      "Cộng đồng học tập",
      "Theo dõi tiến độ cơ bản"
    ],
    cta: "Bắt đầu ngay",
    popular: false
  },
  {
    name: "Premium",
    price: "299,000đ",
    period: "/ tháng",
    description: "Phù hợp cho người học nghiêm túc",
    features: [
      "Không giới hạn đề thi",
      "Toàn bộ khóa học",
      "AI chấm bài tự động",
      "Lộ trình cá nhân hóa",
      "Hỗ trợ 24/7",
      "Chứng chỉ hoàn thành"
    ],
    cta: "Đăng ký Premium",
    popular: true
  },
  {
    name: "VIP",
    price: "799,000đ",
    period: "/ tháng",
    description: "Cam kết đạt điểm mục tiêu",
    features: [
      "Tất cả tính năng Premium",
      "Giáo viên 1-1 hàng tuần",
      "Chữa bài chi tiết",
      "Mock test không giới hạn",
      "Đảm bảo đầu ra",
      "Ưu tiên hỗ trợ"
    ],
    cta: "Liên hệ tư vấn",
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Bảng giá</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gói đề luyện thi IELTS và TOIEC
          </h2>
          <p className="text-lg text-gray-600">
            Đầu tư cho tương lai với mức giá hợp lý
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-blue-600 shadow-xl scale-105 md:scale-110'
                  : 'border-gray-200 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-6 py-1">
                    Phổ biến nhất
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-sm mb-4">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Tất cả các gói đều có <span className="font-semibold text-gray-900">7 ngày dùng thử miễn phí</span>
          </p>
          <p className="text-sm text-gray-500">
            Hủy bất cứ lúc nào. Không cần thẻ tín dụng khi dùng thử.
          </p>
        </div>
      </div>
    </section>
  );
}
