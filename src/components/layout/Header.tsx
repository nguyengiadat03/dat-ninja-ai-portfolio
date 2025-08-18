import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Bell, Sun, Moon, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("vi");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { label: "Trang chủ", href: "/" },
    {
      label: "Giới thiệu về Đạt",
      isDropdown: true,
      items: [
        { label: "Kỹ Năng", href: "/gioi-thieu/ky-nang" },
        { label: "Học Vấn", href: "/gioi-thieu/hoc-van" },
        { label: "Dự án tiêu biểu", href: "/gioi-thieu/du-an" },
      ],
    },
    { label: "Ninja AI", href: "/chuong-trinh/ninja-ai" },
    { label: "Sự kiện", href: "/su-kien" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 font-poppins font-bold text-xl text-primary hover:text-primary-light transition-colors"
          >
            <img
              src="/favicon.png"
              alt="Logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="hidden sm:block">Đạt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.isDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-medium bg-transparent border-none cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card/95 backdrop-blur-md border border-border/50">
                      {item.items?.map((subItem, subIndex) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link
                            to={subItem.href}
                            className="w-full text-foreground hover:text-primary transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-foreground hover:text-primary transition-colors font-medium ${
                      location.pathname === item.href
                        ? "text-primary border-b-2 border-primary"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center space-x-1"
                >
                  <span className="text-xs font-medium flex items-center gap-1">
                    {language === "vi" ? (
                      <>
                        <img
                          src="https://flagcdn.com/w20/vn.png"
                          alt="VN"
                          className="w-4 h-3 rounded-sm"
                        />
                        VI
                      </>
                    ) : (
                      <>
                        <img
                          src="https://flagcdn.com/w20/us.png"
                          alt="EN"
                          className="w-4 h-3 rounded-sm"
                        />
                        EN
                      </>
                    )}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-emerald-700 text-white border-none rounded-md shadow-lg z-[9999]"
              >
                <DropdownMenuItem
                  onClick={() => setLanguage("vi")}
                  className="flex items-center gap-2 cursor-pointer hover:bg-emerald-600"
                >
                  <img
                    src="https://flagcdn.com/w20/vn.png"
                    alt="VN"
                    className="w-5 h-4 rounded-sm"
                  />
                  Tiếng Việt
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className="flex items-center gap-2 cursor-pointer hover:bg-emerald-600"
                >
                  <img
                    src="https://flagcdn.com/w20/us.png"
                    alt="EN"
                    className="w-5 h-4 rounded-sm"
                  />
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex relative"
                >
                  <Bell className="w-4 h-4" />
                  {/* Chấm đỏ báo có thông báo mới */}
                  <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 bg-white dark:bg-neutral-900 shadow-xl rounded-lg p-2 z-[9999]"
              >
                <div className="px-2 py-1 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-emerald-600">
                    Thông báo
                  </p>
                </div>

                <DropdownMenuItem className="flex flex-col items-start gap-1 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800 cursor-pointer">
                  <p className="text-sm font-medium text-foreground">
                    🚀 Sự kiện TTS Ninja AI sắp ra mắt
                  </p>
                  <span className="text-xs text-muted-foreground">
                    Đăng ký liền tay, để trở thành đồng đội của chúng tôi!
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex flex-col items-start gap-1 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800 cursor-pointer">
                  <p className="text-sm font-medium text-foreground">
                    📢 Rocket Global 2025
                  </p>
                  <span className="text-xs text-muted-foreground">
                    Đăng ký trước 30/09 để giữ chỗ.
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex flex-col items-start gap-1 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800 cursor-pointer">
                  <p className="text-sm font-medium text-foreground">
                    🎉 Ưu đãi đặc biệt hợp tác cùng IELTS Global
                  </p>
                  <span className="text-xs text-muted-foreground">
                    Giảm ngay 30% cho học viên mới.
                  </span>
                </DropdownMenuItem>

                <div className="px-2 py-1 border-t border-gray-200 dark:border-gray-700 text-center">
                  <button className="text-xs text-emerald-600 hover:underline w-full">
                    Xem tất cả thông báo
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <style>
              {`
                  @keyframes breathe {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                    }
                     .animate-breathe {
                      animation: breathe 1s ease-in-out infinite;
                       }
            `}
            </style>

            {/* Apply Now Button */}
            <Link to="/chuong-trinh/ninja-ai" className="relative z-[9999]">
              <Button
                className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 
               text-white font-semibold shadow-lg shadow-emerald-500/40 
               hover:scale-105 hover:shadow-emerald-600/50 
               transition-all duration-300 ease-in-out px-6 py-2 rounded-full animate-breathe"
              >
                <span className="relative z-10 flex items-center gap-1">
                  🚀 Apply Now
                </span>

                {/* Hiệu ứng ánh sáng quét ngang (nhẹ nhàng) */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
                     translate-x-[-100%] hover:translate-x-[100%] 
                     transition-transform duration-1000 ease-in-out"
                ></span>
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/50 shadow-lg animate-fade-in-up">
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.isDropdown ? (
                    <div>
                      <div className="font-medium text-foreground mb-2">
                        {item.label}
                      </div>
                      <div className="pl-4 space-y-2">
                        {item.items?.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className="block text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
