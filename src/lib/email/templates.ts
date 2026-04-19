import { EnquiryFormData } from '@/types/enquiry'

export function generateEnquiryEmail(data: EnquiryFormData) {
  const timestamp = new Date().toLocaleString('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1e40af; }
    .value { margin-top: 5px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">New Enquiry - Taranis Electrical</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Customer Name:</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
      </div>
      <div class="field">
        <div class="label">Job Address:</div>
        <div class="value">${escapeHtml(data.address)}</div>
      </div>
      <div class="field">
        <div class="label">Job Description:</div>
        <div class="value">${escapeHtml(data.description).replace(/\n/g, '<br>')}</div>
      </div>
      <div class="footer">
        Submitted: ${timestamp}<br>
        Source: Taranis Electrical Website
      </div>
    </div>
  </div>
</body>
</html>
  `

  const text = `
New Enquiry - Taranis Electrical

Customer Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Job Address: ${data.address}

Job Description:
${data.description}

---
Submitted: ${timestamp}
Source: Taranis Electrical Website
  `

  return { html, text }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}
