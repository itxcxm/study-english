"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderDash } from "@/components/views/HeaderDash";
import {
  BookOpen,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Play,
  Sparkles,
  BrainCircuit,
} from "lucide-react";

interface ReviewItem {
  id: number;
  word: string;
  translation: string;
  level: string;
  lastReviewed: string;
  nextReview: string;
  masteryLevel: number;
  reviewCount: number;
}

interface ReviewSession {
  totalWords: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number;
  accuracy: number;
}

export default function ReviewPage() {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [dueForReview, setDueForReview] = useState(0);
  const [todayReviewed, setTodayReviewed] = useState(0);
  const [reviewStreak, setReviewStreak] = useState(0);
  const [currentSession, setCurrentSession] = useState<ReviewSession>({
    totalWords: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    timeSpent: 0,
    accuracy: 0,
  });
  useEffect(() => {
    setReviewItems([
      {
        id: 1,
        word: "Accomplish",
        translation: "Hoàn thành, đạt được",
        level: "Intermediate",
        lastReviewed: "2 giờ trước",
        nextReview: "Hôm nay",
        masteryLevel: 65,
        reviewCount: 8,
      },
      {
        id: 2,
        word: "Perseverance",
        translation: "Sự kiên trì",
        level: "Advanced",
        lastReviewed: "1 ngày trước",
        nextReview: "Hôm nay",
        masteryLevel: 45,
        reviewCount: 5,
      },
      {
        id: 3,
        word: "Emphasize",
        translation: "Nhấn mạnh",
        level: "Intermediate",
        lastReviewed: "3 giờ trước",
        nextReview: "Mai",
        masteryLevel: 80,
        reviewCount: 12,
      },
      {
        id: 4,
        word: "Fundamental",
        translation: "Cơ bản, căn bản",
        level: "Beginner",
        lastReviewed: "5 giờ trước",
        nextReview: "Hôm nay",
        masteryLevel: 90,
        reviewCount: 15,
      },
      {
        id: 5,
        word: "Distinguish",
        translation: "Phân biệt",
        level: "Advanced",
        lastReviewed: "1 ngày trước",
        nextReview: "2 ngày nữa",
        masteryLevel: 55,
        reviewCount: 6,
      },
    ]);

    setDueForReview(24);
    setTodayReviewed(18);
    setReviewStreak(7);

    setCurrentSession({
      totalWords: 18,
      correctAnswers: 15,
      wrongAnswers: 3,
      timeSpent: 12,
      accuracy: 83,
    });
  }, []);

  const levelColors: Record<string, string> = {
    Beginner: "bg-green-100 text-green-700 border-green-200",
    Intermediate: "bg-blue-100 text-blue-700 border-blue-200",
    Advanced: "bg-orange-100 text-orange-700 border-orange-200",
  };

  const getMasteryColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-blue-500";
    if (level >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div>
      <HeaderDash />
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">Ôn Tập</h1>
          <p className="text-muted-foreground">
            Củng cố kiến thức và nâng cao trình độ tiếng Anh của bạn
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Tất cả ({reviewItems.length})</TabsTrigger>
            <TabsTrigger value="due">Cần ôn hôm nay</TabsTrigger>
            <TabsTrigger value="mastered">Đã thuộc</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {reviewItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">{item.word}</h3>
                          <Badge
                            className={levelColors[item.level]}
                            variant="outline"
                          >
                            {item.level}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{item.translation}</p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Độ thành thạo
                            </span>
                            <span className="font-medium">
                              {item.masteryLevel}%
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className={`${getMasteryColor(
                                item.masteryLevel
                              )} h-2 rounded-full transition-all`}
                              style={{ width: `${item.masteryLevel}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Ôn lần cuối: {item.lastReviewed}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" />
                            <span>Ôn tiếp: {item.nextReview}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{item.reviewCount} lần ôn</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button size="sm">Ôn tập</Button>
                        <Button size="sm" variant="outline">
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="due" className="space-y-4 mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Clock className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {dueForReview} từ cần ôn tập hôm nay
                </h3>
                <p className="text-muted-foreground mb-4">
                  Bắt đầu phiên ôn tập để củng cố kiến thức
                </p>
                <Button size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Bắt đầu ôn tập
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mastered" className="space-y-4 mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Award className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Từ đã thành thạo</h3>
                <p className="text-muted-foreground mb-4">
                  Các từ bạn đã thuộc trên 80%
                </p>
                <Button size="lg" variant="outline">
                  Xem danh sách
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col md:flex-row items-center justify-between py-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <BrainCircuit className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Mẹo ôn tập hiệu quả</h3>
                <p className="text-sm text-muted-foreground">
                  Ôn tập đều đặn mỗi ngày 15-20 phút để ghi nhớ tốt hơn
                </p>
              </div>
            </div>
            <Button size="lg" variant="outline">
              Tìm hiểu thêm
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
