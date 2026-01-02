"use client";

import type { PlanResponse } from "@/types";
import SuperAdminPlanCard from "./SuperAdminPlanCard";

interface SuperAdminPlansGridProps {
  plans: PlanResponse[];
  is_monthly: boolean;
  adminId: number;  
  schoolId: number;
}

export default function SuperAdminPlansGrid({ 
  plans, 
  is_monthly,
  adminId,
  schoolId
}: SuperAdminPlansGridProps) {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map(plan => (
        <SuperAdminPlanCard 
          key={plan.id} 
          plan={plan} 
          is_monthly={is_monthly}
          adminId={adminId}
          schoolId={schoolId}
        />
      ))}
    </div>
  );
}
