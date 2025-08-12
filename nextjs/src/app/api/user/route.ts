import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createErrorResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyToken(request);
    const userId = authResult.sub;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isAdmin) {
      return createErrorResponse("Not authorized to access this resource", 403);
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("page_size") || "10");

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" as const } },
            { name: { contains: search, mode: "insensitive" as const } },
            { id: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : undefined;

    // Get total count
    const totalCount = await prisma.user.count({ where });

    // Get paginated users
    const users = await prisma.user.findMany({
      where,
      orderBy: search ? undefined : { email: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      items: users,
      total: totalCount,
      page,
      page_size: pageSize,
      pages: Math.ceil(totalCount / pageSize),
    });
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await verifyToken(request);
    const userId = authResult.sub;
    const userUpdate = await request.json();

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return createErrorResponse("User not found", 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userUpdate,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}
