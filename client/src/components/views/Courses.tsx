/**
 * 🇻🇳 Component hiển thị danh sách khóa học
 * 🇻🇳 Hiển thị các khóa học IELTS và TOEIC với thông tin chi tiết
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

// 🇻🇳 Dữ liệu mẫu các khóa học (trong thực tế sẽ lấy từ API)
const courses = [
  {
    id: 1,
    title: "IELTS Foundation",
    description: "Khóa học nền tảng dành cho người mới bắt đầu",
    level: "Cơ bản",
    students: "12,450",
    duration: "8 tuần",
    rating: "4.9",
    image: "bg-gradient-to-br from-blue-500 to-blue-600",
    target: "IELTS 5.0 - 6.0"
  },
  {
    id: 2,
    title: "IELTS Advanced",
    description: "Khóa học nâng cao cho mục tiêu band cao",
    level: "Nâng cao",
    students: "8,320",
    duration: "10 tuần",
    rating: "4.8",
    image: "bg-gradient-to-br from-green-500 to-green-600",
    target: "IELTS 7.0 - 8.5"
  },
  {
    id: 3,
    title: "TOEIC Listening & Reading",
    description: "Luyện thi TOEIC 2 kỹ năng hiệu quả",
    level: "Trung cấp",
    students: "15,680",
    duration: "6 tuần",
    rating: "4.9",
    image: "bg-gradient-to-br from-orange-500 to-orange-600",
    target: "TOEIC 700+"
  },
  {
    id: 4,
    title: "TOEIC 4 Skills",
    description: "Khóa học TOEIC 4 kỹ năng toàn diện",
    level: "Nâng cao",
    students: "6,940",
    duration: "12 tuần",
    rating: "4.7",
    image: "bg-gradient-to-br from-purple-500 to-purple-600",
    target: "TOEIC 900+"
  }
];

export function Courses() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Khóa học</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Khóa học phù hợp với mọi trình độ
          </h2>
          <p className="text-lg text-gray-600">
            Chọn khóa học phù hợp với mục tiêu và trình độ của bạn
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden">
              <div className={`h-32 ${course.image} flex items-center justify-center`}>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-1">{course.target}</div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {course.level}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{course.students} học viên</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}/5.0</span>
                  </div>
                </div>

                <Button className="w-full group-hover:bg-blue-600 transition-colors" variant="outline">
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            <Link href="/courses">Xem tất cả khóa học</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
