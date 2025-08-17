import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Calendar, Users } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Nền tảng thương mại điện tử hoàn chỉnh với tính năng thanh toán trực tuyến, quản lý sản phẩm và hệ thống đánh giá người dùng.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      duration: "3 tháng",
      team: "4 người",
      highlights: [
        "Xử lý 1000+ giao dịch/ngày",
        "Responsive design cho mọi thiết bị",
        "SEO optimized",
        "Real-time notifications",
      ],
    },
    {
      title: "AI Chatbot Healthcare",
      description:
        "Chatbot AI hỗ trợ tư vấn y tế cơ bản, tích hợp với hệ thống bệnh viện và có khả năng học hỏi từ dữ liệu bệnh nhân.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
      technologies: [
        "Python",
        "TensorFlow",
        "React",
        "OpenAI API",
        "PostgreSQL",
      ],
      liveUrl: "#",
      githubUrl: "#",
      duration: "4 tháng",
      team: "3 người",
      highlights: [
        "95% độ chính xác trong chẩn đoán cơ bản",
        "Hỗ trợ đa ngôn ngữ",
        "HIPAA compliant",
        "24/7 available",
      ],
    },
    {
      title: "Learning Management System",
      description:
        "Hệ thống quản lý học tập trực tuyến với tính năng video streaming, bài kiểm tra tự động và theo dõi tiến độ học tập.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
      technologies: ["Next.js", "Prisma", "MySQL", "AWS S3", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      duration: "5 tháng",
      team: "5 người",
      highlights: [
        "5000+ học viên đăng ký",
        "Video streaming tốc độ cao",
        "AI-powered recommendations",
        "Analytics dashboard",
      ],
    },
    {
      title: "Smart IoT Dashboard",
      description:
        "Dashboard điều khiển và giám sát các thiết bị IoT trong nhà thông minh, với tính năng tự động hóa và báo cáo năng lượng.",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop",
      technologies: ["Vue.js", "Express.js", "InfluxDB", "MQTT", "D3.js"],
      liveUrl: "#",
      githubUrl: "#",
      duration: "2 tháng",
      team: "2 người",
      highlights: [
        "Real-time data visualization",
        "30% tiết kiệm năng lượng",
        "Voice control integration",
        "Mobile app companion",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-green-200 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-pulse">
            Dự án tiêu biểu
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tổng hợp những dự án đặc sắc mà tôi đã tham gia phát triển, từ ứng
            dụng web đến các giải pháp AI và IoT. Mỗi dự án đều thể hiện sự sáng
            tạo và chuyên môn trong lĩnh vực công nghệ.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`overflow-hidden bg-gradient-card border-none shadow-lg card-hover ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                  index % 2 === 1 ? "lg:grid-cols-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Thời gian: {project.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Team: {project.team}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">
                      Công nghệ sử dụng:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">
                      Điểm nổi bật:
                    </h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      asChild
                      className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo Live
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-primary text-primary hover:bg-primary hover:text-white btn-scale"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-hero border-none">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Có ý tưởng dự án mới?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tôi luôn sẵn sàng thảo luận về những ý tưởng sáng tạo và cùng nhau
              biến chúng thành hiện thực. Hãy liên hệ để chúng ta có thể hợp
              tác!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale shadow-green"
            >
              <a href="/lien-he">Thảo luận dự án</a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;
