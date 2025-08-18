import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Target,
  BookOpen,
  Users,
  Award,
  CheckCircle,
  Send,
  Sparkles,
  Brain,
  Code,
  Rocket,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ninjaAIBanner from "@/assets/ninja-ai-banner.jpg";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  cvFile: File | null;
  motivation: string;
};

const BUCKET = "ninja-ai-uploads"; // đảm bảo bucket này tồn tại và có policy cho INSERT + SELECT

function slugify(input: string) {
  return (
    input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\- ]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "anonymous"
  );
}

function getExt(file: File) {
  // Ưu tiên lấy theo tên, fallback theo mime
  const byName = file.name.split(".").pop()?.toLowerCase();
  if (byName) return byName;
  if (file.type === "application/pdf") return "pdf";
  if (file.type === "application/msword") return "doc";
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";
  return "bin";
}

function isAllowedFile(file: File) {
  const okMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const okExts = ["pdf", "doc", "docx"];
  return okMimes.includes(file.type) || okExts.includes(getExt(file));
}

const NinjaAI = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    cvFile: null,
    motivation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, cvFile: file }));
  };

  const uploadCV = async (file: File, fullName: string) => {
    if (!file) throw new Error("NO_FILE");

    // Validate cơ bản - Tăng giới hạn lên 10MB
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      throw new Error(`FILE_TOO_LARGE: File size ${fileSizeMB}MB exceeds 10MB limit`);
    }
    if (!isAllowedFile(file)) throw new Error("FILE_TYPE_NOT_ALLOWED");

    const safeName = slugify(fullName || "anonymous");
    const ext = getExt(file);
    const unique =
      window.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
    const filePath = `cv-files/${safeName}/${Date.now()}-${unique}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (upErr) {
      // Gợi ý lỗi thường gặp để bạn debug nhanh
      // 403: thiếu policy INSERT; 404: sai BUCKET; 413: file quá lớn (nếu dùng edge function)
      throw new Error(`UPLOAD_ERROR: ${upErr.message}`);
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const insertApplication = async (payload: {
    full_name: string;
    email: string;
    phone?: string;
    phone_number?: string;
    cv_url: string;
    motivation?: string;
  }) => {
    // Thử bảng 'applications' trước
    const { error: dbError } = await supabase.from("applications").insert({
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone, // cột 'phone' nếu bảng applications dùng tên này
      cv_url: payload.cv_url,
      motivation: payload.motivation,
      created_at: new Date().toISOString(),
    });

    // Nếu bảng 'applications' không tồn tại → fallback sang 'students'
    if (
      dbError &&
      /relation .*applications.* does not exist/i.test(dbError.message)
    ) {
      const { error: dbErr2 } = await supabase.from("students").insert({
        full_name: payload.full_name,
        email: payload.email,
        phone_number: payload.phone_number ?? payload.phone, // students: phone_number
        cv_url: payload.cv_url,
        // status: default 'pending'
        // created_at: default NOW()
      });
      if (dbErr2) throw dbErr2;
      return;
    }

    if (dbError) throw dbError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate form trước khi gửi
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "❌ Thiếu thông tin",
        description: "Vui lòng điền Họ tên, Email và Số điện thoại.",
        variant: "destructive",
      });
      return;
    }
    if (!formData.cvFile) {
      toast({
        title: "❌ Chưa chọn file CV",
        description: "Hãy tải lên CV (.pdf, .doc, .docx) trước khi gửi.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1) Upload file
      const fileUrl = await uploadCV(formData.cvFile, formData.fullName);

      // 2) Insert DB (applications → fallback students)
      await insertApplication({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        phone_number: formData.phone,
        cv_url: fileUrl,
        motivation: formData.motivation,
      });

      // 3) Toast success (có icon)
      toast({
        // Dùng emoji để chắc chắn type không lỗi + kèm icon lucide ở description
        title: "✅ Đã gửi đơn thành công!",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</span>
          </div>
        ) as unknown as string, // Nếu TS kêu, có thể bỏ cast và chỉ dùng emoji trong title
      });

      // 4) Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        cvFile: null,
        motivation: "",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: Error | unknown) {
      console.error("UPLOAD/APPLY ERROR:", err);
      console.error("Error details:", {
        message: err instanceof Error ? err.message : String(err),
        code: (err as any)?.code,
        details: err?.details,
        hint: err?.hint,
        stack: err?.stack
      });

      // Map lỗi thân thiện với thông tin chi tiết hơn
      let msg = "Đã xảy ra lỗi không xác định. Vui lòng thử lại.";
      let suggestion = "";
      const raw = String(err?.message || err);

      if (raw.includes("NO_FILE")) {
        msg = "Bạn chưa chọn file CV.";
        suggestion = "Vui lòng chọn file CV (.pdf, .doc, .docx) trước khi gửi.";
      } else if (raw.includes("FILE_TOO_LARGE")) {
        // Extract file size from error message if available
        const sizeMatch = raw.match(/File size ([\d.]+)MB/);
        const actualSize = sizeMatch ? sizeMatch[1] : "unknown";
        msg = `File quá lớn (${actualSize}MB, tối đa 10MB).`;
        suggestion = "Vui lòng nén file hoặc chọn file khác có kích thước nhỏ hơn 10MB.";
      } else if (raw.includes("FILE_TYPE_NOT_ALLOWED")) {
        msg = "Định dạng file không được hỗ trợ.";
        suggestion = "Chỉ chấp nhận file .pdf, .doc, .docx";
      } else if (raw.includes("UPLOAD_ERROR")) {
        if (/permission|policy|denied|unauthorized|403/i.test(raw)) {
          msg = "Không có quyền upload file.";
          suggestion = "Vui lòng liên hệ admin để kiểm tra cấu hình Storage Policy.";
        } else if (/not found|bucket|404/i.test(raw)) {
          msg = `Storage bucket không tồn tại.`;
          suggestion = "Vui lòng liên hệ admin để kiểm tra cấu hình Supabase Storage.";
        } else if (/network|fetch|connection/i.test(raw)) {
          msg = "Lỗi kết nối mạng.";
          suggestion = "Vui lòng kiểm tra kết nối internet và thử lại.";
        } else {
          msg = "Upload thất bại.";
          suggestion = "Vui lòng thử lại sau ít phút hoặc liên hệ hỗ trợ.";
        }
      } else if (/duplicate key value violates unique constraint/i.test(raw)) {
        if (/email/i.test(raw)) {
          msg = "Email này đã được sử dụng.";
          suggestion = "Vui lòng sử dụng email khác hoặc liên hệ nếu đây là email của bạn.";
        } else {
          msg = "Thông tin đã tồn tại trong hệ thống.";
          suggestion = "Vui lòng kiểm tra lại thông tin hoặc liên hệ hỗ trợ.";
        }
      } else if (/applications.*does not exist/i.test(raw)) {
        msg = "Lỗi cấu hình database.";
        suggestion = "Vui lòng liên hệ admin để kiểm tra cấu hình bảng dữ liệu.";
      } else if (/row level security|rls|policy/i.test(raw)) {
        msg = "Lỗi phân quyền database.";
        suggestion = "Vui lòng liên hệ admin để kiểm tra RLS policies.";
      }

      // Tạo message hiển thị với suggestion
      const displayMessage = suggestion ? `${msg}\n${suggestion}` : msg;

      toast({
        title: "❌ Lỗi gửi đơn",
        description: (
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium">{msg}</div>
              {suggestion && (
                <div className="text-muted-foreground mt-1">{suggestion}</div>
              )}
            </div>
          </div>
        ) as unknown as string,
        variant: "destructive",
        duration: 8000, // Hiển thị lâu hơn để user đọc được suggestion
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ====== UI giữ nguyên phần landing/roadmap/benefits của bạn ======
  const roadmapItems = [
    {
      phase: "Tuần 1-2",
      title: "Foundations",
      description:
        "Làm quen với AI cơ bản, Python programming, và Git workflow",
      color: "bg-primary",
    },
    {
      phase: "Tuần 3-4",
      title: "Machine Learning",
      description:
        "Học các thuật toán ML cơ bản, data preprocessing và model evaluation",
      color: "bg-accent",
    },
    {
      phase: "Tuần 5-6",
      title: "Deep Learning",
      description:
        "Neural networks, TensorFlow/PyTorch, và computer vision cơ bản",
      color: "bg-secondary-dark",
    },
    {
      phase: "Tuần 7-8",
      title: "NLP & Chatbots",
      description:
        "Natural Language Processing, OpenAI API, và xây dựng chatbot",
      color: "bg-success",
    },
    {
      phase: "Tuần 9-10",
      title: "Web Integration",
      description:
        "Tích hợp AI vào ứng dụng web, API development, và deployment",
      color: "bg-warning",
    },
    {
      phase: "Tuần 11-12",
      title: "Capstone Project",
      description: "Thực hiện dự án cuối khóa và presentation trước mentor",
      color: "bg-info",
    },
  ];

  const benefits = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Kiến thức AI thực tế",
      description: "Học các công nghệ AI tiên tiến được ứng dụng trong thực tế",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Hands-on Projects",
      description: "Làm việc trên các dự án thực tế với mentor kinh nghiệm",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Cộng đồng Ninja",
      description: "Kết nối với mạng lưới các Ninja AI trên toàn quốc",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Cơ hội nghề nghiệp",
      description: "Hỗ trợ tìm việc và kết nối với các công ty công nghệ",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={ninjaAIBanner}
            alt="Ninja AI Program"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Chương trình{" "}
              <span className="text-gradient-primary">Thực tập sinh</span>
              <br />
              <span className="text-gradient-primary">Ninja AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Trở thành những ninja công nghệ AI của tương lai. Chương trình đào
              tạo chuyên sâu với mentor kinh nghiệm và dự án thực tế.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-300/50 hover:shadow-xl hover:shadow-green-400/60 transition-all duration-300 ease-in-out px-8 py-4 text-lg rounded-2xl overflow-hidden animate-breathe"
                  onClick={() =>
                    document
                      .getElementById("application-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="relative z-10 flex items-center">
                    Ứng tuyển ngay
                    <Zap className="w-5 h-5 ml-2 animate-pulse" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-in-out rounded-2xl" />
                </Button>
              </motion.div>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-black hover:bg-green-500 hover:text-black btn-scale px-8 py-4 text-lg"
                onClick={() =>
                  document
                    .getElementById("program-details")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Tìm hiểu chương trình
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-white/80 text-sm">Tuần đào tạo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-white/80 text-sm">Dự án thực tế</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-white/80 text-sm">Tỷ lệ có việc làm</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1:1</div>
                <div className="text-white/80 text-sm">Mentor support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section id="program-details" className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tổng quan chương trình
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Chương trình được thiết kế để đào tạo những ninja AI với kỹ năng
              thực tế và tư duy sáng tạo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Mục tiêu",
                content:
                  "Đào tạo những lập trình viên AI có khả năng phát triển và triển khai các giải pháp AI trong thực tế",
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Phương pháp",
                content:
                  "Học tập theo dự án (Project-based Learning) với sự hướng dẫn 1:1 từ mentor kinh nghiệm",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Đối tượng",
                content:
                  "Sinh viên, fresh graduate hoặc người chuyển ngành có đam mê với AI và công nghệ",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Đầu ra",
                content:
                  "Chứng chỉ Ninja AI, portfolio dự án thực tế và cơ hội việc làm tại các công ty đối tác",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-6 text-center card-hover-green bg-gradient-card border-none"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.content}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lộ trình thực tập
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Chương trình 12 tuần được chia thành 6 giai đoạn, mỗi giai đoạn có
              mục tiêu và kết quả cụ thể
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
            <div className="space-y-12">
              {roadmapItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full lg:w-5/12 ${
                      index % 2 === 0 ? "pr-8" : "pl-8"
                    }`}
                  >
                    <Card className="p-6 card-hover bg-gradient-card border-none">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={`${item.color} text-white px-3 py-1`}>
                          {item.phase}
                        </Badge>
                        <h3 className="text-xl font-semibold text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </Card>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12">
                    <div
                      className={`w-6 h-6 ${item.color} rounded-full border-4 border-background z-10`}
                    ></div>
                  </div>
                  <div className="w-full lg:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Điểm nổi bật của chương trình
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Những lợi ích độc quyền khi tham gia chương trình Ninja AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-8 card-hover-pink bg-gradient-card border-none"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center text-secondary-dark flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Đăng ký tham gia
            </h2>
            <p className="text-lg text-muted-foreground">
              Điền thông tin để trở thành một thành viên của đại gia đình Ninja
              AI
            </p>
          </div>

          <Card className="p-8 bg-gray-100 border-none shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Họ và tên *
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Số điện thoại *
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0123456789"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tải lên CV / Portfolio
                  </label>
                  <Input
                    ref={fileInputRef}
                    name="cvFile"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Chấp nhận file .pdf, .doc, .docx. Tối đa 10MB.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cảm nhận về chương trình TTS Ninja AI *
                </label>
                <Textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  placeholder="Chia sẻ về mong muốn tham gia chương trình và mục tiêu nghề nghiệp của bạn..."
                  rows={5}
                  required
                  className="w-full resize-none"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale btn-ripple shadow-green px-12 py-4 text-lg"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi CV & Đơn ứng tuyển"}
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-secondary/10 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>
                  Chúng tôi sẽ liên hệ với bạn trong vòng 48 giờ sau khi nhận
                  được đơn ứng tuyển
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default NinjaAI;
