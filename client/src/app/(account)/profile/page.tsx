'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { HeaderDash } from '@/components/views/HeaderDash';

export default function ProfilePage() {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [name, setName] = useState('Nguyễn Văn An');
  const [email, setEmail] = useState('nguyenvanan@example.com');
  const [avatarUrl, setAvatarUrl] = useState('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    setTimeout(() => {
      setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
      setSaving(false);
    }, 1000);
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    setTimeout(() => {
      setMessage({
        type: 'success',
        text: 'Email đã được cập nhật! Vui lòng kiểm tra hộp thư để xác nhận.'
      });
      setSaving(false);
    }, 1000);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu mới không khớp' });
      setSaving(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu phải có ít nhất 6 ký tự' });
      setSaving(false);
      return;
    }

    setTimeout(() => {
      setMessage({ type: 'success', text: 'Mật khẩu đã được cập nhật thành công!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSaving(false);
    }, 1000);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <div><HeaderDash />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Hồ Sơ Cá Nhân</h1>
          <p className="text-slate-600">Quản lý thông tin tài khoản của bạn</p>
        </div>

        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center mb-8">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-blue-600 text-white text-3xl">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Thông Tin
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Mật Khẩu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Thông Tin Cá Nhân</CardTitle>
                <CardDescription>
                  Cập nhật tên hiển thị và ảnh đại diện của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      Tên Hiển Thị
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên của bạn"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatarUrl" className="text-base font-medium">
                      URL Ảnh Đại Diện
                    </Label>
                    <Input
                      id="avatarUrl"
                      type="url"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="h-11"
                    />
                    <p className="text-sm text-slate-500">
                      Nhập URL của ảnh đại diện bạn muốn sử dụng
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <Button
                    type="submit"
                    disabled={saving}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang lưu...
                      </>
                    ) : (
                      'Lưu Thay Đổi'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Thay Đổi Email</CardTitle>
                <CardDescription>
                  Cập nhật địa chỉ email của bạn. Bạn sẽ cần xác nhận email mới.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateEmail} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Hiện Tại
                    </Label>
                    <Input
                      id="current-email"
                      type="email"
                      value="nguyenvanan@example.com"
                      disabled
                      className="h-11 bg-slate-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Mới
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="h-11"
                      required
                    />
                  </div>

                  <Separator className="my-6" />

                  <Button
                    type="submit"
                    disabled={saving}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang cập nhật...
                      </>
                    ) : (
                      'Cập Nhật Email'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Thay Đổi Mật Khẩu</CardTitle>
                <CardDescription>
                  Đảm bảo mật khẩu của bạn có ít nhất 6 ký tự
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-base font-medium">
                      Mật Khẩu Mới
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nhập mật khẩu mới"
                      className="h-11"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-base font-medium">
                      Xác Nhận Mật Khẩu
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                      className="h-11"
                      required
                      minLength={6}
                    />
                  </div>

                  <Separator className="my-6" />

                  <Button
                    type="submit"
                    disabled={saving || !newPassword || !confirmPassword}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang cập nhật...
                      </>
                    ) : (
                      'Đổi Mật Khẩu'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </div>
  );
}
