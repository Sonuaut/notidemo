import { AdminLayout } from "@/components/layout/admin-layout";
import { Label } from "@/components/common/Label";
import AdminMessageStats from "@/components/admin/dashboard/AdminMessageStats";
import { IRole } from "@/types";
import AdminInsightSection from "@/components/admin/dashboard/AdminInsightSection";
import CreditLimitReached from "@/components/admin/dashboard/CreditLimitReached";
import SchoolSummarySection from "@/components/admin/dashboard/SchoolSummarySection";
import { fetchAdminDashboardData } from "@/lib/admin/dashboard";

export default async function SuperAdminDashboard() {
  const dashboardData = await fetchAdminDashboardData();
  console.log("dashboardData :", dashboardData);

  return (
    <AdminLayout type={IRole.ADMIN} className="md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-6">
        <div className="flex items-center space-x-3">
          <Label className="text-2xl font-bold text-gray-900 ">Overview</Label>
          <Label className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E0E7FF] text-[#6366F1]">
            Admin
          </Label>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <div className=" w-full space-y-6 text-inter font-inter px-6 py-9 ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
          <div className="lg:col-span-3 space-y-6">
            <AdminMessageStats
              smsCount={dashboardData.smsCount}
              emailCount={dashboardData.emailCount}
              smsLimit={dashboardData.smsLimit}
              emailLimit={dashboardData.emailLimit}
            />
            <SchoolSummarySection />
            {/* <AdminSubscriptionBreakdown subscriptions={dashboardData.subscriptions} /> */}
            <CreditLimitReached />
          </div>
          <div className="lg:col-span-2">
            <AdminInsightSection activity={dashboardData.activity} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
