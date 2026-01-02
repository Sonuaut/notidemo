import { cookies } from "next/headers";
import { ICookiesKey } from "@/types";
import FormData from 'form-data';
import fs from 'fs';
import { getCookie } from "@/actions/cookie";

export const profileTag = "superadmin-profile";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getProfile() {
  const url = `${apiUrl}/api/v1/profile/`;
  const token= await getCookie(ICookiesKey.AUTHTOKEN);
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    },
  });

  if (!response.ok) {
    const errorText = await response.json();
    console.error("API error response:", errorText);
    throw new Error(`API responded with status ${response.status}`);
  }
  const data = await response.json();
  // console.log("data profile :", data);
  return data;
}

export async function updateSuperAdminProfile(data: { name?: string; mobile_no?: string; about?: string; filePath?: string; fileType?: string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ICookiesKey.AUTHTOKEN)?.value;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`;

  const form = new FormData();
  form.append('name', data.name ?? '');
  form.append('mobile_no', data.mobile_no ?? '');
  form.append('about', data.about ?? '');
  if (data.filePath) {
    form.append('file', fs.createReadStream(data.filePath), {
      contentType: data.fileType || undefined,
      filename: data.filePath.split('/').pop(),
    });
  }

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      ...form.getHeaders(),
    },
    body: form as any,
  });

  console.log("response from updating",response)
  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(errorText || 'Failed to update profile');
  }

  return await response.json();
}