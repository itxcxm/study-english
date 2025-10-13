import { Header } from '@/components/views/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, BookOpen, Target, Zap } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'English for Beginners',
    description: 'Khóa học dành cho người mới bắt đầu học tiếng Anh từ con số 0',
    level: 'Beginner',
    duration: '3 tháng',
    students: 1234,
    rating: 4.8,
    price: '1.500.000đ',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Phát âm cơ bản', 'Ngữ pháp nền tảng', 'Từ vựng thiết yếu', 'Giao tiếp hàng ngày']
  },
  {
    id: 2,
    title: 'Intermediate English',
    description: 'Nâng cao kỹ năng tiếng Anh với những chủ đề phức tạp hơn',
    level: 'Intermediate',
    duration: '4 tháng',
    students: 892,
    rating: 4.9,
    price: '2.000.000đ',
    image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Ngữ pháp nâng cao', 'Viết luận văn', 'Thảo luận nhóm', 'Từ vựng chuyên ngành']
  },
  {
    id: 3,
    title: 'Business English',
    description: 'Tiếng Anh chuyên nghiệp cho môi trường làm việc quốc tế',
    level: 'Advanced',
    duration: '3 tháng',
    students: 654,
    rating: 4.9,
    price: '2.500.000đ',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Email chuyên nghiệp', 'Thuyết trình', 'Đàm phán', 'Báo cáo kinh doanh']
  },
  {
    id: 4,
    title: 'IELTS Preparation',
    description: 'Chuẩn bị kỹ lưỡng cho kỳ thi IELTS với điểm số cao',
    level: 'Advanced',
    duration: '5 tháng',
    students: 2341,
    rating: 4.9,
    price: '3.000.000đ',
    image: 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Luyện 4 kỹ năng', 'Đề thi thử', 'Chiến lược làm bài', 'Chữa bài chi tiết']
  },
  {
    id: 5,
    title: 'English Speaking Club',
    description: 'Thực hành giao tiếp tiếng Anh mỗi ngày với người bản xứ',
    level: 'All Levels',
    duration: 'Linh hoạt',
    students: 3456,
    rating: 4.7,
    price: '800.000đ/tháng',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Buổi giao lưu hàng ngày', 'Chủ đề đa dạng', 'Phản hồi trực tiếp', 'Cộng đồng học tập']
  },
  {
    id: 6,
    title: 'TOEIC 800+',
    description: 'Đạt điểm TOEIC trên 800 với phương pháp học hiệu quả',
    level: 'Intermediate',
    duration: '4 tháng',
    students: 1567,
    rating: 4.8,
    price: '2.200.000đ',
    image: 'https://images.pexels.com/photos/5553059/pexels-photo-5553059.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Luyện thi chuyên sâu', 'Từ vựng TOEIC', 'Kỹ thuật làm bài', 'Mock test hàng tuần']
  }
]

const levelColors = {
  'Beginner': 'bg-green-100 text-green-700 border-green-200',
  'Intermediate': 'bg-blue-100 text-blue-700 border-blue-200',
  'Advanced': 'bg-purple-100 text-purple-700 border-purple-200',
  'All Levels': 'bg-gray-100 text-gray-700 border-gray-200'
}

export default function CoursesPage() {
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
                Chọn khóa học phù hợp với trình độ và mục tiêu của bạn. Tất cả khóa học đều có giáo viên bản xứ và chứng chỉ hoàn thành.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-16">
                {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                        <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        />
                        <Badge
                        className={`absolute top-4 left-4 ${levelColors[course.level as keyof typeof levelColors]} border`}
                        >
                        {course.level}
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
                            <span className="text-3xl font-bold text-teal-600">{course.price}</span>
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
                    Nội dung được biên soạn theo chuẩn CEFR và phù hợp với người Việt
                    </p>
                </div>

                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <Target className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Giáo Viên Bản Xứ</h3>
                    <p className="text-gray-600">
                    Học trực tiếp với giáo viên người nước ngoài giàu kinh nghiệm
                    </p>
                </div>

                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <Zap className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Lộ Trình Cá Nhân Hóa</h3>
                    <p className="text-gray-600">
                    Chương trình học được thiết kế riêng theo mục tiêu của từng học viên
                    </p>
                </div>
                </div>
            </section>
            </div>
        </section>
        </div>
    </div>
  )
}
