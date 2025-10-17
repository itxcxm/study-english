// Import các component UI cần thiết
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { HeaderDash } from "@/components/views/HeaderDash";

// Danh sách các chủ đề từ vựng với thông tin hiển thị
const vocabularyTopics = [
  { id: "daily-life", name: "Cuộc sống hàng ngày", questions: 50, icon: "🏠" },
  { id: "work", name: "Công việc", questions: 45, icon: "💼" },
  { id: "travel", name: "Du lịch", questions: 40, icon: "✈️" },
  { id: "education", name: "Giáo dục", questions: 55, icon: "📚" },
  { id: "technology", name: "Công nghệ", questions: 35, icon: "💻" },
  { id: "health", name: "Sức khỏe", questions: 42, icon: "🏥" },
];

// Danh sách các chủ đề ngữ pháp với thông tin hiển thị
const grammarTopics = [
  { id: "tenses", name: "Thì trong tiếng Anh", questions: 60, icon: "⏰" },
  { id: "conditionals", name: "Câu điều kiện", questions: 40, icon: "🔀" },
  { id: "passive-voice", name: "Câu bị động", questions: 35, icon: "🔄" },
  { id: "reported-speech", name: "Câu tường thuật", questions: 38, icon: "💬" },
  { id: "modal-verbs", name: "Động từ khuyết thiếu", questions: 45, icon: "🎯" },
  { id: "relative-clauses", name: "Mệnh đề quan hệ", questions: 42, icon: "🔗" },
  { id: "articles", name: "Mạo từ", questions: 30, icon: "📝" },
  { id: "prepositions", name: "Giới từ", questions: 50, icon: "➡️" },
];

/**
 * Component trang ôn tập chính
 * Hiển thị danh sách các chủ đề từ vựng và ngữ pháp để người dùng chọn luyện tập
 */
export default function ReviewPage() {
  return (
    <div>
      {/* Header của dashboard */}
      <HeaderDash/>
      
      {/* Container chính với spacing và margin */}
      <div className="space-y-8 container mx-auto mt-10">
        {/* Tiêu đề trang */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Ôn tập</h2>
          <p className="text-slate-600 mt-1">Chọn chủ đề để bắt đầu luyện tập</p>
        </div>

        {/* Section từ vựng */}
        <section className="">
          {/* Header của section từ vựng */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Từ vựng</h3>
              <p className="text-sm text-slate-600">Luyện tập từ vựng theo chủ đề</p>
            </div>
          </div>

          {/* Grid hiển thị các chủ đề từ vựng */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocabularyTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{topic.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{topic.name}</CardTitle>
                        <CardDescription>{topic.questions} câu hỏi</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Link đến trang practice với tham số type và topic */}
                  <Link href={`/dashboard/review/practice?type=vocabulary&topic=${topic.id}`}>
                    <Button className="w-full" variant="default">
                      <Zap className="h-4 w-4 mr-2" />
                      Bắt đầu
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Ngữ pháp</h3>
            <p className="text-sm text-slate-600">Luyện tập các dạng ngữ pháp</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {grammarTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{topic.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                      <CardDescription>{topic.questions} câu hỏi</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/review/practice?type=grammar&topic=${topic.id}`}>
                  <Button className="w-full" variant="default">
                    <Zap className="h-4 w-4 mr-2" />
                    Bắt đầu
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Điều hướng nhanh</h3>
            <p className="text-sm text-slate-600">Truy cập nhanh các tính năng khác</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">🏠</div>
                <h4 className="font-semibold text-slate-900">Trang chủ</h4>
                <p className="text-sm text-slate-600">Về dashboard chính</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/dashboard/exam">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">📝</div>
                <h4 className="font-semibold text-slate-900">Thi thử</h4>
                <p className="text-sm text-slate-600">Làm bài thi thử</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/dashboard/myCourses">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="font-semibold text-slate-900">Khóa học</h4>
                <p className="text-sm text-slate-600">Xem khóa học của bạn</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
