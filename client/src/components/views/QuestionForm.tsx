import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Question, QuestionFormData } from '@/type/question';
import { translateTopic } from '@/utils/topicTranslations';
import { X } from 'lucide-react';

// Định nghĩa props cho form câu hỏi
interface QuestionFormProps {
  question?: Question; // Câu hỏi đang chỉnh sửa (nếu có)
  onSubmit: (data: QuestionFormData) => void; // Hàm callback khi submit form
  onCancel: () => void; // Hàm callback khi hủy
  availableTopics?: string[]; // Danh sách chủ đề có sẵn
}

// Component form để thêm/sửa câu hỏi
export const QuestionForm = ({ question, onSubmit, onCancel, availableTopics = [] }: QuestionFormProps) => {
  // State lưu trữ dữ liệu form
  const [formData, setFormData] = useState<QuestionFormData>({
    question: question?.question || '',
    options: question?.options || ['', '', '', ''],
    correctAnswer: question?.correctAnswer || 0,
    explanation: question?.explanation || '',
    category: question?.category || 'grammar',
    topic: question?.topic || '',
    difficulty: question?.difficulty || 'medium',
  });

  // Hàm xác định danh mục từ chủ đề
  const getCategoryFromTopic = (topic: string): 'grammar' | 'vocabulary' | 'verb-tenses' => {
    // Các chủ đề thì động từ
    const verbTenseTopics = ['PresentSimple', 'PresentContinuous', 'PresentPerfect', 'PresentPerfectContinuous', 
      'PastSimple', 'PastContinuous', 'PastPerfect', 'PastPerfectContinuous',
      'FutureSimple', 'FutureContinuous', 'FuturePerfect', 'FuturePerfectContinuous', 'OtherVerbTenses'];
    // Các chủ đề ngữ pháp
    const grammarTopics = ['Articles', 'Nouns', 'Pronouns', 'Adjectives', 'Adverbs', 'Verbs', 'Prepositions',
      'Conjunctions', 'Conditionals', 'PassiveVoice', 'ReportedSpeech', 'RelativeClauses', 'NounClauses',
      'AdverbialClauses', 'CleftSentences', 'Comparisons', 'Emphasis', 'Existential', 'Inversion',
      'Negation', 'Questions', 'Subjunctive', 'UsedTo', 'WishIfOnly'];
    
    if (verbTenseTopics.includes(topic)) {
      return 'verb-tenses';
    } else if (grammarTopics.includes(topic)) {
      return 'grammar';
    } else {
      return 'vocabulary';
    }
  };

  // Lọc chủ đề theo danh mục đã chọn
  const getFilteredTopics = () => {
    if (!formData.category) {
      return availableTopics;
    }
    return availableTopics.filter(topic => getCategoryFromTopic(topic) === formData.category);
  };

  // Khi thay đổi category, cập nhật chủ đề nếu cần
  const handleCategoryChange = (value: string) => {
    const newCategory = value as 'grammar' | 'vocabulary' | 'verb-tenses';
    const filteredTopics = availableTopics.filter(topic => getCategoryFromTopic(topic) === newCategory);
    // Nếu chủ đề hiện tại không thuộc danh mục mới, reset chủ đề
    if (formData.topic && getCategoryFromTopic(formData.topic) !== newCategory) {
      setFormData({ ...formData, category: newCategory, topic: filteredTopics[0] || '' });
    } else {
      setFormData({ ...formData, category: newCategory });
    }
  };

  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Xử lý thay đổi đáp án
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nhập nội dung câu hỏi */}
      <div className="space-y-2">
        <Label htmlFor="question">Câu hỏi</Label>
        <Textarea
          id="question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          placeholder="Nhập câu hỏi..."
          required
          className="min-h-[80px]"
        />
      </div>

      {/* Danh sách đáp án */}
      <div className="space-y-3">
        <Label>Các đáp án</Label>
        {formData.options.map((option, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="flex items-center gap-2 flex-1">
              {/* Hiển thị ký tự A/B/C/D... */}
              <span className="text-sm font-medium text-muted-foreground min-w-[24px]">
                {String.fromCharCode(65 + index)}.
              </span>
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Đáp án ${String.fromCharCode(65 + index)}`}
                required
              />
            </div>
            {/* Nút chọn đáp án đúng */}
            <Button
              type="button"
              variant={formData.correctAnswer === index ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormData({ ...formData, correctAnswer: index })}
              className="min-w-[100px]"
            >
              {formData.correctAnswer === index ? '✓ Đúng' : 'Chọn đúng'}
            </Button>
          </div>
        ))}
      </div>

      {/* Nhập giải thích đáp án */}
      <div className="space-y-2">
        <Label htmlFor="explanation">Giải thích</Label>
        <Textarea
          id="explanation"
          value={formData.explanation}
          onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
          placeholder="Giải thích đáp án đúng..."
          required
          className="min-h-[80px]"
        />
      </div>

      {/* Các lựa chọn: danh mục - chủ đề - độ khó */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Chọn danh mục */}
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grammar">Ngữ pháp</SelectItem>
              <SelectItem value="vocabulary">Từ vựng</SelectItem>
              <SelectItem value="verb-tenses">Thì động từ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chọn chủ đề */}
        <div className="space-y-2">
          <Label htmlFor="topic">Chủ đề</Label>
          <Select
            value={formData.topic}
            onValueChange={(value: string) => setFormData({ ...formData, topic: value })}
            // Khi sửa thì không cho đổi chủ đề, hoặc không có chủ đề thì cũng disable
            disabled={getFilteredTopics().length === 0 || !!question}
          >
            <SelectTrigger id="topic">
              <SelectValue placeholder="Chọn chủ đề" />
            </SelectTrigger>
            <SelectContent>
              {getFilteredTopics().length > 0 ? (
                getFilteredTopics().map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {translateTopic(topic)}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>
                  {/* Nếu chưa tải thì hiện đang tải, không thì báo không có chủ đề */}
                  {availableTopics.length === 0 ? 'Đang tải...' : 'Không có chủ đề cho danh mục này'}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {/* Khi chỉnh sửa không cho thay đổi chủ đề */}
          {question && (
            <p className="text-xs text-muted-foreground">
              Chủ đề không thể thay đổi khi chỉnh sửa. Để thay đổi chủ đề, vui lòng xóa và tạo lại.
            </p>
          )}
        </div>

        {/* Chọn độ khó */}
        <div className="space-y-2">
          <Label htmlFor="difficulty">Độ khó</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value: any) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger id="difficulty">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Dễ</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="hard">Khó</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">
          {/* Nếu đang chỉnh sửa thì là cập nhật, không thì là thêm */}
          {question ? 'Cập nhật' : 'Thêm câu hỏi'}
        </Button>
      </div>
    </form>
  );
};
