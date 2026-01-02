"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/common/Label";
import DonutChart from "./DonutChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

interface ColorCategoryCounts {
  Appreciation: number;
  Negative: number;
  Neutral: number;
  Unknown: number;
}

interface TotalSummary {
  period: string;
  total_messages: number;
  email_count: number;
  sms_count: number;
}

interface SchoolSummaryData {
  period: string;
  total_summary: TotalSummary;
  color_based_summary: {
    sms: ColorCategoryCounts;
    email: ColorCategoryCounts;
  };
}

interface SchoolSummarySectionProps {
  // No props needed - component will fetch its own data
}

const colorScheme = {
  Appreciation: "#10B981",
  Negative: "#EF4444",
  Neutral: "#3B82F6",
  Unknown: "#9CA3AF",
};

const periodOptions = [
  { value: "month", label: "1 Month" },
  { value: "6month", label: "6 Months" },
  { value: "year", label: "1 Year" },
];

export default function SchoolSummarySection({}: SchoolSummarySectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("6month");
  const [summaryData, setSummaryData] = useState<SchoolSummaryData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch school summary data
  const fetchSchoolSummary = async (period: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = await getCookie(ICookiesKey.AUTHTOKEN);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/logs/school-summary?period=${period}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSummaryData(data.data);
      } else {
        throw new Error(`Failed to fetch school summary: ${response.status}`);
      }
    } catch (err) {
      console.error("Error fetching school summary:", err);
      setError("Failed to load school summary data");
      // Set fallback data
      setSummaryData({
        period: period,
        total_summary: {
          period: period,
          total_messages: 0,
          email_count: 0,
          sms_count: 0,
        },
        color_based_summary: {
          sms: {
            Appreciation: 0,
            Negative: 0,
            Neutral: 0,
            Unknown: 0,
          },
          email: {
            Appreciation: 0,
            Negative: 0,
            Neutral: 0,
            Unknown: 0,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchSchoolSummary(selectedPeriod);
  }, []);

  // Refetch data when period changes
  useEffect(() => {
    if (selectedPeriod) {
      fetchSchoolSummary(selectedPeriod);
    }
  }, [selectedPeriod]);

  // Show loading state
  if (loading && !summaryData) {
    return (
      <Card className="w-full bg-white border border-[#DBDBDB]">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <Label className="text-gray-500">Loading school summary...</Label>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error && !summaryData) {
    return (
      <Card className="w-full bg-white border border-[#DBDBDB]">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <Label className="text-red-500">{error}</Label>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Don't render if no data
  if (!summaryData) {
    return null;
  }

  // Convert color-based summary to chart data format
  const convertToChartData = (data: ColorCategoryCounts) => {
    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
      color: colorScheme[name as keyof ColorCategoryCounts],
    }));
  };

  const smsChartData = convertToChartData(summaryData.color_based_summary.sms);
  const emailChartData = convertToChartData(
    summaryData.color_based_summary.email
  );

  return (
    <Card className="w-full bg-white border border-[#DBDBDB]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Message Summary
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Label className="text-sm text-gray-600">Period:</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Total Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F9F9FA] rounded-lg p-4 border border-[#DBDBDB]">
            <Label className="text-sm text-gray-600">Total Messages</Label>
            <Label className="text-2xl font-bold text-gray-900 block mt-1">
              {summaryData.total_summary.total_messages.toLocaleString()}
            </Label>
          </div>
          <div className="bg-[#F9F9FA] rounded-lg p-4 border border-[#DBDBDB]">
            <Label className="text-sm text-gray-600">Email Messages</Label>
            <Label className="text-2xl font-bold text-gray-900 block mt-1">
              {summaryData.total_summary.email_count.toLocaleString()}
            </Label>
          </div>
          <div className="bg-[#F9F9FA] rounded-lg p-4 border border-[#DBDBDB]">
            <Label className="text-sm text-gray-600">SMS Messages</Label>
            <Label className="text-2xl font-bold text-gray-900 block mt-1">
              {summaryData.total_summary.sms_count.toLocaleString()}
            </Label>
          </div>
        </div>

        {/* Pie Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SMS Chart */}
          <div className="space-y-4">
            <div className="text-center">
              <Label className="text-lg font-semibold text-gray-900">
                SMS Messages
              </Label>
              <Label className="text-sm text-gray-600 block">
                {summaryData.total_summary.sms_count.toLocaleString()} total
                messages
              </Label>
            </div>

            <div className="flex justify-center">
              <DonutChart
                data={smsChartData}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={90}
                centerLabel={`${summaryData.total_summary.sms_count}`}
                centerLabelSize="text-lg"
                centerLabelColor="text-gray-700"
              />
            </div>

            {/* SMS Legend */}
            <div className="grid grid-cols-2 gap-2">
              {smsChartData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <Label className="text-sm text-gray-700">{item.name}</Label>
                  <Label className="text-sm font-medium text-gray-900">
                    {item.value}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Email Chart */}
          <div className="space-y-4">
            <div className="text-center">
              <Label className="text-lg font-semibold text-gray-900">
                Email Messages
              </Label>
              <Label className="text-sm text-gray-600 block">
                {summaryData.total_summary.email_count.toLocaleString()} total
                messages
              </Label>
            </div>

            <div className="flex justify-center">
              <DonutChart
                data={emailChartData}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={90}
                centerLabel={`${summaryData.total_summary.email_count}`}
                centerLabelSize="text-lg"
                centerLabelColor="text-gray-700"
              />
            </div>

            {/* Email Legend */}
            <div className="grid grid-cols-2 gap-2">
              {emailChartData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <Label className="text-sm text-gray-700">{item.name}</Label>
                  <Label className="text-sm font-medium text-gray-900">
                    {item.value}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
