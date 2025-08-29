import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Upload,
  ArrowRight,
  XCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ninjaBanner from "@/assets/background_ninjaai.mp4";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  cvFile: File | null;
  motivation: string;
}

const NinjaAI = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToForm) {
      setTimeout(() => {
        const element = document.getElementById("application-form");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else {
      // Cuộn về đầu trang khi không có scrollToForm
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.state]);

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    email: "",
    phone: "",
    cvFile: null,
    motivation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitStep, setSubmitStep] = useState<
    "idle" | "validating" | "uploading" | "submitting" | "completed"
  >("idle");

  // ====== Tối ưu video: lazy-load và tôn trọng Data Saver / mạng chậm ======
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let allow = true;
          const conn = (navigator as any)?.connection;
          // Bỏ tải video nếu người dùng bật tiết kiệm dữ liệu hoặc mạng rất chậm
          if (conn?.saveData) allow = false;
          if (/(^|-)2g/.test(conn?.effectiveType || "")) allow = false;

          if (allow) setShouldLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" } // nạp sớm trước khi hero vào khung nhìn
    );

    io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo || !heroVideoRef.current) return;
    const v = heroVideoRef.current;
    // load metadata trước rồi play để mượt hơn
    v.load();
    const p = v.play();
    if (p && typeof p.then === "function") p.catch(() => {});
  }, [shouldLoadVideo]);
  // =======================================================================

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      cvFile: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStep("validating");
    setUploadProgress(0);

    try {
      // Step 1: Validation
      setSubmitStep("validating");
      await new Promise((resolve) => setTimeout(resolve, 200)); // Brief validation delay

      let cvUrl = "";

      // Step 2: Upload CV file if selected
      if (formData.cvFile) {
        setSubmitStep("uploading");
        setUploadProgress(10);

        const fileExt = formData.cvFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

        setUploadProgress(30);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("cv_uploads")
          .upload(fileName, formData.cvFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast({
            title: "Lỗi tải file",
            description: "Không thể tải lên file CV. Vui lòng thử lại.",
            variant: "destructive",
          });
          setSubmitStep("idle");
          return;
        }

        setUploadProgress(70);

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("cv_uploads").getPublicUrl(uploadData.path);

        cvUrl = publicUrl;
        setUploadProgress(90);
      }

      // Step 3: Submit application
      setSubmitStep("submitting");
      setUploadProgress(95);

      const { data, error } = (await Promise.race([
        supabase.functions.invoke("submit-application", {
          body: {
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phone,
            cvUrl: cvUrl,
          },
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 15000)
        ),
      ])) as any;

      // Handle response including duplicate checks returned as success:false
      if (data && "success" in data && data.success === false) {
        toast({
          title: "Không thể gửi đơn",
          description:
            (data as any).error ||
            "Thông tin đã tồn tại. Vui lòng kiểm tra lại.",
          variant: "destructive",
        });
        return;
      }

      if (error) {
        console.error("Submit error:", error);
        toast({
          title: "Lỗi gửi đơn",
          description: error.message || "Có lỗi xảy ra khi gửi đơn ứng tuyển",
          variant: "destructive",
        });
        return;
      }

      // Step 4: Success
      setSubmitStep("completed");
      setUploadProgress(100);

      toast({
        title: "Đơn ứng tuyển đã được gửi!",
        description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
        variant: "success",
      });

      // Reset form after a brief delay
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          cvFile: null,
          motivation: "",
        });
        setSubmitStep("idle");
        setUploadProgress(0);
      }, 1500);
    } catch (error) {
      console.error("Unexpected error:", error);

      const errorMessage =
        error instanceof Error && error.message === "Request timeout"
          ? "Yêu cầu quá thời gian chờ. Vui lòng thử lại."
          : "Có lỗi không mong muốn xảy ra. Vui lòng thử lại.";

      toast({
        title: "Lỗi hệ thống",
        description: errorMessage,
        variant: "destructive",
      });

      setSubmitStep("idle");
      setUploadProgress(0);
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
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 parallax-bg overflow-hidden">
          <video
            ref={heroVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            {shouldLoadVideo && (
              <>
                {/* Nếu có file .webm nhẹ hơn, bạn có thể import và thêm source webm ưu tiên:
                    <source src={ninjaBannerWebm} type="video/webm" /> */}
                <source src={ninjaBanner} type="video/mp4" />
              </>
            )}
          </video>
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

            <p className="text-xl md:text-2xl text-white font-bold mb-8 max-w-3xl mx-auto leading-relaxed">
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

      <section id="program-details" className="py-20 bg-background-secondary">
        {/* Mục tiêu chương trình */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mục tiêu chương trình
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Chương trình Ninja AI được thiết kế để đào tạo thế hệ kỹ sư công
              nghệ mới - những người không chỉ thành thạo về lập trình mà còn
              hiểu sâu về lập trình và ứng dụng AI vào công việc, đời sống và có
              khả năng áp dụng vào các dự án thực tế.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Kỹ năng cốt lõi */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 border-none shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Kỹ năng cốt lõi
                </h3>
              </div>
              <div className="space-y-4 ">
                {[
                  {
                    icon: <Zap className="w-5 h-5" />,
                    text: "Full-stack development",
                  },
                  {
                    icon: <Brain className="w-5 h-5" />,
                    text: "Building a strong Blockchain, AI community",
                  },
                  {
                    icon: <Target className="w-5 h-5" />,
                    text: "Problem-solving mindset - AI First",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    text: "Team collaboration",
                  },
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="hover:scale-105 hover:shadow-xl flex items-center gap-3 p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-all duration-200"
                  >
                    <div className="text-blue-600 ">{skill.icon}</div>
                    <span className="text-gray-700 font-medium">
                      {skill.text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Đầu ra mong đợi */}
            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-100 border-none shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Đầu ra mong đợi
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: "Fresher/Junior Developer ready",
                  },
                  {
                    icon: <Rocket className="w-5 h-5" />,
                    text: "Portfolio dự án thực tế + Chatbot AI",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    text: "Kết nối industry network",
                  },
                  {
                    icon: <Sparkles className="w-5 h-5" />,
                    text: "Mindset startup - Mindset AI First",
                  },
                ].map((outcome, index) => (
                  <div
                    key={index}
                    className="hover:scale-105 hover:shadow-xl flex items-center gap-3 p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-all duration-200"
                  >
                    <div className="text-green-600">{outcome.icon}</div>
                    <span className="text-gray-700 font-medium">
                      {outcome.text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
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

      {/* Current Internship Projects */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Dự án thực tập sinh đang thực hiện
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Các dự án thực tế mà thực tập sinh Ninja AI đang phát triển, từ AI
              Chatbot đến Blockchain DApp và IoT Smart Home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Chatbot Platform */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-100 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  AI Chatbot Platform
                </h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nền tảng chatbot AI với khả năng xử lý ngôn ngữ tự nhiên và tích
                hợp vector database.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    React + TypeScript Frontend
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Node.js + OpenAI API Backend
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Vector Database Integration
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Real-time Chat Interface
                  </span>
                </div>
              </div>
            </Card>

            {/* E-commerce CRM System */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  E-commerce CRM System
                </h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Hệ thống CRM thương mại điện tử với AI analytics và email
                automation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Next.js + Prisma Stack
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    PostgreSQL Database
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    AI-powered Analytics
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Email Automation
                  </span>
                </div>
              </div>
            </Card>

            {/* Blockchain DApp */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-100 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Blockchain DApp
                </h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Ứng dụng phi tập trung cho việc quản lý và xác thực chứng chỉ
                giáo dục trên blockchain.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Solidity Smart Contracts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Web3.js Integration
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    MetaMask Wallet Connect
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    IPFS File Storage
                  </span>
                </div>
              </div>
            </Card>

            {/* AI Learning Mobile App */}
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-100 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  AI Learning Mobile App
                </h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Ứng dụng mobile học tập cá nhân hóa với AI tutor và gamification
                elements.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    React Native + Expo
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Firebase Backend
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    AI Recommendation Engine
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Offline Learning Support
                  </span>
                </div>
              </div>
            </Card>

            {/* AI Data Analytics Platform */}
            <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-100 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  AI Data Analytics Platform
                </h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nền tảng phân tích dữ liệu với machine learning models và
                interactive dashboards.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Python + FastAPI
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    TensorFlow/PyTorch ML
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    D3.js Data Visualization
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Real-time Data Processing
                  </span>
                </div>
              </div>
            </Card>

            {/* IoT Smart Home System */}
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-100 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  IoT Smart Home System
                </h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Hệ thống nhà thông minh với AI automation và voice control
                integration.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Arduino/Raspberry Pi
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">MQTT Protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Voice Assistant Integration
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Mobile Control App
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-none shadow-lg max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-indigo-600" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Tham gia ngay để trải nghiệm
                </h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Các dự án này không chỉ là bài tập mà là sản phẩm thực tế được
                sử dụng bởi người dùng thật. Thực tập sinh sẽ được làm việc trực
                tiếp với các công nghệ tiên tiến và học hỏi từ mentor kinh
                nghiệm.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("application-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ứng tuyển ngay để tham gia dự án
                <Rocket className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Work Philosophy */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🚀 Phương châm làm việc
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Những nguyên tắc cốt lõi định hướng hành trình trở thành Ninja AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                emoji: "🎯",
                title: "AI First Mindset",
                description:
                  "Luôn ưu tiên tư duy AI trong mọi giải pháp. Không chỉ học công nghệ mà còn hiểu cách áp dụng AI để tối ưu hóa quy trình làm việc.",
                color: "from-blue-500 to-cyan-600",
                bgGradient: "from-blue-50 via-cyan-50 to-blue-100",
              },
              {
                emoji: "⚡",
                title: "Learn Fast, Build Faster",
                description:
                  "Học nhanh, thực hành ngay. Mỗi kiến thức mới phải được áp dụng vào dự án thực tế trong vòng 24 giờ.",
                color: "from-yellow-500 to-orange-600",
                bgGradient: "from-yellow-50 via-orange-50 to-amber-100",
              },
              {
                emoji: "🤝",
                title: "Community Driven",
                description:
                  "Xây dựng và phát triển cùng cộng đồng. Chia sẻ kiến thức, hỗ trợ lẫn nhau và cùng nhau tiến bộ.",
                color: "from-green-500 to-emerald-600",
                bgGradient: "from-green-50 via-emerald-50 to-teal-100",
              },
              {
                emoji: "🔥",
                title: "Passion Over Perfection",
                description:
                  "Đam mê là động lực chính. Không ngại thất bại, luôn sẵn sàng thử nghiệm và học hỏi từ mỗi sai lầm.",
                color: "from-red-500 to-pink-600",
                bgGradient: "from-red-50 via-pink-50 to-rose-100",
              },
              {
                emoji: "🌟",
                title: "Innovation Mindset",
                description:
                  "Luôn tìm kiếm cách làm mới, sáng tạo. Không chỉ làm theo mà còn tạo ra những giải pháp độc đáo.",
                color: "from-purple-500 to-indigo-600",
                bgGradient: "from-purple-50 via-violet-50 to-indigo-100",
              },
              {
                emoji: "🚀",
                title: "Ship It Mentality",
                description:
                  "Hoàn thành và triển khai sản phẩm thực tế. Từ ý tưởng đến sản phẩm có thể sử dụng được.",
                color: "from-teal-500 to-blue-600",
                bgGradient: "from-teal-50 via-sky-50 to-blue-100",
              },
            ].map((principle, index) => (
              <Card
                key={index}
                className={`p-6 card-hover bg-gradient-to-br ${principle.bgGradient} backdrop-blur-sm border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{principle.emoji}</div>
                  <div
                    className={`w-full h-1 bg-gradient-to-r ${principle.color} rounded-full mb-4`}
                  ></div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {principle.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 border-none shadow-xl max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-3xl">🥷</div>
                <h3 className="text-2xl font-bold text-gray-800">Ninja Code</h3>
                <div className="text-3xl">🥷</div>
              </div>
              <blockquote className="text-lg italic text-gray-700 leading-relaxed">
                "Một Ninja AI không chỉ viết code, mà còn tạo ra những giải pháp
                thông minh. Chúng ta không chỉ theo kịp công nghệ, mà còn dẫn
                đầu xu hướng. Mỗi dòng code đều mang sứ mệnh tạo ra tương lai
                tốt đẹp hơn."
              </blockquote>
              <div className="mt-4 text-sm text-gray-600 font-medium">
                - Ninja AI Community
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Thực tập sinh nói gì về Ninja AI
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Những chia sẻ chân thật từ các thực tập sinh đã trải nghiệm chương
              trình Ninja AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chu Tiến Sơn */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  CS
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Chu Tiến Sơn</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Chương trình thực tập tại Ninja AI đã giúp tôi phát triển kỹ
                năng AI/ML một cách bài bản."
              </p>
            </Card>

            {/* Đàm Hữu Phú */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  ĐP
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Đàm Hữu Phú</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Môi trường làm việc chuyên nghiệp và mentor hỗ trợ nhiệt tình."
              </p>
            </Card>

            {/* Lê Huỳnh */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  LH
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Lê Huỳnh</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Tôi đã học được cách áp dụng AI vào giải quyết các bài toán
                thực tế."
              </p>
            </Card>

            {/* Lê Thành Chỉnh */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  TC
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Lê Thành Chỉnh</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Chương trình giúp tôi tự tin hơn trong việc phát triển các ứng
                dụng AI."
              </p>
            </Card>

            {/* Vi Nguyễn Ngọc Châu */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  VC
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Vi Nguyễn Ngọc Châu
                  </h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Kiến thức thực tế và cơ hội làm việc với các dự án thật sự ấn
                tượng."
              </p>
            </Card>

            {/* Nguyễn Hoàng Kiên */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  NK
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Nguyễn Hoàng Kiên</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Mentor rất tận tâm và luôn sẵn sàng hỗ trợ khi gặp khó khăn."
              </p>
            </Card>

            {/* Trần Hữu Ánh Băng */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  TB
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Trần Hữu Ánh Băng</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Từ zero đến hero trong AI, chương trình thực sự hiệu quả."
              </p>
            </Card>

            {/* Vũ Phương Nam */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  VN
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Vũ Phương Nam</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Cộng đồng Ninja AI rất supportive và đầy năng lượng tích cực."
              </p>
            </Card>

            {/* Trịnh Nam Sơn */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  TS
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Trịnh Nam Sơn</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Học được rất nhiều về Machine Learning và Deep Learning thực
                tế."
              </p>
            </Card>

            {/* Lê Gia Đạt */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  LĐ
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Lê Gia Đạt</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Portfolio sau khóa học giúp tôi dễ dàng tìm được việc làm mơ
                ước."
              </p>
            </Card>

            {/* Nguyễn Tiến Long */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  NL
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Nguyễn Tiến Long</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Chương trình thực tập đã thay đổi hoàn toàn career path của
                tôi."
              </p>
            </Card>

            {/* Phạm Minh Tuấn */}
            <Card className="p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  PT
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Phạm Minh Tuấn</h3>
                  <p className="text-sm text-gray-600">
                    Thực tập sinh Ninja AI
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Kiến thức AI được ứng dụng ngay vào công việc, rất thực tế và
                hiệu quả."
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-lg max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Bạn cũng muốn trở thành Ninja AI?
                </h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Hãy tham gia cùng chúng tôi để trải nghiệm chương trình đào tạo
                AI chuyên nghiệp và kết nối với cộng đồng những người đam mê
                công nghệ.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("application-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ứng tuyển ngay
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Participants */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Đối tượng tham gia
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Chương trình Ninja AI dành cho những ai có đam mê và quyết tâm
              phát triển trong lĩnh vực AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Phù hợp với */}
            <Card className="p-8 bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Phù hợp với
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Sinh viên năm cuối hoặc fresh graduate IT
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Người đã có kiến thức cơ bản về lập trình
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Có đam mê học hỏi và phát triển bản thân
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Sẵn sàng commit full-time trong 3 tháng
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Muốn làm việc trong môi trường startup
                    </span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Yêu cầu kỹ năng */}
            <Card className="p-8 bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Yêu cầu kỹ năng
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Hiểu biết cơ bản về HTML, CSS, JavaScript
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Đã từng làm ít nhất 1 dự án cá nhân
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Kỹ năng tiếng Anh đọc hiểu tài liệu
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">
                      Thái độ học hỏi và tinh thần teamwork
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Có laptop cá nhân</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-none shadow-lg max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Bạn đã sẵn sàng chưa?
                </h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Nếu bạn thấy mình phù hợp với các tiêu chí trên, đừng ngần ngại
                ứng tuyển ngay hôm nay!
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("application-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Bắt đầu hành trình Ninja AI
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
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
            <form
              id="registration-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
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
                    CV / Portfolio
                  </label>
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark"
                    />
                    <div className="mt-1 text-xs text-muted-foreground">
                      Chấp nhận file PDF, DOC, DOCX (tối đa 10MB)
                    </div>
                  </div>
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

              {/* Progress Bar */}
              {isSubmitting && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {submitStep === "validating" &&
                        "Đang kiểm tra thông tin..."}
                      {submitStep === "uploading" && "Đang tải lên CV..."}
                      {submitStep === "submitting" &&
                        "Đang gửi đơn ứng tuyển..."}
                      {submitStep === "completed" && "Hoàn thành!"}
                    </span>
                    <span className="text-muted-foreground">
                      {uploadProgress}%
                    </span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale btn-ripple shadow-green px-12 py-4 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {submitStep === "validating" && "Đang kiểm tra..."}
                      {submitStep === "uploading" && "Đang tải lên..."}
                      {submitStep === "submitting" && "Đang gửi..."}
                      {submitStep === "completed" && "Đã gửi!"}
                    </>
                  ) : (
                    <>
                      Gửi CV & Đơn ứng tuyển
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
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
