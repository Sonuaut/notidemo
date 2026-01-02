'use server'

import { revalidatePath } from 'next/cache';
import { updateTeacherStatus as updateTeacherStatusLib } from '@/lib/superadmin/teacher';
import { getCookie } from '@/actions/cookie';
import { ICookiesKey } from '@/types';
import { createTeacher } from '@/lib/superadmin/teacher-operations';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle teacher operations with consistent error handling
async function handleTeacherAction(
  operation: Promise<any>,
  errorMessage: string
): Promise<{ status: boolean; data?: any; error?: any }> {
  try {
    const data = await operation;
    revalidatePath("/super-admin/teachers");
    return { status: true, data };
  } catch (error) {
    console.log("Teacher operation error:", error);
    return {
      status: false,
      error: error
    };
  }
}

export async function updateTeacherStatus(formData: {
  userId: string;
  is_active: boolean;
  school_id: number;
  name: string;
  mobile_no: string;
}) {
  const { userId, is_active, school_id, name, mobile_no } = formData;
  
  return handleTeacherAction(
    updateTeacherStatusLib(userId, is_active, {
      school_id,
      name,
      mobile_no
    }),
    "An error occurred while updating teacher status"
  );
}

export async function deleteUserAction(userId: number) {
  if (!API_URL) {
    return { status: false, error: "API URL not configured" };
  }

  try {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    if (!token) {
      return { status: false, error: "Authentication token not found" };
    }

    const response = await fetch(`${API_URL}/api/v1/auth/delete?id=${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        status: false, 
        error: data.message || `Failed to delete user: ${response.status}` 
      };
    }

    revalidatePath("/super-admin/teachers");
    return { status: true, data };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { 
      status: false, 
      error: error instanceof Error ? error.message : "Failed to delete user" 
    };
  }
} 



export async function saveBulkTeachers({school_id,teachers}:{ school_id: number, teachers: any }) {

  console.log(school_id, teachers, 'school_id, teachers to add in action');
  try {
    await saveBulkTeachers({school_id,teachers});


    revalidatePath("/super-admin/school-users");
    return { success: true, message: "Teacher created successfully!" };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || "Failed to create teacher" 
    };
  }

  
}