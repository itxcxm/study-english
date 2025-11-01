// Các import cần thiết cho thẻ câu hỏi (Hiển thị câu hỏi, badge/nhãn, nút, icon)
// Tiện ích dịch tên chủ đề sang tiếng Việt cũng được import
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/type/question';
import { translateTopic } from '@/utils/topicTranslations';
import { Edit2, Trash2, BookOpen, Calendar } from 'lucide-react';

// Props của component hiển thị thẻ câu hỏi
interface QuestionCardProps {
  question: Question; // Đối tượng câu hỏi
  onEdit: (question: Question) => void; // Callback khi ấn nút sửa
  onDelete: (id: string) => void; // Callback khi ấn nút xóa
}

// Nhãn tiếng Việt cho từng loại danh mục câu hỏi
const categoryLabels: Record<Question['category'], string> = {
  grammar: 'Ngữ pháp',
  vocabulary: 'Từ vựng',
  'verb-tenses': 'Thì động từ',
};

// Nhãn mức độ khó tiếng Việt cho câu hỏi
const difficultyLabels: Record<Question['difficulty'], string> = {
  easy: 'Dễ',
  medium: 'Trung bình',
  hard: 'Khó',
};

// Màu sắc tương ứng cho badge mức độ khó
const difficultyColors: Record<Question['difficulty'], string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

// Component QuestionCard hiển thị 1 thẻ thông tin câu hỏi (chỉ dùng cho admin danh sách quản lý câu hỏi)
export const QuestionCard = ({ question, onEdit, onDelete }: QuestionCardProps) => {
  return (
    // Thẻ card đẹp, hiệu ứng shadow khi hover
    <Card className="hover:shadow-lg transition-all duration-300" style={{ boxShadow: 'var(--shadow-soft)' }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            {/* Hiển thị nội dung câu hỏi */}
            <h3 className="font-semibold text-lg leading-tight">{question.question}</h3>
            <div className="flex flex-wrap gap-2">
              {/* Hiển thị badge loại danh mục câu hỏi */}
              <Badge variant="outline" className="text-xs">
                {categoryLabels[question.category]}
              </Badge>
              {/* Hiển thị badge tên chủ đề */}
              <Badge variant="secondary" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                {translateTopic(question.topic)}
              </Badge>
              {/* Hiển thị badge mức độ khó */}
              <Badge className={`text-xs ${difficultyColors[question.difficulty]}`}>
                {difficultyLabels[question.difficulty]}
              </Badge>
            </div>
          </div>
          {/* Các nút thao tác (sửa, xóa) */}
          <div className="flex gap-2">
            {/* Nút sửa */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(question)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            {/* Nút xóa */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(question.id)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Danh sách đáp án/options */}
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <div
              key={index}
              // Nếu là đáp án đúng thì đổi màu, thêm border, nếu không thì nền nhạt hơn
              className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                index === question.correctAnswer
                  ? 'bg-primary/10 border border-primary/20'
                  : 'bg-muted/50'
              }`}
            >
              {/* Hiển thị ký hiệu đáp án A/B/C/D... */}
              <span className="font-medium text-sm min-w-[24px]">
                {String.fromCharCode(65 + index)}.
              </span>
              {/* Hiển thị nội dung đáp án */}
              <span className="text-sm">{option}</span>
              {/* Nếu là đáp án đúng thì hiển thị badge */}
              {index === question.correctAnswer && (
                <Badge className="ml-auto text-xs">Đáp án đúng</Badge>
              )}
            </div>
          ))}
        </div>
        
        {/* Giải thích cho câu hỏi */}
        <div className="pt-3 border-t space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Giải thích:</p>
          <p className="text-sm leading-relaxed">{question.explanation}</p>
        </div>

        {/* Hiển thị ngày tạo câu hỏi */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
          <Calendar className="w-3 h-3" />
          <span>Ngày tạo: {new Date(question.createdAt).toLocaleDateString('vi-VN')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
