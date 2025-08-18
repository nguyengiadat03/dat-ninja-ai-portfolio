import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import "./ChatBot.css";
import {
  MessageCircle,
  Send,
  X,
  Image,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Xin chào! Tôi là ĐạtGPT 🤖 Tôi có thể giúp bạn tìm hiểu về Nguyễn Gia Đạt và Chương trình TTS Ninja AI. Bạn muốn biết điều gì?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Nguyễn Gia Đạt là ai?",
    "Chương trình Ninja AI là gì?",
    "Làm thế nào để ứng tuyển?",
    "Những kỹ năng cần thiết?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionKey] = useState(() => 'session_' + Math.random().toString(36).substr(2, 9));

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch('https://yoxkoxpwgiwskdnjjhyd.supabase.co/functions/v1/chatbot-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          sessionId,
          sessionKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        
        // Save session ID for future messages
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId);
        }
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Xin lỗi, có lỗi kết nối. Vui lòng thử lại sau.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("đạt") ||
      lowerMessage.includes("nguyễn gia đạt")
    ) {
      return "Nguyễn Gia Đạt là một lập trình viên FrontEnd chuyên nghiệp với kinh nghiệm trong việc phát triển ứng dụng web hiện đại. Anh ấy có thế mạnh trong việc kết hợp nghệ thuật và công nghệ để tạo nên những sản phẩm web mang dấu ấn riêng.";
    }

    if (
      lowerMessage.includes("ninja ai") ||
      lowerMessage.includes("chương trình")
    ) {
      return "Chương trình Thực tập sinh Ninja AI là một chương trình đào tạo chuyên sâu về AI và phát triển web. Chương trình tập trung vào việc đào tạo những kỹ năng thực tế và cung cấp kinh nghiệm làm việc với các dự án thực tế.";
    }

    if (lowerMessage.includes("ứng tuyển") || lowerMessage.includes("apply")) {
      return "Để ứng tuyển chương trình Ninja AI, bạn có thể điền form trên trang Ninja AI hoặc gửi CV và portfolio của bạn. Chúng tôi đang tìm kiếm những ứng viên có đam mê với công nghệ và mong muốn học hỏi.";
    }

    if (lowerMessage.includes("kỹ năng") || lowerMessage.includes("skill")) {
      return "Các kỹ năng cần thiết bao gồm: HTML/CSS, JavaScript, React, cơ bản về AI/ML, và quan trọng nhất là tinh thần học hỏi. Chúng tôi sẽ đào tạo từ cơ bản đến nâng cao.";
    }

    // return "Cảm ơn bạn đã hỏi! Tôi có thể giúp bạn tìm hiểu về Nguyễn Gia Đạt, chương trình Ninja AI, quá trình ứng tuyển, và các kỹ năng cần thiết. Bạn có câu hỏi cụ thể nào khác không?";
    return "Bạn có thể hỏi câu nào khôn hơn được không???";
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-primary text-white shadow-green animate-pulse-glow btn-scale relative overflow-hidden chatbot-pulse"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[400px] h-[500px] z-50 flex flex-col bg-card/95 backdrop-blur-md border shadow-xl animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-center font-semibold">ĐạtGPT</h3>
                <p className="text-center text-xs text-white/80">
                  AI Assistant
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg rounded-bl-none text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animate-bounce-delay-1"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animate-bounce-delay-2"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-border bg-muted/30">
              <div className="text-xs text-muted-foreground mb-2">
                Câu hỏi gợi ý:
              </div>
              <div className="grid grid-cols-1 gap-1">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs h-auto p-2 justify-start text-left"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2 items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <Image className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Nhập tin nhắn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") sendMessage(inputValue);
                }}
                className="flex-1 text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => sendMessage(inputValue)}
                size="sm"
                className="bg-primary text-white hover:bg-primary-dark"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
