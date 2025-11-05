"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Home, TrendingUp, BookOpen, ArrowLeft } from "lucide-react";
import { translateTopic } from "@/utils/topicTranslations";

export default function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "1");
  const type = searchParams.get("type") || "";
  const topic = searchParams.get("topic") || "";

  const percentage = Math.round((score / total) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Xuất sắc! 🌟";
    if (percentage >= 70) return "Tốt lắm! 👏";
    if (percentage >= 50) return "Khá đấy! 💪";
    return "Cần cố gắng thêm! 📚";
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const handleRestart = () => {
    router.push(`/dashboard/review/practice?topic=${topic}`);
  };

  const handleBackToReview = () => {
    router.push("/dashboard/review");
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <nav className="flex items-center space-x-2 text-sm text-slate-600">
        <Button variant="ghost" size="sm" onClick={handleBackToDashboard} className="gap-1 p-1 h-auto">
          <Home className="h-3 w-3" />
          Trang chủ
        </Button>
        <span>/</span>
        <Button variant="ghost" size="sm" onClick={handleBackToReview} className="gap-1 p-1 h-auto">
          <BookOpen className="h-3 w-3" />
          Ôn tập
        </Button>
        <span>/</span>
        <span className="text-slate-900 font-medium">
          Kết quả - {type === "vocabulary" ? "Từ vựng" : "Ngữ pháp"} - {translateTopic(topic)}
        </span>
      </nav>

      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full">
              <Trophy className="h-16 w-16 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-3xl">Hoàn thành!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center space-y-4">
            <div className={`text-5xl font-bold ${getPerformanceColor()}`}>
              {score}/{total}
            </div>
            <p className="text-xl text-slate-600">{getPerformanceMessage()}</p>
            <div className="max-w-md mx-auto space-y-2">
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-sm text-slate-500">Độ chính xác: {percentage}%</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-slate-600">Câu đúng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{total - score}</div>
              <div className="text-sm text-slate-600">Câu sai</div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={handleRestart} className="w-full gap-2" size="lg">
              <RotateCcw className="h-4 w-4" />
              Làm lại bài này
            </Button>
            <Button onClick={handleBackToReview} variant="outline" className="w-full gap-2" size="lg">
              <TrendingUp className="h-4 w-4" />
              Chọn bài khác
            </Button>
            <div className="flex gap-2">
              <Button onClick={handleBackToDashboard} variant="ghost" className="flex-1 gap-2" size="lg">
                <Home className="h-4 w-4" />
                Về trang chủ
              </Button>
              <Button onClick={() => router.push("/dashboard/review")} variant="ghost" className="flex-1 gap-2" size="lg">
                <ArrowLeft className="h-4 w-4" />
                Về ôn tập
              </Button>
            </div>
          </div>

          {percentage < 70 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Gợi ý:</strong> Hãy xem lại phần giải thích sau mỗi câu hỏi để hiểu rõ hơn về lỗi sai của bạn.
                Luyện tập thường xuyên sẽ giúp bạn cải thiện kết quả!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


