import { useEffect, useRef } from 'react'
import { ArrowDownRight, Github, Linkedin } from 'lucide-react'
import MagneticButton from './MagneticButton'
import EyeTracking from './EyeTracking'
import { SITE } from '../data/skills'
import { resetHero, revealHero } from '../animations/gsapAnimations'

export default function Hero({ ready }) {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!ready) return undefined
    const tween = revealHero(rootRef.current)
    const fallback = window.setTimeout(() => resetHero(rootRef.current), 1800)
    return () => {
      window.clearTimeout(fallback)
      tween?.kill()
      resetHero(rootRef.current)
    }
  }, [ready])

  return (
    <section id="home" className="hero" ref={rootRef} aria-labelledby="hero-title">
      <div className="hero__gridlines" aria-hidden="true" />
      <div className="hero__layout">
        <div className="hero__copy">
          <div className="hero__intro" data-hero-reveal>
            <span className="status-dot" />
            <span>HELLO, I&apos;M</span>
            <span className="hero__edition">PORTFOLIO / 2026</span>
          </div>
          <h1 id="hero-title" className="hero__title" aria-label="Ali Raza">
            <span className="hero__line hero__line--solid" data-hero-reveal>ALI</span>
            <span className="hero__line hero__line--outline" data-hero-reveal>RAZA</span>
          </h1>
          <div className="hero__meta" data-hero-reveal>
            <p className="hero__role">{SITE.title}</p>
            <span aria-hidden="true">( PK / REMOTE )</span>
          </div>
          <p className="hero__text" data-hero-reveal>{SITE.description}</p>
          <div className="hero__tags" data-hero-reveal>
            {['Frontend', 'WordPress', 'Shopify', 'Laravel'].map((tag, index) => (
              <span key={tag}><em>0{index + 1}</em>{tag}</span>
            ))}
          </div>
          <div className="hero__actions" data-hero-reveal>
            <MagneticButton href="#projects" className="btn btn--primary" ariaLabel="View my work">
              <span>View my work</span><ArrowDownRight size={18} />
            </MagneticButton>
            <MagneticButton href="#contact" className="btn btn--ghost" ariaLabel="Let's talk">
              <span>Let&apos;s talk</span>
            </MagneticButton>
          </div>
          <div className="hero__socials" data-hero-reveal>
            <span>CONNECT</span>
            <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="Ali Raza on GitHub"><Github size={16} /> GitHub</a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="Ali Raza on LinkedIn"><Linkedin size={16} /> LinkedIn</a>
          </div>
        </div>
        <div className="hero__portrait" data-hero-reveal><EyeTracking /></div>
      </div>
      <a className="hero__scroll" href="#about" aria-label="Scroll to about section">
        <span>SCROLL TO EXPLORE</span><i />
      </a>
    </section>
  )
}
