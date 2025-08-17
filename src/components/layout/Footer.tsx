import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <Link
              to="#"
              className="flex items-center space-x-3 font-poppins font-bold text-xl text-primary hover:text-primary-light transition-colors"
            >
              <img
                src="/favicon.png"
                alt="Logo"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="hidden sm:block">Đạt</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lập trình viên FrontEnd chuyên nghiệp, kết hợp nghệ thuật và công
              nghệ để tạo nên những sản phẩm web mang dấu ấn riêng.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>nguyengiadat2k03@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>0368764803</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Hai Bà Trưng, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/gioi-thieu/ky-nang"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Kỹ năng
                </Link>
              </li>
              <li>
                <Link
                  to="/gioi-thieu/du-an"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Dự án
                </Link>
              </li>
              <li>
                <Link
                  to="/chuong-trinh/ninja-ai"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Ninja AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Chương trình</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/chuong-trinh/ninja-ai"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Thực tập sinh Ninja AI
                </Link>
              </li>
              <li>
                <Link
                  to="/su-kien"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Sự kiện
                </Link>
              </li>
              <li>
                <Link
                  to="/tin-tuc"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="/lien-he"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Pháp lý & Mạng xã hội
            </h3>
            <ul className="space-y-2 mb-4">
              <li>
                <Link
                  to="/chinh-sach-bao-mat"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to="/dieu-khoan-su-dung"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/nguyen.gia.at.773139"
                aria-label="Facebook profile"
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/"
                aria-label="Twitter profile"
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/"
                aria-label="LinkedIn profile"
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/nguyengiadat03"
                aria-label="GitHub profile"
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                aria-label="Instagram profile"
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border bg-gray-200 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-around items-center gap-2 p-4">
            <p className="block text-muted-foreground text-sm">
              Nguyễn Gia Đạt. Tất cả quyền được bảo lưu.
            </p>
            <p className="block text-muted-foreground text-sm">
              Thiết kế với ❤️ bởi Ninja AI Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
