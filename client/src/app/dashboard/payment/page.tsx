"use client";

import { useState } from "react";
import { CreditCard, Wallet, Building2, Smartphone, ArrowLeft, Check, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    id: "basic",
    name: "Basic English Course",
    price: 49,
    duration: "3 months",
    features: ["50+ video lessons", "Basic grammar", "Email support"],
  },
  {
    id: "professional",
    name: "Professional Course",
    price: 99,
    duration: "6 months",
    features: ["200+ video lessons", "Live tutoring", "Certificate"],
    popular: true,
  },
  {
    id: "ielts",
    name: "IELTS Preparation",
    price: 149,
    duration: "3 months",
    features: ["50+ practice tests", "Expert guidance", "Mock exams"],
  },
];

type PaymentMethod = "card" | "paypal" | "bank" | "wallet";

export default function PaymentPage() {
  const [step, setStep] = useState<"select" | "payment">("select");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    email: "",
    country: "",
    zipCode: "",
  });

  const selectedCourseData = courses.find((c) => c.id === selectedCourse);

  const handleContinueToPayment = () => {
    if (selectedCourse) {
      setStep("payment");
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Thanh toán thành công! Bạn đã đăng ký khóa học ${selectedCourseData?.name}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <Button
          variant="ghost"
          asChild
          className="mb-6"
        >
          <a href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang chủ
          </a>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
                <CardDescription>Chọn cách bạn muốn thanh toán</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                  <div className="grid grid-cols-2 gap-4">
                    <Label
                      htmlFor="card"
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                          : "border-border hover:border-blue-300"
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Thẻ tín dụng/ghi nợ</span>
                    </Label>

                    <Label
                      htmlFor="paypal"
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "paypal"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                          : "border-border hover:border-blue-300"
                      }`}
                    >
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Wallet className="w-5 h-5" />
                      <span className="font-medium">PayPal</span>
                    </Label>

                    <Label
                      htmlFor="bank"
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "bank"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                          : "border-border hover:border-blue-300"
                      }`}
                    >
                      <RadioGroupItem value="bank" id="bank" />
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">Chuyển khoản ngân hàng</span>
                    </Label>

                    <Label
                      htmlFor="wallet"
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "wallet"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                          : "border-border hover:border-blue-300"
                      }`}
                    >
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Smartphone className="w-5 h-5" />
                      <span className="font-medium">Ví điện tử</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {paymentMethod === "card" && (
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin thẻ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Số thẻ</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Tên chủ thẻ</Label>
                    <Input
                      id="card-name"
                      placeholder="Nguyen Van A"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Ngày hết hạn</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={3}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "paypal" && (
              <Card>
                <CardHeader>
                  <CardTitle>Thanh toán PayPal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Bạn sẽ được chuyển tới PayPal để hoàn tất thanh toán một cách an toàn.
                  </p>
                  <Button className="w-full" variant="outline">
                    <Wallet className="w-4 h-4 mr-2" />
                    Tiếp tục với PayPal
                  </Button>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "bank" && (
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chuyển khoản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tên ngân hàng:</span>
                      <span className="font-medium">Ngân hàng Study English</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Số tài khoản:</span>
                      <span className="font-medium">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mã SWIFT:</span>
                      <span className="font-medium">SEBKUS33</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Vui lòng ghi mã đơn hàng trong nội dung chuyển khoản.
                  </p>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "wallet" && (
              <Card>
                <CardHeader>
                  <CardTitle>Ví điện tử</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Apple Pay
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Google Pay
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Samsung Pay
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Thông tin thanh toán</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Địa chỉ email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Quốc gia</Label>
                    <Select
                      value={billingInfo.country}
                      onValueChange={(v) => setBillingInfo({ ...billingInfo, country: v })}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Chọn quốc gia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">Hoa Kỳ</SelectItem>
                        <SelectItem value="uk">Vương quốc Anh</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Úc</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Mã bưu chính</Label>
                    <Input
                      id="zip"
                      placeholder="12345"
                      value={billingInfo.zipCode}
                      onChange={(e) => setBillingInfo({ ...billingInfo, zipCode: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium mb-1">{selectedCourseData?.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCourseData?.duration} truy cập</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>${selectedCourseData?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Thuế</span>
                    <span>$0</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng</span>
                  <span>${selectedCourseData?.price}</span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Đang xử lý..." : `Thanh toán $${selectedCourseData?.price}`}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4">
                  <Shield className="w-3 h-3" />
                  <span>Bảo mật bằng mã hóa SSL 256-bit</span>
                </div>

                <div className="bg-muted p-3 rounded-lg space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <Lock className="w-3 h-3 mt-0.5 text-green-600" />
                    <span className="text-muted-foreground">
                      Thông tin thanh toán của bạn được mã hóa và an toàn
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
