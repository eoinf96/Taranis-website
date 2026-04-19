import { generateEnquiryEmail } from '../templates'
import { EnquiryFormData } from '@/types/enquiry'

describe('generateEnquiryEmail', () => {
  const mockData: EnquiryFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '07925423673',
    address: '123 Main St, London',
    description: 'Need electrical work in kitchen',
  }

  it('should generate both HTML and text versions', () => {
    const result = generateEnquiryEmail(mockData)

    expect(result).toHaveProperty('html')
    expect(result).toHaveProperty('text')
    expect(typeof result.html).toBe('string')
    expect(typeof result.text).toBe('string')
  })

  describe('HTML email', () => {
    it('should include all customer details', () => {
      const { html } = generateEnquiryEmail(mockData)

      expect(html).toContain('John Doe')
      expect(html).toContain('john@example.com')
      expect(html).toContain('07925423673')
      expect(html).toContain('123 Main St, London')
      expect(html).toContain('Need electrical work in kitchen')
    })

    it('should escape HTML in user input', () => {
      const dataWithHTML = {
        ...mockData,
        name: '<script>alert("xss")</script>',
        description: 'Test <b>bold</b> text',
      }
      const { html } = generateEnquiryEmail(dataWithHTML)

      expect(html).not.toContain('<script>')
      expect(html).toContain('&lt;script&gt;')
      expect(html).toContain('&lt;b&gt;bold&lt;/b&gt;')
    })

    it('should convert newlines to <br> in description', () => {
      const dataWithNewlines = {
        ...mockData,
        description: 'Line 1\nLine 2\nLine 3',
      }
      const { html } = generateEnquiryEmail(dataWithNewlines)

      expect(html).toContain('Line 1<br>Line 2<br>Line 3')
    })

    it('should include timestamp', () => {
      const { html } = generateEnquiryEmail(mockData)

      expect(html).toContain('Submitted:')
    })

    it('should include source information', () => {
      const { html } = generateEnquiryEmail(mockData)

      expect(html).toContain('Taranis Electrical Website')
    })

    it('should have clickable email link', () => {
      const { html } = generateEnquiryEmail(mockData)

      expect(html).toContain('href="mailto:john@example.com"')
    })

    it('should have clickable phone link', () => {
      const { html } = generateEnquiryEmail(mockData)

      expect(html).toContain('href="tel:07925423673"')
    })

    it('should include proper styling', () => {
      const { html } = generateEnquiryEmail(mockData)

      expect(html).toContain('<style>')
      expect(html).toContain('font-family')
      expect(html).toContain('<!DOCTYPE html>')
    })
  })

  describe('text email', () => {
    it('should include all customer details', () => {
      const { text } = generateEnquiryEmail(mockData)

      expect(text).toContain('John Doe')
      expect(text).toContain('john@example.com')
      expect(text).toContain('07925423673')
      expect(text).toContain('123 Main St, London')
      expect(text).toContain('Need electrical work in kitchen')
    })

    it('should include timestamp', () => {
      const { text } = generateEnquiryEmail(mockData)

      expect(text).toContain('Submitted:')
    })

    it('should include source information', () => {
      const { text } = generateEnquiryEmail(mockData)

      expect(text).toContain('Taranis Electrical Website')
    })

    it('should be properly formatted as plain text', () => {
      const { text } = generateEnquiryEmail(mockData)

      expect(text).not.toContain('<html>')
      expect(text).not.toContain('<div>')
      expect(text).toContain('Name:')
      expect(text).toContain('Email:')
      expect(text).toContain('Phone:')
    })

    it('should preserve newlines in description', () => {
      const dataWithNewlines = {
        ...mockData,
        description: 'Line 1\nLine 2\nLine 3',
      }
      const { text } = generateEnquiryEmail(dataWithNewlines)

      expect(text).toContain('Line 1\nLine 2\nLine 3')
    })
  })

  describe('XSS protection', () => {
    it('should escape dangerous characters in name', () => {
      const dangerousData = {
        ...mockData,
        name: '"><script>alert(1)</script>',
      }
      const { html } = generateEnquiryEmail(dangerousData)

      expect(html).not.toContain('<script>')
      expect(html).toContain('&lt;script&gt;')
    })

    it('should escape ampersands', () => {
      const dataWithAmpersand = {
        ...mockData,
        name: 'Smith & Sons',
      }
      const { html } = generateEnquiryEmail(dataWithAmpersand)

      expect(html).toContain('Smith &amp; Sons')
    })

    it('should escape quotes', () => {
      const dataWithQuotes = {
        ...mockData,
        description: 'He said "hello"',
      }
      const { html } = generateEnquiryEmail(dataWithQuotes)

      expect(html).toContain('&quot;')
    })

    it('should escape single quotes', () => {
      const dataWithQuotes = {
        ...mockData,
        description: "It's working",
      }
      const { html } = generateEnquiryEmail(dataWithQuotes)

      expect(html).toContain('&#039;')
    })
  })

  describe('edge cases', () => {
    it('should handle empty description', () => {
      const dataWithEmptyDesc = {
        ...mockData,
        description: '',
      }
      const result = generateEnquiryEmail(dataWithEmptyDesc)

      expect(result.html).toBeTruthy()
      expect(result.text).toBeTruthy()
    })

    it('should handle very long descriptions', () => {
      const longDescription = 'A'.repeat(5000)
      const dataWithLongDesc = {
        ...mockData,
        description: longDescription,
      }
      const { html, text } = generateEnquiryEmail(dataWithLongDesc)

      expect(html).toContain(longDescription)
      expect(text).toContain(longDescription)
    })

    it('should handle special characters in address', () => {
      const dataWithSpecialChars = {
        ...mockData,
        address: 'Flat 2/3, O\'Reilly St, <Town>',
      }
      const { html } = generateEnquiryEmail(dataWithSpecialChars)

      expect(html).toContain('Flat 2/3')
      expect(html).toContain('&#039;')
      expect(html).toContain('&lt;Town&gt;')
    })
  })
})
