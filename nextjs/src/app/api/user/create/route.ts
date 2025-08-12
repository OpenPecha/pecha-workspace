import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createErrorResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyToken(request);

    const userId = authResult.sub;
    const userEmail = authResult["https://pecha-tool/email"];
    const userPicture = authResult["https://pecha-tool/picture"];

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email: userEmail,
        picture: userPicture,
        name: userEmail ? userEmail.split("@")[0] : null,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return createErrorResponse("Unauthorized", 401);
  }
}
