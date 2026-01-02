"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  Mail,
  MessageSquare,
  Zap,
  Shield,
  BarChart3,
  FileText,
  CheckCircle,
  XCircle,
  Bell,
  Download,
  Languages,
  Star,
  CreditCard,
  Database,
  Settings,
} from "lucide-react";
import { PlanResponse, PlanFeatures } from "@/types";

interface PlanFeaturesTabsProps {
  plan: PlanResponse;
}

const getFeatureIcon = (feature: string) => {
  const iconMap: { [key: string]: any } = {
    // Limits
    sms_limit: MessageSquare,
    email_limit: Mail,
    preloaded_templates: FileText,
    custom_templates: FileText,
    user_limit: Users,

    // Core Features
    realtime_alerts: Bell,
    multi_contact_send: Users,
    dual_send_sms_email: Mail,
    inapp_upgrade_available: CreditCard,
    downloadable_history: Download,
    message_translation: Languages,

    // Support
    email_support: Mail,
    priority_email_support: Shield,

    // Analytics
    user_analytics: BarChart3,
    push_notifications: Bell,
    engagement_reports: BarChart3,
  };
  return iconMap[feature] || Settings;
};

const formatFeatureName = (key: string) => {
  const nameMap: { [key: string]: string } = {
    sms_limit: "SMS Messages",
    email_limit: "Email Messages",
    preloaded_templates: "Preloaded Templates",
    custom_templates: "Custom Templates",
    user_limit: "User Limit",
    realtime_alerts: "Real-time Alerts",
    multi_contact_send: "Multi-contact Sending",
    dual_send_sms_email: "Dual Send (SMS + Email)",
    inapp_upgrade_available: "In-app Upgrades",
    downloadable_history: "Downloadable History",
    message_translation: "Message Translation",
    email_support: "Email Support",
    priority_email_support: "Priority Email Support",
    user_analytics: "User Analytics",
    push_notifications: "Push Notifications",
    engagement_reports: "Engagement Reports",
  };

  return (
    nameMap[key] ||
    key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
};

export default function PlanFeaturesTabs({ plan }: PlanFeaturesTabsProps) {
  const isLimitFeature = (key: string) => {
    const limitFeatures = [
      "sms_limit",
      "email_limit",
      "preloaded_templates",
      "custom_templates",
      "user_limit",
    ];
    return limitFeatures.includes(key);
  };

  const renderFeatures = (
    features: PlanFeatures | undefined,
    title: string
  ) => {
    if (!features) {
      return (
        <div className="text-center py-4 text-gray-500">
          <p className="text-sm">No features configured</p>
        </div>
      );
    }

    // Define which fields to show
    const limitFields = [
      "sms_limit",
      "email_limit",
      "preloaded_templates",
      "custom_templates",
      "user_limit",
    ];
    const featureFields = [
      "realtime_alerts",
      "multi_contact_send",
      "dual_send_sms_email",
      "inapp_upgrade_available",
      "downloadable_history",
      "message_translation",
      "email_support",
      "priority_email_support",
      "user_analytics",
      "push_notifications",
      "engagement_reports",
    ];

    const featureEntries = Object.entries(features).filter(([key, value]) => {
      // Only show fields that are in our defined lists
      const isLimitField = limitFields.includes(key);
      const isFeatureField = featureFields.includes(key);

      return (
        (isLimitField || isFeatureField) &&
        value !== null &&
        value !== undefined &&
        value !== false
      );
    });

    if (featureEntries.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          <p className="text-sm">No features configured</p>
        </div>
      );
    }

    // Separate numeric and boolean features
    const numericFeatures = featureEntries.filter(
      ([key, value]) =>
        typeof value === "number" && value > 0 && limitFields.includes(key)
    );
    const booleanFeatures = featureEntries.filter(
      ([key, value]) =>
        typeof value === "boolean" && featureFields.includes(key)
    );

    return (
      <div className="space-y-4">
        {/* Numeric Features Section */}
        {numericFeatures.length > 0 && (
          <div className=" flex flex-wrap gap-2">
            {numericFeatures.map(([key, value]) => {
              const IconComponent = getFeatureIcon(key);
              const featureName = formatFeatureName(key);
              const isLimit = isLimitFeature(key);

              return (
                <div
                  key={key}
                  className="flex items-center justify-between px-2 py-1 border border-gray-200 rounded-full w-fit bg-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-gray-50 rounded">
                      <IconComponent className="h-3 w-3 text-gray-600" />
                    </div>
                    <span className="text-xs text-gray-700 font-medium">
                      {featureName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    {isLimit ? (
                      <Badge
                        variant="default"
                        className="text-xs bg-blue-100 text-blue-800 border-blue-200 px-2 py-0.5"
                      >
                        {value.toLocaleString()}
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {value.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
            {booleanFeatures.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {booleanFeatures.map(([key, value]) => {
                  const IconComponent = getFeatureIcon(key);
                  const featureName = formatFeatureName(key);

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between px-2 py-1 border border-gray-200 rounded-full w-fit bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-50 rounded">
                          <IconComponent className="h-3 w-3 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-700 font-medium">
                          {featureName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {value ? (
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-red-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getMonthlyFeatures = () =>
    plan.plan_features?.find((feature) => feature?.is_monthly);
  const getYearlyFeatures = () =>
    plan.plan_features?.find((feature) => !feature?.is_monthly);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Features</h3>
      <Tabs defaultValue="monthly" className="w-full ">
        <TabsList className="grid w-full grid-cols-2 gap-4 rounded-lg">
          <TabsTrigger
            value="monthly"
            className="flex items-center gap-2 rounded-lg"
          >
            <Calendar className="h-4 w-4" />
            Monthly Plan
          </TabsTrigger>
          <TabsTrigger
            value="yearly"
            className="flex items-center gap-2 rounded-lg"
          >
            <Clock className="h-4 w-4" />
            Yearly Plan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-4">
          {renderFeatures(getMonthlyFeatures(), "Monthly Plan Features")}
        </TabsContent>

        <TabsContent value="yearly" className="mt-4">
          {renderFeatures(getYearlyFeatures(), "Yearly Plan Features")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
