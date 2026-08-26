'use client'

import { useEffect } from 'react'

/**
 * Mounts a single IntersectionObserver that watches every `.reveal` element
 * and adds `.visible` when it enters the viewport.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
