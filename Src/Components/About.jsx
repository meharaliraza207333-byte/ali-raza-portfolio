import { useEffect, useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { revealHeading, revealItems } from '../animations/gsapAnimations'

const STATS = [
  { value: '01+', label: 'Years', sub: 'Experience' },
  { value: '∞', label: 'Projects', sub: 'Built with intent' },
  { value: '14+', label: 'Technologies', sub: 'Across the stack' },
]

export default function About() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const section = sectionRef.current
    const headingTween = revealHeading(section?.querySelector('[data-heading]'))
    const itemsTween = revealItems(section?.querySelectorAll('[data-stat]'), section)
    return () => {
      headingTween?.scrollTrigger?.kill()
      itemsTween?.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section id="about" className="section about" ref={sectionRef} data-section aria-labelledby="about-title">
      <div className="container" data-section-inner>
        <header className="section-head">
          <span className="section-index">02 / ABOUT</span>
          <p>Approach &amp; perspective</p>
        </header>
        <div className="about__heading-wrap">
          <h2 id="about-title" className="display-heading" data-heading><span>ABOUT</span><span className="outline">ME</span></h2>
          <ArrowDownRight className="about__arrow" aria-hidden="true" />
        </div>
        <div className="about__editorial">
          <p className="about__lead">I&apos;m Ali Raza, a web developer passionate about creating <em>modern, responsive</em> and user-friendly digital experiences.</p>
          <div className="about__copy">
            <span className="eyebrow">THE WORK</span>
            <p>I work with frontend technologies, WordPress, Shopify, PHP and Laravel and enjoy turning ideas into functional websites.</p>
            <p>My focus is the point where design, motion and dependable development meet—making every interaction feel considered.</p>
          </div>
        </div>
        <div className="about__stats">
          {STATS.map((stat) => (
            <article key={stat.label} className="stat-card" data-stat>
              <strong>{stat.value}</strong><div><span>{stat.label}</span><small>{stat.sub}</small></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
