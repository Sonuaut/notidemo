"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type PlanResponse } from "@/types";
import PlanFeatures from "@/components/admin/plans/PlanFeatures";
import BuyButton from "./BuyButton";
import { useState } from "react";

interface SuperAdminPlanCardProps {
  plan: PlanResponse;
  is_monthly: boolean;
  adminId: number;
  schoolId: number;
}

function getCycleFeatures(plan: PlanResponse, is_monthly: boolean) {
  return plan.plan_features.find(f => (is_monthly ? f.is_monthly : !f.is_monthly));
}

export default function SuperAdminPlanCard({ 
  plan, 
  is_monthly,
  adminId,
  schoolId
}: SuperAdminPlanCardProps) {
  const price = is_monthly ? plan.monthly_amount : plan.yearly_amount;
  const features = getCycleFeatures(plan, is_monthly);
  const [numOfSeats, setNumOfSeats] = useState(1);
  

  return (
    <Card className="h-full border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-colors sm:rounded-xl flex flex-col">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-lg font-semibold text-gray-900">{plan.title}</CardTitle>
        <div className="text-sm text-gray-500">Organization</div>
      </CardHeader>
      <CardContent className="space-y-5 flex-1 flex flex-col">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-500">${price}</div>
          <div className="text-xs text-gray-500">per {is_monthly ? "month" : "year"}</div>
        </div>
        {features && (
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[35vh]">
            <div className="text-xs font-medium text-gray-900 uppercase tracking-wide">Included features</div>
            <PlanFeatures features={features} />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="seats" className="text-sm font-medium text-gray-700">
            Number of Users
          </Label>
          <Input
            id="seats"
            type="number"
            min={1}
            value={numOfSeats}
            onChange={(e) => setNumOfSeats(parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>

        <div className="relative mt-auto flex flex-col gap-2">
          <BuyButton
          // school_id={schoolId}
            plan_id={plan.id}
            is_yearly={!is_monthly}
            Admin_user_id={adminId}
            num_of_seat={numOfSeats}
          />
        </div>
      </CardContent>  
    </Card>
  );
}

