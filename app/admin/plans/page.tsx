import { AdminLayout } from "@/components/layout/admin-layout";
import { Label } from "@/components/common/Label";
import { fetchPlans } from "@/lib/superadmin/plan";
import { paginationLimit } from "@/types";
import BillingCycleToggle from "@/components/admin/plans/PlansSelectionDialog";
import SubscriptionDetails from "@/components/admin/plans/SubscriptionDetails";
import { fetchActiveSubscription, SubscriptionNormalized } from "@/lib/admin/subscription";
import CurrentPlanFeatures from "@/components/admin/plans/CurrentPlanFeatures";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminPlansPage({ searchParams }: Props) {
  const params = await searchParams;
  let is_monthly;
  let shouldUpdatePlan = params.updateplan === "true" ? true : false;

  if (params.is_monthly === "true") {
    is_monthly = true;
  } else if (params.is_monthly === "false") {
    is_monthly = false;
  } else {
    is_monthly = true;
  }

  const filters = {
    role_type_plan: "Organization",
    is_active: "true",
    limit: paginationLimit.LIMIT_50,
    offset: 0,
  };

  const planData = await fetchPlans(filters);
  const subsRes = await fetchActiveSubscription();
  let activeSubs: SubscriptionNormalized | null = null;
  if(subsRes.success && !shouldUpdatePlan){
    activeSubs = subsRes.data ?? null;

  }

  const FoundCurrentPlan = planData.plans.find((plan) => plan.id === activeSubs?.planId);
  const currentPlanFeatures = FoundCurrentPlan?.plan_features.find((feature) => feature.is_monthly === !activeSubs?.isYearly);

  return (
    <AdminLayout type="admin" className="md:p-0">
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-6">
        <div className="flex items-center space-x-3">
          <Label className="text-2xl font-bold text-gray-900">Plan</Label>
          <span className="px-2 py-1 rounded-xl bg-indigo-100 text-indigo-700 text-xs font-semibold">Admin</span>
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
     <div className="px-6 py-6 space-y-6">
      {activeSubs ?
      <>
      <SubscriptionDetails allPlansData={planData.plans} sub={activeSubs!}  toggle_isMonthly={is_monthly}/>
      <CurrentPlanFeatures features={currentPlanFeatures} title="Current Plan Features" />
      </>:
      <div className="px-6 py-6 space-y-6"> 
      <BillingCycleToggle dialogMode={shouldUpdatePlan} />
    </div>
      }
     </div>
          
     
    </AdminLayout>
  );
}
