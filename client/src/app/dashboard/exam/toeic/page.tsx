"use client";

import { useState } from "react";
import { Clock, FileText, Headphones, Filter, Search, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderDash } from "@/components/views/HeaderDash";

const exams = [
  {
    id: 1,
    title: "TOEIC Practice Test 1",
    type: "full",
    difficulty: "Trung bình",
    duration: "2h",
    completed: false,
    score: null,
    totalQuestions: 200,
    sections: { listening: 100, reading: 100 },
    isPremium: false,
  },
  {
    id: 2,
    title: "TOEIC Practice Test 2",
    type: "full",
    difficulty: "Khó",
    duration: "2h",
    completed: true,
    score: 850,
    totalQuestions: 200,
    sections: { listening: 100, reading: 100 },
    isPremium: false,
  },
  {
    id: 3,
    title: "TOEIC Practice Test 3",
    type: "full",
    difficulty: "Dễ",
    duration: "2h",
    completed: false,
    score: null,
    totalQuestions: 200,
    sections: { listening: 100, reading: 100 },
    isPremium: false,
  },
  {
    id: 4,
    title: "TOEIC Listening Part 1-4",
    type: "listening",
    difficulty: "Trung bình",
    duration: "45m",
    completed: false,
    score: null,
    totalQuestions: 100,
    sections: { listening: 100 },
    isPremium: false,
  },
  {
    id: 5,
    title: "TOEIC Reading Part 5-7",
    type: "reading",
    difficulty: "Khó",
    duration: "75m",
    completed: true,
    score: 420,
    totalQuestions: 100,
    sections: { reading: 100 },
    isPremium: false,
  },
  {
    id: 6,
    title: "TOEIC Part 1: Photographs",
    type: "listening",
    difficulty: "Dễ",
    duration: "10m",
    completed: false,
    score: null,
    totalQuestions: 10,
    sections: { listening: 10 },
    isPremium: false,
  },
  {
    id: 7,
    title: "TOEIC Part 5: Incomplete Sentences",
    type: "reading",
    difficulty: "Trung bình",
    duration: "20m",
    completed: true,
    score: 35,
    totalQuestions: 40,
    sections: { reading: 40 },
    isPremium: false,
  },
  {
    id: 8,
    title: "TOEIC Full Test - Advanced",
    type: "full",
    difficulty: "Khá khó",
    duration: "2h",
    completed: false,
    score: null,
    totalQuestions: 200,
    sections: { listening: 100, reading: 100 },
    isPremium: true,
  },
  {
    id: 9,
    title: "TOEIC Part 7: Reading Comprehension",
    type: "reading",
    difficulty: "Khó",
    duration: "40m",
    completed: false,
    score: null,
    totalQuestions: 54,
    sections: { reading: 54 },
    isPremium: true,
  },
];

const sections = [
  { id: "all", name: "Tất cả", icon: FileText },
  { id: "listening", name: "Listening", icon: Headphones },
  { id: "reading", name: "Reading", icon: FileText },
];

export default function TOEICPage() {
  const [selectedSection, setSelectedSection] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const filteredExams = exams.filter((exam) => {
    const matchesSection =
      selectedSection === "all" || exam.type === selectedSection || exam.type === "full";
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || exam.difficulty === difficultyFilter;

    return matchesSection && matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "bg-green-100 text-green-700";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-700";
      case "Khó":
      case "Khá khó":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getScoreLevel = (score: number) => {
    if (score >= 900) return { text: "Xuất sắc", color: "text-green-600" };
    if (score >= 785) return { text: "Rất tốt", color: "text-blue-600" };
    if (score >= 605) return { text: "Tốt", color: "text-yellow-600" };
    if (score >= 405) return { text: "Trung bình", color: "text-orange-600" };
    return { text: "Cần cải thiện", color: "text-red-600" };
  };

  return (
    <div>
      <HeaderDash />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Luyện thi TOEIC</h1>
          <p className="text-lg text-gray-600 mb-6">
            Hệ thống đề thi TOEIC chuẩn quốc tế với 200 câu hỏi - Listening & Reading
          </p>

          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">200</div>
                  <div className="text-sm text-gray-600">Câu hỏi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">120m</div>
                  <div className="text-sm text-gray-600">Thời gian</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">990</div>
                  <div className="text-sm text-gray-600">Điểm tối đa</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">7</div>
                  <div className="text-sm text-gray-600">Phần thi</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{section.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm đề thi..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Độ khó" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Dễ">Dễ</SelectItem>
              <SelectItem value="Trung bình">Trung bình</SelectItem>
              <SelectItem value="Khó">Khó</SelectItem>
              <SelectItem value="Khá khó">Khá khó</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => {
            const scoreLevel = exam.score ? getScoreLevel(exam.score) : null;
            return (
              <Card
                key={exam.id}
                className="flex flex-col hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getDifficultyColor(exam.difficulty)}>
                      {exam.difficulty}
                    </Badge>
                    {exam.isPremium && (
                      <Badge className="bg-amber-100 text-amber-700">Premium</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{exam.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {exam.duration} • {exam.totalQuestions} câu
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-2">
                    {exam.sections.listening && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Headphones className="w-4 h-4" />
                          <span>Listening</span>
                        </div>
                        <span className="font-medium">
                          {exam.sections.listening} câu
                        </span>
                      </div>
                    )}
                    {exam.sections.reading && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FileText className="w-4 h-4" />
                          <span>Reading</span>
                        </div>
                        <span className="font-medium">
                          {exam.sections.reading} câu
                        </span>
                      </div>
                    )}
                  </div>

                  {exam.completed && exam.score && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-green-700">
                            {exam.score}
                          </div>
                          <div className={`text-sm font-medium ${scoreLevel?.color}`}>
                            {scoreLevel?.text}
                          </div>
                        </div>
                        <Award className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={exam.completed ? "outline" : "default"}
                    disabled={exam.isPremium}
                  >
                    {exam.isPremium
                      ? "Yêu cầu Premium"
                      : exam.completed
                      ? "Làm lại"
                      : "Bắt đầu thi"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy đề thi phù hợp</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
