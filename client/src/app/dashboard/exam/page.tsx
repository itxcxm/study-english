'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HeaderDash } from '@/components/views/HeaderDash';

type MockPurchase = {
  id: string;
  name_vi: string;
  description_vi: string;
  purchase_date: string;
  expiry_date: string | null;
  status: 'active' | 'expired' | 'cancelled';
  exam_count: number;
  features: string[];
};

const mockPurchases: MockPurchase[] = [
  {
    id: '1',
    name_vi: 'Gói Miễn Phí',
    description_vi: 'Gói luyện thi cơ bản',
    purchase_date: '2025-09-01T00:00:00Z',
    expiry_date: null,
    status: 'active',
    exam_count: 5,
    features: ['5 đề thi thử IELTS/TOEIC', 'Chấm điểm tự động', 'Xem đáp án']
  },
  {
    id: '2',
    name_vi: 'Gói VIP',
    description_vi: 'Gói luyện thi nâng cao',
    purchase_date: '2025-10-01T00:00:00Z',
    expiry_date: '2025-12-29T00:00:00Z',
    status: 'active',
    exam_count: 50,
    features: ['50 đề thi thử IELTS/TOEIC', 'Chấm điểm tự động', 'Giải thích chi tiết', 'Thống kê tiến độ', 'Hỗ trợ qua email']
  },
  {
    id: '3',
    name_vi: 'Gói Premium',
    description_vi: 'Gói luyện thi toàn diện',
    purchase_date: '2025-05-15T00:00:00Z',
    expiry_date: '2026-05-15T00:00:00Z',
    status: 'active',
    exam_count: 200,
    features: ['200 đề thi thử IELTS/TOEIC', 'Chấm điểm tự động', 'Giải thích chi tiết', 'Thống kê tiến độ nâng cao', 'Hỗ trợ 1-1 với giảng viên']
  }
];

export default function UserPurchasesPage() {
  const [purchases] = useState<MockPurchase[]>(mockPurchases);
  const router = useRouter();

  const getStatusBadge = (status: string, expiryDate: string | null) => {
    if (expiryDate && new Date(expiryDate) < new Date()) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Hết hạn
        </Badge>
      );
    }

    if (status === 'active') {
      return (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Đang hoạt động
        </Badge>
      );
    }

    if (status === 'expired') {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Hết hạn
        </Badge>
      );
    }

    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        Đã hủy
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateRemainingDays = (expiryDate: string | null) => {
    if (!expiryDate) return null;

    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div>
      <HeaderDash />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Thi Thử
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {purchases.map((purchase) => {
            const remainingDays = calculateRemainingDays(purchase.expiry_date);
            const isExpired = purchase.expiry_date && new Date(purchase.expiry_date) < new Date();

            return (
              <Card key={purchase.id} className={`transition-all hover:shadow-lg ${
                isExpired ? 'opacity-75 border-slate-200' : 'border-blue-200'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">
                      {purchase.name_vi}
                    </CardTitle>
                    {getStatusBadge(purchase.status, purchase.expiry_date)}
                  </div>
                  <CardDescription>
                    {purchase.description_vi}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">
                        Ngày mua: {formatDate(purchase.purchase_date)}
                      </span>
                    </div>

                    {purchase.expiry_date ? (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600">
                            Hết hạn: {formatDate(purchase.expiry_date)}
                          </span>
                        </div>

                        {!isExpired && remainingDays !== null && (
                          <div className={`p-3 rounded-lg ${
                            remainingDays <= 7 ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'
                          }`}>
                            <p className={`text-sm font-medium ${
                              remainingDays <= 7 ? 'text-orange-700' : 'text-blue-700'
                            }`}>
                              Còn {remainingDays} ngày
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-sm font-medium text-green-700">
                          Truy cập trọn đời
                        </p>
                      </div>
                    )}

                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-slate-900 mb-2">
                        Số đề thi: {purchase.exam_count}
                      </p>
                      {Array.isArray(purchase.features) &&
                       purchase.features.slice(0, 3).map((feature, index) => (
                        <p key={index} className="text-xs text-slate-600 mb-1">
                          • {feature}
                        </p>
                      ))}
                    </div>
                  </div>

                  {!isExpired && purchase.status === 'active' && (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Bắt đầu luyện thi
                    </Button>
                  )}

                  {isExpired && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push('/exam')}
                    >
                      Gia hạn gói
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            onClick={() => router.push('/exam')}
            className="px-8"
          >
            Khám phá thêm gói
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
