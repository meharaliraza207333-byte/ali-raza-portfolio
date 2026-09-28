import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './gsapAnimations'

export function initSectionFades(selector = '[data-section]') {
  if (prefersReducedMotion()) return []

  const triggers = []
  document.querySelectorAll(selector).forEach((section) => {
    const inner = section.querySelector('[data-section-inner]') || section
    const tween = gsap.fromTo(
      inner,
      { y: 48, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      }
    )
    triggers.push(tween)
  })
  return triggers
}

export function initTimeline(items) {
  if (!items?.length || prefersReducedMotion()) return
  return gsap.fromTo(
    items,
    { x: -24, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: items[0],
        start: 'top 85%',
      },
    }
  )
}

export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
