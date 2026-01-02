"use server";

import { revalidatePath } from "next/cache";
import { CreateRechargePayload, UpdateRechargePayload } from "@/types";
import { createRecharge, updateRecharge, deleteRecharge } from "@/lib/superadmin/recharge";

// Helper function to handle recharge operations with consistent error handling
async function handleRechargeAction(
  operation: Promise<any>, 
  errorMessage: string
): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    const result = await operation;
    if (!result.success) {
      return { success: false, error: result.error };
    }
    revalidatePath("/super-admin/recharges");
    return { success: true, data: result.data };
  } catch (error) {
    console.log("Recharge operation error:", error);
    return { success: false, error: errorMessage };
  }
}

export async function createRechargeAction(data: CreateRechargePayload) {

  return handleRechargeAction(
    createRecharge(data), 
    "An error occurred while creating the recharge"
  );
}

export async function updateRechargeAction(data: UpdateRechargePayload) {
  console.log(data ,'data is key');
  return handleRechargeAction(
    updateRecharge(data), 
    "An error occurred while updating the recharge"
  );
}

export async function deleteRechargeAction(rechargeId: number) {
  return handleRechargeAction(
    deleteRecharge(rechargeId), 
    "An error occurred while deleting the recharge"
  );
} 




