import { useEffect, useRef } from 'react'
import { lerp } from '../animations/mouseAnimations'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarse || reduced) return undefined

    document.body.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: pos.x, y: pos.y }
    let hovering = false
    let frame

    const onMove = (event) => {
      pos.x = event.clientX
      pos.y = event.clientY
    }

    const onOver = (event) => {
      const target = event.target.closest('a, button, [data-cursor]')
      hovering = Boolean(target)
    }

    const loop = () => {
      ringPos.x = lerp(ringPos.x, pos.x, 0.16)
      ringPos.y = lerp(ringPos.y, pos.y, 0.16)
      if (dot) dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (ring) {
        ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${hovering ? 1.55 : 1})`
        ring.classList.toggle('is-hover', hovering)
      }
      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    frame = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
