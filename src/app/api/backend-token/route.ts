import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { SignJWT } from "jose";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    // Check logged-in user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized!" },
        { status: 401 },
      );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is missing!");
    }

    // Generate JWT
    const token = await new SignJWT({
      role: session.user.role,
      email: session.user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(session.user.id)
      .setIssuer("wedplan-client")
      .setAudience("wedplan-api")
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(new TextEncoder().encode(secret));

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("JWT Generation Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to generate token!" },
      { status: 500 },
    );
  }
}
