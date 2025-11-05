/**
 * 🇻🇳 Component Footer - phần chân trang của website
 * 🇻🇳 Hiển thị thông tin liên hệ, các link điều hướng, và mạng xã hội
 */
import { BookOpen, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EnglishPro</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Nền tảng luyện thi IELTS và TOEIC hàng đầu Việt Nam với hàng nghìn học viên tin tưởng.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Khóa học</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">IELTS Foundation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">IELTS Advanced</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">TOEIC L&R</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">TOEIC 4 Skills</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Về chúng tôi</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Giới thiệu</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Đội ngũ giảng viên</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Phương pháp giảng dạy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>support@englishpro.vn</span>
              </li>
              <li>Hotline: 1900 xxxx</li>
              <li>Thứ 2 - Thứ 7: 8:00 - 20:00</li>
              <li>Chủ nhật: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 EnglishPro. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Điều khoản</Link>
              <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
              <Link href="#" className="hover:text-white transition-colors">Hỗ trợ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
