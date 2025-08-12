import { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { headers } from "next/headers";

export interface AuthUser {
  sub: string;
  "https://pecha-tool/email"?: string;
  "https://pecha-tool/picture"?: string;
  email?: string;
  picture?: string;
  name?: string;
  [key: string]: any;
}

export async function verifyToken(request: NextRequest): Promise<AuthUser> {
  try {
    const session = await getSession();

    if (!session?.user) {
      throw new Error("No authenticated user");
    }

    // Transform the Auth0 user to our expected format
    const user = session.user;
    return {
      sub: user.sub,
      "https://pecha-tool/email": user.email,
      "https://pecha-tool/picture": user.picture,
      email: user.email,
      picture: user.picture,
      name: user.name,
      ...user,
    };
  } catch (error) {
    throw new Error("Authentication failed");
  }
}

export function createErrorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
