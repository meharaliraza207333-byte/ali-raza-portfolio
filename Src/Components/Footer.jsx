import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { SITE } from '../data/skills'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__topline"><a href="#home" className="footer__brand">AR.</a><p>{SITE.title}<br/><span>Pakistan / Worldwide</span></p><div className="footer__socials"><a href={SITE.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href={SITE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a></div></div>
      <div className="container footer__wordmark">ALI RAZA</div>
      <div className="container footer__bottom"><p>© 2026 / Designed &amp; Developed by Ali Raza</p><nav aria-label="Footer"><a href="#about">About</a><a href="#projects">Work</a><a href="#contact">Contact</a></nav><a href="#home" className="footer__back">Back to top <ArrowUpRight size={16}/></a></div>
    </footer>
  )
}
