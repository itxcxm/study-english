"use client";

// import các hook và component cần thiết
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, Pencil, Trash2, Shield, Users, UserCheck, UserX } from "lucide-react";
import api from "@/lib/api";
import { checkAdminRole } from "@/lib/auth";

// Định nghĩa interface User cho phù hợp với API
interface User {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "suspended";
  avatar_url?: string;
  createdAt: string;
  updatedAt: string;
}



// Trang quản trị người dùng
export default function AdminPage() {
  const router = useRouter();

  // State lưu trữ danh sách người dùng, trạng thái loading, dialog, v.v..
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  // State lưu thông tin form để tạo/cập nhật user
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "user" as "admin" | "user" | "moderator",
    status: "active" as "active" | "inactive" | "suspended",
    avatar_url: "",
  });
  const { toast } = useToast();

  // State thống kê user theo vai trò, trạng thái
  const [stats, setStats] = useState({
    total: 0,
    admin: 0,
    active: 0,
    suspended: 0,
  });

  // Hàm tính toán lại số lượng từng loại user (bằng tiếng Việt)
  const calculateStats = useCallback(() => {
    setStats({
      total: users.length,
      admin: users.filter((u) => u.role === "admin").length,
      active: users.filter((u) => u.status === "active").length,
      suspended: users.filter((u) => u.status === "suspended").length,
    });
  }, [users]);

  // Hàm lấy danh sách user từ API (dùng Toast báo lỗi/OK, code tiếng Việt)
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");

      if (response.data.success) {
        setUsers(response.data.data || []);
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.response?.data?.message || "Không thể tải danh sách người dùng",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Kiểm tra quyền admin khi component mount
  useEffect(() => {
    const verifyAdmin = async () => {
      const { isAdmin } = await checkAdminRole();
      
      if (!isAdmin) {
        // Nếu không phải admin, chuyển về trang chủ
        router.push("/");
        return;
      }
      
      setIsCheckingAuth(false);
    };

    verifyAdmin();
  }, [router]);

  // Gọi API lấy user khi lần đầu render
  useEffect(() => {
    if (!isCheckingAuth) {
      fetchUsers();
    }
  }, [fetchUsers, isCheckingAuth]);

  // Tính toán lại số liệu mỗi khi danh sách user thay đổi
  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  // Hàm xử lý tạo user mới (nút Thêm Người Dùng)
  const handleCreateUser = async () => {
    try {
      setActionLoading(true);
      const response = await api.post("/users", formData);

      if (response.data.success) {
        setUsers([response.data.data, ...users]);
        setOpenDialog(false);
        resetForm();
        toast({
          title: "Thành công",
          description: "Đã tạo người dùng mới",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.response?.data?.message || "Không thể tạo người dùng",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Hàm xử lý cập nhật thông tin user (nút sửa)
  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);

      // Chỉ gửi các trường cần thiết, chỉ gửi password khi thay đổi
      const updateData: any = {
        name: formData.name,
        role: formData.role,
        status: formData.status,
        avatar_url: formData.avatar_url,
      };

      // Nếu có password mới thì thêm vào updateData (bằng tiếng Việt)
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await api.put(`/users/${selectedUser._id}`, updateData);

      if (response.data.success) {
        setUsers(users.map((u) => (u._id === selectedUser._id ? response.data.data : u)));
        setOpenDialog(false);
        resetForm();
        toast({
          title: "Thành công",
          description: "Đã cập nhật thông tin người dùng",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.response?.data?.message || "Không thể cập nhật người dùng",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Hàm xử lý xoá user khỏi hệ thống (nút Thùng rác)
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);
      const response = await api.delete(`/users/${selectedUser._id}`);

      if (response.data.success) {
        setUsers(users.filter((u) => u._id !== selectedUser._id));
        setOpenDeleteDialog(false);
        setSelectedUser(null);
        toast({
          title: "Thành công",
          description: "Đã xóa người dùng",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.response?.data?.message || "Không thể xóa người dùng",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Hàm mở dialog sửa và điền sẵn thông tin user (bằng tiếng Việt comment)
  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      password: "",
      role: user.role,
      status: user.status,
      avatar_url: user.avatar_url || "",
    });
    setOpenDialog(true);
  };

  // Hàm mở dialog tạo mới user, reset form (bằng tiếng Việt)
  const openCreateDialog = () => {
    resetForm();
    setSelectedUser(null);
    setOpenDialog(true);
  };

  // Reset form về mặc định mỗi lần tạo/sửa xong
  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      password: "",
      role: "user",
      status: "active",
      avatar_url: "",
    });
    setSelectedUser(null);
  };

  // Hàm lấy variant Badge cho role (màu sắc)
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "moderator":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Hàm lấy variant Badge cho status (màu sắc)
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "suspended":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Hiển thị loading trong khi kiểm tra quyền admin
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="space-y-6">
        {/* Tiêu đề trang và nút Thêm Người Dùng */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Quản Lý Người Dùng</h1>
            <p className="text-muted-foreground mt-2">
              Quản lý và phân quyền cho người dùng trong hệ thống
            </p>
          </div>
          <Button onClick={openCreateDialog} size="lg">
            <UserPlus className="mr-2 h-5 w-5" />
            Thêm Người Dùng
          </Button>
        </div>

        {/* Hiển thị các thống kê tổng quan người dùng */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Người Dùng</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quản Trị Viên</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.admin}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đang Hoạt Động</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bị Khóa</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.suspended}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bảng danh sách người dùng */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Người Dùng</CardTitle>
            <CardDescription>
              Xem và quản lý tất cả người dùng trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              // Đang tải thì hiện icon loader
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : users.length === 0 ? (
              // Không có user thì hiện thông báo
              <div className="text-center py-12 text-muted-foreground">
                Chưa có người dùng nào trong hệ thống
              </div>
            ) : (
              // Hiện bảng danh sách user
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Vai Trò</TableHead>
                      <TableHead>Trạng Thái</TableHead>
                      <TableHead>Ngày Tạo</TableHead>
                      <TableHead className="text-right">Hành Động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role === "admin" && "Quản Trị"}
                            {user.role === "moderator" && "Kiểm Duyệt"}
                            {user.role === "user" && "Người Dùng"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>
                            {user.status === "active" && "Hoạt Động"}
                            {user.status === "inactive" && "Không Hoạt Động"}
                            {user.status === "suspended" && "Bị Khóa"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {/* Nút Sửa */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {/* Nút Xoá */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog tạo mới hoặc cập nhật user */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Cập Nhật Người Dùng" : "Thêm Người Dùng Mới"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser
                ? "Cập nhật thông tin và quyền hạn của người dùng"
                : "Tạo tài khoản mới cho người dùng"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input Tên */}
            <div className="space-y-2">
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            {/* Input Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!!selectedUser}
              />
            </div>
            {/* Input Mật khẩu */}
            <div className="space-y-2">
              <Label htmlFor="password">
                {selectedUser ? "Mật Khẩu Mới (để trống nếu không đổi)" : "Mật Khẩu"}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            {/* Select vai trò */}
            <div className="space-y-2">
              <Label htmlFor="role">Vai Trò</Label>
              <Select
                value={formData.role}
                onValueChange={(value: any) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Người Dùng</SelectItem>
                  <SelectItem value="moderator">Kiểm Duyệt Viên</SelectItem>
                  <SelectItem value="admin">Quản Trị Viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Select trạng thái */}
            <div className="space-y-2">
              <Label htmlFor="status">Trạng Thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt Động</SelectItem>
                  <SelectItem value="inactive">Không Hoạt Động</SelectItem>
                  <SelectItem value="suspended">Bị Khóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Input link ảnh đại diện */}
            <div className="space-y-2">
              <Label htmlFor="avatar_url">URL Ảnh Đại Diện</Label>
              <Input
                id="avatar_url"
                placeholder="https://example.com/avatar.jpg"
                value={formData.avatar_url}
                onChange={(e) =>
                  setFormData({ ...formData, avatar_url: e.target.value })
                }
              />
            </div>
          </div>
          {/* Footer của Dialog gồm nút Hủy và nút xác nhận */}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Hủy
            </Button>
            <Button
              onClick={selectedUser ? handleUpdateUser : handleCreateUser}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : selectedUser ? (
                "Cập Nhật"
              ) : (
                "Tạo Mới"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa user */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              {/* Thông báo tên user bị xóa */}
              Hành động này không thể hoàn tác. Người dùng{" "}
              <span className="font-semibold">{selectedUser?.name}</span> sẽ bị xóa vĩnh viễn
              khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedUser(null)}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={actionLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                "Xóa"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
