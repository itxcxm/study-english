"use client"
import { Header } from "@/components/views/Header";
import { Hero } from "@/components/views/Hero";
import { Courses } from "@/components/views/Courses";
import { Features } from "@/components/views/Features";
import { Pricing } from "@/components/views/Pricing";
import { Footer } from "@/components/views/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Courses />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
