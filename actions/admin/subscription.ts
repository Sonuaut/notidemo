"use server";

import { makeActionApiRequest } from "@/lib/common/api-utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CreateSubscriptionPayload {
  plan_id: number;
  is_yearly: boolean;
  num_of_seat: number;
}

 export interface CreateSubscriptionPayloadForAdmin {
  plan_id: number;
  is_yearly: boolean;
  Admin_user_id: number;
  num_of_seat: number;
  // school_id?: number;
}

export async function createSubscriptionAction(payload: CreateSubscriptionPayload) {

  console.log('i got called in createSubscriptionAction');
  let result ;
  try {
      result = await makeActionApiRequest(
    `${API_URL}/api/v1/subscription/`,
    "POST",
    payload
  );
  } catch (error) {
    console.log("error in createSubscriptionAction", error);
  }
 
  console.log("result in createSubscriptionAction", result);
  return result;
}


export async function createSubscriptionActionForAdmin  (payload: CreateSubscriptionPayloadForAdmin) {
  console.log("payload in createSubscriptionActionForAdmin : ", payload);
  const result = await makeActionApiRequest(
    `${API_URL}/api/v1/subscription/`,
    "POST",
    payload
  );

  console.log("result in createSubscriptionActionForAdmin : ", result);
  return result;
}

