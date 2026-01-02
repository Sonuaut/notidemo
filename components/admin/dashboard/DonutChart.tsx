'use client'
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DonutChartData {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  centerLabel?: string;
  centerLabelSize?: string;
  centerLabelColor?: string;
  cornerRadius?: number;
}

export default function DonutChart({
  data,
  width = 181,
  height = 181,
  innerRadius = 50,
  outerRadius = 80,
  centerLabel,
  centerLabelSize = "text-sm",
  centerLabelColor = "text-gray-600",
  cornerRadius = 5
}: DonutChartProps) {
  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={0}
            dataKey="value"
            cornerRadius={cornerRadius}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {centerLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${centerLabelSize} font-medium ${centerLabelColor}`}>
            {centerLabel}
          </span>
        </div>
      )}
    </div>
  );
} 