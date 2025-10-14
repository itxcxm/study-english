"use client";

import { BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { HeaderDash } from "@/components/views/HeaderDash";

const examTypes = [
  {
    id: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    description: "Chứng chỉ tiếng Anh quốc tế được công nhận rộng rãi cho du học và định cư",
    color: "from-red-500 to-orange-500",
    stats: [
      { label: "Đề thi", value: "120+" },
      { label: "Học viên", value: "15,000+" },
      { label: "Độ khó", value: "7.5/10" },
    ],
    features: [
      "Listening - 30 phút",
      "Reading - 60 phút",
      "Writing - 60 phút",
      "Speaking - 11-14 phút",
    ],
    link: "/dashboard/exam/ielts",
  },
  {
    id: "toeic",
    name: "TOEIC",
    fullName: "Test of English for International Communication",
    description: "Chứng chỉ tiếng Anh giao tiếp quốc tế dành cho môi trường làm việc",
    color: "from-blue-500 to-cyan-500",
    stats: [
      { label: "Đề thi", value: "100+" },
      { label: "Học viên", value: "12,000+" },
      { label: "Độ khó", value: "6.5/10" },
    ],
    features: [
      "Listening - 45 phút (100 câu)",
      "Reading - 75 phút (100 câu)",
      "Điểm tối đa: 990",
      "Thời gian: 2 giờ",
    ],
    link: "/dashboard/exam/toeic",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Đề thi chuẩn quốc tế",
    description: "Mô phỏng 100% cấu trúc và độ khó của đề thi thực tế",
  },
  {
    icon: Clock,
    title: "Luyện tập theo thời gian",
    description: "Đồng hồ đếm ngược giúp bạn làm quen với áp lực thời gian",
  },
  {
    icon: TrendingUp,
    title: "Theo dõi tiến độ",
    description: "Phân tích chi tiết kết quả và điểm yếu cần cải thiện",
  },
  {
    icon: BookOpen,
    title: "Giải thích chi tiết",
    description: "Đáp án kèm theo lời giải và kiến thức cần nhớ",
  },
];

export default function ExamPage() {
  return (
    <div>
      <HeaderDash />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            Luyện thi trực tuyến
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Luyện thi IELTS & TOEIC
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hệ thống đề thi chuẩn quốc tế, chấm điểm tự động, phân tích chi tiết.
            Luyện tập mọi lúc, mọi nơi với trải nghiệm thi thật.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {examTypes.map((exam) => (
            <Card key={exam.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center mb-4`}
                >
                  <span className="text-2xl font-bold text-white">
                    {exam.name}
                  </span>
                </div>
                <CardTitle className="text-2xl">{exam.fullName}</CardTitle>
                <CardDescription className="text-base">
                  {exam.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {exam.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Cấu trúc bài thi:
                  </h4>
                  {exam.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Link href={exam.link} className="w-full">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800" size="lg">
                    Bắt đầu luyện thi {exam.name}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
