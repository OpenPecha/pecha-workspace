import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: process.env.AUTH0_AUDIENCE,
          grant_type: "client_credentials",
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: response.statusText, detail: await response.json() },
        { status: response.status }
      );
    }

    const tokenData = await response.json();
    return NextResponse.json(tokenData);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", detail: error },
      { status: 500 }
    );
  }
}
