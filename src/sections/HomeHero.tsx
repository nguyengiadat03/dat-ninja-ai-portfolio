import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, Star, Users, Award } from "lucide-react";
import heroPortrait from "@/assets/NguyenGiaDat.jpg";
import ninjaAIBanner from "@/assets/background.mp4";

const HomeHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let allow = true;
          const conn = (navigator as any)?.connection;
          if (conn?.saveData) allow = false;
          if (/(^|-)2g/.test(conn?.effectiveType || "")) allow = false;
          if (allow) setShouldLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    const v = videoRef.current;
    v.load();
    const p = v.play();
    if (p && typeof p.then === "function") p.catch(() => {});
  }, [shouldLoadVideo]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 parallax-bg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          {shouldLoadVideo && <source src={ninjaAIBanner} type="video/mp4" />}
        </video>
      </div>

      <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left animate-fade-in-left">
          <h1 className="mb-6 leading-tight">
            <span className="block text-center text-xl md:text-4xl lg:text-5xl font-bold text-white -mt-2 lg:-mt-4">
              Nguyễn Gia Đạt
            </span>
            <br />
            <span className="block text-center text-base md:text-2xl lg:text-3xl font-semibold text-primary">
              FrontEnd Developer
            </span>
            <br />
            <span className="block text-center text-base md:text-lg lg:text-xl font-medium text-white">
              "Tương lai của AI không phải là thay thế con người, mà là tăng
              cường khả năng của con người."
            </span>
            <span className="block mt-8 text-sm md:text-base lg:text-lg font-medium text-gray-400">
              Lập Trình Viên FrontEnd, BackEnd, Machine Learning và Ứng dụng
              AI-First với các công nghệ sử dụng: HTML5, CSS3, TailwindCSS,
              ReactJS, VueJS, NodeJS, ExpressJS, MongoDB, MySQL, Python.
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/chuong-trinh/ninja-ai">
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 
                 text-white font-semibold hover:from-green-600 hover:to-green-700 
                 shadow-lg shadow-green-300/50 
                 hover:shadow-xl hover:shadow-green-400/60 
                 transition-all duration-300 ease-in-out 
                 px-8 py-4 text-lg rounded-2xl overflow-hidden animate-breathe"
              >
                <span className="relative z-10 flex items-center">
                  Tìm hiểu chương trình TTS Ninja AI
                  <ArrowRight className="w-5 h-5 ml-2" />
                  <Zap className="w-5 h-5 ml-2 animate-pulse" />
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                   translate-x-[-100%] hover:translate-x-[100%] 
                   transition-transform duration-700 ease-in-out rounded-2xl"
                />
              </Button>
            </Link>

            <Link to="/gioi-thieu/du-an">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white btn-scale px-8 py-4 text-lg"
              >
                Xem dự án tiêu biểu
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-white">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-warning fill-current" />
              <span className="font-semibold">2+ Năm kinh nghiệm</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold">50+ Dự án thành công</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-secondary-dark" />
              <span className="font-semibold">Mentor chuyên nghiệp</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end animate-float">
          <div className="relative">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl border-4 border-white/20">
              <img
                src={heroPortrait}
                alt="Nguyễn Gia Đạt - Professional Portrait"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
