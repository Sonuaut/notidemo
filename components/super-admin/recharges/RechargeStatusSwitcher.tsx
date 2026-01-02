"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { updateRechargeAction } from "@/actions/super-admin/recharge";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { RechargeResponse } from "@/types";

interface RechargeStatusSwitcherProps {
  recharge: RechargeResponse;
  onToggle?: (newValue: boolean) => void;
}

export default function RechargeStatusSwitcher({ recharge, onToggle }: RechargeStatusSwitcherProps) {
  const [isChecked, setIsChecked] = useState(recharge.is_active);

  const handleToggle = async (checked: boolean) => {
    try {
      const payload = {
        id: recharge.id,
        title: recharge.title,
        type: recharge.type,
        recharge_price: recharge.recharge_price,
        email_limit: recharge.email_limit,
        sms_limit: recharge.sms_limit,
        email_detail: recharge.email_detail,
        sms_detail: recharge.sms_detail,
        is_active: checked
      };
      console.log(payload ,'paylad');
      const result = await updateRechargeAction(payload);
      if (result.success) {
        setIsChecked(checked);
        onToggle?.(checked);
        successToast("Recharge status updated successfully");
      } else {
        errorToast(result.error || "Failed to update recharge status");
      }
    } catch (error) {
      errorToast("Failed to update recharge status");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isChecked}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-green-600"
      />
      <p className={`text-sm ${isChecked ? "text-green-600" : "text-red-600"}`}>
        {isChecked ? "Active" : "Inactive"}
      </p>
    </div>
  );
} 