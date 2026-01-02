"use server";

import { revalidatePath } from "next/cache";
import { RoleTypePlan } from "@/types";
import { createPlanFeaturesAction, updatePlanFeaturesAction } from "./features";
import { makeActionApiRequest } from "@/lib/common/api-utils";
import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CreatePlanPayload {
  title: string;
  monthly_amount: number;
  yearly_amount: number;
  role_type_plan: RoleTypePlan;
}

export async function createPlanAction(data: CreatePlanPayload) {
  const result = await makeActionApiRequest(`${API_URL}/api/v1/plans/`, "POST", data);
  return result;
}



export async function deletePlanAction(planId: number) {
  // const result = await makeActionApiRequest(
  //   `${API_URL}/api/v1/plans/?plan_id=${planId}`, 
  //   "DELETE"
  // );
  const token = await getCookie(ICookiesKey.AUTHTOKEN);
  const result = await fetch(`${API_URL}/api/v1/plans/?plan_id=${planId}`, {
      method: "DELETE",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await result.json();
    console.log("data :", data);
  if (result.ok) {
    revalidatePath("/super-admin/plans");
  }
  
  return {
    success: result.ok,
    error: data.message || `HTTP error! status: ${result.status}`
  };
}

export interface UpdatePlanStatusData {
  plan_id: number;
  plan_status: boolean;
}

export const updatePlanStatusAction = async (data: UpdatePlanStatusData) => {
  try {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    
    if (!token) {
      return { success: false, error: "Authorization token not found" };
    }

    const response = await fetch("https://api.mynotifly.com/api/v1/plans/", {
      method: "PATCH",
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        plan_id: data.plan_id,
        plan_status: data.plan_status
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating plan status:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update plan status" 
    };
  }
};

// Re-export features functions for backward compatibility
export { createPlanFeaturesAction, updatePlanFeaturesAction };

