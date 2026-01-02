"use client";

import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { updateTemplateFieldAction } from "@/actions/super-admin/templates";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface StatusSwitcherProps {
  templateId: number;
  isActive: boolean;
  onToggle?: (newValue: boolean) => void;
}

export default function StatusSwitcher({
  templateId,
  isActive,
  onToggle,
}: StatusSwitcherProps) {
  const [isChecked, setIsChecked] = useState(isActive);

  useEffect(() => {
    setIsChecked(isActive);
  }, [isActive]);

  const handleToggle = async (checked: boolean) => {
    try {
      const result = await updateTemplateFieldAction(templateId, {
        is_active: checked,
      });
      if (result.success) {
        setIsChecked(checked);
        onToggle?.(checked);
        successToast("Template status updated successfully");
      } else {
        errorToast(result.error || "Failed to update template");
      }
    } catch (error) {
      errorToast("Failed to update template");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isChecked}
        onCheckedChange={handleToggle}
        //   disabled={isLoading}
        className="data-[state=checked]:bg-green-600"
      />
      <p className={`text-sm ${isChecked ? "text-green-600" : "text-red-600"}`}>
        {isChecked ? "Active" : "Inactive"}
      </p>
    </div>
  );
}
