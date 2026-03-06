import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Heart } from "lucide-react";

const ContactCTA = () => {
  const contactRef = useRef<HTMLElement>(null);

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

    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={contactRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Phong cách làm việc & Liên hệ
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    Tận tâm với từng dự án:
                  </strong>{" "}
                  Luôn đặt chất lượng và trải nghiệm người dùng lên hàng đầu
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    Học hỏi không ngừng:
                  </strong>{" "}
                  Luôn cập nhật các công nghệ và xu hướng mới nhất
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Hợp tác hiệu quả:</strong>{" "}
                  Giao tiếp rõ ràng và phản hồi nhanh chóng
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    Sáng tạo và đổi mới:
                  </strong>{" "}
                  Không ngừng tìm kiếm những giải pháp độc đáo
                </p>
              </div>
            </div>
          </div>

          <div>
            <Card className="p-8 bg-gradient-card border-none shadow-lg">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Thông tin liên hệ
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    nguyengiadat2k03@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Hai Bà Trưng - Hà Nội</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground mb-2">
                  <strong className="text-foreground">Sở thích:</strong> Đá
                  bóng, xem phim, đọc sách về công nghệ.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Mục tiêu:</strong> Trở
                  thành một mentor giúp nhiều người trẻ phát triển sự nghiệp
                  trong lĩnh vực công nghệ
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-lg font-medium text-gradient-primary italic">
                  "Mỗi dòng code đều có thể thay đổi thế giới"
                </p>
              </div>

              <div className="mt-6 text-center">
                <Link to="/lien-he">
                  <Button className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale">
                    Liên hệ ngay <Heart className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
