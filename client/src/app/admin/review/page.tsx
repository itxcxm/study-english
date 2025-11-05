'use client';

// Các import thư viện và component cần thiết
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QuestionCard } from '@/components/views/QuestionCard';
import { QuestionForm } from '@/components/views/QuestionForm';
import { AdminNav } from '@/components/views/AdminNav';
import { Question, QuestionFormData } from '@/types/question';
import { toast } from 'sonner';
import { Plus, Search, Filter, BookOpen, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { checkAdminRole } from '@/lib/auth';

const Index = () => {
  const router = useRouter();

  // State lưu trữ danh sách câu hỏi
  const [questions, setQuestions] = useState<Question[]>([]);
  // Trạng thái loading toàn trang
  const [loading, setLoading] = useState(true);
  // Trạng thái loading khi thao tác thêm/sửa/xóa
  const [actionLoading, setActionLoading] = useState(false);
  // Kiểm tra quyền admin 
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  // Từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  // Bộ lọc danh mục
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  // Bộ lọc độ khó
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  // Trạng thái mở/đóng dialog thêm/sửa câu hỏi
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State lưu câu hỏi đang chỉnh sửa
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>();
  // Các chủ đề hiện có (dùng cho form)
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  // Chuyển đổi dữ liệu từ API về object Question 
  const transformQuestion = (apiQuestion: any, topic: string, category: 'grammar' | 'vocabulary' | 'verb-tenses'): Question => {
    return {
      id: apiQuestion._id,
      question: apiQuestion.question,
      options: apiQuestion.answers || [],
      correctAnswer: apiQuestion.correctAnswer,
      explanation: apiQuestion.explanation,
      category,
      topic,
      difficulty: apiQuestion.difficulty || 'medium',
      createdAt: apiQuestion.createdAt || new Date().toISOString(),
    };
  };

  // Xác định danh mục từ chủ đề
  const getCategoryFromTopic = (topic: string): 'grammar' | 'vocabulary' | 'verb-tenses' => {
    // Các chủ đề thì động từ
    const verbTenseTopics = [
      'PresentSimple', 'PresentContinuous', 'PresentPerfect', 'PresentPerfectContinuous',
      'PastSimple', 'PastContinuous', 'PastPerfect', 'PastPerfectContinuous',
      'FutureSimple', 'FutureContinuous', 'FuturePerfect', 'FuturePerfectContinuous', 'OtherVerbTenses'
    ];

    // Các chủ đề ngữ pháp
    const grammarTopics = [
      'Articles', 'Nouns', 'Pronouns', 'Adjectives', 'Adverbs', 'Verbs', 'Prepositions',
      'Conjunctions', 'Conditionals', 'PassiveVoice', 'ReportedSpeech', 'RelativeClauses', 'NounClauses',
      'AdverbialClauses', 'CleftSentences', 'Comparisons', 'Emphasis', 'Existential', 'Inversion',
      'Negation', 'Questions', 'Subjunctive', 'UsedTo', 'WishIfOnly'
    ];

    if (verbTenseTopics.includes(topic)) {
      return 'verb-tenses';
    } else if (grammarTopics.includes(topic)) {
      return 'grammar';
    } else {
      // Nếu không rơi vào hai loại trên thì là từ vựng
      return 'vocabulary';
    }
  };

  // Hàm lấy tất cả câu hỏi từ tất cả chủ đề (gọi API)
  const fetchAllQuestions = useCallback(async () => {
    try {
      setLoading(true);
      
      // Lấy danh sách chủ đề từ server
      const topicsResponse = await api.get('/review/topics');
      const topics = topicsResponse.data.topics || [];
      setAvailableTopics(topics);

      // Duyệt qua mỗi chủ đề, lấy danh sách câu hỏi của từng chủ đề
      const allQuestions: Question[] = [];
      
      for (const topic of topics) {
        try {
          const response = await api.get(`/review?topic=${topic}`);
          if (response.data.success && response.data.data) {
            const category = getCategoryFromTopic(topic);
            const transformed = response.data.data.map((q: any) => transformQuestion(q, topic, category));
            allQuestions.push(...transformed);
          }
        } catch (error) {
          // Nếu lấy câu hỏi chủ đề nào lỗi thì bỏ qua, log lỗi ra console
          console.error(`Failed to fetch questions for topic ${topic}:`, error);
        }
      }

      setQuestions(allQuestions);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể tải danh sách câu hỏi');
    } finally {
      setLoading(false);
    }
  }, []);

  // Hàm kiểm tra quyền admin
  useEffect(() => {
    const verifyAdmin = async () => {
      const { isAdmin } = await checkAdminRole();
      if (!isAdmin) {
        // Nếu không phải admin thì chuyển về trang chủ
        router.push('/');
        return;
      }
      setIsCheckingAuth(false);
    };

    verifyAdmin();
  }, [router]);

  // Khi đã xác thực quyền, tiến hành lấy dữ liệu câu hỏi
  useEffect(() => {
    if (!isCheckingAuth) {
      fetchAllQuestions();
    }
  }, [fetchAllQuestions, isCheckingAuth]);

  // Lọc câu hỏi theo bộ lọc và tìm kiếm
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || q.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Xử lý thêm câu hỏi mới
  const handleAddQuestion = async (data: QuestionFormData) => {
    try {
      setActionLoading(true);

      const response = await api.post('/review', {
        topic: data.topic,
        question: data.question,
        answers: data.options,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation,
        difficulty: data.difficulty,
      });

      if (response.data.success) {
        // Thêm câu hỏi mới vào danh sách câu hỏi react state
        const category = getCategoryFromTopic(data.topic);
        const newQuestion = transformQuestion(response.data.data, data.topic, category);
        setQuestions([newQuestion, ...questions]);
        setIsDialogOpen(false);
        toast.success('Đã thêm câu hỏi thành công!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể thêm câu hỏi');
    } finally {
      setActionLoading(false);
    }
  };

  // Xử lý cập nhật câu hỏi
  const handleEditQuestion = async (data: QuestionFormData) => {
    if (!editingQuestion) return;

    try {
      setActionLoading(true);
      // Luôn cập nhật vào chủ đề gốc, nếu muốn chuyển chủ đề thì phải xóa rồi thêm lại
      const originalTopic = editingQuestion.topic;

      const response = await api.put(`/review/${editingQuestion.id}`, {
        topic: originalTopic,
        question: data.question,
        answers: data.options,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation,
        difficulty: data.difficulty,
      });

      if (response.data.success) {
        // Chuyển đổi lại object câu hỏi
        const category = getCategoryFromTopic(originalTopic);
        const updatedQuestion = transformQuestion(response.data.data, originalTopic, category);

        // Cập nhật lại danh sách
        setQuestions(questions.map((q) =>
          q.id === editingQuestion.id ? updatedQuestion : q
        ));

        setIsDialogOpen(false);
        setEditingQuestion(undefined);

        // Nếu đang cố đổi chủ đề sẽ cảnh báo (chức năng này chưa hỗ trợ)
        if (data.topic !== originalTopic) {
          toast.warning('Chú ý: Câu hỏi vẫn thuộc chủ đề gốc. Để thay đổi chủ đề, vui lòng xóa và tạo lại.');
        } else {
          toast.success('Đã cập nhật câu hỏi thành công!');
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể cập nhật câu hỏi');
    } finally {
      setActionLoading(false);
    }
  };

  // Xử lý xóa câu hỏi
  const handleDeleteQuestion = async (id: string) => {
    try {
      setActionLoading(true);

      // Tìm câu hỏi theo id để lấy chủ đề
      const question = questions.find(q => q.id === id);
      if (!question) {
        toast.error('Không tìm thấy câu hỏi');
        return;
      }

      const response = await api.delete(`/review/${id}?topic=${question.topic}`);

      if (response.data.success) {
        // Xóa câu hỏi khỏi danh sách hiện tại
        setQuestions(questions.filter((q) => q.id !== id));
        toast.success('Đã xóa câu hỏi thành công!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể xóa câu hỏi');
    } finally {
      setActionLoading(false);
    }
  };

  // Mở dialog chỉnh sửa câu hỏi
  const openEditDialog = (question: Question) => {
    setEditingQuestion(question);
    setIsDialogOpen(true);
  };

  // Mở dialog thêm mới câu hỏi
  const openAddDialog = () => {
    setEditingQuestion(undefined);
    setIsDialogOpen(true);
  };

  // Đóng dialog thêm/sửa
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingQuestion(undefined);
  };

  // Hiển thị loading khi đang kiểm tra quyền truy cập
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // JSX giao diện chính của trang quản lý câu hỏi
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      {/* Thanh điều hướng admin */}
      <AdminNav />

      {/* Header của trang */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Quản lý Câu hỏi
                </h1>
                <p className="text-sm text-muted-foreground">Nền tảng học tiếng Anh</p>
              </div>
            </div>
            {/* Nút thêm câu hỏi */}
            <Button onClick={openAddDialog} size="lg" className="gap-2" disabled={actionLoading}>
              <Plus className="w-5 h-5" />
              Thêm câu hỏi
            </Button>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <main className="container mx-auto px-4 py-8">
        {/* Bộ lọc câu hỏi */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm câu hỏi hoặc chủ đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="grammar">Ngữ pháp</SelectItem>
                  <SelectItem value="vocabulary">Từ vựng</SelectItem>
                  <SelectItem value="verb-tenses">Thì động từ</SelectItem>
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Độ khó" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả độ khó</SelectItem>
                  <SelectItem value="easy">Dễ</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="hard">Khó</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Hiển thị số lượng câu hỏi */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Hiển thị <span className="font-semibold text-foreground">{filteredQuestions.length}</span> / {questions.length} câu hỏi
            </p>
          </div>
        </div>

        {/* Trạng thái loading / không có dữ liệu / hiển thị danh sách câu hỏi */}
        {loading ? (
          // Loading khi đang tải dữ liệu
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredQuestions.length === 0 ? (
          // Không có câu hỏi phù hợp bộ lọc/tìm kiếm
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy câu hỏi</h3>
            <p className="text-muted-foreground mb-6">
              Thử điều chỉnh bộ lọc hoặc thêm câu hỏi mới
            </p>
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm câu hỏi đầu tiên
            </Button>
          </div>
        ) : (
          // Hiển thị danh sách các thẻ câu hỏi
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onEdit={openEditDialog}
                onDelete={handleDeleteQuestion}
              />
            ))}
          </div>
        )}
      </main>

      {/* Dialog thêm/sửa câu hỏi */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingQuestion ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
            </DialogTitle>
            <DialogDescription>
              {editingQuestion
                ? 'Cập nhật thông tin câu hỏi dưới đây'
                : 'Điền thông tin để tạo câu hỏi mới'}
            </DialogDescription>
          </DialogHeader>
          <QuestionForm
            question={editingQuestion}
            onSubmit={editingQuestion ? handleEditQuestion : handleAddQuestion}
            onCancel={closeDialog}
            availableTopics={availableTopics}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
