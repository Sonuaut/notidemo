import { makeApiRequest } from "@/lib/common/api-utils";
import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`;

export interface SubscriptionData {
  School: number[];
  Individual: number[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  userRole: "Individual" | "Organization";
  monthlySubscribers: number;
  yearlySubscribers: number;
}

export interface ActivityData {
  [key: string]: {
    active: number;
    inactive: number;
  };
}

export const fetchAdminDashboardData = async () => {
  try {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/analytics/get-analytics`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let totalEmail = 0;
    let usedEmail = 0;
    let totalSms = 0;
    let usedSms = 0;

    if (response.ok) {
      const analyticsData = await response.json();
      totalEmail = Number(analyticsData.data.total_email_limit ?? 0);
      usedEmail = Number(analyticsData.data.used_email_limit ?? 0);
      totalSms = Number(analyticsData.data.total_sms_limit ?? 0);
      usedSms = Number(analyticsData.data.used_sms_limit ?? 0);
    }

    return {
      smsCount: usedSms,
      emailCount: usedEmail,
      emailLimit: totalEmail,
      smsLimit: totalSms,
      activity: {
        Templates: { active: 20, inactive: 20 },
        Teachers: { active: 20, inactive: 40 },
      },
    };
  } catch (e) {
    console.error("Error fetching dashboard admin data:", e);
    // Fallback to zeros on failure
    return {
      smsCount: 0,
      emailCount: 0,
      emailLimit: 0,
      smsLimit: 0,
      activity: {
        Templates: { active: 0, inactive: 0 },
        Teachers: { active: 0, inactive: 0 },
      },
    };
  }
};
