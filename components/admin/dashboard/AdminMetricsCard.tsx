'use client'
import DonutChart from "./DonutChart";
import ProgressBar from "./ProgressBar";

interface MetricsData {
  active: number;
  inactive: number;
}

interface AdminMetricsCardProps {
  title: string;
  data: MetricsData;
  chartLabel: string;
  activeColor?: string;
  inactiveColor?: string;
  activeProgressBarColor?: string;
  inactiveProgressBarColor?: string;
  className?: string;
}

export default function AdminMetricsCard({
  title,
  data,
  chartLabel,
  activeColor = "#94E9B8",
  inactiveColor = "#92BFFF",
  activeProgressBarColor = "bg-[#94E9B8]",
  inactiveProgressBarColor = "bg-[#92BFFF]",
  className = ""
}: AdminMetricsCardProps) {
  const total = data.active + data.inactive;
  
  const chartData = [
    { name: 'Active', value: data.active, color: activeColor },
    { name: 'Inactive', value: data.inactive, color: inactiveColor }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <DonutChart
          data={chartData}
          centerLabel={chartLabel}
          centerLabelSize="text-sm"
          centerLabelColor="text-gray-600"
        />
        <div className="flex-1 space-y-2">
          <ProgressBar
            value={data.active}
            maxValue={total}
            label="Active"
            barColor={activeProgressBarColor}
          />
          <ProgressBar
            value={data.inactive}
            maxValue={total}
            label="Inactive"
            barColor={inactiveProgressBarColor}
          />
        </div>
      </div>
    </div>
  );
} 