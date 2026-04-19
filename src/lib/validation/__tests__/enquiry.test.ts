import { validateEnquiry } from '../enquiry'

describe('validateEnquiry', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '07925423673',
    address: '123 Main St, London',
    description: 'Need electrical work done in my kitchen',
  }

  describe('valid data', () => {
    it('should validate correct enquiry data', () => {
      const result = validateEnquiry(validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    it('should allow optional honeypot field', () => {
      const result = validateEnquiry({ ...validData, honeypot: '' })
      expect(result.success).toBe(true)
    })

    it('should allow valid attachments', () => {
      const dataWithAttachments = {
        ...validData,
        attachments: [
          {
            name: 'photo.jpg',
            content: 'base64encodedcontent==',
            type: 'image/jpeg',
          },
        ],
      }
      const result = validateEnquiry(dataWithAttachments)
      expect(result.success).toBe(true)
    })
  })

  describe('name validation', () => {
    it('should reject name shorter than 2 characters', () => {
      const result = validateEnquiry({ ...validData, name: 'J' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toContain(
          'Name must be at least 2 characters'
        )
      }
    })

    it('should reject name longer than 100 characters', () => {
      const result = validateEnquiry({ ...validData, name: 'a'.repeat(101) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toContain('Name is too long')
      }
    })
  })

  describe('email validation', () => {
    it('should reject invalid email format', () => {
      const result = validateEnquiry({ ...validData, email: 'not-an-email' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toBeDefined()
      }
    })

    it('should reject email longer than 254 characters', () => {
      const longEmail = `${'a'.repeat(250)}@test.com`
      const result = validateEnquiry({ ...validData, email: longEmail })
      expect(result.success).toBe(false)
    })

    it('should accept valid email formats', () => {
      const emails = [
        'test@example.com',
        'test.name@example.co.uk',
        'test+tag@example.com',
      ]
      emails.forEach((email) => {
        const result = validateEnquiry({ ...validData, email })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('phone validation', () => {
    it('should reject phone shorter than 10 characters', () => {
      const result = validateEnquiry({ ...validData, phone: '123456789' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.phone).toContain(
          'Phone number must be at least 10 characters'
        )
      }
    })

    it('should reject phone longer than 20 characters', () => {
      const result = validateEnquiry({ ...validData, phone: '1'.repeat(21) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.phone).toContain('Phone number is too long')
      }
    })

    it('should reject phone with invalid characters', () => {
      const result = validateEnquiry({ ...validData, phone: 'abc123456789' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.phone).toBeDefined()
      }
    })

    it('should accept various valid phone formats', () => {
      const phones = [
        '07925423673',
        '+44 7925 423673',
        '020 7946 0958',
        '(020) 7946-0958',
      ]
      phones.forEach((phone) => {
        const result = validateEnquiry({ ...validData, phone })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('address validation', () => {
    it('should reject address shorter than 5 characters', () => {
      const result = validateEnquiry({ ...validData, address: '123' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.address).toContain(
          'Please enter a valid address'
        )
      }
    })

    it('should reject address longer than 500 characters', () => {
      const result = validateEnquiry({ ...validData, address: 'a'.repeat(501) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.address).toContain('Address is too long')
      }
    })
  })

  describe('description validation', () => {
    it('should reject description shorter than 10 characters', () => {
      const result = validateEnquiry({ ...validData, description: 'Short' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.description).toContain(
          'Please provide more details about your enquiry'
        )
      }
    })

    it('should reject description longer than 5000 characters', () => {
      const result = validateEnquiry({ ...validData, description: 'a'.repeat(5001) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.description).toContain(
          'Description is too long'
        )
      }
    })
  })

  describe('honeypot validation', () => {
    it('should reject non-empty honeypot field', () => {
      const result = validateEnquiry({ ...validData, honeypot: 'bot-filled-this' })
      expect(result.success).toBe(false)
    })
  })

  describe('attachments validation', () => {
    it('should reject more than 3 attachments', () => {
      const dataWithTooManyAttachments = {
        ...validData,
        attachments: [
          { name: 'file1.jpg', content: 'abc123==', type: 'image/jpeg' },
          { name: 'file2.jpg', content: 'abc123==', type: 'image/jpeg' },
          { name: 'file3.jpg', content: 'abc123==', type: 'image/jpeg' },
          { name: 'file4.jpg', content: 'abc123==', type: 'image/jpeg' },
        ],
      }
      const result = validateEnquiry(dataWithTooManyAttachments)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.attachments).toContain(
          'Maximum 3 files allowed'
        )
      }
    })

    it('should reject invalid file types', () => {
      const dataWithInvalidType = {
        ...validData,
        attachments: [
          { name: 'file.exe', content: 'abc123==', type: 'application/exe' },
        ],
      }
      const result = validateEnquiry(dataWithInvalidType)
      expect(result.success).toBe(false)
    })

    it('should reject invalid base64 content', () => {
      const dataWithInvalidContent = {
        ...validData,
        attachments: [
          { name: 'file.jpg', content: 'not-base64!@#$', type: 'image/jpeg' },
        ],
      }
      const result = validateEnquiry(dataWithInvalidContent)
      expect(result.success).toBe(false)
    })

    it('should accept all valid file types', () => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'application/pdf']
      validTypes.forEach((type) => {
        const result = validateEnquiry({
          ...validData,
          attachments: [{ name: 'file.jpg', content: 'abc123==', type }],
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject filename longer than 255 characters', () => {
      const result = validateEnquiry({
        ...validData,
        attachments: [
          { name: 'a'.repeat(256) + '.jpg', content: 'abc123==', type: 'image/jpeg' },
        ],
      })
      expect(result.success).toBe(false)
    })
  })

  describe('missing required fields', () => {
    it('should reject missing name', () => {
      const { name, ...dataWithoutName } = validData
      const result = validateEnquiry(dataWithoutName)
      expect(result.success).toBe(false)
    })

    it('should reject missing email', () => {
      const { email, ...dataWithoutEmail } = validData
      const result = validateEnquiry(dataWithoutEmail)
      expect(result.success).toBe(false)
    })

    it('should reject missing phone', () => {
      const { phone, ...dataWithoutPhone } = validData
      const result = validateEnquiry(dataWithoutPhone)
      expect(result.success).toBe(false)
    })

    it('should reject missing address', () => {
      const { address, ...dataWithoutAddress } = validData
      const result = validateEnquiry(dataWithoutAddress)
      expect(result.success).toBe(false)
    })

    it('should reject missing description', () => {
      const { description, ...dataWithoutDescription } = validData
      const result = validateEnquiry(dataWithoutDescription)
      expect(result.success).toBe(false)
    })
  })
})
