import { useEffect, useRef } from 'react'
import { initTimeline } from '../animations/scrollAnimations'

const ITEMS = [
  ['Frontend Development', 'Interfaces shaped with React, JavaScript and intentional motion.', 'REACT · JS · CSS'],
  ['WordPress Development', 'Custom websites that stay fast, flexible and easy to own.', 'WP · ELEMENTOR · WOO'],
  ['Shopify Development', 'Conversion-minded storefronts with refined product storytelling.', 'SHOPIFY · LIQUID'],
  ['PHP / Laravel Development', 'Structured backend systems and reliable product foundations.', 'PHP · LARAVEL · MYSQL'],
]

export default function Experience() {
  const listRef = useRef(null)
  useEffect(() => {
    const tween = initTimeline(listRef.current?.querySelectorAll('.timeline__item'))
    return () => tween?.scrollTrigger?.kill()
  }, [])
  return (
    <section id="experience" className="section experience" data-section aria-labelledby="experience-title">
      <div className="container" data-section-inner>
        <header className="section-head"><span className="section-index">05 / EXPERIENCE</span><p>What I bring to the table</p></header>
        <div className="experience__layout">
          <div className="experience__sticky"><h2 id="experience-title">DIGITAL<br/><span>CRAFT</span></h2><p>One connected practice across design-minded frontend, commerce and backend development.</p></div>
          <ol className="timeline" ref={listRef}>
            {ITEMS.map(([title, text, stack], index) => (
              <li key={title} className="timeline__item"><span className="timeline__index">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p><small>{stack}</small></div><i aria-hidden="true" /></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
