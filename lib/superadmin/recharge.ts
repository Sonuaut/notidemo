import { getCookie } from '@/actions/cookie';
import { ICookiesKey, paginationLimit, RechargesResponse, CreateRechargePayload, UpdateRechargePayload } from '@/types';
import { makeApiRequest } from '@/lib/common/api-utils';

interface FetchRechargesParams {
  offset?: number;
  limit?: number;
  name?: string;
  type?: RechargeType;
  is_active?: boolean;
}

export enum RechargeType {
  EMAIL = "Email",
  SMS = "SMS",
  EMAIL_AND_SMS = "EmailAndSMS"
}

export interface RechargePlan {
  id: number;
  user_id: number;
  title: string;
  type: "Email" | "SMS" | "EmailAndSMS";
  email_limit: number;
  sms_limit: number;
  email_detail: string;
  sms_detail: string;
  recharge_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchRecharges(params: FetchRechargesParams = {}): Promise<RechargesResponse> {
  try {
    const { 
      offset = 0, 
      limit = paginationLimit.LIMIT_10,
      name,
      type,
      is_active
    } = params;
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    
    if (!token) {
      throw new Error("Authentication token not found");
    }
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
    
    if (name) {
      queryParams.append('name', name);
    }
    
    if (type) {
      queryParams.append('type', type);
    }
    
    if (is_active !== undefined) {
      queryParams.append('is_active', is_active.toString());
    }
    
    const response = await fetch(`${API_URL}/api/v1/recharge_plans/?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recharge plans: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      recharges: data?.data?.result ?? [],
      pagination: {
        total: data?.data?.pagination?.total_recharge_plans ?? 0,
        limit: limit,
        offset: offset,
        total_pages: 0,
        next: null,
        previous: null
      }
    };
  } catch (error) {
    console.error('Error fetching recharge plans:', error);
    return {
      recharges: [],
      pagination: {
        total: 0,
        limit: paginationLimit.LIMIT_20,
        offset: params.offset ?? 0,
        total_pages: 0,
        next: null,
        previous: null
      }
    };
  }
}

export async function createRecharge(rechargeData: CreateRechargePayload) {
  console.log("rechargeData", rechargeData);
  return makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/recharge_plans/`, 'POST', rechargeData);
}

export async function updateRecharge(rechargeData: UpdateRechargePayload) {
  console.log("rechargeData patch", rechargeData);
  return makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/recharge_plans/`, 'PATCH', rechargeData);
}

export async function deleteRecharge(rechargeId: number) {
  return makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/recharge_plans/?recharge_id=${rechargeId}`, 'DELETE');
} 