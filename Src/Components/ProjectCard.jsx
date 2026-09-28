import { useRef, useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [broken, setBroken] = useState(false)
  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    ref.current.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    ref.current.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }
  return (
    <article ref={ref} className={`project-panel project-panel--${(index % 4) + 1}`} onPointerMove={onMove} data-cursor="project">
      <div className="project-panel__top"><span>PROJECT / 0{index + 1}</span><span>{project.type || project.technologies[0]} · {project.year || '2026'}</span></div>
      <div className="project-panel__media">
        {!broken && <img src={project.image} alt={`${project.title} project preview`} loading="lazy" onError={() => setBroken(true)} />}
        {broken && <div className="project-art" aria-label={`${project.title} visual placeholder`}><span className="project-art__window"><i /><i /><i /><b>{project.title.slice(0, 2).toUpperCase()}</b></span></div>}
        <span className="project-panel__ghost">0{index + 1}</span>
      </div>
      <div className="project-panel__body">
        <div><h3>{project.title}</h3><p>{project.description}</p></div>
        <div className="project-panel__meta">
          <ul>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <div className="project-panel__links">
            <MagneticButton href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link" ariaLabel={`View ${project.title}`}><span>{project.liveLabel || 'View project'}</span><ArrowUpRight size={18} /></MagneticButton>
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}><Github size={18} /></a>}
          </div>
        </div>
      </div>
    </article>
  )
}
