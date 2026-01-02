import { NextResponse } from 'next/server';

export interface PreseededPlanFeatures {
  sms_limit_detail: string;
  email_limit_detail: string; 
  user_limit_detail: string;
  preloaded_templates_detail: string;
  custom_templates_detail: string;
  realtime_alerts_detail: string;
  multi_contact_send_detail: string;
  dual_send_sms_email_detail: string;
  inapp_upgrade_available_detail: string;
  downloadable_history_detail: string;
  message_translation_detail: string;
  email_support_detail: string;
  priority_email_support_detail: string;
  user_analytics_detail: string;
  push_notifications_detail: string;
  engagement_reports_detail: string;
}

const PRESEEDED_DESCRIPTIONS: PreseededPlanFeatures = {
  // Numeric Features
  sms_limit_detail: "Monthly SMS messaging allowance",
  email_limit_detail: "Monthly email sending capacity", 
  preloaded_templates_detail: "Ready-to-use message templates",
  custom_templates_detail: "Create your own custom templates",
  user_limit_detail: "Number of users allowed",
  
  // Toggle Features - Core Features
  realtime_alerts_detail: "Instant notifications & updates",
  multi_contact_send_detail: "Send to multiple contacts at once",
  dual_send_sms_email_detail: "Send both SMS and email together",
  inapp_upgrade_available_detail: "Upgrade plan within the app",
  downloadable_history_detail: "Export message history & reports",
  message_translation_detail: "Auto-translate messages",
  
  // Support & Analytics Features
  email_support_detail: "Get help via email support",
  priority_email_support_detail: "Priority support with faster response",
  user_analytics_detail: "Detailed usage analytics & insights",
  push_notifications_detail: "Mobile app push notifications",
  engagement_reports_detail: "Track message engagement metrics"
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: PRESEEDED_DESCRIPTIONS
    });
  } catch (error) {
    console.error('Error fetching preseeded data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch preseeded data' },
      { status: 500 }
    );
  }
}

export async function POST() {
  // In case you want to update preseeded data in the future
  return NextResponse.json({
    success: false,
    error: 'POST method not implemented yet'
  }, { status: 501 });
} 