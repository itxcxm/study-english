"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderDash } from "@/components/views/HeaderDash";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  PlayCircle,
  Trophy,
  Calendar,
  TrendingUp,
  BarChart3,
} from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  nextLesson: string;
  level: string;
  instructor: string;
  estimatedTimeLeft: string;
  status: "in-progress" | "completed" | "not-started";
}

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-blue-100 text-blue-700 border-blue-200",
  Advanced: "bg-orange-100 text-orange-700 border-orange-200",
};

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setCourses([
      {
        id: 1,
        title: "English for Beginners",
        description: "Khóa học dành cho người mới bắt đầu học tiếng Anh",
        progress: 65,
        totalLessons: 24,
        completedLessons: 16,
        lastAccessed: "2 giờ trước",
        nextLesson: "Unit 17: Present Continuous Tense",
        level: "Beginner",
        instructor: "Sarah Johnson",
        estimatedTimeLeft: "2 tuần",
        status: "in-progress",
      },
      {
        id: 2,
        title: "Intermediate English",
        description: "Nâng cao kỹ năng tiếng Anh của bạn",
        progress: 30,
        totalLessons: 32,
        completedLessons: 10,
        lastAccessed: "1 ngày trước",
        nextLesson: "Unit 11: Conditional Sentences",
        level: "Intermediate",
        instructor: "Michael Chen",
        estimatedTimeLeft: "5 tuần",
        status: "in-progress",
      },
      {
        id: 3,
        title: "Business English Mastery",
        description: "Tiếng Anh chuyên nghiệp cho công việc",
        progress: 100,
        totalLessons: 20,
        completedLessons: 20,
        lastAccessed: "1 tuần trước",
        nextLesson: "Hoàn thành",
        level: "Advanced",
        instructor: "David Brown",
        estimatedTimeLeft: "Đã hoàn thành",
        status: "completed",
      },
      {
        id: 4,
        title: "IELTS Preparation Course",
        description: "Chuẩn bị cho kỳ thi IELTS",
        progress: 0,
        totalLessons: 40,
        completedLessons: 0,
        lastAccessed: "Chưa bắt đầu",
        nextLesson: "Unit 1: Introduction to IELTS",
        level: "Advanced",
        instructor: "Emma Wilson",
        estimatedTimeLeft: "8 tuần",
        status: "not-started",
      },
    ]);
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (activeTab === "all") return true;
    if (activeTab === "in-progress") return course.status === "in-progress";
    if (activeTab === "completed") return course.status === "completed";
    return true;
  });

  const stats = {
    totalCourses: courses.length,
    inProgress: courses.filter((c) => c.status === "in-progress").length,
    completed: courses.filter((c) => c.status === "completed").length,
    totalLessonsCompleted: courses.reduce((sum, c) => sum + c.completedLessons, 0),
  };

  return (
    <div>
      <HeaderDash />
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">Khóa Học Của Tôi</h1>
          <p className="text-muted-foreground">
            Theo dõi tiến độ học tập và tiếp tục hành trình của bạn
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng khóa học</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground mt-1">Khóa học đã đăng ký</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đang học</CardTitle>
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground mt-1">Khóa học đang tiến hành</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground mt-1">Khóa học đã hoàn thành</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bài học</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLessonsCompleted}</div>
              <p className="text-xs text-muted-foreground mt-1">Bài học đã hoàn thành</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả ({courses.length})</TabsTrigger>
            <TabsTrigger value="in-progress">
              Đang học ({stats.inProgress})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Hoàn thành ({stats.completed})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Không có khóa học nào</h3>
                  <p className="text-muted-foreground mb-4">
                    Bạn chưa có khóa học nào trong danh mục này
                  </p>
                  <Button>Khám phá khóa học</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          className={levelColors[course.level]}
                          variant="outline"
                        >
                          {course.level}
                        </Badge>
                        {course.status === "completed" && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Hoàn thành
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tiến độ</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {course.completedLessons} / {course.totalLessons} bài học
                          </span>
                          {course.status !== "completed" && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.estimatedTimeLeft}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Truy cập: {course.lastAccessed}</span>
                        </div>
                        {course.status !== "completed" && (
                          <div className="flex items-center gap-2 text-sm">
                            <PlayCircle className="h-4 w-4 text-primary" />
                            <span className="font-medium">{course.nextLesson}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        {course.status === "not-started" ? (
                          <Button className="flex-1">Bắt đầu học</Button>
                        ) : course.status === "completed" ? (
                          <>
                            <Button variant="outline" className="flex-1">
                              Xem lại
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <Trophy className="h-4 w-4 mr-2" />
                              Chứng chỉ
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button className="flex-1">Tiếp tục học</Button>
                            <Button variant="outline" className="flex-1">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Chi tiết
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col md:flex-row items-center justify-between py-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Khám phá thêm khóa học</h3>
                <p className="text-sm text-muted-foreground">
                  Mở rộng kiến thức với hơn 50+ khóa học chất lượng
                </p>
              </div>
            </div>
            <Button size="lg">Xem tất cả khóa học</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
