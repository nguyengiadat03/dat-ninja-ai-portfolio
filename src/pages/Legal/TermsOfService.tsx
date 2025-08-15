import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Điều khoản sử dụng
          </h1>
          <p className="text-lg text-muted-foreground">
            Cập nhật lần cuối: 15 tháng 2, 2024
          </p>
        </div>

        <Card className="p-8 bg-gradient-card border-none shadow-lg">
          <div className="prose max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Chấp nhận điều khoản</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ và bị ràng buộc 
                  bởi các điều khoản và điều kiện sử dụng này. Nếu bạn không đồng ý với bất kỳ 
                  phần nào của các điều khoản này, vui lòng không sử dụng website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Mô tả dịch vụ</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Website cung cấp các dịch vụ sau:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Thông tin về dịch vụ phát triển web và AI</li>
                  <li>Chương trình đào tạo Ninja AI</li>
                  <li>Blog và tài liệu kỹ thuật</li>
                  <li>Tư vấn và hỗ trợ kỹ thuật</li>
                  <li>Kết nối cộng đồng developer</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Đăng ký tài khoản</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">3.1 Yêu cầu đăng ký</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Phải từ 16 tuổi trở lên</li>
                      <li>Cung cấp thông tin chính xác và đầy đủ</li>
                      <li>Duy trì tính bảo mật của mật khẩu</li>
                      <li>Chịu trách nhiệm về mọi hoạt động trong tài khoản</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">3.2 Chấm dứt tài khoản</h3>
                    <p className="text-muted-foreground">
                      Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản của bạn nếu vi phạm 
                      điều khoản sử dụng hoặc có hành vi không phù hợp.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Quy tắc sử dụng</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Khi sử dụng dịch vụ, bạn đồng ý KHÔNG:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Vi phạm pháp luật hoặc quyền của bên thứ ba</li>
                  <li>Gửi spam, nội dung độc hại hoặc vi phạm</li>
                  <li>Cố gắng truy cập trái phép vào hệ thống</li>
                  <li>Sao chép, phân phối nội dung mà không có phép</li>
                  <li>Sử dụng dịch vụ cho mục đích thương mại không được phép</li>
                  <li>Làm gián đoạn hoặc phá hỏng dịch vụ</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Quyền sở hữu trí tuệ</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">5.1 Nội dung của chúng tôi</h3>
                    <p className="text-muted-foreground">
                      Tất cả nội dung trên website bao gồm văn bản, hình ảnh, code, thiết kế và 
                      logo đều thuộc quyền sở hữu của Nguyễn Gia Đạt và được bảo vệ bởi luật bản quyền.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">5.2 Nội dung của bạn</h3>
                    <p className="text-muted-foreground">
                      Bạn giữ quyền sở hữu đối với nội dung bạn gửi lên, nhưng cấp cho chúng tôi 
                      quyền sử dụng để cung cấp dịch vụ.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Chính sách thanh toán</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">6.1 Dịch vụ có phí</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      <li>Phí được công bố rõ ràng trước khi thanh toán</li>
                      <li>Thanh toán qua các cổng thanh toán an toàn</li>
                      <li>Hóa đơn được gửi qua email</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">6.2 Chính sách hoàn tiền</h3>
                    <p className="text-muted-foreground">
                      Hoàn tiền được xem xét theo từng trường hợp cụ thể và phải có lý do chính đáng. 
                      Yêu cầu hoàn tiền phải được gửi trong vòng 7 ngày kể từ khi thanh toán.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Tuyên bố miễn trách</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dịch vụ được cung cấp "như hiện tại" mà không có bất kỳ bảo đảm nào. Chúng tôi 
                  không chịu trách nhiệm về:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                  <li>Tổn thất trực tiếp hoặc gián tiếp từ việc sử dụng dịch vụ</li>
                  <li>Gián đoạn dịch vụ hoặc lỗi kỹ thuật</li>
                  <li>Mất mát dữ liệu hoặc thông tin</li>
                  <li>Hành vi của người dùng khác</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Giới hạn trách nhiệm</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Trong mọi trường hợp, tổng trách nhiệm của chúng tôi đối với bạn không vượt quá 
                  số tiền bạn đã thanh toán cho dịch vụ trong 12 tháng qua.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Luật áp dụng</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp sẽ được 
                  giải quyết tại tòa án có thẩm quyền tại Việt Nam.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Thay đổi điều khoản</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chúng tôi có quyền thay đổi các điều khoản này bất cứ lúc nào. Thay đổi sẽ có hiệu lực 
                  ngay khi được đăng tải trên website. Việc bạn tiếp tục sử dụng dịch vụ sau khi thay đổi 
                  có nghĩa là bạn chấp nhận các điều khoản mới.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Thông tin liên hệ</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nếu bạn có câu hỏi về các điều khoản này, vui lòng liên hệ:
                </p>
                <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
                  <p className="text-foreground">
                    <strong>Email:</strong> legal@datnguyendev.com<br/>
                    <strong>Địa chỉ:</strong> Hà Nội, Việt Nam<br/>
                    <strong>Điện thoại:</strong> +84 123 456 789
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

export default TermsOfService;