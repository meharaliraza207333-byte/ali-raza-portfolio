import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((link) => document.querySelector(link.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onNav = (event, href) => {
    event.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner">
        <a className="navbar__logo" href="#home" onClick={(e) => onNav(e, '#home')} aria-label="Ali Raza home">
          AR.
        </a>
        <nav className="navbar__links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? 'is-active' : ''}
              onClick={(e) => onNav(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="navbar__toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => onNav(e, link.href)}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
