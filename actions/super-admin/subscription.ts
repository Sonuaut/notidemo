"use server";

import { makeActionApiRequest } from "@/lib/common/api-utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CreateSuperAdminSubscriptionPayload {
  plan_id: number;
  is_yearly: boolean;
  admin_id: number;
}

export async function createSuperAdminSubscriptionAction(payload: CreateSuperAdminSubscriptionPayload) {
  const result = await makeActionApiRequest(
    `${API_URL}/api/v1/super-admin/subscription/`,
    "POST",
    payload
  );
  console.log("result in createSuperAdminSubscriptionAction", result);
  return result;
}
