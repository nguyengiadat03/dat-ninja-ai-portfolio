import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const Events = () => {
  const events = [
    {
      title: "AI Workshop: Xây dựng Chatbot từ A-Z",
      date: "2024-02-15",
      time: "19:00 - 21:00",
      location: "Online via Zoom",
      participants: 150,
      status: "upcoming",
      description: "Workshop thực hành xây dựng chatbot AI sử dụng OpenAI API và React. Phù hợp cho cả người mới bắt đầu.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop"
    },
    {
      title: "Tech Talk: Tương lai của Frontend Development",
      date: "2024-02-20",
      time: "20:00 - 21:30",
      location: "Hà Nội Tech Hub",
      participants: 80,
      status: "upcoming",
      description: "Chia sẻ về những xu hướng mới trong phát triển Frontend: Web3, AI integration, và Performance optimization.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop"
    },
    {
      title: "Ninja AI Meetup #3",
      date: "2024-01-28",
      time: "14:00 - 17:00",
      location: "WeWork Hà Nội",
      participants: 45,
      status: "completed",
      description: "Buổi gặp mặt thường kỳ của cộng đồng Ninja AI, chia sẻ dự án và networking.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop"
    }
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
            <Card key={index} className="overflow-hidden bg-gradient-card border-none shadow-lg card-hover">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="relative h-48 lg:h-auto">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className={event.status === 'upcoming' ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}
                    >
                      {event.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
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
                      <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
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

                  {event.status === 'upcoming' && (
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
              Tôi luôn sẵn sàng chia sẻ kiến thức và kinh nghiệm tại các sự kiện công nghệ
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