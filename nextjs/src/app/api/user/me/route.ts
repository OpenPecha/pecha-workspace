import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createErrorResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyToken(request);

    return NextResponse.json({
      id: authResult.sub,
      email: authResult["https://pecha-tool/email"],
      picture: authResult["https://pecha-tool/picture"],
    });
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}
