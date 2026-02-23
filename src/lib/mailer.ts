import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface InquiryEmailData {
  name: string;
  email: string;
  phone: string;
  studentClass: string;
  subject: string;
  message: string;
}

export async function sendInquiryNotification(data: InquiryEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("[mailer] ADMIN_EMAIL not set — skipping admin notification");
    return;
  }
  console.log("[mailer] ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
  console.log("[mailer] SMTP_EMAIL:", process.env.SMTP_EMAIL);
  console.log(
    "[mailer] SMTP_PASSWORD:",
    process.env.SMTP_PASSWORD ? "✓ Set" : "✗ Missing",
  );
  console.log("[mailer] Sending admin notification to:", adminEmail);

  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn(
      "[mailer] SMTP_EMAIL or SMTP_PASSWORD not set — skipping email",
    );
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7c3aed, #9333ea); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Student Inquiry</h1>
        <p style="color: #e9d5ff; margin: 4px 0 0;">Mirza Study Centre</p>
      </div>
      <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 120px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Phone</td>
            <td style="padding: 8px 0;"><a href="tel:+91${data.phone}">+91 ${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Class</td>
            <td style="padding: 8px 0;">${data.studentClass}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Subject</td>
            <td style="padding: 8px 0;">${data.subject}</td>
          </tr>
          ${
            data.message
              ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; vertical-align: top;">Message</td>
            <td style="padding: 8px 0;">${data.message}</td>
          </tr>
          `
              : ""
          }
        </table>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          Sent from your website's inquiry form. Reply to this student within 24 hours.
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Mirza Study Centre" <${process.env.SMTP_EMAIL}>`,
    to: adminEmail,
    subject: `New Inquiry: ${data.name} — ${data.subject} (${data.studentClass})`,
    html,
  });
  console.log("[mailer] Email sent to:", adminEmail);
}

interface EnrollmentEmailData {
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  courseSchedule: string;
  courseInstructor: string;
}

export async function sendEnrollmentConfirmation(data: EnrollmentEmailData) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) return;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7c3aed, #9333ea); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Enrollment Confirmed</h1>
        <p style="color: #e9d5ff; margin: 4px 0 0;">Mirza Study Centre</p>
      </div>
      <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <p style="margin: 0 0 16px;">Dear ${data.studentName},</p>
        <p style="margin: 0 0 16px;">Thank you for enrolling in <strong>${data.courseTitle}</strong>.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 140px;">Schedule</td>
            <td style="padding: 8px 0;">${data.courseSchedule}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Instructor</td>
            <td style="padding: 8px 0;">${data.courseInstructor}</td>
          </tr>
        </table>
        <p style="margin: 16px 0 0; color: #64748b; font-size: 14px;">
          Visit your <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://mirza-study-center.vercel.app'}/feed">dashboard</a> to track progress.
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Mirza Study Centre" <${process.env.SMTP_EMAIL}>`,
    to: data.studentEmail,
    subject: `Enrolled: ${data.courseTitle} — Mirza Study Centre`,
    html,
  });
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn(
      "[mailer] SMTP_EMAIL or SMTP_PASSWORD not set — skipping email",
    );
    throw new Error("SMTP credentials not configured");
  }

  const info = await transporter.sendMail({
    from: `"Mirza Study Centre" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  });

  return { messageId: info.messageId };
}
