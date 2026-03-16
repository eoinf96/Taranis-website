import { Container } from '@/components/ui/container'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <Container maxWidth="2xl">
        <div className="prose prose-neutral max-w-none">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-neutral-600 mb-6">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-GB')}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you contact us or request our services, we may collect the following information:
          </p>
          <ul>
            <li>Name and contact details (phone number, email address, postal address)</li>
            <li>Details about your electrical requirements and property</li>
            <li>Payment information for completed work</li>
            <li>Communication records for customer service purposes</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Provide electrical services and support</li>
            <li>Process quotes and invoicing</li>
            <li>Communicate about your project</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Improve our services</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
          </p>
          <ul>
            <li>To comply with legal obligations</li>
            <li>To trusted service providers who assist in our operations</li>
            <li>To protect our rights, property, or safety</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
          <p>Under UK data protection law, you have the right to:</p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:info@taraniselectrical.co.uk">info@taraniselectrical.co.uk</a></li>
            <li><strong>Phone:</strong> <a href="tel:+447123456789">07123 456 789</a></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-neutral-600">
              <Link href="/" className="text-primary hover:underline">← Back to Home</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}