import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to every `.rv` element inside `containerRef`.
 * When an element enters the viewport it receives the `.vs` class, triggering
 * the CSS reveal transition defined in globals.css.
 */
export function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = container.querySelectorAll<HTMLElement>('.rv')

    if (reduced) {
      // Skip animation — just show everything immediately
      elements.forEach(el => el.classList.add('vs'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vs')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [containerRef])
}
