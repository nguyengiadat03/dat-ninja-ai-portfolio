import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Eye, ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";

const News = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Cuộn về đầu trang khi component load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const articles = [
    {
      title:
        "AI và tương lai của phát triển web: Những xu hướng không thể bỏ qua",
      excerpt:
        "Khám phá cách AI đang thay đổi cách chúng ta phát triển ứng dụng web và những công cụ mới đang reshape industry.",
      date: "2024-02-10",
      category: "AI Technology",
      readTime: "5 phút đọc",
      views: 1250,
      image:
        "https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/sukien.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vc3VraWVuLmpwZyIsImlhdCI6MTc1NTUwNjI3NiwiZXhwIjoxNzg3MDQyMjc2fQ.Y_jTAEpwr31JcRqj8aBJxPVO02kziZnr3TRD-GOELEU",
      featured: true,
    },
    {
      title: "React 19: Những tính năng mới đáng chú ý cho developers",
      excerpt:
        "Tổng hợp những tính năng mới trong React 19 và cách chúng sẽ cải thiện developer experience.",
      date: "2024-02-05",
      category: "Frontend",
      readTime: "7 phút đọc",
      views: 980,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    },
    {
      title: "Xây dựng chatbot thông minh với OpenAI GPT-4",
      excerpt:
        "Hướng dẫn chi tiết cách tích hợp GPT-4 vào ứng dụng web để tạo ra những chatbot thông minh.",
      date: "2024-01-28",
      category: "Tutorial",
      readTime: "10 phút đọc",
      views: 2100,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    },
    {
      title: "Performance optimization cho React apps: Best practices 2024",
      excerpt:
        "Những kỹ thuật và tools hiệu quả nhất để tối ưu hóa performance cho ứng dụng React.",
      date: "2024-01-20",
      category: "Performance",
      readTime: "8 phút đọc",
      views: 1560,
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
    },
    {
      title: "Tailwind CSS: Từ zero đến hero trong 30 ngày",
      excerpt:
        "Roadmap hoàn chỉnh để master Tailwind CSS từ cơ bản đến nâng cao với các project thực tế.",
      date: "2024-01-15",
      category: "CSS",
      readTime: "12 phút đọc",
      views: 3200,
      image:
        "https://st.quantrimang.com/photos/image/2023/03/02/Tailwind-CSS-theme-7.jpg",
    },
    {
      title: "React 19: Những điểm mới và cách áp dụng ngay",
      excerpt:
        "Khám phá các tính năng mới nhất của React 19 như Server Components, Actions và Suspense.",
      date: "2024-05-10",
      category: "Frontend",
      readTime: "8 phút đọc",
      views: 5400,
      image:
        "https://blog.nashtechglobal.com/wp-content/uploads/2024/12/React-19-1024x576.jpg",
    },
    {
      title: "Spring Boot 3: Tích hợp với Cloud Native dễ dàng",
      excerpt:
        "Hướng dẫn triển khai Spring Boot 3 với Docker và Kubernetes cho các ứng dụng enterprise.",
      date: "2024-03-22",
      category: "Tutorial",
      readTime: "10 phút đọc",
      views: 4200,
      image:
        "https://200lab.io/blog/_next/image?url=https%3A%2F%2Fstatics.cdn.200lab.io%2F2024%2F11%2Fspring-boot-la-gi.png&w=3840&q=75",
    },
    {
      title: "AI 2025: Xu hướng và ứng dụng trong doanh nghiệp",
      excerpt:
        "Báo cáo tổng quan về cách các công ty đang tận dụng AI để tối ưu quy trình và tăng lợi nhuận.",
      date: "2024-12-01",
      category: "AI Technology",
      readTime: "15 phút đọc",
      views: 8900,
      image:
        "https://pub-e93d5c9fdf134c89830082377f6df465.r2.dev/2024/12/AI-in-2025-From-Hype-to-Reality-What-s-Next.webp",
    },
    {
      title: "Thiết kế UX hiện đại: 7 nguyên tắc vàng",
      excerpt:
        "Làm thế nào để xây dựng trải nghiệm người dùng cuốn hút và giữ chân khách hàng lâu dài.",
      date: "2024-08-05",
      category: "CSS",
      readTime: "7 phút đọc",
      views: 3100,
      image:
        "https://vndigitech.com/wp-content/uploads/2024/03/nguyen-tac-thiet-ke-uiux-digitec.webp",
    },
    {
      title: "DevOps thực chiến: CI/CD với GitHub Actions",
      excerpt:
        "Triển khai pipeline CI/CD tự động, giảm thiểu rủi ro khi release sản phẩm.",
      date: "2024-07-18",
      category: "Performance",
      readTime: "9 phút đọc",
      views: 2750,
      image:
        "https://assets.techrepublic.com/uploads/2023/03/Figure.B.DevOps-770x462.jpeg",
    },
    {
      title: "AI tạo sinh trong y tế: Cuộc cách mạng mới",
      excerpt:
        "Các mô hình AI tạo sinh đang hỗ trợ bác sĩ trong chẩn đoán hình ảnh và đề xuất phác đồ điều trị cá nhân hóa.",
      date: "2025-02-12",
      category: "AI Technology",
      readTime: "10 phút đọc",
      views: 7400,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsV8wDR1lim639TPvtAoEcqPs1joyVvcmxmJ924cWJDVZ3NebX2HCv-6BMkY-lRxAqJO4&usqp=CAU",
    },
    {
      title: "Quantum Computing và kỷ nguyên mới của mã hóa",
      excerpt:
        "Máy tính lượng tử đe dọa các hệ thống mã hóa truyền thống, buộc doanh nghiệp phải nghiên cứu giải pháp bảo mật hậu lượng tử.",
      date: "2025-01-28",
      category: "Tutorial",
      readTime: "12 phút đọc",
      views: 5200,
      image: "https://vnptai.io/storage/thumbnail/quantum-computing-la-gi.jpg",
    },
    {
      title: "AI và Robotics trong sản xuất công nghiệp",
      excerpt:
        "Robot thông minh tích hợp AI đang nâng cao hiệu suất dây chuyền, giảm chi phí và cải thiện an toàn lao động.",
      date: "2025-02-01",
      category: "AI Technology",
      readTime: "9 phút đọc",
      views: 6800,
      image:
        "https://smartindustry.vn/wp-content/uploads/2024/06/1706548686851.png",
    },
    {
      title: "Cybersecurity 2025: Cuộc chiến chống lại AI tấn công",
      excerpt:
        "Tin tặc đang sử dụng AI để phát triển mã độc tinh vi hơn, đặt ra yêu cầu cấp thiết về phòng thủ chủ động.",
      date: "2025-02-10",
      category: "Performance",
      readTime: "13 phút đọc",
      views: 8900,
      image: "https://cdn.bap-software.net/2024/06/27220717/Cyber-Security.jpg",
    },
    {
      title: "Metaverse và AI: Tương lai của không gian ảo",
      excerpt:
        "AI đang biến Metaverse thành trải nghiệm cá nhân hóa, với NPC thông minh và môi trường thích ứng theo hành vi người dùng.",
      date: "2025-01-30",
      category: "AI Technology",
      readTime: "11 phút đọc",
      views: 6100,
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=250&fit=crop",
    },
    {
      title: "Điện toán biên (Edge Computing) và AI",
      excerpt:
        "Sự kết hợp giữa Edge Computing và AI cho phép xử lý dữ liệu nhanh chóng ngay tại thiết bị IoT, giảm độ trễ và chi phí truyền tải.",
      date: "2025-02-15",
      category: "AI Technology",
      readTime: "8 phút đọc",
      views: 5700,
      image:
        "https://cloud-web-cms-v2.s3.cloud.cmctelecom.vn/nhuoc_diem_cua_edge_computing_3_ae2981cc6d.jpg",
    },
  ];

  const categories = [
    "All",
    "AI Technology",
    "Frontend",
    "Tutorial",
    "Performance",
    "CSS",
  ];

  // Filter articles based on category and search term
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.find((article) => article.featured);
  const regularArticles = filteredArticles.filter(
    (article) => !article.featured
  );

  return (
    <div className="min-h-screen py-20 bg-gradient-to-r from-green-400 to-yellow-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tin tức & Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Những bài viết, tutorial và chia sẻ kinh nghiệm về công nghệ, lập
            trình và phát triển sự nghiệp trong ngành IT.
          </p>
        </div>
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            {/* Icon bên trái */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />

            {/* Input */}
            <Input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-2 w-full rounded-lg border border-border bg-background/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />

            {/* Icon bên phải */}
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Card className="mb-12 overflow-hidden bg-gradient-card border-none shadow-lg card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-primary text-white">
                    Bài viết nổi bật
                  </Badge>
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">{featuredArticle.category}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(featuredArticle.date).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {featuredArticle.title}
                </h2>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{featuredArticle.readTime}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{featuredArticle.views}</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="secondary"
                    className="bg-gradient-primary text-white hover:bg-primary-dark font-semibold px-6 py-3 rounded-xl group-hover:scale-105 transition-all duration-300"
                  >
                    <a
                      href="https://funix.edu.vn/chia-se-kien-thuc/kham-pha-vai-tro-cua-ai-trong-phat-trien-web/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Đọc bài viết
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Articles Grid */}
        {regularArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-gradient-card border-none shadow-lg card-hover"
              >
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(article.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{article.readTime}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="secondary"
                      className="bg-gradient-primary text-white hover:bg-primary-dark font-semibold px-6 py-3 rounded-xl group-hover:scale-105 transition-all duration-300"
                    >
                      <a
                        href="https://vbee.vn/blog/openai/chatgpt-4o/?utm_source=BL&utm_medium=CPC&utm_term=Vietnam&utm_campaign=SM_GG_DU_NBR_AS_A_VN_B_UNK_UNK&gad_source=1&gad_campaignid=21793655902&gbraid=0AAAAA-NgIlG__625klMO7Dv-5wc4Y81kr&gclid=Cj0KCQjw5JXFBhCrARIsAL1ckPsPVATmoXf0f6wS2XGNbINROIsOBq_MCVn45DGnXGeSvmhMou1jNVAaAv8SEALw_wcB"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Đọc thêm
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                Không tìm thấy bài viết nào
              </h3>
              <p className="text-sm">
                {searchTerm
                  ? `Không có kết quả cho "${searchTerm}"`
                  : `Không có bài viết nào trong danh mục "${selectedCategory}"`}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16">
          <Card className="p-8 bg-gradient-hero border-none text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Đăng ký nhận tin tức mới nhất
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nhận những bài viết mới nhất về công nghệ, tutorial và kinh nghiệm
              phát triển sự nghiệp trong ngành IT ngay trong email của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              />
              <Button className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale">
                Đăng ký
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default News;
