import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Calendar, Award, Book, Users } from "lucide-react";
import universityCampus from "@/assets/university-campus.jpg";

const Education = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Học vấn & Quá trình đào tạo
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hành trình học tập và phát triển tại những môi trường giáo dục chất lượng cao, 
            nơi đã trang bị cho tôi nền tảng vững chắc về công nghệ thông tin.
          </p>
        </div>

        {/* University Section */}
        <Card className="mb-16 overflow-hidden bg-gradient-card border-none shadow-lg">
          <div className="relative h-64 md:h-80">
            <img 
              src={universityCampus} 
              alt="Trường Đại học Kinh tế Kỹ thuật công nghệ Hà Nội"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <GraduationCap className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Trường Đại học Kinh tế Kỹ thuật công nghệ Hà Nội
                </h2>
                <p className="text-xl">Khoa Công nghệ Thông tin</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Thời gian học</p>
                  <p className="text-muted-foreground">2019 - 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Bằng cấp</p>
                  <p className="text-muted-foreground">Cử nhân Công nghệ Thông tin</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Xếp loại</p>
                  <p className="text-muted-foreground">Giỏi (GPA: 3.7/4.0)</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tầm nhìn của trường</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trở thành trường đại học hàng đầu trong khu vực về đào tạo nguồn nhân lực chất lượng cao 
                  trong lĩnh vực kinh tế - kỹ thuật - công nghệ, đóng góp tích cực vào sự phát triển 
                  kinh tế - xã hội của đất nước.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Sứ mệnh</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Đào tạo nguồn nhân lực chất lượng cao có năng lực chuyên môn vững vàng, 
                  tư duy sáng tạo và khả năng thích ứng với môi trường làm việc quốc tế. 
                  Nghiên cứu khoa học và chuyển giao công nghệ phục vụ sự phát triển bền vững của xã hội.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Academic Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center card-hover bg-gradient-card border-none">
            <Book className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Môn học chuyên ngành
            </h3>
            <p className="text-muted-foreground mb-4">
              Hoàn thành xuất sắc các môn học về lập trình, cơ sở dữ liệu, 
              và phát triển ứng dụng web
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">Lập trình Web</Badge>
              <Badge variant="secondary">Cơ sở dữ liệu</Badge>
              <Badge variant="secondary">Thuật toán</Badge>
              <Badge variant="secondary">Mạng máy tính</Badge>
            </div>
          </Card>

          <Card className="p-6 text-center card-hover bg-gradient-card border-none">
            <Award className="w-12 h-12 text-secondary-dark mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Giải thưởng
            </h3>
            <p className="text-muted-foreground mb-4">
              Đạt được nhiều thành tích học tập và hoạt động ngoại khóa 
              trong suốt quá trình học tại trường
            </p>
            <div className="space-y-2">
              <Badge className="w-full justify-center">Sinh viên giỏi 4 năm liên tiếp</Badge>
              <Badge className="w-full justify-center">Giải nhất cuộc thi lập trình</Badge>
              <Badge className="w-full justify-center">Học bổng khuyến khích học tập</Badge>
            </div>
          </Card>

          <Card className="p-6 text-center card-hover bg-gradient-card border-none">
            <Users className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Hoạt động ngoại khóa
            </h3>
            <p className="text-muted-foreground mb-4">
              Tích cực tham gia các câu lạc bộ, tổ chức và hoạt động 
              xã hội tại trường
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center">Chủ tịch CLB Lập trình</Badge>
              <Badge variant="outline" className="w-full justify-center">Tình nguyện viên</Badge>
              <Badge variant="outline" className="w-full justify-center">Mentor sinh viên</Badge>
            </div>
          </Card>
        </div>

        {/* Contact with University */}
        <Card className="p-8 bg-gradient-secondary text-center border-none">
          <MapPin className="w-12 h-12 text-secondary-dark mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            Thông tin liên hệ trường
          </h3>
          <p className="text-muted-foreground mb-6">
            Địa chỉ: 218 Lĩnh Nam, Hoàng Mai, Hà Nội<br />
            Website: www.uneti.edu.vn | Email: info@uneti.edu.vn
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge className="px-4 py-2">Top 100 trường ĐH Việt Nam</Badge>
            <Badge className="px-4 py-2">Kiểm định chất lượng AUN-QA</Badge>
            <Badge className="px-4 py-2">Hợp tác quốc tế</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Education;