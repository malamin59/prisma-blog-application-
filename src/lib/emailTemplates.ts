export const emailVerificationTemplate = ({
  name,
  verificationUrl,
}: {
  name: string;
  verificationUrl: string;
}) => `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; font-family: Arial; background:#f4f4f4;">
    <table width="100%">
      <tr>
        <td align="center" style="padding:40px">
          <table width="600" style="background:#fff; border-radius:8px">
            <tr>
              <td style="background:#4f46e5; padding:20px; color:#fff; text-align:center">
                <h1>Prisma Blog Application</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px">
                <h2>Hello ${name || "there"} 👋</h2>
                <p>Please verify your email address.</p>

                <div style="text-align:center; margin:30px 0">
                  <a href="${verificationUrl}"
                     style="background:#4f46e5; color:#fff; padding:14px 24px;
                            text-decoration:none; border-radius:6px">
                    Verify Email
                  </a>
                </div>

                <p>If you didn’t sign up, ignore this email.</p>

                <p>— Prisma Blog Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
