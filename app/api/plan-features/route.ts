import { NextRequest, NextResponse } from 'next/server';

import { getCookie } from '@/actions/cookie';
import { ICookiesKey } from '@/types';
import { fetchPlanFeatures } from '@/lib/superadmin/plan';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userSubscriptionId = searchParams.get('userSubscriptionId') as string;
    const isYearly = searchParams.get('userSubscriptionYearly') as string;

if(!userSubscriptionId || !isYearly) {
  return NextResponse.json({ error: 'Plan ID and isYearly are required' }, { status: 400 });
}

const isMonthly = isYearly === 'true' ? false : true;
const token =await getCookie(ICookiesKey.AUTHTOKEN);  
const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/plan_features/?plan_id=${userSubscriptionId}&is_monthly=${isMonthly}&limit=20&offset=0`;
console.log("url :", url);
  const data = await fetch(url,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  const dataJson = await data.json();
    return NextResponse.json(dataJson);

  } catch (error) {
    console.error('Error fetching plan features:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
