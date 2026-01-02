"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlanFeatures } from "@/types";
import PlanFeaturesForm from "./PlanFeaturesForm";

interface PlanPriceAndFeaturesProps {
  type: 'monthly' | 'yearly';
  price: string;
  features: PlanFeatures;
  onPriceChange: (value: string) => void;
  onFeaturesChange: (features: PlanFeatures) => void;
  isUpdateMode?: boolean;
}

export default function PlanPriceAndFeatures({
  type,
  price,
  features,
  onPriceChange,
  onFeaturesChange,
  isUpdateMode = false,
}: PlanPriceAndFeaturesProps) {
  const title = type === 'monthly' ? 'Monthly' : 'Yearly';

  return (
    <div className="space-y-4 sm:space-y-4 pt-4 sm:pt-0">
      <div className="space-y-2">
        <Label htmlFor={`${type}Price`}>{title} Price ($)</Label>
        <Input
          id={`${type}Price`}
          type="text"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="0.00"
          className="h-9"
          required={!isUpdateMode}
          disabled={isUpdateMode}
        />
      </div>
      <PlanFeaturesForm 
        title={`${title} Plan Features`}
        features={features}
        onFeaturesChange={onFeaturesChange}
      />
    </div>
  );
} 