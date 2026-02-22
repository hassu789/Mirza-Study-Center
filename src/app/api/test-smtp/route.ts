import { sendEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[DEBUG] SMTP_EMAIL:", process.env.SMTP_EMAIL);
    console.log(
      "[DEBUG] SMTP_PASSWORD:",
      process.env.SMTP_PASSWORD ? "✓ Set" : "✗ Missing",
    );

    const result = await sendEmail({
      to: process.env.SMTP_EMAIL!,
      subject: "SMTP Test - Mirza Study Center",
      html: "<h2>If you see this, SMTP is working! ✅</h2>",
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent!",
      messageId: result.messageId,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[DEBUG] SMTP Error:", msg);

    return NextResponse.json(
      {
        success: false,
        error: msg,
      },
      { status: 500 },
    );
  }
}
