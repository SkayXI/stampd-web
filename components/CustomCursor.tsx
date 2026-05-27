'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const curRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Hide on touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const cur  = curRef.current
    const ring = ringRef.current
    if (!cur || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cur.style.left = mx - 5 + 'px'
      cur.style.top  = my - 5 + 'px'
    }

    const loop = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      ring.style.left = rx - 19 + 'px'
      ring.style.top  = ry - 19 + 'px'
      rafId = requestAnimationFrame(loop)
    }

    const addHover = () => document.body.classList.add('ch')
    const rmHover  = () => document.body.classList.remove('ch')

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)

    // Attach hover class to all interactive elements
    const attachHover = () => {
      document.querySelectorAll<HTMLElement>('a, button, .card, .bc, .stat, .price-card').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', rmHover)
      })
    }
    attachHover()

    // Re-attach on DOM mutations (for dynamically added elements)
    const mo = new MutationObserver(attachHover)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <div id="cur" ref={curRef} />
      <div id="cur-ring" ref={ringRef} />
    </>
  )
}
