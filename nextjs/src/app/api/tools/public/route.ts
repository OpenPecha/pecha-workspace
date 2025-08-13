import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get tools from database
    const tools = await prisma.tools.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
        link: true,
        demo: true,
        icon: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // Transform tools to match the expected format
    const transformedTools = tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      price: tool.price,
      link: tool.link,
      demo: tool.demo,
      icon: tool.icon,
    }));

    // Create response with CORS headers
    const response = NextResponse.json({
      success: true,
      data: transformedTools,
      count: transformedTools.length,
    });

    // Add CORS headers to allow cross-origin requests
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight for 24 hours

    return response;
  } catch (error) {
    console.error("Error fetching public tools:", error);

    const errorResponse = NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tools",
        data: [],
        count: 0,
      },
      { status: 500 }
    );

    // Add CORS headers even for error responses
    errorResponse.headers.set("Access-Control-Allow-Origin", "*");
    errorResponse.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    errorResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return errorResponse;
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });

  // Add CORS headers for preflight
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}
