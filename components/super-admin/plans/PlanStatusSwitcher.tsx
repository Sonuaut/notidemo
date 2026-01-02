"use client";

import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { updatePlanStatusAction } from "@/actions/super-admin/plans";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface PlanStatusSwitcherProps {
  planId: number;
  isActive: boolean;
}

export default function PlanStatusSwitcher({ planId, isActive }: PlanStatusSwitcherProps) {
  const [isChecked, setIsChecked] = useState(isActive);

  useEffect(() => {
    setIsChecked(isActive);
  }, [isActive]);

  const handleToggle = async (checked: boolean) => {
    try {
      const result = await updatePlanStatusAction({ 
        plan_id: planId, 
        plan_status: checked 
      });
      
      if (result.success) {
        setIsChecked(checked);
        successToast("Plan status updated successfully");
      } else {
        errorToast(result.error || "Failed to update plan status");
      }
    } catch (error) {
      errorToast("Failed to update plan status");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isChecked}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-green-600"
      />
      <span className={`text-sm font-medium ${isChecked ? "text-green-600" : "text-gray-600"}`}>
        {isChecked ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
