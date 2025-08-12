import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createErrorResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ toolId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await verifyToken(request);
    const { toolId } = await params;

    const tool = await prisma.tools.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      return createErrorResponse("Tool not found", 404);
    }

    return NextResponse.json(tool);
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyToken(request);
    const userId = authResult.sub;
    const { toolId } = await params;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isAdmin) {
      return createErrorResponse("Not authorized to update tools", 403);
    }

    const toolUpdate = await request.json();

    const tool = await prisma.tools.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      return createErrorResponse("Tool not found", 404);
    }

    const updatedTool = await prisma.tools.update({
      where: { id: toolId },
      data: toolUpdate,
    });

    return NextResponse.json(updatedTool);
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyToken(request);
    const userId = authResult.sub;
    const { toolId } = await params;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isAdmin) {
      return createErrorResponse("Not authorized to delete tools", 403);
    }

    const tool = await prisma.tools.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      return createErrorResponse("Tool not found", 404);
    }

    await prisma.tools.delete({
      where: { id: toolId },
    });

    return NextResponse.json({ message: "Tool deleted successfully" });
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}
