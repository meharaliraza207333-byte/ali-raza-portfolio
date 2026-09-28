import { useEffect, useState } from 'react'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let frame
    let leaveTimer
    let finished = false
    const start = performance.now()
    const duration = 1100

    const complete = () => {
      if (finished) return
      finished = true
      setProgress(100)
      setLeaving(true)
      leaveTimer = window.setTimeout(() => onComplete?.(), 320)
    }

    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / duration)
      setProgress(Math.round((1 - (1 - t) ** 3) * 100))
      if (t >= 1) complete()
      else frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    const watchdog = window.setTimeout(complete, duration + 250)

    const onVisible = () => {
      if (!document.hidden && performance.now() - start >= duration) complete()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      finished = true
      cancelAnimationFrame(frame)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(watchdog)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [onComplete])

  return (
    <div
      className={`loader ${leaving ? 'is-leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress} percent`}
    >
      <div className="loader__mark">AR</div>
      <div className="loader__percent">{progress}%</div>
      <div className="loader__bar" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
