
import { getCookie } from "@/actions/cookie";
import { ICookiesKey, Plan } from "@/types";
import { makeApiRequest } from "@/lib/common/api-utils";
import { API_URL } from "../api";

export interface SubscriptionData {
  schools: {
    monthly: number;
    yearly: number;
  };
  individuals: {
    monthly: number;
    yearly: number;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  userRole: 'Individual' | 'Organization';
  monthlySubscribers: number;
  yearlySubscribers: number;
}

export interface ActivityData {
  [key: string]: {
    active: number;
    inactive: number;
  };
}


export const fetchSuperAdminDashboardData = async () => {
  try {
    const profileUrl = `${API_URL}/api/v1/profile/`;
    const profileRes = await makeApiRequest(profileUrl, "GET");
    if (!profileRes.success) {
      throw new Error(String(profileRes.error));
    }
    const d = profileRes.data?.data ?? {};
    const totalEmail = Number(d.total_email_limit ?? 0);
    const usedEmail = Number(d.used_email_limit ?? 0);
    const totalSms = Number(d.total_sms_limit ?? 0);
    const usedSms = Number(d.used_sms_limit ?? 0);
    

    // Fetch analytics data for school and teacher counts
      const analyticsUrl = `${API_URL}/api/v1/analytics/insite`;
    const analyticsRes = await makeApiRequest(analyticsUrl, "GET");
    let activeSchoolCount = 0;
    let inactiveSchoolCount = 0;
    let activeTeachersCount = 0;
    let inactiveTeachersCount = 0;

    if (analyticsRes.success && analyticsRes.data?.data) {
      const analyticsData = analyticsRes.data.data;
      activeSchoolCount = Number(analyticsData.active_school_count ?? 0);
      inactiveSchoolCount = Number(analyticsData.inactive_school_count ?? 0);
      activeTeachersCount = Number(analyticsData.active_teachers_count ?? 0);
      inactiveTeachersCount = Number(analyticsData.inactive_teachers_count ?? 0);
    }

    return {
      smsCount: usedSms,
      emailCount: usedEmail,
      emailLimit: totalEmail,
      smsLimit: totalSms,
      activity: { 
        School: { active: activeSchoolCount, inactive: inactiveSchoolCount }, 
        Teachers: { active: activeTeachersCount, inactive: inactiveTeachersCount } 
      },
    };
  } catch (e) {
    console.error("Error fetching dashboard data:", e);
    // Fallback to zeros on failure
    return {
      smsCount: 0,
      emailCount: 0,
      emailLimit: 0,
      smsLimit: 0,
      activity: { School: { active: 0, inactive: 0 }, Teachers: { active: 0, inactive: 0 } },
    };
  }
};



export const fetchSubscriptionStats = async () => {
  try {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    const url = `${API_URL}/api/v1/admin/subscriptions/stats`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    // console.log("data", data);
    return {
      schools: {
        monthly: Number(data.schools?.monthly ?? 0),
        yearly: Number(data.schools?.yearly ?? 0)
      },
      individuals: {
        monthly: Number(data.individuals?.monthly ?? 0),
        yearly: Number(data.individuals?.yearly ?? 0)
      }
    }
  } catch (error) {
    console.error("Error fetching subscription stats:", error);
    return {
      schools: { monthly: 0, yearly: 0 },
      individuals: { monthly: 0, yearly: 0 }
    }
  }
 
};


