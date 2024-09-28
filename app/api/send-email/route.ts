import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  console.log("Received request to /api/send-email");

  try {
    const { name, company, project, email } = await req.json();
    console.log("Form data:", { name, company, project, email });

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("Transporter created");

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "benkeshrvan@gmail.com", // Your email address
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Company: ${company}
        Project: ${project}
        Email: ${email}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Project:</strong> ${project}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };

    console.log("Attempting to send email");

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/send-email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
