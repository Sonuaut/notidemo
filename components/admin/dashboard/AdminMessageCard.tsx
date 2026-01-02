import { Label } from "@/components/common/Label";


interface MessageCardProps {
    icon: string;
    label: string;
    count: number;
    limit: number;
    period: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    type: string;
}

export default function AdminMessageCard({
    icon,
    label,
    count,
    limit,
    period,
    bgColor,
    borderColor,
    textColor,
    type
}: MessageCardProps) {
    const imageurl=type==="sms" ? "/message.svg" : "/EMAIL.svg";
    return (
        <div className={`${bgColor} rounded-xl shadow-sm border ${borderColor} p-[22px] flex flex-col  h-[178px]`}>
            <div className="flex items-center gap-2 mt-2">
                <img src={imageurl} alt={label} width={24} height={24} />
                <span className="text-sm font-medium text-gray-700 ">{label}</span>
            </div>
            
            <Label size={"lg"} className={` text-[32px] font-bold ${textColor} mt-10  `}>{count.toLocaleString()}
               <span className="text-[20px] text-gray-500 px-0.5">/</span>
                <Label className=" text-gray-500 ">{limit}</Label>
            </Label>
            <span className="text-xs text-gray-500">{period}</span>

        </div>
    );
} 