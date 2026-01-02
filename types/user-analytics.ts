export interface ColorCategoryCounts {
  Appreciation: number;
  Negative: number;
  Neutral: number;
  Unknown: number;
}

export interface UserAnalytics {
  user_id: number;
  user_name: string;
  email: string;
  role: string;
  profile_img_url: string | null;
  total_messages: number;
  email_count: number;
  sms_count: number;
  color_based_summary: {
    sms: ColorCategoryCounts;
    email: ColorCategoryCounts;
  };
}

export interface UserAnalyticsResponse {
  status: number;
  message: string;
  data: {
    period: string;
    users_summary: UserAnalytics[];
  };
}
