'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/views/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, BookOpen, Target, Zap } from 'lucide-react';
import { Footer } from '@/components/views/Footer';
import api from '@/lib/api';

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
}

const levelColors = {
  'Beginner': 'bg-green-100 text-green-700 border-green-200',
  'Intermediate': 'bg-blue-100 text-blue-700 border-blue-200',
  'Advanced': 'bg-purple-100 text-purple-700 border-purple-200',
  'All Levels': 'bg-gray-100 text-gray-700 border-gray-200'
};

const viLevelLabels: {[key: string]: string} = {
  'Beginner': 'Sơ cấp',
  'Intermediate': 'Trung cấp',
  'Advanced': 'Nâng cao',
  'All Levels': 'Mọi trình độ'
};

// Hàm format giá tiền tự động
const formatPrice = (price: string | number | null | undefined): string => {
  if (!price && price !== 0) return 'Miễn phí';
  
  // Nếu là số, format trực tiếp
  if (typeof price === 'number') {
    if (price === 0) return 'Miễn phí';
    return `${price.toLocaleString('vi-VN')}đ`;
  }
  
  // Nếu là string
  if (typeof price === 'string') {
    // Nếu đã có định dạng (có chứa đ hoặc dấu chấm/phẩy), trả về nguyên
    if (price.includes('đ') || price.includes('₫') || price.includes('.') || price.includes(',')) {
      return price;
    }
    
    // Nếu là số dạng string, parse và format
    const numPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    if (isNaN(numPrice)) return 'Miễn phí';
    if (numPrice === 0) return 'Miễn phí';
    return `${numPrice.toLocaleString('vi-VN')}đ`;
  }
  
  return 'Miễn phí';
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/courses');
      const data = response.data;

      // Chuyển đổi dữ liệu để phù hợp với định dạng mong muốn
      const transformedCourses = (Array.isArray(data) ? data : []).map((course: any) => ({
        id: course._id || course.id,
        title: course.title || '',
        description: course.description || '',
        level: course.level || 'Beginner',
        duration: course.duration || '',
        students: course.students || 0,
        rating: course.rating || 0,
        price: formatPrice(course.price),
        image: course.image || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
        features: Array.isArray(course.features) ? course.features : [],
        is_active: course.is_active !== undefined ? course.is_active : true
      })).filter((course: Course) => course.is_active !== false); // Chỉ hiển thị các khóa học đang mở

      setCourses(transformedCourses);
    } catch (error) {
      console.error('Lỗi khi tải danh sách khóa học:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white mt-10">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Khóa Học Tiếng Anh
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Chọn khóa học phù hợp với trình độ và mục tiêu của bạn. Tất cả các khóa học đều có giáo viên bản ngữ và chứng chỉ hoàn thành.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Hiện tại chưa có khóa học nào. Vui lòng quay lại sau!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 mb-16">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-[300px_1fr] gap-6">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <Image
                          src={course.image || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover"
                        />
                        <Badge
                          className={`absolute top-4 left-4 ${levelColors[course.level as keyof typeof levelColors]} border`}
                        >
                          {viLevelLabels[course.level] || course.level}
                        </Badge>
                      </div>

                      <div className="p-6">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                          <CardDescription className="text-base">{course.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="p-0">
                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-teal-600" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-teal-600" />
                              <span>{course.students.toLocaleString()} học viên</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span>{course.rating}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-6">
                            {course.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <div className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-3xl font-bold text-teal-600">
                                {formatPrice(course.price)}
                              </span>
                            </div>
                            <Button className="bg-teal-600 hover:bg-teal-700">
                              Đăng ký ngay
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <section className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Tại Sao Chọn EnglishPro?
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <BookOpen className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Giáo Trình Chuẩn Quốc Tế</h3>
                  <p className="text-gray-600">
                    Nội dung được biên soạn theo chuẩn CEFR và phù hợp với người Việt.
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <Target className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Giáo Viên Bản Ngữ</h3>
                  <p className="text-gray-600">
                    Học trực tiếp với giáo viên người nước ngoài giàu kinh nghiệm.
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <Zap className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lộ Trình Cá Nhân Hóa</h3>
                  <p className="text-gray-600">
                    Chương trình học được thiết kế riêng theo mục tiêu của từng học viên.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
