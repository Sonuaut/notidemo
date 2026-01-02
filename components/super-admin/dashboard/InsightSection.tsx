
import { CloudDownload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricsCard from "./MetricsCard";

interface ActivityData {
  active: number;
  inactive: number;
}

interface InsightSectionProps {
  activity: {
    School: ActivityData;
    Teachers: ActivityData;
  };
}

export default function InsightSection({ activity }: InsightSectionProps) {
  const metricsData = [
    {
      title: "School",
      data: activity.School,
      chartLabel: "School"
    },
    {
      title: "Teachers", 
      data: activity.Teachers,
      chartLabel: "Teachers"
    }
  ];

  return (
    <Card className="bg-[#F9F9FA] border   border-[#DBDBDB]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Insite</CardTitle>
          <div className="flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 h-8 w-8">
            <CloudDownload className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {metricsData.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric.title}
            data={metric.data}
            chartLabel={metric.chartLabel}
          />
        ))}
      </CardContent>
    </Card>
  );
} 