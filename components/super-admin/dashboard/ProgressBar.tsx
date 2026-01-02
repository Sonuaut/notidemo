
interface ProgressBarProps {
  value: number;
  maxValue: number;
  label: string;
  valueColor?: string;
  labelColor?: string;
  barColor?: string;
  barBgColor?: string;
  height?: number;
  showValue?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  maxValue,
  label,
  valueColor = "text-[#474747]",
  labelColor = "text-[#474747]",
  barColor = "bg-[#92BFFF]",
  barBgColor = "border border-box",
  height = 8,
  showValue = true,
  className = ""
}: ProgressBarProps) {
  const percentage = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm ${labelColor}`}>{label}</span>
        {showValue && (
          <span className={`text-sm font-medium ${valueColor}`}>{value}</span>
        )}
      </div>
      <div className={`w-full ${barBgColor} rounded-full`} style={{ height: `${height}px` }}>
        <div 
          className={`w-full ${barColor} rounded-full transition-all duration-300`}
          style={{ 
            width: `${percentage}%`,
            height: `${height}px`
          }}
        />
      </div>
    </div>
  );
} 