import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export interface CreateTeacherPayload {
  school_id: number;
  teacher_name: string;
  teacher_email: string;
  teacher_mobile_no: string;
  teacher_password: string;
}

export interface UpdateTeacherPayload {
  teacher_id: number;
  is_active: boolean;
  name: string;
  mobile_no: string;
}

export interface TeacherResponse {
  id: number;
  name: string;
  email: string;
  mobile_no: string;
  role: string;
  is_active: boolean;
  created_at: string;
  school_id: string;
}

export async function createTeacher(payload: CreateTeacherPayload): Promise<TeacherResponse> {
  const token = await getCookie(ICookiesKey.AUTHTOKEN);
  
  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${apiUrl}/api/v1/admin/create-school-teacher`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "1",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API responded with status ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}

export async function updateTeacher(payload: UpdateTeacherPayload): Promise<TeacherResponse> {
  const token = await getCookie(ICookiesKey.AUTHTOKEN);
  console.log("payload in updateTeacher", JSON.stringify(payload));
  const response = await fetch(`${apiUrl}/api/v1/admin/teachers/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "1",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("errorData in updateTeacher", JSON.stringify(errorData));
    throw new Error(errorData.message || `API responded with status ${response.status}`);
  }

  const data = await response.json();
  console.log("data in updateTeacher", data);
  return data.data;
}


export async function saveBulkTeachers({school_id,teachers}:{ school_id: number, teachers: CreateTeacherPayload[] }): Promise<TeacherResponse> {
  const token = await getCookie(ICookiesKey.AUTHTOKEN);
  if (!token) {
    throw new Error("Authentication token not found");
  }
  const response = await fetch(`${apiUrl}/api/v1/admin/create-school-teacher`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "1",
    },
    body: JSON.stringify({ school_id, teachers }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API responded with status ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}


