'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Section, SectionHeading } from '@/components/content/section-heading'

const testimonials = [
  {
    name: 'Julia Adams',
    role: 'Residential Customer',
    text: 'Liam is a professional and personable electrician. You feel safe in his presence which is very important if you\'re a single person. He arrived on time carried out a very thorough, safe job and leaves the job area tidy. You have the confidence he gives you to know that the job you\'ve asked.',
  },
  {
    name: 'Mikaela skinner',
    role: 'Residential Customer',
    text: 'Liam did a fabulous job updating over 30 spot lights, removing old fire hoods & replacing with modern fire rated units. Liam was thorough & made sure everything was clean & tidy after. The lights look amazing. Liam came up with a great lighting plan for the downstairs loo. Thank you!!',
  },
  {
    name: 'Steve Davidson',
    role: 'Residual customer',
    text: 'Taranis quickly repaired faulty cabling into a fusebox and improved the lighting in the garage. Great service and competitive pricing. I would happily recommend Taranis to others for their electrical needs.',
  },
  {
    name: 'Phil Williams- Rootz',
    role: 'Commercial Customer',
    text: 'Liam has carried out various electrical projects for us at the cafe over many years. We have always been very happy with his work, he is highly effcient, clean and tidy. We are very happy to recommend him to others.',
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = React.useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const testimonial = testimonials[current]

  return (
    <Section id="testimonials" className="bg-primary text-white">
      <SectionHeading
        title="Testimonials"
        centered
        className="[&_h1]:text-white"
      />
      <p className="text-center text-white/90 mb-8">Take a look at what customers say about Taranis electrical</p>
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="w-10 h-10 text-primary mx-auto mb-6 opacity-60" />

        <blockquote className="text-lg leading-relaxed mb-8 text-white/90">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>

        {/* Avatar placeholder */}
        <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
          <span className="text-xl font-bold text-white/60">
            {testimonial.name.charAt(0)}
          </span>
        </div>

        <div className="font-semibold text-white">{testimonial.name}</div>
        <div className="text-sm text-white/60">{testimonial.role}</div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? 'bg-primary' : 'bg-white/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Section>
  )
}
