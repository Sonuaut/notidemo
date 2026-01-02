"use server";

import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CreateRechargeSubscriptionPayload {
  recharge_plan_id: number;
  is_mobile: boolean;
  teacher_id?: number;
}

export async function createRechargeSubscriptionAction(payload: CreateRechargeSubscriptionPayload) {
  if (!API_URL) {
    return { success: false, error: "API URL not configured" };
  }

  try {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    if (!token) {
      return { success: false, error: "Authentication token not found" };
    }

    const body = new URLSearchParams();
    body.set("recharge_plan_id", String(payload.recharge_plan_id));
    body.set("is_mobile", String(payload.is_mobile));
    
    // Add teacher_id only if provided (for admin portal)
    if (payload.teacher_id) {
      body.set("teacher_id", String(payload.teacher_id));
    }
console.log("body", body.toString());
    const res = await fetch(`${API_URL}/api/v1/recharge/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "1",
      },
      body: body.toString(),
    });

    if (!res.ok) {
      const text = await res.text();
      return { success: false, error: text || `Request failed with ${res.status}` };
    }
    const data = await res.json();
    // console.log("data", data);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to create recharge" };
  }
}


