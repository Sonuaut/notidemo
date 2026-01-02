import { NextRequest, NextResponse } from "next/server";
import { fetchActiveSubscription } from "@/lib/admin/subscription";
import { ICookiesKey } from "@/types";

export async function GET(request: NextRequest) {
  try {
    // Get token from request cookies (proper way for Route Handlers)
    const token = request.cookies.get(ICookiesKey.AUTHTOKEN)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication token not found" },
        { status: 401 }
      );
    }

    const res = await fetchActiveSubscription(token);
    return NextResponse.json(res, { status: res.success ? 200 : 401 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
