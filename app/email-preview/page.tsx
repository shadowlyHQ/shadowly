'use client'

import { useState } from 'react'

const LOGO_URL = 'https://shadowly.io/shadowly.png'
const WEBSITE_URL = 'https://shadowly.io'

// Sample data for preview
const sampleName = 'John Doe'
const sampleEmail = 'john@example.com'
const sampleMessage = 'Hey! I run a YouTube channel with 500k subscribers and I\'m looking to expand my brand. Would love to chat about how you can help me monetize better!'

const confirmationEmail = `
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
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; line-height: 1.3;">Thanks for reaching out, ${sampleName}!</h1>
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
`

const notificationEmail = `
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
                    <p style="margin: 0 0 8px 0; font-size: 16px; color: #18181b; font-weight: 500;">${sampleName}</p>
                    <a href="mailto:${sampleEmail}" style="color: #7c3aed; font-size: 14px; text-decoration: none;">${sampleEmail}</a>
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
                    <p style="margin: 0; font-size: 15px; color: #3f3f46; line-height: 1.6; white-space: pre-wrap;">${sampleMessage}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Reply Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${sampleEmail}?subject=Re: Your inquiry to Shadowly" style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Reply to ${sampleName}</a>
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
`

export default function EmailPreview() {
  const [activeTab, setActiveTab] = useState<'confirmation' | 'notification'>('confirmation')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Email Template Preview</h1>
        <p className="text-gray-400 mb-6">Preview how your emails will look to recipients</p>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Tab Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('confirmation')}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'confirmation'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📧 User Email
            </button>
            <button
              onClick={() => setActiveTab('notification')}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'notification'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              🔔 Your Notification
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 sm:ml-auto">
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                viewMode === 'desktop'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              🖥️ Desktop
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                viewMode === 'mobile'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📱 Mobile
            </button>
          </div>
        </div>

        {/* Email Preview */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="bg-gray-700 rounded-lg p-3 mb-4 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm">
              {activeTab === 'confirmation' ? 'Email to: john@example.com' : 'Email to: smoothoperatorops@gmail.com'}
            </span>
          </div>
          
          <div className={`mx-auto transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-[375px]' : 'w-full'}`}>
            <iframe
              srcDoc={activeTab === 'confirmation' ? confirmationEmail : notificationEmail}
              className="w-full h-[700px] rounded-lg bg-[#f4f4f5]"
              title="Email Preview"
            />
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-4 text-center">
          ⚠️ Logo will show once deployed to shadowly.io
        </p>
      </div>
    </div>
  )
}
