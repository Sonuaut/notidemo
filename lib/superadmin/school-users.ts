import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
  subscription?: {
    id: number;
    amount: number;
    isActive: boolean;
    isYearly: boolean;
    startDate: string;
    duration: string;
    endDate: string;
    is_auto_pay: boolean;
  };
}

export interface SchoolData {
  admin: User | null;
  teachers: User[];
  schoolName: string;
  total: number;
}

export async function getSchoolUsers(schoolId: string, offset: number = 0,search: string = ""): Promise<SchoolData> {
  const token = await getCookie(ICookiesKey.AUTHTOKEN);
  
  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(
    `${apiUrl}/api/v1/auth/get-specific-user?school_id=${schoolId}&limit=20&offset=${offset}&search=${search}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "1",
      }
    }
  );

  if (!response.ok) {
    throw new Error(`API responded with status ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== 200) {
    throw new Error(data.message || "Failed to fetch users");
  }

  const transformedUsers: User[] = data.data.result.map((item: any) => {
    return {
      id: item.user.id,
      name: item.user.name || item.user.email?.split("@")[0],
      email: item.user.email,
      phone: item.user.mobile_no || "N/A",
      role: item.user.role || "user",
      status: item.user.is_active ? "active" : "inactive",
      joinDate: item.user.created_at,
      subscription: item.subscription
        ? {
            amount: item.subscription.subscription_amount,
            isActive: item.subscription.subscription_status,
            isYearly: item.subscription.is_yearly,
            startDate: item.subscription.start_date,
            duration: item.subscription.subscription_duration,
            endDate: item.subscription.end_date,
            is_auto_pay: item.subscription.is_auto_pay,
          }
        : undefined,
    };
  });

  // Separate admin and teachers
  const admin = transformedUsers.find((u) => u.role.toLowerCase() === "admin") || null;
  const teachers = transformedUsers
    .filter((u) => u.role.toLowerCase() === "teacher")
    .sort(
      (a, b) =>
        new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
    );

  return {
    admin,
    teachers,
    schoolName: data.data.school_name || "School", // Assuming school name is in response
    total: data.data.pagination.total_data,
  };
}

export async function getSchoolDetails(schoolId: string) {
  const token = await getCookie(ICookiesKey.AUTHTOKEN);
  
  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(
    `${apiUrl}/api/v1/admin/${schoolId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "1",
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`API responded with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}
