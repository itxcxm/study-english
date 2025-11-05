import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 🇻🇳 Hàm tiện ích để kết hợp các class CSS
 * 🇻🇳 Sử dụng clsx để xử lý điều kiện và twMerge để merge các class Tailwind CSS
 * 🇻🇳 Đảm bảo các class xung đột được xử lý đúng cách
 * @param inputs - Các giá trị class có thể là string, object, array, hoặc boolean
 * @returns Chuỗi class CSS đã được merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
