import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  Book,
  Users,
} from "lucide-react";
import universityCampus from "@/assets/university-campus.jpg";

const Education = () => {
  return (
    <div className="min-h-screen py-20 bg-green-200 from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-pulse">
            Học vấn & Quá trình đào tạo
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hành trình học tập và phát triển tại những môi trường giáo dục chất
            lượng cao, nơi đã trang bị cho tôi nền tảng vững chắc về công nghệ
            thông tin.
            <br />
            <br />
            <span className="text-black font-bold md:text-2xl italic animate-pulse">
              Học tập để kiến tạo tương lai
            </span>
          </p>
        </div>

        {/* University Section */}
        <Card className="mb-16 overflow-hidden bg-gradient-card border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl animate-slideUp">
          <div className="relative h-64 md:h-80 group">
            <img
              src={universityCampus}
              alt="Trường Đại học Kinh tế Kỹ thuật công nghệ Hà Nội"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="animate-fadeInUp">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 animate-bounce-slow" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Trường Đại học Kinh tế Kỹ thuật công nghệ Hà Nội
                </h2>
                <p className="text-xl">Khoa Công nghệ Thông tin</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: <Calendar className="w-5 h-5 text-primary" />,
                  title: "Thời gian học",
                  content: "2021 - 2025",
                },
                {
                  icon: <Award className="w-5 h-5 text-primary" />,
                  title: "Bằng cấp",
                  content: "Kỹ sư Công nghệ Thông tin",
                },
                {
                  icon: <Users className="w-5 h-5 text-primary" />,
                  title: "Xếp loại",
                  content: "Khá",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300"
                >
                  {item.icon}
                  <div>
                    <p className="font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="animate-fadeIn delay-200">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Tầm nhìn của trường
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trở thành trường đại học hàng đầu trong khu vực về đào tạo
                  nguồn nhân lực chất lượng cao trong lĩnh vực kinh tế - kỹ
                  thuật - công nghệ, đóng góp tích cực vào sự phát triển kinh tế
                  - xã hội của đất nước.
                </p>
              </div>

              <div className="animate-fadeIn delay-400">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Sứ mệnh
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Đào tạo nguồn nhân lực chất lượng cao có năng lực chuyên môn
                  vững vàng, tư duy sáng tạo và khả năng thích ứng với môi
                  trường làm việc quốc tế. Nghiên cứu khoa học và chuyển giao
                  công nghệ phục vụ sự phát triển bền vững của xã hội.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Academic Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Book className="w-12 h-12 text-primary mx-auto mb-4" />,
              title: "Môn học chuyên ngành",
              desc: "Hoàn thành xuất sắc các môn học về lập trình, cơ sở dữ liệu, và phát triển ứng dụng web",
              badges: [
                "Lập trình Web",
                "Cơ sở dữ liệu",
                "Thuật toán",
                "Mạng máy tính",
              ],
            },
            {
              icon: (
                <Award className="w-12 h-12 text-secondary-dark mx-auto mb-4" />
              ),
              title: "Giải thưởng",
              desc: "Đạt được nhiều thành tích học tập và hoạt động ngoại khóa trong suốt quá trình học tại trường",
              badges: [
                "Sinh viên giỏi 4 năm liên tiếp",
                "Giải nhất cuộc thi lập trình",
                "Học bổng khuyến khích học tập",
              ],
            },
            {
              icon: <Users className="w-12 h-12 text-accent mx-auto mb-4" />,
              title: "Hoạt động ngoại khóa",
              desc: "Tích cực tham gia các câu lạc bộ, tổ chức và hoạt động xã hội tại trường",
              badges: [
                "Chủ tịch CLB Lập trình",
                "Tình nguyện viên",
                "Mentor sinh viên",
              ],
            },
          ].map((card, i) => (
            <Card
              key={i}
              className="p-6 text-center card-hover bg-gradient-card border-none rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500"
            >
              <div className="animate-bounce-slow">{card.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground mb-4">{card.desc}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {card.badges.map((badge, j) => (
                  <Badge
                    key={j}
                    variant={i === 1 ? "default" : "secondary"}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
        {/* Contact with University */}
        <Card
          className="relative w-full max-w-8xl h-[500px] mx-auto p-12 text-center border-none rounded-2xl shadow-lg overflow-hidden"
          style={{
            backgroundImage:
              "url('https://www.w3schools.com/w3images/map.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Lớp phủ tối để dễ đọc chữ */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Nội dung */}
          <div className="relative z-10">
            <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4 animate-bounce-slow" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              Thông tin liên hệ trường
            </h3>
            <p className="text-gray-200 mb-6">
              Địa chỉ: 218 Lĩnh Nam, Hoàng Mai, Hà Nội
              <br />
              Website: www.uneti.edu.vn | Email: info@uneti.edu.vn
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge className="px-4 py-2 bg-white/80 text-black hover:scale-105 transition-transform duration-300">
                Top 100 trường ĐH Việt Nam
              </Badge>
              <Badge className="px-4 py-2 bg-white/80 text-black hover:scale-105 transition-transform duration-300">
                Kiểm định chất lượng AUN-QA
              </Badge>
              <Badge className="px-4 py-2 bg-white/80 text-black hover:scale-105 transition-transform duration-300">
                Hợp tác quốc tế
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Education;
