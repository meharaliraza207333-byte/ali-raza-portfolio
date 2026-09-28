export function lerp(start, end, amount) {
  return start + (end - start) * amount
}

export function getPointerNormalized(event, rect) {
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
  return {
    x: Math.max(-1, Math.min(1, x)),
    y: Math.max(-1, Math.min(1, y)),
  }
}

export function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
