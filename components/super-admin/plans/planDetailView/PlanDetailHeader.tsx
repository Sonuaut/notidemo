"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { PlanResponse } from "@/types";

interface PlanDetailHeaderProps {
  plan: PlanResponse;
}

export default function PlanDetailHeader({ plan }: PlanDetailHeaderProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">{plan.title}</h2>
          <div className="flex items-center gap-3">
            <Badge variant={plan.is_active ? "default" : "secondary"} className="text-xs">
              {plan.is_active ? 'Active' : 'Inactive'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {plan.role_type_plan}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Plan ID</div>
          <div className="text-sm font-mono text-gray-700">#{plan.id}</div>
        </div>
      </div>
    </div>
  );
} 