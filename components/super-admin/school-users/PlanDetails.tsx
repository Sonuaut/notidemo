
import { CreditCard, Calendar, DollarSign, RefreshCw, ArrowUpRight } from "lucide-react";
import { User } from "@/lib/superadmin/school-users";
import SuperAdminPlansDialog from "../plans/SuperAdminPlansDialog";
import SuperAdminRechargeDialog from "../plans/SuperAdminRechargeDialog";

interface PlanDetailsProps {
  subscription: User["subscription"];
  isLoading?: boolean;
  adminId?: number;
  schoolId?: number;
}

export function PlanDetails({ subscription, isLoading = false, adminId, schoolId }: PlanDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-xl px-6 py-4 border border-purple-200/60 shadow-lg animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-200"></div>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 rounded-xl p-6 border border-gray-200/60 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center shadow-lg ring-4 ring-gray-100">
              <CreditCard className="w-10 h-10 text-gray-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-600 mb-1">No Subscription</h3>
              <p className="text-sm text-gray-500 font-medium">This admin doesn't have an active plan</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SuperAdminPlansDialog adminId={adminId as number} schoolId={schoolId as number} className="" />
            <SuperAdminRechargeDialog adminUserId={adminId as number} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-xl p-6 border border-purple-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 flex items-center justify-center shadow-lg ring-4 ring-purple-100">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {subscription.duration} Plan
            </h3>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full shadow-sm ${
                subscription.isActive ? "bg-green-500" : "bg-red-500"
              }`}></div>
              <span className={`font-semibold text-sm ${
                subscription.isActive ? "text-green-700" : "text-red-700"
              }`}>
                {subscription.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <SuperAdminPlansDialog adminId={adminId as number} schoolId={schoolId as number} />
          <SuperAdminRechargeDialog adminUserId={adminId as number} />
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Price Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Plan Price</p>
              <p className="text-2xl font-bold text-green-700">${subscription.amount}</p>
            </div>
          </div>
        </div>

        {/* End Date Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Ends On</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(subscription.endDate)}</p>
            </div>
          </div>
        </div>

        {/* Auto Renewal Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Auto Renewal</p>
              <p className="text-lg font-semibold text-purple-700">Enabled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
