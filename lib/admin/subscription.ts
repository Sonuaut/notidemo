import { makeApiRequest } from "@/lib/common/api-utils";
import { PlanFeatures } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Plan {
  id: number;
  user_id: number;
  start_date: string; // ISO Date string
  monthly_amount: number;
  stripeId_monthly: string;
  stripeId_yearly: string;
  stripe_product_id: string;
  created_at: string; // ISO Date string
  title: string;
  end_date: string; // ISO Date string
  yearly_amount: number;
  is_active: boolean;
  role_type_plan: string;
  updated_at: string; // ISO Date string
  plan_features: PlanFeatures[];
}

export interface Subscription {
  start_date: string; // ISO Date string
  subscription_duration: string;
  id: number;
  end_date: string; // ISO Date string
  created_at: string; // ISO Date string
  user_id: number | null;
  is_yearly: boolean;
  school_id: number;
  subscription_amount: number;
  total_amount: number; // Add this line
  updated_at: string; // ISO Date string
  is_active: boolean;
  plan_id: number;
  is_auto_pay: boolean;
  subscription_status: boolean;
  stripe_session_id: string;
  stripe_subscription_id: string;
  plans: Plan;
}

export interface SubscriptionNormalized {
  subscriptionId: number;
  planId: number;
  total_amount: number;
  planTitle: string;
  isYearly: boolean;
  cycle: "Monthly" | "Yearly";
  amount: number;
  monthlyAmount: number;
  yearlyAmount: number;
  roleTypePlan: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isAutoPay: boolean;
  status: boolean;
  userId: number | null;
  schoolId: number;
  stripeSessionId: string;
  stripeSubscriptionId: string;
}

export function normalizeSubscription(s: Subscription): SubscriptionNormalized {
  const cycle: "Monthly" | "Yearly" = s.is_yearly ? "Yearly" : "Monthly";
  return {
    subscriptionId: s.id,
    planId: s.plan_id,
    total_amount: s.total_amount ?? s.subscription_amount, // Add this line - fallback to subscription_amount if total_amount is missing
    planTitle: s.plans?.title ?? "",
    isYearly: s.is_yearly,
    cycle,
    amount: s.subscription_amount,
    monthlyAmount: s.plans?.monthly_amount ?? 0,
    yearlyAmount: s.plans?.yearly_amount ?? 0,
    roleTypePlan: s.plans?.role_type_plan ?? "",
    startDate: s.start_date,
    endDate: s.end_date,
    createdAt: s.created_at,
    updatedAt: s.updated_at,
    isActive: s.is_active,
    isAutoPay: s.is_auto_pay,
    status: s.subscription_status,
    userId: s.user_id,
    schoolId: s.school_id,
    stripeSessionId: s.stripe_session_id,
    stripeSubscriptionId: s.stripe_subscription_id,
  };
}

export async function fetchActiveSubscription(token?: string): Promise<{
  success: boolean;
  data?: SubscriptionNormalized;
  error?: any;
}> {
  if (!API_URL) return { success: false, error: "API URL not configured" };

  const url = `${API_URL}/api/v1/subscription/?is_for_current_user=true&is_active=true&limit=20&offset=0`;
  const res = await makeApiRequest(url, "GET", undefined, token);
  if (!res.success) return { success: false, error: res.error };
  const payload = res.data.data.result as Subscription[];
  const normalized = Array.isArray(payload)
    ? payload.map(normalizeSubscription)
    : [];
  return { success: true, data: normalized[0] };
}

export async function fetchSubscriptionBySessionIdforSuperAdmin(
  sessionId: string
): Promise<{
  success: boolean;
  data?: SubscriptionNormalized;
  raw?: Subscription;
  error?: any;
}> {
  if (!API_URL) return { success: false, error: "API URL not configured" };

  const url = `${API_URL}/api/v1/subscription/?is_for_current_user=false&session_id=${encodeURIComponent(
    sessionId
  )}&limit=20&offset=0`;
  const res = await makeApiRequest(url, "GET");
  if (!res.success) return { success: false, error: res.error };
  const payload = res.data?.data?.result as Subscription[];
  const first =
    Array.isArray(payload) && payload.length > 0 ? payload[0] : undefined;
  if (!first) return { success: false, error: "Subscription not found" };
  return { success: true, data: normalizeSubscription(first), raw: first };
}

export async function fetchSubscriptionBySessionId(sessionId: string): Promise<{
  success: boolean;
  data?: SubscriptionNormalized;
  raw?: Subscription;
  error?: any;
}> {
  if (!API_URL) return { success: false, error: "API URL not configured" };

  const url = `${API_URL}/api/v1/subscription/?is_for_current_user=true&session_id=${encodeURIComponent(
    sessionId
  )}&limit=20&offset=0`;
  const res = await makeApiRequest(url, "GET");
  if (!res.success) return { success: false, error: res.error };
  const payload = res.data?.data?.result as Subscription[];
  const first =
    Array.isArray(payload) && payload.length > 0 ? payload[0] : undefined;
  if (!first) return { success: false, error: "Subscription not found" };
  return { success: true, data: normalizeSubscription(first), raw: first };
}

export async function fetchRechargeBySessionIdforSuperAdmin(
  sessionId: string
): Promise<{
  success: boolean;
  data?: any;
  error?: any;
}> {
  if (!API_URL) return { success: false, error: "API URL not configured" };
  const url = `${API_URL}/api/v1/recharge/?is_for_current_user=false&session_id=${encodeURIComponent(
    sessionId
  )}&limit=20&offset=0&is_mobile=false`;
  const res = await makeApiRequest(url, "GET");
  if (!res.success) return { success: false, error: res.error };
  const payload = res.data?.data?.result;
  return { success: true, data: Array.isArray(payload) ? payload[0] : payload };
}
// Recharge purchase lookup by session id (same endpoint pattern)
export async function fetchRechargeBySessionId(sessionId: string): Promise<{
  success: boolean;
  data?: any;
  error?: any;
}> {
  if (!API_URL) return { success: false, error: "API URL not configured" };
  const url = `${API_URL}/api/v1/recharge/?is_for_current_user=true&session_id=${encodeURIComponent(
    sessionId
  )}&limit=20&offset=0&is_mobile=false`;
  const res = await makeApiRequest(url, "GET");
  if (!res.success) return { success: false, error: res.error };
  const payload = res.data?.data?.result;
  console.log("payload", payload);
  return { success: true, data: Array.isArray(payload) ? payload[0] : payload };
}
