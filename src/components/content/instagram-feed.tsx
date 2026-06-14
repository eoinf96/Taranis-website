'use client'

import { useEffect } from 'react'

export function InstagramFeed() {
  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://w.behold.so/widget.js'
    document.head.appendChild(script)
  }, [])

  return (
    <div dangerouslySetInnerHTML={{ __html: '<behold-widget feed-id="73i9V0q7bydl5jYLOory"></behold-widget>' }} />
  )
}
