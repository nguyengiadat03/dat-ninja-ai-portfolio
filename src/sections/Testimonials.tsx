import { Card } from "@/components/ui/card";
import { Star, Check, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nguyễn Hữu Kiên",
    role: "CTO",
    company: "Rockket Global | CenGroup",
    image:
      "https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/cto-nguyen-huu-kien.png",
    quote:
      "Tương lai của AI không phải là thay thế con người, mà là tăng cường khả năng của con người.",
    rating: 5,
  },
  {
    name: "Hà Anh Tuấn",
    role: "CEO & Founder",
    company: "Locaith Solution Tech",
    image:
      "https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/ha-tuan-anh-locaith.jpg",
    quote:
      "AI sẽ không thay thế con người, nhưng những người sử dụng AI sẽ thay thế những người không sử dụng.",
    rating: 5,
  },
  {
    name: "Lý Hoàng Hải",
    role: "CEO",
    company: "BMC",
    image:
      "https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/ly-hoang-hai-ceo-bmc.jpg",
    quote:
      "Thời gian của mỗi chúng ta là có hạn. Vì thế đừng dùng nó để sống cuộc đời của một ai khác",
    rating: 5,
  },
  {
    name: "Nguyễn Hữu Huân",
    role: "Mentor",
    company: "Rocket Global",
    image: "https://huans-ai-stage.vercel.app/avt.png",
    quote:
      "Rủi ro lớn nhất là không dám chấp nhận bất kỳ rủi ro nào. Trong một thế giới đang ngày một thay đổi nhanh chóng, chiến lược duy nhất đảm bảo rằng sẽ thất bại là không chấp nhận những rủi ro.",
    rating: 5,
  },
  {
    name: "Lê Thành Công",
    role: "Leader Team",
    company: "Rocket Global",
    image: "https://funix.edu.vn/wp-content/uploads/2022/02/ngo-hoang-anh.jpeg",
    quote:
      "Bạn không chọn đam mê. Mà đam mê chọn bạn. Tất cả chúng ta đều có một đam mê nào đó. Và những ai theo đuổi nó đều là những người may mắn.",
    rating: 5,
  },
  {
    name: "Nguyễn Phùng Minh Hằng",
    role: "Tổng giám đốc",
    company: "Cen Academy",
    image:
      "https://img.cenland.vn/images/2022/08/634053229_Hoi-nghi-chien-l%C6%B0%C6%A1c-Cen-Group-2022%20(3).jpg",
    quote:
      "Công nghệ được chi phối bởi hai loại người: người hiểu những gì mình không quản lý, và người quản lý những gì mình không hiểu.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-warning">🤝 </span>
            <span className="text-foreground">Chia sẻ - </span>
            <span className="text-primary">Truyền cảm hứng</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto italic">
            "Những chia sẻ giá trị về nghề nghiệp từ các nhà đầu tư tâm huyết,
            luôn đồng hành và định hướng cùng tôi"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative p-6 bg-white border-none shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-green-500 border-2"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm font-semibold text-primary">
                    {testimonial.role}
                  </p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  ({testimonial.rating}.0)
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                {testimonial.quote}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              10+
            </div>
            <div className="text-sm text-muted-foreground">
              Đối tác tin tưởng
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-success">
              10+
            </div>
            <div className="text-sm text-muted-foreground">
              Dự án thành công
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-warning">
              98%
            </div>
            <div className="text-sm text-muted-foreground">Tỷ lệ hài lòng</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-secondary-dark">
              5★
            </div>
            <div className="text-sm text-muted-foreground">
              Đánh giá trung bình
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
