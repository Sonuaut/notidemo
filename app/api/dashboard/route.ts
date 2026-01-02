import { NextResponse } from 'next/server'
import { fetchAdminDashboardData } from '@/lib/admin/dashboard'

export async function GET() {
  try {
    const data = await fetchAdminDashboardData()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}


