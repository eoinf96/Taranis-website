import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Mock environment variables for tests
process.env.RESEND_API_KEY = 'test-api-key'
process.env.ENQUIRY_EMAIL = 'test@example.com'
