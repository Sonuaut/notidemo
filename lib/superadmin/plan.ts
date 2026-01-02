import { getCookie } from '@/actions/cookie';
import { ICookiesKey, paginationLimit, PlanResponse, type Plan, type PlansResponse } from '@/types';
import { filter } from 'lodash';
import qs from 'query-string';
import { makeApiRequest } from '@/lib/common/api-utils';

export interface PlanFilterParams {
  role_type_plan?: string;
  is_active?: string;
  offset?: number;
  limit?: number;
}

export interface PlanqueryParam {
  role_type_plan?: string;
  is_active?: boolean;
  offset?: number;
  limit?: number;
}

export async function fetchPlans(
  filters: PlanFilterParams = {}
): Promise<PlansResponse> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    
    if (!token) {
      throw new Error("Authentication token not found");
    }

    // Build query parameters using the query builder
    const queryParams = buildPlanQueryString({
      ...filters
    });
    console.log("queryParams", queryParams);
    
    const response = await fetch(`${API_URL}/api/v1/plans/?is_mobile=false&${queryParams}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch plans: ${response.status}`);
    }

    const data = await response.json();
    // console.log("data", data);
    return {
      plans: data?.data?.result ?? [],
      pagination: {
        total: data?.data?.pagination?.total_plans ?? 0,
        limit: filters.limit as number,
        offset: filters.offset as number,
        total_pages: 0,
        next: null,
        previous: null
      }
    };
  } catch (error) {
    console.error('Error fetching plans:', error);
    return {
      plans: [],
      pagination: {
        total: 0,
        limit: paginationLimit.LIMIT_10,
        offset: filters.offset as number,
        total_pages: 0,
        next: null,
        previous: null
      }
    };
  }
}

export const buildPlanQueryString = (params: PlanFilterParams) => {
  const queryParams: PlanqueryParam = {};
 
  queryParams["role_type_plan"] = params.role_type_plan;
  
  // Extract nested ternary into independent statement
  if (params.is_active) {
    queryParams["is_active"] = params.is_active === "true";
  }
  
  queryParams["limit"] = paginationLimit.LIMIT_10;
  queryParams["offset"] = params.offset;

  return qs.stringify(queryParams, {
    arrayFormat: "comma",
    skipNull: true,
    skipEmptyString: true,
    encode: false,
  });
};

export async function createPlan(planData: {
  title: string;
  monthly_amount: number;
  yearly_amount: number;
  role_type_plan: string;
}) {
  return makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plans`, 'POST', planData);
}

export async function updatePlan(planData: {
  plan_id: number;
  monthly_amount: number;
  yearly_amount: number;
  role_type_plan: string;
  stripeId_monthly: string;
  stripeId_yearly: string;
  plan_status: boolean;
}) {
  return makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plans/`, 'PATCH', planData);
}

export async function deletePlan(planId: number) {
  const result = await makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plans/?plan_id=${planId}`, 'DELETE');
  
  if (result.success) {
    console.log(result.data);
  }
  
  return result;
}

interface PlanLimits {
  email_limit: number;
  sms_limit: number;
  template_limit: number;
  user_limit: number;
}

export async function createPlanFeatures(planId: number, limits: PlanLimits, feature_type: 'monthly' | 'yearly') {
  const payload = {
    plan_id: planId,
    ...limits,
    is_monthly: feature_type === 'monthly',
    feature_type
  };
  
  return makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plan_features/`, 'POST', payload);
}

export async function updatePlanFeatures(planId: number, limits: PlanLimits, feature_type: 'monthly' | 'yearly') {
  const payload = {
    plan_id: planId,
    ...limits,
    is_monthly: feature_type === 'monthly',
    feature_type
  };
  
  return makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plan_features/`, 'PUT', payload);
}

export async function fetchPlanFeatures(planId: number) {
  return makeApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plan_features/${planId}`, 'GET');
}