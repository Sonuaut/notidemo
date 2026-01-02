"use server";

import FormDataNode from 'form-data'
import { revalidatePath } from 'next/cache'
import { getCookie } from '../cookie';
import { ICookiesKey } from '@/types';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export async function uploadProfile(formData: FormData) {

  const token=await getCookie(ICookiesKey.AUTHTOKEN)
  const name = formData.get('name') as string
  const mobile_no = formData.get('mobile_no') as string
  const about = formData.get('about') as string
  const file = formData.get('file') as File | null

  const form = new FormDataNode()
  form.append('name', name)
  form.append('mobile_no', mobile_no)
  form.append('about', about)
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    form.append('file', buffer, {
      filename: file.name,
      contentType: file.type
    })
  }

  const res = await fetch(`${apiUrl}/api/v1/profile/`, {
    method: 'PATCH',
    headers: {
      ...form.getHeaders(),
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    },
    body: form.getBuffer()
  })

  const data = await res.json();
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || res.statusText)
  }
  // console.log("data:",data)
  revalidatePath('/super-admin/profile')  
  revalidatePath('/api/profile')  
  return {
    status:true,
    data
  }
}
