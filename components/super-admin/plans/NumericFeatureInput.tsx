"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CommonButton from "@/components/common/Button";
import { Pencil } from "lucide-react";
import { PlanFeatures } from "@/types"; 
import { PreseededPlanFeatures } from "@/app/api/preseededData/route";
import { usePlanFeaturesContext } from "./PlanFeaturesContext";
import React from "react";

interface NumericFeatureInputProps {
  field: string;
  label: string;
  value: string;
}

export default function NumericFeatureInput({
  field,
  label,
  value
}: NumericFeatureInputProps) {
  const {
    features,
    preseededData,
    editingField,
    tempDetailValue,
    handleTextChange,
    startEditing,
    cancelEditing,
    handleTempDetailChange,
    onFeaturesChange
  } = usePlanFeaturesContext();

  const detailField = `${field}_detail` as keyof PlanFeatures;
  const currentValue = (features[detailField] as string) || '';
  const preseededValue = preseededData?.[detailField as keyof PreseededPlanFeatures] || '';
  const isEditing = editingField === field;
  const isFeatureEnabled = value && value.trim() !== '' && value !== '0';
  

  // Auto-load preseeded data when user types something for the first time
  React.useEffect(() => {
    if (isFeatureEnabled && !currentValue && preseededValue) {
      // Automatically set preseeded value when user enters input
      onFeaturesChange({
        ...features,
        [detailField]: preseededValue
      });
    } else if (!isFeatureEnabled && currentValue) {
      // Clear detail value when feature is disabled
      onFeaturesChange({
        ...features,
        [detailField]: ''
      });
    }
  }, [isFeatureEnabled, currentValue, preseededValue, features, detailField, onFeaturesChange]);

  const displayValue = isFeatureEnabled ? currentValue : '';

  const hasDetail = () => {
    return displayValue && displayValue.length > 0;
  };

  const handleStartEditing = () => {
    // Start editing with current value (not preseeded value)
    handleTempDetailChange(currentValue);
    startEditing(field);
  };

  const handleSaveCurrentValue = () => {
    // Save the current temp value to features
    onFeaturesChange({
      ...features,
      [detailField]: tempDetailValue
    });
    cancelEditing();
  };

  const handleResetToPreseeded = () => {
    // Reset to preseeded value
    onFeaturesChange({
      ...features,
      [detailField]: preseededValue
    });
    cancelEditing();
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium" htmlFor={field}>{label}</Label>
        <div className="flex items-center space-x-1">
          {!isEditing && isFeatureEnabled && hasDetail() && (
            <CommonButton
              type="button"
              variant="outline"
              size="sm"
              onClick={handleStartEditing}
              className="h-6 w-6 p-0 bg-white text-[#8D8EF5]"
              title="Edit description"
            >
              <Pencil className="h-3 w-3" />
            </CommonButton>
          )}
        </div>
      </div>
      
      <Input
        id={field}
        type="text"
        value={value}
        onChange={(e) => handleTextChange(field as keyof PlanFeatures, e.target.value)}
        placeholder="e.g. 100"
        className="h-8 text-xs bg-blue-50 border-blue-200 flex-1"
      />
      
      <div className="">
        {isEditing && isFeatureEnabled ? (
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={tempDetailValue}
              onChange={(e) => handleTempDetailChange(e.target.value.slice(0, 35))}
              placeholder="35 characters max"
              className="h-7 text-xs bg-blue-50 border-blue-200 flex-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 text-[5px] text-gray-600 md:text-xs "  
              maxLength={35}
              autoFocus
            />
            <CommonButton
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSaveCurrentValue}
              className="h-7 w-7 p-0 text-green-600 hover:text-green-700"
              title="Save current value"
            >
              ✓
            </CommonButton>
            <CommonButton
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetToPreseeded}
              className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
              title="Reset to preseeded value"
            >
              ✕
            </CommonButton>
          </div>
        ) : isFeatureEnabled  ? (
          <div className="">
            <span className="text-xs text-gray-600 ">
              {currentValue}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
} 