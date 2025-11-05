"use client";

// Import React hooks và Next.js navigation
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Import UI components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";


// Import icons từ Lucide React
import { ArrowLeft, CheckCircle2, XCircle, SkipForward, Home, BookOpen } from "lucide-react";

// Import utilities
import { cn } from "@/lib/utils";
import { translateTopic, normalizeTopicKey } from "@/utils/topicTranslations";
import api from "@/lib/api";

// Kiểu dữ liệu câu hỏi lấy từ server
type Question = {
  id?: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
};

/**
 * Component trang luyện tập câu hỏi
 * Hiển thị câu hỏi theo từng bước và xử lý logic trả lời
 */
function PracticeContent() {
  // Lấy tham số từ URL
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "";      // Loại câu hỏi: vocabulary | grammar | verbenses (UI)
  const topic = searchParams.get("topic") || "";   // Chủ đề cụ thể

  // State quản lý dữ liệu và trạng thái
  const [questions, setQuestions] = useState<Question[]>([]);        // Danh sách câu hỏi
  const [currentIndex, setCurrentIndex] = useState(0);               // Index câu hỏi hiện tại
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Đáp án đã chọn
  const [showFeedback, setShowFeedback] = useState(false);          // Hiển thị kết quả
  const [isCorrect, setIsCorrect] = useState(false);                 // Đáp án có đúng không
  const [score, setScore] = useState(0);                            // Điểm số hiện tại

  // Load câu hỏi khi component mount hoặc tham số thay đổi
  useEffect(() => {
    let isCancelled = false;

    async function fetchQuestions() {
      // Normalize topic from URL format (kebab-case) to server format (PascalCase)
      const serverTopic = normalizeTopicKey(topic);
      
      try {
        // Use the configured axios instance which handles authentication and token refresh
        // The base URL is automatically configured via environment variables
        const response = await api.get("/review", {
          params: { topic: serverTopic },
        });
        
        // Server returns { success: true, topic: "...", count: 20, data: [...] }
        const data: Question[] = Array.isArray(response.data?.data) ? response.data.data : [];
        if (!isCancelled) setQuestions(data);
      } catch (err: any) {
        if (!isCancelled) {
          setQuestions([]);
          // Log detailed error for debugging
          // eslint-disable-next-line no-console
          console.error("Failed to fetch practice questions:", {
            error: err?.response?.data?.message || err?.message || String(err),
            status: err?.response?.status,
            topic,
            serverTopic,
          });
        }
      }
    }

    fetchQuestions();
    return () => {
      isCancelled = true;
    };
  }, [type, topic]);

  // Hiển thị loading nếu chưa có câu hỏi
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-600">Đang tải câu hỏi...</p>
      </div>
    );
  }

  // Lấy câu hỏi hiện tại và tính phần trăm tiến độ
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Xử lý khi người dùng chọn đáp án
  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;  // Không cho chọn nếu đã hiển thị kết quả
    setSelectedAnswer(answerIndex);
  };

  // Xử lý khi người dùng submit đáp án
  const handleSubmit = () => {
    if (selectedAnswer === null) return;  // Không submit nếu chưa chọn đáp án

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Tăng điểm nếu đáp án đúng
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Score is already incremented in handleSubmit, so just use the current score
      router.push(`/dashboard/review/result?score=${score}&total=${questions.length}&type=${type}&topic=${topic}`);
    }
  };

  const handleSkip = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/review");
  };

  const getTopicName = () => translateTopic(topic);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-slate-600">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-1 p-1 h-auto">
          <Home className="h-3 w-3" />
          Trang chủ
        </Button>
        <span>/</span>
        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1 p-1 h-auto">
          <BookOpen className="h-3 w-3" />
          Ôn tập
        </Button>
        <span>/</span>
        <span className="text-slate-900 font-medium">
          {type === "vocabulary" ? "Từ vựng" : "Ngữ pháp"} - {getTopicName()}
        </span>
      </nav>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span>Điểm:</span>
            <span className="font-semibold text-slate-900">{score}/{questions.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Tiến độ:</span>
            <span className="font-semibold text-slate-900">{currentIndex + 1}/{questions.length}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-2">
            <CardDescription>
              {(type === "vocabulary" ? "Từ vựng" : type === "grammar" ? "Ngữ pháp" : "Thì động từ")} • {getTopicName()}
            </CardDescription>
            <CardTitle className="text-sm font-medium text-slate-600">
              Câu {currentIndex + 1} / {questions.length}
            </CardTitle>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-slate-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-xl font-medium text-slate-900">
            {currentQuestion.question}
          </div>

          <div className="grid gap-3">
            {currentQuestion.answers.map((answer, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              const showCorrect = showFeedback && isCorrectAnswer;
              const showIncorrect = showFeedback && isSelected && !isCorrectAnswer;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all",
                    "hover:border-slate-400 hover:shadow-sm",
                    isSelected && !showFeedback && "border-slate-900 bg-slate-50",
                    showCorrect && "border-green-500 bg-green-50",
                    showIncorrect && "border-red-500 bg-red-50",
                    !isSelected && !showCorrect && !showIncorrect && "border-slate-200",
                    showFeedback && "cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{answer}</span>
                    {showCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {showIncorrect && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <Alert className={isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
              <AlertDescription className="space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-green-900">Chính xác!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-900">Chưa đúng</span>
                    </>
                  )}
                </div>
                <p className={isCorrect ? "text-green-800" : "text-red-800"}>
                  {currentQuestion.explanation}
                </p>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            {!showFeedback ? (
              <>
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="flex-1"
                  size="lg"
                >
                  Kiểm tra đáp án
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <SkipForward className="h-4 w-4" />
                  Bỏ qua
                </Button>
              </>
            ) : (
              <Button
                onClick={handleNext}
                className="w-full"
                size="lg"
              >
                {currentIndex < questions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-600">Đang tải...</p>
      </div>
    }>
      <PracticeContent />
    </Suspense>
  );
}
