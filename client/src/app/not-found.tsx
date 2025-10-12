import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Trang không tìm thấy</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
          </p>
        </div>
        <div className="space-y-4">
          <Button asChild>
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
