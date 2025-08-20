import React, { useState } from "react";
import { Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const zaloIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png";
const ContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: (
        <img
          src={zaloIcon}
          alt="Zalo"
          className="w-6 h-6 rounded-full object-cover"
        />
      ),
      label: "Zalo",
      action: () => window.open("https://zalo.me/pc", "_blank"),
    },
    {
      icon: <Send className="w-6 h-66 text-blue-600" />,
      label: "Messenger",
      action: () => window.open("https://m.me/your-page", "_blank"),
    },
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      label: "Điện thoại",
      action: () => window.open("tel:+84123456789", "_self"),
    },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {/* Contact Options Menu */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 p-2 shadow-lg border animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex flex-col gap-2 min-w-[140px]">
            {contactOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="justify-start gap-3 h-10 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-105"
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
              >
                {option.icon}
                <span className="text-sm">{option.label}</span>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Main Zalo Button with Pulse + Ripple Effect */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg relative overflow-hidden"
        >
          {/* Hiệu ứng lan tỏa */}
          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping"></span>
          <span className="absolute inset-0 rounded-full bg-blue-300 opacity-20 animate-ping [animation-delay:0.5s]"></span>
          <span className="absolute inset-0 rounded-full bg-blue-200 opacity-10 animate-ping [animation-delay:1s]"></span>
          {/* Icon Zalo */}
          <img
            src={zaloIcon}
            alt="Zalo"
            className="w-13 h-13 object-contain"
          />
        </Button>
      </div>
    </div>
  );
};

export default ContactButtons;
