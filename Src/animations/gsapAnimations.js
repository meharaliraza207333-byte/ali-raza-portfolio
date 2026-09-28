import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function registerGsap() {
  gsap.registerPlugin(ScrollTrigger)
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function revealHero(root) {
  if (!root || prefersReducedMotion()) return
  const items = root.querySelectorAll('[data-hero-reveal]')
  if (!items.length) return
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(
    items,
    { y: 36, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.72,
      stagger: 0.055,
      immediateRender: true,
      onComplete: () => gsap.set(items, { clearProps: 'opacity,transform' }),
    }
  )
  return tl
}

export function resetHero(root) {
  if (!root) return
  gsap.set(root.querySelectorAll('[data-hero-reveal]'), { clearProps: 'opacity,transform' })
}

export function revealHeading(el) {
  if (!el || prefersReducedMotion()) return
  gsap.fromTo(
    el,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
      },
    }
  )
}

export function revealItems(items, trigger) {
  if (!items?.length || prefersReducedMotion()) return
  return gsap.fromTo(
    items,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 80%',
      },
    }
  )
}

export function refreshScroll() {
  ScrollTrigger.refresh()
}
