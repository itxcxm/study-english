"use client";

// Các import thư viện và component cần thiết
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, TrendingUp, Target, Award } from "lucide-react";
import { HeaderDash } from "@/components/views/HeaderDash"

// Định nghĩa interface cho dữ liệu thống kê học tập
interface StudyStats {
  totalWords: number;
  masteredWords: number;
  studyStreak: number;
  weeklyProgress: number;
  totalStudyTime: number;
}

export default function DashboardPage() {
  // State lưu trữ thống kê học tập
  const [stats, setStats] = useState<StudyStats>({
    totalWords: 0,
    masteredWords: 0,
    studyStreak: 0,
    weeklyProgress: 0,
    totalStudyTime: 0,
  });

  // useEffect để giả lập việc fetch dữ liệu từ server khi component mount
  useEffect(() => {
    setStats({
      totalWords: 1250,
      masteredWords: 485,
      studyStreak: 12,
      weeklyProgress: 68,
      totalStudyTime: 145,
    });
  }, []);

  // Tính phần trăm tiến độ học tập tổng thể
  const progressPercentage = stats.totalWords > 0
    ? Math.round((stats.masteredWords / stats.totalWords) * 100)
    : 0;

  return (
    <div>
      {/* Header của trang dashboard */}
      <HeaderDash/>
      <div className="container mx-auto p-6 space-y-8">

        {/* Các thẻ Card hiển thị tổng quan số liệu */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Tổng từ vựng */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng từ vựng</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWords}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.masteredWords} đã thuộc
              </p>
            </CardContent>
          </Card>

          {/* Chuỗi học tập */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chuỗi học tập</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.studyStreak} ngày</div>
              <p className="text-xs text-muted-foreground mt-1">
                Tiếp tục phát huy!
              </p>
            </CardContent>
          </Card>

          {/* Thời gian học */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thời gian học</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudyTime} phút</div>
              <p className="text-xs text-muted-foreground mt-1">
                Tuần này
              </p>
            </CardContent>
          </Card>

          {/* Mục tiêu tuần */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mục tiêu tuần</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weeklyProgress}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Đúng tiến độ
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tiến độ học tập & Thành tích gần đây */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Card tiến độ học tập tổng thể */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Tiến độ học tập</CardTitle>
              <CardDescription>
                Hành trình chinh phục từ vựng của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Thanh tiến độ tổng thể */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="font-medium">Tiến độ tổng thể</span>
                  <span className="text-muted-foreground">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Danh sách các cấp độ */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Trình độ Sơ cấp</span>
                  </div>
                  <Badge variant="secondary">Hoàn thành</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Trình độ Trung cấp</span>
                  </div>
                  <Badge>Đang học</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Trình độ Nâng cao</span>
                  </div>
                  <Badge variant="outline">Chưa mở</Badge>
                </div>
              </div>

              {/* Nút tiếp tục học */}
              <Button className="w-full mt-4">Tiếp tục học</Button>
            </CardContent>
          </Card>

          {/* Card thành tích gần đây */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Thành tích gần đây</CardTitle>
              <CardDescription>
                Các cột mốc mới nhất của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Thành tích: Chiến binh tuần */}
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/20 p-2">
                  <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Chiến binh tuần</p>
                  <p className="text-xs text-muted-foreground">
                    Học 7 ngày liên tục
                  </p>
                </div>
              </div>

              {/* Thành tích: Bậc thầy từ vựng */}
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-2">
                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Bậc thầy từ vựng</p>
                  <p className="text-xs text-muted-foreground">
                    Đã thuộc 500 từ
                  </p>
                </div>
              </div>

              {/* Thành tích: Học siêu tốc */}
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2">
                  <Target className="h-4 w-4 text-green-600 dark:text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Học siêu tốc</p>
                  <p className="text-xs text-muted-foreground">
                    100% chính xác tuần này
                  </p>
                </div>
              </div>

              {/* Nút xem tất cả thành tích */}
              <Button variant="outline" className="w-full mt-4">
                Xem tất cả thành tích
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs thống kê hoạt động hằng ngày/tuần/tháng */}
        <Tabs defaultValue="daily" className="w-full">
          <TabsList>
            <TabsTrigger value="daily">Hoạt động hàng ngày</TabsTrigger>
            <TabsTrigger value="weekly">Thống kê tuần</TabsTrigger>
            <TabsTrigger value="monthly">Tổng kết tháng</TabsTrigger>
          </TabsList>
          {/* Tab hoạt động hàng ngày */}
          <TabsContent value="daily" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động hôm nay</CardTitle>
                <CardDescription>Tiến độ của bạn trong ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Số từ đã ôn tập hôm nay */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Từ đã ôn tập</span>
                    <span className="text-sm font-medium">24 / 30</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: '80%' }}
                    />
                  </div>
                  {/* Thời gian học hôm nay */}
                  <div className="flex justify-between items-center mb-2 mt-4">
                    <span className="text-sm">Thời gian học</span>
                    <span className="text-sm font-medium">23 / 30 phút</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: '76%' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Tab thống kê tuần */}
          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất tuần này</CardTitle>
                <CardDescription>Tóm tắt tiến độ trong tuần</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Từ đã học</span>
                    <span className="text-sm font-medium">156 từ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Buổi học</span>
                    <span className="text-sm font-medium">12 buổi</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Độ chính xác trung bình</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Tab tổng kết tháng */}
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tổng quan tháng</CardTitle>
                <CardDescription>Thành tích của bạn trong tháng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tổng từ đã thuộc</span>
                    <span className="text-sm font-medium">485 từ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tổng thời gian học</span>
                    <span className="text-sm font-medium">8.5 giờ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Thành tích đạt được</span>
                    <span className="text-sm font-medium">7 thành tích</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
