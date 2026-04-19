'use client'

import * as React from 'react'
import { Section, SectionHeading } from '@/components/content/section-heading'
import { EnquirySubmissionResponse } from '@/types/enquiry'

export function EnquiryForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  })
  const [files, setFiles] = React.useState<File[]>([])
  const [fileError, setFileError] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFileError('')

    // Validate file count
    if (selectedFiles.length > 3) {
      setFileError('Maximum 3 files allowed')
      return
    }

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'application/pdf']
    const invalidFiles = selectedFiles.filter(file => !allowedTypes.includes(file.type))
    if (invalidFiles.length > 0) {
      setFileError('Only JPG, PNG, HEIC, and PDF files are allowed')
      return
    }

    // Validate file sizes (5MB each)
    const maxSize = 5 * 1024 * 1024 // 5MB
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSize)
    if (oversizedFiles.length > 0) {
      setFileError('Each file must be under 5MB')
      return
    }

    setFiles(selectedFiles)
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Convert files to base64
      const filePromises = files.map(file => {
        return new Promise<{ name: string; content: string; type: string }>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1]
            resolve({
              name: file.name,
              content: base64,
              type: file.type,
            })
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      const attachments = await Promise.all(filePromises)

      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          attachments,
        }),
      })

      const data: EnquirySubmissionResponse = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          description: '',
        })
        setFiles([])
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Failed to submit enquiry. Please try again or call us directly.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id="enquiry">
      <SectionHeading
        title="How can we help?"
        centered
      />
      <p className="text-center text-neutral-700 mb-8">
        Please fill in the form to help us understand what you need. We will get back to you as soon as possible.
      </p>
      <div className="max-w-3xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honeypot"
            style={{ position: 'absolute', left: '-9999px' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-neutral-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-neutral-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-neutral-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                Job address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-neutral-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
              Job description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Please include any information that may help us provide you with a more accurate quote"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-vertical disabled:bg-neutral-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="attachments" className="block text-sm font-medium text-neutral-700 mb-1">
              Photos - Optional
            </label>
            <p className="text-xs text-neutral-500 mb-2">
              Add up to 3 photos (JPG, PNG, HEIC, or PDF) - 4MB total
            </p>
            <div className="border-2 border-dashed border-neutral-300 rounded p-6 text-center">
              <input
                type="file"
                id="attachments"
                name="attachments"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,application/pdf"
                onChange={handleFileChange}
                disabled={isSubmitting}
                className="hidden"
              />
              <label htmlFor="attachments" className={isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}>
                <div className={`inline-block bg-white border border-neutral-300 rounded px-4 py-2 text-sm font-medium text-neutral-700 ${isSubmitting ? 'opacity-50' : 'hover:bg-neutral-50'}`}>
                  Choose files
                </div>
                <p className="text-sm text-neutral-500 mt-2">or drag and drop here</p>
              </label>
            </div>

            {fileError && (
              <p className="mt-2 text-sm text-red-600">{fileError}</p>
            )}

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-neutral-50 rounded p-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-neutral-700">{file.name}</p>
                        <p className="text-xs text-neutral-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      disabled={isSubmitting}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded p-4 text-green-800">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Thank you for your enquiry!</span>
              </div>
              <p className="mt-2 text-sm">We&apos;ll be in touch as soon as possible.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Something went wrong</span>
              </div>
              <p className="mt-2 text-sm">{errorMessage}</p>
              <p className="mt-2 text-sm">Please try again or call us at <a href="tel:07925423673" className="underline font-semibold">07925423673</a></p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-semibold py-3 px-6 rounded hover:bg-primary-600 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                'Send your enquiry'
              )}
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
