"use client";

import type { PlanResponse } from "@/types";
import PlanCard from "./PlanCard";

interface PlansGridProps {
  plans: PlanResponse[];
  is_monthly: boolean;
  currentPlanId?: number;
  currentIsYearly?: boolean;
  onChosen?: () => void;
}

export default function PlansGrid({ plans, is_monthly,  currentPlanId, currentIsYearly, onChosen }: PlansGridProps) {
  return (

      <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} is_monthly={is_monthly} currentPlanId={currentPlanId} currentIsYearly={currentIsYearly} onChosen={onChosen} />
        ))}
      </div>
  );
}
