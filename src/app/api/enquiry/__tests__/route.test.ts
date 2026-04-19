/**
 * @jest-environment @edge-runtime/jest-environment
 */

import { POST, clearRateLimitForTesting } from '../route'
import { NextRequest } from 'next/server'

// Mock the Resend module
jest.mock('@/lib/email/resend', () => ({
  resend: {
    emails: {
      send: jest.fn(),
    },
  },
}))

import { resend } from '@/lib/email/resend'

const mockResendSend = resend.emails.send as jest.MockedFunction<typeof resend.emails.send>

describe('POST /api/enquiry', () => {
  const validEnquiry = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '07925423673',
    address: '123 Main St, London',
    description: 'Need electrical work done',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    clearRateLimitForTesting()
    mockResendSend.mockResolvedValue({
      data: { id: 'test-email-id' },
      error: null,
    } as any)

    // Set test environment variable
    process.env.ENQUIRY_EMAIL = 'test@example.com'
  })

  const createRequest = (body: any, headers: Record<string, string> = {}) => {
    return new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    })
  }

  describe('successful submissions', () => {
    it('should accept valid enquiry and send email', async () => {
      const request = createRequest(validEnquiry)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockResendSend).toHaveBeenCalledTimes(1)
    })

    it('should accept enquiry with attachments', async () => {
      const enquiryWithAttachments = {
        ...validEnquiry,
        attachments: [
          {
            name: 'photo.jpg',
            content: 'base64content==',
            type: 'image/jpeg',
          },
        ],
      }
      const request = createRequest(enquiryWithAttachments)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockResendSend).toHaveBeenCalledWith(
        expect.objectContaining({
          attachments: expect.arrayContaining([
            expect.objectContaining({
              filename: 'photo.jpg',
              content: 'base64content==',
            }),
          ]),
        })
      )
    })

    it('should use configured recipient email', async () => {
      process.env.ENQUIRY_EMAIL = 'custom@example.com'
      const request = createRequest(validEnquiry)
      await POST(request)

      expect(mockResendSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'custom@example.com',
        })
      )
    })

    it('should set reply-to as customer email', async () => {
      const request = createRequest(validEnquiry)
      await POST(request)

      expect(mockResendSend).toHaveBeenCalledWith(
        expect.objectContaining({
          replyTo: 'john@example.com',
        })
      )
    })
  })

  describe('Content-Type validation', () => {
    it('should reject requests without application/json Content-Type', async () => {
      const request = createRequest(validEnquiry, { 'content-type': 'text/plain' })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(415)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid Content-Type')
    })
  })

  describe('validation errors', () => {
    it('should reject enquiry with missing name', async () => {
      const { name, ...invalidEnquiry } = validEnquiry
      const request = createRequest(invalidEnquiry)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Validation error')
    })

    it('should reject enquiry with invalid email', async () => {
      const request = createRequest({ ...validEnquiry, email: 'not-an-email' })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should reject enquiry with short description', async () => {
      const request = createRequest({ ...validEnquiry, description: 'Short' })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })
  })

  describe('honeypot protection', () => {
    it('should silently reject enquiry with filled honeypot', async () => {
      const request = createRequest({ ...validEnquiry, honeypot: 'bot-filled-this' })
      const response = await POST(request)
      const data = await response.json()

      // Should return success to not tip off bots
      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      // But should NOT send email
      expect(mockResendSend).not.toHaveBeenCalled()
    })
  })

  describe('file attachment validation', () => {
    it('should reject more than 3 attachments', async () => {
      const enquiryWithTooManyFiles = {
        ...validEnquiry,
        attachments: [
          { name: 'file1.jpg', content: 'abc==', type: 'image/jpeg' },
          { name: 'file2.jpg', content: 'abc==', type: 'image/jpeg' },
          { name: 'file3.jpg', content: 'abc==', type: 'image/jpeg' },
          { name: 'file4.jpg', content: 'abc==', type: 'image/jpeg' },
        ],
      }
      const request = createRequest(enquiryWithTooManyFiles)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      // Caught by Zod validation
      expect(data.error).toBe('Validation error')
    })

    it('should reject invalid file types', async () => {
      const enquiryWithInvalidType = {
        ...validEnquiry,
        attachments: [
          { name: 'file.exe', content: 'abc==', type: 'application/exe' },
        ],
      }
      const request = createRequest(enquiryWithInvalidType)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      // Caught by Zod validation
      expect(data.error).toBe('Validation error')
    })

    it('should reject attachments exceeding 4MB total', async () => {
      // Create a large base64 string (> 4MB when decoded)
      const largeContent = 'A'.repeat(6 * 1024 * 1024) // 6MB of 'A's
      const enquiryWithLargeFile = {
        ...validEnquiry,
        attachments: [
          { name: 'large.jpg', content: largeContent, type: 'image/jpeg' },
        ],
      }
      const request = createRequest(enquiryWithLargeFile)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('exceeds 4MB limit')
    })
  })

  describe('email sending errors', () => {
    it('should handle Resend API errors gracefully', async () => {
      mockResendSend.mockResolvedValue({
        data: null,
        error: { message: 'API Error', name: 'ResendError' },
      } as any)

      const request = createRequest(validEnquiry)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Failed to send enquiry')
    })

    it('should handle unexpected errors', async () => {
      mockResendSend.mockRejectedValue(new Error('Network error'))

      const request = createRequest(validEnquiry)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })

  describe('rate limiting', () => {
    it('should allow multiple requests from different IPs', async () => {
      const request1 = createRequest(validEnquiry, { 'x-forwarded-for': '1.1.1.1' })
      const request2 = createRequest(validEnquiry, { 'x-forwarded-for': '2.2.2.2' })

      const response1 = await POST(request1)
      const response2 = await POST(request2)

      expect(response1.status).toBe(200)
      expect(response2.status).toBe(200)
    })

    it('should rate limit after 5 requests from same IP', async () => {
      const headers = { 'x-forwarded-for': '1.1.1.1' }

      // Make 5 successful requests
      for (let i = 0; i < 5; i++) {
        const request = createRequest(validEnquiry, headers)
        const response = await POST(request)
        expect(response.status).toBe(200)
      }

      // 6th request should be rate limited
      const request = createRequest(validEnquiry, headers)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Too many requests')
    })
  })
})
