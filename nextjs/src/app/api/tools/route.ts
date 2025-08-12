import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createErrorResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tools = await prisma.tools.findMany();
    return NextResponse.json(tools);
  } catch (error) {
    return createErrorResponse("Internal Server Error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyToken(request);
    const userId = authResult.sub;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isAdmin) {
      return createErrorResponse("Not authorized to create tools", 403);
    }

    const toolData = await request.json();

    const newTool = await prisma.tools.create({
      data: toolData,
    });

    return NextResponse.json(newTool);
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}
