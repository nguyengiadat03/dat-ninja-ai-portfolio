import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Trang không tồn tại
          </h2>
          <p className="text-muted-foreground text-lg">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/")}
            className="bg-gradient-primary hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-green hover:shadow-xl hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5 mr-2" />
            Về trang chủ
          </Button>
          
          <div>
            <Button 
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </div>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>
            Nếu bạn cho rằng đây là lỗi, vui lòng{" "}
            <button 
              onClick={() => navigate("/lien-he")}
              className="text-primary hover:underline font-medium"
            >
              liên hệ với chúng tôi
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
