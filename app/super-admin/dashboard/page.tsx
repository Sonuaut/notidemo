import MessageStats from "@/components/super-admin/dashboard/MessageStats";
import InsightSection from "@/components/super-admin/dashboard/InsightSection";
import SubscriptionBreakdown from "@/components/super-admin/dashboard/SubscriptionBreakdown";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Label } from "@/components/common/Label";
import {
  fetchSubscriptionStats,
  fetchSuperAdminDashboardData,
} from "@/lib/superadmin/dashboard";
import SuperAdminPlansDialog from "@/components/super-admin/plans/SuperAdminPlansDialog";

export const dynamic = 'force-dynamic';

export default async function SuperAdminDashboard() {
  const dashboardData = await fetchSuperAdminDashboardData();
  const subscriptionStats = await fetchSubscriptionStats();
  // console.log("dashboardData",dashboardData);
  // console.log("subscriptionStats",subscriptionStats);

  console.log("dashboardData");
  return (
    <AdminLayout type="super-admin" className="md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-6 font-inter">
        <div className="flex items-center space-x-3">
          <Label className="text-2xl font-bold text-gray-900 ">Overview</Label>
          <Label className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E0E7FF] text-[#6366F1]">
            Super Admin
          </Label>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className=" space-y-6 text-inter font-inter px-6 py-9 ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <MessageStats
              smsCount={dashboardData.smsCount}
              emailCount={dashboardData.emailCount}
            />
            <SubscriptionBreakdown subscriptions={subscriptionStats} />
          </div>
          <div className="lg:col-span-2">
            <InsightSection activity={dashboardData.activity} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
