// Import các component UI cần thiết
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { HeaderDash } from "@/components/views/HeaderDash";

// Danh sách các chủ đề từ vựng với thông tin hiển thị
const vocabularyTopics = [
  { id: "family", name: "Gia đình" },
  { id: "relationships", name: "Bạn bè & mối quan hệ" },
  { id: "education", name: "Giáo dục" },
  { id: "jobs", name: "Công việc" },
  { id: "weather", name: "Thời tiết" },
  { id: "time", name: "Thời gian" },
  { id: "dates-seasons", name: "Ngày tháng & mùa" },
  { id: "colors", name: "Màu sắc" },
  { id: "numbers", name: "Số đếm & số thứ tự" },
  { id: "animals", name: "Động vật" },
  { id: "food-drinks", name: "Thực phẩm & đồ uống" },
  { id: "vegetables-fruits", name: "Rau củ & trái cây" },
  { id: "clothing", name: "Trang phục" },
  { id: "house", name: "Nhà cửa & nội thất" },
  { id: "school-supplies", name: "Đồ dùng học tập" },
  { id: "transportation", name: "Phương tiện giao thông" },
  { id: "travel", name: "Du lịch" },
  { id: "health", name: "Sức khỏe" },
  { id: "emotions", name: "Cảm xúc & tính cách" },
  { id: "technology", name: "Công nghệ" },
  { id: "sports", name: "Thể thao" },
  { id: "art-music", name: "Nghệ thuật & âm nhạc" },
  { id: "entertainment", name: "Giải trí & phim ảnh" },
  { id: "nature", name: "Thiên nhiên" },
  { id: "plants-flowers", name: "Cây & hoa" },
  { id: "places", name: "Địa điểm & công trình" },
  { id: "shopping-money", name: "Mua sắm & tiền bạc" },
  { id: "festivals", name: "Lễ hội & văn hóa" },
  { id: "shapes", name: "Hình khối & hình học" },
  { id: "verbs-actions", name: "Động từ & hành động" },
  { id: "otherVocabulary", name: "Các dạng khác" },
];

// Danh sách các chủ đề ngữ pháp với thông tin hiển thị
const grammarTopics = [
  { id: "nouns", name: "Danh từ" },
  { id: "pronouns", name: "Đại từ" },
  { id: "adjectives", name: "Tính từ" },
  { id: "adverbs", name: "Trạng từ" },
  { id: "verbs", name: "Động từ" },
  { id: "prepositions", name: "Giới từ" },
  { id: "conjunctions", name: "Liên từ" },
  { id: "articles", name: "Mạo từ" },
  { id: "conditionals", name: "Câu điều kiện" },
  { id: "passive-voice", name: "Câu bị động" },
  { id: "reported-speech", name: "Câu trực tiếp & gián tiếp" },
  { id: "questions", name: "Câu hỏi" },
  { id: "negation", name: "Câu phủ định" },
  { id: "comparisons", name: "Câu so sánh" },
  { id: "emphasis", name: "Câu nhấn mạnh" },
  { id: "subjunctive", name: "Câu giả định" },
  { id: "relative-clauses", name: "Mệnh đề quan hệ" },
  { id: "noun-clauses", name: "Mệnh đề danh từ" },
  { id: "adverbial-clauses", name: "Mệnh đề trạng ngữ" },
  { id: "inversion", name: "Cấu trúc đảo ngữ" },
  { id: "cleft-sentences", name: "Cấu trúc 'It is...'" },
  { id: "existential", name: "Cấu trúc 'There is/are...'" },
  { id: "used-to", name: "Cấu trúc 'Used to / Be used to'" },
  { id: "wish-if-only", name: "Cấu trúc 'Wish / If only'" },
  { id: "otherGrammar", name: "Các dạng khác" },
];

const verbensesTopics = [
  { id: "present-simple", name: "Hiện tại đơn" },
  { id: "present-continuous", name: "Hiện tại tiếp diễn"  },
  { id: "present-perfect", name: "Hiện tại hoàn thành" },
  { id: "present-perfect-continuous", name: "Hiện tại hoàn thành tiếp diễn" },

  { id: "past-simple", name: "Quá khứ đơn" },
  { id: "past-continuous", name: "Quá khứ tiếp diễn" },
  { id: "past-perfect", name: "Quá khứ hoàn thành" },
  { id: "past-perfect-continuous", name: "Quá khứ hoàn thành tiếp diễn" },

  { id: "future-simple", name: "Tương lai đơn" },
  { id: "future-continuous", name: "Tương lai tiếp diễn" },
  { id: "future-perfect", name: "Tương lai hoàn thành" },
  { id: "future-perfect-continuous", name: "Tương lai hoàn thành tiếp diễn" },
  { id: "otherVerbenses", name: "Các dạng khác" },
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
                      <div>
                        <CardTitle className="text-lg">{topic.name}</CardTitle>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {grammarTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
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

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Thì động từ</h3>
            <p className="text-sm text-slate-600">Luyện tập các dạng thì động từ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {verbensesTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/review/practice?type=verbenses&topic=${topic.id}`}>
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
      </div>
    </div>
  );
}
