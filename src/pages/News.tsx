import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, ArrowRight } from "lucide-react";

const News = () => {
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
      image: "https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/sukien.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vc3VraWVuLmpwZyIsImlhdCI6MTc1NTUwNjI3NiwiZXhwIjoxNzg3MDQyMjc2fQ.Y_jTAEpwr31JcRqj8aBJxPVO02kziZnr3TRD-GOELEU",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
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

  return (
    <div className="min-h-screen py-20">
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

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={
                index === 0
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        {articles[0].featured && (
          <Card className="mb-12 overflow-hidden bg-gradient-card border-none shadow-lg card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
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
                  <Badge variant="secondary">{articles[0].category}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(articles[0].date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {articles[0].title}
                </h2>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {articles[0].excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{articles[0].readTime}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{articles[0].views}</span>
                    </div>
                  </div>

                  <Button className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale">
                    Đọc bài viết
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article, index) => (
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
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-dark"
                  >
                    Đọc thêm
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
