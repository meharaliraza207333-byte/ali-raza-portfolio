import { useEffect, useRef, useState } from 'react'
import { clamp, lerp } from '../animations/mouseAnimations'

// Portrait eye-tracking calibration. Values are percentages of the image frame.
// This angled portrait is intentionally left disabled; set enabled to true only
// after filling accurate eye rectangles. The original image is never modified.
export const eyeConfig = {
  enabled: false,
  leftEye: { x: 0, y: 0, width: 0, height: 0, maxMovement: 4 },
  rightEye: { x: 0, y: 0, width: 0, height: 0, maxMovement: 4 },
}

const PROFILE_SRC = '/Images/ali-raza-logo.png'

function Eye({ config, eyeRef }) {
  if (!eyeConfig.enabled || !config.width || !config.height) return null
  return (
    <span
      className="portrait__eye"
      style={{ left: `${config.x}%`, top: `${config.y}%`, width: `${config.width}%`, height: `${config.height}%` }}
    >
      <i ref={eyeRef} />
    </span>
  )
}

export default function EyeTracking() {
  const rootRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const [hasImage, setHasImage] = useState(true)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId

    const move = (event) => {
      const rect = root.getBoundingClientRect()
      pointer.current.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
      pointer.current.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
      root.classList.add('is-engaged')
    }
    const reset = () => {
      pointer.current = { x: 0, y: 0 }
      root.classList.remove('is-engaged')
    }
    const render = () => {
      current.current.x = lerp(current.current.x, pointer.current.x, 0.075)
      current.current.y = lerp(current.current.y, pointer.current.y, 0.075)
      const { x, y } = current.current
      root.style.setProperty('--portrait-rx', `${-y * (reduced ? 0 : 5.5)}deg`)
      root.style.setProperty('--portrait-ry', `${x * (reduced ? 0 : 7)}deg`)
      root.style.setProperty('--portrait-x', `${x * (reduced ? 0 : 8)}px`)
      root.style.setProperty('--portrait-y', `${y * (reduced ? 0 : 5)}px`)
      root.style.setProperty('--light-x', `${50 + x * 26}%`)
      root.style.setProperty('--light-y', `${42 + y * 22}%`)

      if (eyeConfig.enabled) {
        const setEye = (node, config) => {
          if (node) node.style.transform = `translate(${x * config.maxMovement}px, ${y * config.maxMovement}px)`
        }
        setEye(leftRef.current, eyeConfig.leftEye)
        setEye(rightRef.current, eyeConfig.rightEye)
      }
      frameId = requestAnimationFrame(render)
    }

    root.addEventListener('pointermove', move, { passive: true })
    root.addEventListener('pointerleave', reset)
    frameId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frameId)
      root.removeEventListener('pointermove', move)
      root.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <div ref={rootRef} className="portrait" data-cursor="portrait">
      <div className="portrait__orbit portrait__orbit--one" />
      <div className="portrait__orbit portrait__orbit--two" />
      <div className="portrait__halo" />
      <div className="portrait__frame">
        <div className="portrait__scan" />
        {hasImage ? (
          <img src={PROFILE_SRC} alt="Ali Raza, creative web developer" onError={() => setHasImage(false)} />
        ) : (
          <div className="portrait__placeholder" aria-label="Ali Raza portrait unavailable"><strong>AR</strong></div>
        )}
        <Eye config={eyeConfig.leftEye} eyeRef={leftRef} />
        <Eye config={eyeConfig.rightEye} eyeRef={rightRef} />
      </div>
      <div className="portrait__plate portrait__plate--top"><span>CREATIVE</span><b>01</b></div>
      <div className="portrait__plate portrait__plate--bottom"><i /><span>AVAILABLE FOR WORK</span></div>
    </div>
  )
}
