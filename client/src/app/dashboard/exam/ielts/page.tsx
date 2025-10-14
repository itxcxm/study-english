"use client";

import { useState } from "react";
import { Clock, FileText, Headphones, MessageSquare, Pencil, Filter, Search } from "lucide-react";
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
    title: "IELTS Practice Test 1",
    type: "full",
    difficulty: "Trung bình",
    duration: "2h 45m",
    completed: false,
    score: null,
    sections: { listening: 40, reading: 40, writing: 2, speaking: 3 },
    isPremium: false,
  },
  {
    id: 2,
    title: "IELTS Practice Test 2",
    type: "full",
    difficulty: "Khó",
    duration: "2h 45m",
    completed: true,
    score: 7.5,
    sections: { listening: 40, reading: 40, writing: 2, speaking: 3 },
    isPremium: false,
  },
  {
    id: 3,
    title: "IELTS Practice Test 3",
    type: "full",
    difficulty: "Dễ",
    duration: "2h 45m",
    completed: false,
    score: null,
    sections: { listening: 40, reading: 40, writing: 2, speaking: 3 },
    isPremium: false,
  },
  {
    id: 4,
    title: "IELTS Listening Practice",
    type: "listening",
    difficulty: "Trung bình",
    duration: "30m",
    completed: false,
    score: null,
    sections: { listening: 40 },
    isPremium: false,
  },
  {
    id: 5,
    title: "IELTS Reading Practice",
    type: "reading",
    difficulty: "Khó",
    duration: "60m",
    completed: true,
    score: 8.0,
    sections: { reading: 40 },
    isPremium: false,
  },
  {
    id: 6,
    title: "IELTS Writing Task 1 & 2",
    type: "writing",
    difficulty: "Trung bình",
    duration: "60m",
    completed: false,
    score: null,
    sections: { writing: 2 },
    isPremium: true,
  },
  {
    id: 7,
    title: "IELTS Speaking Practice",
    type: "speaking",
    difficulty: "Dễ",
    duration: "14m",
    completed: false,
    score: null,
    sections: { speaking: 3 },
    isPremium: true,
  },
  {
    id: 8,
    title: "IELTS Academic Test 1",
    type: "full",
    difficulty: "Khó",
    duration: "2h 45m",
    completed: false,
    score: null,
    sections: { listening: 40, reading: 40, writing: 2, speaking: 3 },
    isPremium: true,
  },
];

const sections = [
  { id: "all", name: "Tất cả", icon: FileText },
  { id: "listening", name: "Listening", icon: Headphones },
  { id: "reading", name: "Reading", icon: FileText },
  { id: "writing", name: "Writing", icon: Pencil },
  { id: "speaking", name: "Speaking", icon: MessageSquare },
];

export default function IELTSPage() {
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
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <HeaderDash />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Luyện thi IELTS</h1>
          <p className="text-lg text-gray-600">
            Hệ thống đề thi IELTS chuẩn quốc tế với 4 kỹ năng: Listening, Reading, Writing, Speaking
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
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
                  <span className="hidden sm:inline">{section.name}</span>
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
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="flex flex-col hover:shadow-lg transition-shadow">
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
                  {exam.duration}
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
                      <span className="font-medium">{exam.sections.listening} câu</span>
                    </div>
                  )}
                  {exam.sections.reading && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>Reading</span>
                      </div>
                      <span className="font-medium">{exam.sections.reading} câu</span>
                    </div>
                  )}
                  {exam.sections.writing && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Pencil className="w-4 h-4" />
                        <span>Writing</span>
                      </div>
                      <span className="font-medium">{exam.sections.writing} task</span>
                    </div>
                  )}
                  {exam.sections.speaking && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageSquare className="w-4 h-4" />
                        <span>Speaking</span>
                      </div>
                      <span className="font-medium">{exam.sections.speaking} phần</span>
                    </div>
                  )}
                </div>

                {exam.completed && exam.score && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-700 font-medium">
                      Điểm đã đạt: {exam.score}
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
          ))}
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
