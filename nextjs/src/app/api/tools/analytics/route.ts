import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createErrorResponse } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyToken(request);
    const analytics = await request.json();

    const analyticsData = {
      timestamp: new Date().toISOString(),
      tool_id: analytics.tool_id,
      tool_name: analytics.tool_name,
      event_type: analytics.event_type,
      user_id: analytics.user_id || authResult.sub,
      user_role: analytics.user_role,
      access_type: analytics.access_type,
      referrer_page: analytics.referrer_page,
      metadata: analytics.metadata || {},
    };

    // Log to console/file (you can extend this to store in database)
    console.log("[TOOL_ANALYTICS]", JSON.stringify(analyticsData, null, 2));

    // Optional: Store in database
    // You can create a ToolAnalytics model and store this data

    return NextResponse.json({
      message: "Analytics tracked successfully",
      data: analyticsData,
    });
  } catch (error) {
    console.error("Error tracking analytics:", error);
    return NextResponse.json(
      {
        message: "Analytics tracking failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
