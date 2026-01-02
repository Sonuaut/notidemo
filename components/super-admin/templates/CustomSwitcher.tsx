"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { updateTemplateFieldAction } from "@/actions/super-admin/templates";
import { useToast } from "@/hooks/use-toast";

interface CustomSwitcherProps {
  templateId: number;
  isCustom: boolean;
  onToggle?: (newValue: boolean) => void;
}

export default function CustomSwitcher({ templateId, isCustom, onToggle }: CustomSwitcherProps) {
  const [isChecked, setIsChecked] = useState(isCustom);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    try {
      const result = await updateTemplateFieldAction(templateId, { is_custom: checked });
      
      if (result.success) {
        setIsChecked(checked);
        onToggle?.(checked);
        toast({
          title: "Success",
          description: `Template ${checked ? 'marked as custom' : 'marked as non-custom'}`,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update template",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={handleToggle}
      disabled={isLoading}
      className="data-[state=checked]:bg-green-600"
    />
  );
} 