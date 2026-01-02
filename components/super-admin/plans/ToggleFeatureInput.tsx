"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Edit, Pencil } from "lucide-react";
import { PlanFeatures } from "@/types";
import { PreseededPlanFeatures } from "@/app/api/preseededData/route";
import { usePlanFeaturesContext } from "./PlanFeaturesContext";
import CommonButton from "@/components/common/Button";
import React from "react";

interface ToggleFeatureInputProps {
  field: string;
  label: string;
  checked: boolean;
}

export default function ToggleFeatureInput({
  field,
  label,
  checked
}: ToggleFeatureInputProps) {
  const {
    features,
    preseededData,
    isLoadingPreseeded,
    editingField,
    tempDetailValue,
    handleToggleChange,
    startEditing,
    cancelEditing,
    handleTempDetailChange,
    onFeaturesChange
  } = usePlanFeaturesContext();

  const detailField = `${field}_detail` as keyof PlanFeatures;
  const currentValue = (features[detailField] as string) || '';
  const preseededValue = preseededData?.[detailField as keyof PreseededPlanFeatures] || '';
  const isEditing = editingField === field;
  const isFeatureEnabled = checked === true;

  // Auto-load preseeded data when user toggles ON for the first time
  React.useEffect(() => {
    if (isFeatureEnabled && !currentValue && preseededValue && !isLoadingPreseeded) {
      // Automatically set preseeded value when user toggles ON
      onFeaturesChange({
        ...features,
        [detailField]: preseededValue
      });
    } else if (!isFeatureEnabled && currentValue) {
      // Clear detail value when feature is disabled (toggle OFF)
      onFeaturesChange({
        ...features,
        [detailField]: ''
      });
    }
  }, [isFeatureEnabled, currentValue, preseededValue, isLoadingPreseeded, features, detailField, onFeaturesChange]);

  const displayValue = isFeatureEnabled ? currentValue : '';

 

  const handleStartEditing = () => {
    // Start editing with current value (which is preseeded initially)
    handleTempDetailChange(preseededValue);
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
    <div className={`space-y-2 ${isEditing ? '' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor={field} className="text-sm font-medium">{label}</Label>
          <div className="flex items-center space-x-1">
            {!isEditing && isFeatureEnabled  && (
              <CommonButton
                type="button"
                variant="outline"
                size="icon"
                onClick={handleStartEditing}
                className="h-5 w-5 md:h-5 md:w-5 p-1 bg-white text-[#8D8EF5]"
                title="Edit description"
              >
                <Pencil className="h-2 w-2 md:h-3 md:w-3" />
              </CommonButton>
            )}
          </div>
        </div>
        <Switch
          id={field}
          checked={checked}
          onCheckedChange={(checked) => handleToggleChange(field as keyof PlanFeatures, checked)}
        />
      </div>
      
      {isEditing && isFeatureEnabled ? (
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={tempDetailValue}
            onChange={(e) => handleTempDetailChange(e.target.value.slice(0, 35))}
            placeholder="35 characters max"
            className="h-6 px-1  bg-blue-50 border-blue-200 flex-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 text-[5px] text-gray-600 md:text-xs "
            maxLength={35}
            autoFocus
          />
          <CommonButton
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveCurrentValue}
            className="h-5 w-5 p-0.5 font-semibold text-green-600 hover:text-green-700"
            title="Save current value"
          >
            ✓
          </CommonButton>
          <CommonButton
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetToPreseeded}
            className="h-5 w-5 p-0.5 font-semibold text-red-600 hover:text-red-700"
            title="Reset to preseeded value"
          >
            ✕
          </CommonButton>
        </div>
      ) : isFeatureEnabled && displayValue ? (
        <div className=" flex items-center">
          <span className="text-xs text-gray-600">
            {preseededValue}
          </span>
        </div>
      ) : null}
    </div>
  );
} 