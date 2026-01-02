"use client";

import { createContext, useContext, ReactNode } from "react";
import { PlanFeatures } from "@/types";
import { PreseededPlanFeatures } from "@/app/api/preseededData/route";

interface PlanFeaturesContextType {
  features: PlanFeatures;
  preseededData: PreseededPlanFeatures | null;
  isLoadingPreseeded: boolean;
  editingField: string | null;
  tempDetailValue: string;
  handleTextChange: (field: keyof PlanFeatures, value: string) => void;
  handleToggleChange: (field: keyof PlanFeatures, checked: boolean) => void;
  startEditing: (field: string) => void;
  saveDetail: (field: string) => void;
  cancelEditing: () => void;
  resetToPreseeded: (field: string) => void;
  handleTempDetailChange: (value: string) => void;
  onFeaturesChange: (features: PlanFeatures) => void;
}

const PlanFeaturesContext = createContext<PlanFeaturesContextType | undefined>(undefined);

interface PlanFeaturesProviderProps {
  children: ReactNode;
  value: PlanFeaturesContextType;
}

export const PlanFeaturesProvider = ({ children, value }: PlanFeaturesProviderProps) => {
  return (
    <PlanFeaturesContext.Provider value={value}>
      {children}
    </PlanFeaturesContext.Provider>
  );
};

export const usePlanFeaturesContext = () => {
  const context = useContext(PlanFeaturesContext);
  if (context === undefined) {
    throw new Error('usePlanFeaturesContext must be used within a PlanFeaturesProvider');
  }
  return context;
}; 