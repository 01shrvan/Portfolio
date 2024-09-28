import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.ip;

  if (!ip) {
    return NextResponse.json({ error: "Unable to fetch IP" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    return NextResponse.json({
      ip: data.ip,
      location: `${data.city}, ${data.region}, ${data.country_name}`,
      isp: data.org,
    });
  } catch (error) {
    console.error("Error fetching IP details:", error);
    return NextResponse.json(
      { error: "Error fetching IP details" },
      { status: 500 }
    );
  }
}
