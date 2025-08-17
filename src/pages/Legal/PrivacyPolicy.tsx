import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20 bg-green-200 from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Chính sách bảo mật
          </h1>
          <p className="text-lg text-muted-foreground">
            Cập nhật lần cuối: 18/08/2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card className="p-8 bg-white/90 backdrop-blur-md border-none shadow-2xl rounded-2xl hover:shadow-3xl transition-shadow duration-500">
            <motion.div
              className="prose max-w-none"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              <div className="space-y-8">
                {/* 1. Giới thiệu */}
                <motion.section
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    1. Giới thiệu
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử
                    dụng, và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng
                    website, ứng dụng và các dịch vụ do{" "}
                    <strong>Nguyễn Gia Đạt</strong> cung cấp.
                  </p>
                </motion.section>

                {/* 2. Thông tin thu thập */}
                <motion.section
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    2. Thông tin chúng tôi thu thập
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      Họ tên, địa chỉ email, số điện thoại, và các thông tin
                      liên hệ khác.
                    </li>
                    <li>Thông tin đăng nhập (username, mật khẩu đã mã hóa).</li>
                    <li>
                      Dữ liệu sử dụng: lịch sử truy cập, hành vi tương tác, lượt
                      click.
                    </li>
                    <li>
                      Thông tin kỹ thuật: địa chỉ IP, loại trình duyệt, thiết
                      bị, hệ điều hành.
                    </li>
                    <li>
                      Các dữ liệu khác do bạn tự nguyện cung cấp khi tham gia
                      khảo sát, sự kiện, chương trình khuyến mãi.
                    </li>
                  </ul>
                </motion.section>

                {/* 3. Mục đích sử dụng */}
                <motion.section
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    3. Cách chúng tôi sử dụng thông tin
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Cung cấp và duy trì dịch vụ.</li>
                    <li>
                      Cải thiện trải nghiệm người dùng và cá nhân hóa nội dung
                      hiển thị.
                    </li>
                    <li>
                      Phân tích và nghiên cứu để nâng cao chất lượng sản
                      phẩm/dịch vụ.
                    </li>
                    <li>
                      Liên hệ với bạn qua email, điện thoại hoặc tin nhắn.
                    </li>
                    <li>
                      Gửi thông báo, ưu đãi, khuyến mãi hoặc thông tin sự kiện.
                    </li>
                    <li>
                      Tuân thủ quy định pháp luật và yêu cầu từ cơ quan chức
                      năng.
                    </li>
                  </ul>
                </motion.section>

                {/* 4. Bảo mật dữ liệu */}
                <motion.section
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    4. Bảo mật thông tin
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Chúng tôi áp dụng nhiều biện pháp bảo mật như mã hóa, tường
                    lửa, kiểm soát truy cập và giám sát hệ thống để bảo vệ dữ
                    liệu cá nhân của bạn khỏi việc truy cập trái phép, thay đổi,
                    tiết lộ hoặc phá hủy. Tuy nhiên, không có phương thức truyền
                    tải dữ liệu nào qua Internet hoặc lưu trữ điện tử là an toàn
                    tuyệt đối, do đó chúng tôi không thể đảm bảo 100% an toàn.
                  </p>
                </motion.section>

                {/* 5. Chia sẻ dữ liệu */}
                <motion.section
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    5. Chia sẻ thông tin
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn
                    cho bên thứ ba. Tuy nhiên, trong một số trường hợp, chúng
                    tôi có thể chia sẻ thông tin với:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                    <li>
                      Đối tác dịch vụ (như nhà cung cấp thanh toán, dịch vụ
                      hosting).
                    </li>
                    <li>Cơ quan nhà nước khi có yêu cầu hợp pháp.</li>
                    <li>
                      Bên thứ ba liên quan trong trường hợp sáp nhập, mua bán
                      hoặc tái cấu trúc công ty.
                    </li>
                  </ul>
                </motion.section>

                {/* 6. Quyền của người dùng */}
                <motion.section
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    6. Quyền của bạn
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Bạn có quyền:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      Yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân.
                    </li>
                    <li>Hạn chế hoặc phản đối việc xử lý dữ liệu.</li>
                    <li>
                      Yêu cầu ngừng nhận email quảng cáo hoặc thông báo
                      marketing.
                    </li>
                    <li>
                      Gửi khiếu nại đến cơ quan có thẩm quyền nếu quyền riêng tư
                      bị xâm phạm.
                    </li>
                  </ul>
                </motion.section>

                {/* 7. Liên hệ */}
                <motion.section
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    7. Liên hệ
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về Chính sách
                    bảo mật này, vui lòng liên hệ với chúng tôi qua:
                  </p>
                  <ul className="list-none pl-0 text-muted-foreground space-y-2 mt-3">
                    <li>
                      Email:{" "}
                      <a
                        href="mailto:info@nguyengiadat.com"
                        className="text-primary"
                      >
                        info@nguyengiadat.com
                      </a>
                    </li>
                    <li>
                      Website:{" "}
                      <a
                        href="https://www.nguyengiadat.com"
                        className="text-primary"
                      >
                        www.nguyengiadat.com
                      </a>
                    </li>
                    <li>Địa chỉ: 218 Lĩnh Nam, Hoàng Mai, Hà Nội</li>
                  </ul>
                </motion.section>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
