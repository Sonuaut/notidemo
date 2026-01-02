import AdminMessageCard from "./AdminMessageCard";


interface MessageStatsProps {
  smsCount: number;
  emailCount: number;
  smsLimit: number;
  emailLimit: number;
}

export default function AdminMessageStats({ smsCount, emailCount, smsLimit, emailLimit }: MessageStatsProps) {
  const messageCards = [
    {
      icon: "/message.svg",
      label: "SMS Messages",
      count: smsCount,
      limit: smsLimit,
      period: "This month",
      bgColor: "bg-[#D3F0ED]",
      borderColor: "border-[#39AFA3]",
      textColor: "text-[#39AFA3]",
      type: "sms"
    },
    {
      icon: "/EMAIL.svg",
      label: "Email Messages",
      count: emailCount,
      limit: emailLimit,
      period: "This month",
      bgColor: "bg-[#D0E3FF]",
      borderColor: "border-[#7DB1FF]",
      textColor: "text-[#2F76E0]",
      type: "email"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {messageCards.map((card, index) => (
        <AdminMessageCard
          key={index}
          icon={card.icon}
          limit={card.limit}
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