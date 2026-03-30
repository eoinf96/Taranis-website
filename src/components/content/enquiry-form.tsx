'use client'

import * as React from 'react'
import { Section, SectionHeading } from '@/components/content/section-heading'

export function EnquiryForm() {
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
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                required
                className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                required
                className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                required
                className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
              required
              className="w-full rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-vertical"
            />
          </div>

          <div>
            <label htmlFor="attachments" className="block text-sm font-medium text-neutral-700 mb-1">
              Attachments - Optional
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded p-6 text-center">
              <input
                type="file"
                id="attachments"
                name="attachments"
                multiple
                className="hidden"
              />
              <label htmlFor="attachments" className="cursor-pointer">
                <div className="inline-block bg-white border border-neutral-300 rounded px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                  Upload files
                </div>
                <p className="text-sm text-neutral-500 mt-2">Or drag files here to upload</p>
                <p className="text-xs text-neutral-400 mt-1">Max size: 20MB</p>
              </label>
            </div>
          </div>

          {/* reCAPTCHA placeholder */}
          <div className="bg-neutral-100 rounded p-4 text-sm text-neutral-500 text-center">
            reCAPTCHA verification will appear here
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 px-6 rounded hover:bg-primary-600 transition-colors"
            >
              Send your enquiry
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
