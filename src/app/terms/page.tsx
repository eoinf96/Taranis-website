import { Container } from '@/components/ui/container'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="py-16">
      <Container maxWidth="2xl">
        <div className="prose prose-neutral max-w-none">
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-neutral-600 mb-6">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-GB')}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Services</h2>
          <p>
            Taranis Electrical provides professional electrical services including but not limited to:
          </p>
          <ul>
            <li>EV charging point installation</li>
            <li>Solar PV system installation</li>
            <li>Battery storage system installation</li>
            <li>Domestic and commercial electrical work</li>
            <li>Electrical testing and certification</li>
            <li>Emergency electrical services</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Quotations</h2>
          <ul>
            <li>All quotations are valid for 30 days unless otherwise stated</li>
            <li>Quotations are based on information provided by the client</li>
            <li>Additional costs may apply if site conditions differ from initial assessment</li>
            <li>We reserve the right to adjust quotations based on material price changes</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Payment Terms</h2>
          <ul>
            <li>Payment terms are net 30 days unless otherwise agreed</li>
            <li>A deposit may be required for larger projects</li>
            <li>Final payment is due upon completion of work</li>
            <li>Late payment charges may apply to overdue accounts</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Warranties</h2>
          <ul>
            <li>We provide a 12-month workmanship warranty on all installations</li>
            <li>Manufacturer warranties apply to all equipment and materials</li>
            <li>Warranties do not cover damage due to misuse or normal wear and tear</li>
            <li>Warranty claims must be reported promptly</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Health & Safety</h2>
          <ul>
            <li>All work is carried out in accordance with current regulations and standards</li>
            <li>We maintain comprehensive public liability insurance</li>
            <li>All installations are tested and certified as required</li>
            <li>Safety is our highest priority on every project</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            Our liability is limited to the value of the work performed. We are not liable for 
            consequential damages, loss of profits, or indirect losses.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cancellation</h2>
          <ul>
            <li>Client may cancel work with 48 hours notice</li>
            <li>Cancellation fees may apply for materials already ordered</li>
            <li>Deposits may be non-refundable for custom installations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Compliance</h2>
          <p>
            All work is carried out in compliance with:
          </p>
          <ul>
            <li>BS 7671 IET Wiring Regulations (18th Edition)</li>
            <li>Part P Building Regulations</li>
            <li>Relevant British and European Standards</li>
            <li>Local authority requirements</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Dispute Resolution</h2>
          <p>
            Any disputes will be resolved through negotiation. If necessary, disputes will be 
            subject to the jurisdiction of English courts.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
          <p>
            For questions about these terms and conditions:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:info@taraniselectrical.co.uk">info@taraniselectrical.co.uk</a></li>
            <li><strong>Phone:</strong> <a href="tel:+447123456789">07123 456 789</a></li>
          </ul>

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