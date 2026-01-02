"use server";

import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function assignTemplateToUsersAction({ user_ids, template_ids   }: { user_ids: number[]; template_ids: number[] }) {
  if (!API_URL) return { success: false, error: "API URL not configured" };
  try {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    if (!token) return { success: false, error: "Authentication token not found" };

      const body = {
        user_ids: user_ids,
        template_ids: template_ids
      }

    const res = await fetch(`${API_URL}/api/v1/templates/assign-template`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return { success: false, error: text || `Request failed with ${res.status}` };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to assign template" };
  }
}

export async function assignTemplateToSchoolsAction({ school_id, template_ids }: { school_id: number; template_ids: number[] }) {
  if (!API_URL) return { success: false, error: "API URL not configured" };
  try {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    if (!token) return { success: false, error: "Authentication token not found" };

   const body = {
    school_ids: [school_id],
    template_ids: template_ids
   }
   console.log("body :",body)
  
    const res = await fetch(`${API_URL}/api/v1/templates/assign-template`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return { success: false, error: text || `Request failed with ${res.status}` };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to assign template to schools" };
  }
}


