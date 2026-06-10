import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT ?? "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(to: string, name: string, token: string) {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const link = `${appUrl}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "StackLens <noreply@stacklens.dev>",
    to,
    subject: "Verify your StackLens account",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:900;letter-spacing:-0.5px;">
              Stack<span style="color:#bfdbfe;">Lens</span>
            </h1>
            <p style="margin:6px 0 0;color:#bfdbfe;font-size:13px;">The Discovery Engine for DevOps &amp; Cloud Teams</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;color:#0f172a;font-size:20px;font-weight:800;">
              Verify your email address
            </h2>
            <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
              Hi ${name || "there"}, welcome to StackLens! Click the button below to verify your email and activate your account.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:8px 0 32px;">
                  <a href="${link}"
                     style="display:inline-block;background:#2563eb;color:#ffffff;font-weight:700;font-size:15px;padding:14px 36px;border-radius:12px;text-decoration:none;letter-spacing:0.2px;">
                    Verify my account →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">
              Or paste this link in your browser:
            </p>
            <p style="margin:0 0 32px;word-break:break-all;">
              <a href="${link}" style="color:#2563eb;font-size:12px;">${link}</a>
            </p>

            <div style="border-top:1px solid #e2e8f0;padding-top:24px;">
              <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                This link expires in <strong>24 hours</strong>. If you didn't create a StackLens account, you can safely ignore this email.
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#94a3b8;font-size:11px;">
              © ${new Date().getFullYear()} StackLens. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  });
}
