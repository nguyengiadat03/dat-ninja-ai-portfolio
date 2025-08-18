import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Code,
  Palette,
  TrendingUp,
  Bot,
  Video,
  ArrowRight,
  Star,
  Users,
  Award,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import heroPortrait from "@/assets/áo mu.jpg";
import ninjaAIBanner from "@/assets/ninja-ai-banner.jpg";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const strengthsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef, strengthsRef, contactRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const strengths = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "FrontEnd Developer",
      description:
        "Chuyên nghiệp trong React, TypeScript, Tailwind CSS và các công nghệ web hiện đại nhất.",
    },
    {
      icon: <Palette className="w-8 h-8 text-secondary-dark" />,
      title: "UI/UX Design",
      description:
        "Kết hợp nghệ thuật và khoa học để tạo ra những trải nghiệm người dùng đáng nhớ.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Digital Marketing",
      description:
        "Hiểu sâu về marketing số và tối ưu hóa trải nghiệm khách hàng trực tuyến.",
    },
    {
      icon: <Bot className="w-8 h-8 text-success" />,
      title: "AI Chatbot",
      description:
        "Phát triển và triển khai các giải pháp AI thông minh cho doanh nghiệp.",
    },
    {
      icon: <Video className="w-8 h-8 text-warning" />,
      title: "Content Creator",
      description:
        "Tạo nội dung chất lượng cao về công nghệ và lập trình cho cộng đồng.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0 parallax-bg opacity-900"
          style={{
            backgroundImage: `url(${ninjaAIBanner})`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in-left">
            <h1 className="mb-6 leading-tight">
              <span className="block text-center text-xl md:text-4xl lg:text-5xl font-bold text-white -mt-2 lg:-mt-4">
                Nguyễn Gia Đạt
              </span>

              <br></br>
              <span className="block text-center text-base md:text-2xl lg:text-3xl font-semibold text-gradient-primary">
                From Ninja Ai
              </span>
              <br></br>
              <span className="block text-center text-base md:text-lg lg:text-xl font-medium text-white">
                “Tương lai của AI không phải là thay thế con người, mà là tăng
                cường khả năng của con người.”
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
                  onClick={() =>
                    document
                      .getElementById("application-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="relative z-10 flex items-center">
                    Tìm hiểu chương trình TTS Ninja AI
                    <ArrowRight className="w-5 h-5 ml-2" />
                    <Zap className="w-5 h-5 ml-2 animate-pulse" />
                  </span>

                  {/* Hiệu ứng ánh sáng quét qua nút */}
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
                <span className="font-semibold">5+ năm kinh nghiệm</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-semibold">100+ dự án thành công</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary-dark" />
                <span className="font-semibold">Mentor chuyên nghiệp</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-float ">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl border-4 border-white/20">
                <img
                  src={heroPortrait}
                  alt="Nguyễn Gia Đạt - Professional Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section ref={strengthsRef} className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thế mạnh nổi bật
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những lĩnh vực tôi đam mê và có thể mang lại giá trị cho dự án của
              bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strengths.map((strength, index) => (
              <Card
                key={index}
                className="p-6 text-center card-hover-green bg-gradient-card border-none hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                    {strength.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {strength.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {strength.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Style & Contact Section */}
      <section ref={contactRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Phong cách làm việc & Liên hệ
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Tận tâm với từng dự án:
                    </strong>{" "}
                    Luôn đặt chất lượng và trải nghiệm người dùng lên hàng đầu
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Học hỏi không ngừng:
                    </strong>{" "}
                    Luôn cập nhật các công nghệ và xu hướng mới nhất
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Hợp tác hiệu quả:
                    </strong>{" "}
                    Giao tiếp rõ ràng và phản hồi nhanh chóng
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Sáng tạo và đổi mới:
                    </strong>{" "}
                    Không ngừng tìm kiếm những giải pháp độc đáo
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Card className="p-8 bg-gradient-card border-none shadow-lg">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Thông tin liên hệ
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      nguyengiadat2k03@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      Hai Bà Trưng - Hà Nội
                    </span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-secondary/20 rounded-lg">
                  <p className="text-muted-foreground mb-2">
                    <strong className="text-foreground">Sở thích:</strong> Đá
                    bóng, xem phim, đọc sách về công nghệ.
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Mục tiêu:</strong> Trở
                    thành một mentor giúp nhiều người trẻ phát triển sự nghiệp
                    trong lĩnh vực công nghệ
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-lg font-medium text-gradient-primary italic">
                    "Mỗi dòng code đều có thể thay đổi thế giới"
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link to="/lien-he">
                    <Button className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale">
                      Liên hệ ngay <Heart className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
