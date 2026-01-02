import { NextResponse } from "next/server";
import { fetchRecharges, RechargeType } from "@/lib/superadmin/recharge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
 try {
  const limit = Number(searchParams.get("limit") ?? "20");
  const offset = Number(searchParams.get("offset") ?? "0");
  const type = searchParams.get("type") as RechargeType;
  const res = await fetchRecharges({ limit, offset, type });
  console.log("res", res);

  if(res.recharges.length === 0){
    return NextResponse.json({ status: true, message: "No recharge plans found", data: [] });
  }
    return NextResponse.json({ status: true, message: "Recharge plans fetched", data: res.recharges });
 } catch (error) {
  return NextResponse.json({ status: false, message: "Failed to fetch recharge plans", error: error });
 }
}
