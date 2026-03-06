import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, ArrowRight, ExternalLink, Bot } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Top 15 AI Tools Không Thể Bỏ Qua Trong Năm 2025",
    excerpt:
      "Trí tuệ nhân tạo (AI) không còn là xu hướng mà đã trở thành nền tảng cốt lõi thúc đẩy đổi mới trong mọi lĩnh vực.",
    category: "AI & Machine Learning",
    date: "2025-01-12",
    views: 1234,
    image:
      "https://media.stockimg.ai/image/v2/U1tAzs2V5Kcc.png?quality=75&width=1024",
    url: "https://tokyotechlab.com/vi/blogs/best-artificial-intelligence-software",
    categoryColor: "bg-green-500",
  },
  {
    id: 2,
    title: "React 19 & Next.js 15: Những Tính Năng Mới Đáng Chú Ý",
    excerpt:
      "Bạn tò mò về Next.js và lý do tại sao nó lại trở thành framework được yêu thích bởi các nhà phát triển?",
    category: "Frontend",
    date: "2025-01-10",
    views: 987,
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMVFhUWGBgXGBcVFRcVGBoYGBcXFhUXFRgYHSggGBolHRgXIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0NFQ8QFS0ZFR0rLS03LS0rNy03KzctLDcrKzItKzcrLSsrNzc3KysrKys3LS0rKysrKysrKystKysrK//AABEIAKMBNgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABAgADBQYHBAj/xABKEAABAwIDBAYJAQQFCgcAAAABAAIRAyEEEjEFQVFhBhMicYHwBxQykaGxwdHhQhUjUvEWJDNi0wg1RlNyoqSzxdIXNENjc4Ky/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDrg1RaDGqg1SUqktmPd7/qgsIuPO5MCgTpzRDboAzS/wB0/C6BbY+eaYNQEC6I5oB145IvNkEeNI48eXxTpWmw5pgbwgKKAv8AJEtHuQSL/RAgwfGJPJDrO3ljdM/hMwgz3kGCgDWmBe/FPvRaLI5BM79UCARJKlMyBeeenfbcjVu13cfl8EMO3sgd/wA0DzuSM/VcG+5OWCZ3qujEugb7ygI0HhvTTeEoAyiBa29Fw7Q10Pd5sggGvnchmETuPkItfM8vykIho1tHCde5A8JALlWFIx1ygSuCW2MHinRypXajxQKDc+CRlm9ojvVgYASeKqcQWaW4aaFA6BTEIIK6oMGEjzpfzZOSI+3ele0SNUBSU9E83VdM236n5ygLlCoVCgVRQFRARqjFrKBEWCCXso2cxva1vPimhBp7R7h5+KCU5jfMnUzvMcdysANfilpkwrAgA15It0RCEwCUBcNE4SZQ6D3FMHXhAIMHXf8AhFwMCPFMRYpmoCgN6OW8+CICBXOgCTwTKutRBABmx/CuQCElVsMt1BQEgGD7vEJQ/tEcITuSh4mJuECvdAsoHaKai6BXXFo96bebHT3pmoFAlN0+9RFqCAg3StPZM8+W9MAo82QEnRWBJw088E6AAiPPenhIdLJmoI09o93n5pzcEd4+iQanhA4c558E4KBmoBozTvhBztO9MNeSBnH5pKzoy6+0NI+qLjYxr9UWTAnXegmftxyTtGqSe14JKEjNPx86aILiyQBwUNXtZY3TPv8AsUCTAiN092+E2/wQFu/v+ikiB4fhATf4KGYGk2/KCEjMNZjwRcyQRx+0KXnkiSgWgwNaAPM3TEXlK2YHG35SPzZxHsxf4/hAxObM3w96FNmVsa/zTpM1rxPLT4oC59wOMoh2vJI53aA7+CDJkzpuQEOtN4+KV9SCBGvnz3qNJy8+f4RMeKAlU0rNtfv9x07laV53glvG/wAPrH0QXkqptKHF3H8fb4lHNGUHXfpwTIKhAb54wmKD7Axb3BEoFy3lB2iMpXTB4+Y1QBzRblopKWrMiPH4flHegDXSopKiCN1Pgq47PiP/ANBBRBdT0HcPkrAoogUaJju7/oVFEDAX8PuhQ0PeVFEAr6t7/qFeoogqpaO7yrhoFFECD2vd8j9laUVEC09B3BOFFEEQ3DwUUQMgN/ncoogjdAkce2O4/RRRA6oB7DfO5RRAta229x+RV5UUQJT0S1D2m+PyQUQOvNR/s/BRRAa3tDz+pv3KsUUQV4n2fd8woNB53KKIEb7R87mp1FEClRBRBXTRUUQf/9k=",
    url: "https://200lab.io/blog/react-19-co-gi-moi",
    categoryColor: "bg-red-500",
  },
  {
    id: 3,
    title: "Microservices với Spring Boot: Kinh Nghiệm Thực Tế",
    excerpt:
      "Microservices là một kiến trúc phát triển phần mềm trong đó một ứng dụng lớn được xây dựng như một tập hợp các dịch vụ nhỏ.",
    category: "BackEnd",
    date: "2025-01-08",
    views: 756,
    image:
      "https://co-well.vn/wp-content/uploads/2020/06/microservice-01-scaled.jpg",
    url: "https://tuyendung.evotek.vn/what-is-spring-cloud-microservices-made-simple/",
    categoryColor: "bg-yellow-500",
  },
];

const NewsSection = () => {
  return (
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
                      <Bot className="w-6 h-6 text-white" />
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
                      href="https://www.intergreat.com/vi?language=en"
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
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className="relative h-48 bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url('${article.image}')` }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <span
                    className={`${article.categoryColor} text-white px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 font-bold">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      {new Date(article.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{article.views} views</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                  asChild
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đọc thêm
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="/tin-tuc">
              Xem tất cả bài viết
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
