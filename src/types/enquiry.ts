export interface EnquiryFormData {
  name: string
  email: string
  phone: string
  address: string
  description: string
  honeypot?: string
  attachments?: FileAttachment[]
}

export interface FileAttachment {
  name: string
  content: string
  type: string
}

export interface EnquirySubmissionResponse {
  success: boolean
  message?: string
  error?: string
  details?: Record<string, string[]>
}
