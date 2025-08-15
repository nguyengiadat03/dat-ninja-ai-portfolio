import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
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
  Heart
} from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
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
      description: "Chuyên nghiệp trong React, TypeScript, Tailwind CSS và các công nghệ web hiện đại nhất.",
    },
    {
      icon: <Palette className="w-8 h-8 text-secondary-dark" />,
      title: "UI/UX Design",
      description: "Kết hợp nghệ thuật và khoa học để tạo ra những trải nghiệm người dùng đáng nhớ.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Digital Marketing",
      description: "Hiểu sâu về marketing số và tối ưu hóa trải nghiệm khách hàng trực tuyến.",
    },
    {
      icon: <Bot className="w-8 h-8 text-success" />,
      title: "AI Chatbot",
      description: "Phát triển và triển khai các giải pháp AI thông minh cho doanh nghiệp.",
    },
    {
      icon: <Video className="w-8 h-8 text-warning" />,
      title: "Content Creator",
      description: "Tạo nội dung chất lượng cao về công nghệ và lập trình cho cộng đồng.",
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
          className="absolute inset-0 parallax-bg opacity-30"
          style={{
            backgroundImage: `url(${ninjaAIBanner})`,
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Nguyễn Gia Đạt</span>
              <br />
              <span className="text-gradient-primary">Lập Trình Viên</span>
              <br />
              <span className="text-foreground">FrontEnd & Nhà Sáng Tạo</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Kết hợp nghệ thuật và công nghệ để tạo nên những sản phẩm web mang dấu ấn riêng, 
              tối ưu trải nghiệm người dùng và kiến tạo trải nghiệm số đột phá.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/chuong-trinh/ninja-ai">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale btn-ripple shadow-green px-8 py-4 text-lg"
                >
                  Tìm hiểu chương trình TTS Ninja AI
                  <ArrowRight className="w-5 h-5 ml-2" />
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
            
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span>5+ năm kinh nghiệm</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>100+ dự án thành công</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary-dark" />
                <span>Mentor chuyên nghiệp</span>
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
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-primary text-white p-4 rounded-full shadow-lg animate-pulse-glow">
                <Code className="w-8 h-8" />
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
              Những lĩnh vực tôi đam mê và có thể mang lại giá trị cho dự án của bạn
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
                    <strong className="text-foreground">Tận tâm với từng dự án:</strong> Luôn đặt chất lượng và trải nghiệm người dùng lên hàng đầu
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Học hỏi không ngừng:</strong> Luôn cập nhật các công nghệ và xu hướng mới nhất
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Hợp tác hiệu quả:</strong> Giao tiếp rõ ràng và phản hồi nhanh chóng
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Sáng tạo và đổi mới:</strong> Không ngừng tìm kiếm những giải pháp độc đáo
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
                    <span className="text-foreground">dat.nguyen@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Hà Nội, Việt Nam</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-secondary/20 rounded-lg">
                  <p className="text-muted-foreground mb-2">
                    <strong className="text-foreground">Sở thích:</strong> Chơi game, xem phim, đọc sách về công nghệ
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Mục tiêu:</strong> Trở thành một mentor giúp nhiều người trẻ phát triển sự nghiệp trong lĩnh vực công nghệ
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
