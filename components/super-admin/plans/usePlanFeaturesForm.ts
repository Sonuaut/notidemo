import { useState, useEffect } from "react";
import { PlanFeatures } from "@/types";
import { PreseededPlanFeatures } from "@/app/api/preseededData/route";

interface UsePlanFeaturesFormProps {
  features: PlanFeatures;
  onFeaturesChange: (features: PlanFeatures) => void;
}

export const usePlanFeaturesForm = ({ features, onFeaturesChange }: UsePlanFeaturesFormProps) => {
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [preseededData, setPreseededData] = useState<PreseededPlanFeatures | null>(null);
  const [isLoadingPreseeded, setIsLoadingPreseeded] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempDetailValue, setTempDetailValue] = useState<string>('');

  // Fetch preseeded descriptions on component mount
  useEffect(() => {
    const fetchPreseededData = async () => {
      try {
        const response = await fetch('/api/preseededData');
        const result = await response.json();
        
        if (result.success) {
          setPreseededData(result.data);
          
          // Only set preseeded data if current features don't have details yet
          const shouldLoadPreseeded = Object.keys(result.data).every(key => {
            const featureKey = key as keyof PlanFeatures;
            return !features[featureKey] || (features[featureKey] as string).length === 0;
          });
          
          if (shouldLoadPreseeded) {
            onFeaturesChange({
              ...features,
              ...result.data
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch preseeded data:', error);
      } finally {
        setIsLoadingPreseeded(false);
      }
    };

    fetchPreseededData();
  }, []); // Only run once on mount

  const handleTextChange = (field: keyof PlanFeatures, value: string) => {
    // Allow any text input - API will handle conversion to numbers
    onFeaturesChange({
      ...features,
      [field]: value
    });
  };

  const handleToggleChange = (field: keyof PlanFeatures, checked: boolean) => {
    onFeaturesChange({
      ...features,
      [field]: checked
    });
  };

  const handleDetailChange = (field: keyof PlanFeatures, value: string) => {
    const limitedValue = value.slice(0, 35);
    
    onFeaturesChange({
      ...features,
      [field]: limitedValue
    });
  };

  const toggleDetailExpansion = (field: string) => {
    setExpandedDetails(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const hasDetail = (field: string) => {
    const detailField = `${field}_detail` as keyof PlanFeatures;
    return features[detailField] && (features[detailField] as string).length > 0;
  };

  // Start editing a specific field
  const startEditing = (field: string) => {
    const detailField = `${field}_detail` as keyof PlanFeatures;
    const currentValue = (features[detailField] as string) || '';
    setTempDetailValue(currentValue);
    setEditingField(field);
  };

  // Save the edited detail
  const saveDetail = (field: string) => {
    const detailField = `${field}_detail` as keyof PlanFeatures;
    handleDetailChange(detailField, tempDetailValue);
    setEditingField(null);
    setTempDetailValue('');
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingField(null);
    setTempDetailValue('');
  };

  // Reset to preseeded description for a specific field
  const resetToPreseeded = (field: string) => {
    if (!preseededData) return;
    
    const detailField = `${field}_detail` as keyof PlanFeatures;
    const preseededValue = preseededData[detailField as keyof PreseededPlanFeatures];
    
    if (preseededValue) {
      onFeaturesChange({
        ...features,
        [detailField]: preseededValue
      });
    }
  };

  // Handler for temp detail changes
  const handleTempDetailChange = (value: string) => {
    setTempDetailValue(value);
  };

  return {
      expandedDetails,
    preseededData,
    isLoadingPreseeded,
    editingField,
    tempDetailValue,
    handleTextChange,
    handleToggleChange,
    handleDetailChange,
    toggleDetailExpansion,
    hasDetail,
    startEditing,
    saveDetail,
    cancelEditing,
    resetToPreseeded,
    handleTempDetailChange
  };
}; 