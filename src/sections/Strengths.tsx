import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Code, Palette, TrendingUp, Bot, Video, Server } from "lucide-react";

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

const Strengths = () => {
  const strengthsRef = useRef<HTMLElement>(null);

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

    if (strengthsRef.current) observer.observe(strengthsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
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
  );
};

export default Strengths;
