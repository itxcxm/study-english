"use client"

import { useState } from 'react'
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

export function HeaderDash() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center transition-transform group-hover:scale-105">
            <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EnglishPro</span>
        </Link>

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
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
          >
            Ôn tập
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
          >
            Thi thử
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="hidden md:flex h-9 w-9 cursor-pointer hover:ring-2 hover:ring-teal-500 hover:ring-offset-2 transition-all">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-teal-100 text-teal-700 text-sm font-medium">
                  U
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-3 p-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-sm font-medium">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">User</span>
                  <span className="text-xs text-gray-500">user@example.com</span>
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
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-base font-medium">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">User</span>
                    <span className="text-xs text-gray-500">user@example.com</span>
                  </div>
                </div>

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
                    href="/features"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
                  >
                    Ôn tập
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
                  >
                    Thi thử
                  </Link>
                </nav>

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
                    onClick={() => setIsOpen(false)}
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
