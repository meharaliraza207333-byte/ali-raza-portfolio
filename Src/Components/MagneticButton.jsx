import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({
  children,
  className = '',
  href,
  type = 'button',
  onClick,
  ariaLabel,
  strength = 0.22,
  target,
  rel,
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const onMove = (event) => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = node.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const motionProps = {
    ref,
    className: `magnetic-btn ${className}`.trim(),
    style: { x: springX, y: springY },
    onPointerMove: onMove,
    onPointerLeave: reset,
    'aria-label': ariaLabel,
    'data-cursor': 'hover',
  }

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}
