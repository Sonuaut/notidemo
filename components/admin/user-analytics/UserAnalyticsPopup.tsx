"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/common/Label";
import DonutChart from "@/components/admin/dashboard/DonutChart";
import { Card, CardContent } from "@/components/ui/card";
import { UserAnalytics } from "@/types/user-analytics";

interface UserAnalyticsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: UserAnalytics | null;
}

const colorScheme = {
  Appreciation: "#10B981",
  Negative: "#EF4444",
  Neutral: "#3B82F6",
  Unknown: "#9CA3AF",
};

export default function UserAnalyticsPopup({
  open,
  onOpenChange,
  userData,
}: UserAnalyticsPopupProps) {
  if (!userData) {
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

  const smsChartData = convertToChartData(userData.color_based_summary.sms);
  const emailChartData = convertToChartData(userData.color_based_summary.email);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Analytics for {userData.user_name}
          </DialogTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Email: {userData.email}</span>
            <span>Role: {userData.role}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Total Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#F9F9FA] border border-[#DBDBDB]">
              <CardContent className="p-4">
                <Label className="text-sm text-gray-600">Total Messages</Label>
                <Label className="text-2xl font-bold text-gray-900 block mt-1">
                  {userData.total_messages.toLocaleString()}
                </Label>
              </CardContent>
            </Card>
            <Card className="bg-[#F9F9FA] border border-[#DBDBDB]">
              <CardContent className="p-4">
                <Label className="text-sm text-gray-600">Email Messages</Label>
                <Label className="text-2xl font-bold text-gray-900 block mt-1">
                  {userData.email_count.toLocaleString()}
                </Label>
              </CardContent>
            </Card>
            <Card className="bg-[#F9F9FA] border border-[#DBDBDB]">
              <CardContent className="p-4">
                <Label className="text-sm text-gray-600">SMS Messages</Label>
                <Label className="text-2xl font-bold text-gray-900 block mt-1">
                  {userData.sms_count.toLocaleString()}
                </Label>
              </CardContent>
            </Card>
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
                  {userData.sms_count.toLocaleString()} total messages
                </Label>
              </div>

              <div className="flex justify-center">
                <DonutChart
                  data={smsChartData}
                  width={200}
                  height={200}
                  innerRadius={60}
                  outerRadius={90}
                  centerLabel={`${userData.sms_count}`}
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
                  {userData.email_count.toLocaleString()} total messages
                </Label>
              </div>

              <div className="flex justify-center">
                <DonutChart
                  data={emailChartData}
                  width={200}
                  height={200}
                  innerRadius={60}
                  outerRadius={90}
                  centerLabel={`${userData.email_count}`}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
