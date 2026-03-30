import * as React from 'react'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  description,
  centered = false,
  className
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {subtitle && (
        <div className={cn(
          'inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary font-medium mb-4',
          centered ? 'mx-auto' : ''
        )}>
          {subtitle}
        </div>
      )}
      
      <h1 className="text-2xl lg:text-3xl font-extrabold text-primary mb-4">
        {title}
      </h1>
      
      {description && (
        <p className={cn(
          'text-lg text-neutral-600 leading-relaxed',
          centered ? 'mx-auto max-w-2xl' : 'max-w-3xl'
        )}>
          {description}
        </p>
      )}
    </div>
  )
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export function Section({ children, className, containerClassName, ...props }: SectionProps) {
  return (
    <section className={cn('py-16 lg:py-24', className)} {...props}>
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}