"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Target, Trophy, GraduationCap, FileText, Brain, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/views/Header";
import { Footer } from "@/components/views/Footer";
const practiceTests = [
  {
    id: "ielts",
    title: "IELTS Practice Tests",
    titleVi: "Đề Luyện Tập IELTS",
    description: "Luyện tập với các đề thi IELTS thực tế bao gồm Reading, Writing, Listening và Speaking",
    icon: GraduationCap,
    color: "bg-blue-500",
    tests: [
      { name: "IELTS Reading", count: 50, duration: "60 phút" },
      { name: "IELTS Writing", count: 30, duration: "60 phút" },
      { name: "IELTS Listening", count: 40, duration: "30 phút" },
      { name: "IELTS Speaking", count: 25, duration: "15 phút" }
    ],
    level: "Intermediate - Advanced",
    totalTests: 145
  },
  {
    id: "toeic",
    title: "TOEIC Practice Tests",
    titleVi: "Đề Luyện Tập TOEIC",
    description: "Bộ đề thi thử TOEIC chuẩn format với Reading và Listening giúp bạn đạt điểm cao",
    icon: FileText,
    color: "bg-green-500",
    tests: [
      { name: "TOEIC Reading", count: 60, duration: "75 phút" },
      { name: "TOEIC Listening", count: 55, duration: "45 phút" },
      { name: "TOEIC Full Test", count: 40, duration: "120 phút" }
    ],
    level: "All Levels",
    totalTests: 155
  },
  {
    id: "grammar",
    title: "Grammar Practice",
    titleVi: "Luyện Ngữ Pháp",
    description: "Hệ thống bài tập ngữ pháp từ cơ bản đến nâng cao với giải thích chi tiết",
    icon: BookOpen,
    color: "bg-purple-500",
    tests: [
      { name: "Tenses", count: 80, duration: "Không giới hạn" },
      { name: "Conditionals", count: 45, duration: "Không giới hạn" },
      { name: "Modal Verbs", count: 50, duration: "Không giới hạn" },
      { name: "Passive Voice", count: 40, duration: "Không giới hạn" }
    ],
    level: "Beginner - Advanced",
    totalTests: 215
  },
  {
    id: "vocabulary",
    title: "Vocabulary Builder",
    titleVi: "Luyện Từ Vựng",
    description: "Mở rộng vốn từ vựng với các chủ đề đa dạng và phương pháp học hiệu quả",
    icon: Brain,
    color: "bg-orange-500",
    tests: [
      { name: "Academic Words", count: 100, duration: "Không giới hạn" },
      { name: "Business English", count: 75, duration: "Không giới hạn" },
      { name: "Daily Conversation", count: 90, duration: "Không giới hạn" },
      { name: "Idioms & Phrases", count: 60, duration: "Không giới hạn" }
    ],
    level: "All Levels",
    totalTests: 325
  }
];

const features = [
  {
    icon: Target,
    title: "Đề Thi Chuẩn",
    description: "Các đề thi được biên soạn theo format chính thức của IELTS và TOEIC"
  },
  {
    icon: Clock,
    title: "Tính Giờ Tự Động",
    description: "Hệ thống đếm ngược thời gian giống thi thật giúp bạn quản lý thời gian tốt hơn"
  },
  {
    icon: Trophy,
    title: "Chấm Điểm Tức Thì",
    description: "Nhận kết quả và giải thích chi tiết ngay sau khi hoàn thành bài thi"
  },
  {
    icon: MessageSquare,
    title: "Giải Thích Chi Tiết",
    description: "Mỗi câu trả lời đều có lời giải chi tiết giúp bạn hiểu rõ kiến thức"
  }
];

export default function PracticePage() {
  return (
    <div>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 mt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-700 hover:bg-teal-200">
              Luyện Tập Miễn Phí
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Bộ Đề Thi Thử Tiếng Anh
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Hệ thống luyện thi toàn diện với hơn 800+ bài tập và đề thi thử IELTS, TOEIC,
              ngữ pháp và từ vựng. Luyện tập mọi lúc mọi nơi với giải thích chi tiết.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {practiceTests.map((test) => (
              <Card key={test.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${test.color} bg-opacity-10`}>
                      <test.icon className={`w-8 h-8 ${test.color.replace('bg-', 'text-')}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {test.totalTests} bài thi
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{test.titleVi}</CardTitle>
                  <CardDescription className="text-sm text-slate-600">
                    {test.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {test.tests.map((subTest, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${test.color}`} />
                          <span className="font-medium text-sm text-slate-700">
                            {subTest.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{subTest.count} đề</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {subTest.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="text-sm">
                      <span className="text-slate-500">Trình độ: </span>
                      <span className="font-semibold text-slate-700">{test.level}</span>
                    </div>
                    <Button
                      className={`${test.color} hover:opacity-90 text-white`}
                      asChild
                    >
                      <Link href={`/dashboard/review/${test.id}`}>
                        Bắt Đầu Luyện Tập
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Tại Sao Chọn Luyện Tập Với Chúng Tôi?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Phương pháp học tập hiệu quả với công nghệ hiện đại
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <feature.icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn Sàng Chinh Phục Mục Tiêu?
            </h2>
            <p className="text-lg mb-8 text-teal-50 max-w-2xl mx-auto">
              Bắt đầu hành trình học tập của bạn ngay hôm nay.
              Luyện tập đều đặn là chìa khóa dẫn đến thành công!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-teal-600 hover:bg-slate-100"
                asChild
              >
                <Link href="/dashboard/exam">
                  Làm Đề Thi IELTS
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-teal-600 hover:bg-slate-100"
                asChild
              >
                <Link href="/dashboard/exam">
                  Làm Đề Thi TOIEC
                </Link>
              </Button>

            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
}
