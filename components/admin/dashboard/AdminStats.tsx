import { fetchDashboardData } from '@/lib/admin/dashboard';
import React from 'react'
import AdminMessageStats from './AdminMessageStats';
import AdminInsightSection from './AdminInsightSection';
import CreditLimitReached from './CreditLimitReached';

export default async function AdminStats() {
    const dashboardData = await fetchDashboardData();
  return (
    <div className=" w-full space-y-6 text-inter font-inter px-6 py-9 ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
          <div className="lg:col-span-3 space-y-6">
            <AdminMessageStats
              smsCount={dashboardData.smsCount}
              emailCount={dashboardData.emailCount}
              smsLimit={dashboardData.smsLimit}
              emailLimit={dashboardData.emailLimit}
            />
            {/* <AdminSubscriptionBreakdown subscriptions={dashboardData.subscriptions} /> */}
            <CreditLimitReached />
          </div>
          <div className="lg:col-span-2">
            <AdminInsightSection activity={dashboardData.activity} />
          </div>
        </div>
      </div>
  )
}
