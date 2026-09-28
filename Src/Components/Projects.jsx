import { lazy, Suspense, useEffect, useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import ErrorBoundary from './ErrorBoundary'

const LaptopModel = lazy(() => import('../Three/LaptopModel'))

export default function Projects() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return (
    <section id="projects" className="section projects" data-section aria-labelledby="projects-title">
      <div className="container" data-section-inner>
        <header className="section-head"><span className="section-index">04 / SELECTED WORK</span><p>Built for clarity, motion &amp; impact</p></header>
        <div className="projects__intro">
          <h2 id="projects-title">FEATURED<br/><span>PROJECTS</span></h2>
          <div className="projects__device">
            <ErrorBoundary fallback={<div className="laptop-stage laptop-stage--fallback" />}>
              <Suspense fallback={<div className="laptop-stage laptop-stage--fallback" />}><LaptopModel reduced={reduced} /></Suspense>
            </ErrorBoundary>
            <small>INTERACTIVE 3D / DRAG WITH YOUR EYES</small>
          </div>
        </div>
        <div className="projects__stack">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
      </div>
    </section>
  )
}
