"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BookOpen, Menu, User, Settings, LogOut } from 'lucide-react'
import api from '@/lib/api'

// 🇻🇳 Interface định nghĩa dữ liệu User
interface UserData {
  id: string
  email: string
  name: string
  role: string
  avatar_url?: string
}

// 🇻🇳 HeaderDash là component cho phần header của Dashboard
export function HeaderDash() {
  // 🇻🇳 Trạng thái cho menu Sheet (menu trên mobile)
  const [isOpen, setIsOpen] = useState(false)
  // 🇻🇳 Lưu thông tin người dùng
  const [user, setUser] = useState<UserData | null>(null)
  // 🇻🇳 Trạng thái loading khi lấy user
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 🇻🇳 Hàm lấy dữ liệu người dùng khi component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/check")
        if (response.data.success && response.data.authenticated && response.data.user) {
          const userData = response.data.user
          // 🇻🇳 Lấy thêm profile đầy đủ (có name và avatar_url)
          try {
            const profileResponse = await api.get("/users/me")
            if (profileResponse.data.success && profileResponse.data.data) {
              setUser(profileResponse.data.data)
            } else {
              // 🇻🇳 Nếu không lấy được profile, fallback dựa vào data từ /auth/check
              setUser({
                id: userData.id,
                email: userData.email,
                name: userData.email.split('@')[0], // 🇻🇳 fallback tên là phần trước @ của email
                role: userData.role,
              })
            }
          } catch {
            // 🇻🇳 Nếu có lỗi khi lấy profile, vẫn fallback như trên
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.email.split('@')[0], // 🇻🇳 fallback tên là phần trước @
              role: userData.role,
            })
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  // 🇻🇳 Hàm lấy ký tự đầu của tên (để render AvatarFallback)
  const getInitials = (name: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // 🇻🇳 Hàm xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout")
      setIsOpen(false)
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/login")
    }
  }

  return (
    // 🇻🇳 Bắt đầu header, gồm logo và các menu
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 🇻🇳 Logo và tên app */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center transition-transform group-hover:scale-105">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">EnglishPro</span>
        </Link>

        {/* 🇻🇳 Nav menu (desktop, class md:flex) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
          >
            Tổng Quan
          </Link>
          <Link
            href="/dashboard/myCourses"
            className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
          >
            Khóa học của tôi
          </Link>
          <Link
            href="/dashboard/review"
            className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
          >
            Ôn tập
          </Link>
          <Link
            href="/dashboard/exam"
            className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
          >
            Thi thử
          </Link>
        </nav>

        {/* 🇻🇳 User avatar + menu và menu phía mobile */}
        <div className="flex items-center gap-4">
          {/* 🇻🇳 DropdownMenu: menu user khi bấm vào avatar (desktop) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="hidden md:flex h-9 w-9 cursor-pointer hover:ring-2 hover:ring-teal-500 hover:ring-offset-2 transition-all">
                <AvatarImage src={user?.avatar_url || ""} alt={user?.name || "User"} />
                <AvatarFallback className="bg-teal-100 text-teal-700 text-sm font-medium">
                  {loading ? 'U' : getInitials(user?.name || 'User')}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* 🇻🇳 Hiển thị thông tin người dùng trên dropdown */}
              <div className="flex items-center gap-3 p-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar_url || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-sm font-medium">
                    {loading ? 'U' : getInitials(user?.name || 'User')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {loading ? 'Loading...' : (user?.name || 'User')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {loading ? '...' : (user?.email || 'user@example.com')}
                  </span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Thông tin</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Cài đặt</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 🇻🇳 Sheet: menu dành cho màn hình mobile - mở khi bấm nút menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-6 mt-8">
                {/* 🇻🇳 Thông tin user ở đầu sheet mobile */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.avatar_url || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-base font-medium">
                      {loading ? 'U' : getInitials(user?.name || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {loading ? 'Loading...' : (user?.name || 'User')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {loading ? '...' : (user?.email || 'user@example.com')}
                    </span>
                  </div>
                </div>

                {/* 🇻🇳 Nav cho sheet (mobile) */}
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
                  >
                    Tổng Quan
                  </Link>
                  <Link
                    href="/dashboard/myCourses"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
                  >
                    Khóa học của tôi
                  </Link>
                  <Link
                    href="/dashboard/review"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
                  >
                    Ôn tập
                  </Link>
                  <Link
                    href="/dashboard/exam"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
                  >
                    Thi thử
                  </Link>
                </nav>

                {/* 🇻🇳 Các link cá nhân, cài đặt, đăng xuất cho sheet mobile */}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
                  >
                    <User className="h-5 w-5" />
                    <span>Thông tin</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Cài đặt</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-base font-medium text-red-600 hover:text-red-700 transition-colors py-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
