import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/email/resend'
import { generateEnquiryEmail } from '@/lib/email/templates'
import { validateEnquiry } from '@/lib/validation/enquiry'
import { FileAttachment } from '@/types/enquiry'

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // Max 5 submissions per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Verify Content-Type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Invalid Content-Type' },
        { status: 415 }
      )
    }

    // Get client IP for rate limiting (take first IP from x-forwarded-for chain)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Honeypot check - if filled, it's likely a bot
    if (body.honeypot) {
      console.log('Honeypot triggered - potential spam')
      // Return success to not tip off bots
      return NextResponse.json({ success: true, message: 'Enquiry received' })
    }

    // Validate form data
    const validation = validateEnquiry(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = validation.data

    // Server-side file validation
    if (body.attachments) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'application/pdf']

      // Validate file count
      if (body.attachments.length > 3) {
        return NextResponse.json(
          {
            success: false,
            error: 'Maximum 3 files allowed',
          },
          { status: 400 }
        )
      }

      // Validate file types
      const invalidAttachments = body.attachments.filter((file: FileAttachment) =>
        !allowedTypes.includes(file.type)
      )

      if (invalidAttachments.length > 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid file type detected. Only JPG, PNG, HEIC, and PDF files are allowed.',
          },
          { status: 400 }
        )
      }
    }

    // Handle attachments
    const attachments = body.attachments?.map((file: FileAttachment) => ({
      filename: file.name,
      content: file.content,
    })) || []

    // Validate total attachment size (4MB max to match Vercel limits)
    const totalSize = attachments.reduce((sum: number, att: { content: string }) => {
      return sum + (att.content.length * 0.75) // base64 is ~33% larger than original
    }, 0)

    if (totalSize > 4 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: 'Total attachment size exceeds 4MB limit',
        },
        { status: 400 }
      )
    }

    // Generate email content
    const { html, text } = generateEnquiryEmail(data)

    // Send email via Resend
    const recipientEmail = process.env.ENQUIRY_EMAIL || 'taraniselectrical@outlook.com'

    const result = await resend.emails.send({
      from: 'Taranis Electrical <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: data.email,
      subject: `New Enquiry from ${data.name}`,
      html,
      text,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    if (result.error) {
      console.error('Resend error:', {
        message: result.error.message,
        name: result.error.name,
      })
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send enquiry. Please try again or call us directly.',
        },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', {
      id: result.data?.id,
      recipient: recipientEmail,
      from: data.email,
      hasAttachments: attachments.length > 0,
      attachmentCount: attachments.length,
    })

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
    })
  } catch (error) {
    console.error('Enquiry submission error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again or call us directly.',
      },
      { status: 500 }
    )
  }
}
