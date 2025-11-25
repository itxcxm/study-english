'use client';

// Import các thư viện và component cần thiết
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { AdminNav } from '@/components/views/AdminNav';
import api from '@/lib/api';

// Interface cho Course từ MongoDB
interface Course {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  students: number;
  rating: number;
  price: string | number;
  image: string | null;
  features: string[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Component quản lý khoá học
export default function ManageCoursesPage() {
  // Các state lưu trữ dữ liệu và trạng thái của giao diện
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels',
    duration: '',
    students: 0,
    rating: 0,
    price: 0,
    image: '',
    features: '',
    is_active: true,
  });

  // Lấy danh sách khoá học khi component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Hàm lấy danh sách khoá học từ database
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/courses');
      const data = response.data;
      
      // Chuyển đổi dữ liệu để phù hợp với định dạng mong muốn
      const transformedCourses = (Array.isArray(data) ? data : []).map((course: any) => ({
        id: course._id || course.id,
        _id: course._id,
        title: course.title || '',
        description: course.description || '',
        level: course.level || 'Beginner',
        duration: course.duration || '',
        students: course.students || 0,
        rating: course.rating || 0,
        price: course.price || 0,
        image: course.image || '',
        features: Array.isArray(course.features) ? course.features : [],
        is_active: course.is_active !== undefined ? course.is_active : true,
        created_at: course.createdAt || course.created_at,
        updated_at: course.updatedAt || course.updated_at,
      }));
      
      setCourses(transformedCourses);
    } catch (error) {
      // Lỗi khi lấy khoá học
      console.error('Lỗi khi tải khoá học:', error);
      toast.error('Không thể tải danh sách khoá học');
    } finally {
      setLoading(false);
    }
  };

  // Mở dialog tạo/sửa khoá học
  const handleOpenDialog = (course?: Course) => {
    if (course) {
      // Nếu có khoá học, đưa thông tin vào form để sửa
      setEditingCourse(course);
      const priceValue = typeof course.price === 'string' 
        ? parseFloat(course.price.replace(/[^\d.]/g, '')) || 0
        : course.price || 0;
      
      setFormData({
        title: course.title,
        description: course.description,
        level: course.level as 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels',
        duration: course.duration,
        students: course.students,
        rating: course.rating,
        price: priceValue,
        image: course.image || '',
        features: Array.isArray(course.features) ? course.features.join('\n') : '',
        is_active: course.is_active !== undefined ? course.is_active : true,
      });
    } else {
      // Nếu không, reset form để tạo mới
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        level: 'Beginner',
        duration: '',
        students: 0,
        rating: 0,
        price: 0,
        image: '',
        features: '',
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  // Đóng dialog tạo/sửa khoá học
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCourse(null);
  };

  // Xử lý submit form tạo/sửa khoá học
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tách các tính năng thành mảng
    const featuresArray = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const courseData = {
      title: formData.title,
      description: formData.description,
      level: formData.level,
      duration: formData.duration,
      students: formData.students,
      rating: formData.rating,
      price: formData.price.toString(), // MongoDB schema expects string for price
      image: formData.image || '',
      features: featuresArray,
      is_active: formData.is_active,
    };

    try {
      if (editingCourse) {
        // Nếu đang chỉnh sửa -> cập nhật khoá học
        const courseId = editingCourse._id || editingCourse.id;
        await api.put(`/courses/${courseId}`, courseData);
        toast.success('Cập nhật khoá học thành công');
      } else {
        // Nếu tạo mới -> thêm khoá học
        await api.post('/courses', courseData);
        toast.success('Tạo khoá học mới thành công');
      }

      handleCloseDialog();
      fetchCourses();
    } catch (error: any) {
      // Lỗi lưu khoá học
      console.error('Lỗi khi lưu khoá học:', error);
      toast.error(error.response?.data?.message || 'Lưu khoá học thất bại');
    }
  };

  // Xử lý xoá khoá học
  const handleDelete = async () => {
    if (!courseToDelete) return;

    try {
      const courseId = courseToDelete._id || courseToDelete.id;
      await api.delete(`/courses/${courseId}`);
      toast.success('Xoá khoá học thành công');
      setIsDeleteDialogOpen(false);
      setCourseToDelete(null);
      fetchCourses();
    } catch (error: any) {
      // Lỗi xoá khoá học
      console.error('Lỗi khi xoá khoá học:', error);
      toast.error(error.response?.data?.message || 'Xoá khoá học thất bại');
    }
  };

  // Lọc khoá học theo từ khoá tìm kiếm
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lấy màu badge theo trình độ khoá học
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Trả về giao diện quản lý khoá học
  return (
    <div>
      {/* Thanh điều hướng quản trị viên */}
      <AdminNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary rounded-lg">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                {/* Quản lý khoá học */}
                Quản lý khoá học
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {/* Tạo, sửa, và quản lý danh sách khoá học của bạn */}
              Tạo, chỉnh sửa và quản lý danh sách khoá học của bạn
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">
                    {/* Danh mục khoá học */}
                    Danh mục khoá học
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {/* Quản lý tất cả các khoá học tại đây */}
                    Quản lý tất cả khoá học của bạn tại đây
                  </CardDescription>
                </div>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="w-4 h-4" />
                  {/* Thêm khoá học mới */}
                  Thêm khoá học mới
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm khoá học theo tiêu đề, mô tả, hoặc trình độ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  {/* Hiển thị loading xoay */}
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    {/* Không tìm thấy khoá học hoặc chưa có khoá học nào */}
                    {searchQuery ? 'Không tìm thấy khoá học nào' : 'Chưa có khoá học nào. Hãy tạo khoá học đầu tiên của bạn!'}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        {/* Các tiêu đề của bảng */}
                        <TableHead className="font-semibold">Tiêu đề</TableHead>
                        <TableHead className="font-semibold">Trình độ</TableHead>
                        <TableHead className="font-semibold">Thời lượng</TableHead>
                        <TableHead className="font-semibold text-right">Học viên</TableHead>
                        <TableHead className="font-semibold text-right">Giá</TableHead>
                        <TableHead className="font-semibold text-center">Trạng thái</TableHead>
                        <TableHead className="font-semibold text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Hiển thị danh sách các khoá học */}
                      {filteredCourses.map((course) => (
                        <TableRow key={course.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium max-w-xs">
                            <div>
                              <div className="font-semibold">{course.title}</div>
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {course.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getLevelColor(course.level)}>
                              {/* Trình độ của khoá học */}
                              {course.level === 'Beginner'
                                ? 'Cơ bản'
                                : course.level === 'Intermediate'
                                ? 'Trung cấp'
                                : course.level === 'Advanced'
                                ? 'Nâng cao'
                                : course.level}
                            </Badge>
                          </TableCell>
                          <TableCell>{course.duration}</TableCell>
                          <TableCell className="text-right">{course.students}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {(() => {
                              const priceValue = typeof course.price === 'string' 
                                ? parseFloat(course.price.replace(/[^\d.]/g, '')) || 0
                                : course.price || 0;
                              return priceValue === 0 ? 'Miễn phí' : `${priceValue.toLocaleString('vi-VN')}₫`;
                            })()}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={course.is_active ? 'default' : 'secondary'}>
                              {/* Trạng thái kích hoạt của khoá học */}
                              {course.is_active ? 'Kích hoạt' : 'Ẩn'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {/* Nút chỉnh sửa */}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenDialog(course)}
                                className="hover:bg-blue-50 dark:hover:bg-blue-950"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              {/* Nút xoá */}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setCourseToDelete(course);
                                  setIsDeleteDialogOpen(true);
                                }}
                                className="hover:bg-red-50 dark:hover:bg-red-950 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dialog tạo/chỉnh sửa khoá học */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {editingCourse ? 'Chỉnh sửa khoá học' : 'Tạo khoá học mới'}
                </DialogTitle>
                <DialogDescription>
                  {/* Cập nhật thông tin bên dưới / Điền thông tin để tạo khoá học mới */}
                  {editingCourse
                    ? 'Cập nhật thông tin khoá học bên dưới'
                    : 'Điền thông tin để tạo khoá học mới'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề khoá học *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    placeholder="VD: Ngữ pháp tiếng Anh nâng cao"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={4}
                    placeholder="Mô tả những điều học viên sẽ học được trong khoá học này..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Trình độ *</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels') =>
                        setFormData({ ...formData, level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Cơ bản</SelectItem>
                        <SelectItem value="Intermediate">Trung cấp</SelectItem>
                        <SelectItem value="Advanced">Nâng cao</SelectItem>
                        <SelectItem value="All Levels">Mọi trình độ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Thời lượng *</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      required
                      placeholder="VD: 8 tuần, 20 giờ học"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="students">Số học viên</Label>
                    <Input
                      id="students"
                      type="number"
                      min="0"
                      value={formData.students}
                      onChange={(e) =>
                        setFormData({ ...formData, students: Number(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">Đánh giá (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: Number(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Giá (₫) *</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: Number(e.target.value) })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Link ảnh</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Tính năng khoá học (mỗi dòng một tính năng)</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    rows={4}
                    placeholder="Hỗ trợ 24/7&#10;Chứng nhận hoàn thành&#10;Bài học tương tác"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="is_active" className="cursor-pointer">
                    {/* Kích hoạt (hiển thị với người dùng) */}
                    Kích hoạt (hiển thị với người dùng)
                  </Label>
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                  >
                    {/* Hủy */}
                    Hủy
                  </Button>
                  <Button type="submit">
                    {/* Nút tạo mới hoặc cập nhật khoá học */}
                    {editingCourse ? 'Cập nhật khoá học' : 'Tạo khoá học'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Dialog xác nhận xóa khoá học */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn xoá?</AlertDialogTitle>
                <AlertDialogDescription>
                  {/* Xác nhận xóa khoá học */}
                  Khoá học &quot;{courseToDelete?.title}&quot; sẽ bị xoá vĩnh viễn. Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setCourseToDelete(null)}>
                  Hủy
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Xoá
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
