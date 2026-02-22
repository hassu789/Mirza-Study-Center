import { sendEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: to, subject, message",
        },
        { status: 400 },
      );
    }

    const result = await sendEmail({
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
      messageId: result.messageId,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[send-email] Error:", errorMsg);

    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 },
    );
  }
}
