import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  href?: string
  features?: string[]
  className?: string
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  features = [],
  className
}: ServiceCardProps) {
  const CardWrapper = href ? Link : 'div'
  
  return (
    <CardWrapper
      href={href || ''}
      className={cn(
        'group block bg-white rounded-lg border border-neutral-200 p-6 transition-all duration-200 hover:shadow-lg hover:shadow-neutral-100 hover:border-neutral-300',
        href && 'cursor-pointer',
        className
      )}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-neutral-600 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-neutral-600 flex items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Link indicator */}
      {href && (
        <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      )}
    </CardWrapper>
  )
}