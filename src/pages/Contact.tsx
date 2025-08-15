import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Tin nhắn đã được gửi!",
      description: "Tôi sẽ phản hồi bạn trong thời gian sớm nhất.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Liên hệ với tôi
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tôi luôn sẵn sàng lắng nghe và trao đổi về các dự án, cơ hội hợp tác 
            hoặc đơn giản là chia sẻ về công nghệ. Hãy liên hệ với tôi!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-6 bg-gradient-card border-none card-hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">dat.nguyen@example.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Phương thức liên hệ chính. Tôi thường phản hồi trong vòng 24 giờ.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-none card-hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center text-white">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Điện thoại</h3>
                  <p className="text-muted-foreground">+84 123 456 789</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Có thể liên hệ qua Zalo hoặc WhatsApp cho các vấn đề khẩn cấp.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-none card-hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center text-secondary-dark">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Địa chỉ</h3>
                  <p className="text-muted-foreground">Hà Nội, Việt Nam</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Có thể hẹn gặp trực tiếp tại các quán cafe hoặc coworking space.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-hero border-none">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Đặt lịch hẹn</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Muốn trao đổi trực tiếp? Hãy đặt lịch meeting với tôi.
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Chọn thời gian phù hợp
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-gradient-card border-none shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Gửi tin nhắn</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Họ và tên *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tiêu đề *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Chủ đề bạn muốn trao đổi"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nội dung tin nhắn *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Chia sẻ chi tiết về những gì bạn muốn trao đổi..."
                    rows={6}
                    required
                    className="w-full resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto bg-gradient-primary text-white hover:bg-primary-dark btn-scale btn-ripple shadow-green"
                >
                  Gửi tin nhắn
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>

              <div className="mt-8 p-4 bg-secondary/10 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Thời gian phản hồi</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Email thông thường: 24-48 giờ</li>
                  <li>• Dự án khẩn cấp: Trong vòng 12 giờ</li>
                  <li>• Cuối tuần: Phản hồi vào thứ 2</li>
                </ul>
              </div>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8 p-8 bg-gradient-card border-none">
              <h3 className="text-xl font-bold text-foreground mb-6">Câu hỏi thường gặp</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Bạn có nhận làm dự án freelance không?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Có, tôi nhận các dự án phù hợp với lịch trình. Hãy chia sẻ chi tiết dự án để tôi có thể tư vấn tốt nhất.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Làm thế nào để tham gia chương trình Ninja AI?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Bạn có thể đăng ký tại trang Ninja AI hoặc liên hệ trực tiếp với tôi để được tư vấn chi tiết.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Bạn có nhận mentor cá nhân không?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Tùy vào thời gian và mức độ phù hợp. Hãy liên hệ để thảo luận về nhu cầu học tập của bạn.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;