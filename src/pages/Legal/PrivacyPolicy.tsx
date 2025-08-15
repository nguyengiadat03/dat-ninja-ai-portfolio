import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Chính sách bảo mật
          </h1>
          <p className="text-lg text-muted-foreground">
            Cập nhật lần cuối: 15 tháng 2, 2024
          </p>
        </div>

        <Card className="p-8 bg-gradient-card border-none shadow-lg">
          <div className="prose max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Giới thiệu</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin 
                  cá nhân của bạn khi bạn sử dụng website và các dịch vụ của Nguyễn Gia Đạt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Thông tin chúng tôi thu thập</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">2.1 Thông tin cá nhân</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Họ tên, email, số điện thoại</li>
                      <li>Thông tin nghề nghiệp và kinh nghiệm</li>
                      <li>CV và portfolio (khi ứng tuyển)</li>
                      <li>Nội dung tin nhắn và phản hồi</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">2.2 Thông tin kỹ thuật</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Địa chỉ IP và thông tin trình duyệt</li>
                      <li>Cookies và dữ liệu phiên làm việc</li>
                      <li>Thời gian truy cập và hành vi người dùng</li>
                      <li>Thiết bị và hệ điều hành</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Cung cấp và cải thiện dịch vụ</li>
                  <li>Phản hồi các yêu cầu và câu hỏi</li>
                  <li>Gửi thông tin về chương trình và sự kiện</li>
                  <li>Phân tích và tối ưu hóa website</li>
                  <li>Đảm bảo bảo mật và ngăn chặn gian lận</li>
                  <li>Tuân thủ các nghĩa vụ pháp lý</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Chia sẻ thông tin</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, 
                  trừ các trường hợp sau:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Khi có sự đồng ý rõ ràng từ bạn</li>
                  <li>Với các nhà cung cấp dịch vụ đáng tin cậy</li>
                  <li>Khi pháp luật yêu cầu</li>
                  <li>Để bảo vệ quyền lợi và an toàn</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Bảo mật thông tin</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ 
                  thông tin cá nhân của bạn khỏi việc truy cập, sử dụng, tiết lộ, thay đổi hoặc 
                  phá hủy trái phép. Điều này bao gồm mã hóa dữ liệu, tường lửa và kiểm soát truy cập.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Website sử dụng cookies để cải thiện trải nghiệm người dùng, phân tích lưu lượng 
                  truy cập và cá nhân hóa nội dung. Bạn có thể quản lý và tắt cookies thông qua 
                  cài đặt trình duyệt của mình.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Quyền của bạn</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Bạn có các quyền sau đối với thông tin cá nhân của mình:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Quyền truy cập và xem thông tin</li>
                  <li>Quyền sửa đổi thông tin không chính xác</li>
                  <li>Quyền xóa thông tin cá nhân</li>
                  <li>Quyền hạn chế xử lý</li>
                  <li>Quyền chuyển dữ liệu</li>
                  <li>Quyền rút lại sự đồng ý</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Lưu trữ dữ liệu</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chúng tôi chỉ lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để 
                  thực hiện các mục đích đã nêu trong chính sách này hoặc theo yêu cầu của pháp luật.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Trẻ em</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dịch vụ của chúng tôi không dành cho trẻ em dưới 16 tuổi. Chúng tôi không cố ý 
                  thu thập thông tin cá nhân từ trẻ em dưới 16 tuổi.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Thay đổi chính sách</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Khi có thay đổi 
                  quan trọng, chúng tôi sẽ thông báo cho bạn qua email hoặc thông báo trên website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Liên hệ</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nếu bạn có câu hỏi về chính sách bảo mật này hoặc muốn thực hiện các quyền của mình, 
                  vui lòng liên hệ với chúng tôi qua:
                </p>
                <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
                  <p className="text-foreground">
                    <strong>Email:</strong> privacy@datnguyendev.com<br/>
                    <strong>Địa chỉ:</strong> Hà Nội, Việt Nam
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;