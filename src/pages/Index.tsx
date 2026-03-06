import { useEffect, useRef, useState } from "react";
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
import heroPortrait from "@/assets/NguyenGiaDat.jpg";
import ninjaAIBanner from "@/assets/background.mp4";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const strengthsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

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
      { threshold: 0.1 },
    );

    [heroRef, strengthsRef, contactRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

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

  // --- thêm: đảm bảo play mượt khi đã nạp ---
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    const v = videoRef.current;
    // load() để áp preload="metadata" → request nhẹ trước khi play
    v.load();
    const p = v.play();
    if (p && typeof p.then === "function") p.catch(() => {});
  }, [shouldLoadVideo]);

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
        <div className="absolute inset-0 parallax-bg overflow-hidden">
          {/* Sửa: lazy load + preload metadata + chỉ gắn source khi cần */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            // poster={heroPoster} // nếu có ảnh poster, bật dòng này
            aria-hidden="true"
          >
            {shouldLoadVideo && (
              <>
                {/* Ưu tiên webm nếu có */}
                {/* <source src={ninjaAIWebm} type="video/webm" /> */}
                <source src={ninjaAIBanner} type="video/mp4" />
              </>
            )}
          </video>
        </div>

        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in-left">
            <h1 className="mb-6 leading-tight">
              <span className="block text-center text-xl md:text-4xl lg:text-5xl font-bold text-white -mt-2 lg:-mt-4">
                Nguyễn Gia Đạt
              </span>

              <br></br>
              <span className="block text-center text-base md:text-2xl lg:text-3xl font-semibold text-primary">
                FrontEnd Developer
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
              <span className="text-foreground">Chia sẻ - </span>
              <span className="text-primary">Truyền cảm hứng</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto italic">
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
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto italic">
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
                      asChild
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl group-hover:scale-105 transition-all duration-300"
                    >
                      <a
                        href="https://www.intergreat.com/vi?language=en&language=en&language=en"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Đọc toàn bộ bài viết
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
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
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
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
              <div
                className="relative h-48 bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://media.stockimg.ai/image/v2/U1tAzs2V5Kcc.png?quality=75&width=1024')",
                }}
              >
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
                  Trí tuệ nhân tạo (AI) không còn là xu hướng mà đã trở thành
                  nền tảng cốt lõi thúc đẩy đổi mới trong mọi lĩnh vực, từ giáo
                  dục, kinh doanh, y tế đến sáng tạo nội dung và phát triển phần
                  mềm. Sự phát triển vượt bậc của AI không chỉ giúp tối ưu quy
                  trình làm việc, mà còn mở ra vô hạn cơ hội cho cá nhân và
                  doanh nghiệp.{" "}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Khám phá những công cụ AI mới nhất và mạnh mẽ nhất giúp tăng
                  hiệu suất làm việc và sáng tạo trong năm 2025.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 font-bold">
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
                  <a
                    href="https://tokyotechlab.com/vi/blogs/best-artificial-intelligence-software"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đọc thêm
                  </a>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Frontend Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div
                className="relative h-48 bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage:
                    "url('data:image/jpeg;base64,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')",
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Bạn tò mò về Next.js và lý do tại sao nó lại trở thành
                  framework được yêu thích bởi các nhà phát triển? Hướng dẫn
                  Next.js thú vị này là tài liệu hoàn hảo cho người mới bắt đầu,
                  giúp bạn khám phá cách framework mạnh mẽ này đơn giản hóa việc
                  phát triển web và mở khóa các tính năng tuyệt vời của nó.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 font-bold">
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
                  <a
                    href="https://200lab.io/blog/react-19-co-gi-moi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đọc thêm
                  </a>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Backend Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div
                className="relative h-48 bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://co-well.vn/wp-content/uploads/2020/06/microservice-01-scaled.jpg')",
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    BackEnd
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Microservices là một kiến trúc phát triển phần mềm trong đó
                  một ứng dụng lớn được xây dựng như một tập hợp các dịch vụ
                  nhỏ, độc lập, có khả năng triển khai (deploy) riêng biệt. Mỗi
                  dịch vụ tập trung vào một chức năng nghiệp vụ cụ thể và giao
                  tiếp với các dịch vụ khác.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 font-bold">
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
                  <a
                    href="https://tuyendung.evotek.vn/what-is-spring-cloud-microservices-made-simple/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đọc thêm
                  </a>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* UI/UX Design Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div
                className="relative h-48 bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://sadesign.vn/pictures/picfullsizes/2025/02/17/xsu1739803634.png')",
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Desgin
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Thiết kế hệ thống (Design System) năm 2025 tập trung vào việc
                  xây dựng giao diện người dùng (UI) nhất quán và có khả năng mở
                  rộng, đáp ứng nhu cầu đa dạng của người dùng trên nhiều nền
                  tảng. Các yếu tố chính bao gồm xây dựng các component UI tái
                  sử dụng, thiết lập quy tắc thiết kế rõ ràng.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 font-bold">
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
                  <a
                    href="https://tuyendung.evotek.vn/what-is-spring-cloud-microservices-made-simple/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đọc thêm
                  </a>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Tech Trends Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div
                className="relative h-48 bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/bia_ninjjaai.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vYmlhX25pbmpqYWFpLnBuZyIsImlhdCI6MTc1NTY2MjQ2MSwiZXhwIjoxNzg3MTk4NDYxfQ.aHCz9Y4ecSmza0UckxaUyOIyC-rc703H_frhtF_SOaU')",
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Techonoly
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Chương trình Ninja AI được thiết kế để đào tạo thế hệ kỹ sư
                  công nghệ mới - những người không chỉ thành thạo về lập trình
                  mà còn hiểu sâu về lập trình và ứng dụng AI vào công việc, đời
                  sống và có khả năng áp dụng vào các dự án thực tế.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 font-bold">
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
                  <a
                    href="https://tuyendung.evotek.vn/what-is-spring-cloud-microservices-made-simple/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đọc thêm
                  </a>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Productivity Tips Article */}
            <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div
                className="relative h-48 bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://www.fahasa.com/blog/wp-content/uploads/2025/01/AI-dai-dien.jpg')",
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Tip & TricksTricks
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Trí tuệ nhân tạo (AI) đang hiện diện ở khắp mọi nơi, từ những
                  bản demo GPT-5 đầy ấn tượng cho đến các công cụ trợ lý doanh
                  nghiệp hứa hẹn làm thay công việc của bạn. Tuy nhiên, nếu bạn
                  là một lập trình viên thực thụ, điều bạn quan tâm hơn cả là
                  những công cụ AI nào bạn.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 font-bold">
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
                  <a
                    href="https://tuyendung.evotek.vn/10-cong-cu-ai-ma-nguon-mo-dot-pha-moi-lap-trinh-vien-nen-biet/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đọc thêm
                  </a>
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
              <a
                href="https://tuyendung.evotek.vn/10-cong-cu-ai-ma-nguon-mo-dot-pha-moi-lap-trinh-vien-nen-biet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem tất cả bài viết
              </a>
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
