import { NextRequest, NextResponse } from "next/server";
import { fetchTemplates } from "@/lib/superadmin/template";

export async function GET(request: NextRequest) {
  try {
    const result = await fetchTemplates({  is_custom: "false",withPagination: false });
    let templates = result.templates || [];
    return NextResponse.json({
      success: true,
      templates,
      
    });

  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
