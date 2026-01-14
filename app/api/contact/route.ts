import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

// Logo URL - update this to your deployed site
const LOGO_URL = 'https://shadowly.io/shadowly.png'
const WEBSITE_URL = 'https://shadowly.io'

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend inside the function (runtime, not build time)
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email notification to you
    const { data, error } = await resend.emails.send({
      from: 'Shadowly <noreply@shadowly.io>',
      to: process.env.NOTIFICATION_EMAIL || 'your-email@example.com',
      replyTo: email,
      subject: `New Booking Request from ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Booking Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #7c3aed; padding: 32px 24px; text-align: center;">
              <img src="${LOGO_URL}" alt="Shadowly" width="48" height="48" style="display: block; margin: 0 auto 16px auto; border-radius: 10px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">New Booking Request</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              
              <!-- Contact Info -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <span style="color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">From</span>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #fafafa; border-radius: 8px; padding: 16px;">
                    <p style="margin: 0 0 8px 0; font-size: 16px; color: #18181b; font-weight: 500;">${name}</p>
                    <a href="mailto:${email}" style="color: #7c3aed; font-size: 14px; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <span style="color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Message</span>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #fafafa; border-radius: 8px; padding: 16px;">
                    <p style="margin: 0; font-size: 15px; color: #3f3f46; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Reply Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Your inquiry to Shadowly" style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Reply to ${name}</a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 20px 24px; text-align: center; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; color: #a1a1aa; font-size: 13px;">Sent from your Shadowly website</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Shadowly <noreply@shadowly.io>',
      to: email,
      subject: "Thanks for reaching out! We'll be in touch soon",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thanks for reaching out</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #7c3aed; padding: 40px 24px; text-align: center;">
              <img src="${LOGO_URL}" alt="Shadowly" width="56" height="56" style="display: block; margin: 0 auto 20px auto; border-radius: 12px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; line-height: 1.3;">Thanks for reaching out, ${name}!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #3f3f46; line-height: 1.6; text-align: center;">
                I've received your message and will get back to you within <strong style="color: #7c3aed;">24 hours</strong>.
              </p>
              
              <!-- Steps -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 10px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #18181b;">What happens next?</p>
                    
                    <!-- Step 1 -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                      <tr>
                        <td width="32" valign="top">
                          <div style="width: 24px; height: 24px; background-color: #7c3aed; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 600; text-align: center; line-height: 24px;">1</div>
                        </td>
                        <td style="padding-left: 12px; color: #52525b; font-size: 14px; line-height: 1.5;">I'll review your message personally</td>
                      </tr>
                    </table>
                    
                    <!-- Step 2 -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                      <tr>
                        <td width="32" valign="top">
                          <div style="width: 24px; height: 24px; background-color: #7c3aed; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 600; text-align: center; line-height: 24px;">2</div>
                        </td>
                        <td style="padding-left: 12px; color: #52525b; font-size: 14px; line-height: 1.5;">You'll receive a response within 24 hours</td>
                      </tr>
                    </table>
                    
                    <!-- Step 3 -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="32" valign="top">
                          <div style="width: 24px; height: 24px; background-color: #7c3aed; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 600; text-align: center; line-height: 24px;">3</div>
                        </td>
                        <td style="padding-left: 12px; color: #52525b; font-size: 14px; line-height: 1.5;">We'll schedule a call to discuss your project</td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${WEBSITE_URL}" style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Visit Our Website</a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #e4e4e7;">
              <img src="${LOGO_URL}" alt="Shadowly" width="32" height="32" style="display: block; margin: 0 auto 12px auto; border-radius: 6px;">
              <p style="margin: 0 0 4px 0; color: #52525b; font-size: 14px; font-weight: 500;">Shadowly</p>
              <p style="margin: 0 0 12px 0; color: #a1a1aa; font-size: 13px;">Creator Management & Growth</p>
              <a href="${WEBSITE_URL}" style="color: #7c3aed; font-size: 13px; text-decoration: none;">shadowly.io</a>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
