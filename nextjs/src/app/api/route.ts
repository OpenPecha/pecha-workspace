import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Welcome to Pecha API",
    documentation: "/docs",
    version: "1.0.0",
  });
}
