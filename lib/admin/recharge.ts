import { getCookie } from '@/actions/cookie';
import { ICookiesKey, paginationLimit } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface RechargePlanInfo {
  id: number;
  title: string;
  type: 'SMS' | 'Email' | 'EmailAndSMS';
  email_limit: number;
  sms_limit: number;
  recharge_price: number;
}

export interface RechargeHistoryItem {
  id: number;
  stripe_session_id: string;
  recharge_status: boolean;
  created_at: string;
  updated_at: string;
  recharge_amount: number;
  recharge_plans: RechargePlanInfo;
}

export async function fetchRechargeHistory(offset = 0, limit = paginationLimit.LIMIT_20): Promise<{
  items: RechargeHistoryItem[];
  total: number;
}> {
  try {
    if (!API_URL) throw new Error('API URL not configured');
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    if (!token) throw new Error('Authentication token not found');

    const url = `${API_URL}/api/v1/recharge/?is_for_current_user=true&limit=${limit}&offset=${offset}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1',
      },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Failed with ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data?.data?.result) ? data.data.result : [];
    const total = Number(data?.data?.pagination?.total_recharge ?? 0);
    return { items: list, total };
  } catch (e) {
    return { items: [], total: 0 };
  }
}


