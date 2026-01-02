'use server'
import { getCookie } from '../cookie';
import { schoolRevalidateTag } from '@/lib/superadmin/school';
import { ICookiesKey } from '@/types';
import { revalidatePath, revalidateTag } from 'next/cache';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function updateSchool(formData: {
    userId: string;
    school_name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    website?: string;
    is_active: boolean;
}) {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    if (!token) throw new Error('Authentication token not found');
    const {
        userId, school_name, address, city, state, country, zipcode, website, is_active
    } = formData;

    const formDataObj = new URLSearchParams();
    formDataObj.append('school_name', school_name);
    formDataObj.append('address', address);
    formDataObj.append('city', city);
    formDataObj.append('state', state);
    formDataObj.append('country', country);
    formDataObj.append('zipcode', zipcode);
    formDataObj.append('website', website ?? '');
    formDataObj.append('is_active', is_active ? 'true' : 'false');

    console.log("url hit : ", `${apiUrl}/api/v1/admin/update-admin?user_id=${parseInt(userId)}`);
    const response = await fetch(
        `${apiUrl}/api/v1/admin/update-admin?user_id=${parseInt(userId)}`,
        {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'ngrok-skip-browser-warning': '1',
            },
            body: formDataObj.toString(),
        }
    );

    // console.log("data in api  :",response)
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `API responded with status ${response.status}`);
    }

    const data = await response.json();
    // console.log("dat in updateion api :",data)
    if (data.status !== 200) {
        throw new Error(data.message ?? 'Failed to update school');
    }
   
    revalidateTag("schoolRevalidateTag");
    // revalidatePath(`/super-admin/school/*`)
    return {
        status:true,
        data
      }
}


export async function updateSchoolStatus(formData: {
    userId: string;
    is_active: boolean;
}) {
    const token = await getCookie(ICookiesKey.AUTHTOKEN);
    if (!token) throw new Error('Authentication token not found');
    const {
        userId, is_active
    } = formData;

    const formDataObj = new URLSearchParams();
    formDataObj.append('is_active', is_active ? 'true' : 'false');

    console.log("url hit : ", `${apiUrl}/api/v1/admin/update-admin?user_id=${parseInt(userId)}`);
    const response = await fetch(
        `${apiUrl}/api/v1/admin/update-admin?user_id=${parseInt(userId)}`,
        {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'ngrok-skip-browser-warning': '1',
            },
            body: formDataObj.toString(),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `API responded with status ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 200) {
        throw new Error(data.message ?? 'Failed to update school');
    }
    revalidateTag(schoolRevalidateTag);
    revalidatePath("/school-admin/school")
    return {
        status:true,
        data
      }
}