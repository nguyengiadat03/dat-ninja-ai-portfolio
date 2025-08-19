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
  Server,
  Check,
  Quote,
  Calendar,
  Eye,
  ExternalLink,
  Newspaper,
} from "lucide-react";
import heroPortrait from "@/assets/áo mu.jpg";
import ninjaAIBanner from "@/assets/ninja-ai-banner.jpg";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const strengthsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Cuộn về đầu trang khi component load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
    {
      icon: <Server className="w-8 h-8 text-primary" />,
      title: "Backend Developer",
      description:
        "Phát triển và tối ưu hệ thống với Java Spring Boot, RESTful API và cơ sở dữ liệu MySQL.",
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
              <span className="block text-center text-base md:text-2xl lg:text-3xl font-semibold text-primary">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Thế mạnh </span>
              <span className="text-primary">nổi bật</span>
            </h2>

            <p className="text-lg text-foreground max-w-4xl mx-auto italic">
              Những lĩnh vực tôi đam mê và có thể mang lại giá trị cho dự án của
              bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strengths.map((strength, index) => (
              <Card
                key={index}
                className="p-6 text-center card-hover-green bg-green-50 border-none hover:scale-105 transition-all duration-300 shadow-lg"
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

      {/* Trusted Partners Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-warning">🤝 </span>
              <span className="text-foreground">Chia sẻ, truyền cảm hứng</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              "Những chia sẻ giá trị về nghề nghiệp từ các nhà đầu tư tâm huyết,
              luôn đồng hành và định hướng cùng tôi"
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <Card className="relative p-6 bg-white border-none shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full mr-4">
                  <img
                    src="https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/cto-nguyen-huu-kien.png"
                    alt="Nguyễn Hữu Kiên"
                    className="w-16 h-16 rounded-full object-cover border-green-500 border-2"
                  />
                  {/* Verified Check Icon */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Nguyễn Hữu Kiên
                  </h4>
                  <p className="text-sm font-semibold text-primary">CTO</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Rockket Global | CenGroup
                  </p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  (5.0)
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                “Tương lai của AI không phải là thay thế con người, mà là tăng
                cường khả năng của con người.”
              </p>
            </Card>

            {/* Testimonial 2 */}
            <Card className="relative p-6 bg-white border-none shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full mr-4">
                  <img
                    src="https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/ha-tuan-anh-locaith.jpg"
                    alt="Hà Anh Tuấn"
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  {/* Verified Check Icon */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Hà Anh Tuấn</h4>
                  <p className="text-sm font-semibold text-primary">
                    CEO & Founder
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Locaith Solution Tech
                  </p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  (5.0)
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                “AI sẽ không thay thế con người, nhưng những người sử dụng AI sẽ
                thay thế những người không sử dụng.”
              </p>
            </Card>

            {/* Testimonial 3 */}
            <Card className="relative p-6 bg-white border-none shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full mr-4">
                  <img
                    src="https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/ly-hoang-hai-ceo-bmc.jpg"
                    alt="Lý Hoàng Hải"
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  {/* Verified Check Icon */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Lý Hoàng Hải
                  </h4>
                  <p className="text-sm font-semibold text-primary">CEO</p>
                  <p className="text-xs text-muted-foreground">BMC</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  (5.0)
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                "Thời gian của mỗi chúng ta là có hạn. Vì thế đừng dùng nó để
                sống cuộc đời của một ai khác"
              </p>
            </Card>

            {/* Testimonial 4 */}
            <Card className="relative p-6 bg-white border-none shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full mr-4">
                  <img
                    src="https://huans-ai-stage.vercel.app/avt.png"
                    alt="Nguyễn Hữu Huân"
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  {/* Verified Check Icon */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Nguyễn Hữu Huân
                  </h4>
                  <p className="text-sm font-semibold text-primary">Mentor</p>
                  <p className="text-xs text-muted-foreground">Rocket Global</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  (5.0)
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                “Rủi ro lớn nhất là không dám chấp nhận bất kỳ rủi ro nào. Trong
                một thế giới đang ngày một thay đổi nhanh chóng, chiến lược duy
                nhất đảm bảo rằng sẽ thất bại là không chấp nhận những rủi ro.”
              </p>
            </Card>

            {/* Testimonial 5 */}
            <Card className="relative p-6 bg-white border-none shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full mr-4">
                  <img
                    src="https://funix.edu.vn/wp-content/uploads/2022/02/ngo-hoang-anh.jpeg"
                    alt="Lê Thành Công"
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  {/* Verified Check Icon */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Lê Thành Công
                  </h4>
                  <p className="text-sm font-semibold text-primary">
                    Leader Team
                  </p>
                  <p className="text-xs text-muted-foreground">Rocket Global</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  (5.0)
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                “Bạn không chọn đam mê. Mà đam mê chọn bạn. Tất cả chúng ta đều
                có một đam mê nào đó. Và những ai theo đuổi nó đều là những
                người may mắn.”
              </p>
            </Card>

            {/* Testimonial 6 */}
            <Card className="relative p-6 bg-white border-none shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full mr-4">
                  <img
                    src="https://img.cenland.vn/images/2022/08/634053229_Hoi-nghi-chien-l%C6%B0%C6%A1c-Cen-Group-2022%20(3).jpg"
                    alt="Nguyễn Phùng Minh Hằng"
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  {/* Verified Check Icon */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Nguyễn Phùng Minh Hằng
                  </h4>
                  <p className="text-sm font-semibold text-primary">
                    Tổng giám đốc
                  </p>
                  <p className="text-xs text-muted-foreground">Cen Academy</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  (5.0)
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                Công nghệ được chi phối bởi hai loại người: người hiểu những gì
                mình không quản lý, và người quản lý những gì mình không hiểu.
              </p>
            </Card>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                10+
              </div>
              <div className="text-sm text-muted-foreground">
                Đối tác tin tưởng
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-success">
                10+
              </div>
              <div className="text-sm text-muted-foreground">
                Dự án thành công
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-warning">
                98%
              </div>
              <div className="text-sm text-muted-foreground">
                Tỷ lệ hài lòng
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-secondary-dark">
                5★
              </div>
              <div className="text-sm text-muted-foreground">
                Đánh giá trung bình
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Articles Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">📰 </span>
              <span className="text-foreground">Blog & Ký kết và Hợp tác</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Những bài viết, tin tức và chia sẻ kinh nghiệm về công nghệ, AI và
              phát triển phần mềm
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-16">
            <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              <div className="relative p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        <Newspaper className="w-6 h-6 text-white" />
                      </div>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        Tin tức nổi bật
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                      Lễ Ký Kết Hợp Tác Chiến Lược với Tập Đoàn InterGreat
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      Rocket Global chính thức ký kết hợp tác chiến lược với Tập
                      đoàn InterGreat, mở ra những cơ hội phát triển mới trong
                      lĩnh vực công nghệ AI và chuyển đổi số.
                    </p>
                    <div className="flex items-center text-white/80 mb-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-6">1 Tháng 8, 2025</span>
                      <Eye className="w-4 h-4 mr-2" />
                      <span>2,903 lượt xem</span>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl group-hover:scale-105 transition-all duration-300"
                    >
                      Đọc toàn bộ bài viết
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="w-full h-full rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 border border-white/20">
                      <img
                        src="https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/tintuc1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vdGludHVjMS5qcGciLCJpYXQiOjE3NTU1MDU3NDksImV4cCI6MTc4NzA0MTc0OX0.tBiZ22QjgIPGOhl-GV-Qsv7RxVIEKBjK9Ug4T_bOAfo"
                        alt="Hình ảnh lễ ký kết Rocket Global × InterGreat"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm text-white/80 text-center">
                        Rocket Global × InterGreat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* AI Tools Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Bot className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">AI Tools 2025</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    AI & Machine Learning
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  Top 15 AI Tools Không Thể Bỏ Qua Trong Năm 2025
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Khám phá những công cụ AI mới nhất và mạnh mẽ nhất giúp tăng
                  hiệu suất làm việc và sáng tạo trong năm 2025.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>12 Tháng 1, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>1,234 views</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Frontend Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Code className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Frontend Development</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Frontend
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  React 19 & Next.js 15: Những Tính Năng Mới Đáng Chú Ý
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Tìm hiểu về những cập nhật mới nhất trong React 19 và Next.js
                  15, cùng với các best practices để tối ưu hiệu suất ứng dụng.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>10 Tháng 1, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>987 views</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Backend Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Server className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Backend Development</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Backend
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  Microservices với Spring Boot: Kinh Nghiệm Thực Tế
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Chia sẻ kinh nghiệm xây dựng hệ thống microservices với Spring
                  Boot, từ thiết kế architecture đến deployment.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>8 Tháng 1, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>756 views</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* UI/UX Design Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-teal-400 to-cyan-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Palette className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">UI/UX Design</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Design
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  Design System 2025: Xây Dựng UI Nhất Quán và Scalable
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Hướng dẫn chi tiết cách xây dựng design system hiệu quả, từ
                  component library đến design tokens.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>5 Tháng 1, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>643 views</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Tech Trends Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-indigo-400 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Tech Trends</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Technology
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  Rocket Global: Hành Trình Phát Triển và Tầm Nhìn Tương Lai
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Câu chuyện về sự phát triển của Rocket Global và những kế
                  hoạch tham vọng trong việc ứng dụng AI vào các sản phẩm công
                  nghệ.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>3 Tháng 1, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>1,567 views</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Productivity Tips Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-rose-400 to-pink-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Zap className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Productivity</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Tips & Tricks
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  10 Mẹo Sử Dụng AI Tools Để Tăng Hiệu Suất Lập Trình
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Những mẹo thực tế để tận dụng sức mạnh của AI trong việc viết
                  code, debug và tối ưu hóa quy trình phát triển.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>1 Tháng 1, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>2,134 views</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>
          </div>

          {/* View All Articles Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Xem tất cả bài viết
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
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
