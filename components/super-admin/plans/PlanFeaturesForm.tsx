"use client";

import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import NumericFeatureInput from "./NumericFeatureInput";
import ToggleFeatureInput from "./ToggleFeatureInput";
import { usePlanFeaturesForm } from "./usePlanFeaturesForm";
import { PlanFeaturesProvider } from "./PlanFeaturesContext";
import { PlanFeatures } from "@/types";

interface PlanFeaturesFormProps {
  features: PlanFeatures;
  onFeaturesChange: (features: PlanFeatures) => void;
  title?: string;
}

const DEFAULT_FEATURES: PlanFeatures = {
  sms_limit: "",
  sms_limit_detail: "",
  email_limit: "",
  email_limit_detail: "",
  user_limit: "100",
  user_limit_detail: "",
  preloaded_templates: "",
  preloaded_templates_detail: "",
  custom_templates: "",
  custom_templates_detail: "",
  realtime_alerts: false,
  realtime_alerts_detail: "",
  multi_contact_send: false,
  multi_contact_send_detail: "",
  dual_mode: false,
  dual_mode_detail: "",
  inapp_upgrade_available: false,
  inapp_upgrade_available_detail: "",
  downloadable_history: false,
  downloadable_history_detail: "",
  message_translation: false,
  message_translation_detail: "",
  email_support: false,
  email_support_detail: "",
  priority_email_support: false,
  priority_email_support_detail: "",
  user_analytics: false,
  user_analytics_detail: "",
  push_notifications: false,
  push_notifications_detail: "",
  engagement_reports: false,
  engagement_reports_detail: "",
};

export default function PlanFeaturesForm({
  features = DEFAULT_FEATURES,
  onFeaturesChange,
  title,
}: PlanFeaturesFormProps) {
  const [isOpen, setIsOpen] = useState(true);

  const hookValues = usePlanFeaturesForm({ features, onFeaturesChange });

  return (
    <PlanFeaturesProvider value={{ features, onFeaturesChange, ...hookValues }}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-1 sm:p-4 px-4 py-2 border rounded-lg"
      >
        <div className="flex items-center justify-between">
          <Label className="text-sm sm:text-lg font-semibold">
            {title || "Plan Features"}
          </Label>
          <CollapsibleTrigger className="hover:bg-gray-100 p-2 rounded-full">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-4">
          {hookValues.isLoadingPreseeded && (
            <div className="text-sm text-gray-500 text-center py-2">
              Loading preseeded descriptions...
            </div>
          )}

          {/* Numeric Features */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumericFeatureInput
                field="sms_limit"
                label="SMS Limit"
                value={features.sms_limit}
              />
              <NumericFeatureInput
                field="email_limit"
                label="Email Limit"
                value={features.email_limit}
              />
              <NumericFeatureInput
                field="preloaded_templates"
                label="Preloaded Templates"
                value={features.preloaded_templates}
              />
              <NumericFeatureInput
                field="custom_templates"
                label="Custom Templates"
                value={features.custom_templates || ""}
              />
              {/* <NumericFeatureInput 
                field="user_limit" 
                label="User Limit" 
                value={features.user_limit || ''}
              /> */}
            </div>
          </div>

          {/* Toggle Features */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ToggleFeatureInput
                field="realtime_alerts"
                label="Realtime Alerts"
                checked={features.realtime_alerts || false}
              />
              <ToggleFeatureInput
                field="multi_contact_send"
                label="Multi Contact Send"
                checked={features.multi_contact_send || false}
              />
              <ToggleFeatureInput
                field="dual_mode"
                label="Dual Send (SMS & Email)"
                checked={features.dual_mode || false}
              />
              <ToggleFeatureInput
                field="inapp_upgrade_available"
                label="In-App Upgrade Available"
                checked={features.inapp_upgrade_available || false}
              />
              <ToggleFeatureInput
                field="downloadable_history"
                label="Downloadable History"
                checked={features.downloadable_history || false}
              />
              <ToggleFeatureInput
                field="message_translation"
                label="Message Translation"
                checked={features.message_translation || false}
              />
            </div>
          </div>

          {/* Support Features */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ToggleFeatureInput
                field="email_support"
                label="Email Support"
                checked={features.email_support || false}
              />
              <ToggleFeatureInput
                field="priority_email_support"
                label="Priority Email Support"
                checked={features.priority_email_support || false}
              />
              <ToggleFeatureInput
                field="user_analytics"
                label="User Analytics"
                checked={features.user_analytics || false}
              />
              <ToggleFeatureInput
                field="push_notifications"
                label="Push Notifications"
                checked={features.push_notifications || false}
              />
              <ToggleFeatureInput
                field="engagement_reports"
                label="Engagement Reports"
                checked={features.engagement_reports || false}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </PlanFeaturesProvider>
  );
}
