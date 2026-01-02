"use server";
import { revalidatePath } from "next/cache";
import { createTeacher, updateTeacher,  } from "@/lib/superadmin/teacher-operations";
import { CreateTeacherPayload, UpdateTeacherPayload } from "@/lib/superadmin/teacher-operations";

export async function createTeacherAction(payload: CreateTeacherPayload) {
  try {
    await createTeacher(payload);
    revalidatePath("/super-admin/school-users");
    return { success: true, message: "Teacher created successfully!" };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || "Failed to create teacher" 
    };
  }
}

export async function updateTeacherAction(payload: UpdateTeacherPayload) {
  try {
    await updateTeacher(payload);
    revalidatePath("/super-admin/school-users");
    return { success: true, message: "Teacher updated successfully!" };
  } catch (error: any) {
    return { 
      success: false,
      error: error.message || "Failed to update teacher" 
    };
  }
}

