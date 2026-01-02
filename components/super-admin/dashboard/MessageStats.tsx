
import { MessageSquare, Mail } from "lucide-react";
import MessageCard from "./MessageCard";

interface MessageStatsProps {
  smsCount: number;
  emailCount: number;
}

export default function MessageStats({ smsCount, emailCount }: MessageStatsProps) {
  const messageCards = [
    {
      icon: "/message.svg",
      label: "SMS Messages",
      count: smsCount,
      period: "This month",
      bgColor: "bg-[#EDEEFC]",
      borderColor: "border-[#9EA5FF]",
      textColor: "text-[#9EA5FF]",
      type: "sms"
    },
    {
      icon: "/EMAIL.svg",
      label: "Email Messages",
      count: emailCount,
      period: "This month",
      bgColor: "bg-[#E6F1FD]",
      borderColor: "border-[#7CBBFF]",
      textColor: "text-[#3F9BFF]",
      type: "email"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {messageCards.map((card, index) => (
        <MessageCard
          key={index}
          icon={card.icon}
          label={card.label}
          count={card.count}
          period={card.period}
          bgColor={card.bgColor}
          borderColor={card.borderColor}
          textColor={card.textColor}
          type={card.type}
        />
      ))}
    </div>
  );
} 