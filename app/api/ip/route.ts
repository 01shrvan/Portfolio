import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for");

  if (!ip) {
    return NextResponse.json({ ip: "Unable to fetch IP", status: 400 });
  }

  return NextResponse.json({ ip });
}
