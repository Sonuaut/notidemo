import { NextRequest, NextResponse } from 'next/server';
import { getPageTitle } from '@/lib/common/header';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pathname=searchParams.get('pathname')
    // console.log("pathname",pathname)
    const data =await getPageTitle(pathname as string)
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
} 