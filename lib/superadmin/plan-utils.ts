import { PlanFeatures } from "@/types";

export const convertToPayload = (
  planId: number,
  features: PlanFeatures,
  isMonthly: boolean
) => {
  const parseNum = (v?: string) => {
    const n = Number.parseInt((v ?? "0").toString(), 10);
    return Number.isFinite(n) ? n : 0;
  };

  return {
    ...(features.id ? { id: features.id } : {}),
    plan_id: planId,

    // Numeric fields (converted from strings)
    sms_limit: parseNum(features.sms_limit),
    email_limit: parseNum(features.email_limit),
    user_limit: parseNum(features.user_limit),
    preloaded_templates: parseNum(features.preloaded_templates),
    custom_templates: parseNum(features.custom_templates),

    // Details
    sms_limit_detail: features.sms_limit_detail ?? "",
    email_limit_detail: features.email_limit_detail ?? "",
    user_limit_detail: features.user_limit_detail ?? "",
    preloaded_templates_detail: features.preloaded_templates_detail ?? "",
    custom_templates_detail: features.custom_templates_detail ?? "",

    // Boolean toggles
    realtime_alerts: !!features.realtime_alerts,
    realtime_alerts_detail: features.realtime_alerts_detail ?? "",
    multi_contact_send: !!features.multi_contact_send,
    multi_contact_send_detail: features.multi_contact_send_detail ?? "",
    dual_mode: !!features.dual_mode,
    dual_mode_detail: features.dual_mode_detail ?? "",
    inapp_upgrade_available: !!features.inapp_upgrade_available,
    inapp_upgrade_available_detail: features.inapp_upgrade_available_detail ?? "",
    downloadable_history: !!features.downloadable_history,
    downloadable_history_detail: features.downloadable_history_detail ?? "",
    message_translation: !!features.message_translation,
    message_translation_detail: features.message_translation_detail ?? "",
    email_support: !!features.email_support,
    email_support_detail: features.email_support_detail ?? "",
    priority_email_support: !!features.priority_email_support,
    priority_email_support_detail: features.priority_email_support_detail ?? "",
    user_analytics: !!features.user_analytics,
    user_analytics_detail: features.user_analytics_detail ?? "",
    push_notifications: !!features.push_notifications,
    push_notifications_detail: features.push_notifications_detail ?? "",
    engagement_reports: !!features.engagement_reports,
    engagement_reports_detail: features.engagement_reports_detail ?? "",

    is_active: features.is_active ?? true,
    is_monthly: isMonthly,
  };
};



// Convert API feature to PlanFeatures (for form population)
export const convertApiFeatureToPlanFeatures = (apiFeature: any): PlanFeatures => {
  return {
    id: apiFeature.id,
    sms_limit: apiFeature.sms_limit?.toString() || "0",
    sms_limit_detail: apiFeature.sms_limit_detail || "",
    email_limit: apiFeature.email_limit?.toString() || "0",
    email_limit_detail: apiFeature.email_limit_detail || "",
    preloaded_templates: apiFeature.preloaded_templates?.toString() || "0",
    preloaded_templates_detail: apiFeature.preloaded_templates_detail || "",
    custom_templates: apiFeature.custom_templates?.toString() || "0",
    custom_templates_detail: apiFeature.custom_templates_detail || "",
    user_limit: apiFeature.user_limit?.toString() || "0",
    user_limit_detail: apiFeature.user_limit_detail || "",
    realtime_alerts: apiFeature.realtime_alerts || false,
    realtime_alerts_detail: apiFeature.realtime_alerts_detail || "",
    multi_contact_send: apiFeature.multi_contact_send || false,
    multi_contact_send_detail: apiFeature.multi_contact_send_detail || "",
    dual_mode: apiFeature.dual_mode || false,
    dual_mode_detail: apiFeature.dual_mode_detail || "",
    inapp_upgrade_available: apiFeature.inapp_upgrade_available || false,
    inapp_upgrade_available_detail: apiFeature.inapp_upgrade_available_detail || "",
    downloadable_history: apiFeature.downloadable_history || false,
    downloadable_history_detail: apiFeature.downloadable_history_detail || "",
    message_translation: apiFeature.message_translation || false,
    message_translation_detail: apiFeature.message_translation_detail || "",
    email_support: apiFeature.email_support || false,
    email_support_detail: apiFeature.email_support_detail || "",
    priority_email_support: apiFeature.priority_email_support || false,
    priority_email_support_detail: apiFeature.priority_email_support_detail || "",
    user_analytics: apiFeature.user_analytics || false,
    user_analytics_detail: apiFeature.user_analytics_detail || "",
    push_notifications: apiFeature.push_notifications || false,
    push_notifications_detail: apiFeature.push_notifications_detail || "",
    engagement_reports: apiFeature.engagement_reports || false,
    engagement_reports_detail: apiFeature.engagement_reports_detail || "",
    is_active: apiFeature.is_active || true,
  } as PlanFeatures;
}; 