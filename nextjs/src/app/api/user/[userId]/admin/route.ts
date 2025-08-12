import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createErrorResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: { userId: string };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyToken(request);
    const authUserId = authResult.sub;
    const { userId } = params;
    const { isAdmin } = await request.json();

    // Check if the requester is admin
    const authUser = await prisma.user.findUnique({
      where: { id: authUserId },
    });

    if (!authUser || !authUser.isAdmin) {
      return createErrorResponse("Not authorized to update admin status", 403);
    }

    // Find the target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return createErrorResponse("User not found", 404);
    }

    // Update admin status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isAdmin },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}
