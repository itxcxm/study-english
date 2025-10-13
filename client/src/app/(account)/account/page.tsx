"use client";

import { useState, useEffect } from "react";
import { User, Lock, CreditCard, History, Grid3x3, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  full_name?: string;
  birth_date?: string;
  phone?: string;
  country?: string;
  city?: string;
  occupation?: string;
  avatar_url?: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("vn");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [activeTab, setActiveTab] = useState("account");

//   useEffect(() => {
//     loadUser();
//   }, []);

//   async function loadUser() {
//     try {
//       const { data: { user: authUser } } = await supabase.auth.getUser();

//       if (authUser) {
//         setUser({
//           id: authUser.id,
//           email: authUser.email || "",
//           created_at: authUser.created_at || "",
//           full_name: authUser.user_metadata?.full_name || "",
//           birth_date: authUser.user_metadata?.birth_date || "",
//           phone: authUser.user_metadata?.phone || "",
//           country: authUser.user_metadata?.country || "vn",
//           city: authUser.user_metadata?.city || "",
//           occupation: authUser.user_metadata?.occupation || "",
//           avatar_url: authUser.user_metadata?.avatar_url || "",
//         });
//         setFullName(authUser.user_metadata?.full_name || "");
//         setBirthDate(authUser.user_metadata?.birth_date || "");
//         setPhone(authUser.user_metadata?.phone || "");
//         setCountry(authUser.user_metadata?.country || "vn");
//         setCity(authUser.user_metadata?.city || "");
//         setOccupation(authUser.user_metadata?.occupation || "");
//       }
//     } catch (error) {
//       console.error("Error loading user:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleUpdateProfile() {
//     try {
//       const { error } = await supabase.auth.updateUser({
//         data: {
//           full_name: fullName,
//           birth_date: birthDate,
//           phone: phone,
//           country: country,
//           city: city,
//           occupation: occupation
//         }
//       });

//       if (error) throw error;

//       await loadUser();
//       alert("Cập nhật thành công!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-neutral-50">
//         <div className="animate-pulse text-neutral-600">Loading...</div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-neutral-50">
//         <div className="text-center">
//           <p className="text-neutral-600 mb-4">Vui lòng đăng nhập</p>
//           <Button onClick={() => window.location.href = "/login"}>
//             Đăng nhập
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const initials = user.full_name
//     ? user.full_name.split(" ").map(n => n[0]).join("").toUpperCase()
//     : user.email[0].toUpperCase();

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-neutral-200 p-6">
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("account")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === "account"
                ? "bg-blue-50 text-blue-600"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="font-medium">Tài khoản</span>
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === "password"
                ? "bg-blue-50 text-blue-600"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <Lock className="h-5 w-5" />
            <span className="font-medium">Mật khẩu</span>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === "history"
                ? "bg-blue-50 text-blue-600"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <History className="h-5 w-5" />
            <span className="font-medium">Lịch sử đơn hàng</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Blue Header with Avatar */}
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 h-48">
          <div className="absolute -bottom-16 left-12">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              {/* <AvatarImage src={user.avatar_url} alt={user.full_name || user.email} /> */}
              {/* <AvatarFallback className="text-4xl bg-white text-blue-600">{initials}</AvatarFallback> */}
            </Avatar>
          </div>
        </div>

        {/* Form Content */}
        <div className="pt-20 px-12 pb-12">
          <div className="max-w-4xl">
            <div className="grid grid-cols-2 gap-6">
              {/* Họ và tên */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-neutral-700">
                  Họ và tên<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="pham Thanh Tùng"
                  className="bg-neutral-50 border-neutral-200"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-700 flex items-center gap-2">
                  Email<span className="text-red-500">*</span>
                  <span className="text-neutral-400 text-xs">?</span>
                </Label>
                <Input
                  id="email"
                //   value={user.email}
                  disabled
                  className="bg-neutral-100 border-neutral-200 text-neutral-500"
                />
              </div>

              {/* Ngày sinh */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-neutral-700">
                  Ngày sinh<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="12/03/2005"
                  className="bg-neutral-50 border-neutral-200"
                />
              </div>

              {/* Số điện thoại */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-neutral-700">
                  Số điện thoại
                </Label>
                <div className="flex gap-2">
                  <Select value="+84">
                    <SelectTrigger className="w-24 bg-neutral-50 border-neutral-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+84">+84</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="397924866"
                    className="flex-1 bg-neutral-50 border-neutral-200"
                  />
                </div>
              </div>

              {/* Quốc gia */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-neutral-700">
                  Quốc gia<span className="text-red-500">*</span>
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="bg-neutral-50 border-neutral-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vn">🇻🇳 Vietnam</SelectItem>
                    <SelectItem value="us">🇺🇸 United States</SelectItem>
                    <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                    <SelectItem value="jp">🇯🇵 Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tỉnh thành */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-neutral-700">
                  Tỉnh thành
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="bg-neutral-50 border-neutral-200">
                    <SelectValue placeholder="Chọn tỉnh thành" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                    <SelectItem value="hn">Hà Nội</SelectItem>
                    <SelectItem value="dn">Đà Nẵng</SelectItem>
                    <SelectItem value="ct">Cần Thơ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nghề nghiệp */}
              <div className="space-y-2 col-span-2">
                <Label htmlFor="occupation" className="text-neutral-700">
                  Nghề nghiệp
                </Label>
                <Select value={occupation} onValueChange={setOccupation}>
                  <SelectTrigger className="bg-neutral-50 border-neutral-200">
                    <SelectValue placeholder="Chọn nghề nghiệp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Sinh viên</SelectItem>
                    <SelectItem value="teacher">Giáo viên</SelectItem>
                    <SelectItem value="engineer">Kỹ sư</SelectItem>
                    <SelectItem value="doctor">Bác sĩ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button className="text-neutral-500 text-sm hover:text-neutral-700">
                Xoá tài khoản
              </button>
              <Button
                // onClick={handleUpdateProfile}
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                Sửa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
