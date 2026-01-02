import { getCookie } from "@/actions/cookie";
import { ICookiesKey, paginationLimit } from "@/types";
import { makeTeacherApiRequest } from "@/lib/common/api-utils";
import { Subscription } from "../admin/subscription";

export interface TemplateMapping {
  id: number;
  school_id: number | null;
  template_id: number;
  user_id: number;
  template: {
    id: number;
    subject: string;
    is_custom: boolean;
    updated_at: string;
    type: string;
    name?: string;
  };
}

export interface TeacherData {
  id: number;
  name: string;
  email: string;
  mobile_no: string;
  role: string;
  is_active: boolean;
  is_admin: boolean;
  is_super_admin: boolean;
  is_individual: boolean;
  school_id: number | null;
  about: string | null;
  profile_img_url: string | null;
  otp_verified: boolean;
  otp_created_at: string;
  created_at: string;
  updated_at: string;
  password: string;
  otp: string | null;
  user_subscription: Subscription[];
  template_mappings?: TemplateMapping[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchIndividualTeachers(offset: number = 0): Promise<{
  data: {user:TeacherData,subscription:Subscription}[];
  total_count: number;
}> {
  try {
    const limit = paginationLimit.LIMIT_10;
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    // console.log("token in fetch individual teachers", token);

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${API_URL}/api/v1/auth/get-specific-user?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch teachers: ${response.status}`);
    }

    const data = await response.json();
    return {
      data: data?.data?.result,
      total_count: data?.data?.pagination?.total_data,
    };
  } catch (error) {
    console.error("Error fetching individual teachers:", error);
    return {
      data: [],
      total_count: 0,
    };
  }
}

export async function updateTeacherStatus(
  userId: string,
  is_active: boolean,
  teacherData: {
    school_id: number;
    name: string;
    mobile_no: string;
  }
) {
  const payload = {
    user_id: parseInt(userId),
    is_active: is_active,
    role: "individual",
    school_id: teacherData.school_id,
    name: teacherData.name,
    mobile_no: teacherData.mobile_no,
  };

  const result = await makeTeacherApiRequest(
    `${API_URL}/api/v1/auth/update-user`,
    "PATCH",
    payload
  );

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
}
