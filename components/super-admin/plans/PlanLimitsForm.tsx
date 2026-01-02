"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PlanLimits, PlanLimitType } from "@/types";

interface PlanLimitsFormProps {
  type: PlanLimitType;
  limits: PlanLimits;
  onLimitChange: (type: PlanLimitType, field: keyof PlanLimits, value: string) => void;
}

export default function PlanLimitsForm({ type, limits, onLimitChange }: PlanLimitsFormProps) {
  const [isOpen, setIsOpen] = useState(type === PlanLimitType.MONTHLY);
  

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 border rounded-lg p-4"
    >
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">
          {type === PlanLimitType.MONTHLY ? 'Monthly Plan Limits' : 'Yearly Plan Limits'}
        </Label>
        <CollapsibleTrigger className="hover:bg-gray-100 p-2 rounded-full">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Email Limit</Label>
            <Input
              type="text"
              value={limits.email_limit}
              onChange={(e) => onLimitChange(type, 'email_limit', e.target.value)}
              placeholder="Enter email limit"
            />
          </div>
          <div className="space-y-2">
            <Label>SMS Limit</Label>
            <Input
              type="text"
              value={limits.sms_limit}
              onChange={(e) => onLimitChange(type, 'sms_limit', e.target.value)}
              placeholder="Enter SMS limit"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Template Limit</Label>
            <Input
              type="text"
              value={limits.template_limit}
              onChange={(e) => onLimitChange(type, 'template_limit', e.target.value)}
              placeholder="Enter template limit"
            />
          </div>
          <div className="space-y-2">
            <Label>User Limit</Label>
            <Input
              type="text"
              value={limits.user_limit}
              onChange={(e) => onLimitChange(type, 'user_limit', e.target.value)}
              placeholder="Enter user limit"
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
} 