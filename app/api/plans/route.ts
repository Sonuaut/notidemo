import { NextRequest, NextResponse } from "next/server";
import { fetchPlans } from "@/lib/superadmin/plan";
import { paginationLimit } from "@/types";

export async function GET(_request: NextRequest) {
  try {
    const plans = await fetchPlans({
      role_type_plan: "Organization",
      is_active: "true",
      limit: paginationLimit.LIMIT_50,
      offset: 0,
    });
    return NextResponse.json({ success: true, data: plans });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}


