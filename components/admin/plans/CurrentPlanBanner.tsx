"use client";

import { PlanResponse, PlanFeatures as PlanFeaturesType } from "@/types";
import PlanFeatures from "./PlanFeatures";

interface CurrentPlanBannerProps {
  plan: PlanResponse;
  features: PlanFeaturesType;
}

export default function CurrentPlanBanner({ plan, features }: CurrentPlanBannerProps) {
  const title = plan.title;
  const isMonthly = features.is_monthly === true;
  const cycle = isMonthly ? "Monthly" : "Yearly";
  const amount = isMonthly ? plan.monthly_amount : plan.yearly_amount;

  return (
    <div className="w-full p-4 rounded-md border bg-blue-50 border-blue-200 text-blue-900">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <div className="font-semibold">Current Plan: {title}</div>
          <div>
            {cycle} • ${amount}
          </div>
        </div>
        <a href="#upgrade" className="text-sm font-medium underline">Upgrade</a>
      </div>
      <div className="mt-3">
        <div className="text-xs text-blue-900 font-medium">Included features</div>
        <PlanFeatures features={features} />
      </div>
    </div>
  );
}

