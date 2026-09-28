import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { skillCategories } from '../data/skills'

function SkillGroup({ group, index }) {
  const ref = useRef(null)
  const pointer = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointer, [-0.5, 0.5], [2.5, -2.5]), { stiffness: 120, damping: 18 })
  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) pointer.set((event.clientY - rect.top) / rect.height - 0.5)
  }
  return (
    <motion.article ref={ref} className="skill-row" style={{ rotateX, transformPerspective: 900 }} onPointerMove={onMove} onPointerLeave={() => pointer.set(0)} data-cursor="skill">
      <span className="skill-row__number">0{index + 1}</span>
      <h3>{group.title}</h3>
      <div className="skill-row__list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      <span className="skill-row__symbol" aria-hidden="true">✦</span>
    </motion.article>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section skills" data-section aria-labelledby="skills-title">
      <div className="container" data-section-inner>
        <header className="section-head"><span className="section-index">03 / CAPABILITIES</span><p>Tools I use to shape ideas</p></header>
        <h2 id="skills-title" className="skills__title">SELECTED <span>STACK</span></h2>
        <div className="skills__list">{skillCategories.map((group, index) => <SkillGroup key={group.id} group={group} index={index} />)}</div>
      </div>
    </section>
  )
}
