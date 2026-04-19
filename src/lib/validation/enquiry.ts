import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(254, 'Email is too long'),
  phone: z.string()
    .regex(/^[\d\s\+\-\(\)]+$/, 'Phone number can only contain numbers, spaces, +, -, (, )')
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number is too long'),
  address: z.string()
    .min(5, 'Please enter a valid address')
    .max(500, 'Address is too long'),
  description: z.string()
    .min(10, 'Please provide more details about your enquiry')
    .max(5000, 'Description is too long'),
  honeypot: z.string().max(0).optional(),
  attachments: z.array(
    z.object({
      name: z.string().max(255, 'Filename too long'),
      content: z.string().regex(/^[A-Za-z0-9+/=]+$/, 'Invalid base64 content'),
      type: z.enum([
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/heic',
        'image/heif',
        'application/pdf'
      ])
    })
  ).max(3, 'Maximum 3 files allowed').optional()
})

export type EnquiryFormData = z.infer<typeof enquirySchema>

export function validateEnquiry(data: unknown) {
  return enquirySchema.safeParse(data)
}
