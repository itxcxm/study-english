/**
 * 🇻🇳 Component hiển thị các tính năng chính của nền tảng
 * 🇻🇳 Giới thiệu các tính năng nổi bật như AI chấm bài, luyện nghe, lộ trình cá nhân hóa, v.v.
 */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Headphones, Target, BarChart3, MessageSquare, Award } from "lucide-react";

// 🇻🇳 Danh sách các tính năng chính của nền tảng
const features = [
  {
    icon: Brain,
    title: "AI Chấm bài tự động",
    description: "Công nghệ AI giúp chấm bài Writing và Speaking chính xác, phản hồi chi tiết ngay lập tức",
    color: "text-blue-600 bg-blue-50"
  },
  {
    icon: Headphones,
    title: "Luyện nghe hiệu quả",
    description: "Hàng nghìn bài nghe từ dễ đến khó với phụ đề và giải thích chi tiết từ vựng",
    color: "text-green-600 bg-green-50"
  },
  {
    icon: Target,
    title: "Lộ trình cá nhân hóa",
    description: "Hệ thống tự động tạo lộ trình học tập phù hợp với trình độ và mục tiêu của bạn",
    color: "text-orange-600 bg-orange-50"
  },
  {
    icon: BarChart3,
    title: "Theo dõi tiến độ",
    description: "Dashboard trực quan giúp bạn theo dõi điểm số và tiến độ học tập theo thời gian",
    color: "text-purple-600 bg-purple-50"
  },
  {
    icon: MessageSquare,
    title: "Cộng đồng học tập",
    description: "Tham gia nhóm học, thảo luận đề bài và chia sẻ kinh nghiệm với hàng nghìn học viên",
    color: "text-pink-600 bg-pink-50"
  },
  {
    icon: Award,
    title: "Chứng chỉ hoàn thành",
    description: "Nhận chứng chỉ sau khi hoàn thành khóa học để chứng minh năng lực của bạn",
    color: "text-teal-600 bg-teal-50"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">Tính năng</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Học tập thông minh với công nghệ hiện đại
          </h2>
          <p className="text-lg text-gray-600">
            Trải nghiệm học tiếng Anh với các tính năng vượt trội
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="pt-8 pb-8">
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
