import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createErrorResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ userId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyToken(request);
    const authUserId = authResult.sub;
    const { userId } = await params;

    const authUser = await prisma.user.findUnique({
      where: { id: authUserId },
    });

    // Allow access only if requesting own profile or is admin
    if (authUserId !== userId && (!authUser || !authUser.isAdmin)) {
      return createErrorResponse("Not authorized to access this user", 403);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return createErrorResponse("User not found", 404);
    }

    return NextResponse.json(user);
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await verifyToken(request);
    const authUserId = authResult.sub;
    const { userId } = await params;

    // Check if user is admin
    const authUser = await prisma.user.findUnique({
      where: { id: authUserId },
    });

    if (!authUser || !authUser.isAdmin) {
      return createErrorResponse("Not authorized to delete users", 403);
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return createErrorResponse("User not found", 404);
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}
