"use client";

import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { updateTemplateFieldAction } from "@/actions/super-admin/templates";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface CustomTemplateSwitcherProps {
  templateId: number;
  isCustom: boolean;
//   onToggle?: (newValue: boolean) => void;
}

export default function CustomTemplateSwitcher({
  templateId,
  isCustom
}: CustomTemplateSwitcherProps) {
  const [isChecked, setIsChecked] = useState(isCustom);

  useEffect(() => {
    setIsChecked(isCustom);
  }, [isCustom]);

  const handleToggle = async (checked: boolean) => {
    try {
      const result = await updateTemplateFieldAction(templateId, {
        is_custom: checked,
      });
    if(result.success){
      setIsChecked(checked);
      successToast("Template custom status updated successfully");
    }
    
    } catch (error) {
      errorToast("Failed to update template custom status");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isChecked}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-blue-600"
      />
      <p className={`text-sm ${isChecked ? "text-blue-600" : "text-gray-600"}`}>
        {isChecked ? "Custom" : "Non-Custom"}
      </p>
    </div>
  );
}
