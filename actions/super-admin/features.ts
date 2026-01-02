"use server";

import { revalidatePath } from "next/cache";
import { ICookiesKey, PlanFeatures } from "@/types";
import { convertToPayload } from "@/lib/superadmin/plan-utils";
import { getCookie } from "@/actions/cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to make API requests
async function makeApiRequest(
  url: string,
  method: string,
  payload: any,
  token: string
): Promise<{ success: boolean; error?: any }> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log("error :", error);
    return { success: false, error };
  }

  return { success: true };
}

// Helper function to process features
async function processFeatures(
  planId: number,
  monthlyFeatures: PlanFeatures,
  yearlyFeatures: PlanFeatures,
  method: string,
  url: string,
  operationType: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    
    if (!token) {
      return { success: false, error: "Authentication token not found" };
    }

    // Convert to API payloads (ensure numeric fields are numbers)
    const monthlyPayload = convertToPayload(planId, monthlyFeatures, true);
    const yearlyPayload = convertToPayload(planId, yearlyFeatures, false);

    const monthlyResult = await makeApiRequest(
      url,
      method,
      monthlyPayload,
      token
    );

    
    if (!monthlyResult.success) {
      return { 
        success: false, 
        error: monthlyResult.error ?? `Failed to ${operationType} monthly features` 
      };
    }

    
    // console.log("yearlyPayload in features :", yearlyPayload);
    const yearlyResult = await makeApiRequest(
      url,
      method,
      yearlyPayload,
      token
    );
  
    if (!yearlyResult.success) {
      return { 
        success: false, 
        error: yearlyResult.error ?? `Failed to ${operationType} yearly features` 
      };
    }

    revalidatePath("/super-admin/plans");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { 
      success: false, 
      error: `An error occurred while ${operationType}ing plan features` 
    };
  }
}

export async function createPlanFeaturesAction(
  planId: number, 
  monthlyFeatures: PlanFeatures, 
  yearlyFeatures: PlanFeatures
) {
  
  return await processFeatures(
    planId,
    monthlyFeatures,
    yearlyFeatures,
    "POST",
    `${API_URL}/api/v1/plan_features/`,
    "create"
  );
}

export async function updatePlanFeaturesAction(
  planId: number, 
  monthlyFeatures: PlanFeatures, 
  yearlyFeatures: PlanFeatures
) {
  // console.log("monthlyFeatures in features :", monthlyFeatures);
  // console.log("yearlyFeatures in features :", yearlyFeatures);
  return await processFeatures(
    planId,
    monthlyFeatures,
    yearlyFeatures,
    "PATCH",
    `${API_URL}/api/v1/plan_features/`,
    "update"
  );
} 