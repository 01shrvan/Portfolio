import { type NextRequest, NextResponse } from "next/server";

type FormData = {
    name: string
    company: string
    project: string
    email: string
}

export async function POST(req: NextRequest) {
    const body: FormData = await req.json()

    const chatWebhookURL = process.env.CHAT_WEBHOOK_URL!

    if (!chatWebhookURL) {
        console.error("Chat webhook URL not set!")
        return NextResponse.json({message: "INTERNAL_SERVER_ERROR"}, {status: 500})
    }

    try {
        const details = {
          content: `
    **Exposed User Info**
    - Name: ${body.name || "Unknown"}
    - Email: ${body.email || "Unknown"}
    - Company: ${body.company || "ISP information unavailable"}
    - Project: ${body.project || "Unknown"}
`
        };
    
        const webhookResponse = await fetch(chatWebhookURL, {
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