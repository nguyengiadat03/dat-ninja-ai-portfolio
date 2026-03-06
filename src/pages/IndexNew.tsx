import { useEffect } from "react";
import SEO from "@/components/SEO";
import {
  HomeHero,
  Strengths,
  Testimonials,
  NewsSection,
  ContactCTA,
} from "@/sections";

const Index = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO
        title="Trang chủ"
        description="Nguyễn Gia Đạt - Lập trình viên Frontend chuyên nghiệp với kinh nghiệm về React, TypeScript, AI và Machine Learning. Founder của Ninja AI."
        keywords="frontend developer, react, typescript, AI, machine learning, ninja ai, web development, Nguyễn Gia Đạt"
      />

      <div className="min-h-screen">
        <HomeHero />
        <Strengths />
        <Testimonials />
        <NewsSection />
        <ContactCTA />
      </div>
    </>
  );
};

export default Index;
