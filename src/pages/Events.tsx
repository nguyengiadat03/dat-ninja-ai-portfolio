import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Events = () => {
  const navigate = useNavigate();

  // Cuộn về đầu trang khi component load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const events = [
    {
      title: "Lê Tân AI: Xây dựng hệ thống Chatbot AI từ A-Z",
      date: "2025-08-25",
      time: "8:00 - 17:00",
      location: "Hai Bà Trưng - Hà Nội",
      participants: 150,
      status: "upcoming",
      description:
        "Workshop thực hành xây dựng chatbot AI sử dụng OpenAI API và React. Học cách tích hợp AI vào ứng dụng web thực tế với các case study cụ thể từ các doanh nghiệp hàng đầu.",
      image: "https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/letanai.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vbGV0YW5haS5qcGciLCJpYXQiOjE3NTU2NzE4NTYsImV4cCI6MTc4NzIwNzg1Nn0.m7W9T7rXIbYl3Us75lxsXFGi3FkD9NC_-oX2VG3tG34",
      tags: ["AI", "Chatbot", "OpenAI", "React", "Workshop"],
      level: "Trung cấp",
      price: "Miễn phí",
      speaker: "Lê Đạt - Senior AI Developer",
      agenda: [
        "9:00 - Giới thiệu về AI và Chatbot",
        "10:30 - Thiết kế kiến trúc hệ thống",
        "13:00 - Thực hành với OpenAI API",
        "15:30 - Tích hợp vào React App",
        "16:30 - Q&A và Demo"
      ],
      requirements: ["Kiến thức cơ bản về JavaScript", "Hiểu biết về React", "Laptop cá nhân"]
    },
    {
      title: "AI & Machine Learning Summit 2025",
      date: "2025-03-20",
      time: "9:00 - 18:00",
      location: "Trung tâm Hội nghị Quốc gia - Hà Nội",
      participants: 500,
      status: "upcoming",
      description:
        "Hội thảo quốc tế về AI và Machine Learning với sự tham gia của các chuyên gia hàng đầu từ Google, Microsoft, OpenAI và các startup công nghệ Việt Nam. Khám phá những xu hướng mới nhất trong AI/ML.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
      tags: ["AI", "Machine Learning", "Deep Learning", "Conference", "International"],
      level: "Tất cả cấp độ",
      price: "2.500.000 VNĐ",
      speaker: "Các chuyên gia từ Google, Microsoft, OpenAI",
      agenda: [
        "9:00 - Keynote: Future of AI",
        "10:30 - Machine Learning in Production",
        "13:00 - Deep Learning Applications",
        "15:00 - AI Ethics and Governance",
        "16:30 - Startup Pitch Session",
        "17:30 - Networking Reception"
      ],
      requirements: ["Không yêu cầu kiến thức chuyên môn", "Đăng ký trước 15/03/2025"]
    },
    {
      title: "Blockchain & Web3 Developer Conference",
      date: "2025-04-15",
      time: "8:30 - 17:30",
      location: "Landmark 72 - Hà Nội",
      participants: 300,
      status: "upcoming",
      description:
        "Khám phá thế giới Blockchain và Web3 với các workshop thực hành về Smart Contract, DeFi, NFT development sử dụng Solidity, Web3.js và các framework hiện đại. Bao gồm cả hands-on labs và real-world projects.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      tags: ["Blockchain", "Web3", "Smart Contract", "DeFi", "NFT", "Solidity"],
      level: "Trung cấp - Nâng cao",
      price: "1.800.000 VNĐ",
      speaker: "Nguyễn Minh Tuấn - Blockchain Architect, Binance",
      agenda: [
        "8:30 - Blockchain Fundamentals",
        "10:00 - Smart Contract Development",
        "11:30 - DeFi Protocols Deep Dive",
        "13:30 - NFT Marketplace Development",
        "15:00 - Web3 Frontend Integration",
        "16:30 - Security Best Practices"
      ],
      requirements: ["Kinh nghiệm lập trình JavaScript", "Hiểu biết cơ bản về Blockchain", "MetaMask wallet"]
    },
    {
      title: "Tech Talk: Tương lai của Frontend Development",
      date: "2025-09-15",
      time: "20:00 - 21:30",
      location: "Hà Nội Tech Hub",
      participants: 80,
      status: "upcoming",
      description:
        "Chia sẻ về những xu hướng mới trong phát triển Frontend: Web3, AI integration, Performance optimization và Server Components trong React 19.",
      image: "https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/sukien3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vc3VraWVuMy5qcGciLCJpYXQiOjE3NTU1MDU3MTcsImV4cCI6MTc4NzA0MTcxN30.fJ7LrhVY_yBKuLFIXQ4uETjpZ8VUZZFwMtZO672K4pw",
      tags: ["Frontend", "React", "Web3", "AI", "Performance"],
      level: "Trung cấp - Nâng cao",
      price: "Miễn phí",
      speaker: "Lê Đạt - Senior Frontend Developer",
      agenda: [
        "20:00-20:15: Welcome & Introduction",
        "20:15-20:35: React 19 và Server Components",
        "20:35-20:55: AI Integration trong Frontend",
        "20:55-21:15: Web3 và Frontend Development",
        "21:15-21:30: Q&A và Networking"
      ],
      requirements: [
        "Kinh nghiệm React cơ bản",
        "Hiểu biết về JavaScript ES6+",
        "Quan tâm đến công nghệ mới"
      ]
    },
    {
      title: "DevOps & Cloud Computing Workshop",
      date: "2025-05-10",
      time: "9:00 - 16:00",
      location: "FPT Software - Hà Nội",
      participants: 120,
      status: "upcoming",
      description:
        "Workshop chuyên sâu về DevOps practices, CI/CD pipeline, Docker, Kubernetes và cloud deployment trên AWS, Azure. Thực hành với các dự án thực tế.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      tags: ["DevOps", "AWS", "Docker", "Kubernetes", "CI/CD"],
      level: "Trung cấp - Nâng cao",
      price: "1.500.000 VNĐ",
      speaker: "Nguyễn Minh Tuấn - Senior DevOps Engineer tại FPT Software",
      agenda: [
        "9:00-10:30: Giới thiệu về DevOps và Cloud Computing",
        "10:45-12:00: Thực hành với Docker và Container",
        "13:00-14:30: Kubernetes cơ bản và triển khai ứng dụng",
        "14:45-16:00: AWS Services và CI/CD Pipeline"
      ],
      requirements: [
        "Có kinh nghiệm lập trình cơ bản",
        "Hiểu biết về Linux command line",
        "Laptop cá nhân với Docker đã cài đặt"
      ]
    },
    {
      title: "Mobile App Development Bootcamp",
      date: "2025-06-08",
      time: "8:00 - 18:00",
      location: "Techcombank Tower - TP.HCM",
      participants: 200,
      status: "upcoming",
      description:
        "Bootcamp 3 ngày về phát triển ứng dụng mobile với React Native, Flutter và native development. Bao gồm cả iOS và Android development.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      tags: ["React Native", "Flutter", "Mobile", "iOS", "Android"],
      level: "Cơ bản - Trung cấp",
      price: "2.800.000 VNĐ",
      speaker: "Trần Văn Đức - Lead Mobile Developer tại Techcombank",
      agenda: [
        "Day 1: React Native Fundamentals",
        "Day 2: Flutter Development",
        "Day 3: Native iOS/Android Integration",
        "Publishing to App Store & Google Play"
      ],
      requirements: [
        "JavaScript cơ bản",
        "Hiểu biết về mobile development",
        "Laptop với Android Studio/Xcode",
        "Node.js đã cài đặt"
      ]
    },
    {
      title: "Cybersecurity & Ethical Hacking Summit",
      date: "2025-07-22",
      time: "9:30 - 17:00",
      location: "Vincom Center - Đà Nẵng",
      participants: 180,
      status: "upcoming",
      description:
        "Hội thảo về an ninh mạng, ethical hacking, penetration testing và các phương pháp bảo vệ hệ thống. Có phần thực hành CTF (Capture The Flag).",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      tags: ["Cybersecurity", "Ethical Hacking", "Penetration Testing", "CTF"],
      level: "Trung cấp - Nâng cao",
      price: "2.200.000 VNĐ",
      speaker: "Nguyễn Thành Long - Security Expert tại BKAV",
      agenda: [
        "9:30-11:00: Cybersecurity Fundamentals",
        "11:15-12:30: Penetration Testing Techniques",
        "13:30-15:00: Web Application Security",
        "15:15-16:30: CTF Competition",
        "16:30-17:00: Awards và Networking"
      ],
      requirements: [
        "Kiến thức mạng máy tính cơ bản",
        "Hiểu biết về Linux",
        "Laptop với Kali Linux",
        "Kinh nghiệm IT tối thiểu 1 năm"
      ]
    },
    {
      title: "Startup Tech Pitch Day 2024",
      date: "2024-12-15",
      time: "14:00 - 18:00",
      location: "Dreamplex Coworking - TP.HCM",
      participants: 250,
      status: "past",
      description:
        "Ngày pitch của các startup công nghệ Việt Nam. 20 startup trình bày ý tưởng và sản phẩm trước ban giám khảo và nhà đầu tư.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      tags: ["Startup", "Pitch", "Investment", "Innovation", "Entrepreneurship"],
      level: "Mọi cấp độ",
      price: "Miễn phí",
      speaker: "Panel của các nhà đầu tư hàng đầu Việt Nam",
      agenda: [
        "14:00-14:30: Khai mạc và giới thiệu",
        "14:30-16:30: Vòng pitch của 20 startup (5 phút/startup)",
        "16:30-17:00: Đánh giá và thảo luận",
        "17:00-17:30: Công bố kết quả và trao giải",
        "17:30-18:00: Networking và giao lưu"
      ],
      requirements: [
        "Startup có sản phẩm công nghệ",
        "Đã có MVP hoặc prototype",
        "Team tối thiểu 2 người",
        "Pitch deck chuẩn bị sẵn"
      ]
    },
    {
      title: "Data Science & Analytics Conference",
      date: "2024-11-20",
      time: "8:30 - 17:30",
      location: "Lotte Tower - Hà Nội",
      participants: 320,
      status: "past",
      description:
        "Hội thảo về Data Science, Big Data Analytics, Machine Learning và Business Intelligence. Chia sẻ case study từ các doanh nghiệp lớn.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["Data Science", "Machine Learning", "Big Data", "Analytics", "Python"],
      level: "Trung cấp - Nâng cao",
      price: "1.800.000 VNĐ",
      speaker: "Dr. Nguyễn Văn Minh - Data Science Director tại VinAI",
      agenda: [
        "9:00-10:30: Introduction to Modern Data Science",
        "10:45-12:00: Machine Learning in Production",
        "13:00-14:30: Big Data Processing với Apache Spark",
        "14:45-16:00: Deep Learning và Computer Vision",
        "16:15-17:00: Career paths in Data Science"
      ],
      requirements: [
        "Python programming cơ bản",
        "Kiến thức toán học và thống kê",
        "Jupyter Notebook đã cài đặt",
        "Hiểu biết về SQL"
      ]
    },
    {
      title: "Ninja AI Meetup #3",
      date: "2024-01-28",
      time: "14:00 - 17:00",
      location: "WeWork Hà Nội",
      participants: 45,
      status: "past",
      description:
        "Buổi gặp mặt thường kỳ của cộng đồng Ninja AI, chia sẻ dự án thực tế, networking và thảo luận về các xu hướng AI mới nhất.",
      image: "https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/sign/sukien/tintuc1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzBlZDFkZS00MzRjLTQ3NWMtOWQ1ZC02ZmYxNTY2ZDNiOTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdWtpZW4vdGludHVjMS5qcGciLCJpYXQiOjE3NTU1MDU3NDksImV4cCI6MTc4NzA0MTc0OX0.tBiZ22QjgIPGOhl-GV-Qsv7RxVIEKBjK9Ug4T_bOAfo",
      tags: ["AI", "Meetup", "Networking", "Community", "Machine Learning"],
      level: "Mọi cấp độ",
      price: "Miễn phí",
      speaker: "Cộng đồng Ninja AI",
      agenda: [
        "14:00-14:30: Welcome & Networking",
        "14:30-15:30: AI Project Showcase",
        "15:30-16:00: Coffee Break & Discussion",
        "16:00-16:45: AI Trends & Future Outlook",
        "16:45-17:00: Q&A và kế hoạch meetup tiếp theo"
      ],
      requirements: [
        "Quan tâm đến AI và Machine Learning",
        "Không yêu cầu kiến thức chuyên môn",
        "Mang theo laptop nếu muốn demo"
      ]
    },
    {
      title: "Open Source Contribution Workshop",
      date: "2024-10-12",
      time: "13:00 - 17:00",
      location: "Toong Coworking - Hà Nội",
      participants: 60,
      status: "past",
      description:
        "Workshop hướng dẫn cách contribute vào các dự án open source, sử dụng Git/GitHub hiệu quả và xây dựng portfolio developer chuyên nghiệp.",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
      tags: ["Open Source", "Git", "GitHub", "Portfolio", "Collaboration"],
      level: "Cơ bản - Trung cấp",
      price: "500.000 VNĐ",
      speaker: "Nguyễn Hoàng Anh - Senior Developer tại GitHub",
      agenda: [
        "13:00-13:30: Introduction to Open Source",
        "13:30-14:30: Git & GitHub Advanced Techniques",
        "14:30-15:30: Finding và Choosing Projects",
        "15:30-16:30: Making Your First Contribution",
        "16:30-17:00: Building Developer Portfolio"
      ],
      requirements: [
        "Git cơ bản",
        "GitHub account",
        "Laptop với Git đã cài đặt",
        "Kinh nghiệm lập trình tối thiểu 6 tháng"
      ]
    },
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-r from-green-400 to-yellow-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sự kiện & Hoạt động
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto font-bold italic">
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags && event.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>

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

                  {/* Additional Event Info */}
                  {(event.level || event.price || event.speaker) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      {event.level && (
                        <div>
                          <h4 className="font-semibold text-sm text-gray-600 mb-1">Cấp độ</h4>
                          <p className="text-sm text-gray-800">{event.level}</p>
                        </div>
                      )}
                      {event.price && (
                        <div>
                          <h4 className="font-semibold text-sm text-gray-600 mb-1">Giá vé</h4>
                          <p className="text-sm text-gray-800 font-bold">{event.price}</p>
                        </div>
                      )}
                      {event.speaker && (
                        <div>
                          <h4 className="font-semibold text-sm text-gray-600 mb-1">Diễn giả</h4>
                          <p className="text-sm text-gray-800">{event.speaker}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Agenda */}
                  {event.agenda && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Chương trình</h4>
                      <ul className="space-y-2">
                        {event.agenda.map((item, agendaIndex) => (
                          <li key={agendaIndex} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Requirements */}
                  {event.requirements && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Yêu cầu</h4>
                      <ul className="space-y-1">
                        {event.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.status === "upcoming" && (
                    <Button 
                      className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale"
                      onClick={() => {
                        navigate('/chuong-trinh/ninja-ai', { state: { scrollToForm: true } });
                      }}
                    >
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
            <Button 
              className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale shadow-green"
              onClick={() => {
                navigate('/chuong-trinh/ninja-ai', { state: { scrollToForm: true } });
              }}
            >
              Liên hệ hợp tác
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Events;
