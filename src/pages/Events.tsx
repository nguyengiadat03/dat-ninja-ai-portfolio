import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const Events = () => {
  const events = [
    {
      title: "Lê Tân AI: Xây dựng hệ thống Chatbot AI từ A-Z",
      date: "2025-08-25",
      time: "8:00 - 17:00",
      location: "Hai Bà trưng- Hà Nội",
      participants: 150,
      status: "upcoming",
      description:
        "Workshop thực hành xây dựng chatbot AI sử dụng OpenAI API và React. Thay thế cho lễ tân",
      image: "https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/sukien3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vc3VraWVuMy5qcGciLCJpYXQiOjE3NTU1MDU2ODYsImV4cCI6MTc4NzA0MTY4Nn0.uNYJcgjAhmMvcwqMd2usxGbhr8HtGCj-s3vMdu2K52g",
    },
    {
      title: "Tech Talk: Tương lai của Frontend Development",
      date: "2024-02-20",
      time: "20:00 - 21:30",
      location: "Hà Nội Tech Hub",
      participants: 80,
      status: "upcoming",
      description:
        "Chia sẻ về những xu hướng mới trong phát triển Frontend: Web3, AI integration, và Performance optimization.",
      image: "https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/sukien3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vc3VraWVuMy5qcGciLCJpYXQiOjE3NTU1MDU3MTcsImV4cCI6MTc4NzA0MTcxN30.fJ7LrhVY_yBKuLFIXQ4uETjpZ8VUZZFwMtZO672K4pw",
    },
    {
      title: "Ninja AI Meetup #3",
      date: "2024-01-28",
      time: "14:00 - 17:00",
      location: "WeWork Hà Nội",
      participants: 45,
      status: "upcoming",
      description:
        "Buổi gặp mặt thường kỳ của cộng đồng Ninja AI, chia sẻ dự án và networking.",
      image: "https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/tintuc1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vdGludHVjMS5qcGciLCJpYXQiOjE3NTU1MDU3NDksImV4cCI6MTc4NzA0MTc0OX0.tBiZ22QjgIPGOhl-GV-Qsv7RxVIEKBjK9Ug4T_bOAfo",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sự kiện & Hoạt động
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tham gia các sự kiện công nghệ, workshop và meetup để cùng học hỏi,
            chia sẻ kinh nghiệm và kết nối với cộng đồng developer Việt Nam.
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-gradient-card border-none shadow-lg card-hover"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="relative h-48 lg:h-auto">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={
                        event.status === "upcoming"
                          ? "bg-success text-white"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {event.status === "upcoming"
                        ? "Sắp diễn ra"
                        : "Đã kết thúc"}
                    </Badge>
                  </div>
                </div>

                <div className="lg:col-span-2 p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {event.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.participants} người tham gia</span>
                    </div>
                  </div>

                  {event.status === "upcoming" && (
                    <Button className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale">
                      Đăng ký tham gia
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-hero border-none">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Muốn tổ chức sự kiện cùng tôi?
            </h3>
            <p className="text-muted-foreground mb-6">
              Tôi luôn sẵn sàng chia sẻ kiến thức và kinh nghiệm tại các sự kiện
              công nghệ
            </p>
            <Button className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale shadow-green">
              Liên hệ hợp tác
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Events;
