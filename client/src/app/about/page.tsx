"use client";

import { Target, Lightbulb, Heart, TrendingUp, Users2, Globe2, BookOpen, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/views/Header";
import { Footer } from "@/components/views/Footer";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Sứ Mệnh",
      description: "Mang đến phương pháp học tiếng Anh hiệu quả và dễ tiếp cận cho mọi người Việt Nam, giúp họ tự tin chinh phục các kỳ thi quốc tế và mở rộng cơ hội nghề nghiệp.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Lightbulb,
      title: "Tầm Nhìn",
      description: "Trở thành nền tảng học tiếng Anh hàng đầu Việt Nam, tiên phong trong việc ứng dụng công nghệ AI để cá nhân hóa trải nghiệm học tập cho từng học viên.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Heart,
      title: "Giá Trị Cốt Lõi",
      description: "Cam kết chất lượng, đổi mới không ngừng, lấy học viên làm trung tâm và xây dựng cộng đồng học tập tích cực, hỗ trợ lẫn nhau.",
      color: "bg-pink-50 text-pink-600"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Thành Lập",
      description: "Ra mắt nền tảng với 100 đề thi và 500 học viên đầu tiên"
    },
    {
      year: "2021",
      title: "Phát Triển AI",
      description: "Tích hợp công nghệ AI chấm điểm tự động cho Writing và Speaking"
    },
    {
      year: "2022",
      title: "Mở Rộng",
      description: "Đạt mốc 10,000 học viên và 500 đề thi IELTS, TOEIC"
    },
    {
      year: "2023",
      title: "Đổi Mới",
      description: "Ra mắt tính năng lộ trình học cá nhân hóa và cộng đồng học tập"
    },
    {
      year: "2024",
      title: "Dẫn Đầu",
      description: "Vượt 50,000 học viên, trở thành nền tảng #1 Việt Nam"
    }
  ];

  const team = [
    {
      icon: GraduationCap,
      title: "Đội Ngũ Giáo Viên",
      count: "50+",
      description: "Giáo viên có chứng chỉ quốc tế và kinh nghiệm giảng dạy"
    },
    {
      icon: Users2,
      title: "Đội Ngũ Kỹ Thuật",
      count: "30+",
      description: "Chuyên gia công nghệ và AI phát triển nền tảng"
    },
    {
      icon: BookOpen,
      title: "Đội Ngũ Nội Dung",
      count: "20+",
      description: "Biên tập viên và chuyên gia xây dựng bài giảng"
    }
  ];

  const achievements = [
    "Hơn 50,000 học viên tin tưởng và đồng hành",
    "1,000+ đề thi IELTS và TOEIC chất lượng cao",
    "Đánh giá 4.8/5 sao từ học viên",
    "85% học viên đạt mục tiêu điểm số",
    "Hỗ trợ học viên 24/7 qua nhiều kênh",
    "Cập nhật nội dung mới hàng tuần"
  ];

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            Về Chúng Tôi
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Câu Chuyện Của
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Chúng Tôi</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Khởi đầu từ ước mơ giúp người Việt học tiếng Anh hiệu quả hơn, chúng tôi đã xây dựng một nền tảng
            kết hợp công nghệ AI tiên tiến với phương pháp giảng dạy chuyên nghiệp.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="border-2 hover:border-blue-600 transition-all hover:shadow-xl">
                <CardContent className="pt-6">
                  <div className={`${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Hành Trình Phát Triển
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Từ những ngày đầu khởi nghiệp đến nay, chúng tôi không ngừng cải tiến để mang đến trải nghiệm học tập tốt nhất
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="border-2 hover:border-blue-600 transition-all hover:shadow-lg">
                      <CardHeader>
                        <Badge className="w-fit bg-blue-600 text-white mb-2">
                          {milestone.year}
                        </Badge>
                        <CardTitle className="text-xl">{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center text-white font-bold z-10 flex-shrink-0">
                    {index + 1}
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Đội Ngũ Chuyên Nghiệp
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Đội ngũ giàu kinh nghiệm luôn đồng hành cùng bạn trên hành trình chinh phục tiếng Anh
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <Card key={index} className="text-center border-2 hover:border-blue-600 transition-all hover:shadow-xl">
                  <CardContent className="pt-8">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{member.count}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{member.title}</h3>
                    <p className="text-slate-600">{member.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="h-12 w-12" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Thành Tựu Của Chúng Tôi
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Globe2 className="h-4 w-4" />
                  </div>
                  <p className="font-medium">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center bg-slate-900 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cùng Nhau Tiến Xa Hơn
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi đồng hành cùng bạn trên con đường chinh phục tiếng Anh.
            Bắt đầu ngay hôm nay để thấy sự khác biệt!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Khám Phá Khóa Học
            </Button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
